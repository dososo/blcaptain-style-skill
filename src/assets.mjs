import fs from "node:fs/promises";
import path from "node:path";

const URL_RE = /^https?:\/\//i;

function safeName(input, fallback = "asset") {
  return String(input || fallback)
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || fallback;
}

function extensionFromUrl(url) {
  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname).split("?")[0];
    return ext && ext.length <= 6 ? ext : ".jpg";
  } catch {
    return ".jpg";
  }
}

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
}

// 诚实来源：优先 sourceUrl / URL src，其次声明的 source（provider/“user supplied”/“AI-generated”），
// 都没有则返回 null（由调用方标记 UNVERIFIED，绝不把本地路径冒充成来源）。
function honestSource(image) {
  const provenance = image.sourceUrl || (URL_RE.test(image.src) ? image.src : null) || image.source;
  if (!provenance) return null;
  return image.license ? `${provenance} (${image.license})` : provenance;
}

// 剥掉解析器自有的 "## Resolved Assets" 段（每次重生成），只保留人工撰写的来源前言，避免重跑重复写。
function stripResolvedSection(text) {
  const idx = text.indexOf("## Resolved Assets");
  return (idx >= 0 ? text.slice(0, idx) : text).trim();
}

async function copyOrDownloadImage(image, briefDir, assetsDir, sourceLines) {
  if (!image || !image.src) return image;

  const src = image.src;
  const purpose = safeName(image.purpose || image.name || "image");
  let filename = image.filename;

  if (!filename) {
    const ext = URL_RE.test(src) ? extensionFromUrl(src) : (path.extname(src) || ".png");
    // 优先从 src basename 取唯一名（保留角色名）；否则多图都叫 "image.jpg" 互相覆盖 → 多图组图全渲同一张图（错位 bug）
    const raw = String(src).split("?")[0];
    const base = safeName(path.basename(raw, path.extname(raw)));
    filename = (base && base !== "image") ? `${base}${ext}` : `${purpose}${ext}`;
  }

  const dest = path.join(assetsDir, filename);
  const rel = `assets/${filename}`;

  const honest = honestSource(image);

  if (URL_RE.test(src)) {
    if (!(await exists(dest))) await download(src, dest);
    sourceLines.push(`${filename} <- ${honest || src}`);
  } else {
    const local = path.isAbsolute(src) ? src : path.resolve(briefDir, src);
    if (await exists(local)) {
      await fs.copyFile(local, dest);
      sourceLines.push(honest
        ? `${filename} <- ${honest}`
        : `${filename} <- UNVERIFIED_LOCAL_SOURCE: ${local} (未声明来源；补 image.source / image.sourceUrl / image.license）`);
    } else {
      // Keep source unresolved. The renderer can still use it if it is browser-accessible.
      sourceLines.push(`${filename} <- MISSING_LOCAL_SOURCE:${local}`);
    }
  }

  return { ...image, resolvedSrc: rel, filename };
}

function collectImages(brief) {
  const images = [];
  if (Array.isArray(brief.images)) images.push(...brief.images);
  for (const card of brief.cards || []) {
    if (card.image) images.push(card.image);
    if (Array.isArray(card.images)) images.push(...card.images);
    if (Array.isArray(card.evidence)) {
      for (const ev of card.evidence) if (ev.image) images.push(ev.image);
    }
    if (Array.isArray(card.shots)) {
      for (const s of card.shots) if (s.image) images.push(s.image);
    }
  }
  return images;
}

function replaceResolved(card, bySrc) {
  if (card.image?.src && bySrc.has(card.image.src)) card.image = bySrc.get(card.image.src);
  if (Array.isArray(card.images)) {
    card.images = card.images.map(img => img?.src && bySrc.has(img.src) ? bySrc.get(img.src) : img);
  }
  if (Array.isArray(card.evidence)) {
    card.evidence = card.evidence.map(ev => ev.image?.src && bySrc.has(ev.image.src) ? { ...ev, image: bySrc.get(ev.image.src) } : ev);
  }
  if (Array.isArray(card.shots)) {
    card.shots = card.shots.map(s => s.image?.src && bySrc.has(s.image.src) ? { ...s, image: bySrc.get(s.image.src) } : s);
  }
  return card;
}

export async function resolveBriefAssets(brief, briefPath, outDir) {
  const briefDir = briefPath ? path.dirname(path.resolve(briefPath)) : process.cwd();
  const assetsDir = path.join(outDir, "assets");
  await fs.mkdir(assetsDir, { recursive: true });
  const sourceRequestsPath = path.join(briefDir, "assets", "IMAGE_REQUESTS.md");
  const sourceSourcesPath = path.join(briefDir, "assets", "SOURCES.md");
  const sourceSourcesText = await exists(sourceSourcesPath) ? await fs.readFile(sourceSourcesPath, "utf8") : "";

  if (await exists(sourceRequestsPath)) {
    await fs.copyFile(sourceRequestsPath, path.join(assetsDir, "IMAGE_REQUESTS.md"));
  }

  const images = collectImages(brief);
  const sourceLines = [];
  const bySrc = new Map();

  for (const image of images) {
    if (!image?.src || bySrc.has(image.src)) continue;
    const resolved = await copyOrDownloadImage(image, briefDir, assetsDir, sourceLines);
    bySrc.set(image.src, resolved);
  }

  const next = structuredClone(brief);
  next.cards = (next.cards || []).map(card => replaceResolved(card, bySrc));

  const preamble = stripResolvedSection(sourceSourcesText);
  if (preamble || sourceLines.length) {
    const parts = [];
    if (preamble) parts.push(preamble);
    if (sourceLines.length) {
      parts.push(["## Resolved Assets", "", ...sourceLines].join("\n"));
    }
    await fs.writeFile(path.join(assetsDir, "SOURCES.md"), parts.join("\n\n") + "\n", "utf8");
  }

  return next;
}

import fs from "node:fs/promises";
import path from "node:path";

const IMAGE_LAYOUTS = new Set([
  "product-hero",
  "essay-split",
  "diary-scrapbook",
  "lifestyle-story",
  "xhs-text-bomb",
  "xhs-photo-proof",
  "screenshot-focus"
]);

// 图源全集（忠实 references/image-source-workflow.md 的 12 公开源 + 4 层版权 tier；别缩成两个）
const PROVIDERS = [
  { id: "user",          label: "用户自有图片",                 tier: "Tier 0",          note: "最优先。真实截图、实拍图、产品图优先于任何图库。" },
  { id: "ai",            label: "AI 生成图",                    tier: "B 路线",          note: "概念/氛围/抽象/不可拍摄场景；不可冒充真实产品、真实人物或真实地点。" },
  { id: "unsplash",      label: "Unsplash",                     tier: "Tier 2",          note: "生活方式、风景、办公、旅行、抽象商业场景；免费可商用，遵守平台条款。" },
  { id: "pexels",        label: "Pexels",                       tier: "Tier 2",          note: "人物、生活、职场、消费场景；免费可商用、无需署名。" },
  { id: "stocksnap",     label: "StockSnap",                    tier: "Tier 1 (CC0)",    note: "CC0 公共领域，可商用、无需署名，来源最干净之一。" },
  { id: "pixabay",       label: "Pixabay",                      tier: "Tier 2",          note: "广覆盖素材；免费可商用，遵守平台条款。" },
  { id: "negativespace", label: "NegativeSpace",                tier: "Tier 1 (CC0)",    note: "CC0；留白构图好，适合满铺/封面主视觉。" },
  { id: "kaboompics",    label: "Kaboompics",                   tier: "Tier 2",          note: "生活方式、室内、静物；免费可商用，注意平台条款。" },
  { id: "burst",         label: "Burst (Shopify)",              tier: "Tier 2",          note: "电商、产品、创业场景；免费可商用。" },
  { id: "rawpixel",      label: "rawpixel Public Domain",       tier: "Tier 1 (PD)",     note: "仅取其 Public Domain 部分；东方/复古/艺术藏品类素材丰富。" },
  { id: "flickr-cc",     label: "Flickr CC0 / Public Domain",   tier: "Tier 1 (CC0/PD)", note: "只用 CC0/PD 过滤结果；真实地点、纪实、旅行、城市现场。" },
  { id: "openverse",     label: "Openverse CC0 / Public Domain", tier: "Tier 1 (CC0/PD)", note: "跨库聚合 CC0/PD；保留原始来源与许可判断。" },
  { id: "cc0cn",         label: "CC0.CN（国内）",               tier: "Tier 1 (CC0)",    note: "国内 CC0 聚合，国内可访问无需 VPN；可商用无需署名。搭『国内开箱即用』。" },
  { id: "palayoutu",     label: "泼辣有图（国内）",             tier: "Tier 1 (CC0)",    note: "泼辣开源摄影，CC0 可商用；氛围/风景/生活摄影质感好，国内可访问。" },
  { id: "ssyer",         label: "别样网（国内）",               tier: "Tier 1 (CC0)",    note: "国内 CC0 摄影社区，可商用；国内可访问。" },
  { id: "hippopx",       label: "Hippopx",                      tier: "Tier 1 (CC0)",    note: "CC0 公共领域，可商用无需署名；国内可访问。" },
  { id: "wallhaven",     label: "Wallhaven",                    tier: "Tier 2/3 (按图)", note: "游戏/影视/二次元/key art 氛围图；默认只用 SFW，许可逐图判断。" },
  { id: "direct-search", label: "直接搜索",                     tier: "最后手段",        note: "官方/可信来源（地图、报告、产品官图）；必须人工判断版权与出处。" },
];

function hasImage(card) {
  return !!(card.image?.src || card.image?.resolvedSrc);
}

function needsImage(card) {
  return (!!card.imageRequest || IMAGE_LAYOUTS.has(card.layout)) && !hasImage(card);
}

// kicker 可能是 {en,cn} 对象，stringify 时取文本，避免 "[object Object]" 泄漏
function kickerText(kicker) {
  if (!kicker) return "";
  if (typeof kicker === "string") return kicker;
  return [kicker.cn, kicker.en].filter(Boolean).join(" ");
}

function queryForCard(brief, card) {
  // plan 已给出内容派生搜索词时优先用它
  if (card.imageRequest?.query) return String(card.imageRequest.query).slice(0, 120);
  const parts = [
    brief.meta?.title,
    brief.meta?.topic,
    kickerText(card.kicker),
    card.title,
    card.subtitle,
    ...(card.points || []),
  ].filter(Boolean).join(" ");
  return parts
    .replace(/[^\p{Script=Han}a-zA-Z0-9\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

function providerOrder(card, brief) {
  // plan 给出的来源顺序优先（单一真相源）
  if (Array.isArray(card.imageRequest?.providerOrder) && card.imageRequest.providerOrder.length) {
    return card.imageRequest.providerOrder;
  }
  return providerOrderHeuristic(card, brief);
}

function providerOrderHeuristic(card, brief) {
  const text = `${brief.meta?.title || ""} ${card.title || ""} ${card.kicker || ""}`.toLowerCase();
  if (/游戏|game|gaming|wallpaper|key art|影视|movie|tv/.test(text)) {
    return ["user", "ai", "wallhaven", "flickr-cc", "direct-search"];
  }
  if (/旅行|travel|城市|户外|food|美食|餐厅|地点|city/.test(text)) {
    return ["user", "ai", "unsplash", "pexels", "flickr-cc", "direct-search"];
  }
  if (/截图|screenshot|ui|dashboard|app|codex|claude|openclaw|工具/.test(text)) {
    return ["user", "ai", "direct-search"];
  }
  // 默认走全集（CC0/PD 优先在 licensePreference 标注），别缩成两个
  return PROVIDERS.map(p => p.id);
}

export async function imagePlan(briefPath, outPath) {
  const raw = await fs.readFile(briefPath, "utf8");
  const brief = JSON.parse(raw);
  const cards = brief.cards || [];
  const missing = cards.filter(needsImage);

  const lines = [];
  lines.push(`# Image Requests`);
  lines.push(``);
  lines.push(`Generated from: \`${briefPath}\``);
  lines.push(``);
  lines.push(`## Intake choice`);
  lines.push(``);
  lines.push(`If cards need images and user did not provide them, ask once:`);
  lines.push(``);
  lines.push(`A. 我提供自己的实拍图 / 截图 / 产品图`);
  lines.push(`B. 你先用 AI 生成概念图`);
  lines.push(`C. 你从公开图源全集找候选（Unsplash · Pexels · StockSnap CC0 · Pixabay · NegativeSpace CC0 · Kaboompics · Burst · rawpixel PD · Flickr CC0/PD · Openverse CC0/PD · Wallhaven · 直接搜索），CC0/PD 优先，确认后下载入库并写 SOURCES.md`);
  lines.push(``);
  lines.push(`Do not repeatedly persuade the user to pick A after this one-shot choice.`);
  lines.push(``);
  lines.push(`## Missing image cards`);
  lines.push(``);

  if (!missing.length) {
    lines.push(`No missing image requirements detected.`);
  }

  for (const card of missing) {
    const query = queryForCard(brief, card);
    const order = providerOrder(card, brief);
    lines.push(`### ${card.name || card.layout || "card"}`);
    lines.push(``);
    lines.push(`- layout: \`${card.layout}\``);
    lines.push(`- title: ${card.title || ""}`);
    lines.push(`- suggested query: \`${query}\``);
    lines.push(`- provider order: ${order.join(" → ")}`);
    lines.push(`- required crop note: write \`object-position\` after inspecting subject location`);
    lines.push(`- target filename: \`assets/${card.name || card.layout || "image"}.jpg\``);
    lines.push(``);
  }

  lines.push(`## Provider notes`);
  lines.push(``);
  for (const p of PROVIDERS) {
    lines.push(`- **${p.label}** (\`${p.id}\`, ${p.tier}): ${p.note}`);
  }

  lines.push(``);
  lines.push(`## SOURCES.md format`);
  lines.push(``);
  lines.push("```text");
  lines.push("hero-image.jpg <- https://example.com/source-url");
  lines.push("ui-screenshot.png <- user supplied / local path");
  lines.push("```");

  await fs.mkdir(path.dirname(path.resolve(outPath)), { recursive: true });
  await fs.writeFile(outPath, lines.join("\n") + "\n", "utf8");
  return { outPath: path.resolve(outPath), missing: missing.length };
}

export async function imageFetch(urlsPath, outDir, options = {}) {
  const raw = await fs.readFile(urlsPath, "utf8");
  const items = JSON.parse(raw);
  if (!Array.isArray(items)) throw new Error("image-fetch expects a JSON array of {url, filename, card?, source?, license?, position?, alt?}");

  const assetsDir = path.resolve(outDir || "assets");
  await fs.mkdir(assetsDir, { recursive: true });
  const sourceLines = [];

  // 可选：把取到的图回填进 brief 对应卡（按 item.card === card.name），让 build 的强制取图 gate 放行
  const briefPath = options.brief ? path.resolve(options.brief) : null;
  let brief = null, briefDir = null;
  if (briefPath) {
    brief = JSON.parse(await fs.readFile(briefPath, "utf8"));
    briefDir = path.dirname(briefPath);
  }

  for (const item of items) {
    if (!item.url || !item.filename) throw new Error("Each item must have url and filename");
    const res = await fetch(item.url);
    if (!res.ok) throw new Error(`Failed to fetch ${item.url}: ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(path.join(assetsDir, item.filename), buf);

    // 诚实来源：真实 URL + provider + license（对齐 asset-source-gate 的来源标记）
    const provenance = [item.url, item.source && `— ${item.source}`, item.license && `(${item.license})`]
      .filter(Boolean).join(" ");
    sourceLines.push(`${item.filename} <- ${provenance}`);

    if (brief && item.card) {
      const card = (brief.cards || []).find(c => c.name === item.card);
      if (card) {
        const relSrc = (path.relative(briefDir, path.join(assetsDir, item.filename)) || item.filename).split(path.sep).join("/");
        card.image = {
          ...(card.image || {}),
          src: relSrc,
          source: item.source || card.image?.source,
          sourceUrl: item.url,
          ...(item.license ? { license: item.license } : {}),
          ...(item.position ? { position: item.position } : {}),
          ...(item.alt ? { alt: item.alt } : {}),
        };
      }
    }
  }

  await fs.writeFile(path.join(assetsDir, "SOURCES.md"), sourceLines.join("\n") + "\n", "utf8");
  if (brief) await fs.writeFile(briefPath, JSON.stringify(brief, null, 2) + "\n", "utf8");
  return { assetsDir, count: items.length, patchedBrief: briefPath || null };
}

export function listProviders() {
  return PROVIDERS;
}

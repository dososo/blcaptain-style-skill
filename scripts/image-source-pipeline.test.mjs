import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import { planBrief } from "../src/plan.mjs";
import { lintBrief } from "../src/lintBrief.mjs";
import { buildDeck } from "../src/engine.mjs";
import { resolveBriefAssets } from "../src/assets.mjs";

function writeJpg(p) {
  fs.writeFileSync(p, Buffer.from([0xff, 0xd8, 0xff, 0xd9]));
  return p;
}

function tmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "blc-imgsrc-"));
}

function writeBrief(brief) {
  const file = path.join(tmpDir(), "brief.json");
  fs.writeFileSync(file, JSON.stringify(brief, null, 2), "utf8");
  return file;
}

function coverNoImage() {
  return {
    meta: { style: "sp-warm", format: "xhs" },
    cards: [{
      name: "01-cover",
      layout: "sp-ws-cover-photo",
      kicker: { en: "DIARY", cn: "日记" },
      title: "写下来，\n才看得清",
      imageRequest: { role: "cover-hero", query: "暖光书桌 morning desk", providerOrder: ["unsplash"] },
    }],
  };
}

function tmpMd(text) {
  const file = path.join(tmpDir(), "article.md");
  fs.writeFileSync(file, text, "utf8");
  return file;
}

const SAMPLE = `# 写下来，才看得清

把心里乱成一团的念头，一句一句安顿好。清晨的书桌，一杯咖啡，一支笔。

写日记不是记录，是整理。当念头落在纸上，它就不再追着你跑。

每天早上写三页，雷打不动。`;

test("plan attaches an imageRequest with content-derived search words to the SP-WS cover even when no image is supplied", async () => {
  const brief = await planBrief(tmpMd(SAMPLE), { kind: "diary", format: "xhs" });
  const cover = brief.cards[0];

  assert.equal(cover.layout, "sp-ws-cover-photo");
  assert.ok(!cover.image, "cover must not carry a fabricated image when none was supplied");

  assert.ok(cover.imageRequest, "cover should carry an imageRequest");
  assert.equal(typeof cover.imageRequest.query, "string");
  assert.ok(cover.imageRequest.query.length > 0, "query must be non-empty");
  assert.doesNotMatch(cover.imageRequest.query, /\[object Object\]/, "object kicker must not leak into query");
  assert.match(cover.imageRequest.query, /[一-鿿]/, "query should carry content tokens");
  assert.ok(
    Array.isArray(cover.imageRequest.providerOrder) && cover.imageRequest.providerOrder.length > 0,
    "imageRequest should carry a provider order"
  );
});

test("lint FAILs when an SP-WS photo cover has no image (force fetch first)", async () => {
  const res = await lintBrief(writeBrief(coverNoImage()));
  assert.ok(res.fails >= 1, "missing cover image must be a blocking FAIL");
  assert.ok(
    res.issues.some(i => i.level === "FAIL" && /image/i.test(i.msg) && /cover/i.test(i.msg)),
    "lint should name the cover image requirement"
  );
});

test("build refuses a deck whose imageRequest card has no resolved image (force fetch first)", async () => {
  const briefPath = writeBrief(coverNoImage());
  const outDir = tmpDir();
  await assert.rejects(
    () => buildDeck(briefPath, outDir),
    /image|取图|IMAGE_REQUESTS/i,
    "build must block and point at the fetch flow"
  );
  assert.ok(!fs.existsSync(path.join(outDir, "index.html")), "no index.html should be written when blocked");
});

test("build succeeds once the imageRequest card carries an image", async () => {
  const dir = tmpDir();
  const heroPath = path.join(dir, "hero.jpg");
  fs.writeFileSync(heroPath, Buffer.from([0xff, 0xd8, 0xff, 0xd9])); // minimal jpg-ish bytes
  const brief = coverNoImage();
  brief.cards[0].image = { src: "hero.jpg", source: "unsplash", sourceUrl: "https://unsplash.com/photos/abc", position: "center 45%" };
  const briefPath = path.join(dir, "brief.json");
  fs.writeFileSync(briefPath, JSON.stringify(brief, null, 2), "utf8");

  const res = await buildDeck(briefPath, path.join(dir, "out"));
  assert.ok(fs.existsSync(res.indexPath), "index.html should be written when image present");
});

test("resolveBriefAssets records the real declared source in SOURCES.md, not the local path", async () => {
  const dir = tmpDir();
  const heroPath = writeJpg(path.join(dir, "hero-src.jpg"));
  const brief = {
    meta: { style: "sp-warm", format: "xhs" },
    cards: [{
      name: "01-cover", layout: "sp-ws-cover-photo", kicker: { en: "DIARY", cn: "日记" }, title: "测试",
      image: { src: heroPath, source: "unsplash", sourceUrl: "https://unsplash.com/photos/abc123", license: "Unsplash License", position: "center 45%" },
    }],
  };
  const outDir = path.join(dir, "out");
  await resolveBriefAssets(brief, path.join(dir, "brief.json"), outDir);
  const sources = fs.readFileSync(path.join(outDir, "assets", "SOURCES.md"), "utf8");

  assert.match(sources, /https:\/\/unsplash\.com\/photos\/abc123/, "real source URL must be recorded");
  assert.match(sources.toLowerCase(), /unsplash/, "approved source marker must be present");
  assert.doesNotMatch(sources, new RegExp(heroPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), "bare local path must NOT be recorded as the source");
});

test("resolveBriefAssets flags a local-only image as unverified and does not duplicate on re-run", async () => {
  const dir = tmpDir();
  fs.mkdirSync(path.join(dir, "assets"), { recursive: true });
  const heroPath = writeJpg(path.join(dir, "assets", "hero-src.jpg"));
  const brief = {
    meta: { style: "sp-warm", format: "xhs" },
    cards: [{
      name: "01-cover", layout: "sp-ws-cover-photo", kicker: { en: "D", cn: "日" }, title: "测试",
      image: { src: heroPath, position: "center 45%" }, // no source/license declared
    }],
  };
  const briefPath = path.join(dir, "brief.json");
  // build-in-place (outDir == briefDir) — reproduces the real duplicate-write bug
  await resolveBriefAssets(brief, briefPath, dir);
  await resolveBriefAssets(brief, briefPath, dir);
  const sources = fs.readFileSync(path.join(dir, "assets", "SOURCES.md"), "utf8");

  assert.match(sources, /UNVERIFIED|未声明来源/, "local-only image must be flagged as unverified provenance");
  assert.equal((sources.match(/## Resolved Assets/g) || []).length, 1, "re-run must not duplicate the Resolved Assets section");
});

test("imagePlan detects SP-WS imageRequest cards and renders the content-derived query and provider order", async () => {
  const brief = await planBrief(tmpMd(SAMPLE), { kind: "diary", format: "xhs" });
  const briefPath = writeBrief(brief);
  const outPath = path.join(path.dirname(briefPath), "IMAGE_REQUESTS.md");
  const { imagePlan } = await import("../src/imageWorkflow.mjs");

  const res = await imagePlan(briefPath, outPath);
  assert.ok(res.missing >= 1, "the imageless SP-WS cover must be detected as a missing image card");

  const md = fs.readFileSync(outPath, "utf8");
  assert.doesNotMatch(md, /\[object Object\]/, "object kicker must not leak into the request");
  assert.match(md, /suggested query:/);
  assert.match(md, /书桌|morning|desk|日记/, "content-derived query tokens should appear");
  assert.match(md, /stocksnap/, "imageRequest.providerOrder (CC0-aware) should be used");
});

test("image-fetch records honest source+license and patches the brief so the build gate passes", async () => {
  const dir = tmpDir();
  const server = http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "image/jpeg" });
    res.end(Buffer.from([0xff, 0xd8, 0xff, 0xd9]));
  });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const url = `http://127.0.0.1:${server.address().port}/photo.jpg`;

  const briefPath = path.join(dir, "brief.json");
  fs.writeFileSync(briefPath, JSON.stringify(coverNoImage(), null, 2), "utf8");

  const urlsPath = path.join(dir, "urls.json");
  fs.writeFileSync(urlsPath, JSON.stringify([
    { card: "01-cover", url, filename: "hero.jpg", source: "unsplash", license: "Unsplash License", position: "center 45%" },
  ], null, 2), "utf8");

  const { imageFetch } = await import("../src/imageWorkflow.mjs");
  const assetsDir = path.join(dir, "assets");
  await imageFetch(urlsPath, assetsDir, { brief: briefPath });
  await new Promise(r => server.close(r));

  const sources = fs.readFileSync(path.join(assetsDir, "SOURCES.md"), "utf8");
  assert.match(sources, /hero\.jpg <-.*unsplash/i, "SOURCES must record the real provider");
  assert.match(sources, /Unsplash License/, "SOURCES must record the license");

  const patched = JSON.parse(fs.readFileSync(briefPath, "utf8"));
  const cover = patched.cards[0];
  assert.ok(cover.image?.src, "cover image src must be patched into the brief");
  assert.equal(cover.image.source, "unsplash");
  assert.equal(cover.image.sourceUrl, url);

  const res = await buildDeck(briefPath, path.join(dir, "out"));
  assert.ok(fs.existsSync(res.indexPath), "build gate should pass after the fetch patches the image in");
});

const DOCUMENTED_PUBLIC = ["unsplash", "pexels", "stocksnap", "pixabay", "negativespace", "kaboompics", "burst", "rawpixel", "flickr-cc", "openverse", "wallhaven", "direct-search"];

test("providers cover the full documented collection (not just unsplash/pexels) with license tiers", async () => {
  const { listProviders } = await import("../src/imageWorkflow.mjs");
  const providers = listProviders();
  const ids = new Set(providers.map(p => p.id));
  for (const id of ["user", "ai", ...DOCUMENTED_PUBLIC]) {
    assert.ok(ids.has(id), `provider collection should include ${id}`);
  }
  const cc0 = providers.find(p => p.id === "stocksnap");
  assert.match(String(cc0.tier), /1|cc0/i, "StockSnap should be flagged as a CC0/Tier-1 source");
  const flickr = providers.find(p => p.id === "flickr-cc");
  assert.ok(flickr.tier != null, "every public source should carry a license tier");
});

test("plan cover imageRequest.providerOrder spans the full collection, not just unsplash/pexels", async () => {
  const brief = await planBrief(tmpMd(SAMPLE), { kind: "diary", format: "xhs" });
  const order = brief.cards[0].imageRequest.providerOrder;
  for (const id of ["stocksnap", "negativespace", "kaboompics", "burst", "rawpixel", "openverse"]) {
    assert.ok(order.includes(id), `providerOrder should include ${id}`);
  }
});

test("IMAGE_REQUESTS.md lists the full provider collection in its notes", async () => {
  const brief = await planBrief(tmpMd(SAMPLE), { kind: "diary", format: "xhs" });
  const briefPath = writeBrief(brief);
  const outPath = path.join(path.dirname(briefPath), "IMAGE_REQUESTS.md");
  const { imagePlan } = await import("../src/imageWorkflow.mjs");
  await imagePlan(briefPath, outPath);
  const md = fs.readFileSync(outPath, "utf8").toLowerCase();
  for (const name of ["stocksnap", "negativespace", "kaboompics", "burst", "rawpixel", "openverse"]) {
    assert.match(md, new RegExp(name), `provider notes should mention ${name}`);
  }
});

test("resolveBriefAssets 收集并入库图集 card.shots 多图（影像优先端到端取图、唯一文件名防覆盖）", async () => {
  const dir = tmpDir();
  const assetsIn = path.join(dir, "assets");
  fs.mkdirSync(assetsIn, { recursive: true });
  writeJpg(path.join(assetsIn, "g1.jpg"));
  writeJpg(path.join(assetsIn, "g2.jpg"));
  writeJpg(path.join(assetsIn, "g3.jpg"));
  const briefFile = path.join(dir, "brief.json");
  const brief = {
    meta: { style: "sp-warm", format: "xhs" },
    cards: [{
      name: "gallery", layout: "sp-ws-body-gallery",
      shots: [
        { image: { src: "assets/g1.jpg" }, cap: "一" },
        { image: { src: "assets/g2.jpg" }, cap: "二" },
        { image: { src: "assets/g3.jpg" }, cap: "三" },
      ],
    }],
  };
  fs.writeFileSync(briefFile, JSON.stringify(brief), "utf8");
  const resolved = await resolveBriefAssets(brief, briefFile, path.join(dir, "out"));
  const shots = resolved.cards[0].shots;
  assert.ok(shots[0].image.resolvedSrc, "shot1 应回填 resolvedSrc（shots 进取图管线）");
  assert.ok(shots[1].image.resolvedSrc, "shot2 应回填 resolvedSrc");
  assert.ok(shots[2].image.resolvedSrc, "shot3 应回填 resolvedSrc");
  const srcs = shots.map(s => s.image.resolvedSrc);
  assert.equal(new Set(srcs).size, 3, "三图 resolvedSrc 各异（防 image.jpg 互相覆盖回归）");
});

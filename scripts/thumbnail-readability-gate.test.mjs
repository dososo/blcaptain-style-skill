import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { validateDeck } from "../src/validate.mjs";

// P0-1 360px 缩略图可读 gate（R12_THUMBNAIL_READABILITY）
// 本质：poster 渲染宽 W，缩到小红书信息流 360px 缩略图时缩放比 360/W，
// 正文 fs × (360/W) 须 ≥ 9px 才可读。W=1080 时 → 正文须 ≥ 27px。
// 规则在 Playwright 路径（需真实测 W）；无 Playwright 时跳过几何断言。

function writeDeck(html) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "thumb-gate-"));
  fs.writeFileSync(path.join(dir, "index.html"), html);
  return dir;
}

const deck = (bodyFontPx) => `<!doctype html><html><head><meta charset="utf-8"></head><body>
<section class="poster xhs" data-name="01" style="width:1080px;height:1440px;position:relative;box-sizing:border-box;padding:80px">
  <h1 style="font-size:64px">标题足够大</h1>
  <p style="font-size:${bodyFontPx}px;line-height:1.8">这是一段需要在小红书信息流缩略图下依然清晰可读的正文内容，用于验证字阶护栏是否生效。</p>
</section></body></html>`;

test("R12: 正文 18px（缩略 360px 下仅 6px）应被标记不可读", async () => {
  const dir = writeDeck(deck(18));
  const res = await validateDeck(dir);
  if (res.renderer !== "playwright") return; // 无 Playwright 环境：跳过几何断言
  const rules = res.report.flatMap(r => r.issues).map(i => i.rule);
  assert.ok(
    rules.includes("R12_THUMBNAIL_READABILITY"),
    `expected R12 flagged for 18px body; got rules: ${rules.join(",")}`
  );
});

test("R12: 正文 30px（缩略 360px 下 10px）应可读、不报", async () => {
  const dir = writeDeck(deck(30));
  const res = await validateDeck(dir);
  if (res.renderer !== "playwright") return;
  const rules = res.report.flatMap(r => r.issues).map(i => i.rule);
  assert.ok(
    !rules.includes("R12_THUMBNAIL_READABILITY"),
    `expected no R12 for 30px body; got rules: ${rules.join(",")}`
  );
});

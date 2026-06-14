import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { validateDeck } from "../src/validate.mjs";

// P0-2/3/4 validate 内容护栏测试（R13 字符密度 / R14 证据诚信 / R15 portrait-fill）
// 几何/密度规则在 Playwright 路径；测试检测 renderer，static 环境跳过几何断言。

function writeDeck(html) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "vcgate-"));
  fs.writeFileSync(path.join(dir, "index.html"), html);
  return dir;
}
function poster(inner, style = "") {
  return `<!doctype html><html><head><meta charset="utf-8"></head><body>
<section class="poster xhs" data-name="01" style="width:1080px;height:1440px;position:relative;box-sizing:border-box;padding:80px;${style}">${inner}</section>
</body></html>`;
}
const seg = "在一个普通的周末午后我泡了壶茶把手机静音特意把阅读速度放得很慢"; // ~30 字

// ---- P0-2 R13_TEXT_DENSITY：>3.5 字/万px²（约 >540 字/卡）→ 缩略图糊成一团 → WARN ----
test("R13: 文字塞满(约600+字)的卡片应被标记过密", async () => {
  const dense = `<p style="font-size:28px;line-height:1.7">${seg.repeat(20)}</p>`;
  const res = await validateDeck(writeDeck(poster(dense)));
  if (res.renderer !== "playwright") return;
  const rules = res.report.flatMap(r => r.issues).map(i => i.rule);
  assert.ok(rules.includes("R13_TEXT_DENSITY"), `expected R13 for dense text; got: ${rules.join(",")}`);
});
test("R13: 正常字数(约120字)不报过密", async () => {
  const normal = `<h1 style="font-size:60px">标题</h1><p style="font-size:28px;line-height:1.8">${seg.repeat(4)}</p>`;
  const res = await validateDeck(writeDeck(poster(normal)));
  if (res.renderer !== "playwright") return;
  const rules = res.report.flatMap(r => r.issues).map(i => i.rule);
  assert.ok(!rules.includes("R13_TEXT_DENSITY"), `expected no R13 for normal; got: ${rules.join(",")}`);
});

// ---- P0-4 R15_PORTRAIT_FILL：Signal 证据/数据卡内容须填充 ≥78%（证据要充实）；Still Paper 留白美学豁免 ----
function slData(inner) {
  return `<!doctype html><html><head><meta charset="utf-8"></head><body>
<section class="poster xhs layout-sl-ev-data" data-name="01" style="width:1080px;height:1440px;position:relative;box-sizing:border-box;padding:80px">${inner}</section>
</body></html>`;
}
test("R15: Signal 数据卡内容塌顶部(稀薄)应被标记", async () => {
  const sparse = `<p style="font-size:30px;position:absolute;top:80px;left:80px;width:900px">${seg}稀薄内容塌在顶部下方大片空白。</p>`;
  const res = await validateDeck(writeDeck(slData(sparse)));
  if (res.renderer !== "playwright") return;
  const rules = res.report.flatMap(r => r.issues).map(i => i.rule);
  assert.ok(rules.includes("R15_PORTRAIT_FILL"), `expected R15 for sparse signal; got: ${rules.join(",")}`);
});
test("R15: Signal 数据卡内容撑满(≥78%)不报", async () => {
  const full = `<p style="font-size:30px;position:absolute;top:80px;left:80px;width:900px">顶部${seg}。</p><p style="font-size:30px;position:absolute;bottom:80px;left:80px;width:900px">底部${seg}撑满。</p>`;
  const res = await validateDeck(writeDeck(slData(full)));
  if (res.renderer !== "playwright") return;
  const rules = res.report.flatMap(r => r.issues).map(i => i.rule);
  assert.ok(!rules.includes("R15_PORTRAIT_FILL"), `expected no R15 for full signal; got: ${rules.join(",")}`);
});
test("R15: Still Paper 留白卡(非 Signal)豁免、不报（留白是灵魂，不照搬外部密集标准）", async () => {
  const sp = `<p style="font-size:30px;position:absolute;top:380px;left:80px;width:900px">居中留白的静纸正文只占中部这是设计不是稀薄。</p>`;
  const res = await validateDeck(writeDeck(poster(sp)));
  if (res.renderer !== "playwright") return;
  const rules = res.report.flatMap(r => r.issues).map(i => i.rule);
  assert.ok(!rules.includes("R15_PORTRAIT_FILL"), `expected no R15 for Still Paper whitespace; got: ${rules.join(",")}`);
});

// ---- P0-3 R14_EVIDENCE_INTEGRITY (GM-13)：Signal 截图证据卡不得用 AI 生成图当"证据"（假证据毁护城河）→ FAIL ----
function evPoster(alt, srcText) {
  return `<!doctype html><html><head><meta charset="utf-8"></head><body>
<section class="poster xhs layout-sl-ev-screenshot" data-name="01" style="width:1080px;height:1440px;position:relative;box-sizing:border-box;padding:60px">
  <figure class="sl-ev-shot"><div class="sl-ev-shotimg"><img src="shot.jpg" alt="${alt}" style="object-position:center;width:900px;height:520px"></div>
  <figcaption class="sl-ev-shotcap"><span>EVIDENCE · 截图证据</span></figcaption></figure>
  <div class="sl-ev-src">${srcText}</div>
  <p style="font-size:28px">证据卡说明文字内容用于撑起正常密度与填充。这是一段真实记录的过程说明。</p>
</section></body></html>`;
}
test("R14: 截图证据卡用 AI 生成图当证据应被阻塞 FAIL", async () => {
  const res = await validateDeck(writeDeck(evPoster("AI generated abstract render", "来源：AI 生成配图")));
  if (res.renderer !== "playwright") return;
  const rules = res.report.flatMap(r => r.issues).map(i => i.rule);
  assert.ok(rules.includes("R14_EVIDENCE_INTEGRITY"), `expected R14 for AI evidence; got: ${rules.join(",")}`);
});
test("R14: 截图证据卡用真实截图不报（内容提到 AI 工具也不误伤）", async () => {
  const res = await validateDeck(writeDeck(evPoster("AI 工具后台真实操作截图", "来源：用户提供截图")));
  if (res.renderer !== "playwright") return;
  const rules = res.report.flatMap(r => r.issues).map(i => i.rule);
  assert.ok(!rules.includes("R14_EVIDENCE_INTEGRITY"), `expected no R14 for real screenshot; got: ${rules.join(",")}`);
});

// ---- P0-5 R16_CJK_TYPOGRAPHY (GM-10)：中文正文不得 justify 两端对齐 / 伪斜体（英文 italic 保留）→ WARN ----
test("R16: 中文正文 justify 两端对齐应被标记", async () => {
  const j = `<p style="font-size:28px;text-align:justify">这是一段使用了两端对齐的中文正文两端对齐会拉开汉字间距很不专业应避免。</p>`;
  const res = await validateDeck(writeDeck(poster(j)));
  if (res.renderer !== "playwright") return;
  const rules = res.report.flatMap(r => r.issues).map(i => i.rule);
  assert.ok(rules.includes("R16_CJK_TYPOGRAPHY"), `expected R16 for justify CJK; got: ${rules.join(",")}`);
});
test("R16: 中文左对齐 + 英文斜体副题不报（不误伤英文 italic 声部）", async () => {
  const ok = `<h1 style="font-size:60px">标题</h1><p style="font-size:28px;text-align:left">正常左对齐的中文正文内容专业排版撑满。</p><p style="font-size:24px;font-style:italic">Morning Clarity Editorial Voice</p>`;
  const res = await validateDeck(writeDeck(poster(ok)));
  if (res.renderer !== "playwright") return;
  const rules = res.report.flatMap(r => r.issues).map(i => i.rule);
  assert.ok(!rules.includes("R16_CJK_TYPOGRAPHY"), `expected no R16 for clean CJK + EN italic; got: ${rules.join(",")}`);
});




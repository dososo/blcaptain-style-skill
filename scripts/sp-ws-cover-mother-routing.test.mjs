import test from "node:test";
import assert from "node:assert/strict";
import { planBrief, inferCoverMother, inferSystem } from "../src/plan.mjs";

// 封面母体显式路由契约（options.coverMother → cover.layout/variant + 需/免图 + 派生母体字段）。
// 强制 kind:"opinion" 走 sp-ws 路径（coverMother 仅在 planSpWsBrief 生效）。
const ART = "examples/source-article.md"; // committed 素材
const base = { style: "sp-warm", format: "xhs", kind: "opinion" };
const cover = async (opts) => (await planBrief(ART, { ...base, ...opts })).cards[0];

test("默认封面(无 coverMother)保持 photo + photo 母体 imageRequest（向后兼容）", async () => {
  const c = await cover({});
  assert.equal(c.layout, "sp-ws-cover-photo");
  assert.ok(!c.variant);
  assert.equal(c.imageRequest?.mother, "photo");
});

test("R01/bleed → cover-photo + bleed variant + bleed 母体 imageRequest", async () => {
  const c = await cover({ coverMother: "R01" });
  assert.equal(c.layout, "sp-ws-cover-photo");
  assert.equal(c.variant, "bleed");
  assert.equal(c.imageRequest?.mother, "bleed");
});

test("R04/statement → 无图 type 封面（删 imageRequest）+ 派生底字 anchorChar", async () => {
  const c = await cover({ coverMother: "statement" });
  assert.equal(c.layout, "sp-ws-cover-statement");
  assert.ok(!c.imageRequest);
  assert.ok(c.anchorChar);
});

test("R05/quote → 需图(quote 母体 imageRequest) + 派生 attrib", async () => {
  const c = await cover({ coverMother: "quote" });
  assert.equal(c.layout, "sp-ws-cover-quote");
  assert.equal(c.imageRequest?.mother, "quote");
  assert.ok(c.attrib);
});

test("R06/object → 需图(object 母体 imageRequest) + 派生 platecap", async () => {
  const c = await cover({ coverMother: "object" });
  assert.equal(c.layout, "sp-ws-cover-object");
  assert.equal(c.imageRequest?.mother, "object");
  assert.ok(c.platecap);
});

test("R07/index → 无图清单封面；items 透传", async () => {
  const c = await cover({ coverMother: "R07", items: [{ word: "一支笔", note: "x" }] });
  assert.equal(c.layout, "sp-ws-cover-index");
  assert.ok(!c.imageRequest);
  assert.equal(c.items?.length, 1);
});

test("R08/number → 无图数字封面；bignum+unit 透传", async () => {
  const c = await cover({ coverMother: "number", bignum: "21", unit: "天" });
  assert.equal(c.layout, "sp-ws-cover-number");
  assert.ok(!c.imageRequest);
  assert.equal(c.bignum, "21");
  assert.equal(c.unit, "天");
});

test("未知 coverMother 名 → 回退默认 photo（不崩）", async () => {
  const c = await cover({ coverMother: "nope" });
  assert.equal(c.layout, "sp-ws-cover-photo");
});

test("免图母体忽略 options.image（R04 保持无图）", async () => {
  const c = await cover({ coverMother: "statement", image: { src: "x.jpg" } });
  assert.ok(!c.image);
});

// ── auto 路由（coverMother:"auto" → inferCoverMother 内容形状/kind→母体）──
const autoCover = async (kind, extra = {}) =>
  (await planBrief(ART, { style: "sp-warm", format: "xhs", kind, coverMother: "auto", ...extra })).cards[0];

test("auto: reading → object", async () => {
  assert.equal((await autoCover("reading")).layout, "sp-ws-cover-object");
});
test("auto: emotion → quote", async () => {
  assert.equal((await autoCover("emotion")).layout, "sp-ws-cover-quote");
});
test("auto: travel → bleed (cover-photo + bleed variant)", async () => {
  const c = await autoCover("travel");
  assert.equal(c.layout, "sp-ws-cover-photo");
  assert.equal(c.variant, "bleed");
});
test("auto: opinion 长标题 → 兜底 photo（不强路由短标题母体）", async () => {
  const c = await autoCover("opinion");
  assert.equal(c.layout, "sp-ws-cover-photo");
  assert.ok(!c.variant);
});
test("auto: opinion + 短标题 → statement", async () => {
  const c = await autoCover("opinion", { title: "慢即是快" });
  assert.equal(c.layout, "sp-ws-cover-statement");
});

test("短标题母体 backstop：显式 statement + 长标题 → 标题裁剪 ≤16（防溢出）", async () => {
  const c = await cover({ coverMother: "statement", title: "这是一个非常非常非常长的中文标题会溢出版面绝对不行的那种" });
  assert.ok(c.title.replace(/\n/g, "").length <= 16, `title should be capped, got: ${c.title}`);
});

// ── inferCoverMother 纯函数：R08 数字 / R07 清单 强信号抽取 ──
test("infer R08：标题数字 hook(N≥2+量词) → number，抽 bignum/unit + 标题去数字短语", () => {
  const r = inferCoverMother("正文随意", "opinion", "21天养成一个新习惯", []);
  assert.equal(r.mother, "number");
  assert.equal(r.fields.bignum, "21");
  assert.equal(r.fields.unit, "天");
  assert.ok(!/21|天/.test(r.fields.title.replace(/\n/g, "")), "标题应去掉数字短语");
});
test("infer R07：清单框架 + ≥3 项 → index，透传 items", () => {
  const items = [{ word: "一支笔" }, { word: "一个本" }, { word: "一瓶水" }];
  const r = inferCoverMother("出门必备的随身清单……", "opinion", "出门必备的随身清单", items);
  assert.equal(r.mother, "index");
  assert.equal(r.fields.items.length, 3);
});
test("infer：清单项不足 3 → 不路由 index（回退 photo，避免空壳）", () => {
  const r = inferCoverMother("普通文章", "opinion", "普通的长标题没有清单框架词", [{ word: "x" }]);
  assert.notEqual(r.mother, "index");
});
test("infer：数字过小(1) 不触发 number", () => {
  const r = inferCoverMother("", "diary", "1个人的旅行", []);
  assert.notEqual(r.mother, "number");
});

// ── Signal Proof planner（路线 B，opt-in system:"signal"）──
test("system:signal → planSignalBrief：cover=sl-cv 三形态(按内容自动路由) + meta.system + ≥2 卡", async () => {
  const b = await planBrief(ART, { style: "sl-blue", system: "signal", kind: "tutorial" });
  assert.equal(b.meta.system, "signal-ledger");
  assert.match(b.cards[0].layout, /^sl-cv-(statement|figure|grid)$/, "封面按内容形态自动路由(纯文字/数据/截图)");
  assert.ok(b.cards.length >= 2, "≥2 页组图");
  assert.ok(b.cards.every(c => String(c.layout).startsWith("sl-")), "全 Signal 卡");
});
test("system:signal opt-in 不影响默认路由（无 system → Still Paper）", async () => {
  const b = await planBrief(ART, { style: "sp-warm", kind: "opinion" });
  assert.notEqual(b.meta.system, "signal-ledger");
  assert.ok(String(b.cards[0].layout).startsWith("sp-ws-cover"));
});
test("system:bridge → planBridgeBrief：cover=bc-cover(需图) + meta.system=bridge-canvas", async () => {
  const b = await planBrief(ART, { style: "sl-blue", system: "bridge" });
  assert.equal(b.meta.system, "bridge-canvas");
  assert.equal(b.cards[0].layout, "bc-cover");
  assert.ok(b.cards[0].imageRequest, "Bridge 封面需 imageRequest");
});
test("inferSystem：tech/AI/数据→signal，生活→null(Still Paper)", () => {
  assert.equal(inferSystem("用 Claude Agent 并行跑代码评测", "tutorial"), "signal");
  assert.equal(inferSystem("KPI 复盘，转化率涨了", "data"), "signal");
  assert.equal(inferSystem("在湖边散步，找回呼吸的节奏", "diary"), null);
  assert.equal(inferSystem("清晨写下心里的念头", "opinion"), null);
});
test("system:auto → tech 内容自动入 Signal（ART=Sub-Agents 实战）", async () => {
  const b = await planBrief(ART, { system: "auto", kind: "tutorial", style: "sl-blue" });
  assert.equal(b.meta.system, "signal-ledger");
  assert.match(b.cards[0].layout, /^sl-cv-(statement|figure|grid)$/);
});
test("system:auto 不破默认（无 system → Still Paper 不变）", async () => {
  const b = await planBrief(ART, { kind: "opinion", style: "sp-warm" });
  assert.ok(String(b.cards[0].layout).startsWith("sp-ws-cover"));
  assert.notEqual(b.meta.system, "signal-ledger");
});

import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { renderHtml } from "../src/engine.mjs";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── #3 Signal 证据方法论：plan --system signal 内容形状 → 6 类 sl-ev 证据卡 ──
// 数据→DATA/INSIGHT、步骤→WORKFLOW、对比→COMPARE、随笔→FIELD NOTE、用户给截图→SCREENSHOT。
// 不再出旧 sl-cover-ledger / sl-body-grid / sl-cover-verdict / sl-body-flow（路由已迁移）。
// 封面保留 sl-cover-hero / split / manifesto。

function planSignal(md, extraArgs = []) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "blcaptain-sig-route-"));
  const src = path.join(tmp, "src.md");
  const out = path.join(tmp, "brief.json");
  fs.writeFileSync(src, md, "utf8");
  execFileSync(process.execPath, ["bin/blcaptain-style.mjs", "plan", src, "--out", out, "--system", "signal", ...extraArgs], { cwd: process.cwd(), encoding: "utf8" });
  return JSON.parse(fs.readFileSync(out, "utf8"));
}
const layoutsOf = brief => brief.cards.map(c => c.layout);

const DATA_MD = `# 本周数据复盘\n\n核心指标如下，逐项校验。\n\n- 首屏耗时：96ms（↓ 70%）\n- 总信号数：12,840 条（↑ 24.6%）\n- 周留存：63%（↑ 8pt）\n- 错误率：0.4%\n`;
const TREND_MD = `# 三个月趋势已验证\n\n首屏耗时持续下降，趋势可追溯。\n\n- 月度首屏耗时：320 240 180 130 96\n- 周留存稳定在 63%\n`;
const STEPS_MD = `# 四步把首屏做快\n\n方法论拆解如下，每步留回滚开关。\n\n- 第一步：拆关键路径，先出首屏\n- 第二步：图片懒加载，按需加载\n- 第三步：关键 CSS 内联，砍请求\n- 第四步：持续度量，盯住指标\n`;
const COMPARE_MD = `# 写作的两种姿态\n\n分享我踩过的坑与后来的修正。\n\n误区：以为写得越多越好。\n正解：少而精，读者才记得住。\n误区：只顾自己想表达什么。\n正解：先站在读者角度想。\n`;
const ESSAY_MD = `# 在噪声里守住判断\n\n信息过载的时候，我常常提醒自己慢下来。先记录，再校验，最后沉淀。每一个判断都该留下出处，而不是被情绪推着走。安静地观察，往往比急着表态更有力量。慢下来，反而走得更远。\n`;

test("数据指标文章 → sl-ev-data 网格卡（tech 单位 ms/% 也能抓）", () => {
  const ls = layoutsOf(planSignal(DATA_MD));
  assert.ok(ls.includes("sl-ev-data"), `应含 sl-ev-data，实得 ${ls}`);
});

test("趋势序列文章 → sl-ev-insight 折线卡", () => {
  const ls = layoutsOf(planSignal(TREND_MD));
  assert.ok(ls.includes("sl-ev-insight"), `应含 sl-ev-insight，实得 ${ls}`);
});

test("步骤文章 → sl-ev-workflow 工作流卡", () => {
  const ls = layoutsOf(planSignal(STEPS_MD));
  assert.ok(ls.includes("sl-ev-workflow"), `应含 sl-ev-workflow，实得 ${ls}`);
});

test("对比文章（误区/正解）→ sl-ev-compare 对比卡", () => {
  const ls = layoutsOf(planSignal(COMPARE_MD));
  assert.ok(ls.includes("sl-ev-compare"), `应含 sl-ev-compare，实得 ${ls}`);
});

test("随笔文章（无数据无步骤）→ sl-ev-fieldnote 现场记录卡", () => {
  const ls = layoutsOf(planSignal(ESSAY_MD));
  assert.ok(ls.includes("sl-ev-fieldnote"), `应含 sl-ev-fieldnote，实得 ${ls}`);
});

test("用户提供截图（--shot）→ sl-ev-screenshot 卡且挂 image（诚实标来源，不冒充）", () => {
  const brief = planSignal(DATA_MD, ["--shot", "/tmp/fake-shot.png"]);
  const ss = brief.cards.find(c => c.layout === "sl-ev-screenshot");
  assert.ok(ss, `应出 sl-ev-screenshot，实得 ${layoutsOf(brief)}`);
  assert.ok(ss.image && (ss.image.src || ss.image.resolvedSrc), "screenshot 应挂用户截图 image");
});

test("正文不再出旧 sl-cover-ledger / sl-body-grid / sl-cover-verdict / sl-body-flow", () => {
  for (const md of [DATA_MD, STEPS_MD, COMPARE_MD, TREND_MD]) {
    const ls = layoutsOf(planSignal(md));
    for (const dead of ["sl-cover-ledger", "sl-body-grid", "sl-cover-verdict", "sl-body-flow"]) {
      assert.ok(!ls.includes(dead), `${dead} 不应再出现，实得 ${ls}`);
    }
  }
});

// 混合内容（趋势+指标+步骤+对比 同一篇）路由不串味 —— 渲染后发现的真实 bug，锁定防回归。
test("混合内容不串味：workflow 是步骤·data 是真指标·compare 不含指标行·insight 排除序列首值", () => {
  const MIX = `# 复盘\n\n## 趋势\n- 月度耗时：320 240 180 130 96\n\n## 指标\n- 首屏耗时：96ms（↓70%）\n- 总信号数：12,840 条\n- 周留存：63%\n- 错误率：0.4%\n\n## 做法\n- 第一步：拆关键路径\n- 第二步：图片懒加载\n- 第三步：持续度量\n\n## 心态\n误区：以为加缓存解决一切。\n正解：先定位真正的瓶颈。\n`;
  const b = planSignal(MIX);
  const wf = b.cards.find(c => c.layout === "sl-ev-workflow");
  assert.ok(wf, "应出 workflow");
  assert.ok(wf.steps.some(s => /拆关键路径|懒加载|度量/.test(s.title)), `workflow 应是步骤，实得 ${JSON.stringify(wf.steps.map(s => s.title))}`);
  assert.ok(!wf.steps.some(s => /首屏耗时|总信号|周留存|错误率/.test(s.title)), "workflow 不应混入指标行");
  const data = b.cards.find(c => c.layout === "sl-ev-data");
  assert.ok(data && !data.cells.some(c => c.value === "320"), "data 不应含序列首值 320");
  const cmp = b.cards.find(c => c.layout === "sl-ev-compare");
  if (cmp) assert.ok(!JSON.stringify(cmp.cols).includes("错误率"), "compare 不应混入'错误率'指标行");
});

test("fieldnote 卡带 imageRequest（强制先取图 gate）", () => {
  const fn = planSignal(ESSAY_MD).cards.find(c => c.layout === "sl-ev-fieldnote");
  assert.ok(fn && fn.imageRequest, "fieldnote 应挂 imageRequest（内容派生取图）");
});

test("Signal 组图首卡是 sl-cv 封面（按内容形态自动路由：statement/figure/grid）", () => {
  for (const md of [DATA_MD, ESSAY_MD, TREND_MD]) {
    const first = planSignal(md).cards[0].layout;
    assert.match(first, /^sl-cv-(statement|figure|grid)$/, `首卡应为 sl-cv 封面，实得 ${first}`);
  }
  // 有趋势序列 → figure；纯随笔 → statement
  assert.equal(planSignal(TREND_MD).cards[0].layout, "sl-cv-figure", "趋势内容首卡应 figure");
  assert.equal(planSignal(ESSAY_MD).cards[0].layout, "sl-cv-statement", "纯文字首卡应 statement");
});

// ── engine：sl-ev-compare 双栏要点模式（cols）渲染两栏对照；逐维度模式（rows）保留三列表（无回归）──
const evCard = (extra) => ({ name: "t", layout: "sl-ev-compare", style: "sl-blue", title: "对照", ...extra });
const html = (c) => renderHtml({ meta: { title: "t", format: "xhs" }, cards: [c] });

// 注：renderHtml 内联 CSS（<style> 含 .sl-ev-cmp-cols 规则文本），故断言精确匹配 DOM 的 class="..." 形式，避免误判 CSS 文本。
test("sl-ev-compare 双栏 cols 模式渲染两栏对照（误区/正解，accent 强调正栏）", () => {
  const h = html(evCard({ cols: [{ head: "误区", points: ["以为多就是好"] }, { head: "正解", points: ["少而精才有效"] }] }));
  assert.match(h, /class="sl-ev-cmp sl-ev-cmp-cols"/, "双栏模式应生成 sl-ev-cmp-cols div");
  assert.match(h, /class="sl-ev-col sl-ev-col-b"/, "应有 accent 强调的正栏 b");
  assert.match(h, /少而精才有效/, "应渲染正栏要点");
  assert.match(h, /以为多就是好/, "应渲染误栏要点");
});

test("sl-ev-compare 逐维度 rows 模式仍渲染三列表（无回归）", () => {
  const h = html(evCard({ optionA: "方案A", optionB: "方案B", rows: [{ dim: "首屏耗时", a: "180ms", b: "96ms" }] }));
  assert.match(h, /class="sl-ev-cmprow"/, "应渲染三列表行");
  assert.doesNotMatch(h, /class="sl-ev-cmp sl-ev-cmp-cols"/, "rows 模式不应生成双栏 div");
});

// 对外发布铁律：用户拿 skill 生成自己内容，卡面不能出现我们的内部代号/demo 假信息。
test("中性化：plan 默认不产出内部署名/编号/假来源（SIGNAL LEDGER / SL-0x / Signal Proof Analytics）", () => {
  for (const md of [DATA_MD, ESSAY_MD, STEPS_MD, COMPARE_MD]) {
    const json = JSON.stringify(planSignal(md));
    assert.ok(!/SIGNAL LEDGER/.test(json), `不应含内部署名 SIGNAL LEDGER`);
    assert.ok(!/"folio"\s*:\s*"SL-/.test(json), `不应含内部编号 folio SL-0x`);
    assert.ok(!/Signal Proof Analytics/.test(json), `不应含 demo 假来源 Signal Proof Analytics`);
  }
});

test("可定制：用户给 --brand 时署名生效（覆盖中性默认）", () => {
  const json = JSON.stringify(planSignal(DATA_MD, ["--brand", "晨间观察"]));
  assert.ok(/晨间观察/.test(json), "用户 --brand 应印到卡上");
});

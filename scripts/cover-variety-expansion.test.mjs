import test from "node:test";
import assert from "node:assert/strict";
import { renderHtml } from "../src/engine.mjs";
import { planBrief, inferCoverStyle } from "../src/plan.mjs";

const ART = "examples/source-article.md";

// Signal/Bridge 封面版式扩充（对齐"版式单一/排版欠缺/图片重复"反馈）：
// 黑卡 Noir Poster(3构图×3语言) + Bridge 上下分割 bc-split + Signal 宣言无图大字 manifesto。
const base = (layout, extra = {}) => ({
  name: "t", layout, style: extra.style || "sl-signal-noir",
  kicker: { en: "BRIDGE CANVAS" }, index: "NO. 01", kickerLine: "FIELD NOTES",
  title: "标题**强调**\n第二行", titleEn: "An editorial subtitle", lead: "说明。",
  spine: "竖 脊", bandcap: "STILL LIFE", footer: "BLCAPTAIN", footerR: "ISSUE 01",
  image: { resolvedSrc: "assets/x.jpg", src: "assets/x.jpg", alt: "x" }, ...extra,
});
const html = (c) => renderHtml({ meta: { title: "t", format: "xhs" }, cards: [c] });

test("黑卡 bc-noir 渲染：满铺暗场 veil + 颗粒 + 金句点睛", () => {
  const h = html(base("bc-noir", { lang: "cn", variant: "center" }));
  assert.match(h, /layout-bc-noir/);
  assert.match(h, /bc-veil/, "暗场 veil");
  assert.match(h, /bc-grain/, "颗粒");
  assert.match(h, /<strong>强调<\/strong>/, "**强调** → 金色点睛词");
});

test("黑卡 bc-noir 三语言模式类（cn/mix/en）随 lang 注入", () => {
  for (const lang of ["cn", "mix", "en"]) {
    assert.match(html(base("bc-noir", { lang })), new RegExp(`bc-lang-${lang}`), `lang=${lang}`);
  }
  // mix 才出英文副题块；engine 始终渲染 .bc-en，靠 CSS 在 cn/en 隐藏
  assert.match(html(base("bc-noir", { lang: "mix" })), /bc-en/, "mix 应有英文副题块");
});

test("黑卡 bc-noir 三构图（center/bottom/edge）走 posterOpen 通用 sp-var 后缀（engine 零改）", () => {
  for (const v of ["center", "bottom", "edge"]) {
    assert.match(html(base("bc-noir", { variant: v })), new RegExp(`sp-var-${v}`), `variant=${v}`);
  }
});

test("Bridge 上下分割 bc-split：图 band + 奶纸字版 + bcs 语言类", () => {
  const h = html(base("bc-split", { lang: "mix" }));
  assert.match(h, /layout-bc-split/);
  assert.match(h, /bc-band/, "图 band");
  assert.match(h, /bc-field/, "奶纸字版");
  assert.match(h, /bcs-mix/, "bcs 语言模式类");
  assert.match(h, /assets\/x\.jpg/, "需图：渲染图片");
});

test("Bridge 标题穿插主体 bc-weave：雾感 scrim + 上下标题段 + 楷体声部", () => {
  const h = html(base("bc-weave", { font: "kai", titleTop: "把自己，", titleBot: "还给**山野**", spine: "旷 野" }));
  assert.match(h, /layout-bc-weave/);
  assert.match(h, /bc-font-kai/, "font=kai → 楷体声部类");
  assert.match(h, /bc-mist/, "雾感 scrim（非重压暗场）");
  assert.match(h, /bc-weave-top/, "上段标题（绕主体穿插）");
  assert.match(h, /bc-weave-bot/, "下段标题");
  assert.match(h, /<strong>山野<\/strong>/, "**山野** → 金色点睛");
});

test("Signal 宣言无图大字 manifesto：type-as-hero，零图，accent 标尺", () => {
  const h = html(base("sl-cover-manifesto", { image: undefined }));
  assert.match(h, /layout-sl-cover-manifesto/);
  assert.match(h, /sl-cover/, "继承 Signal 共享 chrome");
  assert.match(h, /sl-manifesto/, "宣言区");
  assert.match(h, /sl-mbar/, "粗 accent 标尺装置");
  assert.doesNotMatch(h, /<img/, "无图封面不得渲染 <img>");
});

test("Signal 图+数据 split：证据图 duotone + 折线趋势 SVG + 数据行", () => {
  const h = html(base("sl-cover-split", { style: "sl-blue", series: [10, 14, 12, 20, 31], trend: "+38%", rows: [{ label: "延迟", value: "112ms" }] }));
  assert.match(h, /layout-sl-cover-split/);
  assert.match(h, /sl-split-img/, "证据图 band");
  assert.match(h, /id="sl-duo"/, "主题色三调 duotone 滤镜");
  assert.match(h, /sl-spark-line/, "折线趋势 SVG");
  assert.match(h, /sl-srow/, "数据行");
});

test("字体声部 + accent 可主题化：font→bc-font-* / accent→--bc-gold 覆盖", () => {
  assert.match(html(base("bc-noir", { lang: "en", font: "didot" })), /bc-font-didot/, "font=didot 声部类");
  // 作用域到 <section> 内联 style（html() 含全量 CSS，CSS 里本就有默认 --bc-gold，故须只看 section 标签）
  const sect = h => h.match(/<section[^>]*layout-bc-noir[^>]*>/)[0];
  assert.match(sect(html(base("bc-noir", { accent: "#6F805D" }))), /style="--bc-gold:#6F805D;/, "accent → section 内联 --bc-gold 覆盖（置首）");
  assert.doesNotMatch(sect(html(base("bc-noir"))), /--bc-gold:/, "无 accent 时 section 内联不注入 --bc-gold（默认零影响）");
});

test("C plan 路由 productize：Bridge coverStyle 映射 layout，默认零影响", async () => {
  const noir = await planBrief(ART, { system: "bridge", coverStyle: "noir" });
  assert.equal(noir.cards[0].layout, "bc-noir", "coverStyle=noir → bc-noir");
  assert.ok(noir.cards[0].imageRequest, "noir 封面挂 imageRequest（需图 gate）");
  const weave = await planBrief(ART, { system: "bridge", coverStyle: "weave" });
  assert.equal(weave.cards[0].layout, "bc-weave");
  assert.ok(weave.cards[0].titleBot, "weave 拆出下段标题");
  const def = await planBrief(ART, { system: "bridge" });
  assert.equal(def.cards[0].layout, "bc-cover", "默认仍 bc-cover（零默认影响）");
});

test("C plan 路由：Signal coverStyle=manifesto → 无图宣言封面", async () => {
  const m = await planBrief(ART, { system: "signal", coverStyle: "manifesto" });
  assert.equal(m.cards[0].layout, "sl-cover-manifesto");
  assert.ok(!m.cards[0].image, "manifesto 封面不挂 image");
  assert.ok(!m.cards[0].imageRequest, "manifesto 封面不挂 imageRequest（零图）");
  const def = await planBrief(ART, { system: "signal" });
  assert.match(def.cards[0].layout, /^sl-cv-(statement|figure|grid)$/, "默认走 sl-cv 三形态按内容自动路由（statement/figure/grid）");
});

test("inferCoverStyle：内容形状/情绪 → coverStyle（auto 自动选）", () => {
  assert.equal(inferCoverStyle("一个人走进雾里的山野，安静地呼吸。", "bridge"), "weave", "雾景/自然→weave");
  assert.equal(inferCoverStyle("关于阅读与收藏时间的手记，旧书与器物。", "bridge"), "split", "静物/阅读→split");
  assert.equal(inferCoverStyle("深夜的态度，一种孤勇的宣言。", "bridge"), "noir", "深夜/态度→noir");
  assert.equal(inferCoverStyle("今天的产品更新说明。", "bridge"), "cover", "弱信号→cover 兜底");
  assert.equal(inferCoverStyle("设计的本质就是取舍，别贪多。", "signal"), "manifesto", "断言/观点→manifesto");
  assert.equal(inferCoverStyle("延迟从 120 降到 80，留存 63%，错误 0.4%。", "signal"), "split", "数据密集→split（自动 series）");
  assert.equal(inferCoverStyle("今天随便聊聊。", "signal"), null, "无强信号→默认 hero");
});

test("Signal split 自动 series：从数字推导折线 + trend + 数据行", async () => {
  const tmp = "/tmp/sl-split-art.md";
  await (await import("node:fs/promises")).writeFile(tmp, "# 性能复盘\n\n延迟 120 / 98 / 90 / 76 / 64ms 一路下降。\n\n- P95 延迟：64ms\n- 周留存：63%\n", "utf8");
  const b = await planBrief(tmp, { system: "signal", coverStyle: "split" });
  assert.equal(b.cards[0].layout, "sl-cover-split");
  assert.ok(b.cards[0].series.length >= 3, "自动抽出 series（≥3 点）");
  assert.match(b.cards[0].trend, /^[+−]\d+%$/, "trend 首尾变化%");
  assert.ok(b.cards[0].imageRequest, "split 封面挂 imageRequest（软抽象图）");
});

test("--cover-style auto e2e：Bridge auto 解析 coverStyle、不崩、挂 imageRequest", async () => {
  const b = await planBrief(ART, { system: "bridge", coverStyle: "auto" });
  assert.match(b.cards[0].layout, /^bc-(cover|noir|weave|split)$/, "auto → 合法 Bridge coverStyle");
  assert.ok(b.cards[0].imageRequest, "Bridge 封面挂 imageRequest");
});

test("Bridge 冷 misty 主题色预设：bcPalette→accent + cool 调；冷调注入 bc-cool 类", async () => {
  const b = await planBrief(ART, { system: "bridge", coverStyle: "noir", bcPalette: "sage" });
  assert.equal(b.cards[0].accent, "#9DB39B", "sage 预设→accent");
  assert.equal(b.cards[0].cool, true, "sage 是冷调→cool=true");
  // 渲染：cool 卡注入 bc-cool 类
  const h = renderHtml({ meta: { title: "t", format: "xhs" }, cards: [{ name: "t", layout: "bc-noir", style: "sl-signal-noir", accent: "#9DB39B", cool: true, title: "x", kicker: { en: "X" } }] });
  assert.match(h, /bc-cool/, "cool 卡 → bc-cool 类");
  // 默认（无 palette）不染 cool
  const d = await planBrief(ART, { system: "bridge", coverStyle: "noir" });
  assert.ok(!d.cards[0].cool, "默认无 cool（零默认影响）");
});

// P0：Bridge 独家 split-tone duotone（暗部冷墨蓝 ↔ 高光暖金）+ register 划分。
// id="bc-duo" 仅出现在 engine 注入的 SVG def（CSS 用 url(#bc-duo)），故能精确区分哪个 layout 真嵌了 duo。
test("P0 独家 split-tone duotone register 划分：dramatic(noir/cover)上 #bc-duo+半调；calm/editorial(weave/split)守本色", () => {
  // dramatic register：noir / cover 暗部/阴影够 → 上 teal-gold split-tone def + riso 半调签名层
  for (const layout of ["bc-noir", "bc-cover"]) {
    const h = html(base(layout));
    assert.match(h, /id="bc-duo"/, `${layout} 应嵌 split-tone duotone def`);
    assert.match(h, /<div class="bc-halftone">/, `${layout} 应有半调签名层`);
  }
  // calm/editorial register：weave 雾感 / split 的 Kinfolk 自然光本就无暗部，强 teal-gold 会染黄毁画廊感 → 守本色不上 duo
  assert.doesNotMatch(html(base("bc-weave", { titleTop: "上", titleBot: "下" })), /id="bc-duo"/, "weave 守雾感本色，不上 teal-gold");
  assert.doesNotMatch(html(base("bc-split", { lang: "cn" })), /id="bc-duo"/, "split 守 editorial 本色，不上 teal-gold");
});

// #3 Signal 证据方法论正文卡基座（light 档案纸 + VERIFIED 印章 + 当前日期 + 标注）。
// 对外发布中性化：用户卡面默认不印内部署名/编号/假来源，只留风格 + 用户内容。
test("Signal sl-ev-screenshot 基座：档案纸 + VERIFIED 印章 + 动态当前日期 + 数字点睛 + 中性化（默认不印内部署名/编号/假来源）", () => {
  const h = renderHtml({ meta: { title: "t", format: "xhs", style: "sl-electric-blue" }, cards: [{
    name: "t", layout: "sl-ev-screenshot", style: "sl-electric-blue", title: "证据标题",
    image: { src: "assets/x.jpg", resolvedSrc: "assets/x.jpg", alt: "x" },
    notes: [{ title: "总数 **12,840**", body: "↑ **24.6%**" }, { title: "折线", body: "可追溯" }],
  }] });
  assert.match(h, /layout-sl-ev-screenshot/);
  assert.match(h, /sl-ev-paper/, "档案纸底（light，非暗场）");
  assert.match(h, /sl-ev-stamp/, "VERIFIED 印章装置");
  assert.match(h, /已验证 · VERIFIED/, "印章环绕字");
  assert.match(h, /sl-ev-shot/, "暗底截图证据框");
  assert.match(h, /<strong>12,840<\/strong>/, "**强调** 数字 accent 点睛");
  assert.match(h, new RegExp(String(new Date().getFullYear())), "footer 含当前年份（动态日期·非硬编码）");
  const dom = h.split("</style>").pop();   // 只验卡面 DOM（内联 CSS 注释含主题代号说明，浏览器不渲染、卡面不可见，不计入）
  assert.doesNotMatch(dom, /SIGNAL LEDGER|RECORD · REFLECT|SL-0\d|Signal Proof Analytics/, "对外发布中性化：卡面默认不印内部署名/标语/编号/假来源");
});

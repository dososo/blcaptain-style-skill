import test from "node:test";
import assert from "node:assert/strict";
import { renderHtml } from "../src/engine.mjs";

// 三视觉语言新 layout 渲染契约：每个 layout 输出含签名 class + 关键元素；duotone 滤镜只在 opt-in 注入。
const card = (layout, extra = {}) => ({
  name: "t", layout, style: extra.style || "sp-warm",
  kicker: { en: "T", cn: "测" }, title: "标题**强调**\n第二行", titleEn: "Test", lead: "说明文字。",
  seal: "记", image: { resolvedSrc: "assets/x.jpg", src: "assets/x.jpg" },
  items: [{ word: "一", note: "x" }, { word: "二", note: "y" }, { word: "三", note: "z" }],
  bignum: "5", unit: "天", rows: [{ label: "a", value: "5" }, { label: "b", value: "4×" }],
  checks: [{ label: "x" }, { label: "y", no: true }], steps: [{ title: "s", body: "b" }],
  cells: [{ value: "5", label: "a" }], callouts: [{ body: "c" }],
  metric: "92%", delta: "▲", metricLabel: "lbl", verdict: "选A", attrib: "—署名",
  platecap: "标本", anchorChar: "测", pull: "次钩", wellcap: "图说", tag: "TAG", board: "板", token: "01",
  ...extra,
});
const html = (c) => renderHtml({ meta: { title: "t", format: "xhs" }, cards: [c] });

test("Still Paper 7 封面 layout 渲染带签名 class", () => {
  for (const l of ["sp-ws-cover-photo", "sp-ws-cover-well", "sp-ws-cover-statement", "sp-ws-cover-quote", "sp-ws-cover-object", "sp-ws-cover-index", "sp-ws-cover-number"]) {
    const h = html(card(l));
    assert.match(h, new RegExp(`layout-${l}`), l);
    assert.match(h, /sp-paper/, `${l} 应继承 .sp-paper 基类`);
  }
});

test("Signal 7 卡渲染带 .sl-cover 共享 chrome", () => {
  for (const l of ["sl-cover-hero", "sl-cover-ledger", "sl-cover-metric", "sl-cover-verdict", "sl-body-shot", "sl-body-flow", "sl-body-grid"]) {
    const h = html(card(l, { style: "sl-blue" }));
    assert.match(h, new RegExp(`layout-${l}`), l);
    assert.match(h, /sl-cover/, `${l} 应带共享 chrome`);
  }
});

test("Signal hero 注入主题参数化 duotone 滤镜", () => {
  assert.match(html(card("sl-cover-hero", { style: "sl-blue" })), /id="sl-duo"/, "sl-cover-hero 应内联 duotone 滤镜");
  assert.match(html(card("sl-cover-hero", { style: "sl-blue" })), /feComponentTransfer/, "三调 feComponentTransfer");
});

test("Bridge 封面渲染 cinematic letterbox + grade + grain", () => {
  const h = html(card("bc-cover", { style: "sl-blue" }));
  assert.match(h, /layout-bc-cover/);
  assert.match(h, /bc-bar/, "电影黑边 letterbox");
  assert.match(h, /bc-grain/, "颗粒");
});

test("静纸 duograde 滤镜只在 grade=duo 注入（默认/accepted 零影响）", () => {
  // 注：CSS 里恒含 url(#sp-duo)，故查 SVG 注入标志 .sp-duo-def（只在 grade=duo 的卡 HTML、不在 CSS）
  assert.match(html(card("sp-ws-cover-photo", { grade: "duo" })), /sp-duo-def/, "grade=duo 应注入暖墨 duotone 滤镜");
  assert.doesNotMatch(html(card("sp-ws-cover-photo")), /sp-duo-def/, "默认不得注入滤镜（保 accepted 像素）");
});

// Signal 编辑网格封面族 sl-cv（按内容形态：statement 大字 / figure 数据主角 / grid 截图证据）。
test("Signal sl-cv 三形态渲染：签名 class + 共享 chrome + VERIFIED 印章 + 中性化(卡面无内部署名)", () => {
  const base = { series: [3, 2, 1], ledger: [{ w: "可追溯", d: "留出处", v: "63%", k: "留存" }], figBig: "−70%", figLabel: "耗时", evTag: "证据", no: "01" };
  for (const l of ["sl-cv-statement", "sl-cv-figure", "sl-cv-grid"]) {
    const h = html(card(l, { style: "sl-blue", ...base }));
    assert.match(h, new RegExp(`layout-${l}`), l);
    assert.match(h, /sl-cv-mast/, `${l} 应带 sl-cv 共享 chrome`);
    assert.match(h, /sl-cv-stamp/, `${l} 应带 VERIFIED 印章`);
    const dom = h.split("</style>").pop();
    assert.doesNotMatch(dom, /SIGNAL LEDGER|SL-0\d|Signal Proof Analytics/, `${l} 卡面中性化(默认不印内部署名)`);
  }
  assert.match(html(card("sl-cv-grid", { style: "sl-blue" })), /id="sl-cv-duo"/, "grid 注入主题化电蓝 duotone(独家影像配方)");
});

// 图桥 Bridge body 卡 bc-frame：cinematic 图叙事内页（复用 bc-cover chrome：letterbox+grain+暗角，金句+序号）。
test("Bridge bc-frame body 卡渲染：cinematic chrome(letterbox/grain) + 金句压图 + 金色序号", () => {
  const h = html(card("bc-frame", { style: "sl-blue", idx: "NO. 02" }));
  assert.match(h, /layout-bc-frame/);
  assert.match(h, /bc-bar/, "电影黑边 letterbox");
  assert.match(h, /bc-grain/, "颗粒");
  assert.match(h, /bc-idx/, "金色序号");
});

// 地图组件 sp-ws-body-map：编辑式静态路线图（朱砂虚线 route 主角 + 序号圆 pin + 极简指南针，免图 SVG）。
test("Still Paper 地图组件渲染：route + 序号圆 pin + 指南针 + 地名 + 继承 sp-paper", () => {
  const h = html(card("sp-ws-body-map", {
    points: [
      { place: "清水寺", en: "Kiyomizu-dera", note: "晨光石阶", day: "DAY 1", kind: "key" },
      { place: "二年坂", en: "Ninenzaka", note: "老铺甜点" },
      { place: "金阁寺", en: "Kinkaku-ji", kind: "key" }
    ],
    routeNote: "慢走，不赶。"
  }));
  assert.match(h, /layout-sp-ws-body-map/);
  assert.match(h, /sp-paper/, "应继承 .sp-paper 基类");
  assert.match(h, /sp-map-route/, "朱砂路线 path");
  assert.match(h, /sp-map-pin/, "序号圆 pin group");
  assert.match(h, /sp-map-num/, "pin 编号");
  assert.match(h, /sp-map-compass/, "极简指南针");
  assert.match(h, /清水寺/, "地名标签"); assert.match(h, /金阁寺/);
  assert.equal((h.match(/class="sp-map-pin"/g) || []).length, 3, "3 站 = 3 pin");
});

// 截图 staged 证据卡 sl-ev-screenshot：设备框 + 纹理舞台 + 浮起投影 + VERIFIED 证据层（「美化」升级为「可信证据」）。
test("Signal 截图证据卡 staged：设备框 + 纹理舞台 + VERIFIED 证据层", () => {
  const h = html(card("sl-ev-screenshot", { style: "sl-blue", device: "browser" }));
  assert.match(h, /layout-sl-ev-screenshot/);
  assert.match(h, /sl-ev-stage/, "纹理舞台(托住截图)");
  assert.match(h, /sl-ev-device/, "设备卡(圆角+浮起投影)");
  assert.match(h, /sl-ev-bar/, "macOS 设备框三圆点");
  assert.match(h, /VERIFIED|已验证/, "证据层 VERIFIED 印章(可信证据层)");
});

// Signal 测评评分卡 sl-ev-review：综合巨数 + 分项账本行(数字脊柱) + verdict 裁定 + 方法论 + VERIFIED；
// 双变体——纯文字(无图大 hero) + 图先说话(card.image → 产品图 band 在上 + 评分在下)。
test("Signal 测评评分卡 sl-ev-review：综合分 + 分项 + verdict + VERIFIED + 图先说话变体", () => {
  const base = { style: "sl-blue", score: "8.6", subs: [{ cn: "降噪", en: "ANC", v: "9.0" }, { cn: "音质", v: "8.4" }], verdict: "通勤够用", fit: "通勤", avoid: "发烧", method: "维度 降噪·音质" };
  const t = html(card("sl-ev-review", { ...base, image: null }));
  assert.match(t, /layout-sl-ev-review/);
  assert.match(t, /sl-ev-rv-big/, "综合巨数 hero");
  assert.match(t, /sl-ev-rv-row/, "分项账本行(数字脊柱)");
  assert.match(t, /sl-ev-rv-verdict/, "verdict 裁定");
  assert.match(t, /VERIFIED|已验证/, "证据层 VERIFIED");
  assert.doesNotMatch(t.split("</style>").pop(), /sl-ev-rv-img-led/, "无图=纯文字变体(DOM 不含 img-led 类)");
  const im = html(card("sl-ev-review", { ...base, priceTag: "¥1299" }));
  assert.match(im, /sl-ev-rv-img-led/, "有图=图先说话变体");
  assert.match(im, /class="sl-ev-rv-img"/, "产品图 band");
});

// 图集 photo essay 海报版 sp-ws-body-gallery：英雄图满铺领头 + 标题压图(暖墨渐变保可读) + 不等大节奏小图条带
// （对标 Kinfolk / National Geographic / Magnum photo essay 封面）。hero 建立第一眼层级 /
// 其余退为节奏小图 / 一致暖墨 duotone 分级（默认轻暖调底，grade=duo 叠强暖墨）甩 AI 套图。
test("Still Paper 图集 photo essay：英雄图领头 + 标题压图 + 节奏小图 + 暖墨一致分级 + 继承 sp-paper", () => {
  const shots = [
    { image: { resolvedSrc: "assets/a.jpg", src: "assets/a.jpg" }, cap: "清晨的厨房" },
    { image: { resolvedSrc: "assets/b.jpg" }, cap: "豆子在称上" },
    { image: { resolvedSrc: "assets/c.jpg" }, cap: "第一道注水" },
  ];
  const h = html(card("sp-ws-body-gallery", { grade: "duo", title: "一杯手冲", shots }));
  assert.match(h, /layout-sp-ws-body-gallery/);
  assert.match(h, /sp-paper/, "应继承 .sp-paper 基类");
  assert.match(h, /gallery-hero/, "英雄图满铺领头容器（第一眼层级）");
  assert.match(h, /gh-veil/, "英雄图底部暖墨渐变（压图标题可读）");
  assert.match(h, /gh-text/, "标题压英雄图");
  assert.match(h, /sp-gallery/, "节奏小图条带容器");
  assert.match(h, /data-n="2"/, "条带=总数-1（英雄图抽出领头，余 2 小图）");
  assert.match(h, /sp-fig-cap/, "FIG 图说");
  assert.match(h, /FIG\.01/, "英雄图图说自动编号 FIG.01");
  assert.match(h, /sp-duo-def/, "grade=duo 暖墨一致分级");
  assert.equal((h.match(/class="gfig"/g) || []).length, 2, "3 图 = 1 英雄 + 2 条带 figure");
  assert.doesNotMatch(html(card("sp-ws-body-gallery", { shots })), /sp-duo-def/, "默认不注入强 duotone（保轻暖调底，零影响）");
});

// 边注时间轴 sp-ws-body-margin：主栏叙事 + 右边栏时间轴批注（"写作者的一天"）。对标 Tufte sidenotes +
// 编辑 marginalia + 手账时间梯——主栏宽 / 沟槽 / 右边栏；节点=朱砂空心圈(非实心 badge)；发丝线断续；
// 时间锚跟随段落(内容驱动不等距=反课程表)；边注 0.78× 不每段都配。免图。
test("Still Paper 边注时间轴 sp-ws-body-margin：主栏正文 + 右边栏时间轴 + 节点 + 继承 sp-paper", () => {
  const h = html(card("sp-ws-body-margin", {
    entries: [
      { time: "07:00", text: "天还没全亮，先写最难的那段。", note: "脑子最清醒", en: "morning" },
      { time: "14:30", text: "午后困意上来，改成读资料、做摘抄。" },
      { time: "23:00", text: "回看今天写的，删掉一半。", note: "删比写难" },
    ],
  }));
  assert.match(h, /layout-sp-ws-body-margin/);
  assert.match(h, /sp-paper/, "应继承 .sp-paper 基类");
  assert.match(h, /essay-margin/, "主栏+沟槽+边栏三栏容器");
  assert.match(h, /em-body/, "主栏叙事正文");
  assert.match(h, /em-time/, "时间锚");
  assert.match(h, /em-note/, "边注旁批");
  assert.match(h, /07:00/, "时间标记");
  assert.equal((h.match(/class="em-body"/g) || []).length, 3, "3 entry = 3 主栏段");
});

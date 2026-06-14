// ─────────────────────────────────────────────────────────────────────────────
// src/plan.mjs — 文章 → brief.json 正则生成器（FALLBACK / 起点，非主路径）
//
// ⚠️ 方向（2026-06-13 转向智能驱动）：本模块用正则做「内容理解」（inferKind / inferTheme /
// extractQuote 等）。真实内容下正则会截断半句 / 拆词 / quote 跨页重复 / 主题误判——这些是
// Claude 自己写 brief 根本不会犯的低级错，也是过去无限打补丁的死循环根源。
// **首选路径 = Claude 按 SKILL.md 读懂内容、亲自撰写 brief.json，交 engine 渲染**
// （见 SKILL.md「智能驱动」与 references/）。本模块保留作 fallback / 快速起点 / 回归基准，
// 不删；但勿再为「让正则理解内容」打补丁——内容理解是 Claude 的工作，代码只做确定性渲染。
// ─────────────────────────────────────────────────────────────────────────────

import fs from "node:fs/promises";
import path from "node:path";

// ── Routing ───────────────────────────────────────────────────────

// SP-WS (Still Paper / Warm Study) handles essay / diary / life territory
const SP_WS_KINDS = new Set(["opinion", "diary", "travel", "reading", "emotion", "life"]);

const KICKER_MAP = {
  opinion: { en: "ESSAY",   cn: "随笔" },
  diary:   { en: "DIARY",   cn: "日记" },
  travel:  { en: "TRAVEL",  cn: "旅行" },
  reading: { en: "READING", cn: "读书" },
  emotion: { en: "NOTES",   cn: "手记" },
  life:    { en: "LIFE",    cn: "生活" },
};

// Legacy Signal-territory sequences (structured / data / product / news)
const LAYOUT_SEQUENCES = {
  tutorial: ["statement-cover", "three-lane-flow", "dashboard-grid", "annotated-checklist", "quote-focus"],
  data:     ["statement-cover", "big-number-poster", "trend-compare", "research-atlas", "quote-focus"],
  product:  ["product-hero", "feature-strip", "feature-matrix", "product-storyline"],
  news:     ["alert-burst", "roundup-stack", "trend-compare", "checklist-strip"],
};

const DEFAULT_STYLE_BY_KIND = {
  tutorial: "sl-blue", data: "sl-coral", product: "sl-blue", news: "sl-lime",
};

// 内容形状 → 场景视觉检索提示（纯场景，色温/调性由主题决定，见 toneFor，避免冷暖割裂）
const COVER_VISUAL_HINT = {
  diary:   "书桌 静物 笔记 morning desk still life notes",
  reading: "书本 木桌 阅读 reading books wooden table still life",
  travel:  "旅途 风景 在路上 travel landscape on the road",
  emotion: "窗边 静物 quiet window still life",
  life:    "生活场景 静物 lifestyle still life",
  opinion: "纸面 文具 desk paper stationery still life",
};

// 主题 → 配图色温/调性（搭对纸色：Hearth 暖食/Coastal 冷海岸/Night 暗夜/Warm 暖光）
function toneFor(theme) {
  const t = String(theme || "");
  if (t.includes("hearth")) return "暖光 烛光 厨房 烟火气 warm kitchen candlelight cozy amber";
  if (t.includes("coastal")) return "冷调 自然光 海岸 cool tone natural light coastal overcast sea";
  if (t.includes("night")) return "暗调 夜 灯光 low light night lamplight moody dim";
  return "暖光 暖调 warm light warm tone";
}

// route C 取图全集顺序（忠实 references/image-source-workflow.md；user/ai 在前作为 A/B 路线，CC0/PD 优先见 licensePreference）
// 国内 CC0 源(cc0cn/palayoutu/ssyer/hippopx)前置——国内可访问无需 VPN，搭「国内开箱即用」；国际源(unsplash/pexels)随后作高质量补充。
const COVER_PROVIDER_ORDER = [
  "user", "ai",
  "cc0cn", "palayoutu", "hippopx", "ssyer",
  "unsplash", "pexels", "stocksnap", "pixabay", "negativespace",
  "kaboompics", "burst", "rawpixel", "flickr-cc", "openverse", "wallhaven",
  "direct-search",
];

// 各封面母体的取图安全区/避让区（mother-aware imageRequest：忠实 references/image-source-workflow.md「满铺图须声明 subject map / safe text zone / avoid zone」）
const COVER_MOTHER_CROP = {
  bleed:  "满铺 3:4；主体在中上部，下三分留安静区放标题(floor-scrim 压暗)；避开中央焦点压字",
  photo:  "主体在下半；顶部留标题安全区；object-position 不压字",
  well:   "图入右下角井；左侧大量留白给文字；主体偏右下",
  quote:  "氛围/留白为主，中上部均匀(可压暗)放引语；避开高频细节与强焦点",
  object: "单主体居中、背景干净简洁(纸面/纯色)；四周留呼吸入纸面框",
};

// 给图卡出图需求：内容派生搜索词 + 来源顺序 + 裁切/版权约束（plan 自动出 IMAGE_REQUESTS 的数据源；mother-aware）
function buildCoverImageRequest({ kind, title, kicker, theme, mother }) {
  const titleTokens = String(title || "").replace(/\n/g, " ").replace(/[^一-鿿a-zA-Z0-9]+/g, " ").trim();
  const kickerCn = (kicker && kicker.cn) || "";
  const hint = COVER_VISUAL_HINT[kind] || COVER_VISUAL_HINT.opinion;
  const tone = toneFor(theme);
  const query = [titleTokens, kickerCn, hint, tone].filter(Boolean).join(" ").replace(/\s+/g, " ").trim().slice(0, 150);
  return {
    role: "cover-hero",
    mother: mother || "photo",
    query,
    providerOrder: COVER_PROVIDER_ORDER,
    crop: COVER_MOTHER_CROP[mother] || COVER_MOTHER_CROP.photo,
    licensePreference: "CC0 / Public Domain 优先，记录真实来源到 SOURCES.md",
  };
}

// 封面母体显式路由表（options.coverMother）：别名 → 规格（layout / variant / 是否需图）
const COVER_MOTHER_ALIAS = {
  r01: "bleed", bleed: "bleed", "full-photo": "bleed",
  r02: "photo", photo: "photo",
  r03: "well", well: "well",
  r04: "statement", statement: "statement", type: "statement",
  r05: "quote", quote: "quote",
  r06: "object", object: "object",
  r07: "index", index: "index", list: "index",
  r08: "number", number: "number",
};
const COVER_MOTHER_SPEC = {
  bleed:     { layout: "sp-ws-cover-photo", variant: "bleed", needsImage: true },
  photo:     { layout: "sp-ws-cover-photo", needsImage: true },
  well:      { layout: "sp-ws-cover-well", needsImage: true },
  statement: { layout: "sp-ws-cover-statement", needsImage: false },
  quote:     { layout: "sp-ws-cover-quote", needsImage: true },
  object:    { layout: "sp-ws-cover-object", needsImage: true },
  index:     { layout: "sp-ws-cover-index", needsImage: false },
  number:    { layout: "sp-ws-cover-number", needsImage: false },
};

// 把 base cover 改造成指定母体（设 layout/variant + 需/免图 + 派生母体专属字段）。未知母体名→保持默认不动。
function applyCoverMother(cover, motherName, ctx) {
  const key = COVER_MOTHER_ALIAS[String(motherName || "").toLowerCase()];
  const spec = key && COVER_MOTHER_SPEC[key];
  if (!spec) return cover;
  cover.layout = spec.layout;
  if (spec.variant) cover.variant = spec.variant; else delete cover.variant;
  if (spec.needsImage) {
    cover.imageRequest = buildCoverImageRequest({ ...ctx, mother: key });
  } else {
    delete cover.imageRequest;
    delete cover.image;
  }
  // 短标题母体：长标题裁剪 backstop（避免巨标题溢出；auto 路由本只给短标题，这是显式 --cover-mother 误用的兜底）
  if (key === "statement" || key === "index" || key === "number") {
    const oneLine = String(ctx.title || "").replace(/\n/g, "");
    if (oneLine.length > 16) cover.title = breakLine(trimTo(oneLine, 14)); // 14 + 省略号 ≤16
  }
  // 母体专属字段 best-effort 派生（caller 可经 options 覆盖，见 passthrough）
  if (key === "statement") cover.anchorChar = cover.anchorChar || inferAnchorChar(ctx.title || "");
  if (key === "quote") { const kc = ctx.kicker?.cn || ""; cover.attrib = cover.attrib || (kc ? `—  ${/手记$/.test(kc) ? kc : kc + "手记"}` : ""); }
  if (key === "object") cover.platecap = cover.platecap || "STILL LIFE";
  return cover;
}

// 内容形状 → 封面母体自动选（opt-in：options.coverMother==="auto"）。返回 {mother, fields}（fields=母体专属内容，如 bignum/items）。
// 强信号优先：标题数字 hook→R08、清单→R07；再按 kind：物件→R06、情感→R05、旅行→R01、短标题观点→R04；兜底 photo。
export function inferCoverMother(text, kind, title, listItems) {
  const t = String(text || "");
  const head = String(title || "").replace(/\n/g, "");
  const ctx0 = head + " " + t.slice(0, 240);
  // R08 数字索引：标题「开头」即显著计数(N≥2)+量词 = 巨数 hook（中段偶发数字如"5个任务"不算）；标题去数字短语作解释侧栏
  const numM = head.match(/^[\s《「『"'（(【]*(\d{1,3})\s*(天|个|件|种|步|招|式|条|岁|篇|项|本|句)/);
  if (numM && Number(numM[1]) >= 2 && Number(numM[1]) <= 366) {
    const rest = head.replace(/(\d{1,3})\s*(天|个|件|种|步|招|式|条|岁|篇|项|本|句)[，,：:、]?\s*/, "").trim();
    return { mother: "number", fields: { bignum: numM[1], unit: numM[2], title: breakLine(rest || head) } };
  }
  // R07 清单封面：抽到 ≥3 清单项 + 清单/合集框架
  if (listItems && listItems.length >= 3 && /(清单|合集|必备|装备|带上|几样|几件|好物|推荐|备忘|随身)/.test(ctx0)) {
    return { mother: "index", fields: { items: listItems } };
  }
  if (kind === "reading" || /(瓶花|案上|桌上|植物|花枝|器物|物件|书页|茶杯|茶壶|陶器|一枝|静物)/.test(t)) return { mother: "object", fields: {} };
  if (kind === "emotion") return { mother: "quote", fields: {} };                 // 情感→金句引语压图
  if (kind === "travel") return { mother: "bleed", fields: {} };                  // 旅行→满铺氛围
  if ((kind === "opinion" || kind === "diary") && head.length <= 14 && !/[A-Za-z]{4,}/.test(head)) return { mother: "statement", fields: {} }; // 短标题观点→大字镇场
  return { mother: "photo", fields: {} };                                          // life / 长标题 / 默认 → 下半摄影基线
}

// ── Text parsing ──────────────────────────────────────────────────

function stripMd(s) {
  return s.replace(/```[\s\S]*?```/g, " ").replace(/[#>*_`\[\]()]/g, "").trim();
}

function parseParagraphs(text) {
  return text
    .replace(/```[\s\S]*?```/g, "")       // strip code blocks
    .replace(/^#{1,6}\s+.+$/gm, "")       // strip headings
    .split(/\n\s*\n/)
    .map(chunk => chunk
      .replace(/\n/g, " ")
      .replace(/`([^`]+)`/g, "$1")        // inline code: keep text, drop backticks
      .replace(/^[>#]\s*/gm, "")          // blockquote/remaining heading markers
      .replace(/\s+/g, " ")
      .trim()
    )
    // preserve **bold** and __keep__ — richText in engine will render them
    .filter(p => p.replace(/[^一-鿿\w]/g, "").length >= 10);
}

function extractTitle(text, paras) {
  const heading = text.match(/^#{1,3}\s+(.+)$/m);
  if (heading) return heading[1].replace(/[*_`]/g, "").trim();
  const first = paras[0] || "";
  const sentence = first.split(/[。！？!?]/)[0] || first;
  return sentence.length > 28 ? sentence.slice(0, 26) + "…" : sentence;
}

function inferKind(text) {
  const t = text.toLowerCase();
  if (/旅行|旅途|出发|目的地|行程|异地|风景|途中/.test(t)) return "travel";
  // require more specific reading signals to avoid false positives from "读一遍" etc.
  if (/阅读|读书|书评|摘录|作者|章节|书单|翻到/.test(t)) return "reading";
  if (/爱|情|感受|心情|心里|难受|开心|喜欢|失落/.test(t)) return "emotion";
  if (/数据|报告|论文|研究|\d+%|\d+倍/.test(t)) return "data";
  if (/发布|产品|功能|卖点|campaign|官网|汽车/.test(t)) return "product";
  if (/教程|步骤|如何|实战|指南|workflow|sop/.test(t)) return "tutorial";
  if (/快讯|变化|风险|警告|注意|刚刚/.test(t)) return "news";
  if (/我|复盘|手记|经验|日记|创业|写下/.test(t)) return "diary";
  return "opinion";
}

// 内容色温/场景信号 → 静纸主题别名（强信号 ≥2 处命中才切主题，弱信号回退 Warm 母版兜底，不乱来）
const THEME_SIGNALS = [
  { theme: "sp-hearth",  re: /灶|锅|炒菜|煮|焖|炖|晚饭|晚餐|做饭|下厨|厨房|餐桌|饭桌|烟火|热气|一碗|食材|备菜|菜市场|烘焙|面包|围炉|火炉|炉边|暖食|食谱|料理/g },
  { theme: "sp-coastal", re: /海边|海岸|海风|海面|潮汐|涨潮|退潮|沙滩|贝壳|海浪|浪声|礁石|码头|渔船|湖面|溪水|山间|森林|徒步|旷野|海岛|岛屿/g },
  { theme: "sp-night",   re: /深夜|凌晨|半夜|失眠|夜里|夜晚|午夜|星空|月光|黑夜|熬夜|睡不着|晚安|睡前|入夜/g }, // "台灯"移出：暖光台灯是温馨家居/暖意信号，曾把治愈系家居内容误判成暗夜冷调（UAT 抓）
];

function inferTheme(text) {
  const t = String(text || "");
  let best = "sp-warm", bestN = 1; // 阈值：需 ≥2 处命中才覆盖默认 Warm
  for (const { theme, re } of THEME_SIGNALS) {
    const n = (t.match(re) || []).length;
    if (n > bestN) { bestN = n; best = theme; }
  }
  return best;
}

// ── Formatting helpers ────────────────────────────────────────────

// Insert \n near midpoint at a punctuation character; hard-break at mid if none found
// 标题居中折两行：优先离中点最近的标点处折，否则中点硬切保两行均衡（字号档按半行算不溢出）。
// 注：CJK 无空格分词，无标点的长标题硬切仍可能拆双字词——这是中文自动断行固有；用户可在标题内手动加标点/换行精确控制。
function breakLine(s, minLen = 9) {
  if (!s || s.includes("\n") || s.length <= minLen) return s;
  let mid = Math.floor(s.length / 2);
  for (let d = 0; d < mid; d++) {
    if (d > 0 && /[，、。？！：—]/.test(s[mid - d]))
      return s.slice(0, mid - d + 1) + "\n" + s.slice(mid - d + 1);
    if (/[，、。？！：—]/.test(s[mid + d]))
      return s.slice(0, mid + d + 1) + "\n" + s.slice(mid + d + 1);
  }
  // 硬切避免切在英文/数字连续串中间（AI→A/I、GPT、Claude、2026 等拉丁词整体不被拆行）：移到最近词边界
  const isWord = c => /[A-Za-z0-9]/.test(c || "");
  if (isWord(s[mid - 1]) && isWord(s[mid])) {
    let l = mid, r = mid;
    while (l > 1 && isWord(s[l - 1])) l--;
    while (r < s.length - 1 && isWord(s[r])) r++;
    mid = (mid - l <= r - mid) ? l : r;
  }
  return s.slice(0, mid) + "\n" + s.slice(mid);
}

// Trim to max chars, preferring a clean sentence-end cut
function trimTo(s, max) {
  if (!s || s.length <= max) return s;
  const cut = s.slice(0, max);
  // 优先截到完整句（句末标点 。！？），保留标点、不留半截；句末须在后半段才用（避免截得过短）
  const sent = cut.match(/^[\s\S]*[。！？]/);
  if (sent && sent[0].length > max * 0.5) return sent[0];
  // 否则截到子句边界，去掉悬挂的逗号/顿号/分号/冒号（绝不以半截标点收尾）再加省略号
  const clause = cut.match(/^[\s\S]*[，、；：,;]/);
  const base = (clause && clause[0].length > max * 0.5) ? clause[0] : cut;
  return base.replace(/[，、；：,;:]+$/, "") + "…";
}

function inferAnchorChar(title) {
  const m = title.replace(/\n/g, "").match(/[一-鿿]/);
  return m ? m[0] : "";
}

function shortTitleClean(title, max = 16) {
  const cleaned = title.replace(/[\n:：].*$/, "").replace(/\n/g, "").trim();
  return cleaned.length <= max ? cleaned : cleaned.slice(0, max - 1) + "…";
}

// ── Content extraction ────────────────────────────────────────────

function extractQuote(paras, exclude = []) {
  const candidates = paras.flatMap(p =>
    p.split(/[。！？!?]/)
      .map(s => s.replace(/^\s*[""'"']\s*/, "").trim())
      .filter(s => {
        const cnLen = s.replace(/[^一-鿿]/g, "").length;
        return cnLen >= 6 && cnLen <= 22;
      })
  );
  const target = 13;
  candidates.sort((a, b) => {
    const la = a.replace(/[^一-鿿]/g, "").length;
    const lb = b.replace(/[^一-鿿]/g, "").length;
    return Math.abs(la - target) - Math.abs(lb - target);
  });
  // 跨卡去重：跳过已被其他 quote/essay 用过的句子（子串双向判定）→ 多个 quote 卡不再复读同一句
  const seen = c => exclude.some(e => e && (e.includes(c) || c.includes(e)));
  return candidates.find(c => !seen(c)) || candidates[0] || trimTo(paras[paras.length - 1] || "", 28);
}

// pull 引文：段落里最接近 11 字的金句，排除标题句（避免与标题重复）
function extractPull(paras, exclude = "") {
  const cand = paras.flatMap(p => p.split(/[。！？!?，]/).map(s => s.replace(/^\s*[“”'"']\s*/, "").trim()))
    .filter(s => { const l = s.replace(/[^一-鿿]/g, "").length; return l >= 6 && l <= 15 && s !== exclude; });
  const t = 11;
  cand.sort((a, b) => Math.abs(a.replace(/[^一-鿿]/g, "").length - t) - Math.abs(b.replace(/[^一-鿿]/g, "").length - t));
  return cand[0] || "";
}

// 竖排批注：段落里一句 4-8 字完整短语，排除已用的标题/pull
function shortPhrase(paras, exclude = []) {
  // 竖排批注短语（右重心唯一装置，须稳不空）：优选 4-10 汉字完整子句（区别于 pull/标题），
  // 否则兜底取首个 ≥4 汉字子句截到 11 字，避免右重心页面无装置。
  const cjk = s => s.replace(/[^一-鿿]/g, "").length;
  const clauses = paras.flatMap(p => p.split(/[，。！？、]/).map(s => s.trim())).filter(Boolean);
  const ideal = clauses.filter(s => { const l = cjk(s); return l >= 4 && l <= 10 && !exclude.includes(s); });
  if (ideal.length) return ideal[ideal.length - 1];
  const any = clauses.find(s => cjk(s) >= 4 && !exclude.includes(s));
  return any ? any.slice(0, 11) : "";
}

// 提取真实 markdown 列表项 → body-list 的 items（无 fallback：没列表就不生成 list 页）
function extractListItems(text) {
  const re = /^(?:[-*•]\s+|[0-9]+[.、]\s+|[①②③④⑤⑥⑦⑧⑨])(.+)$/gm;
  const items = [...text.matchAll(re)].map(m => m[1].trim()).filter(s => s.length > 4);
  return items.slice(0, 4).map((content, i) => {
    const m = content.match(/^(.{1,6})[：:，,]\s*(.+)$/);
    return m
      ? { num: String(i + 1).padStart(2, "0"), word: m[1], note: trimTo(m[2], 50) }
      : { num: String(i + 1).padStart(2, "0"), word: content.slice(0, 5), note: trimTo(content, 50) };
  });
}

// 提取时间序列（07:00 …）→ body-panel 的 rows（没有就不生成 panel 页）
function extractTimeline(text) {
  const re = /(\d{1,2})[:：](\d{2})\s*[，,、\s]*([^\n。]{3,40})/g;
  const rows = [];
  let m;
  while ((m = re.exec(text)) && rows.length < 3) {
    rows.push({ time: `${String(m[1]).padStart(2, "0")}:${m[2]}`, text: trimTo(m[3].trim(), 36) });
  }
  return rows;
}

// ── 内容形状检测 → 7 机制路由（强信号才路由，弱信号回退 list/essay，避免乱图）──
const SHAPE_UNIT_RE = /[0-9０-９]+(?:[.．][0-9]+)?\s*(?:小时|分钟|分|h|H|元|块|万|亿|％|%|次|天|周|月|年|个|条|字|步|页|倍|公里|km|岁|遍|杯|本)/;

function listLines(text) {
  return [...text.matchAll(/^\s*(?:[-*•]\s+|[0-9０-９]+[.、)]\s*|[①②③④⑤⑥⑦⑧⑨⑩])\s*(.+)$/gm)]
    .map(m => m[1].trim()).filter(s => s.length > 1);
}

// 拆 "首词：说明" → {word, note}
function splitWordNote(line, wordMax = 6) {
  const m = line.match(/^(.{1,12}?)\s*[：:，,、]\s*(.+)$/);
  if (m && m[1].length <= wordMax + 4) return { word: m[1].trim(), note: m[2].trim() };
  return { word: line.slice(0, wordMax).trim(), note: line.length > wordMax ? line.trim() : "" };
}

function splitHeadLead(src, fallback) {
  const head = String(src || "").split(/[，。：；]/)[0];
  const rest = String(src || "").slice(head.length).replace(/^[，。：、；]/, "").replace(/[，。：、；]$/, "").trim();
  return { head, lead: rest || String(fallback || "").split(/[。！？]/)[0] || "" };
}

// 列表块分类 → 机制类型（matrix/ledger/keywords/flow/action/list）
function classifyListBlock(lines, title = "") {
  const n = lines.length;
  if (n < 2) return "list";
  const ctx = title + " " + lines.join(" ");
  const questions = lines.filter(l => /[？?]$/.test(l.trim()) || /(吗|呢)[？?]?$|有没有|是不是|该不该|要不要/.test(l)).length;
  const valued = lines.filter(l => SHAPE_UNIT_RE.test(l)).length;
  const stepy = /步骤|流程|第[一二三四五12345][步阶]|三步|四步|五步|先.+再|然后|接着|→/.test(ctx);
  const actiony = /行动|今天就|立刻|马上|现在就|开始做|去做|这样做|待办|动手|该做/.test(ctx);
  const keywordy = /关键词|核心(词|是|的)|底层|几个(词|字)|要素|特质|品质|原则|信条/.test(title);

  if (questions >= Math.max(2, Math.ceil(n * 0.6))) return "matrix";
  if (valued >= Math.max(2, Math.ceil(n * 0.5))) return "ledger";
  if (keywordy && lines.every(l => splitWordNote(l).word.length <= 6)) return "keywords";
  if (stepy && n >= 2 && n <= 5) return "flow";
  if (actiony) return "action";
  return "list";
}

function extractMatrixCells(lines) {
  return lines.slice(0, 4).map((l, i) => {
    const { word, note } = splitWordNote(l, 18);
    return { num: String(i + 1).padStart(2, "0"), title: trimTo(word || l, 16), note: trimTo(note, 18) };
  });
}
function extractLedgerEntries(lines) {
  // 只保留真正带数值的行（过滤混进来的非账目列表行）
  return lines.filter(l => SHAPE_UNIT_RE.test(l)).slice(0, 6).map((l) => {
    const vm = l.match(SHAPE_UNIT_RE);
    const value = vm ? vm[0].replace(/\s+/g, "") : "";
    const label0 = l.replace(SHAPE_UNIT_RE, "").replace(/[：:，,、。\s]+$/, "").trim();
    const { word, note } = splitWordNote(label0, 8);
    return { label: trimTo(word || label0, 10), value, note: trimTo(note.replace(/^[，,、：:\s]+/, ""), 22) };
  });
}
// 账目同单位求和 → 合计大数（视觉稿点睛=朱砂红大数）；混单位/不可解析则不给合计
function sumLedger(entries) {
  const norm = s => String(s || "").replace(/[０-９]/g, d => "0123456789"["０１２３４５６７８９".indexOf(d)]);
  const parsed = (entries || []).map(e => {
    const v = norm(e.value);
    return { num: parseFloat((v.match(/[0-9]+(?:\.[0-9]+)?/) || [])[0]), unit: v.replace(/[0-9.\s]/g, "") };
  });
  if (!parsed.length || parsed.some(p => !isFinite(p.num))) return "";
  const unit = parsed[0].unit;
  if (parsed.some(p => p.unit !== unit)) return "";
  return `${Math.round(parsed.reduce((s, p) => s + p.num, 0) * 100) / 100}${unit}`;
}
function extractKeywordCells(lines) {
  return lines.slice(0, 5).map((l, i) => {
    const { word, note } = splitWordNote(l, 6);
    return { word: trimTo(word, 6), note: trimTo(note, 16), weight: i === 0 ? "core" : "" };
  });
}
function extractFlowSteps(lines) {
  return lines.slice(0, 5).map((l, i) => {
    const { word, note } = splitWordNote(l, 8);
    return { num: String(i + 1).padStart(2, "0"), title: trimTo(word, 8), note: trimTo(note, 40) };
  });
}
function extractActionItems(lines) {
  return lines.slice(0, 5).map((l) => {
    const { word, note } = splitWordNote(l, 12);
    return { title: trimTo(word || l, 14), note: trimTo(note, 30) };
  });
}

// 公式：检测 "A ＋ B ＝ C"（要 = 且左侧 ≥2 要素，误判低）
function extractFormula(text) {
  const m = text.match(/([^\n。；=＝]{2,40}?[+＋·][^\n。；=＝]{2,40})\s*[=＝]\s*([^\n。；]{2,30})/);
  if (!m) return null;
  const terms = m[1].split(/\s*[+＋·]\s*/).map(t => t.trim().replace(/^.*[：:]\s*/, "").trim()).filter(Boolean);
  if (terms.length < 2) return null;
  return { terms: terms.slice(0, 3).map(t => ({ word: trimTo(t, 12) })), result: { word: trimTo(m[2].trim(), 14) } };
}

// 对比：要双标记同时出现（误区+正解 等），误判低
function extractCompare(text) {
  const pairs = [
    [/误区|误解|错误(?!率|码|数|值|次|量|日志)|错的/, /正解|正确|对的|应该/, "误", "正", "误区与正解"],
    [/传统|过去|以前|旧的/, /现在|如今|新的|未来/, "旧", "新", "过去与现在"],
    [/自嗨|为自己|自我视角/, /读者|为别人|利他/, "误", "正", "自嗨与利他"],
  ];
  const lines = text.split(/\n+/).map(s => s.trim()).filter(Boolean);
  for (const [aRe, bRe, aMark, bMark, label] of pairs) {
    // 排除同时含两个标记的引导句（如「我踩过的误区和后来的正解」）
    const a = lines.filter(l => aRe.test(l) && !bRe.test(l));
    const b = lines.filter(l => bRe.test(l) && !aRe.test(l));
    if (a.length && b.length) {
      const clean = s => trimTo(s.replace(/^[-*•①-⑨0-9.、：:\s]+/, "").replace(aRe, "").replace(bRe, "").replace(/^[：:，,、\s]+/, "").replace(/[：:，。]/g, "").trim() || s, 18);
      return {
        title: label,
        left: { mark: aMark, label: "", points: a.slice(0, 3).map(clean) },
        right: { mark: bMark, label: "", points: b.slice(0, 3).map(clean) },
      };
    }
  }
  return null;
}

// 相邻不超 2 连同骨架（best-practices：连续 >2 页同 layoutRole 判失败）；违规处插 quote 分隔
function scheduleNoRepeat(pages) {
  const out = [];
  let run = 0;
  for (const pg of pages) {
    const prev = out[out.length - 1];
    run = prev && prev.type === pg.type ? run + 1 : 0;
    if (run >= 2) { out.push({ type: "quote" }); run = 0; }
    out.push(pg);
  }
  return out;
}

// ── SP-WS Planner（内容→骨架路由 + 动态分页 + 相邻不重复）─────────────
function planSpWsBrief(text, options = {}) {
  const paras = parseParagraphs(text);
  const title = options.title || extractTitle(text, paras);
  const kind = options.kind || inferKind(text);
  const theme = options.style || inferTheme(text); // 内容色温/场景 → 自动选静纸主题
  const kicker = KICKER_MAP[kind] || { en: "NOTES", cn: "手记" };
  const anchorChar = inferAnchorChar(title);

  const leadPara = paras[0] || title;
  const allBody = paras.length > 1 ? paras.slice(1) : paras;
  const listItems = extractListItems(text);
  const listBlockLines = listLines(text);
  const listType = listBlockLines.length >= 2 ? classifyListBlock(listBlockLines, title) : "list";
  const timeline = extractTimeline(text);
  const formula = extractFormula(text);
  const compare = extractCompare(text);

  // 按原文顺序路由：普通段累积成 essay（每 2 段一页）；遇列表段→抽出引导段做 list 页；时间段→panel 页
  const isListPara = p => /(?:[-*•]|\d+[.、]|[①②③④⑤⑥⑦⑧⑨])/.test(p) && !/\d{1,2}[:：]\d{2}/.test(p);
  const isTimePara = p => /\d{1,2}[:：]\d{2}/.test(p);
  const raw = [];
  let buf = [], listDone = false, panelDone = false;
  const flush = () => { while (buf.length) raw.push({ type: "essay", paras: buf.splice(0, 2) }); };
  for (const p of allBody) {
    if (!listDone && listItems.length >= 2 && isListPara(p)) {
      const lead = buf.length ? buf.pop() : leadPara; flush();
      raw.push({ type: listType, leadIn: lead, lines: listBlockLines }); listDone = true;
    } else if (!panelDone && timeline.length >= 2 && isTimePara(p)) {
      const lead = buf.length ? buf.pop() : leadPara; flush();
      raw.push({ type: "panel", leadIn: lead }); panelDone = true;
    } else if (!isListPara(p) && !isTimePara(p)) {
      buf.push(p);
    }
  }
  flush();
  if (formula) raw.push({ type: "formula", data: formula });
  if (compare && compare.left.points.length && compare.right.points.length) raw.push({ type: "compare", data: compare });
  const cleanBody = allBody.filter(p => !isListPara(p) && !isTimePara(p));

  let body = scheduleNoRepeat(raw);
  body.push({ type: "quote", closing: true });

  // 张数上限（含封面）：options.cards 或自动封顶 9；超出时保留收尾页
  const cap = Number(options.cards) || 9;
  if (body.length + 1 > cap) body = body.slice(0, Math.max(1, cap - 2)).concat(body[body.length - 1]);

  const total = body.length + 1;
  const pageNo = i => `${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  const cards = [];
  const cover = {
    name: "01-cover",
    layout: options.coverLayout === "well" ? "sp-ws-cover-well" : "sp-ws-cover-photo",
    kicker,
    issue: options.issue || "NO.01",
    title: breakLine(title),
    lead: breakLine(trimTo(leadPara, 48)),
    seal: "记",
  };
  // 图卡自动出图需求（即便用户没给图）；默认 photo 母体安全区
  cover.imageRequest = buildCoverImageRequest({ kind, title, kicker, theme });
  // 封面母体路由：options.coverMother 显式(R01…R08) 或 "auto"(内容形状/kind→母体 + 抽取 bignum/items)；改 layout/variant + 需/免图 + 派生母体字段
  let motherName = options.coverMother, autoFields = null;
  if (motherName === "auto") { const a = inferCoverMother(text, kind, title, listItems); motherName = a.mother; autoFields = a.fields; }
  if (motherName) applyCoverMother(cover, motherName, { kind, title, kicker, theme });
  if (autoFields) for (const [k, v] of Object.entries(autoFields)) cover[k] = v; // auto 抽取的母体内容（R08 bignum/unit + 裁后 title、R07 items）
  // 用户给图：仅当该母体需要图时挂上（免图母体 R04/R07/R08 已删 imageRequest，忽略 options.image）
  if (options.image && cover.imageRequest) cover.image = options.image;
  // 母体专属内容字段 passthrough（caller 显式提供：R07 items / R08 bignum·unit / quote attrib / object platecap / titleEn / pull…）
  for (const k of ["items", "bignum", "unit", "attrib", "platecap", "titleEn", "pull", "qmark", "figcap"]) {
    if (options[k] != null) cover[k] = options[k];
  }
  cards.push(cover);

  let essaySeen = 0, listSeen = 0, ledgerSeen = 0, compareSeen = 0, matrixSeen = 0, keywordsSeen = 0, actionSeen = 0, quoteSeen = 0, flowSeen = 0, formulaSeen = 0, panelSeen = 0;
  const usedLines = []; // 跨卡金句去重池：essay 标题/pull + quote 选中句累积 → 防 quote 复读、防 essay↔quote 同句
  body.forEach((b, idx) => {
    const i = idx + 1;
    const page = pageNo(i);
    const nm = String(i + 1).padStart(2, "0");
    if (b.type === "essay") {
      essaySeen++;
      const grp = b.paras && b.paras.length ? b.paras : [leadPara];
      const eTitle = breakLine(trimTo(grp[0].split(/[，。]/)[0] || title, 18));
      const eTitleClean = eTitle.replace(/\n/g, "");
      const pull = extractPull(grp, eTitleClean);
      const card = {
        name: `${nm}-essay`,
        layout: "sp-ws-body-essay",
        kicker, page,
        anchorChar: inferAnchorChar(eTitle),       // 各张取各自标题的字，底字不再重复
        title: eTitle,
        paragraphs: grp.map(p => trimTo(p, 90)),
        seal: "记",
      };
      if (pull) card.pull = breakLine(pull);        // 每张都给 pull，填底部、稳节奏
      usedLines.push(eTitleClean); if (pull) usedLines.push(pull);   // 标题/pull 入池，避免后续 quote 复读同句
      // 版式变体·重心轮换：essaySeen 首张=1，(essaySeen-1)%3 → 首张 v=0 基线（保母版首张像素）
      //   v=0 左重心·东方底字（基线，零改）｜v=1 右重心·竖排批注（rail 移左、底字隐）｜v=2 暂回退基线（对角·配图待 essay 挂图后单独一刀）
      const v = (essaySeen - 1) % 3;
      if (v === 1) {
        card.variant = "right";
        const rail = shortPhrase(grp, [pull, eTitleClean]);
        if (rail) card.rail = rail;                 // 右重心唯一装置=竖排批注，取一句区别于标题的短语
      }
      cards.push(card);
    } else if (b.type === "list") {
      listSeen++;
      const { head, lead } = splitHeadLead(b.leadIn || title, leadPara);
      const listCard = { name: `${nm}-list`, layout: "sp-ws-body-list", kicker, page,
        title: breakLine(trimTo(head, 16)), lead: breakLine(trimTo(lead, 28)),
        items: listItems, seal: "记" };
      // 版式变体·两栏网格·圈点：listSeen%2 轮换 + items≥3 守门（不足回退单列基线）；列表多为单页，故首张即可触发出多样
      if (listSeen % 2 === 1 && listItems.length >= 3) listCard.variant = "grid";
      cards.push(listCard);
    } else if (b.type === "ledger") {
      ledgerSeen++;
      const { head, lead } = splitHeadLead(b.leadIn || title, leadPara);
      const entries = extractLedgerEntries(b.lines || []);
      const total = sumLedger(entries);              // 同单位求和→合计（基线也补：视觉稿本有红合计大数，plan 此前漏算）
      const ledgerCard = { name: `${nm}-ledger`, layout: "sp-ws-body-ledger", kicker, page,
        title: breakLine(trimTo(head, 16)), lead: breakLine(trimTo(lead, 28)),
        entries, totalLabel: "合计", seal: "记" };
      if (total) ledgerCard.total = total;
      // 版式变体·结算重心：ledgerSeen%2 + entries≥3 + 有合计 → 红合计放大成主角大数（不足回退基线）；账多单页故首张即触发
      if (ledgerSeen % 2 === 1 && entries.length >= 3 && total) ledgerCard.variant = "figure";
      cards.push(ledgerCard);
    } else if (b.type === "matrix") {
      matrixSeen++;
      const { head } = splitHeadLead(b.leadIn || title, leadPara);
      const matrixCard = { name: `${nm}-matrix`, layout: "sp-ws-body-matrix", kicker, page,
        title: breakLine(trimTo(head, 18)),
        questions: extractMatrixCells(b.lines || []),
        anchorChar: inferAnchorChar(head), seal: "记" };
      if (matrixSeen % 2 === 1) matrixCard.variant = "figure";   // 版式变体·超大衬数问句序列（oversized numerals 建层次）
      cards.push(matrixCard);
    } else if (b.type === "flow") {
      flowSeen++;
      const { head, lead } = splitHeadLead(b.leadIn || title, leadPara);
      const flowCard = { name: `${nm}-flow`, layout: "sp-ws-body-flow", kicker, page,
        title: breakLine(trimTo(head, 18)), lead: breakLine(trimTo(lead, 28)),
        steps: extractFlowSteps(b.lines || []), seal: "记" };
      if (flowSeen % 2 === 1) flowCard.variant = "center";   // 版式变体·居中交错时间轴（行业最流行竖版 process）
      cards.push(flowCard);
    } else if (b.type === "keywords") {
      keywordsSeen++;
      const { head, lead } = splitHeadLead(b.leadIn || title, leadPara);
      const kwCard = { name: `${nm}-keywords`, layout: "sp-ws-body-keywords", kicker, page,
        title: breakLine(trimTo(head, 16)), lead: breakLine(trimTo(lead, 28)),
        keywords: extractKeywordCells(b.lines || []), seal: "记" };
      if (keywordsSeen % 2 === 1) kwCard.variant = "right";    // 版式变体·右重心词网
      cards.push(kwCard);
    } else if (b.type === "action") {
      actionSeen++;
      const { head, lead } = splitHeadLead(b.leadIn || title, leadPara);
      const actionCard = { name: `${nm}-action`, layout: "sp-ws-body-action", kicker, page,
        title: breakLine(trimTo(head, 16)), lead: breakLine(trimTo(lead, 28)),
        actions: extractActionItems(b.lines || []), anchorChar: inferAnchorChar(head), seal: "记" };
      if (actionSeen % 2 === 1 && actionCard.actions.length >= 3) actionCard.variant = "grid";  // 版式变体·两栏方框
      cards.push(actionCard);
    } else if (b.type === "formula") {
      formulaSeen++;
      const formulaCard = { name: `${nm}-formula`, layout: "sp-ws-body-formula", kicker, page,
        title: breakLine(title.replace(/[，。、：；\s]/g, "").slice(0, 5) + "的公式"),
        terms: b.data.terms, op: "+", result: b.data.result, seal: "记" };
      if (formulaSeen % 2 === 1) formulaCard.variant = "right";   // 版式变体·右对齐方程
      cards.push(formulaCard);
    } else if (b.type === "compare") {
      compareSeen++;
      const compareCard = { name: `${nm}-compare`, layout: "sp-ws-body-compare", kicker, page,
        title: breakLine(b.data.title || "两种做法"),
        left: b.data.left, right: b.data.right, anchorChar: "择", seal: "记" };
      // 版式变体·上下对照：compareSeen%2 → 误上/正下横带（对照多单页，故首张即触发）
      if (compareSeen % 2 === 1) compareCard.variant = "stack";
      cards.push(compareCard);
    } else if (b.type === "panel") {
      panelSeen++;
      const src = b.leadIn || title;
      const head = src.split(/[，。：]/)[0];
      const rest = src.slice(head.length).replace(/^[，。：、]/, "").replace(/[，。：、]$/, "").trim();
      const panelCard = {
        name: `${nm}-panel`,
        layout: "sp-ws-body-panel",
        kicker, page,
        title: breakLine(trimTo(head, 16)),
        lead: breakLine(trimTo(rest || leadPara.split(/[。！？]/)[0] || "", 28)),
        panel: { label: `${kicker.en} · ${kicker.cn}`, title: trimTo(rest || head, 12), rows: timeline },
        seal: "记",
      };
      if (panelSeen % 2 === 1) panelCard.variant = "rail";   // 版式变体·大时刻列
      cards.push(panelCard);
    } else {
      quoteSeen++;
      // 跨卡去重（usedLines）：多 quote 不复读、不与 essay 同句；去尾 clause 标点（收尾不以逗号/冒号结尾）
      const q = extractQuote(cleanBody.length ? cleanBody : [leadPara], usedLines).replace(/[，,、：:；;\s]+$/, "");
      usedLines.push(q);
      const quoteCard = {
        name: `${nm}-quote`,
        layout: "sp-ws-body-quote",
        kicker, page,
        quotemark: "“",
        // 不强行折行，交给 CSS text-wrap:balance 均衡、免单字孤行（去尾标点 + 跨卡去重已在上方算好）
        quote: q,
        src: "— " + shortTitleClean(title),
        seal: "记",
      };
      if (quoteSeen % 2 === 1) quoteCard.variant = "right";   // 版式变体·右重心收尾
      cards.push(quoteCard);
    }
  });

  // 多面纸色：组图 body 页轮换纸调（base/2/3 相邻不同，≥3 纸调；封面保持 base 不动）
  const PAPER_TONES = ["", "2", "3"];
  cards.forEach((c, i) => { if (i > 0 && !String(c.layout).includes("cover")) c.paperTone = PAPER_TONES[(i - 1) % 3]; });

  return {
    meta: {
      title,
      style: theme,
      format: options.format || "xhs",
      brand: options.brand || "",
      footer: options.footer || "",
    },
    cards,
  };
}

// ── Legacy planner (Signal / structured content) ──────────────────

function sentences(text) {
  return stripMd(text)
    .split(/(?<=[。！？!?])\s*|\n+/)
    .map(s => s.trim())
    .filter(s => s.length > 8);
}

function chunkSentences(ss, n) {
  const out = [];
  for (let i = 0; i < n; i++) out.push(ss[i % Math.max(1, ss.length)] || "补充核心观点。");
  return out;
}

function planLegacyBrief(text, options = {}) {
  const kind  = options.kind || inferKind(text);
  const heading = text.match(/^#{1,3}\s+(.+)$/m);
  const title = options.title || (heading ? heading[1].trim() : (() => {
    const first = sentences(text)[0] || "未命名主题";
    return first.slice(0, 42);
  })());
  const ss    = sentences(text);
  const count = Number(options.cards || Math.min(6, Math.max(4, ss.length || 4)));
  const seq   = LAYOUT_SEQUENCES[kind] || LAYOUT_SEQUENCES.tutorial;
  const picked = chunkSentences(ss, count);

  const titleShort = (t, max = 18) => {
    const c = t.replace(/[:：].*$/, "").trim();
    return c.length <= max ? c : c.slice(0, max - 1) + "…";
  };

  const cards = picked.map((s, i) => {
    const layout = seq[i % seq.length];
    if (i === 0) {
      return { name: "01-cover", layout: seq[0], kicker: options.kicker || kind.toUpperCase(), title: titleShort(title, options.format === "xcover" ? 22 : 18), subtitle: s, points: picked.slice(1, 4).map(x => x.replace(/[。！？!?]$/, "").slice(0, 20)) };
    }
    if (layout === "three-lane-flow") return { name: `${String(i+1).padStart(2,"0")}-flow`, layout, title: "把问题拆成可执行流程", subtitle: s, steps: picked.slice(0,3).map((x,j)=>({title:["拆解","执行","合并"][j],body:x.slice(0,44)})) };
    if (layout === "big-number-poster") return { name: `${String(i+1).padStart(2,"0")}-number`, layout, title: "核心信号", number: `${Math.max(3,count)}张`, subtitle: s };
    if (layout === "trend-compare") return { name: `${String(i+1).padStart(2,"0")}-compare`, layout, title: "旧做法 vs 新做法", left:{title:"旧做法",body:"靠临场发挥，内容容易散。"}, right:{title:"新做法",body:s.slice(0,48)} };
    if (layout === "dashboard-grid") return { name: `${String(i+1).padStart(2,"0")}-dashboard`, layout, title:"执行状态面板", panels:picked.slice(0,4).map((x,j)=>({value:String(j+1),title:["输入","拆解","生成","校验"][j],body:x.slice(0,30)})) };
    if (layout === "annotated-checklist" || layout === "checklist-strip") return { name: `${String(i+1).padStart(2,"0")}-checklist`, layout, title:"照这个检查", subtitle:s, checks:picked.slice(0,3).map(x=>({title:x.slice(0,18),body:x.slice(18,48)})), annotation:"少做装饰，多做判断。" };
    return { name: `${String(i+1).padStart(2,"0")}-card`, layout, title:s.slice(0,28), subtitle:picked[(i+1)%picked.length], points:picked.slice(0,3).map(x=>x.slice(0,24)) };
  });

  return {
    meta: { title, platform: options.format || "xhs", format: options.format || "xhs", style: options.style || DEFAULT_STYLE_BY_KIND[kind] || "sp-mist", brand: options.brand || "", footer: options.footer || "" },
    cards,
  };
}

// ── Main export ────────────────────────────────────────────────────

// ── Signal Proof 内容→组图（路线 B，opt-in options.system==="signal"；tech/AI/数据/职场） ──
function signalBoard(kind) {
  if (kind === "data") return "数据复盘";
  if (kind === "product") return "产品";
  if (kind === "news") return "快讯";
  return "方法论";
}
function buildSignalImageRequest({ title, kind, style = "hero" }) {
  const tokens = String(title || "").replace(/\n/g, " ").replace(/[^一-鿿a-zA-Z0-9]+/g, " ").trim();
  // 铁律：别用字面代码图(代码字抢标题)；用高质量软抽象图(散焦/光斑/粒子)，band 会再 blur+压暗成氛围底。
  const mood = "abstract atmospheric defocused glow light particles bokeh dark technology high quality NO visible code text";
  return {
    role: "cover-hero", mother: "sl-hero",
    query: [tokens, mood].filter(Boolean).join(" ").slice(0, 150),
    providerOrder: COVER_PROVIDER_ORDER,
    crop: "软抽象/散焦氛围图(避字面代码、避文字)；将套主题色三调 duotone + band 模糊压暗；标题在下方实底安全区",
    licensePreference: "CC0 / Public Domain 优先，记录真实来源到 SOURCES.md",
  };
}
// Signal 现场记录卡取图：安静氛围风景(晨雾/湖/远山)，light register、配档案纸暖白底（区别 hero 的暗调 tech 抽象）。
function buildFieldnoteImageRequest({ title }) {
  const tokens = String(title || "").replace(/\n/g, " ").replace(/[^一-鿿a-zA-Z0-9]+/g, " ").trim();
  return {
    role: "field-note", mother: "sl-fieldnote",
    query: [tokens, "misty quiet calm landscape morning fog mountain lake atmospheric muted natural light"].filter(Boolean).join(" ").slice(0, 150),
    providerOrder: COVER_PROVIDER_ORDER,
    crop: "安静氛围风景(晨雾/湖/远山)，light register、留呼吸；配档案纸暖白底，避高饱和/避人脸特写/避字面文字",
    licensePreference: "CC0 / Public Domain 优先，记录真实来源到 SOURCES.md",
  };
}
// Signal tech 指标提取：标签 + 数值(宽松，含 ms/%/纯数字/k/w/MB/QPS 等) + 可选 delta(↑↓/±%)。
// 区别 Still Paper 生活向 SHAPE_UNIT_RE(小时/元/杯/本)，专供数据/tech 语境，不污染纸本路由。
const SL_METRIC_VAL = /[+\-−]?[0-9][0-9,]*(?:\.[0-9]+)?\s*(?:ms|μs|us|ns|h|min|s|%|‰|k|K|w|W|万|亿|MB|GB|KB|TB|QPS|rpm|req|fps|px|pt|次|条|小时|分钟|天|周|月|年|岁|人|个|倍|分|秒|元|美元|星)?/;
function extractMetrics(lines) {
  const out = [];
  for (const raw of lines) {
    const l = String(raw).trim();
    // 跳过纯数字序列行（≥3 裸数字 = 趋势序列，归 INSIGHT 折线）。先归一千分位(12,840→12840)避免逗号拆数误判。
    const seqProbe = l.replace(/(\d),(\d{3})/g, "$1$2").replace(/-?\d+(?:\.\d+)?\s*[%‰a-zA-Z条个次天人元倍万亿]/g, " ");
    if ((seqProbe.match(/-?\d+(?:\.\d+)?/g) || []).length >= 3) continue;
    const dm = l.match(/[（(]?\s*([↑↓▲▼+\-−]\s*[0-9][0-9.,]*\s*(?:%|‰|pt|倍|个|x|×)?)\s*[）)]?/);
    const delta = dm ? dm[1].replace(/\s+/g, "") : "";
    const bodyTxt = dm ? l.replace(dm[0], " ") : l;
    const m = bodyTxt.match(/^(.{1,18}?)\s*[：:]\s*(.+)$/) || bodyTxt.match(/^(.{1,16}?)\s+([0-9].*)$/);
    if (!m) continue;
    const label = m[1].replace(/[，,、：:。\s]+$/, "").trim();
    const vm = m[2].match(SL_METRIC_VAL);
    if (!vm || !/[0-9]/.test(vm[0])) continue;
    const value = vm[0].replace(/\s+/g, "").replace(/[，,、。]+$/, "");
    if (!label || !value) continue;
    out.push({ label: trimTo(label, 8), value, delta });
  }
  return out;
}
const SL_MARK_NAME = { "误": "误区", "正": "正解", "旧": "过去", "新": "现在" };
// 对比卡数据：复用 extractCompare(误区/正解/旧新 双栏要点) → cols 模式（engine slEvCompare 双栏）。
function extractCompareCard(text) {
  const c = extractCompare(text);
  if (!c) return null;
  return {
    title: c.title,
    optionA: SL_MARK_NAME[c.left.mark] || "A",
    optionB: SL_MARK_NAME[c.right.mark] || "B",
    cols: [
      { head: SL_MARK_NAME[c.left.mark] || "A", points: (c.left.points || []).filter(Boolean) },
      { head: SL_MARK_NAME[c.right.mark] || "B", points: (c.right.points || []).filter(Boolean) },
    ],
  };
}
// 步骤行提取：只认强步骤信号（"第N步"/"步骤N"/箭头），避免把指标/对比/普通列表行当工作流步骤（防内容串味）。
function extractStepLines(text) {
  return listLines(text).filter(l =>
    /第\s*[一二三四五六七八九十1-9]+\s*步/.test(l) ||
    /^步骤\s*[一二三四五1-5]/.test(l) ||
    /→/.test(l)
  );
}
// Signal split 自动 series 推导：取「数字最多的那一行」当序列(避免误抓散落的 P95/百分比)，≥3 才出折线。
function extractSeries(text) {
  let best = [];
  for (const ln of String(text).split(/\r?\n/)) {
    // 归一千分位(12,840→12840)，再剔除带单位/百分比的数字(那是指标不是趋势点)，只留裸数字序列。
    const stripped = ln.replace(/(\d),(\d{3})/g, "$1$2").replace(/-?\d+(?:\.\d+)?\s*(?:ms|μs|us|ns|s|%|‰|条|个|次|天|人|元|倍|pt|px|k|K|w|W|万|亿|MB|GB|KB|QPS|rpm|req|fps)/gi, " ");
    const ns = (stripped.match(/-?\d+(?:\.\d+)?/g) || []).map(Number).filter(n => Number.isFinite(n) && Math.abs(n) < 1e7);
    if (ns.length > best.length) best = ns;
  }
  return best.length >= 3 ? best.slice(0, 8) : [];
}
function computeTrend(series) {
  if (series.length < 2) return "";
  const a = series[0], b = series[series.length - 1];
  if (!a) return "";
  const pct = Math.round(((b - a) / Math.abs(a)) * 100);
  return `${pct >= 0 ? "+" : "−"}${Math.abs(pct)}%`;
}
function planSignalBrief(text, options = {}) {
  const kind = options.kind || inferKind(text);
  const paras = parseParagraphs(text);
  const headTitle = (text.match(/^#\s+(.+)$/m) || [])[1];
  const title = options.title || headTitle || stripMd(paras[0] || "信号账本").slice(0, 20);
  const board = signalBoard(kind);
  const entries = extractLedgerEntries(listLines(text));
  const cards = [];

  const cs = options.coverStyle === "auto" ? inferCoverStyle(text, "signal") : options.coverStyle;   // opt-in 自动选
  let cover;
  if (cs === "manifesto") {
    // 宣言式无图大字（type-as-hero，零图，opt-in）。署名/编号交 engine 中性化兜底，不写死内部品牌名。
    cover = {
      name: "cover", layout: "sl-cover-manifesto", token: "01",
      kickerLine: options.kickerLine,
      title: breakLine(trimTo(title, 14)), titleEn: options.titleEn,
      lead: trimTo(stripMd(paras[1] || (paras[0] !== title ? paras[0] : "") || ""), 28),
    };
  } else if (cs === "split") {
    // 图+数据 split：自动从正文推导折线 series（≥3 数字）+ 数据行（entries），软抽象证据图。
    const series = extractSeries(text);
    cover = {
      name: "cover", layout: "sl-cover-split", board, token: "01", shotLabel: options.shotLabel || "EVIDENCE",
      title: breakLine(trimTo(title, 18)),
      series, trend: computeTrend(series),
      rows: entries.slice(0, 2).map(e => ({ label: trimTo(e.label || e.word || "", 8), value: String(e.value ?? e.amount ?? "") })),
    };
    cover.imageRequest = buildSignalImageRequest({ title, kind, style: "split" });
    if (options.image) cover.image = options.image;
  } else if (cs === "hero") {
    cover = {
      name: "cover", layout: "sl-cover-hero", board, token: "01",
      title: breakLine(trimTo(title, 26)), tag: options.tag,
    };
    cover.imageRequest = buildSignalImageRequest({ title, kind });
    if (options.image) cover.image = options.image;
  } else {
    // 默认：sl-cv 三形态按「用户手里有什么」自动路由（真实场景倒推；不自嗨、撑不起的形态不选）
    const cse = extractSeries(text);
    const cm = extractMetrics(listLines(text));
    const cmLedger = cm.slice(0, 3).map(m => ({ v: m.value, k: m.label }));
    if (options.shot) {
      // 有真截图 → grid（最强证据场景：用户真截图 + 独家 duotone/半调 + 账本栏）
      cover = {
        name: "cover", layout: "sl-cv-grid", no: "01",
        title: breakLine(trimTo(title, 16)), titleEn: options.titleEn, sub: trimTo(stripMd(paras[1] || ""), 12),
        image: { src: options.shot, filename: path.basename(options.shot), source: options.shotSource || "用户提供", license: options.shotLicense || "用户授权", alt: "用户截图证据" },
        evTag: "Evidence · 证据存档",
        series: cse, trendBig: cse.length >= 2 ? computeTrend(cse) : ((cm[0] && cm[0].delta) || ""), trendCap: (cm[0] && cm[0].label) || "趋势",
        ledger: cmLedger,
      };
    } else if (cse.length >= 3) {
      // 有趋势数据 → figure（巨数 trend hero + 折线 + 账本支撑）
      cover = {
        name: "cover", layout: "sl-cv-figure", no: "01",
        title: breakLine(trimTo(title, 14)),
        figLabel: ((cm[0] && cm[0].label) || "关键趋势") + " · 同比",
        figBig: computeTrend(cse),
        figCap: `从 ${cse[0]} 到 **${cse[cse.length - 1]}**`,
        series: cse, axisL: "", axisR: "",
        ledger: cmLedger,
      };
    } else {
      // 纯文字（最高频）→ statement（巨字主张 + 核心论述 + 列表三点 / 证据三性兜底，不靠图）
      const li = extractListItems(text);
      cover = {
        name: "cover", layout: "sl-cv-statement", no: "01",
        title: breakLine(trimTo(title, 18)), titleEn: options.titleEn,
        lead: breakLine(trimTo(stripMd(paras[1] || paras[0] || ""), 36), 12),
        // 列表前 3 项是「互异的维度短词」才当 ledger；若词重复（如误区/误区/正解）说明不是并列维度 → 用证据三性兜底（Signal 信任三角，不塞重复词）
        ledger: (li.length >= 3 && new Set(li.slice(0, 3).map(it => it.word)).size === 3)
          ? li.slice(0, 3).map(it => ({ w: trimTo(it.word, 5), d: trimTo(it.note || "", 12) }))
          : [{ w: "可追溯", d: "每个结论留出处" }, { w: "可复算", d: "数据能被重新验算" }, { w: "可验证", d: "流程经得起复查" }],
      };
    }
  }
  cards.push(cover);

  // ── 内容形状 → 6 类证据卡路由：数据→DATA/INSIGHT、步骤→WORKFLOW、对比→COMPARE、随笔→FIELD NOTE、用户截图→SCREENSHOT ──
  const metrics = extractMetrics(listLines(text));
  const series = extractSeries(text);
  const stepLines = extractStepLines(text);
  const cmp = extractCompareCard(text);

  // 用户提供截图 → SCREENSHOT（诚实：仅当用户真给截图素材，标用户来源；绝不拿取来的图冒充"用户提供"）
  if (options.shot) {
    cards.push({
      name: "screenshot", layout: "sl-ev-screenshot",
      title: breakLine(trimTo(title, 16)), sect: "Screenshot · 证据存档",
      shotLabel: options.shotLabel || "EVIDENCE · 截图证据", shotNote: "用户提供",
      image: { src: options.shot, filename: path.basename(options.shot), source: options.shotSource || "用户提供", license: options.shotLicense || "用户授权", alt: "用户截图证据" },
      notes: metrics.slice(0, 2).map(m => ({ title: `${m.label} **${m.value}**`, body: m.delta ? `较上期 **${m.delta}**，已存档校验。` : "已存档校验，可追溯复算。" })),
      source: "来源 · 用户提供截图",
    });
  }
  // 趋势序列(≥3 连续数字) → INSIGHT 折线
  if (series.length >= 3) {
    cards.push({
      name: "insight", layout: "sl-ev-insight",
      title: breakLine(trimTo(title, 14)), sect: "Insight · 洞察数据",
      series, trend: computeTrend(series), trendLabel: trimTo((metrics[0] && metrics[0].label) || "关键趋势", 6),
      rows: metrics.slice(0, 2).map(m => ({ label: m.label, value: m.value })),
    });
  }
  // 数据指标 → DATA 网格(2×2)。已出 INSIGHT 且指标 <4 时让 INSIGHT 承载，不重复出 DATA。
  if (metrics.length >= 4 || (metrics.length >= 2 && series.length < 3)) {
    cards.push({
      name: "data", layout: "sl-ev-data",
      title: breakLine(trimTo(title, 14)), sect: "Data · 数据网格",
      cells: metrics.slice(0, 4).map(m => ({ value: m.value, label: m.label, delta: m.delta || "" })),
    });
  }
  // 步骤 → WORKFLOW（只抓真步骤行：含"第N步/步骤N/箭头"强信号，避免把指标/对比行当步骤）
  if (stepLines.length >= 2) {
    cards.push({
      name: "workflow", layout: "sl-ev-workflow",
      title: breakLine(trimTo(title, 14)), sect: "Workflow · 工作流",
      steps: stepLines.slice(0, 5).map(l => {
        const clean = l.replace(/^第\s*[一二三四五六七八九十1-9]+\s*步\s*[：:、.]?\s*/, "").replace(/^步骤\s*[一二三四五1-5]?\s*[：:、.]?\s*/, "").replace(/^[1-9][.、)]\s*/, "");
        const wn = splitWordNote(clean, 10);
        return { title: trimTo(wn.word, 10), body: trimTo(wn.note, 24) };
      }),
    });
  }
  // 对比(误区/正解·过去现在) → COMPARE 双栏对照；总点数 <3（如每栏仅 1 点）撑不起整页 → 不出，避免下半塌空（撑不起的形态不选）
  if (cmp && ((cmp.cols[0]?.points?.length || 0) + (cmp.cols[1]?.points?.length || 0)) >= 3) {
    cards.push({
      name: "compare", layout: "sl-ev-compare",
      title: breakLine(trimTo(cmp.title || title, 14)), sect: "Compare · 对比",
      optionA: cmp.optionA, optionB: cmp.optionB, cols: cmp.cols,
    });
  }
  // 兜底/随笔 → FIELD NOTE 现场记录（需图，挂 imageRequest 走取图管线，强制先取图 gate）
  if (cards.length === 1) {
    const fn = {
      name: "fieldnote", layout: "sl-ev-fieldnote",
      title: breakLine(trimTo(title, 12)), sect: "Field Note · 现场记录",
      lead: trimTo(stripMd(paras[1] || paras[0] || ""), 56),
    };
    if (options.place) fn.place = options.place;   // 随笔多无明确地点 → 交 engine 兜底"现场"，不拿 board 名硬当地点
    fn.imageRequest = buildFieldnoteImageRequest({ title });
    if (options.fieldImage) fn.image = options.fieldImage;
    cards.push(fn);
  }

  const total = cards.length;
  cards.forEach((c, i) => {
    c.token = `${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    c.name = `${String(i + 1).padStart(2, "0")}-${c.layout.replace(/^sl-(cover|body)-/, "")}`;
    // 可定制署名：仅当用户显式 --brand 才印（覆盖 sl-ev 的 brand / sl-cover 的 eyebrow·footer）；默认中性不印内部名。
    if (options.brand) { c.brand = options.brand; c.eyebrow = c.eyebrow || options.brand; c.footer = c.footer || options.brand; }
  });

  return {
    meta: { title, platform: options.format || "xhs", format: options.format || "xhs", style: options.style || "sl-blue", brand: options.brand || "", system: "signal-ledger", footer: options.footer || "" },
    cards,
  };
}

// ── 图桥 Bridge Canvas 内容→封面（第三语言，opt-in options.system==="bridge"；README hero/产品总览/平台） ──
// coverStyle: cover(默认 cinematic 满铺) | noir(黑卡巨字) | weave(标题穿插主体·雾感) | split(上下分割·奶纸字版)
// Bridge 点睛色预设：warm 暖金(默认) / slate 冷蓝灰 · sage 雾绿 · dusk 暮褐(冷调 misty 视觉方向)
const BC_PALETTES = { warm: "#E5C07A", slate: "#8AA1B0", sage: "#9DB39B", dusk: "#C2A0A0" };
const BC_COOL = new Set(["slate", "sage", "dusk"]);
const BRIDGE_IMG = {
  cover: { mood: "cinematic dramatic landscape atmospheric wide film moody", crop: "满铺 cinematic 强图，off-center 自然光；将套 letterbox + split-tone；标题压底安全区、避焦点" },
  noir: { mood: "dark dramatic low-key portrait shadow cinematic moody near-black", crop: "满铺暗调强图压近黑，主体留中段；巨字主角 + 暗场 veil；标题避焦点" },
  weave: { mood: "misty foggy atmospheric lone figure quiet calm mountain lake landscape", crop: "满铺 atmospheric 雾景/孤身人影，主体居中留白；标题分上下绕主体穿插" },
  split: { mood: "editorial still life warm natural light texture quiet object", crop: "上半 band 用图(editorial 静物/质感)；下半奶纸字版、金线" },
};
function buildBridgeImageRequest({ title, style = "cover" }) {
  const tokens = String(title || "").replace(/\n/g, " ").replace(/[^一-鿿a-zA-Z0-9]+/g, " ").trim();
  const spec = BRIDGE_IMG[style] || BRIDGE_IMG.cover;
  return {
    role: "cover-hero", mother: "bc",
    query: [tokens, spec.mood].filter(Boolean).join(" ").slice(0, 150),
    providerOrder: COVER_PROVIDER_ORDER,
    crop: spec.crop,
    licensePreference: "CC0 / Public Domain 优先，记录真实来源到 SOURCES.md",
  };
}
// 雾感穿插标题：首个短句做上段（绕主体），其余落下段
function splitWeaveTitle(title) {
  const t = String(title || "").replace(/\n/g, "").trim();
  const m = t.match(/^(.{1,8}[，,、。])\s*(.+)$/);
  if (m) return { top: m[1], bot: m[2] };
  return { top: "", bot: t };
}
function planBridgeBrief(text, options = {}) {
  const paras = parseParagraphs(text);
  const headTitle = (text.match(/^#\s+(.+)$/m) || [])[1];
  const title = options.title || headTitle || stripMd(paras[0] || "图桥").slice(0, 20);
  let cs = options.coverStyle || "cover";
  if (cs === "auto") cs = inferCoverStyle(text, "bridge") || "cover";   // opt-in 自动选 coverStyle
  const eyebrow = options.eyebrow || "BRIDGE CANVAS";
  let cover;
  if (cs === "noir") {
    cover = {
      name: "01-bc", layout: "bc-noir", lang: options.titleEn ? "mix" : "cn", variant: options.variant || "bottom",
      kicker: { en: eyebrow }, index: "NO. 01", kickerLine: options.kickerLine,
      title: breakLine(trimTo(title, 14)), titleEn: options.titleEn, spine: options.spine,
      font: options.font, footer: options.footer || options.brand || "",
    };
  } else if (cs === "weave") {
    const { top, bot } = splitWeaveTitle(trimTo(title, 16));
    cover = {
      name: "01-bc", layout: "bc-weave", font: options.font || "kai",
      kicker: { en: eyebrow }, index: "NO. 01", kickerLine: options.kickerLine,
      titleTop: top, titleBot: bot, titleEn: options.titleEn, spine: options.spine,
      footer: options.footer || options.brand || "",
    };
  } else if (cs === "split") {
    cover = {
      name: "01-bc", layout: "bc-split", lang: options.titleEn ? "mix" : "cn",
      kicker: { en: eyebrow }, index: "NO. 01", kickerLine: options.kickerLine, bandcap: options.bandcap,
      title: breakLine(trimTo(title, 16)), titleEn: options.titleEn,
      footer: options.footer || options.brand || "",
    };
  } else {
    cover = {
      name: "01-bc", layout: "bc-cover", token: "01",
      eyebrow, board: options.board || options.brand || "",
      title: breakLine(trimTo(title, 18)),
      lead: options.lead || (paras[0] && paras[0] !== title ? trimTo(stripMd(paras[0]), 40) : ""),
      footer: options.footer || "ONE SOURCE · MANY FORMATS",
    };
  }
  // Bridge 主题色预设（冷 misty 视觉方向 / 暖金）。slate·sage·dusk 走冷调 bc-cool。
  if (options.bcPalette) {
    const hex = BC_PALETTES[options.bcPalette] || (/^#?[0-9a-fA-F]{6}$/.test(options.bcPalette) ? (options.bcPalette[0] === "#" ? options.bcPalette : "#" + options.bcPalette) : null);
    if (hex) cover.accent = hex;
    if (BC_COOL.has(options.bcPalette)) cover.cool = true;
  }
  if (options.accent) cover.accent = options.accent;   // 显式 accent 覆盖预设
  if (options.cool) cover.cool = true;
  cover.imageRequest = buildBridgeImageRequest({ title, style: cs });
  if (options.image) cover.image = options.image;
  // cover/noir = dramatic 上 teal-gold duo（需暗部足强图）；frame = calm 守本色（CSS 固定）。register 划分见 [[bridge-split-tone-duotone]]
  // Bridge body：内容分段 → cinematic 图叙事卡 bc-frame（金句=段核心句 + 金色序号 + imageRequest），把内容连接成跨平台图文章节
  const bodyCards = [];
  const tflat = String(title).replace(/\n/g, "");
  const bodyParas = paras.slice(1).map(p => stripMd(p).trim()).filter(p => p && p !== tflat).slice(0, 3);
  bodyParas.forEach((p, i) => {
    const quote = trimTo(p.split(/[。！？]/)[0], 18);
    if (!quote) return;
    const fr = {
      name: `frame-${i + 1}`, layout: "bc-frame",
      kicker: { en: eyebrow }, token: String(i + 2).padStart(2, "0"), idx: `NO. ${String(i + 2).padStart(2, "0")}`,
      title: breakLine(quote), footer: options.footer || options.brand || "",
    };
    fr.imageRequest = buildBridgeImageRequest({ title: p, style: "cover" });
    bodyCards.push(fr);
  });
  return {
    meta: { title, platform: options.format || "xhs", format: options.format || "xhs", style: options.style || "sl-blue", brand: options.brand || "", system: "bridge-canvas", footer: options.footer || "" },
    cards: [cover, ...bodyCards],
  };
}

// 内容 → 封面版式自动选（opt-in options.coverStyle==="auto"）。按内容形状/情绪给 Bridge/Signal 选 coverStyle；弱信号回退默认(bridge→cover / signal→null=hero)。
export function inferCoverStyle(text, system) {
  const t = String(text || "");
  if (system === "bridge") {
    if (/(风景|山|海|雾|湖|林|旷野|自然|慢|静|孤独|治愈|内心|远方|旅|独处|安静|呼吸)/.test(t)) return "weave";   // calm 雾感
    if (/(书|阅读|读|器物|物件|收藏|时间|咖啡|手记|静物|生活方式|餐桌|手作)/.test(t)) return "split";            // 上下分割·静物
    if (/(深夜|黑暗|孤勇|态度|宣言|不再|敢|凝视|光与影|戏剧)/.test(t)) return "noir";                            // 黑卡巨字
    return "cover";
  }
  if (system === "signal") {
    const nums = (t.match(/\d+(?:\.\d+)?%?/g) || []).length;
    if (/(本质|真相|只有|就是|第一|别|必须|不要|要么|核心是|关键是)/.test(t) && nums < 3) return "manifesto";   // 断言/观点→宣言
    if (nums >= 4) return "split";   // 数据密集→图+数据 split（自动 series）
    return null;   // 默认 hero
  }
  return null;
}

// 内容/kind → 视觉语言自动选（opt-in options.system==="auto"）。强 tech/AI/数据/职场信号 → Signal；否则 Still Paper（默认）。Bridge 是展示层不自动选，留显式。
export function inferSystem(text, kind) {
  const t = String(text || "");
  const techSig = /(AI|agent|LLM|GPT|Claude|prompt|API|SDK|代码|编程|模型|算法|架构|部署|benchmark|数据库|后端|前端|工作流|workflow|KPI|转化率|留存|复盘|评测|跑分)/i.test(t);
  const techKind = kind === "data" || kind === "product";
  const howto = /(教程|步骤|实战|方法论|工具对比|盘点|提速|效率|自动化)/.test(t);
  return (techSig || techKind || howto) ? "signal" : null;   // null → Still Paper 默认
}

export async function planBrief(input, options = {}) {
  const text = await fs.readFile(input, "utf8");
  const kind = options.kind || inferKind(text);
  let system = options.system;
  if (system === "auto") system = inferSystem(text, kind);     // opt-in 自动选语言；默认路由零影响
  if (system === "signal") return planSignalBrief(text, { ...options, kind });   // 路线 B
  if (system === "bridge") return planBridgeBrief(text, { ...options, kind });   // 图桥
  if (SP_WS_KINDS.has(kind)) return planSpWsBrief(text, { ...options, kind });
  // data/tutorial/product/news 等 → 实证 Signal(为这些内容而生)；遗留 planLegacyBrief 退役、不再路由
  return planSignalBrief(text, { ...options, kind });
}

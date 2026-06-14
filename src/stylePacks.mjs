export const STYLE_PACKS = [
  {
    id: "xhs-real-proof",
    name: "小红书真实证据流",
    platform: ["xhs"],
    categories: ["food", "travel", "fitness", "beauty", "home", "career", "tools"],
    intent: ["proof", "review", "tutorial"],
    visualSystem: "Signal Proof",
    theme: "SL-02 Graphite Mint",
    layouts: ["xhs-photo-proof", "xhs-text-bomb", "essay-split", "checklist-strip"],
    imagePolicy: "user-photo-first",
    description: "真实图片或截图做主角，设计退后。适合美食、旅行、测评、App 教程、健身结果。",
    antiPatterns: ["抽象装饰图", "过度留白", "小字说明压过证据"]
  },
  {
    id: "xhs-result-bomb",
    name: "小红书结果承诺封面",
    platform: ["xhs"],
    categories: ["fitness", "career", "study", "tools", "beauty"],
    intent: ["result", "growth", "conversion"],
    visualSystem: "Signal Proof",
    theme: "SL-04 Acid Lime",
    layouts: ["xhs-text-bomb", "alert-burst", "checklist-strip"],
    imagePolicy: "photo-or-screenshot-required",
    description: "先展示变化、结果、收益，再解释过程。标题需要强、短、可缩略图阅读。",
    antiPatterns: ["标题过长", "没有结果承诺", "把证据图做成背景噪声"]
  },
  {
    id: "xhs-clean-note",
    name: "小红书清爽知识笔记",
    platform: ["xhs"],
    categories: ["career", "study", "ai", "tools", "reading"],
    intent: ["education", "framework", "checklist"],
    visualSystem: "Signal Proof",
    theme: "SL-01 Electric Blue",
    layouts: ["xhs-hook-list", "three-lane-flow", "feature-matrix", "annotated-checklist"],
    imagePolicy: "image-optional",
    description: "适合干货、清单、工具、学习笔记。比 xhs-text-bomb 更克制，但标题仍必须够大。",
    antiPatterns: ["像企业 PPT", "标题太小", "列表太密"]
  },
  {
    id: "xhs-lifestyle-diary",
    name: "小红书生活方式日记",
    platform: ["xhs"],
    categories: ["travel", "food", "home", "relationship", "movie", "fashion"],
    intent: ["story", "diary", "curation"],
    visualSystem: "Still Paper",
    theme: "SP-03 Coastal Quiet",
    layouts: ["diary-scrapbook", "lifestyle-story", "quote-focus", "essay-split"],
    imagePolicy: "photo-led",
    description: "照片、情绪和个人观察是主角。适合治愈、旅行、居家、关系、影视观后感。",
    antiPatterns: ["过度数据化", "把日记做成知识卡", "照片太小"]
  },
  {
    id: "wechat-longform-cover",
    name: "公众号深度长文封面对",
    platform: ["wechat"],
    categories: ["ai", "product", "business", "culture", "travel"],
    intent: ["essay", "opinion", "analysis"],
    visualSystem: "Still Paper",
    theme: "SP-02 Warm Study",
    layouts: ["wechat-cover-pair", "statement-cover", "essay-split", "quote-focus"],
    imagePolicy: "hero-image-or-abstract",
    description: "适合公众号长文封面，强调标题气质、作者判断和稳定品牌感。",
    antiPatterns: ["小红书式吵闹标题", "没有 21:9 与 1:1 配对考虑"]
  },
  {
    id: "wechat-report-brief",
    name: "公众号报告简报",
    platform: ["wechat"],
    categories: ["data", "ai", "industry", "finance", "research"],
    intent: ["report", "data", "briefing"],
    visualSystem: "Signal Proof",
    theme: "SL-03 Safety Coral",
    layouts: ["big-number-poster", "trend-compare", "research-atlas", "evidence-wall"],
    imagePolicy: "data-first",
    description: "适合行业报告、论文解读、AI 搜索、市场观察。数字和结论先行。",
    antiPatterns: ["图表太多", "没有一句核心判断", "数据来源不清"]
  },
  {
    id: "wechat-brand-feature",
    name: "公众号品牌专题",
    platform: ["wechat"],
    categories: ["auto", "product", "business", "design"],
    intent: ["brand", "launch", "campaign"],
    visualSystem: "Signal Proof",
    theme: "SL-01 Electric Blue",
    layouts: ["product-hero", "feature-strip", "product-storyline", "feature-matrix"],
    imagePolicy: "official-or-user-image",
    description: "适合汽车、硬件、产品发布、品牌专题。产品图必须占主导。",
    antiPatterns: ["参数表堆满", "产品图太小", "像普通测评表"]
  },
  {
    id: "ai-workflow-blueprint",
    name: "AI 工作流蓝图",
    platform: ["xhs", "wechat"],
    categories: ["ai", "tools", "productivity", "agent"],
    intent: ["workflow", "tutorial", "framework"],
    visualSystem: "Signal Proof",
    theme: "SL-01 Electric Blue",
    layouts: ["three-lane-flow", "stack-map", "dashboard-grid", "screenshot-focus"],
    imagePolicy: "screenshot-or-diagram",
    description: "AI Agent、Codex、Claude Code、OpenClaw、自动化流程。截图和流程图是证据层。",
    antiPatterns: ["假机器人图", "没有实际界面", "流程箭头混乱"]
  },
  {
    id: "tech-screenshot-proof",
    name: "技术截图证据卡",
    platform: ["xhs", "wechat"],
    categories: ["ai", "tools", "coding", "app"],
    intent: ["tutorial", "proof", "howto"],
    visualSystem: "Signal Proof",
    theme: "SL-02 Graphite Mint",
    layouts: ["screenshot-focus", "essay-split", "checklist-strip"],
    imagePolicy: "screenshot-required",
    description: "先放大界面证据，再给步骤。适合教程、排障、插件、工作流。",
    antiPatterns: ["截图小到看不清", "代码/界面被装饰淹没"]
  },
  {
    id: "auto-campaign-premium",
    name: "汽车科技高级 Campaign",
    platform: ["xhs", "wechat"],
    categories: ["auto", "product"],
    intent: ["launch", "review", "campaign"],
    visualSystem: "Signal Proof",
    theme: "SL-01 Electric Blue",
    layouts: ["product-hero", "feature-strip", "feature-matrix", "wechat-cover-pair"],
    imagePolicy: "official-or-generated-hero",
    description: "鸿蒙智行、问界、智界、享界、尚界等汽车科技内容。光影、产品主体、少字。",
    antiPatterns: ["参数堆满", "车型图不清", "过度信息图化"]
  },
  {
    id: "food-proof-card",
    name: "食物真实诱惑卡",
    platform: ["xhs", "wechat"],
    categories: ["food"],
    intent: ["review", "route", "recipe"],
    visualSystem: "Still Paper",
    theme: "SP-05 Hearth & Table",
    layouts: ["xhs-photo-proof", "xhs-text-bomb", "map-block", "checklist-strip"],
    imagePolicy: "food-photo-required",
    description: "食物必须大、近、真实。文字只负责地点、价格、结论。",
    antiPatterns: ["食物图太小", "过度高级导致不馋", "无图讲美食"]
  },
  {
    id: "travel-field-journal",
    name: "旅行 Field Journal",
    platform: ["xhs", "wechat"],
    categories: ["travel"],
    intent: ["diary", "route", "guide"],
    visualSystem: "Still Paper",
    theme: "SP-01 Mist Field",
    layouts: ["lifestyle-story", "diary-scrapbook", "map-block", "essay-split"],
    imagePolicy: "landscape-photo-first",
    description: "旅行攻略和旅行随笔分开。攻略要 map，随笔要照片和情绪。",
    antiPatterns: ["没有地点信息", "照片太像图库", "路线不清"]
  },
  {
    id: "fashion-lookbook",
    name: "时尚 Lookbook",
    platform: ["xhs", "wechat"],
    categories: ["fashion", "beauty"],
    intent: ["lookbook", "review", "style"],
    visualSystem: "Still Paper",
    theme: "SP-03 Coastal Quiet",
    layouts: ["xhs-photo-proof", "image-pair-essay", "feature-strip"],
    imagePolicy: "portrait-or-product-photo",
    description: "图像比例和质感第一。像画册，但标题要更 feed-native。",
    antiPatterns: ["没有主体人物/单品", "过度信息图", "色彩杂乱"]
  },
  {
    id: "gaming-keyart",
    name: "游戏 Key Art 爆点",
    platform: ["xhs", "wechat"],
    categories: ["gaming", "movie"],
    intent: ["review", "guide", "reaction"],
    visualSystem: "Still Paper",
    theme: "SP-04 Night Grain",
    layouts: ["xhs-text-bomb", "alert-burst", "product-hero", "roundup-stack"],
    imagePolicy: "keyart-or-screenshot",
    description: "游戏和影视需要高情绪、高画面占比、大标题。不要做成普通白底知识卡。",
    antiPatterns: ["没有角色/场景图", "标题太克制", "画面不够冲击"]
  },
  {
    id: "career-framework",
    name: "职场框架清单",
    platform: ["xhs", "wechat"],
    categories: ["career", "study"],
    intent: ["framework", "method", "checklist"],
    visualSystem: "Signal Proof",
    theme: "SL-04 Acid Lime",
    layouts: ["xhs-hook-list", "three-lane-flow", "feature-matrix", "annotated-checklist"],
    imagePolicy: "image-optional",
    description: "适合职场方法、学习路径、AI 工具清单。标题必须具体，不能像课程目录。",
    antiPatterns: ["空泛说教", "无结果承诺", "PPT 感太重"]
  },
  {
    id: "relationship-note",
    name: "关系议题情绪札记",
    platform: ["xhs"],
    categories: ["love", "relationship"],
    intent: ["emotion", "story", "advice"],
    visualSystem: "Still Paper",
    theme: "SP-02 Warm Study",
    layouts: ["quote-focus", "diary-scrapbook", "xhs-text-bomb"],
    imagePolicy: "mood-photo-or-text",
    description: "关系内容需要情绪和共鸣。可以文字为主，但标题必须像人话。",
    antiPatterns: ["心理学术语堆砌", "冷冰冰的表格", "过度营销感"]
  }
];

export function listStylePacks() {
  return STYLE_PACKS;
}

export function recommendStylePacks({ platform, category, intent } = {}) {
  const score = (pack) => {
    let s = 0;
    if (platform && pack.platform.includes(platform)) s += 4;
    if (category && pack.categories.includes(category)) s += 4;
    if (intent && pack.intent.includes(intent)) s += 3;
    if (!platform && !category && !intent) s += 1;
    return s;
  };
  return STYLE_PACKS
    .map(pack => ({ ...pack, score: score(pack) }))
    .filter(pack => pack.score > 0)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
}

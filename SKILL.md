---
name: blcaptain-style-skill
description: 当用户需要把内容（文章、笔记、截图、数据、产品说明）做成中文图文卡片组图时使用——小红书 / Rednote 3:4 竖图、公众号封面、社交卡。提供三套独家视觉语言（静纸 Still Paper本手记 / Signal Proof 证据层 / Bridge Canvas 跨平台桥），由 Claude 读懂内容、自己撰写 brief.json，交给确定性引擎渲染出第一眼惊艳、一眼可辨、国内开箱即用的图文组图。
---

# BLCaptain Style Skill

把一段中文内容变成第一眼惊艳、一眼识别是「我们」、国内开箱即用的图文组图（小红书 3:4 + 公众号封面）。

何时使用：用户要做小红书 / 公众号 / 社交图文卡、读书笔记 / 旅行 / 生活随笔卡、AI 工具教程 / 数据复盘 / 职场框架卡、截图证据卡。

## 智能驱动（核心工作形态）

内容理解是 Claude 的活，不是代码的活。由你读懂内容、做出判断（提炼分页 / 选视觉语言 / 选版式 / 选金句），**亲手撰写 `brief.json`**，再交给确定性引擎渲染。代码只负责确定性的模板渲染 + 质量校验。

- 字段权威：`src/engine.mjs` 各 layout 的 render 函数（写某个 layout 前，先查它读哪些字段）。
- brief 范例：`examples/*/brief.json`（多个真实样本，含 `founder-diary` / `data-report` / `screenshot-tutorial` / `agent-parallel-research` 等，可作格式参照与回归基准）。
- `src/plan.mjs`（文章→brief 正则生成器）仅作 fallback / 起点，**不拿它做内容理解**——正则会截断半句、选错金句、跨页重复。这套智能驱动的工作形态就是为了绕开它。

## 三套视觉语言（选一套承载内容）

选语言不是挑装饰皮肤，是给这份内容认领一个立场：

- **Still Paper · 纸** — 把内容沉淀成有温度的纸本手记。生活 / 随笔 / 情感 / 旅行 / 读书。暖纸 + 宋体 + 朱砂 + 手作痕迹。常量见 `tasks/STILL-PAPER-LANGUAGE.md`。
- **实证 · Signal Proof** — 把内容校验成可信的证据（界面是证据层，读者才相信流程）。tech / AI / 数据 / 职场。奶白档案纸 + 黑体 + 电蓝 + VERIFIED 印章 + 证据方法论叙事。常量见 `tasks/SIGNAL-LANGUAGE.md`。
- **Bridge Canvas · 桥** — 把内容连接成跨平台、跨场景的统一表达。cinematic 满铺强图 + 电影黑边，多平台同源（3:4 / 1:1 / 16:9）。常量见 `tasks/VISUAL-LANGUAGE.md`（§5）。

每套都有独家影像配方（主题色三调 duotone / cinematic split-tone / 暖墨 duograde），让每张图一眼可辨、抄不走、不撞通用 stock 与他家 skill。选哪套：按内容形态判断，或用 `--system auto`。

## 五动作出图法

读懂 → 定调 → 分页 → 落版 → 成图。这是一条顺下来的创作主线，不是填格子。每个动作都由 Claude 亲自经手，一环扣一环。

### 一 · 读懂

自主读懂内容、做出判断（不靠正则路由理解）：读出核心主张、关键点、可上图的视觉碎片。同时摸清会影响输出的缺口——平台与比例、内容类别与意图、用户手里已有的照片 / 截图及用途、必留硬约束（标题必留、截图必须可读、不显示来源标签等）。信息已够就不多问。

### 二 · 定调

按内容形态选定承载它的视觉语言与主题：

- 生活 / 随笔 / 情感 / 旅行 / 读书 → **Still Paper · 纸**：把内容沉淀成纸本手记。
- tech / AI / 数据 / 职场 → **实证 · Signal Proof**：把内容校验成可信证据。
- 跨平台 / 跨场景统一表达 → **Bridge Canvas · 桥**：把一份内容连接成多平台同源。

也可用 `--system auto` 自动定调，再选一个主题（主题清单见各语言常量文件）。实证的证据壳（VERIFIED 印章 / 证据卡）只配实测或有据的内容；纯思辨观点改走纸，不套证据壳。

### 三 · 分页

把读懂的内容收束成一组图的骨架：核心主张 → 关键点 → 可上图的碎片。据此决定张数（随内容长度）、给每页一个唯一任务、挑真金句（不要过渡句）、金句不跨页重复、相邻页不落同一骨架。

### 四 · 落版

为每页定版式、备好图。

- **影像优先**：内容能配图，就让图当第一眼主角（图先说话，字做导读 / 证据）；影像主导的封面**默认套独家 duotone 调色签名**（Still Paper `grade:"duo"` 暖墨 / Signal sl-duo 电蓝 / Bridge teal-gold split-tone），把一张真实图变成「只有我们能出的影像」——这是我们区别于通用 stock 配图的命门。免图（statement / 纯文字 / 示意图）是 **deliberate 选择**（内容本身是观点 / 路线，或用户确实没图），不是图省事的默认。
- **版式**：封面母体（Still Paper R01–R08）+ 正文骨架（essay / list / ledger / matrix / flow / compare / quote / map 路线图 …）+ 三轴变体（构图重心 / 纸色 / 视觉装置轮换）。相邻页不落同一骨架。配方见 `STILL-PAPER-LANGUAGE.md`（§C 变体 / §D 封面母体）与 `SIGNAL-LANGUAGE.md`。
- **图从哪来**（内容要图时一次问清，就近取一条）：① 用户自带照片 / 截图——最不 AI 感，强烈首选；② AI 生成写实摄影风格的纯素材——只生素材、不生整卡；③ 公开 CC0 图源——国内源前置（cc0cn / 泼辣有图 / hippopx / 别样网 → unsplash / pexels …）。外部图一律落真实 `assets/SOURCES.md`（无声明标 UNVERIFIED、不冒充本地路径）。满铺压图先想清主体地图，别压人脸、产品 logo、食物主体或关键 UI 文本。详见 `references/image-source-workflow.md`。

### 五 · 成图

按选定语言 / 版式，**亲手撰写 `brief.json`**（每个 card 的 `layout` + 字段；字段权威见 `src/engine.mjs`，范例见 `examples/*/brief.json`），交确定性引擎渲染：

```bash
node bin/blcaptain-style.mjs build <brief.json> --out <deck>
# 封面 imageRequest 无图会 throw → 先取图回填再 build：
node bin/blcaptain-style.mjs image-fetch <urls.json> --out <deck>/assets --brief <brief.json>
node bin/blcaptain-style.mjs render <deck>
```

多平台同源：把 `brief.meta.format` 换成 `square` / `wide`，同一份内容出 1:1 / 16:9 同源族。每个 `.poster` 单独渲染，不整页截图。

### 把关：过闸 + 人工眼 + 回炉

跑 `npm run check` 与 `npm run test:gates`（结构 / 渲染护栏），自查布局没崩——文字不溢出 / 不碰撞 / 留白不塌空 / 360px 缩略图可读。但记住：**技术 PASS 不等于视觉 PASS**——机器只证明结构没坏，审美由人工确认。把成图交用户做人工视觉 UAT（最终闸门），再按反馈回炉迭代文案 / 裁切 / 版式 / 主题 / 图。机器测量，审美靠人；先出图，再迭代。

## 铁律 / Non-Negotiables（红线 · 负面边界＝专家经验）

- **守住版面**：始终落在认领好的封面母体与正文骨架里成版；不自由发散、不堆无意义装饰制造复杂感。
- **非复制**：只学机制方法，不抄任何项目的设计 / CSS / 配色 / 字体组合 / 资产 / 布局 ID / 成品构图 / 文案 / 视觉身份。做出来像任何现成模板卡，就是没守住自己的视觉身份，视觉不合格。
- **图不毁**：不拉伸截图、不让截图小到不可读；不让标题 / 正文 / 页脚互相碰撞；不让文字压住人物脸、产品 logo、食物主体或关键 UI 文本。
- **诚实**：不编造品牌 / 作者 / 时间 / 地点 / 来源；外部图必记真实 `SOURCES.md`；卡面中性化（不印内部代号 / demo 假信息，`--brand` 才署名）。
- **日期**：一律用当前日期、不硬编码年份；时间戳只到日期。
- **反 AI 感**：无紫蓝橙粉渐变 / 不居中对称 / 不全圆角浮卡 / 不 emoji / 留手作痕迹 / 用文化来源色。
- **第一眼冲击**：每页须有一处 ≥ 3:1 的 hero 尺度反差（主标 / 巨数进 ≥ 80px 巨字带），其余退安静层；不要全页 ≤ 2:1 的温和层级（= 规整内文、第一眼平）。标题关键词可用 `**强调**` 朱砂点睛。
- **留白是层级信号**：静纸留白 ≥ 40%，不为「专业」收紧（收紧反显密、显廉价）。
- **配色纪律**：单一强调色只占 ~5%、不多色打架；不用纯白纯黑（用暖白 / 近黑）；主题色是系统合同、不让用户任意输 hex。
- **影像独家**：能配图就让图当第一眼主角；影像主导封面套独家 duotone / haze（按题材选：厚重 / 需统一杂色 → 上，明亮清新 → 守本色），别默认走「干净配图」。
- **默认即高级**：默认 / 无 layout 走三套语言，绝不掉回遗留通用版式。
- **节奏**：长组图相邻 ≤ 2 页同骨架；每页一个唯一任务。
- **AI 图只兜底**：优先用户图 / 截图 / CC0 公开源；AI 生图带风格约束、只生素材不生整卡。
- **能力边界**：不接追星粉丝向 / 纯促销硬广 / > 12 屏长教程——开头就劝用户换工具（什么都能做的 Skill 通常什么都做不好）。
- **技术 PASS 不等于视觉 PASS。**

## 适合 / 不适合

适合：读书笔记 / 旅行 / 生活随笔 / 情感叙事卡、AI 工具教程 / Agent 流程、截图证据卡、数据复盘、工具对比、职场学习框架、公众号封面、小红书竖版知识卡。

不适合：纯修图 / 磨皮 / 换脸 / 照片精修、没有结构目标的氛围图、只靠大段正文堆满画布、无来源记录的图片搬运、复制其他项目的设计 / 模板 / CSS / 资产 / 配色 / 布局。

## references（按需加载）

- 视觉语言常量：`tasks/STILL-PAPER-LANGUAGE.md` · `tasks/SIGNAL-LANGUAGE.md` · `tasks/VISUAL-LANGUAGE.md`
- brief 字段权威与范例：`src/engine.mjs` · `examples/*/brief.json`
- 内容规划 / 压缩阶梯：`references/content-planning.md`（分页动作：长内容→骨架、字数→张数、各品类密度）
- 图源工作流：`references/image-source-workflow.md`
- 对标知识库：`references/benchmarks/`（含「学什么 / 怎么超越」）
- 最佳实践 / 非复制：`references/best-practices.md` · `references/non-copying-guidelines.md`
- 身份自检 / 反 AI：`references/identity-tests.md`（每张出图后逐条过，三套语言各自 Identity Test）

# 语言字体视觉校准

## 定位

本文件补齐 Phase 0.5 的一个关键缺口：视觉方向稿不能只证明中文卡成立，还必须证明中英混排和全英文卡也成立。

这不是普通字体选择，也不是把英文放进 label。英文必须参与视觉气质：标题节奏、边注密度、数字形态、截图证据、图片留白和底纹都要一起工作。

## 最高规则

```text
中文主导、中英混排、全英文三种模式都要看图。
没有进入真实场景成图，不进入单张精修。
字体不能只靠系统 fallback 看起来“能用”。
英文不能压过中文，也不能像临时补丁。
全英文卡不能变成普通英文模板。
```

## 三种语言模式

### LANG-CN 中文主导

用途：

- 中文内容分享
- 小红书图文
- 公众号封面
- 中文教程和复盘

验收重点：

- 中文标题有气质，不只是大号黑体。
- 英文只作为期数、地点、工具名、证据 ID 或节奏标记。
- 中文行距、字重和留白要服务图片和底纹。

### LANG-MIX 中英混排

用途：

- AI 工具文章
- 创作者工作流
- 产品教程
- 中英文标题共存的内容卡

验收重点：

- 英文必须有独立字体角色。
- 中文和英文的基线、大小、字重、间距要有设计关系。
- 不允许中文字体吞掉英文，也不允许英文字体让中文显得廉价。

### LANG-EN 全英文

用途：

- 开源 README hero
- GitHub / Product Hunt / X 预热图
- 英文教程、工具说明、方法论卡
- 国际用户可读的 showcase

验收重点：

- 仍然能一眼看出 Still Paper 或 Signal Proof。
- 不变成普通英文 SaaS banner。
- 不使用过度时尚、过度科技、过度杂志化的单一套路。
- 英文标题要有节奏感，但不能牺牲可读性。

## Still Paper 语言审美

Still Paper 的英文不是 UI 标签，而是刊物语言。

关键词：

```text
field note
quiet editorial
caption rhythm
paper margin
place / date / issue
```

推荐方向：

- 中文标题：宋 / 明结构，安静但有骨架。
- 英文标题：有文学感的 serif 或 humanist sans，不能像默认网页标题。
- 英文边注：克制、细密、有期刊感。
- 全英文：更像独立小刊物封面，不像营销落地页。

禁用方向：

- 泛米色高级模板。
- Didot 式假奢侈大标题。
- 手写咖啡馆风。
- 过多大写英文装饰。
- 用斜体代替真正的层级设计。

候选字体气质：

```text
生产候选：Source Serif 4 / Newsreader / Source Han Serif / Noto Serif CJK / Songti SC
本机视觉预览：Songti SC / Baskerville / Georgia / Helvetica Neue
```

## Signal Proof 语言审美

Signal Proof 的英文不是装饰，而是证据系统的一部分。

关键词：

```text
proof id
trace label
instrument text
system note
decision marker
```

推荐方向：

- 中文标题：判断先行，字重中等，边缘清楚。
- 英文标题：像研究报告、系统界面、证据面板，不像科技海报。
- 英文标签：proof、trace、source、version、timestamp 要形成系统感。
- 全英文：更像可信工具评测卡或系统观察报告，不像普通 dashboard。

禁用方向：

- 泛蓝白 SaaS。
- 霓虹赛博朋克。
- 假代码海报。
- 大面积全粗英文。
- mono 字体写正文。

候选字体气质：

```text
生产候选：IBM Plex Sans / IBM Plex Mono / Inter / Source Han Sans / Noto Sans CJK
本机视觉预览：Avenir Next / Helvetica Neue / Menlo / SF Mono
```

## 字体来源和授权原则

- 优先使用开源或系统安全字体。
- 不在未核实授权前把字体文件打包进仓库。
- 本机预览字体可以用于方向判断，但不能等同于发布字体。
- 若目标字体未命中，样张只能标为 `WARN_ENGINEERING_PREVIEW`。

参考源：

```text
Noto CJK: https://github.com/notofonts/noto-cjk
Source Serif: https://github.com/adobe-fonts/source-serif
Newsreader: https://github.com/productiontype/Newsreader
IBM Plex: https://github.com/IBM/plex
Inter: https://github.com/rsms/inter
```

## Phase 0.5 历史交付物

```text
local-tests/style-calibration-reset/output/style-calibration-language-typography-01.png
```

这张 contact sheet 只保留为失败方法证据，不能再作为语言方向确认入口。语言字体必须放进真实场景成图里验证，至少覆盖：

```text
Still Paper / 中文主导
Still Paper / 中英混排
Still Paper / 全英文
Signal Proof / 中文主导
Signal Proof / 中英混排
Signal Proof / 全英文
```

## 人工确认问题

用户不需要先调字号和坐标，只需要回答：

```text
1. 这张真实成图里的语言气质是否有希望？
2. 哪个语言模式不对？
3. 英文是否已经有独立审美，而不是 fallback？
4. 全英文是否还能看出我们的两套视觉系统？
5. 哪个可以进入单张精修？
```

## 进入下一步条件

进入单张精修前必须至少确认：

```text
一个视觉主题
一个语言模式
一个标题气质
一个图片 / 截图角色
一个字体方向
```

否则继续停留在 Phase 0.5，不进入 engine binding。

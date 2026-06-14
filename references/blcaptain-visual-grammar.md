# BLCaptain 视觉语法合同

## 结论

不能只靠 JSON。

JSON 负责把风格、主题、版式、字号、间距、图片角色和失败条件变成机器可读合同；真正稳定的视觉效果还需要：

```text
1. 视觉语法文档：人读，定义审美和取舍。
2. JSON 合同：机器读，限制主题、版式、范围和失败条件。
3. Seed template：HTML / CSS 落地，不从空白页自由发挥。
4. 真实场景样张：每个 recipe 至少一张人工通过的 PNG。
5. Validator：只拦结构错误，不替代人工审美判断。
```

可学习的是这套产品化方法：两套视觉系统、固定画幅、固定主题、固定版式 recipe、种子模板、图片规则、截图规则、validator、先 PNG 后迭代。不能复制它的设计、代码、模板、CSS、配色、资产、布局 ID、视觉身份或文案。

## 方法拆解

从优秀开源社交卡片项目的 README 和公开 Skill 文档可反推出稳定性来源：

| 层级 | 它解决什么 | BLCaptain 怎么做 |
|---|---|---|
| 能力边界 | 不是什么都做 | 只保留 Still Paper / Signal Proof；Bridge Canvas 只做系统展示层 |
| 主题预设 | 不让 Agent 任意配色 | Still Paper 5 套，Signal Proof 4 套；不自定义 hex |
| Layout recipe | 一个风格里能有多种版式 | 每套系统先固化 4 个真实场景 recipe，再扩 Core 8 |
| Seed template | 不从空白 HTML 拼样式 | 每个通过的 recipe 才能反推 seed，不先写通用引擎 |
| 文案压缩 | 不把文章塞进图 | 每张只保留一个判断、一个证据、一个情绪或行动 |
| 图片规则 | 图片不是装饰 | 声明 image role、subject map、safe text zone、source role |
| Validator | 技术护栏 | 查溢出、密度、截图可读、来源、主体避让、合同区 |
| 人工确认 | 审美最终闸门 | 用户只看真实 PNG：有希望 / 不对 / 值得继续 / 淘汰 |

## 视觉方向稿反推

视觉方向参考不能当生产图裁切，但能反推语法：

- Still Paper 真实单卡：大标题、细 meta、湖边人物、照片大图、低声 footer、纸面留白成立。
- Signal Proof 真实单卡：大判断标题、证据截图 / 数据区、来源条、验证章、蓝色锚点、底部 ledger 成立。
- 系统级参考：适合反推语法，不适合直接作为用户确认入口。


## Still Paper 语法

Still Paper 不是“米色模板”，而是纸面、摄影、留白和短句判断共同工作。

### 构图

- 画幅优先：小红书 1080×1440。
- 外边距：56–76px。
- 纸面主区：不嵌套卡片，不做多层容器。
- 图片区：35%–58% 画布高度；照片是情绪或证据，不是装饰。
- 页脚：底部 36–64px，低声存在，不制造新重点。

### 标题

- 中文标题建议 8–22 字，最多 3 行。
- 大标题不允许断成“一行三四个字”的碎片，除非是明确的诗性节奏。
- 中英混排时，英文作为刊物节奏、地名、issue、单词重音，不能像 fallback。
- 全英文标题必须仍像 Still Paper 小刊物，不像 SaaS banner。

### 字体

- 中文标题：宋 / 明结构，有骨架但不假奢侈。
- 英文标题：serif / humanist，允许少量 italic 做一个词的重音。
- 正文：安静 sans，保持阅读性。
- Meta：小号大写英文或中英混排，正 tracking，但不抢正文。

### 配图

- 优先真实摄影、自然光、低饱和、安静主体。
- 图片铺满或大图时必须先做 subject map。
- 人脸、人物背影、湖面、产品主体不能被标题压住。
- 不用方向稿裁切图当生产 hero。

### 失败信号

- 看起来像泛米色 Canva 模板。
- 标题很大但没有判断。
- 英文字体像系统 fallback。
- 照片只是背景，和文字没有关系。
- 页脚和 meta 过多，画面变成说明书。

## Signal Proof 语法

Signal Proof 不是“蓝白科技卡”，而是证据、截图、数据和判断的可信界面。

### 构图

- 画幅优先：小红书 1080×1440；截图教程和数据卡同样做 3:4，不做竖长条。
- 外边距：52–72px。
- 证据区：截图 / 数据 / 对比表必须占 42%–68% 画布高度。
- 说明文字围绕证据服务，不能堆模块。
- Callout 最多 2 个。

### 标题

- 标题是判断，不是说明书标题。
- 中文标题建议 8–20 字，最多 3 行。
- 英文用于 proof、trace、source、verified、workflow、version、timestamp。
- 工具名和英文术语必须有 Latin-first 字体角色。

### 字体

- 中文标题：清晰、克制、中等字重。
- 英文：system / research / ledger 感，不用霓虹科技和假代码风。
- 数字：tabular、可比对，必须有单位、时间或基准。
- Mono：只用于短命令、日志、版本，不写假代码。

### 组件

- Evidence frame：真实截图或真实 UI 证据。
- Metric block：一个主数字 + 时间范围 + 基准。
- Verification strip：来源、时间、上下文或 verified 标记。
- Compare grid：少量维度，不做密集表格。
- Workflow trace：3–5 步，步骤之间有明确因果。

### 失败信号

- 截图太小，像装饰。
- 数据没有来源或时间。
- 所有模块平均用力，没有主证据。
- 蓝色 / 绿色只是换色，不改变信息结构。
- 像企业 PPT 或 dashboard dump。

## 版式 recipe 起步

先只固化 8 个真实场景 recipe，不一次铺满 28 个。

| ID | 系统 | 名称 | 用途 |
|---|---|---|---|
| SP-R01 | Still Paper | Field Photo Cover | 照片主导的日记 / 旅行 / 预热封面 |
| SP-R02 | Still Paper | Image Journal Split | 左文右图或上文下图的叙事卡 |
| SP-R03 | Still Paper | Quote Field | 一句判断 + 小来源 + 大留白 |
| SP-R04 | Still Paper | Essay Marginalia | 2–3 段短文 + 边注 / 时间线 |
| SL-R01 | Signal Proof | Screenshot Proof | 截图证据 + 1–2 个 callout |
| SL-R02 | Signal Proof | Metric Insight | 主数据 + 来源条 + 解释 |
| SL-R03 | Signal Proof | Comparison Ledger | 对比表 + verdict |
| SL-R04 | Signal Proof | Workflow Trace | 3–5 步流程 + 状态证据 |

每个 recipe 必须先有：

```text
真实 brief
真实图片 / 截图 / 数据
IMAGE_REQUESTS.md
SOURCES.md
真实 PNG
人工状态
```

通过后才允许反推 seed template 或 engine binding。

## 首张真实场景

下一步不做 gallery，不做多图矩阵。

首张必须先做 Still Paper · Mist Field，因为用户已经明确指出 `references/visual-direction-boards/01.png` 是当前要优先做好的源头方向稿。它先验证纸感、摄影、中文标题、英文 meta、留白、页脚和主体避让是否成立；通过前不得跳到其它视觉系统或扩展 recipe。

```text
SP-MF-R01-PROOF
平台：小红书
画幅：1080×1440
系统：Still Paper
主题：SP-01 Mist Field
Recipe：SP-MF-R01 Field Photo Cover
源头：references/visual-direction-boards/01.png
任务：安静山野 / 湖边人物 / 专注力预热封面
一句判断：在湖边，找回呼吸的节奏。
主图：项目内已有湖边女孩图，或后续替换为纯净写实摄影资产
验证重点：纸感、照片比例、标题节奏、英文 meta、低声 footer、主体避让
用户反馈：有希望 / 不对 / 值得继续 / 淘汰
```

这个场景适合作为第一张，因为它能同时验证：

- Still Paper 是否不是泛米色模板。
- `01.png` 的纸感、摄影和安静判断是否能落到真实 3:4 成图。
- 中文标题是否能保持完整节奏，不再断成碎片。
- 英文 meta 是否有刊物系统感。
- 大图和人物主体是否能被尊重，不被文字或遮罩破坏。
- 这张卡是否能让用户看到“我们走在正确道路上”。

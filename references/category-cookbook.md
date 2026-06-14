# 内容路由手册

本文件用于把用户内容路由到 Still Paper 或 Signal Proof。当前仍处于 `SP-C01 · Still Paper · Mist Field` 硬闸门；`manual:review` 仍有 `PENDING_USER_REVIEW`，所以不得进入 SL-C02。

技术 PASS 不等于视觉 PASS。任何路由建议都不能绕过人工视觉确认。

## 路由维度

不要只按内容分类选模板。必须同时判断：

```text
平台 × 内容类别 × 内容意图 × 图片可用性 × 证据需求
```

然后选择：

```text
视觉系统 -> 主题 -> 布局 -> 资产策略 -> gate
```

## 平台

```text
xhs
wechat
both
```

## 内容类别

```text
ai
tools
product
auto
data
travel
food
home
reading
creator
career
study
relationship
film
gaming
fitness
beauty
fashion
```

## 内容意图

```text
story
essay
proof
tutorial
comparison
review
recap
campaign
decision
checklist
quote
route
```

## 图片状态

```text
user-photo
user-screenshot
official-image
no-image
image-needed
```

无图时使用 A/B/C 一次询问，并生成或维护：

```text
IMAGE_REQUESTS.md
SOURCES.md
```

## 当前硬闸门

现在只允许把新判断落回 SP-C01 相关对象，不能启动新布局实现：

```text
SP-C01 Clean Hero
SP-C01 · Still Paper · Mist Field
PENDING_USER_REVIEW
```

`SL-C02 Screenshot Proof` 只作为后续目标记录。SP-C01 通过前不得进入 SL-C02。

## 路由表

### AI 工具 / Agent 工作流

适用：

```text
category = ai / tools
intent = tutorial / proof / workflow
image = user-screenshot / no-image
```

推荐方向：

- 系统：Signal Proof
- 主题：SL-02 Graphite Mint 或 SL-01 Electric Blue
- 后续布局：SL-C02 Screenshot Proof / SL-C04 Workflow Trace / SL-C01 Proof Statement
- 资产：真实截图优先；无截图时只能生成 mock，并明确标注

硬规则：

- 截图必须可读。
- 最多 2 个 callout。
- 不能用假机器人图冒充教程证据。
- 当前不得进入 SL-C02。

### 产品对比 / 工具评测

适用：

```text
category = tools / product
intent = comparison / review / decision
```

推荐方向：

- 系统：Signal Proof
- 主题：SL-01 Electric Blue / SL-02 Graphite Mint / SL-04 Acid Lime
- 后续布局：SL-C03 Comparison Ledger / SL-C01 Proof Statement
- 资产：产品截图、logo、真实界面或结构图

硬规则：

- 必须有结论。
- 不列功能清单冒充评测。
- 证据源必须记录。

### 数据复盘 / KPI / 年度总结

适用：

```text
category = data
intent = recap / report / kpi
```

推荐方向：

- 系统：Signal Proof
- 主题：SL-03 Safety Coral 或 SL-02 Graphite Mint
- 后续布局：SL-C01 Proof Statement / SL-C03 Comparison Ledger
- 资产：图表、数据源、截图或报告出处

硬规则：

- 一个主数字。
- 一个判断。
- 来源行必需。

### 旅行 / 生活方式 / 叙事

适用：

```text
category = travel / home / lifestyle
intent = story / route / essay
```

推荐方向：

- 系统：Still Paper
- 主题：SP-01 Mist Field / SP-03 Coastal Quiet / SP-02 Warm Study
- 当前优先：SP-C01 Clean Hero
- 资产：用户照片优先；否则按公开图源顺序或 AI 纯图片

硬规则：

- 没有强图，不做旅行叙事。
- 必须有 `object-position`。
- 满铺图必须声明 `subject map`、`safe text zone`、`avoid zone`。

### 食物 / 咖啡 / 家居桌面

适用：

```text
category = food / home
intent = review / story / recipe
```

推荐方向：

- 系统：Still Paper
- 主题：SP-05 Hearth & Table / SP-02 Warm Study
- 后续布局：SP-C03 Image-Led Note / SP-C02 Essay Split
- 资产：真实食物图优先；AI 图只能做纯图片资产

硬规则：

- 食物必须大、近、真实。
- 不用抽象食物插画做测评证据。
- 来源必须记录。

### 阅读笔记 / 创作者日记

适用：

```text
category = reading / creator
intent = diary / essay / quote
```

推荐方向：

- 系统：Still Paper
- 主题：SP-02 Warm Study / SP-01 Mist Field
- 后续布局：SP-C02 Essay Split / SP-C04 Quote Field
- 资产：书桌、笔记、纸张、咖啡、物件图

硬规则：

- 不把日记做成课程大纲。
- 不堆金句。
- Still Paper 必须有安静区域。

### 影视 / 游戏 / 夜间内容

适用：

```text
category = film / gaming
intent = review / reaction / guide
```

推荐方向：

- 系统：Still Paper 为情绪叙事，Signal Proof 为结构化攻略
- 主题：SP-04 Night Grain；需要证据时用 Signal Proof 主主题
- 资产：官方图、用户图、可用公开图源

硬规则：

- 不声称未验证版权许可。
- 不把候选 `SL-05 Signal Noir` 当可实现主题。
- 来源必须记录。

### 汽车 / 硬件 / Campaign

适用：

```text
category = auto / product
intent = campaign / review / launch
```

推荐方向：

- 情绪 Campaign：Still Paper
- 结构评测：Signal Proof
- 主题：SP-04 Night Grain / SP-02 Warm Study / SL-01 Electric Blue / SL-03 Safety Coral
- 资产：官方图或用户图优先

硬规则：

- 产品必须占主导。
- 不把产品缩成小缩略图。
- 参数不能淹没画面。

### 职场 / 学习 / 方法

适用：

```text
category = career / study
intent = checklist / framework / decision
```

推荐方向：

- 系统：Signal Proof
- 主题：SL-04 Acid Lime / SL-01 Electric Blue
- 后续布局：SL-C04 Workflow Trace / SL-C03 Comparison Ledger
- 资产：截图、流程图或清单结构

硬规则：

- 避免空泛鸡血。
- 必须给动作或判断标准。

### 关系 / 情绪札记

适用：

```text
category = relationship
intent = emotion / story / quote
```

推荐方向：

- 系统：Still Paper
- 主题：SP-02 Warm Study / SP-03 Coastal Quiet
- 后续布局：SP-C04 Quote Field / SP-C02 Essay Split
- 资产：非识别性情绪图或纸感背景

硬规则：

- 不做临床表格口吻。
- 不做操纵性标题。

## 能力边界

强项：

- AI 工具与工作流
- 截图教程
- 数据复盘
- 阅读笔记
- 长文拆卡

依赖图片质量：

- 食物
- 旅行
- 时尚
- 美妆
- 健身
- 汽车 / 硬件
- 影视 / 游戏

不要过度承诺：

- 真实 OOTD 摄影
- 真实皮肤 / 妆效证明
- 精确复刻产品图
- 版权角色图
- 未授权复杂地图瓦片

## 示例

用户说“把这篇 AI Agent 长文做成小红书 5 张”：

- 若是教程 / 证明：Signal Proof。
- 若是观点 / 叙事：Still Paper。
- 当前不能直接做 SL-C02，只能记录为后续。

用户说“旅行随笔”：

- Still Paper。
- 优先 SP-01 Mist Field 或 SP-03 Coastal Quiet。
- 没有强图先走 A/B/C 图源流程。

用户说“年度数据复盘”：

- Signal Proof。
- 优先 SL-03 Safety Coral。
- 必须有数据源和主结论。

## 结束检查

路由完成后必须确认：

```text
manual:review
release:ready
```

如果人工视觉仍是 `PENDING_USER_REVIEW`，不得进入下一阶段。

# 布局配方

本文件定义布局选择规则。当前开发阶段已切到 `Phase 0.5 — 视觉校准重启`。

旧 `SP-C01 · Still Paper · Mist Field` 仍作为发布阻塞记录保留，状态从历史 `PENDING_USER_REVIEW` 转为本轮 `FAIL_VISUAL` 证据。技术 PASS 不等于视觉 PASS。`manual:review` 未通过前，不得进入 SL-C02、Core 4、Core 8 或发布。`release:ready` 是发布就绪判断。

## 命名

```text
SP = Still Paper
SL = Signal Proof
C = Core layout
E = Extension layout
```

当前主视觉只有：

```text
Still Paper
Signal Proof
```

## 当前顺序

```text
Phase 0.5 视觉校准重启
-> 选择一个真实使用场景
-> 准备真实内容 / 图片 / 截图 / 数据
-> 输出一张真实比例 PNG
-> 用户判断“有希望 / 不对 / 值得继续 / 淘汰”
-> 单张精修
-> 人工视觉通过
-> SP-C01 Clean Hero 或对应首个生产 layout
-> SL-C02 Screenshot Proof
-> Core 4
-> Validator R1-R9
-> Core 8
-> 场景包
```

当前只允许围绕一张被用户确认有希望的真实场景成图继续；不新增生产布局，不推进 engine binding。

## Core 4

Core 4 只在 SP-C01 人工通过后逐一推进：

```text
SP-C01 Clean Hero
SP-C02 Essay Split
SL-C01 Proof Statement
SL-C02 Screenshot Proof
```

每个布局必须有：

```text
合同
样张
IMAGE_REQUESTS.md
SOURCES.md
机器 gate
人工视觉状态
报告
```

## SP-C01 Clean Hero

用途：

- Still Paper 开场封面。
- 旅行 / 生活方式 / 日记 lead。
- 公众号安静长文封面。
- 当前 `SP-C01 · Still Paper · Mist Field` 硬闸门。

结构：

- 顶部 metadata。
- 控制行长的大标题。
- 短 lead。
- 主图。
- 底注和页脚。

内容上限：

- 标题：8-16 个中文字符，最多 2 行。
- lead：不超过 32 个中文字符。
- footer：最多 2 组信息。

图片：

- 必须有图。
- 不能使用视觉方向稿裁切图。
- 必须有 `IMAGE_REQUESTS.md` 和 `SOURCES.md`。
- 必须有 `object-position`。

失败：

- 图片像占位图。
- 标题裁切或断行尴尬。
- 页脚碰撞。
- 图片主体被文字压住。

## SP-C02 Essay Split

用途：

- 一个观点 + 一张图。
- 短文片段。
- 创作者反思。

内容上限：

- 标题：最多 18 个中文字符。
- 正文：最多 70 个中文字符。
- 引语：最多 24 个中文字符。

图片：

- 必须有图。
- 不能被挤成细条。
- 来源必须记录。

## SL-C01 Proof Statement

用途：

- 结构化观点。
- 方法论 lead。
- 工具 / 产品判断。

内容上限：

- 标题：最多 14 个中文字符。
- lead：最多 40 个中文字符。
- proof modules：最多 3 个。

失败：

- 像企业 PPT。
- 证据弱。
- 模块同权太多。

## SL-C02 Screenshot Proof

用途：

- 截图教程。
- 产品 walkthrough。
- UI 证据卡。

当前状态：

```text
不得进入 SL-C02
```

只有 SP-C01 人工通过后才能启动。

内容上限：

- 标题：最多 16 个中文字符。
- lead：最多 36 个中文字符。
- callout：最多 2 个。

图片：

- 必须是真实截图或明确标注的 mock。
- 截图必须可读。
- 50-70% 画面给截图。
- 需要 `.frame-shot`，必要时使用 `.device-browser` 或 `.device-phone`。
- 必须有来源、时间或上下文线索。

失败：

- 截图太小。
- 截图做成背景装饰。
- 假 dashboard。
- callout 太多。

## Core 8

Core 8 只在 Core 4 通过后扩展：

```text
SP-C03 Image-Led Note
SP-C04 Quote Field
SL-C03 Comparison Ledger
SL-C04 Workflow Trace
```

### SP-C03 Image-Led Note

- 图片占主导。
- 满铺图必须有 `subject map`、`safe text zone`、`avoid zone`、`object-position`。
- 适合食物、旅行、生活方式、物件。

### SP-C04 Quote Field

- 适合 quote、阅读笔记、关系议题。
- 文字必须有真实判断，不能假文学。
- 可用安静图或纸感底纹。

### SL-C03 Comparison Ledger

- 适合工具、产品、选项对比。
- 必须有标准和结论。
- 表格必须缩略图可读。

### SL-C04 Workflow Trace

- 适合流程、方法、Agent 工作流。
- 3-6 步。
- 可以配截图或结构图。

## Extension

Extension 不提前实现，只作为后续池：

```text
SP-E01 Reading Note
SP-E02 Creator Diary
SP-E03 Travel Journal
SP-E04 Object Study
SP-E05 Moodboard Story
SL-E01 KPI Insight
SL-E02 Data Recap
SL-E03 Feature Matrix
SL-E04 Decision Path
SL-E05 Summary Proof
```

## 场景包

场景包不是固定布局数量承诺，只是把 Core / Extension 组合成工作流：

- WeChat Cover Pair
- XHS Carousel Cover
- Screenshot Tutorial Pack
- Tool Review Pack
- Data Report Pack
- Travel / Lifestyle Pack
- Product Campaign Pack
- Food / Cafe Pack
- Film / Game Pack

## 选择规则

先看任务，不看布局数量：

| 任务 | 优先布局 |
|---|---|
| 用气氛停住用户 | SP-C01 / SP-C03 |
| 解释一个短观点 | SP-C02 |
| 引语 / 反思 | SP-C04 |
| 截图证明 | SL-C02 |
| 结构化主张 | SL-C01 |
| 对比工具 / 选项 | SL-C03 |
| 解释工作流 | SL-C04 |
| KPI / 数据复盘 | SL-C01 / SL-C03 |

如果对应布局尚未过人工闸门，只记录为候选，不进入实现。

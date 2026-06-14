# Signal Proof Theme Contracts

## Purpose

Signal Proof is the system for proof, evidence, screenshots, data, workflows, and structured reasoning.

It must not collapse into one generic blue-white tech template.

## Theme list

Approved main themes:

```text
SL-01 Electric Blue
SL-02 Graphite Mint
SL-03 Safety Coral
SL-04 Acid Lime
```

Candidate theme:

```text
SL-05 Signal Noir
```

System display layer:

```text
BC-01 Bridge Canvas
```

## SL-01 Electric Blue

Use for:

```text
AI 工具 / 产品教程 / 方法论 / 快速入门 / 流程解释
```

Visual anchors:

```text
clear white surface, electric blue anchor, numbered steps, simple workflow blocks
```

Palette:

```text
bg       #F6F7FA
surface  #FFFFFF
fg       #15181D
muted    #6C7580
accent   #2F5EA7
line     #DCE3EE
grid     #E7EDF5
```

Avoid:

```text
generic blue-white SaaS template, icon clutter, abstract AI robot
```

## SL-02 Graphite Mint

Use for:

```text
截图教程 / 产品 walkthrough / 界面证据 / 工作流证明 / Agent 操作记录
```

Visual anchors:

```text
browser frame, proof note, graphite/mint accent, screenshot as evidence
```

Palette:

```text
bg       #F6F5F1
surface  #FFFFFF
fg       #171A1D
muted    #6D7680
accent   #4A7A74
line     #DCE3E1
grid     #E5ECEA
```

Avoid:

```text
fake dashboard, screenshot wallpaper, unreadable micro screenshot
```

## SL-03 Safety Coral

Use for:

```text
KPI / 数据复盘 / 年度总结 / 增长复盘 / 内容表现
```

Visual anchors:

```text
hero metric, warm coral accent, data grid, conclusion-led recap
```

Palette:

```text
bg       #F7F4F0
surface  #FFFFFF
fg       #171515
muted    #746B67
accent   #E56A4B
line     #E5D9D4
grid     #EFE5E1
```

Avoid:

```text
dashboard dump, fake data, too many equal metrics, red-alert visual
```

## SL-04 Acid Lime

Use for:

```text
工具对比 / checklist / 决策树 / 选择框架 / 购买建议
```

Visual anchors:

```text
sharp checklist, compare table, verdict block, acid lime accent
```

Palette:

```text
bg       #F5F7EF
surface  #FFFFFF
fg       #151715
muted    #6E7369
accent   #A6C833
line     #DDE5CC
grid     #E7ECD8
```

Avoid:

```text
neon chaos, overuse of lime, no verdict, too dense
```

## SL-05 Signal Noir

Status:

```text
candidate-needs-visual-direction-board
```

Use for:

```text
模型评测 / Benchmark / 系统架构 / 故障复盘 / 安全分析 / 代码 Agent 工作流 / 日志分析
```

Visual anchors:

```text
dark ledger, carbon paper, technical evidence, code/log panels, muted gold accent
```

Palette candidate:

```text
bg       #0E1012
surface  #171A1F
fg       #F3F0E8
muted    #A6A19A
accent   #C8A45D
accent2  #4F7568
line     #2C3036
grid     #24282E
danger   #C46A5A
```

Avoid:

```text
neon cyberpunk, game poster, huge glow, unreadable gray text, fake logs
```

Entry requirement:

```text
Do not implement SL-05 until a visual direction board is generated, reviewed, and added to visual-direction-map.json.
```

## BC-01 Bridge Canvas

Bridge Canvas is not a normal Signal Proof theme.

Use for:

```text
README hero / product overview / platform coverage / design-system explanation
```

Avoid:

```text
ordinary content card use
```

## Hard rule

Every Signal Proof output must declare:

```text
system
theme
board
layout
proof role
source role
```

Do not render generic Signal Proof without a theme contract.

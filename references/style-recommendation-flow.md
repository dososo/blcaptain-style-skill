# 风格推荐流程

本层必须在布局选择之前执行。它只负责把用户任务路由到当前批准的视觉系统、主题和推荐包，不替代人工视觉确认。

当前阶段仍是 `SP-C01 · Still Paper · Mist Field`。技术 PASS 不等于视觉 PASS；7 项 `PENDING_USER_REVIEW` 未确认前，不得进入 SL-C02。

## 1. Identify Platform

先识别平台：

- `xhs`
- `wechat`
- `both`

如果用户没有指定平台，优先问清楚；如果内容明显是小红书竖图或公众号封面，可以先按最可能平台生成建议，但必须记录假设。

## 2. Identify Category

常见类别：

- `ai`
- `tools`
- `auto`
- `product`
- `food`
- `travel`
- `fitness`
- `beauty`
- `gaming`
- `career`
- `study`
- `relationship`
- `home`
- `movie`
- `fashion`
- `data`

类别只用于路由，不决定视觉系统。真正决定系统的是卡片任务：叙事/情绪/摄影走 `Still Paper`，证据/截图/数据/流程走 `Signal Proof`。

## 3. Identify Intent

常见意图：

- `proof`
- `result`
- `tutorial`
- `essay`
- `report`
- `launch`
- `review`
- `story`
- `framework`
- `emotion`
- `campaign`

## 4. Recommend Pack

使用 CLI 推荐：

```bash
node bin/blcaptain-style.mjs recommend-style --platform xhs --category food --intent proof
node bin/blcaptain-style.mjs recommend-style --platform wechat --category ai --intent essay
```

推荐结果必须显示：

```text
visual: Still Paper / Signal Proof
theme: 当前批准主题
```

验证推荐层：

```bash
npm run gate:style-packs
```

## 5. Confirm Image Policy

如果推荐包需要图片、截图或证据，而用户没有提供图，按 A/B/C 一次性给选择：

```text
这张卡需要一个主视觉素材。你想走哪条路线？

A. 你提供自己的实拍图 / 截图 / 产品图
B. 我生成一张纯图片素材，再放进卡片里
C. 我从公开图源找候选，确认后下载入库并记录 SOURCES.md
```

需要图片计划时运行：

```bash
node bin/blcaptain-style.mjs image-plan brief.json --out task/assets/IMAGE_REQUESTS.md
```

图片来源必须写入：

```text
assets/IMAGE_REQUESTS.md
assets/SOURCES.md
```

## 6. Continue Normal Seven-Step Workflow

继续固定七步流程：

1. Intake
2. Style & Theme
3. Layout Contract Selection
4. Asset Prep
5. Compose & Render
6. Gate & Review
7. Iterate

自动 gate 默认要跑，不是按需验证：

```bash
npm run check
npm run phase2:spc01:check
npm run release:check
npm run manual:review
```

发布就绪必须跑：

```bash
npm run release:ready
```

`release:ready` 在人工视觉状态未通过前必须保持 BLOCKED。

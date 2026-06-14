# 小红书真实信息流封面模式

本层用于理解真实信息流环境中的通用模式。它只提取公开可见的结构规律，不复制任何创作者封面、照片、人脸、文案或布局。

当前项目只允许两套主视觉：

- `Still Paper`
- `Signal Proof`

当前阶段仍是 `SP-C01 · Still Paper · Mist Field`。技术 PASS 不等于视觉 PASS；7 项 `PENDING_USER_REVIEW` 未确认前，不得进入 SL-C02。

## 模式 1：真实证据图

真实人物、食物、地点、房间、截图、产品或结果图是主视觉证据。

适合：

- 食物、旅行、日常、测评、个人故事
- “我真的试过”是核心卖点

推荐入口：

- `xhs-real-proof`
- `food-proof-card`
- `travel-field-journal`
- `xhs-lifestyle-diary`

系统选择：

- 照片和情绪为主：`Still Paper`
- 截图和证明为主：`Signal Proof`

## 模式 2：大标题停留

高对比中文标题覆盖照片或截图，目标是一秒内读懂。

适合：

- 教程、健身、工具技巧、关系、职场建议
- 标题能压缩成一个明确承诺

推荐入口：

- `xhs-result-bomb`
- `xhs-clean-note`
- `career-framework`

系统选择：

- 结果、清单、对比：`Signal Proof`
- 情绪札记、关系故事：`Still Paper`

## 模式 3：结果先行

封面先展示结果，再解释过程。

常见信号：

- 瘦了
- 变了
- 学会了
- 避坑
- 隐藏吃法
- 直接上手
- 真实测评

推荐入口：

- `xhs-result-bomb`
- `food-proof-card`
- `tech-screenshot-proof`

## 模式 4：情绪先行

强情绪可以作为停留点，但必须像真人表达，不能像生成式标题。

常见信号：

- 谁懂
- 真的
- 竟然
- 救命
- 太绝了
- 后悔才知道

推荐入口：

- `relationship-note`
- `xhs-lifestyle-diary`
- `gaming-keyart`

系统选择：

- 情绪和画面：`Still Paper`
- 结果和证据：`Signal Proof`

## 模式 5：截图证据卡

截图、产品 UI、对比面板、前后对照是证据主体。

适合：

- AI 工具
- App 技巧
- 数据和工作流
- 职场方法
- 游戏攻略

推荐入口：

- `tech-screenshot-proof`
- `ai-workflow-blueprint`
- `xhs-real-proof`

要求：

- 截图必须大到可读。
- 最多 2 个 callout。
- 不得把截图变成背景纹理。

## Gate & Review

修改真实信息流模式、推荐包映射或平台路由后必须运行：

```bash
npm run gate:style-packs
npm run manual:review
```

进入发布判断前必须运行：

```bash
npm run release:check
npm run release:ready
```

`release:ready` 在人工视觉未确认前必须继续 BLOCKED。

## 禁止事项

- 不复制创作者封面、照片、人脸、文案或版式。
- 不把信息流理解成低质大字贴。
- 不让文字遮挡人脸、食物主体、产品主体或 UI 关键信息。
- 不用未记录来源的公开图片。
- 不在 SP-C01 未人工确认前进入 SL-C02。

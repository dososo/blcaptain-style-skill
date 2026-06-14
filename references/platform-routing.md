# 平台路由

本文件定义平台、内容类别、意图到风格推荐包的路由规则。它只负责推荐入口，不绕过当前硬闸门。

当前仍处于 `SP-C01 · Still Paper · Mist Field` 阶段。技术 PASS 不等于视觉 PASS；7 项 `PENDING_USER_REVIEW` 未确认前，不得进入 SL-C02、Core 4、Core 8 或开源发布。

## 路由原则

先判断卡片任务，再判断风格：

- 要停留、情绪、叙事、照片质感：优先 `Still Paper`。
- 要证明、截图、数据、流程、选择：优先 `Signal Proof`。
- 系统总览、README hero、能力地图：才考虑 `BC-01 Bridge Canvas`。

用户说“好看”时，不直接理解成某种旧风格，而要落到任务：

- 停住缩略图
- 证明观点
- 解释方法
- 推出产品
- 总结报告
- 像一篇日记

## 小红书

推荐基线：

- 竖版优先，常用 1080×1440。
- 第一屏标题要能在缩略图里读懂。
- 真实图片、截图、结果和情绪要明显。
- 不用太多小标签和复杂元信息。
- 食物、旅行、生活方式要让图片足够大。
- 教程、工具、对比要让证据足够可读。

适配方向：

- 生活、旅行、关系、食物：`Still Paper`
- 工具、教程、截图、清单、结果承诺：`Signal Proof`

## 微信公众号

推荐基线：

- 长文封面要考虑大封面和分享小图的配对。
- 标题在裁切后仍要清楚。
- 比小红书更克制，强调作者判断、文章气质和可信度。
- 数据、研究、工具内容要明确证据来源。

适配方向：

- 长文、观点、文化、产品思考：`Still Paper`
- 报告、数据、产品能力、工作流：`Signal Proof`

## 推荐表

| 平台 | 类别 | 意图 | 推荐包 |
|---|---|---|---|
| xhs | food | proof/review | food-proof-card |
| xhs | fitness | result | xhs-result-bomb |
| xhs | gaming | reaction/guide | gaming-keyart |
| xhs | career | framework | career-framework |
| xhs | ai/tools | tutorial/proof | tech-screenshot-proof |
| xhs | travel | diary/guide | travel-field-journal |
| xhs | relationship | emotion/story | relationship-note |
| wechat | ai/product | essay/analysis | wechat-longform-cover |
| wechat | data/research | report | wechat-report-brief |
| wechat | auto/product | launch/campaign | wechat-brand-feature |
| both | ai/agent | workflow/tutorial | ai-workflow-blueprint |

## 必跑 gate

修改推荐包、平台路由或推荐流程后，必须运行：

```bash
npm run gate:style-packs
npm run manual:review
```

进入发布判断前必须区分：

```bash
npm run release:check
npm run release:ready
```

`release:check` 只代表工程健康；`release:ready` 必须等待人工视觉状态通过。

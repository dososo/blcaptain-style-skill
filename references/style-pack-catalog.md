# 风格推荐包目录

风格推荐包位于主题合同和版式骨架之上。

它不是视觉皮肤，而是路由决策：

```text
平台 + 内容类别 + 内容意图 + 图片可用性 → 视觉系统 + 主题 + 版式序列 + 图片策略
```

## 为什么需要它

小红书和微信公众号解决的是不同用户场景。

- 小红书更重视缩略图可读性、证据、情绪、结果承诺和真实生活图片。
- 微信公众号更重视标题权威感、封面组合一致性、长文信任感和更强的编辑结构。

单一“好看卡片”风格无法覆盖两种平台。

## 字段

每个风格推荐包定义：

- `platform`
- `categories`
- `intent`
- `visualSystem`
- `theme`
- `layouts`
- `imagePolicy`
- `description`
- `antiPatterns`

## 当前推荐包

查看全部推荐包：

```bash
node bin/blcaptain-style.mjs style-packs
```

验证推荐层只暴露已批准视觉系统和主题：

```bash
npm run gate:style-packs
```

推荐一个匹配方案：

```bash
node bin/blcaptain-style.mjs recommend-style --platform xhs --category food --intent proof
node bin/blcaptain-style.mjs recommend-style --platform wechat --category ai --intent essay
```

## 推荐包族

当前推荐包必须路由到两套主视觉系统：

```text
Still Paper
Signal Proof
```

`Bridge Canvas` 保持系统展示层身份。除非任务明确是系统总览，不用于普通内容卡。

### Still Paper

编辑感、纸感、克制、对图片气质敏感。

适合：

- 生活日记
- 食物与餐桌场景
- 旅行 field notes
- 关系札记
- 书影音或文化笔记
- 图片主导的叙事封面

推荐主题：

- `SP-01 Mist Field`：薄雾、旅行、克制叙事。
- `SP-02 Warm Study`：长文、关系札记、书房暖意。
- `SP-03 Coastal Quiet`：生活方式、时尚、安静图片卡。
- `SP-04 Night Grain`：深色编辑、电影、游戏、夜间故事气质。
- `SP-05 Hearth & Table`：食物、餐桌、家庭纹理。

### Signal Proof

证据主导、结构清晰，面向截图、数据、工具和工作流。

适合：

- AI 工作流
- 工具教程
- 截图证明
- 产品 walkthrough
- 数据报告
- 对比和清单卡
- 决策框架

推荐主题：

- `SL-01 Electric Blue`：AI 工具、教程、工作流解释。
- `SL-02 Graphite Mint`：截图、证明卡、界面证据。
- `SL-03 Safety Coral`：报告、KPI、复盘和数据卡。
- `SL-04 Acid Lime`：决策、对比、清单和行动卡。

### Bridge Canvas

只用于系统总览。

适合：

- README hero
- 能力地图
- 平台覆盖说明
- 方法论或系统介绍

不要把普通小红书或微信公众号内容卡路由到 Bridge Canvas。

## 禁止事项

- 不要把每张小红书封面都做成高级编辑风。
- 不要把每张微信公众号封面都做成大字冲击封面。
- 不要把截图当成很小的装饰物。
- 没有清晰主数字时，不要使用数据报告版式。
- 没有产品图片时，不要使用产品 hero 版式。
- 不要把 `XHS Native`、`Quiet Current`、`Signal Grid`、`Product Theatre` 作为当前推荐输出重新引入。
- 不要在风格推荐中暴露 `xhs-*`、`editorial-*`、`swiss-*` 等旧主题 ID。

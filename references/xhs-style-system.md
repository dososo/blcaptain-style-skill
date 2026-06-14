# 小红书风格系统

本文件定义小红书任务如何进入当前 BLCaptain 视觉系统。它不是独立第三套风格，也不绕过硬闸门。

当前阶段仍是 `SP-C01 · Still Paper · Mist Field`。技术 PASS 不等于视觉 PASS；7 项 `PENDING_USER_REVIEW` 未确认前，不得进入 SL-C02、Core 4、Core 8 或开源发布。

## 基本判断

小红书首图必须先回答一个问题：

```text
用户为什么停下来？
```

优先判断任务，而不是先选“好看风格”：

- 真实照片、生活方式、旅行、食物、情绪叙事：优先 `Still Paper`。
- 截图证明、工具教程、结果承诺、清单、对比：优先 `Signal Proof`。

## 当前推荐包

### xhs-real-proof

- 视觉系统：`Signal Proof`
- 默认主题：`SL-02 Graphite Mint`
- 用于：真实图片、截图、测评、教程、App 证明。
- 要求：证据图必须足够大，文字退后。

### xhs-result-bomb

- 视觉系统：`Signal Proof`
- 默认主题：`SL-04 Acid Lime`
- 用于：结果承诺、健身、学习、工具效率、避坑。
- 要求：最大标题短、强、能在缩略图中读懂。

### xhs-clean-note

- 视觉系统：`Signal Proof`
- 默认主题：`SL-01 Electric Blue`
- 用于：知识笔记、工具清单、方法框架。
- 要求：结构清楚，但不能像企业 PPT。

### xhs-lifestyle-diary

- 视觉系统：`Still Paper`
- 默认主题：`SP-03 Coastal Quiet`
- 用于：生活、旅行、居家、关系、影视、时尚。
- 要求：照片和情绪是主角，设计只做气氛和秩序。

### tech-screenshot-proof

- 视觉系统：`Signal Proof`
- 默认主题：`SL-02 Graphite Mint`
- 用于：AI 工具、插件、代码工作流、截图教程。
- 要求：截图必须可读，不得缩成装饰物。

## 缩略图测试

把首图缩到 25% 时，仍应能判断：

- 主题是什么
- 承诺或结论是什么
- 证据来自哪里

## 图源规则

没有用户图时，一次性给 A/B/C：

```text
A. 用户提供实拍图 / 截图
B. AI 生成纯净写实摄影图
C. 按 Unsplash -> Pexels -> StockSnap CC0 -> Pixabay -> Kaboompics -> Flickr CC0 / Public Domain -> Openverse CC0 / Public Domain -> Wallhaven -> 直接搜索取图
```

公开图源必须写入 `SOURCES.md`。

## Gate & Review

小红书平台路由或推荐包修改后必须运行：

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

- 不要把所有小红书首图都做成高级纸感封面。
- 不要让截图、食物、人像或结果图变成小装饰。
- 不要使用未记录来源的公开图片。
- 不要为了冲击力压住人脸、产品主体或 UI 关键信息。
- 不要在 SP-C01 未人工确认前进入 SL-C02。

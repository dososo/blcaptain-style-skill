# 微信公众号风格系统

本文件定义公众号封面对如何进入当前 BLCaptain 视觉系统。它只负责平台判断，不改变当前阶段闸门。

当前阶段仍是 `SP-C01 · Still Paper · Mist Field`。技术 PASS 不等于视觉 PASS；7 项 `PENDING_USER_REVIEW` 未确认前，不得进入 SL-C02、Core 4、Core 8 或开源发布。

## 封面对逻辑

公众号文章通常需要一组封面对：

- 宽封面：21:9 或 900×383 等比例高分辨率版本。
- 分享图：1:1。

两张图必须共享：

- 同一个标题判断
- 同一个视觉系统
- 同一个主题
- 同一个主视觉锚点
- 可裁切的标题安全区

## 当前推荐包

### wechat-longform-cover

- 视觉系统：`Still Paper`
- 默认主题：`SP-02 Warm Study`
- 用于：长文、观点、AI 观察、产品思考、文化和旅行文章。
- 要求：标题克制但有判断，图片或纸感结构服务文章气质。

### wechat-report-brief

- 视觉系统：`Signal Proof`
- 默认主题：`SL-03 Safety Coral`
- 用于：数据报告、行业简报、研究摘读。
- 要求：一个核心数字或判断先行，来源、日期和范围清楚。

### wechat-brand-feature

- 视觉系统：`Signal Proof`
- 默认主题：`SL-01 Electric Blue`
- 用于：产品发布、汽车、硬件、品牌专题。
- 要求：产品或能力图必须占主导，参数表不能压过主视觉。

### ai-workflow-blueprint

- 视觉系统：`Signal Proof`
- 默认主题：`SL-01 Electric Blue`
- 用于：AI Agent、工具链、自动化流程。
- 要求：截图、流程和步骤必须形成证据链。

## 平台差异

公众号不适合直接套小红书标题爆破：

- 标题要更稳定，避免过度情绪化。
- 大封面和分享图要一起考虑。
- 长文封面要保留作者判断和可信感。
- 数据内容必须能追溯来源。

## Gate & Review

公众号平台路由或推荐包修改后必须运行：

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

- 不要把严肃长文做成小红书式吵闹封面。
- 不要让 1:1 分享图裁掉主标题。
- 不要让产品图小于元信息标签。
- 不要让报告封面堆满数字却没有结论。
- 不要在 SP-C01 未人工确认前进入 SL-C02。

# 截图证据处理规则

截图是证据，不是装饰。

当前不得进入 SL-C02，直到 `SP-C01 · Still Paper · Mist Field` 人工视觉通过。本文只规定后续 Signal Proof 截图证据卡的处理方式。

## 适用系统

```text
Signal Proof
SL-02 Graphite Mint
SL-C02 Screenshot Proof
```

Still Paper 可以使用截图，但只用于轻量说明，不作为当前主证据卡。

## 基础组件

- `.frame-shot`：通用证据截图。
- `.device-browser`：桌面网页、SaaS、GitHub、文档、后台界面。
- `.device-phone`：移动端 App、小红书、微信、手机工作流。

## 规则

- 截图必须可读，不能缩成装饰缩略图。
- 截图是证据时，附近说明文字要减少。
- 最多 2 个 callout。
- 需要来源、时间或上下文线索。
- 优先 `object-fit: contain`，不得拉伸。
- 保留界面关键区域，不裁掉结论、按钮、命令结果或报错。
- 截图外框只用于说明上下文，不能喧宾夺主。

## 图源记录

截图来自用户、产品页面或公开网页时，必须写入：

```text
IMAGE_REQUESTS.md
SOURCES.md
```

AI mock 或示意截图必须明确标注为 mock，不得伪装成真实产品证据。

## 失败条件

- 截图中文字在社交卡尺寸下不可读。
- callout 超过 2 个。
- 标题压住关键 UI。
- 使用假数据、假代码或假日志冒充证据。
- 截图没有来源或上下文。
- 技术 PASS 后直接进入下一阶段，跳过人工视觉确认。

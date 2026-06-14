# 图像叠字与满铺图规则

本文件用于任何文字靠近图片、压在图片上，或图片铺满卡片的场景。当前阶段只作为参考规则和 proof 约束，`SP-FB-PROOF-01` 仍是 `PENDING_USER_REVIEW`，通过前不得绑定 full-bleed 生产布局。

当前硬闸门仍是：

```text
SP-C01 · Still Paper · Mist Field
```

技术 PASS 不等于视觉 PASS；满铺图必须经过人工确认。

## 必读合同

```text
references/full-bleed-image-composition-contracts.md
references/full-bleed-image-composition-contracts.json
```

## 核心原则

- 先判断图片主体，再放文字。
- 先选图、先找安静区，再考虑遮罩；遮罩不能替代失败图源。
- 不遮挡人脸、产品 logo、车头、食物主体、关键 UI 文本或画面核心元素。
- Still Paper 可以用纸感 panel 或局部柔和遮罩，但不能靠大面积黑罩掩盖构图问题。
- Signal Proof 以证据清晰为先，截图类图片不得被标题压住。
- 没有安全文字区时，换图、换版式，或使用明确的纸面 / ledger 面板。
- 不反复微调 `object-position` 去拯救根本不适合的图片。

## 借鉴边界

本文件借鉴公开 `image-overlay.md` 的方法论：

```text
先选图
先找 quiet zone
先尝试无遮罩
失败后才用局部、图像色调的柔和遮罩
文字避开主体和脸部
缩略图下仍可读
```

不复制上游的视觉样式、代码片段、CSS、布局、命名或模板；BLCaptain 只固化自己的 Still Paper / Signal Proof 规则。

## 必填声明

每个满铺图任务必须声明：

```text
subject map
safe text zone
avoid zone
quiet zone ratio
light quality
no-mask attempt
title canvas ratio
overlay token
overlay peak alpha
crop strategy
object-position
thumbnail check
fallback plan
```

## 选图先于遮罩

满铺图或文字贴近图片前，必须先过两道图源测试：

### 1. 安静区测试

图片至少要有一块约 `30%` 画布面积的低细节区域，适合承载标题或说明。

可以是：

```text
雾
天空
平静水面
虚化背景
暗部阴影
低对比墙面
留白纸面
```

如果没有安静区，不用黑罩硬救，直接换图、换成照片井、换成纸面侧栏，或放弃满铺。

### 2. 光线测试

优先：

```text
晨雾
阴天
金色时刻
薄暮
树林漫射光
胶片柔光
低饱和自然光
```

淘汰：

```text
正午高饱和旅行照
闪光灯直打
过度 HDR
游客打卡感
廉价 stock cheerfulness
```

## 遮罩策略

默认先做无遮罩排版。只有在图片已通过安静区测试和光线测试，但缩略图下文字仍不稳时，才允许使用遮罩。

允许：

- 局部遮罩，只覆盖标题区域。
- 使用图片里已有的暗部色调，例如雾蓝、松绿、暮紫、纸灰。
- 峰值透明度控制在 `0.15-0.30`。
- 遮罩必须逐渐透明，不能盖住主体轮廓。

禁止：

- 全图黑罩。
- 纯黑遮罩。
- 平的黑/白文字底板。
- `mix-blend-mode: difference` 作为可读性方案。
- `img { opacity: .6 }` 式整体压暗。
- 需要超过 `0.40` 透明度才能读清的图。

## 主体避让

做设计前必须先看图并写明：

```text
主体在哪里
脸 / 手 / 产品 / UI 关键区域在哪里
主体轮廓边缘在哪里
最大安静区在哪里
文字准备落在哪个区
```

显示标题优先落位：

```text
1. 主体上方或下方的安静区
2. 主体相反侧的纵向栏
3. 极少数情况下使用对角空角
```

标题不得横穿脸、眼睛、手、身体轮廓、产品 logo、车头、食物主体或 UI 文本。中文大标题尤其不能压主体边缘，否则像批注而不是封面。

## 版面纪律

- 标题占画布面积不得超过 `40%`。
- 标题优先非居中落位，保持 Still Paper 的安静偏移和 Signal Proof 的证据秩序。
- 标题只能占用一个安静区；最多拆为上下两个区，不能绕着主体碎裂分布。
- 如果主体填满画面，没有 30% 安静区，文字应移出图片，或改用照片井 / 双图 / 纸面 panel。
- 每张满铺图都必须做 360px 宽缩略图可读检查。

## 图源记录

所有生成图或外部图必须有：

```text
IMAGE_REQUESTS.md
SOURCES.md
```

如果图片是 AI 生成，应写明“纯图片资产”；如果图片来自公开图源，应保留来源 URL、作者、平台和用途。

## 失败条件

- 标题压住人脸、产品主体、UI 文本或食物主体。
- 图片没有 30% 安静区却仍强行叠字。
- 没有先尝试无遮罩排版就直接加遮罩。
- 局部遮罩峰值透明度超过 0.30，或需要超过 0.40 才能读清。
- 画面主体被裁断但没有合同说明。
- 只用全局黑罩提高对比。
- `object-position` 缺失。
- 缺少 `subject map`、`safe text zone` 或 `avoid zone`。
- 缺少 `quiet zone ratio`、`light quality`、`title canvas ratio` 或 `thumbnail check`。
- 视觉方向稿裁切图被当成生产 hero 图。

# QA 检查清单

交付前必须同时看机器 gate 和人工视觉状态。**技术 PASS 不等于视觉 PASS，人工视觉确认是最终闸门。**

## 机器检查

- `npm run check` 是否通过（运行时 mjs 语法）。
- `npm run test:gates` 是否通过（全部质量 gate）。
- `npm run gate:asset` 是否通过（图片来源记录齐全）。
- `npm run gate:geometry` 是否通过（版式几何契约）。
- `npm run gate:style-packs` 是否通过（主题/风格对齐）。
- 用户发布卡片是否禁止展示内部代号、调试信息或工程声明。

## 视觉检查

- 是否只有一个清晰焦点。
- Still Paper 是否有纸感、留白和克制。
- Signal Proof 是否有证据、结构和可读截图。
- Bridge Canvas 是否有满铺张力与统一调性。
- 标题在手机缩略图是否可读。
- 正文是否超过最小字号。
- 截图必须可读。
- 满铺图文字是否避开人脸、logo、食物主体、产品主体和 UI 文本。
- 满铺图是否先通过 30% 安静区测试和克制光线测试。
- 是否先尝试无遮罩排版，再使用局部图像色调遮罩。
- 遮罩是否局部、非纯黑、峰值透明度不超过 0.30。
- 标题是否占画布不超过 40%，并在 360px 缩略图下仍可读。
- 页脚、底注、来源是否不碰撞。
- 整组图是否有统一节奏，而不是每页都一样。
- 是否避免泛 SaaS 卡片感。

## 资产检查

- 生成图或外部图是否有 `IMAGE_REQUESTS.md`。
- 生成图或外部图是否有 `SOURCES.md`。
- 公开图源是否保留 URL、作者、平台和用途。
- AI 图是否标记为纯图片资产或 mock。
- 视觉方向稿是否只作为参考，而不是生产 hero 图。

## R1-R11 快速确认

```text
R1  Overflow
R2  Type Caps
R3  Footer Collision
R4  Band Density
R5  Frame Overflow
R6  Style Identity
R7  Image Source Record
R8  Object Position
R9  Contract Zones
R10 Full-Bleed Quiet Zone
R11 Overlay Restraint
```

## 阻塞判断

- 技术 PASS 不等于视觉 PASS。
- 任一 `FAIL_*` 不得进入下一阶段。
- 人工视觉确认是最终闸门。

# 发布质量线

发布质量线分成两层：

- 工程健康：由 `npm run release:check` 判断。
- 发布就绪：由 `npm run release:ready` 判断。

技术 PASS 不等于视觉 PASS。人工视觉未通过时，即使工程健康，也不得发布。

## 工程健康阻塞项

以下任一情况出现，`release:check` 不应通过：

- 没有渲染样张 PNG。
- 样张场景少于 6 个。
- 渲染 PNG 少于 21 张。
- `visual-audit` 有 blocking failure。
- `quality-score` gate 失败。
- `audit` 报告缺少必需产物。
- `npm run check` 失败。
- 任一 demo 构建失败。
- 产品样张没有显示产品主体。
- 截图样张在 gallery 尺寸下不可读。
- 数据样张缺少清晰视觉层级。
- PRD 对齐 gate 失败。
- style-pack 对齐 gate 失败。

## 发布就绪阻塞项

以下任一情况出现，`release:ready` 必须阻塞：

- 任一人工视觉项仍是 `PENDING_USER_REVIEW`。
- 任一人工视觉项是 `FAIL_VISUAL`。
- 任一人工视觉项是 `FAIL_ASSET`。
- 任一人工视觉项是 `FAIL_CONTRACT`。
- 任一人工视觉项是 `FAIL_COPY`。
- 满铺图出现 `FAIL_SUBJECT_OCCLUSION`。
- 满铺图出现 `FAIL_CONTRAST`。
- 满铺图出现 `FAIL_CROP`。
- SP-C01 未通过用户人工确认。
- 用户未允许进入下一阶段。

当前 7 个阻塞项：

```text
SP-C01 Engine Binding
Lake Girl Variant
B AI Photo
C Public Photo
SP-TYPE-BI-01
SL-TYPE-BI-01
SP-FB-PROOF-01
```

这些阻塞项未通过前，不得进入 SL-C02。

## 可接受 WARN

以下情况可以作为 WARN，但必须在报告中说明：

- Playwright 不可用，使用 static validation fallback。
- 某些只使用本地生成占位资产的样张没有外部来源。
- Python 环境输出无关 warmup warning，但命令退出 0。
- 字体环境输出 `WARN_ENGINEERING_PREVIEW`，但该样张仅用于工程预览，不做最终字体视觉验收。

## 不可接受 WARN

以下情况不能作为 WARN 放过：

- 外部图片没有 `SOURCES.md` 记录。
- 满铺图主体被标题或遮罩压住。
- 截图不可读。
- Still Paper 和 Signal Proof 只是同一模板换色。
- `release:ready` 阻塞却仍打 tag。

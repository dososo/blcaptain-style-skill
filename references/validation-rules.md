# 验证规则 R1-R9

validator 只判断结构问题，不能替代人工审美判断。

当前状态：

```text
SP-C01 · Still Paper · Mist Field
PENDING_USER_REVIEW
```

技术 PASS 不等于视觉 PASS。

## Blocking 规则

### R1 Overflow

文本、图片、卡片块不得超出 poster 边界。

### R2 Type Caps

标题、正文、底注、callout 必须遵守合同字数、行数和字号上限。

### R3 Footer Collision

页脚、来源、底注不得与正文、图片区或卡片块碰撞。

### R4 Band Density

信息带密度不能超过合同；高密度 Signal Proof 也必须可分组阅读。

### R5 Frame Overflow

截图框、设备框、图片框不得溢出合同区域。

### R6 Style Identity

Still Paper 必须保留纸感、留白、克制；Signal Proof 必须保留证据、结构、截图 / 数据气质。不能只是换色。

### R7 Image Source Record

生成图或外部图必须有：

```text
IMAGE_REQUESTS.md
SOURCES.md
```

缺失来源记录时阻塞。

### R8 Object Position

图片裁切必须声明 `object-position`。满铺图还要声明 `subject map`、`safe text zone`、`avoid zone`。

### R9 Contract Zones

内容必须落在布局合同定义的 zone 内。未声明 zone 的漂移布局不得作为通过样张。

## WARN

- 标题行数接近上限。
- 截图可能不可读。
- 满铺图对比不足。
- 字体环境是 `WARN_ENGINEERING_PREVIEW`。
- `release:check` PASS 但 `manual:review` 仍阻塞。

## INFO

- 检测到外部图源。
- 检测到 AI 生成图。
- 检测到 fallback renderer。

## 下一阶段规则

`manual:review:strict` 未通过时，不得进入 SL-C02、Core 4、Core 8 或开源发布。

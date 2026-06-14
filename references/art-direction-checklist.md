# 艺术指导检查清单

本清单用于渲染前和人工视觉前的自检。它不替代 `manual:review`。

当前阶段仍是：

```text
SP-C01 · Still Paper · Mist Field
PENDING_USER_REVIEW
```

技术 PASS 不等于视觉 PASS。

## 焦点

每张卡只能有一个主焦点：

- Still Paper：标题、人物 / 风景图、纸面留白、短句。
- Signal Proof：截图证据、大数字、流程结构、对比矩阵。

如果所有元素一样重，失败。

## 字体

- 标题必须明显大于正文。
- 中文标题需要充足呼吸空间。
- 中英混排要检查 `.latin`、`.num`、`.mono`。
- 英文不能被中文字体栈吞掉。
- 缩略图尺寸下仍能读出标题。

## 留白与密度

- Still Paper 必须有安静区域。
- Signal Proof 可以密，但必须分组清楚。
- 页脚、底注、来源不能漂进正文。
- 一张卡只保留一种主要视觉节奏。

## 图片

- 满铺图必须有 `subject map`、`safe text zone`、`avoid zone` 和 `object-position`。
- 截图必须可读。
- 产品图必须足够大，不能被 feature grid 淹没。
- 食物图、人物图、产品图不能只作为小装饰。
- 所有生成图或外部图必须有 `IMAGE_REQUESTS.md` 和 `SOURCES.md`。

## 色彩

- 使用主题合同，不自定义随机 hex。
- Still Paper 的强调色要克制。
- Signal Proof 的强调色要能引导阅读。
- 不用随机渐变制造热闹。

## 常见失败

- Still Paper 做成普通白底模板。
- Signal Proof 做成泛蓝白 dashboard。
- 标题和截图抢焦点。
- 图片主体被文字压住。
- 装饰多于意义。
- 技术 PASS 后跳过人工视觉。

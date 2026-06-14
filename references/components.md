# 组件系统

本文件定义 BLCaptain Style Skill 当前可用的基础文字组件角色。组件命名必须服务当前两套主视觉：

- `Still Paper`
- `Signal Proof`

当前项目已切到 `Phase 0.5 — 视觉校准重启`。旧 `SP-C01 · Still Paper · Mist Field` 硬闸门作为发布阻塞记录保留，7 项旧人工审阅图作为 `FAIL_VISUAL` 证据处理。技术 PASS 不等于视觉 PASS；视觉校准未确认前，不得进入 SL-C02。

## 共享角色

| 角色 | Still Paper | Signal Proof |
|---|---|---|
| Display | 中文主标题、短句、摘句，克制有纸感 | 证明句、教程标题、流程判断，清晰可执行 |
| Body | 导语、札记、短段落，像内容编辑 | 解释、步骤、事实组，像产品说明 |
| Caption | 日期、地点、来源、轻量元信息 | 来源、时间、上下文、状态信息 |
| Label | 栏目标记、系列名、图片说明 | 模块标题、证据标签、步骤名 |
| Number | 日期、期数、轻量结构锚点 | KPI、步骤、对比数字、结论数字 |
| Quote | 人文摘句、观察、反思 | 结论、原则、证据摘要 |
| Mono | 不作为主视觉，必要时用于小型编号 | 代码、命令、日志、短技术标记 |

## Still Paper 组件 token

Still Paper 组件使用 `SP-TYPE-01`。英文、数字和元信息应按 `Latin-first` 规则使用 `.latin`、`.num`，避免英文完全落入中文字体 fallback。

```css
.sp-display {
  font-family: var(--sp-display);
  font-size: 76px;
  line-height: 1.10;
  letter-spacing: 0;
  font-weight: 620;
}

.sp-body {
  font-family: var(--sp-body);
  font-size: 24px;
  line-height: 1.52;
  letter-spacing: 0;
  font-weight: 430;
}

.sp-caption {
  font-family: var(--sp-label);
  font-size: 14px;
  line-height: 1.35;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.sp-label {
  font-family: var(--sp-label);
  font-size: 15px;
  line-height: 1.25;
  letter-spacing: 0.10em;
  color: var(--accent);
}

.sp-number {
  font-family: var(--sp-num);
  font-size: 34px;
  line-height: 1;
  letter-spacing: 0;
  font-weight: 520;
}

.sp-quote {
  font-family: var(--sp-display);
  font-size: 46px;
  line-height: 1.18;
  letter-spacing: 0;
}
```

使用规则：

- 标题必须先保证中文可读，再处理英文节奏。
- 小标签可以有正 tracking，但中文 tracking 不得过大。
- 元信息不能承载核心意思；用户不读 caption 也应理解卡片。
- 图片区域较细碎时，降低标题字重，增加标题周围留白。
- 满铺图时，组件必须避开主体地图和文字禁区。

## Signal Proof 组件 token

Signal Proof 组件使用 `SL-TYPE-01`。英文工具名、数字、代码和 UI label 应按 `Latin-first` 规则使用 `.latin`、`.num`、`.mono`，让证据卡有清晰的产品系统气质。

```css
.sl-display {
  font-family: var(--sl-display);
  font-size: 72px;
  line-height: 1.00;
  letter-spacing: 0;
  font-weight: 580;
}

.sl-body {
  font-family: var(--sl-body);
  font-size: 25px;
  line-height: 1.38;
  letter-spacing: 0;
  font-weight: 440;
}

.sl-caption {
  font-family: var(--sl-label);
  font-size: 15px;
  line-height: 1.28;
  letter-spacing: 0.04em;
  color: var(--muted);
}

.sl-label {
  font-family: var(--sl-label);
  font-size: 16px;
  line-height: 1;
  letter-spacing: 0.08em;
  font-weight: 640;
}

.sl-number {
  font-family: var(--sl-num);
  font-size: 92px;
  line-height: 0.92;
  letter-spacing: 0;
  font-weight: 620;
}

.sl-mono {
  font-family: var(--sl-mono);
  font-size: 18px;
  line-height: 1.34;
  letter-spacing: 0;
}

.sl-quote {
  font-family: var(--sl-display);
  font-size: 38px;
  line-height: 1.12;
  font-weight: 520;
}
```

使用规则：

- 截图和数据是主证据，组件不能抢过证据区。
- 大数字必须有单位和结论，不能只做装饰。
- 标签用于建立证据层级，不用于填满画面。
- `.mono` 只放短命令、日志片段或可信技术标记，不写假代码。
- callout 最多两个；超过两个说明卡片任务没有收敛。

## 间距规则

Still Paper：

- 外边距：64 到 84px。
- 段落间距：20 到 30px。
- 图片到文字：28 到 44px。
- 页脚保持低声，不制造多余层级。

Signal Proof：

- 外边距：56 到 72px。
- 网格间距：16 到 28px。
- 模块内边距：24 到 34px。
- 证据区优先，标签和注释围绕证据服务。

## SP-MF Botanical Stamp

服务范围：

```text
Still Paper / SP-01 Mist Field / Board 01
```

共享源：

```text
assets/components/sp-mf-botanical-stamp.svg
```

规则：

- 唯一图案使用 R01 v12 的植物章，路径不得在各个 HTML 中重新手写或简化。
- 图标显示尺寸建议 `44px` 到 `48px`；不得缩到看不清叶片结构。
- 圆章尺寸建议 `72px` 到 `92px`，按版式所在位置调整，但视觉线宽必须清晰。
- 植物有效线宽不得低于约 `1.8px` 的显示效果；纸面版建议 `2.2px` 到 `2.4px`。
- 植物图案不可省略；`VOL.01 / VOL.02` 只能作为附属 label，不能替代植物。
- R01 照片上可用浅色 photo variant；R07/R05 等纸面上可用 ink/sage variant，但路径、比例和叶片元素必须一致。
- 在最终 PNG 中必须能看见叶片和枝干；只在 DOM 里引用组件但渲染后为空圈，视为失败。
- 若静态 proof 为避免外部 SVG 引用失效而内联路径，必须使用同一共享源的完整路径，并标注 `data-component-source`；后续组件化 helper 必须以该共享源为唯一来源。

失败信号：

- 使用纯文字圆章或数字圆章。
- 只复制部分叶片路径，省略底部枝干。
- 线条太细，缩略图下只剩淡圈。
- 每张卡各自内联一套不同植物图案，导致风格漂移。

## 验收

- 组件类名必须使用 `sp-*` 或 `sl-*`。
- 新增组件前先说明它服务哪套主视觉、哪个主题、哪个布局合同。
- 中英混排 proof 未人工通过前，不得把这些组件视为最终字体视觉验收。
- Phase 0.5 视觉校准未通过前，本文件只作为合同参考，不触发 SL-C02 或 Core 4 扩展。

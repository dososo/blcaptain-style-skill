# 字体系统

本文件定义 BLCaptain Style Skill 当前字体系统。字体是视觉合同的一部分，不是最后随手替换的样式细节。

当前只服务两套主视觉：

- `Still Paper`
- `Signal Proof`

当前仍处于 `SP-C01 · Still Paper · Mist Field` 硬闸门阶段。技术 PASS 不等于视觉 PASS；字体环境、proof card 和人工视觉状态未通过前，不得进入 SL-C02，也不得把字体方案绑定为最终生产视觉。

权威合同：

```text
references/bilingual-typography-contracts.md
references/language-typography-calibration.md
references/bilingual-typography-contracts.json
```

## 总原则

- 中文是主体验收对象，英文、数字、代码和 UI label 必须有独立角色。
- 混排角色必须使用 `Latin-first` 字体栈，避免英文被中文字体 fallback 吞掉。
- 需要更严格控制时，使用 `.latin`、`.num`、`.mono` 显式包裹。
- 不使用一个通用 UI 字体栈覆盖所有角色。
- 不在未确认授权前打包字体文件。
- 字体 gate 输出 `WARN_ENGINEERING_PREVIEW` 时，只能算工程预览，不能算最终视觉通过。
- 视觉方向稿必须补齐三种语言模式：中文主导、中英混排、全英文。
- 全英文卡仍必须保留 Still Paper / Signal Proof 的独立审美，不能退化为普通英文模板。
- 字体不是“中规中矩能读就行”；必须有特别审美，但不能牺牲可读性和平台适配。

## Still Paper — SP-TYPE-01

名称：

```text
Paper Serif / Field Sans
```

设计意图：

```text
中文是内容主声部；英文像刊物边注、日期、系列名、地点和节奏标记。
```

Still Paper 不得变成泛米色模板、假奢侈排版或过度文艺封面。

### Display

用于：

- 中文封面标题
- 短英文 phrase
- 摘句开头

推荐变量：

```css
--sp-display:
  "Source Serif 4",
  "Newsreader",
  "Source Han Serif SC",
  "Noto Serif CJK SC",
  "Songti SC",
  "STSong",
  Georgia,
  serif;
```

规则：

- 中文标题优先。
- 英文在标题内应比中文更轻，除非任务明确英文主导。
- 不使用夸张高反差时尚字体。
- 不靠斜体和花字制造情绪；Still Paper 用留白、纸感和摄影气质说话。

范围：

```text
SP-C01 中文标题：72–82px
英文混入标题：0.86–0.94em optical size
Line-height：1.08–1.16
Weight：560–700
Letter spacing：0
```

### Body / Lead

推荐变量：

```css
--sp-body:
  "IBM Plex Sans",
  "Source Han Sans SC",
  "Noto Sans CJK SC",
  "PingFang SC",
  "Noto Sans",
  system-ui,
  sans-serif;
```

规则：

- 导语使用 sans，避免整张卡过度文学化。
- 英文导语像旁注，不像营销口号。
- 纸张纹理和雾感底纹上必须保持清晰。

范围：

```text
Lead：22–26px
Line-height：1.45–1.60
Weight：380–520
Letter spacing：0
```

### Label / Footer / Number

推荐变量：

```css
--sp-label:
  "IBM Plex Sans",
  "Source Han Sans SC",
  "Noto Sans CJK SC",
  "PingFang SC",
  system-ui,
  sans-serif;

--sp-num:
  "IBM Plex Sans",
  "Source Han Sans SC",
  "Noto Sans CJK SC",
  "PingFang SC",
  system-ui,
  sans-serif;
```

规则：

- 日期和期数使用 tabular numbers。
- 大写英文 label 可以使用正 tracking。
- 中文 label 不做夸张 tracking。
- 页脚不抢主标题，也不抢图片情绪。

## Signal Proof — SL-TYPE-01

名称：

```text
Evidence Sans / Ledger Mono
```

设计意图：

```text
中文负责判断；英文负责系统标签、证据标记、工具名、数据单位和可信度。
```

Signal Proof 不得变成泛蓝白科技卡、假 dashboard、假代码海报或未来主义装饰。

### Display

用于：

- proof statement
- screenshot proof title
- workflow headline

推荐变量：

```css
--sl-display:
  "IBM Plex Sans",
  Inter,
  "Source Han Sans SC",
  "Noto Sans CJK SC",
  "PingFang SC",
  "Noto Sans",
  system-ui,
  sans-serif;
```

规则：

- 大标题中等字重，不用全粗。
- 英文工具名可以保留 Latin 形态，但不能压过中文判断。
- 不使用 serif display。
- 截图证明卡上标题必须给截图留足阅读空间。

范围：

```text
Display：64–90px
Line-height：0.94–1.06
Weight：500–620
Latin-heavy title letter spacing：0
Chinese tracking：0
```

### Body / Callout

推荐变量：

```css
--sl-body:
  "IBM Plex Sans",
  Inter,
  "Source Han Sans SC",
  "Noto Sans CJK SC",
  "PingFang SC",
  "Noto Sans",
  system-ui,
  sans-serif;
```

规则：

- 解释文案优先短句、事实组和步骤。
- callout 最多两个。
- 文字不能遮挡截图、图表或证据主体。
- 辅助文字也必须达到可读对比，不用小灰字糊弄。

范围：

```text
Body：24–30px
Line-height：1.30–1.46
Weight：400–520
Letter spacing：0
```

### Label / Number / Mono

推荐变量：

```css
--sl-label:
  "IBM Plex Sans",
  Inter,
  "Source Han Sans SC",
  "Noto Sans CJK SC",
  "PingFang SC",
  system-ui,
  sans-serif;

--sl-num:
  "IBM Plex Sans",
  Inter,
  "Source Han Sans SC",
  "Noto Sans CJK SC",
  "PingFang SC",
  system-ui,
  sans-serif;

--sl-mono:
  "SFMono-Regular",
  "Roboto Mono",
  "IBM Plex Mono",
  Consolas,
  monospace;
```

规则：

- 数字必须带单位、上下文和结论。
- `.mono` 只用于真实命令、日志、代码片段或短技术标记。
- 不制造假代码、假日志和假系统状态。
- 标签服务证据层级，不做装饰条。

## 中文专项规则

### 断行

中文标题尽量人工断行。

不推荐：

```text
一个超级复杂又很长的标题自动换成四行
```

推荐：

```text
5 个调研任务
同时开跑
```

### 标点

封面级标题除非语气需要，不默认以完整句号结尾。

### 混排

- 英文标签支持中文内容，不抢中文主声部。
- 工具名、变量名、命令和 UI label 需要显式 `.latin` 或 `.mono`。
- 数字使用 `.num` 时要和中文基线视觉对齐。
- 图片满铺时，文字安全区优先于排版趣味。

## 禁止事项

- 一个字体栈覆盖所有角色。
- 全部加粗。
- 中文正文过轻。
- 元信息小到不可读。
- 英文比中文更像主标题但没有内容理由。
- 用假奢侈字体包装 Still Paper。
- 用未来主义字体包装 Signal Proof。
- 在字体环境不完整时宣称视觉 PASS。

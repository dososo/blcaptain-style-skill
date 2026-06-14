# 图片来源工作流

本流程参考优秀开源社交卡片项目的 card intake 方法：先把图片来源分清，再进入构图、入库、来源记录和 PNG 验证。我们只学习这套业务流和门禁，不复制其设计、代码、模板、CSS、配色、资产、布局 ID、视觉身份或文案。

## 用户入口

当选中的卡片需要图片、截图或物件素材，而用户还没有提供素材时，只问一次：

```text
这张卡需要一个主视觉素材。你想走哪条路线？

A. 你提供自己的实拍图 / 截图 / 产品图
B. 我生成一张纯图片素材，再放进卡片里
C. 我从公开图源找候选，确认后下载入库并记录 SOURCES.md
```

不要反复追问，不要在用户已经选定路线后强行改路。

## 三条路线

### A. 用户提供图片 / 截图 / 产品图

适合：

- 旅行、食物、产品、真实案例、前后对比。
- App / 网页截图、工具教程、数据证明。
- 特定人物、地点、品牌、产品型号或真实经历。

要求：

- 用户素材进入 `assets/`。
- `SOURCES.md` 标为 `user supplied`。
- 截图必须可读，不能缩成装饰。
- 产品、截图或人物主体必须先声明安全区和避让区。

### B. AI 生成纯图片素材

适合：

- 概念卡、氛围卡、抽象策略、非特定地点。
- 非识别性人物背影、通用生活方式场景。
- R03 这类单枝植物 / 物件观察素材。

要求：

- 只生成“素材”，不生成整张卡片。
- 素材里不能包含卡片文字、边框、排版、品牌标识或水印。
- `SOURCES.md` 标为 `AI-generated image asset`。
- `IMAGE_REQUESTS.md` 写清生成意图、主体区、安全文字区、避让区和裁切要求。

### C. 公开图源

适合：

- 真实地点、公开产品图、官方素材、地图 / 路线、电影 / 游戏 key art、报告截图。
- 用户要求低版权压力或希望使用可追溯公开来源。

公开图源顺序：

```text
CC0.CN（国内 CC0，国内可访问无需 VPN）
泼辣有图 Palayoutu（国内 CC0 摄影）
Hippopx（CC0，国内可访问）
别样网 SSYER（国内 CC0 摄影）
Unsplash
Pexels
StockSnap CC0
Pixabay
NegativeSpace CC0
Kaboompics
Burst
rawpixel Public Domain
Flickr CC0 / Public Domain
Openverse CC0 / Public Domain
Wallhaven
直接搜索取图
```

国内 CC0 源前置：搭「国内开箱即用」，国内可访问、无需 VPN；国际源（Unsplash/Pexels 等）作高质量补充。所有来源仍须记录 `SOURCES.md`。

公开可见不等于可以不记录来源。外部素材必须复制 / 下载到 `assets/`，并写入 `SOURCES.md`。

## 低版权压力路线

当用户说“无版权要求”或“版权压力低”时，解释为：

```text
优先 CC0 / Public Domain / 免费可商用且不强制署名
不等于没有版权
仍必须记录 assets/SOURCES.md
成图内是否显示来源另行确认
```

来源层级：

1. `Tier 0`：用户提供素材。若用户确认可用，来源最明确。
2. `Tier 1`：CC0 / Public Domain，例如 StockSnap、NegativeSpace、rawpixel Public Domain、Flickr CC0 / Public Domain、Openverse CC0 / Public Domain，以及**国内 CC0 源 CC0.CN / 泼辣有图 / Hippopx / 别样网（国内可访问无需 VPN）**。
3. `Tier 2`：免费商用但有平台限制或条款的来源，例如 Unsplash、Pexels、Pixabay、Burst、Kaboompics。
4. `Tier 3`：需要署名的宽松 Creative Commons，例如 CC BY。只有在可接受署名时使用，不能当作“无版权要求”。

## 必备产物

每个使用图片、截图、生成图或公开素材的任务都必须有：

```text
assets/IMAGE_REQUESTS.md
assets/SOURCES.md
```

`IMAGE_REQUESTS.md` 必须包含：

- 卡片名。
- 布局 / recipe。
- 图片角色。
- 选择的来源路线：A / B / C。
- 搜索词或生成意图。
- 目标文件名。
- 主体区、文字安全区、避让区。
- 裁切和 `object-position` 要求。
- 是否需要在最终图上可见标注来源。

`SOURCES.md` 行格式：

```text
filename.png <- source description or URL
```

示例：

```text
hero-travel.jpg <- user supplied
dashboard.png <- user supplied screenshot
botanical-branch.png <- AI-generated image asset for R03 object observation
coffee-table.jpg <- https://unsplash.com/photos/xxxxx
```

## 时间 / 地点 / 归属字段来源

时间、地点、场馆、人物、品牌、产品名和作者归属不属于普通装饰文字。它们必须作为内容字段进入 brief，并声明来源。

来源优先级：

```text
1. user_content
   用户明确给出的时间、地点、路线、场馆、人物或产品信息。最高优先级。

2. photo_metadata
   只有用户明确要求“按真实照片信息来”时，才读取 EXIF / GPS / 文件 metadata。
   读取结果需要说明可靠性；平台压缩图、截图、转存图和 AI 图通常没有可靠 metadata。

3. editorial_setting
   用户未给具体字段，但卡片语义需要低声记录时，可以由编辑设定生成。
   例如“地点：湖边”“时间：清晨”“地点：寒溪湖”“时间：清晨 07:10”。
   这类字段只能表示叙事设定，不能冒充真实拍摄事实。

4. omitted
   没有可靠语义时省略字段，或改成抽象标签，例如“记录：湖边片段”。
```

AI 生成图和公开图源默认不能提供真实地点和真实拍摄时间。公开图源即使网页写有地点，也必须把该地点记录为图源页面信息；除非用户要求以该地点做内容，否则不要自动当作用户的真实经历。

推荐在 brief 中显式记录：

```json
{
  "place": {
    "text": "寒溪湖",
    "source": "editorial_setting"
  },
  "time": {
    "text": "清晨 07:10",
    "source": "editorial_setting"
  }
}
```

如果用户给真实内容：

```json
{
  "place": {
    "text": "赛里木湖",
    "source": "user_content"
  },
  "time": {
    "text": "2026-06-04 07:10",
    "source": "user_content"
  }
}
```

展示层可以诗意化，但数据层必须诚实：不要把 AI 图或公开素材包装成用户真实到访、真实拍摄或真实记录。

## 来源角标问题

素材收集后可以问一次：

```text
是否需要在成图角落标注图片来源？我会无论如何保留 assets/SOURCES.md。
```

不要强制在成图里显示来源，除非授权或内容场景要求。

## 图片质量 gate

以下素材必须替换或退回上一阶段：

- 分辨率太低。
- 主体不清楚。
- 噪点、压缩或水印明显。
- 裁切后没有安全文字区。
- 没有明确焦点。
- 截图不可读。
- 食物不好看。
- 产品太小或被遮挡。
- 物件像贴纸、元素包或装饰小图，不能承担主视觉。

## 构图规则

每张图片都必须声明 `object-position`。

正确：

```html
<img src="assets/hero.jpg" style="object-position:center 58%">
```

错误：

```html
<img src="assets/hero.jpg">
```

满铺图必须声明：

- overlay token。
- safe text zone。
- subject avoidance。

物件素材必须声明：

- subject zone。
- safe text zone。
- avoid zone。
- object scale。
- 360px 缩略图可见性要求。

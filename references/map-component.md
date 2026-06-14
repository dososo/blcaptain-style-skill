# Map Component

The map component is intended for travel, local food, city guides, routes, and multi-pin recommendations.

## Progressive enhancement

Primary implementation should be static and reliable:

```html
<div class="map-block" data-map="static">
  <div class="map-path"></div>
  <div class="map-pin" style="left:42%;top:38%">A</div>
  <div class="map-pin" style="left:68%;top:56%">B</div>
</div>
```

If the runtime allows network access and the user wants real maps, the Agent may replace the static block with real raster tiles — **but see 技术可行性调研结论 below first: that path hits hard red lines; abstract SVG stays the default.**

## Rules

- Do not require MapLibre for basic rendering.
- Do not fetch map tiles silently if the user needs offline output.
- Always label pins.
- For travel guides, the map must support route logic, not just decorative pins.
- When using real tiles, mention OSM / tile source in `assets/SOURCES.md`.

## Use cases

- 3-day city route
- coffee shop cluster
- hidden food map
- charging station route
- store visit guide

## 技术可行性调研结论（2026-06-14，真实瓦片地图）

> 修正上文「可替换为真实瓦片」的乐观假设：该路径撞红线，**抽象 SVG 路线图应继续当默认**，真地图列 v2 可选增强（非高 ROI）。

**两条硬红线**：
1. **撞「国内开箱即用」定位**：OSM 官方瓦片禁程序化批量取（Tile Usage Policy）、CARTO 2024 起收紧为企业/grant 限定、海外瓦片 CDN 国内基本需 VPN → 走海外快路国内会拿到白图。
2. **「免 key + 国内可达 + 合规 + 好看」四角全占，只有自托管栅格一条路（高成本）**。国内源（天地图/高德）有 GCJ-02 火星坐标偏移坑：WGS84 经纬度直接喂会偏移几十～上百米，需坐标转换。

**落地路径（若做 MVP）**：`staticmaps`（npm，MIT，纯 Node + sharp，**无需 API key、无需 Playwright**）→ 自定义栅格瓦片 URL 模板 + `addMarker`/`addLine`（接现有路线逻辑）→ 出 base PNG → 入 assets + SOURCES 记 © OpenStreetMap → engine 叠**现有朱砂 SVG 路线层**（真地图只换「抽象底」，最小侵入）→ 套暖墨 duotone 统一风格。**duotone 套真地图像素 = 与套照片完全一样（高可行）**，但底图要选低墨量无标签单色源（或 sharp 先去饱和）再叠，否则裸 OSM 彩色底 duotone 后很脏。

**署名红线**：城市/多 pin 图通常超出「<100 feature / <1万 m²」免署名豁免 → 必须**内嵌** `© OpenStreetMap`（图会脱离网页传播到小红书/公众号，不能靠页面 footer 兜底）。

**三档推荐**：① MVP = `staticmaps` + 免 key 栅格源 + sharp 去饱和 + duotone + 内嵌署名（中难度；但国内需代理、生产默认不能指 `tile.openstreetmap.org`）② 国内开箱 + 独家底图 = 自托管极简栅格（高难度，唯一四角全占，v2）③ 不做默认 = 裸拼 OSM 官方瓦片 / CARTO 直链 / 需用户自备 key 的托管 API。

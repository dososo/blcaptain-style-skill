# 图片 sourcing

## Intake 路线

如果选中的布局需要图片、截图或物件素材，而用户还没有提供素材，只问一次：

```text
这张卡需要一个主视觉素材。你想走哪条路线？

A. 你提供自己的实拍图 / 截图 / 产品图
B. 我生成一张纯图片素材，再放进卡片里
C. 我从公开图源找候选，确认后下载入库并记录 SOURCES.md
```

用户的选择决定路线：

1. A -> 用户提供素材。
2. B -> AI 生成纯图片素材。
3. C -> 公开图源候选与来源记录。

C 路线按以下顺序找：

1. Unsplash
2. Pexels
3. StockSnap CC0
4. Pixabay
5. NegativeSpace CC0
6. Kaboompics
7. Burst
8. rawpixel Public Domain
9. Flickr CC0 / Public Domain
10. Openverse CC0 / Public Domain
11. Wallhaven
12. 直接搜索取图

如果用户说“无版权要求”，优先：

```text
CC0 / Public Domain / 免费可商用且不强制署名
```

这不取消来源记录要求。所有外部素材都必须写入 `assets/SOURCES.md`。

不要把 CC BY 当成无需署名素材；只有可接受署名时才使用 CC BY。

对于精确产品、品牌、截图、地图、地点、游戏、电影或报告，优先使用官方或可信来源。

## 来源记录

每个外部图片都必须复制 / 下载到 `assets/`，并记录到：

```text
assets/SOURCES.md
```

行格式：

```text
hero-product.jpg <- https://example.com/source
```

成图内是否显示来源角标按内容场景决定；`SOURCES.md` 是强制的。

## 截图

截图必须可读，不能缩成装饰。

## 满铺图片

如果文字放在图片上或靠近图片：

- 先识别安静区。
- 只在必要时使用局部 tint。
- 设置 `object-position`。
- 不拉伸图片。

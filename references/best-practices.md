# 最佳实践

本文件记录当前项目采用的通用设计原则。它服务 Still Paper / Signal Proof，不替代具体合同和 gate。

技术 PASS 不等于视觉 PASS：只要内容理解、分页和版式没有锁住视觉节奏，build / render / validate 通过也会产出不能用的组图。机器 gate 只证明结构没坏，审美由人工确认。

## 1. 一页一个任务

- 小红书组图不是把长文切碎；每页必须有唯一任务。
- 封面负责第一眼主题和读者收益。
- 正文页必须在流程、对比、编号收益、提示、案例、行动之间切换节奏。
- 如果连续 3 页都只是列表或段落摘要，判定为版式不合格。

## 2. 套图节奏优先

- 6 页以上长组图必须有明确 page rhythm。
- 不能连续超过 2 页使用同一 layoutRole。
- 全 no_image 长组图仍需要图形结构：大数字、分隔线、流程、对比块、ledger、action grid。
- `no_image` 不是“纯文字堆叠”。

## 3. 可读性优先

- 手机缩略图下先看清标题和页面任务。
- 正文必须可读，行距和段间距必须大于普通网页段落。
- 对比度是可用性底线，不是装饰。
- Still Paper 可以柔和，但不能低对比到不可读。
- Signal Proof 可以密集，但截图和数字必须清楚。

参考原则：

```text
Material Design typography: type scale / hierarchy / readable rhythm
IBM Carbon typography: body, heading, code, label roles
Practical Typography line spacing: 行距是可读性的核心条件
Vignelli Canon: grid、discipline、scale、white space
```

## 4. 层级来自字体与空间

- 每张卡必须有明确阅读顺序。
- 一个主焦点压住全局：标题、图片、数字、截图、流程或证据结构。
- 大标题不能和密集正文抢同一层级。
- 中英混排要让 `.latin`、`.num`、`.mono` 有角色，不靠系统 fallback。
- 英文不是装饰，必须承担分类、标签、术语或节奏功能。

## 5. 密度是语气

- Still Paper：留白、纸感、克制、情绪和可收藏的阅读节奏。
- Signal Proof：证据、结构、截图、数据和可比较的信息层级。
- 信息带填满时，必须分组；分不清就失败。
- 内容集中在上半部、下半部空置且无主动留白理由，应判定为版式失败。

## 6. 截图、图片和图形结构都是证据

- 截图必须可读。
- 截图卡最多 2 个 callout。
- 框架只说明上下文，不抢焦点。
- mock 必须标注为 mock，不伪装真实证据。
- 没有图片时，也要用结构图形承接内容：编号、网格、分隔线、流程、对比、矩阵、ledger。

## 7. 产品与照片要有尺度

- 产品图必须足够大。
- 食物图要大、近、真实。
- 旅行 / 生活方式图必须有情绪和主体。
- 满铺图必须声明 `subject map`、`safe text zone`、`avoid zone`、`object-position`。

## 8. 图源是质量的一部分

生成图或外部图必须有：

```text
IMAGE_REQUESTS.md
SOURCES.md
```

公开图源按：

```text
cc0cn -> 泼辣有图 -> hippopx -> 别样网 -> Unsplash -> Pexels -> StockSnap CC0 -> Pixabay -> Kaboompics -> Flickr CC0 / Public Domain -> Openverse CC0 / Public Domain -> Wallhaven -> 直接搜索
```

## 9. 内部 meta 不得污染发布卡片

- `sourceRefs`、field source、UAT 状态、skill 名称、no external image 声明只能进入数据层、SOURCES、review report 或开发日志。
- 用户发布卡片上只展示对读者有帮助的内容。
- 如果卡面出现内部工程信息，判定为卡面信息污染、不合格。

## 10. 样张是 QA，不是装饰

一个视觉系统不能只靠说明成立。必须有真实渲染样张、validator、visual audit、人工视觉状态。

当前 `release:check` 证明工程健康；`release:ready` 才证明发布就绪。

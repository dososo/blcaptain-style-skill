# 实施流程

本文件定义 Agent 真正执行 BLCaptain Style Skill 时的生产路径。当前开发阶段已切到 `Phase 0.5 — 视觉校准重启`。

旧 `SP-C01 · Still Paper · Mist Field` 硬闸门仍作为发布阻塞记录保留，但不再作为当前开发推进路线。当前 7 张人工审阅图按用户反馈作为 `FAIL_VISUAL` 证据处理，不能进入发布候选。

技术 PASS 不等于视觉 PASS；视觉校准没有得到用户确认前，不得进入 SL-C02、Core 4、Core 8 或开源发布。

## Phase 0.5 — 视觉校准重启

当前最小动作不是继续绑定 SP-C01，也不是继续生成总览板，而是先锁定一个真实使用场景，并输出真实比例成图：

```text
一个真实平台和画幅：小红书 3:4 / 公众号封面对 / README hero / 截图教程卡
一个真实内容任务
真实图片 / 截图 / 数据
一张完整 PNG
```

用户只需要对真实成图做方向级反馈：

```text
有希望
不对
值得继续
淘汰
```

方向不对，继续停在 Phase 0.5；方向对，才围绕这张真实图进入单张精修。

## 固定 7 步

### 1. Intake

先抓 4 件事：

- 目标平台和画幅
- 风格系统与主题倾向
- 内容素材、标题、正文、截图或数据
- 用户是否已有图片、截图或产品图

无图且布局需要图片时，只问一次 A/B/C：

```text
A. 你提供自己的实拍图 / 截图 / 产品图
B. 我先用 AI 生成纯净写实摄影图
C. 我按 Unsplash -> Pexels -> StockSnap CC0 -> Pixabay -> Kaboompics -> Flickr CC0 / Public Domain -> Openverse CC0 / Public Domain -> Wallhaven -> 直接搜索取图，并写 SOURCES.md
```

不要二次劝导用户选 A。

### 2. Style & Theme

只能在当前批准系统中选择：

- `Still Paper`
- `Signal Proof`

当前可选主题：

- `SP-01 Mist Field`
- `SP-02 Warm Study`
- `SP-03 Coastal Quiet`
- `SP-04 Night Grain`
- `SP-05 Hearth & Table`
- `SL-01 Electric Blue`
- `SL-02 Graphite Mint`
- `SL-03 Safety Coral`
- `SL-04 Acid Lime`

`SL-05 Signal Noir` 仍是候选，未补视觉方向稿、用户确认、方向 map 激活和 gate 通过前，不得实现、不得选择、不得出模板。

`BC-01 Bridge Canvas` 只用于系统展示层，不用于普通内容卡。

### 3. Layout Contract Selection

先选布局合同，再写或压缩文案。

旧硬闸门曾只允许继续围绕：

```text
SP-C01 · Still Paper · Mist Field
```

现在先暂停旧 SP-C01 路线，进入视觉校准。Core 4 和 Core 8 仍不得提前扩展。布局选择必须能说明：

- 这张卡的唯一任务
- 标题和正文上限
- 图片角色
- 来源记录方式
- 是否需要满铺图主体避让
- 是否需要中英混排角色

### 4. Asset Prep

图片资产必须先准备，再进入渲染。

每个需要图片的任务必须生成：

```text
assets/IMAGE_REQUESTS.md
assets/SOURCES.md
```

公开图源顺序固定：

```text
Unsplash -> Pexels -> StockSnap CC0 -> Pixabay -> Kaboompics -> Flickr CC0 / Public Domain -> Openverse CC0 / Public Domain -> Wallhaven -> 直接搜索
```

图片必须落本地，来源必须写入 `SOURCES.md`。成图内是否显示来源，由用户或任务要求决定，但本地来源记录不可省略。

满铺图必须声明：

- 主体地图
- 文字安全区
- 避让区
- 遮罩 token
- `object-position`

### 5. Compose & Render

优先使用现有 CLI、engine、style/layout 系统，不新增不必要抽象。

生产链路：

```bash
node bin/blcaptain-style.mjs build <brief.json> --out <task-dir>
node render.mjs <task-dir>
```

渲染产物必须在 `output/` 下生成 PNG。

### 6. Gate & Review

自动 gate 默认要跑，不是“按需验证”。

单卡或任务目录常规验证：

```bash
npm run check
node scripts/asset-source-gate.mjs <task-dir>
node scripts/layout-geometry-gate.mjs <task-dir>
node render.mjs <task-dir>
node validate-social-deck.mjs <task-dir>
python3 scripts/visual-audit.py <task-dir>
```

当前 SP-C01 阶段验证：

```bash
npm run phase2:spc01:check
```

当前视觉校准验证：

```bash
npm run phase:calibration:check
```

发布工程健康验证：

```bash
npm run release:check
```

发布就绪验证：

```bash
npm run release:ready
```

人工视觉状态验证：

```bash
npm run manual:review
npm run manual:review:strict
```

`release:check` PASS 只代表工程健康；`release:ready` 才能证明发布就绪。当前 7 项已作为 `FAIL_VISUAL` 证据处理，`release:ready` 必须保持 BLOCKED。

### 7. Iterate

用户给反馈后，只在当前对象内迭代：

- `PASS`：记录状态，可进入下一硬闸门。
- `PASS_WITH_MINOR_TUNE`：只做小调优，再重新渲染和验证。
- `FAIL_VISUAL`：停在当前视觉对象内调方向，不进入下一阶段。
- `FAIL_ASSET`：重做图片资产和来源记录。
- `FAIL_CONTRACT`：回到布局合同，不直接改样式绕过。
- `FAIL_COPY`：重压文案，再走渲染和验证。
- `FAIL_SUBJECT_OCCLUSION` / `FAIL_CONTRAST` / `FAIL_CROP`：只针对满铺图主体避让、遮罩、裁切和安全区修正。

所有最终人工状态只能通过用户明确确认后写入：

```bash
npm run manual:set-status -- --id <ITEM_ID> --status <STATUS> --confirmed-by-user --note "<用户确认记录>"
```

不得手动伪造 `tasks/manual-review-status.json`。

## 当前人工阻塞项

以下旧发布阻塞项已作为 `FAIL_VISUAL` 证据处理；历史 `PENDING_USER_REVIEW` 语义只代表它们曾经卡在人工视觉确认：

- `SP-C01 Engine Binding`
- `Lake Girl Variant`
- `B AI Photo`
- `C Public Photo`
- `SP-TYPE-BI-01`
- `SL-TYPE-BI-01`
- `SP-FB-PROOF-01`

这些状态没有通过前，不得进入 SL-C02，不得扩 Core 4，不得宣称开源发布就绪。

## 参考边界

可以研究 业界优秀项目 和业界最佳实践中的流程、方法、质量门禁和产品化组织方式。

不得复制任何设计、代码、模板、CSS、配色、资产、布局 ID 或视觉身份。我们的视觉语言必须保持 `Still Paper` 和 `Signal Proof` 自身的合同约束。

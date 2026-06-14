# 主题预设

本文件定义当前可被用户选择、可被 Agent 推荐、可被样张使用的主题预设。

当前批准可选主题只有 9 套：

```text
SP-01 Mist Field
SP-02 Warm Study
SP-03 Coastal Quiet
SP-04 Night Grain
SP-05 Hearth & Table
SL-01 Electric Blue
SL-02 Graphite Mint
SL-03 Safety Coral
SL-04 Acid Lime
```

`BC-01 Bridge Canvas` 是系统展示层，只用于 README hero、产品总览、平台覆盖说明和方法论地图，不作为日常内容卡主题。

`SL-05 Signal Noir` 仍为候选主题，状态是 `candidate-needs-visual-direction-board`。在视觉方向稿、用户确认、`visual-direction-map` 激活和 gate 通过前，不得实现、不得出模板、不得进入生产样张。

技术 PASS 不等于视觉 PASS。主题合同只说明可以怎么做，最终是否进入下一阶段仍取决于人工视觉确认。

## 选择顺序

每个输出包都必须先确定：

```text
系统 -> 主题 -> 布局合同 -> 图片策略 -> 来源记录 -> 渲染与验证
```

不得让 Agent 自定义 hex 颜色；除非用户提供严格品牌色要求，否则必须从本文件主题中选择。

## Still Paper 主题

Still Paper 主题都服务于纸感、摄影、中文阅读和克制情绪。它们不是浅色模板，而是不同内容气质的合同。

### SP-01 Mist Field

定位：山野、户外、轻旅行、非虚构观察、慢下来、专注力、field note。

推荐使用：

- SP-C01 当前主样张
- 湖边、山野、森林、草地、道路、雾气
- 低冲突的人物背影或侧影
- 需要安静但仍有判断力的内容

Token：

```css
--bg: #F2F3EC;
--surface: #FFFFFA;
--fg: #1D241D;
--muted: #69705F;
--accent: #6F805D;
--subaccent: #C6D1B7;
--line: #D8DDCF;
--texture: paper-fiber-soft;
```

图片处理：

- 写实摄影优先
- 保留自然光和空气感
- 不用方向稿裁切图
- 人物不正面硬盯镜头
- 文字避开天空中心、脸部、手部动作和主要地平线

禁止：

- 城市科技截图
- 密集数据卡
- 霓虹高饱和
- 纯白无纸感
- 把图片当浅色背景铺一层字

### SP-02 Warm Study

定位：阅读笔记、创作者 diary、咖啡、书桌、home office、产品思考、公众号长文封面。

推荐使用：

- 书、纸、笔记本、咖啡、陶瓷、木桌
- 低照度窗光
- 温和但不甜腻的生活方式图
- 知识型作者的观点封面

Token：

```css
--bg: #F6F1E8;
--surface: #FFFDFC;
--fg: #1C1A18;
--muted: #746B61;
--accent: #8C5A3C;
--subaccent: #C9A184;
--line: #DDD2C5;
--texture: paper-warm-grain;
```

图片处理：

- 纸张和布料纹理可见但不能脏
- 食物、咖啡、桌面只做叙事锚点
- 标题区域保留干净留白
- 英文旁注要像轻声标记，不抢中文标题

禁止：

- 饱和橙色滤镜
- 过度摆拍的网红桌面
- 黑色技术面板
- 装饰物多到失焦

### SP-03 Coastal Quiet

定位：海边、湖泊、山、习惯、wellness、轻旅行、反思型封面。

推荐使用：

- 湖、海、天空、远山、潮湿空气
- 安静人物和大面积自然留白
- 蓝灰、浅绿、灰白自然光
- 适合“旧湖边女孩图”这类意境方向

Token：

```css
--bg: #F4F6F3;
--surface: #FFFFFF;
--fg: #1D2328;
--muted: #6A747B;
--accent: #7E9AA6;
--subaccent: #C7D7DD;
--line: #D8E0E3;
--texture: paper-cool-mist;
```

图片处理：

- 保留水面、天空和远景层次
- 文案避开人物头部和水平线焦点
- 不把蓝灰做成冰冷科技感
- 需要一点温度或纸感平衡冷色

禁止：

- 明信片式艳丽风景
- 硬科技 UI
- 暗黑游戏图
- 食物暖调主题误用

### SP-04 Night Grain

定位：电影评论、游戏 essay、夜间观察、暗色内容封面、城市夜景、低光反思。

推荐使用：

- 夜街、雨、阴影、低光室内
- 电影感静帧或自有版权素材
- 强焦点、少文案、高对比
- 不需要 Signal Proof 证据结构的夜间内容

Token：

```css
--bg: #141312;
--surface: #1E1C1A;
--fg: #F2EAD9;
--muted: #B9AA94;
--accent: #D0A164;
--subaccent: #766245;
--line: #3A332C;
--texture: night-grain;
```

图片处理：

- 暗部保留细节
- 金色只做少量锚点
- 大标题必须可读
- 不能靠大面积发光遮盖构图

禁止：

- 霓虹堆叠
- 游戏海报化
- 长段正文
- 灰字过小不可读

### SP-05 Hearth & Table

定位：美食、咖啡、家、厨房、慢生活、餐桌场景。

推荐使用：

- 面包、咖啡、水果、陶瓷、木桌、亚麻
- 有食欲但克制的食物摄影
- 家居生活方式、餐桌笔记
- 温暖但仍有出版感的中文封面

Token：

```css
--bg: #F7EFE3;
--surface: #FFFDF8;
--fg: #211914;
--muted: #7A6758;
--accent: #A8653F;
--subaccent: #D9B08A;
--line: #E2D2C0;
--texture: table-linen;
```

图片处理：

- 食物主体要足够大
- 保留可用负空间
- 暖色不能糊成一片
- 页脚和来源保持轻，不破坏食欲

禁止：

- 没食欲的食物图
- 食物很小、背景很大
- 过度奶油色
- 干净到像电商白底图

## Signal Proof 主题

Signal Proof 主题服务于证据、截图、数据、流程和判断。它们不是一个科技卡换色，而是不同证据类型的合同。

### SL-01 Electric Blue

定位：AI 工具、产品教程、方法论、快速入门、流程解释。

推荐使用：

- 清晰软件 UI
- 基础教程
- 步骤卡
- 产品能力解释
- 需要明显蓝色锚点的工具内容

Token：

```css
--bg: #F6F7FA;
--surface: #FFFFFF;
--fg: #15181D;
--muted: #6C7580;
--accent: #2F5EA7;
--subaccent: #AFC2DE;
--line: #DCE3EE;
--grid: #E7EDF5;
--dark: #12161D;
--texture: ledger-grid-light;
```

图片处理：

- 截图必须真实且可读
- 蓝色用于编号、验证标签、关键路径
- 网格只做秩序，不做装饰
- 适合新手快速理解

禁止：

- 泛蓝白科技模板
- 机器人、芯片、抽象光效
- 蓝色模块过多
- 截图比装饰还小

### SL-02 Graphite Mint

定位：截图教程、产品 walkthrough、界面证据、工作流证明、Agent 操作记录。

推荐使用：

- browser frame
- UI 截图
- 操作路径
- 工作流证据
- 需要“我真的做过”的证明卡

Token：

```css
--bg: #F6F5F1;
--surface: #FFFFFF;
--fg: #171A1D;
--muted: #6D7680;
--accent: #4A7A74;
--subaccent: #B8D4CF;
--line: #DCE3E1;
--grid: #E5ECEA;
--dark: #141817;
--texture: proof-paper;
```

图片处理：

- 截图区域优先级最高
- 来源、时间或上下文至少有一项可查
- callout 最多两个
- 薄荷色只标证据点，不大面积铺满

禁止：

- 假 dashboard
- 截图墙纸化
- 小到不可读的 UI
- 圆角模块堆满

### SL-03 Safety Coral

定位：KPI、数据复盘、年度总结、增长复盘、内容表现、风险节点。

推荐使用：

- hero metric
- 数据复盘
- 增长、收入、内容表现
- 有“结论先行”的报告卡
- 需要温和提醒或风险提示的内容

Token：

```css
--bg: #F7F4F0;
--surface: #FFFFFF;
--fg: #171515;
--muted: #746B67;
--accent: #E56A4B;
--subaccent: #F3C7BA;
--line: #E5D9D4;
--grid: #EFE5E1;
--dark: #161514;
--texture: data-grid-soft;
```

图片处理：

- 指标数量少而准
- 每组数据必须带结论
- 珊瑚色做提示和关键数字
- 不把红色做成警报风

禁止：

- 数据 dump
- 假数字
- 多个指标同权重
- 小字低对比

### SL-04 Acid Lime

定位：工具对比、checklist、决策树、选择框架、购买建议、高行动感清单。

推荐使用：

- 选择题
- 对比表
- verdict block
- checklist
- “选哪个、怎么做、先做什么”的内容

Token：

```css
--bg: #F5F7EF;
--surface: #FFFFFF;
--fg: #151715;
--muted: #6E7369;
--accent: #A6C833;
--subaccent: #DCE9A8;
--line: #DDE5CC;
--grid: #E7ECD8;
--dark: #151713;
--texture: ledger-grid-light;
```

图片处理：

- 酸性黄绿只做行动锚点
- 选择结果要一眼能看出
- 表格行列数量必须克制
- 不适合长文叙事

禁止：

- 大面积荧光
- 无结论对比
- 清单太长
- 主题色压过内容

## 系统展示层

`BC-01 Bridge Canvas` 用于解释 Skill 能力、平台覆盖和视觉系统关系。

推荐使用：

- README hero
- 产品总览
- 平台覆盖说明
- 方法论地图
- Still Paper 与 Signal Proof 的桥接说明

禁止：

- 日常内容卡
- 单篇文章封面
- 截图教程
- 数据复盘卡

## 候选主题状态

`SL-05 Signal Noir` 当前只保留为候选研究方向。

状态：

```text
candidate-needs-visual-direction-board
```

潜在缺口：

- 模型评测
- Benchmark
- 系统架构
- 故障复盘
- 安全分析
- 代码 Agent 工作流
- 日志分析
- 黑盒观察

未满足以下条件前不得实现：

1. 生成独立视觉方向稿。
2. 用户明确确认方向。
3. 更新 `references/visual-direction-map.json`。
4. 通过视觉方向 gate。
5. 再写独立主题合同和样张。

## 选择规则

1. 叙事、情绪、生活方式、摄影封面，选 Still Paper。
2. 证据、截图、数据、流程、工具教程，选 Signal Proof。
3. 食物和家居优先 `SP-05 Hearth & Table`，除非本质是经营数据复盘。
4. 湖边、海边、旅途、开阔自然图，优先 `SP-03 Coastal Quiet` 或 `SP-01 Mist Field`。
5. 电影、游戏、夜间反思，当前只选 `SP-04 Night Grain`，不启用候选深色证据主题。
6. 数据复盘选 `SL-03 Safety Coral`；若核心是截图证明，可选 `SL-02 Graphite Mint`。
7. 截图教程选 `SL-02 Graphite Mint` 或 `SL-01 Electric Blue`。
8. 工具对比、购买建议、决策清单选 `SL-04 Acid Lime`。
9. 不因为颜色好看而选主题；必须因为卡片任务和内容证据类型匹配。

# 小红书封面质量线

小红书封面必须先通过缩略图阅读，再谈高级感。当前项目仍在 `SP-C01 · Still Paper · Mist Field` 阶段；这里是平台质量参考，不代表可以提前扩展 Core 4。

## 阻塞条件

- 缩略图看不清标题。
- 证明图片或截图太小。
- 文字很优雅但没有钩子。
- 截图证据被当装饰。
- Still Paper 过度空泛，看不出内容价值。
- Signal Proof 像企业 PPT，而不是 feed-native 证据卡。
- 图片没有 `IMAGE_REQUESTS.md` / `SOURCES.md`。
- 技术 PASS 不等于视觉 PASS，人工状态仍是 `PENDING_USER_REVIEW`。

## 缩略图测试

在 25% 尺寸下，用户仍应能判断：

1. 这是什么。
2. 为什么值得点。
3. 有没有证据。

## 强度分级

```text
1 = 安静 Still Paper
2 = 高级解释型
3 = 强社交卡
4 = feed-native 强钩子
5 = 高冲击爆点
```

小红书封面多数应在 3-4。5 只用于健身结果、游戏影视、强技巧或明确爆点，不作为 Still Paper 默认目标。

## 文字规则

- 主标题建议 6-18 个中文字符。
- 主标题尽量不超过 3 行。
- 忙背景必须使用安全文字区、局部底板或换图。
- 小 meta 不压在照片细节上。

## 图片规则

- 人脸、食物、产品、UI 证据或前后对比区域必须足够大。
- 用 `object-position` 做有意图的裁切。
- 有真实证明图时，不用抽象 AI 插画替代。
- 满铺图必须声明 `subject map`、`safe text zone`、`avoid zone`。

## 技术创作者适配

AI / Codex / Claude Code / Agent 内容优先走 Signal Proof：

- 截图必须可读。
- 命令、结果或 UI 状态尽量出现在第一张。
- 最多 2 个 callout。
- 不用假 3D 机器人当教程证据。
- 未通过 SP-C01 人工视觉前，不得进入 SL-C02。

# 视觉成熟度模型

本 Skill 按四个等级判断成熟度。

当前结论：

```text
工程成熟度：接近 L3
发布状态：未发布就绪
阻塞原因：SP-C01 人工视觉仍是 PENDING_USER_REVIEW
```

## L1 — 能运行

- 能从 JSON brief 构建 HTML。
- 能渲染 PNG。
- 至少有少量固定版式。

## L2 — 稳定

- 有固定版式合同。
- 有主题 token。
- 有图片来源记录。
- 有结构验证脚本。
- 有基础 visual audit。

## L3 — 产品级工程

- 有多个真实场景样张。
- 有 gallery contact sheet。
- 有静态和渲染审计。
- 有 CI workflow。
- 有 fallback renderer。
- 有明确 art direction 约束。
- 有 `release:check` 工程健康检查。

当前项目工程侧已接近 L3，但这不等于可以发布。

## L4 — 独特且稳定

- 有强视觉身份。
- Still Paper 和 Signal Proof 明显不是同一套模板换色。
- 有内容到风格的清晰路由。
- 有风格级 QA 规则。
- 有 curated visual assets。
- 有真实用户样张反馈。
- 有人工视觉状态闭环。
- `release:ready` 可通过。

当前项目尚未达到 L4，因为 SP-C01 / 图片 / 字体 / 满铺图仍缺人工视觉确认。

## 当前硬闸门

进入下一阶段前必须满足：

```bash
npm run manual:review
npm run manual:review:strict
npm run release:ready
```

`release:check` 只说明工程健康。`release:ready` 才说明发布就绪。

## 审美标准

- 文本必须可读，且有足够对比。
- 间距应保持稳定节奏。
- 字体层级必须说明阅读顺序。
- 布局必须把注意力导向最重要内容。
- 截图必须作为证据，而不是装饰。
- 图片主体不能被标题、遮罩、贴纸或 callout 压住。
- 技术 PASS 不等于视觉 PASS。

## 当前禁止事项

- 不得进入 SL-C02。
- 不得扩 Core 4。
- 不得声明发布就绪。
- 不得把 `PENDING_USER_REVIEW` 视作通过。
- 不得用工程分数替代人工审美判断。

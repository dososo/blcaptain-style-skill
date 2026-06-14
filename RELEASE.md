# 发布检查清单

本清单用于打 tag 或公开发布前检查。

当前状态：

```text
工程健康：通过 release:check
发布就绪：仍必须通过 release:ready（人工视觉确认前保持阻塞）
视觉系统：三套视觉语言（Still Paper / Signal Proof / Bridge Canvas）已落地
固化资产：Still Paper 9 张封面母体（SP-01 Mist Field R01–R08）sha256 锁定保护，不再覆盖
```

技术 PASS 不等于视觉 PASS。机器 gate 只证明工程健康，人工视觉确认才是最终发布闸门。

## 1. 安装与基础检查

```bash
npm install
npx playwright install chromium
npm run check
npm run test:gates
```

## 2. 构建与渲染样张

```bash
node bin/blcaptain-style.mjs demo
npm run render:demo:all
```

单个任务也可以走标准链路（智能驱动：先写 brief.json，再 build → render → validate）：

```bash
node bin/blcaptain-style.mjs build <brief.json> --out <deck>
node bin/blcaptain-style.mjs render <deck>
node bin/blcaptain-style.mjs validate <deck>
```

## 3. 视觉与质量检查

```bash
python3 scripts/visual-audit.py examples/generated
python3 scripts/quality-score.py examples/generated
```

工程质量线：

- `visual-audit` 无 blocking failure。
- `quality-score` 为 PASS。
- 渲染样张齐全、对比联系图存在。

## 4. 工程健康检查

```bash
npm run release:check
```

`release:check` 只证明工程健康。它不替代人工视觉确认，也不代表发布就绪。

## 5. 人工视觉检查（最终闸门）

```bash
npm run manual:review
node bin/blcaptain-style.mjs review-refresh
```

逐张检查：

- 是否有明确焦点、标题是否足够大。
- 截图是否可读、图片主体是否被文字遮挡。
- 是否有无意义装饰、页脚 / 正文是否碰撞、是否有低对比小字。
- 三套视觉语言是否各有身份，而不是同一套换色模板。

## 6. 最终发布就绪

```bash
npm run release:ready
npm run release:ready -- --json
```

`release:ready` 必须通过后才能打 tag 或发布；因人工视觉未确认而退出 1，是正确的闸门行为。

## 发布判断

可以进入发布前准备：

- `release:check` PASS。
- `release:ready` PASS。
- 人工视觉确认完成，没有不合格项。

不得发布：

- 人工视觉尚未确认，或存在不合格项。
- `release:ready` 退出 1。

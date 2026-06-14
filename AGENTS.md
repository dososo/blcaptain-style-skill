# AGENTS.md

## Mission

Develop and use BLCaptain Style Skill as a real, open-source visual generation skill.

## Hard rules

- Do not copy code, templates, assets, CSS, or layout IDs from any upstream project.
- Follow the fixed-layout pipeline.
- Use the existing CLI and style/layout system before adding new abstractions.
- Keep examples runnable.

## Development commands

```bash
npm install
npx playwright install chromium
npm run demo
npm run render:agent
npm run validate:agent
npm run check
```

## What “done” means

A card/deck is not done until:

1. It builds from a JSON brief.
2. It renders PNGs via Playwright.
3. Each poster has fixed dimensions.
4. At least one validation pass is possible.
5. Image sources are tracked if external images are used.

## Aesthetic bar

The output must have:

- A clear focal point.
- One primary visual rhythm per deck.
- A restrained color system.
- Defined typography hierarchy.
- Sufficient white/negative space.
- Screenshots large enough to read.
- Decoration only when it supports meaning.

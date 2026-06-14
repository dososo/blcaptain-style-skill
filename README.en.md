# BLCaptain Style Skill

[中文](README.md) · **English**

![BLCaptain Style — Still Paper / Signal Proof / Bridge Canvas](docs/hero-sample.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-c8553d.svg)](LICENSE) ![Node](https://img.shields.io/badge/Node-%3E%3D20-2b2622.svg) ![Claude Code](https://img.shields.io/badge/Claude%20Code-supported-d98e3a.svg) ![Codex](https://img.shields.io/badge/Codex-supported-6b5e4d.svg)

> **Install**: tell your Claude Code / Codex — "Install this Skill: `github.com/dososo/blcaptain-style-skill`"

A visual card-generation Skill (Claude Code / Codex) for Chinese content creators — Xiaohongshu / Rednote 3:4 verticals, WeChat covers, social cards, AI-tool tutorials, screenshot-evidence cards.

It is **intelligence-driven**: Claude reads the content, makes the judgment calls, hand-writes a structured `brief.json`, then a deterministic engine renders it to PNG. Understanding belongs to Claude; deterministic rendering + quality gates belong to code. **The AI never free-styles a layout** — given a validated skeleton, its job drops from "design" to "fill in," and output stability jumps.

The moat isn't "it can make a card." It's that it **rules out the vast majority of choices that would turn ugly** — type scale, whitespace ratio, contrast thresholds, line-break rules, palette roles, signature image recipes, all baked into code as constants.

## Three visual languages

Each has a one-line soul, not a recolored skin:

- **Still Paper** — distill content into a warm paper note (life / essay / emotion / travel / reading). Warm paper + Song serif + cinnabar + generous whitespace.
- **Signal Proof** — verify content into trustworthy evidence; *the interface is the evidence layer, so the reader believes the process* (tech / AI / data / work). Cream archival paper + electric blue + VERIFIED stamp.
- **Bridge Canvas** — connect content into a cross-platform unified expression (multi-format 3:4 / 1:1 / 16:9). Cinematic full-bleed + letterbox.

**Signature image recipes**: Still Paper warm-ink duotone / Signal electric-blue tri-tone + riso halftone / Bridge teal-gold split-tone + **haze** atmospheric blur — the same real photo becomes "an image only we can produce": instantly recognizable, un-copyable, never a generic stock look.

## Gallery

See more in [`docs/gallery/`](docs/gallery/). Three languages, sharply distinct, instantly recognizable.

<p>
<img src="docs/gallery/04-still-paper-haze.png" width="30%" />
<img src="docs/gallery/03-signal-data.png" width="30%" />
<img src="docs/gallery/05-bridge-noir.png" width="30%" />
</p>

## Install

```bash
npm install
npx playwright install chromium
```

Requires Node >= 20.

## Quickstart

```bash
node bin/blcaptain-style.mjs build <brief.json> --out <deck>
# cover imageRequest throws if no image → fetch & backfill first:
node bin/blcaptain-style.mjs image-fetch <urls.json> --out <deck>/assets --brief <brief.json>
node bin/blcaptain-style.mjs render <deck>
```

Multi-platform: set `brief.meta.format` to `square` / `wide` to emit 1:1 / 16:9 from the same content.

## Non-Negotiables

Negative boundaries = the real expertise. No purple/blue/orange/pink gradients · no centered symmetry · no all-rounded floating cards · no emoji · keep a handmade trace · culture-sourced color. Every page needs one ≥3:1 hero scale-contrast (a title/figure in the ≥80px giant band), the rest recedes. Still Paper keeps ≥40% whitespace. One accent color (~5%); no pure white/black. Image-first: full-bleed photo as the first signal, signature duotone/haze on top. Real photos / screenshots / CC0 first; AI imagery is a fallback only. Never print internal codes / demo data on user cards. **Technical PASS ≠ visual PASS** — human visual review is the final gate.

## Not for

Fan/idol content · pure hard-sell ads · tutorials over 12 screens. A Skill that does everything usually does nothing well.

## Non-copying

We study and learn the *productization process / fixed-layout thinking / render pipeline / verification discipline* of excellent social-card projects — but **never copy** their design, code, templates, CSS, assets, palette, layout IDs, or visual identity. BLCaptain must form its own Still Paper / Signal Proof / Bridge Canvas aesthetic.

## License

MIT

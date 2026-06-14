# IMAGE_REQUESTS.md

Generated for v1 Core 4 production binding.

## Intake choice used in this demo

B. AI-generated image assets.

## Production behavior

If a user provides no images and the chosen layout requires images, ask once:

A. 你提供自己的实拍图 / 截图 / 产品图
B. 我先用 AI 生成概念图
C. 我按 Unsplash → Pexels → Flickr CC → Wallhaven → 直接搜索取图，并写 SOURCES.md

## Cards

### SP-C01 Editorial Cover

- image role: emotional hero image
- file: assets/sp-c01-landscape.png
- object-position: center 58%
- production provider order: user → AI → Unsplash → Pexels → Flickr CC → direct search

### SP-C02 Essay Split

- image role: tactile still-life / object image
- file: assets/sp-c02-still-life.png
- object-position: center 52%
- production provider order: user → AI → Unsplash → Pexels → Flickr CC → direct search

### SL-C01 Proof Statement

- image role: no external image; workflow structure is HTML/CSS
- production provider order: user → AI diagram → direct search

### SL-C02 Screenshot Proof

- image role: screenshot evidence
- file: assets/sl-c02-screenshot.png
- object-position: center 50%
- production provider order: user screenshot → AI UI mock → direct search

## Source-label note

Ask user whether visible source labels should appear in final cards. Keep SOURCES.md regardless.

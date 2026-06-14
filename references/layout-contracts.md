# Layout Contracts

This file contains implementation-level contracts.

A layout contract is stricter than a recipe. It defines exact zones, type limits, asset requirements, and validation rules.

## SP-C01 Editorial Cover — Frame Contract v1

### Purpose

Still Paper editorial cover for Xiaohongshu 3:4.

This layout is image-led but keeps the main title outside the image to avoid unsafe text-over-photo failure.

### Canvas

```yaml
canvas:
  width: 1080
  height: 1440
  format: xhs
  ratio: 3:4
```

### Zones

All values in px.

```yaml
zones:
  meta:
    x: 64
    y: 48
    w: 952
    h: 50

  title:
    x: 64
    y: 130
    w: 800
    h: 178

  lead:
    x: 64
    y: 322
    w: 700
    h: 56

  details:
    x: 64
    y: 394
    w: 952
    h: 34

  image:
    x: 64
    y: 460
    w: 952
    h: 720

  bottom_note:
    x: 64
    y: 1216
    w: 952
    h: 82

  footer:
    x: 64
    y: 1350
    w: 952
    h: 42
```

### Typography

```yaml
title:
  max_chars: 16
  max_lines: 2
  manual_break_required: true
  font_size: 76
  line_height: 1.10
  letter_spacing: -0.018em
  overflow: hidden
  no_single_character_line: true

lead:
  max_chars: 32
  max_lines: 2
  font_size: 23
  line_height: 1.52
  overflow: hidden

details:
  font_size: 15
  max_items: 5

bottom_note:
  max_lines: 2
  font_size: 17

footer:
  max_groups: 3
  font_size: 13
```

### Image requirements

```yaml
image:
  required: true
  role: emotional hero image
  min_display_area_percent: 45
  object_position: center 58%
  text_over_image: false_for_main_title
  allowed_inside_image:
    - small caption only
    - optional non-essential vertical note
  disallowed:
    - embedded poster layout
    - embedded title
    - watermark
    - logo
    - report-board crop
    - dense UI
```

### Asset requirements

Task must include:

```text
assets/IMAGE_REQUESTS.md
assets/SOURCES.md
assets/hero-sp-c01.jpg
```

### Validation rules

Blocking failures:

- title overflows title zone
- title has more than 2 visual lines
- lead overflows lead zone
- image missing
- image zone missing
- footer collides with image or bottom note
- `SOURCES.md` missing
- `IMAGE_REQUESTS.md` missing

Warnings:

- image is not a pure asset
- object-position missing
- typography fallback not verified
- image source is AI-generated and not user-approved for production

### Human review checklist

Ask:

1. Is the title fully visible?
2. Does the title spacing feel calm?
3. Does the image feel high quality?
4. Is the image integrated with the paper surface?
5. Is the card closer to Still Paper direction boards than previous samples?
6. Would this embarrass the user if posted?

### Current status

This contract must be implemented in:

```text
local-tests/sp-c01-contract/
```

Do not abstract into production engine until visual review passes.

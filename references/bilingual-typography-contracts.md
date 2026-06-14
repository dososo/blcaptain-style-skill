# Bilingual Typography Contracts

Date: 2026-05-31

## Purpose

This contract defines how Chinese and English typography must work together for the two approved visual systems:

- `Still Paper`
- `Signal Proof`

The goal is not to pick attractive fonts in isolation. The goal is to make Chinese headlines, English labels, numbers, screenshots, image tone, and background textures feel like one deliberate design language.

2026-06-01 update:

```text
This contract is not enough if it only proves bilingual labels.
The visual system must also prove English-led and English-only cards.
Typography must feel authored, not ordinary, not generic, and not fallback-driven.
```

## Core Problem

Chinese fonts often contain Latin glyphs. If a CSS font stack puts the Chinese font first, English text may render through the Chinese font and lose its intended English voice.

Therefore mixed Chinese / English typography must use:

- Latin-first font stacks for roles that include English.
- Explicit `.latin`, `.num`, and `.mono` spans when a role needs stricter control.
- Target font availability checks before visual acceptance.

Technical PASS is not visual PASS if the intended fonts are missing.

Language modes:

```text
LANG-CN   Chinese-led
LANG-MIX  Chinese / English mixed
LANG-EN   English-only or English-led
```

All three modes must be shown in Phase 0.5 before production font binding.

## Source Policy

Preferred fonts must be open-source or system-safe.

Do not bundle font files until license and redistribution policy are explicitly verified.

Reference sources:

- Noto CJK: `https://github.com/notofonts/noto-cjk`
- Noto licensing: `https://github.com/notofonts/notofonts.github.io`
- Source Serif 4: `https://fonts.adobe.com/fonts/source-serif-4`
- Newsreader: `https://github.com/productiontype/Newsreader`
- IBM Plex: `https://github.com/IBM/plex`
- Inter: `https://github.com/rsms/inter`

## Still Paper — SP-TYPE-01

Name:

```text
Paper Serif / Field Sans
```

Design intent:

```text
中文是内容主声部；英文像刊物边注、日期、系列名、地点和节奏标记。
```

Still Paper must not look like a SaaS UI, a generic beige template, or fake luxury typography.

### Display

Use for:

- Chinese cover title
- short English phrase inside title
- quote lead

Preferred stack:

```css
--sp-display:
  "Source Serif 4",
  "Newsreader",
  "Source Han Serif SC",
  "Noto Serif CJK SC",
  "Songti SC",
  "STSong",
  Georgia,
  serif;
```

Reasoning:

- Source Serif 4 gives Latin text a literary but restrained editorial shape.
- Newsreader can be used as a warmer alternate for reading-led covers and quote-led layouts.
- Source Han Serif / Noto Serif CJK / Songti provide the Chinese Song/Ming structure needed for Still Paper.

Rules:

- Chinese title remains primary.
- English inside title should be visually quieter than Chinese unless the card is intentionally English-led.
- Latin display should not become Didot-style fashion typography.
- Avoid excessive italics; Still Paper uses texture and spacing for mood, not decorative type tricks.

Limits:

```text
Chinese title: 72–82px for SP-C01
Latin inside Chinese title: 0.86–0.94em optical size
Line-height: 1.08–1.16
Weight: 560–700
Letter spacing: -0.02em to 0
```

### Body / Lead

Preferred stack:

```css
--sp-body:
  "IBM Plex Sans",
  "Source Han Sans SC",
  "Noto Sans CJK SC",
  "PingFang SC",
  "Noto Sans",
  system-ui,
  sans-serif;
```

Reasoning:

- IBM Plex Sans gives English labels a human, editorial note quality without becoming generic app UI.
- Source Han Sans / Noto Sans CJK / PingFang keep Chinese lead readable and calm.

Rules:

- Lead text should be sans, not serif, to avoid a page becoming too literary or heavy.
- English in lead should read as annotation, not product slogan.
- Body must remain clear over paper fiber and mist grain.

Limits:

```text
Lead: 22–26px
Line-height: 1.45–1.60
Weight: 380–520
Letter spacing: 0
```

### Metadata / Footer / Numbers

Preferred stack:

```css
--sp-label:
  "IBM Plex Sans",
  "Source Han Sans SC",
  "Noto Sans CJK SC",
  "PingFang SC",
  system-ui,
  sans-serif;

--sp-num:
  "IBM Plex Sans",
  "Source Han Sans SC",
  "Noto Sans CJK SC",
  "PingFang SC",
  system-ui,
  sans-serif;
```

Rules:

- Use tabular numbers for dates and issue markers.
- Uppercase English labels are allowed but must stay quiet.
- Labels can use positive tracking, but Chinese text should not be over-tracked.

Limits:

```text
Metadata: 13–16px
Footer: 12–15px
Tracking for uppercase Latin: 0.08em–0.15em
Tracking for Chinese: 0–0.04em
```

### Image / Texture Fit

Still Paper with realistic photography:

- Use Source Serif 4 / Songti-style display when the image is quiet and spacious.
- If the image is information-heavy, lower title weight and increase surrounding negative space.
- Do not place delicate serif captions directly over detailed photo texture.

Still Paper with paper fiber:

- Keep small English labels sans.
- Avoid thin serif at 14px over grain.
- Use line-height and margin instead of decorative type changes.

## Signal Proof — SL-TYPE-01

Name:

```text
Evidence Sans / Ledger Mono
```

Design intent:

```text
中文负责判断；英文负责系统标签、证据标记、工具名、数据单位和可信度。
```

Signal Proof must not look like generic blue-white SaaS, fake dashboard, or futuristic tech poster.

### Display

Use for:

- proof statement
- screenshot proof title
- workflow headline

Preferred stack:

```css
--sl-display:
  "IBM Plex Sans",
  Inter,
  "Source Han Sans SC",
  "Noto Sans CJK SC",
  "PingFang SC",
  "Noto Sans",
  system-ui,
  sans-serif;
```

Reasoning:

- IBM Plex Sans gives a research / technical report voice and avoids pure generic SaaS tone.
- Inter is a strong fallback for screen clarity, but should not be the only identity.
- Source Han Sans / Noto Sans CJK / PingFang keep Chinese proof statements stable.

Rules:

- Large titles should be medium weight, not heavy bold.
- English tool names can stay in Latin display, but they should not overpower the Chinese claim.
- Avoid serif display in Signal Proof unless a future approved sub-theme explicitly needs it.

Limits:

```text
Display: 64–90px
Line-height: 0.94–1.06
Weight: 500–620
Letter spacing: -0.04em to -0.01em for Latin-heavy titles
Chinese tracking: 0
```

### Body / Callout

Preferred stack:

```css
--sl-body:
  "IBM Plex Sans",
  Inter,
  "Source Han Sans SC",
  "Noto Sans CJK SC",
  "PingFang SC",
  "Noto Sans",
  system-ui,
  sans-serif;
```

Rules:

- Body text must support evidence scanning.
- Use short labels, grouped facts, and clear hierarchy.
- Do not create dense essay paragraphs inside Signal Proof cards.

Limits:

```text
Body: 22–28px
Callout heading: 24–32px
Callout body: 18–22px
Line-height: 1.30–1.45
```

### Data / Code / Proof Labels

Preferred stack:

```css
--sl-mono:
  "IBM Plex Mono",
  "SFMono-Regular",
  Consolas,
  "Roboto Mono",
  monospace;

--sl-num:
  "IBM Plex Sans",
  Inter,
  "Source Han Sans SC",
  "Noto Sans CJK SC",
  system-ui,
  sans-serif;
```

Rules:

- Use mono for proof IDs, timestamps, short command fragments, log labels, and screenshot metadata.
- Use tabular numbers for metrics.
- Do not fake logs or fake code.
- Do not use decorative mono for body copy.

Limits:

```text
Proof label: 13–16px
Timestamp/source: 13–16px
Hero metric: 52–96px
Support metric: 24–40px
```

### Screenshot / Grid Fit

Signal Proof with screenshots:

- English labels should act like instrument labels.
- Mono should be sparse: proof IDs, timestamps, commands, not paragraphs.
- Text must not compete with screenshot legibility.

Signal Proof with grid texture:

- Sans and mono work better than serif.
- Avoid ultra-light weights on grid backgrounds.
- Use contrast and alignment before adding decoration.

## Theme-Level Adjustments

### Still Paper

```text
SP-01 Mist Field:
  Latin should be quiet, pale, metadata-like.
  Source Serif 4 display + IBM Plex Sans labels.

SP-02 Warm Study:
  Newsreader can be warmer for reading-led English fragments.
  Avoid overly sharp fashion serif.

SP-03 Coastal Quiet:
  Keep Latin lighter and more open.
  Avoid dense uppercase labels.

SP-04 Night Grain:
  Serif display can be slightly stronger.
  Small labels need more contrast because dark grain eats thin strokes.

SP-05 Hearth & Table:
  Avoid cute rounded Latin.
  Keep English like recipe note / table note, not cafe branding.
```

### Signal Proof

```text
SL-01 Electric Blue:
  IBM Plex Sans + Inter fallback.
  Clear product tutorial tone.

SL-02 Graphite Mint:
  IBM Plex Sans + IBM Plex Mono.
  Strongest fit for screenshot proof.

SL-03 Safety Coral:
  Numbers need tabular setting and medium weight.
  Coral should not make type feel like alert UI.

SL-04 Acid Lime:
  Use mono sparingly.
  Keep checklist labels sharp but not loud.

SL-05 Signal Noir:
  Candidate only.
  If later approved, IBM Plex Mono can take a larger role, but no neon cyberpunk styling.
```

## CSS Role Proposal

Production layouts should eventually expose:

```css
.poster[data-system="still-paper"] {
  --font-display: var(--sp-display);
  --font-body: var(--sp-body);
  --font-label: var(--sp-label);
  --font-num: var(--sp-num);
}

.poster[data-system="signal-ledger"] {
  --font-display: var(--sl-display);
  --font-body: var(--sl-body);
  --font-label: var(--sl-body);
  --font-num: var(--sl-num);
  --font-mono: var(--sl-mono);
}

.latin { font-family: var(--font-display); }
.label { font-family: var(--font-label); }
.num { font-family: var(--font-num); font-variant-numeric: tabular-nums; }
.mono { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
```

Do not implement this globally until typography proof cards are rendered and reviewed.

## Acceptance Gate

Before production adoption, create bilingual typography proof cards:

```text
SP-TYPE-BI-01
SL-TYPE-BI-01
SP-TYPE-LANG-01
SL-TYPE-LANG-01
```

Each proof must include:

- Chinese-only headline
- mixed Chinese / English headline
- English-only headline
- English-led hierarchy where English is the primary voice
- English metadata labels
- date / version / issue number
- short Chinese lead
- background texture active
- one realistic Still Paper image sample
- one Signal Proof screenshot / proof sample

Validation:

```bash
npm run check
node render.mjs local-tests/bilingual-typography
python3 scripts/visual-audit.py local-tests/bilingual-typography
```

Manual review must answer:

```text
1. Does English feel intentional rather than fallback?
2. Does Chinese remain primary for Chinese audience cards?
3. Do numbers align optically?
4. Does the font still work over texture and image?
5. Does each system have a separate voice?
6. Does the English-only version still look like BLCaptain, not a generic English template?
7. Does the type feel distinctive without becoming decorative or hard to read?
```

Do not bind runtime font changes before this proof passes.

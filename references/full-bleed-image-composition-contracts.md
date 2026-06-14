# Full-Bleed Image Composition Contracts

Date: 2026-05-31

## Purpose

Some visual direction boards use image-led or full-bleed cards. These cannot be handled by simply enlarging a photo.

Full-bleed cards must protect:

- image mood
- subject integrity
- face / body / product / UI readability
- text readability
- Still Paper or Signal Proof identity

This contract extracts workflow-level discipline from excellent open-source methods, but defines BLCaptain's own visual language and acceptance rules.

## Core Rule

Before placing text on or near a full-bleed image, the task must define:

```text
image role
subject map
safe text zones
avoid zones
quiet zone ratio
light quality
no-mask attempt
title canvas ratio
object-position
overlay token
overlay peak alpha
crop strategy
thumbnail check
fallback plan
```

If any item is missing, the card is not ready for render.

## 选图先于遮罩

本项目借鉴公开 image-overlay 规则里的流程纪律，不复制它的视觉实现。

使用遮罩前，图片必须先通过：

```text
quiet zone ratio >= 0.30
light quality 属于克制、低饱和、自然光
no-mask attempt 已先尝试
title canvas ratio <= 0.40
thumbnail check 不能失败
```

如果这些条件失败，应换图、把文字移出图片、改用照片井，或切到 paper / ledger panel。不得用加重遮罩掩盖失败裁切。

## Subject Map

Every full-bleed image needs a simple subject map.

Schema:

```yaml
subject_type:
  human | face | product | food | landscape | ui | vehicle | object | abstract
subject_position:
  top-left | top | top-right | center-left | center | center-right | bottom-left | bottom | bottom-right
subject_bbox:
  x: 0-100
  y: 0-100
  w: 0-100
  h: 0-100
visual_weight:
  low | medium | high
quiet_zones:
  - top-left
  - left
  - bottom-right
avoid_zones:
  - face
  - eyes
  - hands
  - logo
  - dense-ui-text
  - food-focal-area
```

This can be estimated manually. It does not need computer vision for v1.

## Text Safe Zones

Use a 3 x 3 grid for quick decisions:

```text
top-left      top       top-right
center-left   center    center-right
bottom-left   bottom    bottom-right
```

Rules:

- Put display title only in a declared safe zone.
- Never place title over a face, eyes, product logo, car front, food focal area, or dense UI text.
- Avoid placing small labels over detailed texture.
- If no safe zone exists, use a paper panel or choose another image.

## Overlay Tokens

### image-soft-mask

Use:

- general readability support
- atmospheric landscape
- low-contrast photo

Rules:

- Low opacity.
- Should not look like a black veil.
- Best for Still Paper landscape and quiet photography.

### image-local-scrim

Use:

- title zone needs contrast
- subject is elsewhere

Rules:

- Apply only behind text.
- Do not darken the whole image.
- Must preserve image mood.
- Must use an image-toned color, not pure black.
- Peak alpha should stay between `0.15` and `0.30`.
- If readability needs alpha above `0.40`, reject the image or move text off-image.

### image-bottom-fade

Use:

- title, footer, or source label sits near bottom
- bottom area is already quiet

Rules:

- Fade must stop before subject zone.
- Do not hide object edges or body silhouettes.

### image-side-paper-panel

Use:

- no clean quiet zone exists
- text needs editorial paper surface
- Still Paper full-bleed / image-led cover

Rules:

- Panel must feel like paper, not SaaS card.
- Panel must not cover the main subject.
- Keep panel edge soft or tactile only when Still Paper requires it.

### image-ledger-panel

Use:

- Signal Proof image-led proof or screenshot-led cover
- text needs evidence frame beside image

Rules:

- Rectilinear.
- Low radius.
- Clear line token.
- Never cover UI proof text.

## Crop Strategy

Every full-bleed image must declare one:

```text
center-crop
subject-left
subject-right
subject-bottom
negative-space-top
negative-space-left
negative-space-right
manual-crop-required
reject-image
```

Rules:

- `object-position` is mandatory.
- If subject is too close to edge and cannot be repaired by object-position, reject the image.
- Do not keep iterating on one fundamentally wrong crop.
- 21:9 and 1:1 require separate composition decisions; never crop one blindly from the other.

## System-Specific Rules

### Still Paper

Full-bleed Still Paper should feel like:

```text
quiet editorial photograph
field note over image
paper and image breathing together
```

Allowed:

- large landscape with sky / lake / wall as quiet zone
- small human figure as mood anchor
- paper side panel
- soft localized mask

Forbidden:

- commercial travel poster
- heavy black cinematic veil unless `SP-04 Night Grain`
- title over face
- saturated stock photo
- busy branches behind small text
- image so strong that paper system disappears

### Signal Proof

Full-bleed Signal Proof should feel like:

```text
evidence wall
interface proof
technical scene with structured annotation
```

Allowed:

- screenshot as evidence if UI remains readable
- proof panel beside image
- callout outside image or on quiet edge
- mono proof label in safe area

Forbidden:

- screenshot as decorative wallpaper
- title over UI text
- fake dashboard background
- neon tech poster
- more than 2 callouts on image-led proof

## Image Acceptance Checklist

Before render:

```text
1. Is there one clear subject?
2. Is the subject map written?
3. Is the title safe zone written?
4. Is object-position written?
5. Is the overlay token written?
6. Does the image survive 3:4 crop?
7. Does the crop preserve face / body / product / UI?
8. 图片是否至少有 30% 安静区？
9. 是否先尝试过无遮罩排版？
10. 标题是否少于 40% 画布面积？
11. 360px 缩略图下是否仍可读？
12. Does the text support the image rather than fighting it?
13. If this image were removed from the card, would the card lose its mood?
14. If the text were removed from the card, would the image still be beautiful?
```

Fail if any of 1-11 is no.

## IMAGE_REQUESTS.md Addendum

For full-bleed cards, add:

```yaml
full_bleed:
  enabled: true
  subject_type:
  subject_position:
  subject_bbox:
  visual_weight:
  safe_text_zones:
  avoid_zones:
  quiet_zone_ratio:
  light_quality:
  no_mask_attempted:
  title_canvas_ratio:
  crop_strategy:
  object_position:
  overlay_token:
  overlay_peak_alpha:
  thumbnail_check:
  fallback:
```

## Manual Review States

Use:

```text
PASS
PASS_WITH_MINOR_TUNE
FAIL_VISUAL
FAIL_ASSET
FAIL_SUBJECT_OCCLUSION
FAIL_CONTRAST
FAIL_CROP
FAIL_CONTRACT
```

`FAIL_SUBJECT_OCCLUSION`, `FAIL_CONTRAST`, and `FAIL_CROP` block progression.

## Implementation Note

Do not bind a new full-bleed layout until:

```text
1. contract exists
2. IMAGE_REQUESTS.md includes subject map
3. rendered proof exists
4. visual audit passes
5. user manually confirms
```

# Still Paper Theme Contracts

## Purpose

Still Paper is the system for calm, tactile, editorial, image-led social cards.

It must not collapse into generic beige templates, SaaS cards, or cold engineering boards.

## Theme list

Approved themes:

```text
SP-01 Mist Field
SP-02 Warm Study
SP-03 Coastal Quiet
SP-04 Night Grain
SP-05 Hearth & Table
```

## SP-01 Mist Field

Use for:

```text
山野 / 户外 / 轻旅行 / 非虚构观察 / 慢下来 / 专注力 / field note
```

Palette:

```text
bg       #F2F3EC
surface  #FFFFFA
fg       #1D241D
muted    #69705F
accent   #6F805D
accent2  #C6D1B7
line     #D8DDCF
```

Texture:

```text
paper-fiber-soft, mist grain, low-contrast natural fiber
```

Image treatment:

```text
forest, field, hiking road, cloudy landscape, lake/mountain, clean photograph, no embedded typography
```

Layout tone:

```text
quiet field note, centered image discipline, restrained metadata, enough negative space
```

Anti-patterns:

```text
urban tech screenshot, dense data card, neon colors, direction-board crop as hero, generic white card
```

## SP-02 Warm Study

Use for:

```text
阅读笔记 / creator diary / 咖啡 / 书桌 / home office / 产品思考 / 长文封面
```

Palette:

```text
bg       #F6F1E8
surface  #FFFDFC
fg       #1C1A18
muted    #746B61
accent   #8C5A3C
accent2  #C9A184
line     #DDD2C5
```

Texture:

```text
paper-warm-grain, soft desk paper, low warm fiber
```

Image treatment:

```text
paper, notebook, coffee, books, ceramic, fabric, wood, soft window light
```

Layout tone:

```text
warm study note, intimate but not cute, editorial and readable
```

Anti-patterns:

```text
cold dashboard, saturated photo, black UI panels, decorative stationery overload
```

## SP-03 Coastal Quiet

Use for:

```text
海边 / 湖泊 / 山 / 习惯 / wellness / reflective Xiaohongshu covers
```

Palette:

```text
bg       #F4F6F3
surface  #FFFFFF
fg       #1D2328
muted    #6A747B
accent   #7E9AA6
accent2  #C7D7DD
line     #D8E0E3
```

Texture:

```text
paper-cool-mist, cool air grain, low blue-gray paper
```

Image treatment:

```text
sea, lake, misty mountain, open sky, quiet human figure, blue-gray natural light
```

Layout tone:

```text
open, breathable, reflective, light but not empty
```

Anti-patterns:

```text
hard tech UI, dark game art, warm food palette, postcard cliché
```

## SP-04 Night Grain

Use for:

```text
电影评论 / 游戏 essay / 夜间观察 / 暗色 editorial cover / cinematic reflections
```

Palette:

```text
bg       #141312
surface  #1E1C1A
fg       #F2EAD9
muted    #B9AA94
accent   #D0A164
accent2  #766245
line     #3A332C
```

Texture:

```text
night-grain, dark paper, low-light editorial grain
```

Image treatment:

```text
night street, film still, game key art, shadow, rain, low-light still life
```

Layout tone:

```text
cinematic, restrained, high contrast, less copy, strong focal image
```

Anti-patterns:

```text
long paragraphs, weak contrast, casual lifestyle posts, neon cyberpunk excess
```

## SP-05 Hearth & Table

Use for:

```text
美食 / 咖啡 / home / kitchen / slow lifestyle / table scenes
```

Palette:

```text
bg       #F7EFE3
surface  #FFFDF8
fg       #211914
muted    #7A6758
accent   #A8653F
accent2  #D9B08A
line     #E2D2C0
```

Texture:

```text
table-linen, warm paper, subtle textile grain
```

Image treatment:

```text
food close-up, cafe table, ceramic, bread, fruit, coffee, linen and wood textures
```

Layout tone:

```text
warm table note, appetite-aware, tactile, calm domestic editorial
```

Anti-patterns:

```text
unappetizing food image, tiny food photo, overly clean tech look, excessive beige flatness
```

## Hard rule

Every Still Paper output must declare:

```text
system
theme
board
layout
image role
source role
```

Do not render generic Still Paper without a theme contract.

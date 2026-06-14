# Brand and Attribution Contract

## Purpose

This file defines how brand names, author handles, dates, locations, and image sources are handled in development samples and production output.

## Core rule

Never invent user identity, brand name, account handle, image source, date, location, or attribution text in production output.

## Development samples

Development samples may use BLCaptain placeholders, including:

- `BLCaptain Style`
- `Still Paper`
- `Signal Proof`
- `@blcaptain`
- `爆裂队长`
- demo dates
- demo locations

But every development sample must be understood as a sample.

Development examples must not imply that these values should be hardcoded into production templates.

## Production output

Production values must come from one of:

1. user-provided brief
2. uploaded source material
3. explicit metadata file
4. task configuration
5. sourced asset record such as `SOURCES.md`

If none is provided, the renderer should:

- omit the field, or
- use neutral placeholder text only in draft mode, or
- ask the user if the field is necessary

## Field rules

### Brand

Allowed in production only if:

```text
brief.meta.brand
card.brand
task config brand
```

Do not default to `BLCaptain Style` for user-facing production exports.

### Author / handle

Allowed in production only if:

```text
brief.meta.author
brief.meta.handle
card.author
card.handle
```

Do not invent `@blcaptain`, `@user`, or random handles.

### Image source

Must come from:

```text
assets/SOURCES.md
card.image.source
brief.assets
```

If source is unknown:

- keep source note in `SOURCES.md` as `unknown / pending`
- do not show visible source label in card unless user approves

### Date

Allowed if:

```text
brief.meta.date
card.date
task requested date
```

If absent, omit or use generated date only in development sample.

### Location

Allowed if:

```text
user provided location
content explicitly mentions location
source material includes location
```

Do not invent city, country, scenic area, shop, restaurant, or venue.

### Footer

Production footer should be assembled from real metadata.

Example:

```text
brand / author / source / date / version
```

If values are missing, footer should become simpler, not fake.

## Template implementation rule

Templates must use variables:

```text
{{brand}}
{{author}}
{{handle}}
{{date}}
{{location}}
{{sourceLabel}}
```

or equivalent data fields.

Templates must not hardcode demo names in production layouts.

## Report requirement

Every implementation report must state:

```text
Brand/attribution source:
- demo placeholder
- user provided
- SOURCES.md
- omitted
```

## Failure cases

Fail visual/production QA if:

- production image contains hardcoded `@blcaptain` without user request
- production image contains fake image source
- production image invents a location
- production image invents a brand
- production image shows demo metadata as if real

## Safe default

When uncertain:

```text
omit the attribution from the card
preserve details in SOURCES.md
ask user whether visible attribution is needed
```

# Geometry Contracts

## Purpose

Geometry is contract-aware.

The geometry gate must not force every layout to be symmetric.

Instead, each layout declares its own geometry mode.

## Why

SP-C01 is a symmetric editorial cover, so strict left/right inset is correct.

Other layouts may be intentionally asymmetric:

- image-led cover
- screenshot proof
- moodboard collage
- data cards
- comparison tables

A gate should catch accidental drift, not kill intentional design.

## Source file

```text
references/geometry-contracts.json
```

## Modes

### symmetric-inset

Use when the layout should share the same left and right margins across major zones.

Example:

```text
SP-C01 Editorial Cover
```

Checks:

```text
left margin = poster width - left - width
diff <= tolerance
```

### declared-zones

Use when the layout is asymmetric but each zone has declared bounds.

Example:

```text
SL-C02 Screenshot Proof
```

Checks:

```text
actual left/right match declared left/right within tolerance
```

### freeform-with-bounds

Use when internal arrangement is intentionally irregular.

Example:

```text
SP-E05 Moodboard Story
```

Checks:

```text
required zones exist
zones stay inside poster bounds
footer remains safe
```

## Rule

Freedom happens when choosing the correct geometry mode.

Inside a chosen mode, the contract is strict.

## Current SP-C01 rule

SP-C01 uses:

```json
{
  "mode": "symmetric-inset",
  "requiredZones": [".image-zone", ".bottom-note-zone", ".footer-zone", ".meta-zone", ".details-zone"],
  "tolerancePx": 2
}
```

## Future requirement

Every new layout contract should include a geometry mode before implementation.

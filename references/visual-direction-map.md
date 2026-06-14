# Visual Direction Map

## Purpose

This file maps every production layout task to one approved visual direction board.

It prevents the project from drifting away from the selected direction after multiple iterations.

## Source of truth

```text
references/visual-direction-map.json
```

## Current SP-C01 lock

```text
Layout: SP-C01
Primary board: 01 — Still Paper · Mist Field
System: Still Paper
Theme: SP-01 Mist Field
```

## Rule

If a task says it is SP-C01 but claims:

```text
Coastal Quiet
Signal Proof
Bridge Canvas
```

without an explicit approved pivot report, the visual direction gate should fail.

## Why this matters

The project already has many visual directions.

The goal is not to collapse them into one style, and not to let one card drift randomly across styles.

Each output must declare:

- board
- system
- theme
- layout
- asset workflow
- geometry contract

## When a pivot is allowed

A pivot is allowed only if the report explains:

1. why the previous board failed
2. why the new board fits the content and asset direction
3. which internal documents were followed
4. which gates were re-run

Example:

```text
SP-C01 pivoted from 03 Coastal Quiet to 01 Mist Field after repeated hero image failures.
```

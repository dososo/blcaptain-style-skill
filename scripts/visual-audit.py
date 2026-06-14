#!/usr/bin/env python3
"""
Visual smoke audit for rendered PNG samples.

This is intentionally conservative. It does not claim to judge taste,
but it catches common production failures:
- missing images
- wrong aspect ratios
- near-blank renders
- extremely low visual variance
- tiny files
"""

from __future__ import annotations

import sys
import time
from pathlib import Path

try:
    from PIL import Image, ImageStat
except ModuleNotFoundError:
    Image = None
    ImageStat = None

EXPECTED = {
    "xhs": 1080/1440,
    "xpost": 1080/1920,
    "xfeed": 1800/900,
    "square": 1,
    "wide": 2100/900,
    "xcover": 1500/600,
}

def infer_expected(path: Path) -> tuple[str, float]:
    name = path.name
    if "wide" in name:
        return "wide", EXPECTED["wide"]
    if "xfeed" in name:
        return "xfeed", EXPECTED["xfeed"]
    if "xpost" in name:
        return "xpost", EXPECTED["xpost"]
    if "square" in name:
        return "square", EXPECTED["square"]
    return "xhs", EXPECTED["xhs"]

def load_rgb(path: Path, attempts: int = 3, delay: float = 0.15) -> Image.Image:
    if Image is None:
        raise RuntimeError("Pillow is not installed")

    last_error: Exception | None = None
    for attempt in range(attempts):
        try:
            im = Image.open(path).convert("RGB")
            im.load()
            return im
        except Exception as exc:  # Pillow raises several subclasses for partial PNG streams.
            last_error = exc
            if attempt < attempts - 1:
                time.sleep(delay)
    assert last_error is not None
    raise last_error

def audit_file(path: Path) -> dict:
    try:
        im = load_rgb(path)
    except Exception as exc:
        return {
            "file": str(path),
            "kind": "unreadable",
            "size": "unreadable",
            "ratio": "n/a",
            "expected": "n/a",
            "mean": "n/a",
            "stddev": "n/a",
            "file_kb": round(path.stat().st_size / 1024, 1),
            "ok": False,
            "issues": [f"unreadable image: {type(exc).__name__}: {exc}"],
        }

    w, h = im.size
    ratio = w / h
    kind, expected = infer_expected(path)
    ratio_ok = abs(ratio - expected) < 0.04

    stat = ImageStat.Stat(im.resize((160, 160)))
    mean = sum(stat.mean) / 3
    std = sum(stat.stddev) / 3

    # A very rough measure: strong blank pages tend to have tiny stddev.
    variance_ok = std > 8
    file_ok = path.stat().st_size > 20_000

    ok = ratio_ok and variance_ok and file_ok
    return {
        "file": str(path),
        "kind": kind,
        "size": f"{w}x{h}",
        "ratio": round(ratio, 3),
        "expected": round(expected, 3),
        "mean": round(mean, 1),
        "stddev": round(std, 1),
        "file_kb": round(path.stat().st_size / 1024, 1),
        "ok": ok,
        "issues": [
            *([] if ratio_ok else [f"aspect ratio mismatch: {ratio:.3f} vs {expected:.3f}"]),
            *([] if variance_ok else [f"low visual variance: {std:.1f}"]),
            *([] if file_ok else [f"file too small: {path.stat().st_size} bytes"]),
        ],
    }

def main() -> int:
    root = Path(sys.argv[1] if len(sys.argv) > 1 else "examples/generated")
    files = sorted(root.glob("**/output/*.png"))
    if not files:
        print("FAIL no rendered PNG files found")
        return 1

    rows = [audit_file(f) for f in files]
    fails = [r for r in rows if not r["ok"]]

    print("# Visual Audit\n")
    print(f"Rendered PNGs: {len(rows)}")
    print(f"Blocking failures: {len(fails)}\n")
    for r in rows:
        status = "PASS" if r["ok"] else "WARN"
        print(f"{status} {Path(r['file']).name} | {r['size']} | ratio={r['ratio']} | std={r['stddev']} | {r['file_kb']}KB")
        for issue in r["issues"]:
            print(f"  - {issue}")

    return 0 if not fails else 1

if __name__ == "__main__":
    raise SystemExit(main())

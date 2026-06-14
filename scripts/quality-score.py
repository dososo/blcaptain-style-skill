#!/usr/bin/env python3
"""
Opinionated visual quality scoring for rendered samples.

This does not replace human taste. It catches production readiness signals:
- rendered file existence
- aspect ratio correctness
- visual variance
- density balance
- edge safety
- approximate contrast distribution
- scenario coverage
"""
from __future__ import annotations
import sys, json, statistics, math
from pathlib import Path
from PIL import Image, ImageStat, ImageOps

EXPECTED = {
    "xhs": 1080/1440,
    "square": 1.0,
    "wide": 2100/900,
    "xcover": 1500/600,
}

def infer_kind(path: Path):
    n = path.name.lower()
    if "wide" in n:
        return "wide", EXPECTED["wide"]
    if "square" in n or "matrix" in n or "feature" in n:
        return "square", EXPECTED["square"]
    return "xhs", EXPECTED["xhs"]

def luminance(rgb):
    r,g,b = [v/255 for v in rgb]
    def f(c): return c/12.92 if c <= .03928 else ((c+.055)/1.055)**2.4
    return .2126*f(r)+.7152*f(g)+.0722*f(b)

def contrast(a,b):
    l1,l2 = sorted([luminance(a), luminance(b)], reverse=True)
    return (l1+.05)/(l2+.05)

def edge_safety(im):
    w,h = im.size
    thumb = im.resize((200, int(200*h/w)))
    w,h = thumb.size
    gray = ImageOps.grayscale(thumb)
    # compare edge stddev against center; too much edge noise often means content hugs border
    edge = Image.new("L", gray.size, 0)
    px = edge.load()
    margin = max(8, min(w,h)//14)
    for y in range(h):
        for x in range(w):
            if x < margin or x > w-margin or y < margin or y > h-margin:
                px[x,y] = gray.getpixel((x,y))
    center_crop = gray.crop((margin, margin, w-margin, h-margin))
    e_std = ImageStat.Stat(edge).stddev[0]
    c_std = ImageStat.Stat(center_crop).stddev[0]
    if c_std == 0:
        return 0.5
    ratio = e_std / c_std
    return max(0, min(1, 1.15 - ratio))

def band_density(im):
    gray = ImageOps.grayscale(im.resize((160, 220)))
    w,h = gray.size
    scores = []
    for i in range(4):
        crop = gray.crop((0, int(i*h/4), w, int((i+1)*h/4)))
        scores.append(ImageStat.Stat(crop).stddev[0])
    dense_bands = sum(1 for s in scores if s > 35)
    # 2 dense bands is usually good; 4 means everything screams.
    return 1.0 if dense_bands <= 3 else 0.65

def file_score(path: Path):
    im = Image.open(path).convert("RGB")
    w,h = im.size
    ratio = w/h
    kind, expected = infer_kind(path)
    ratio_score = max(0, 1 - abs(ratio-expected)/0.08)
    small = im.resize((180, max(1, int(180*h/w))))
    stat = ImageStat.Stat(small)
    std = sum(stat.stddev)/3
    variance_score = max(0, min(1, (std-8)/22))
    size_score = max(0, min(1, path.stat().st_size/90000))
    edge_score = edge_safety(im)
    density_score = band_density(im)

    # approximate contrast by using 10th and 90th percentile grayscale
    gray = list(ImageOps.grayscale(small).getdata())
    gray.sort()
    lo = gray[int(len(gray)*.10)]
    hi = gray[int(len(gray)*.90)]
    contrast_score = max(0, min(1, (hi-lo)/95))

    # Edge noise is useful, but decorative paper/grain backgrounds can produce
    # false negatives, so it is a secondary signal rather than a gatekeeper.
    quiet_minimal_bonus = 0.10 if (variance_score < .35 and size_score > .85 and ratio_score > .95) else 0
    score = (
        ratio_score*.18 +
        variance_score*.18 +
        size_score*.13 +
        edge_score*.08 +
        density_score*.16 +
        contrast_score*.22 +
        quiet_minimal_bonus
    ) * 100

    return {
        "file": str(path),
        "kind": kind,
        "size": f"{w}x{h}",
        "ratio_score": round(ratio_score*100,1),
        "variance_score": round(variance_score*100,1),
        "size_score": round(size_score*100,1),
        "edge_score": round(edge_score*100,1),
        "density_score": round(density_score*100,1),
        "contrast_score": round(contrast_score*100,1),
        "score": round(score,1),
    }

def main():
    root = Path(sys.argv[1] if len(sys.argv)>1 else "examples/generated")
    files = sorted(root.glob("**/output/*.png"))
    if not files:
        print("FAIL no PNG samples found")
        return 1
    rows = [file_score(f) for f in files]
    avg = statistics.mean(r["score"] for r in rows)
    worst = min(rows, key=lambda r: r["score"])
    scenario_count = len({Path(r["file"]).parts[-3] for r in rows})
    pass_threshold = avg >= 66 and worst["score"] >= 50 and scenario_count >= 6 and len(rows) >= 21
    print("# Quality Score\n")
    print(f"Samples: {len(rows)}")
    print(f"Scenarios: {scenario_count}")
    print(f"Average score: {avg:.1f}")
    print(f"Worst score: {worst['score']} ({Path(worst['file']).name})")
    print(f"Sample gate: {len(rows)} >= 21")
    print(f"Scenario gate: {scenario_count} >= 6")
    print(f"Gate: {'PASS' if pass_threshold else 'FAIL'}\n")
    for r in rows:
        print(f"{r['score']:5.1f} {Path(r['file']).name:28s} {r['size']:12s} edge={r['edge_score']:4.0f} contrast={r['contrast_score']:4.0f} density={r['density_score']:4.0f}")
    out = root / "quality-score.json"
    out.write_text(json.dumps({"average": avg, "worst": worst, "rows": rows, "pass": pass_threshold}, ensure_ascii=False, indent=2), encoding="utf-8")
    return 0 if pass_threshold else 1

if __name__ == "__main__":
    raise SystemExit(main())

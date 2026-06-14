#!/usr/bin/env python3
"""
Fallback renderer for environments where Playwright browser binaries are unavailable.

It extracts each <section class="poster ..."> from index.html, renders it as a PDF
page with WeasyPrint, then converts the page to PNG with PyMuPDF.

This is not the primary renderer. Playwright remains the recommended path.
"""
from __future__ import annotations

import re
import sys
import tempfile
from pathlib import Path

from weasyprint import HTML
import fitz

DIMS = {
    "xhs": (1080, 1440),
    "square": (1080, 1080),
    "wide": (2100, 900),
    "xcover": (1500, 600),
}

def resolve_index(arg: str) -> Path:
    p = Path(arg).resolve()
    return p if p.suffix == ".html" else p / "index.html"

def poster_dim(section: str) -> tuple[int, int]:
    m = re.search(r'class="([^"]+)"', section)
    classes = (m.group(1).split() if m else [])
    for key, dim in DIMS.items():
        if key in classes:
            return dim
    return DIMS["xhs"]

def poster_name(section: str, idx: int) -> str:
    m = re.search(r'data-name="([^"]+)"', section)
    return m.group(1) if m else f"{idx+1:02d}"

def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: python scripts/render-weasyprint.py <task-dir-or-index.html>", file=sys.stderr)
        return 2

    index = resolve_index(sys.argv[1])
    task_dir = index.parent
    out_dir = task_dir / "output"
    out_dir.mkdir(parents=True, exist_ok=True)

    html = index.read_text(encoding="utf-8")
    style_match = re.search(r"<style>([\s\S]*?)</style>", html)
    style = style_match.group(1) if style_match else ""
    posters = re.findall(r'<section\s+class="poster\b[\s\S]*?</section>', html)

    if not posters:
        print("No poster sections found", file=sys.stderr)
        return 1

    with tempfile.TemporaryDirectory(prefix="blcaptain-weasy-") as tmp:
        tmp = Path(tmp)
        for i, section in enumerate(posters):
            name = poster_name(section, i)
            width, height = poster_dim(section)
            doc = f"""<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
@page {{ size: {width}px {height}px; margin: 0; }}
{style}
html, body {{
  margin: 0 !important;
  padding: 0 !important;
  width: {width}px;
  height: {height}px;
  overflow: hidden;
  background: transparent !important;
  display: block !important;
}}
body {{ display: block !important; }}
.poster {{ margin: 0 !important; box-shadow: none !important; }}
* {{ animation: none !important; transition: none !important; }}
</style>
</head>
<body>{section}</body>
</html>"""
            pdf_path = tmp / f"{name}.pdf"
            png_path = out_dir / f"{name}.png"
            HTML(string=doc, base_url=str(task_dir)).write_pdf(str(pdf_path))
            pdf = fitz.open(str(pdf_path))
            page = pdf[0]
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
            pix.save(str(png_path))
            print(f"Rendered {width}x{height}: {png_path}")
            pdf.close()

    return 0

if __name__ == "__main__":
    raise SystemExit(main())

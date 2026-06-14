#!/usr/bin/env python3
from __future__ import annotations
import sys
from pathlib import Path
from PIL import Image, ImageDraw

def main():
    root = Path(sys.argv[1] if len(sys.argv)>1 else "examples/generated")
    files = sorted(root.glob("**/output/*.png"))
    if not files:
        print("No rendered PNGs")
        return 1
    cell_w, cell_h = 460, 500
    cols = 4
    rows = (len(files)+cols-1)//cols
    sheet = Image.new("RGB", (cols*cell_w, rows*cell_h), "#e5e7eb")
    for i,p in enumerate(files):
        im = Image.open(p).convert("RGB")
        im.thumbnail((420,420))
        card = Image.new("RGB",(cell_w,cell_h),"#f8fafc")
        x=(cell_w-im.width)//2; y=24+(400-im.height)//2
        card.paste(im,(x,y))
        d=ImageDraw.Draw(card)
        label = "/".join(p.parts[-4:-1]) + "/" + p.name
        d.text((18,448),label,fill="#111827")
        sheet.paste(card,((i%cols)*cell_w,(i//cols)*cell_h))
    out = root / "gallery-contact-sheet.png"
    sheet.save(out)
    print(out)
    return 0
if __name__ == "__main__":
    raise SystemExit(main())

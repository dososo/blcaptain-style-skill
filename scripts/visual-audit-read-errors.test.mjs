import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

function hasPillow() {
  try {
    execFileSync("python3", ["-c", "from PIL import Image"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

test("visual audit reports unreadable PNG paths instead of crashing with traceback", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "blcaptain-visual-audit-"));
  const outputDir = path.join(root, "case", "output");
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, "broken.png"), "not-a-valid-png");

  let output = "";
  let exitCode = 0;
  try {
    execFileSync("python3", ["scripts/visual-audit.py", root], {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"]
    });
  } catch (error) {
    exitCode = error.status;
    output = `${error.stdout ?? ""}${error.stderr ?? ""}`;
  }

  assert.equal(exitCode, 1);
  assert.match(output, /WARN broken\.png/);
  assert.match(output, /unreadable image/);
  assert.doesNotMatch(output, /Traceback/);
});

test("visual audit does not infer square format from matrix layout names", { skip: !hasPillow() }, () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "blcaptain-visual-audit-matrix-"));
  const outputDir = path.join(root, "case", "output");
  const pngPath = path.join(outputDir, "vp02-06-judgment-matrix.png");
  fs.mkdirSync(outputDir, { recursive: true });

  execFileSync("python3", ["-c", `
from PIL import Image, ImageDraw
im = Image.new("RGB", (2160, 2880), (242, 243, 236))
draw = ImageDraw.Draw(im)
for y in range(0, 2880, 16):
    c = 206 + (y // 16) % 24
    draw.line((0, y, 2160, y), fill=(c, c + 2, c - 8))
for i in range(16):
    x = 120 + i * 120
    draw.rectangle((x, 380 + i * 12, x + 72, 2140 - i * 18), fill=(90 + i * 4, 108 + i * 3, 84 + i * 2))
im.save(${JSON.stringify(pngPath)})
`]);

  const output = execFileSync("python3", ["scripts/visual-audit.py", root], {
    cwd: process.cwd(),
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });

  assert.match(output, /PASS vp02-06-judgment-matrix\.png/);
  assert.doesNotMatch(output, /aspect ratio mismatch/);
});

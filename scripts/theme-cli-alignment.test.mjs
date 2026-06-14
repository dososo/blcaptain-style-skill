import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

function runThemesCli() {
  return execFileSync(process.execPath, ["bin/blcaptain-style.mjs", "themes"], {
    cwd: process.cwd(),
    encoding: "utf8"
  });
}

test("themes CLI defaults to current approved PRD themes", () => {
  const output = runThemesCli();

  for (const themeName of [
    "SP-01 Mist Field",
    "SP-02 Warm Study",
    "SP-03 Coastal Quiet",
    "SP-04 Night Grain",
    "SP-05 Hearth & Table",
    "SL-01 Electric Blue",
    "SL-02 Graphite Mint",
    "SL-03 Safety Coral",
    "SL-04 Acid Lime"
  ]) {
    assert.match(output, new RegExp(themeName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.doesNotMatch(output, /editorial-/);
  assert.doesNotMatch(output, /swiss-/);
  assert.doesNotMatch(output, /Ink Classic|Indigo Porcelain|Safety Orange|Lemon Green/);
});

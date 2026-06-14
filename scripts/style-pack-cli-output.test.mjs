import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { STYLE_PACKS } from "../src/stylePacks.mjs";

function runStylePacksCli() {
  return execFileSync(process.execPath, ["bin/blcaptain-style.mjs", "style-packs"], {
    cwd: process.cwd(),
    encoding: "utf8"
  });
}

test("style-packs CLI shows PRD visual system and theme for every pack", () => {
  const output = runStylePacksCli();

  for (const pack of STYLE_PACKS) {
    assert.match(output, new RegExp(`- ${pack.id}\\b`));
    assert.match(output, new RegExp(`visual: ${pack.visualSystem}; theme: ${pack.theme}`));
  }

  assert.doesNotMatch(output, /visual: XHS Native|visual: Quiet Current|visual: Signal Grid|visual: Product Theatre/);
  assert.doesNotMatch(output, /theme: xhs-|theme: editorial-|theme: swiss-/);
});

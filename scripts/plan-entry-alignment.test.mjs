import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CURRENT_STYLE_ALIASES = new Set([
  "sp-mist",
  "sp-warm",
  "sp-coastal",
  "sp-night",
  "sp-hearth",
  "sl-blue",
  "sl-mint",
  "sl-coral",
  "sl-lime"
]);

function runCli(args) {
  return execFileSync(process.execPath, ["bin/blcaptain-style.mjs", ...args], {
    cwd: process.cwd(),
    encoding: "utf8"
  });
}

test("help examples use current PRD style aliases instead of legacy styles", () => {
  const output = runCli(["--help"]);

  assert.match(output, /--style sp-mist/);
  assert.doesNotMatch(output, /glass-metro|editorial-|swiss-|Quiet Current|Signal Grid/);
});

test("plan defaults to a current approved PRD style alias", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "blcaptain-plan-entry-"));
  const out = path.join(tmp, "brief.json");

  runCli(["plan", "examples/source-article.md", "--out", out, "--format", "xhs", "--cards", "2"]);

  const brief = JSON.parse(fs.readFileSync(out, "utf8"));
  assert.equal(CURRENT_STYLE_ALIASES.has(brief.meta.style), true, `unexpected style: ${brief.meta.style}`);
  assert.notEqual(brief.meta.style, "glass-metro");
});

test("user-facing plan docs and sample script avoid legacy style defaults", () => {
  const files = [
    "README.md",
    "SKILL.md",
    "references/production-workflow.md",
    "package.json"
  ];

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    assert.doesNotMatch(text, /--style glass-metro|style glass-metro|"plan:sample":.*glass-metro/, file);
  }
});

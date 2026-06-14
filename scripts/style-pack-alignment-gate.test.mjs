import test from "node:test";
import assert from "node:assert/strict";
import { STYLE_PACKS } from "../src/stylePacks.mjs";
import {
  evaluateStylePackAlignment,
  formatStylePackAlignmentReport
} from "./style-pack-alignment-gate.mjs";

test("style pack recommendations expose only current PRD visual systems and themes", () => {
  const result = evaluateStylePackAlignment(STYLE_PACKS);

  assert.equal(result.ok, true);
  assert.deepEqual(result.failures, []);
});

test("fails when a style pack exposes a legacy theme prefix", () => {
  const result = evaluateStylePackAlignment([
    {
      id: "legacy-pack",
      visualSystem: "Signal Proof",
      theme: "swiss-ikb"
    }
  ]);

  assert.equal(result.ok, false);
  assert.match(result.failures.join("\n"), /legacy theme prefix/);
});

test("fails when a style pack id exposes legacy visual-system wording", () => {
  const result = evaluateStylePackAlignment([
    {
      id: "wechat-editorial-longform",
      visualSystem: "Still Paper",
      theme: "SP-02 Warm Study"
    }
  ]);

  assert.equal(result.ok, false);
  assert.match(result.failures.join("\n"), /legacy pack id wording/);
});

test("formats a stable CLI report", () => {
  const report = formatStylePackAlignmentReport({
    ok: true,
    checked: 1,
    failures: []
  });

  assert.match(report, /Style Pack Alignment Gate/);
  assert.match(report, /Status: PASS/);
});

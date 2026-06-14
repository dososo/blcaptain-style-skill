import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const md = fs.readFileSync("references/blcaptain-visual-grammar.md", "utf8");
const contracts = JSON.parse(fs.readFileSync("references/blcaptain-visual-grammar.contracts.json", "utf8"));
const brief = fs.readFileSync("tasks/real-scene-first-brief.md", "utf8");
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

test("visual grammar explains the layered method instead of JSON-only styling", () => {
  for (const signal of [
    "不能只靠 JSON",
    "JSON 合同",
    "Seed template",
    "真实场景样张",
    "Validator",
    "人工审美判断",
    "可学习的是这套产品化方法",
    "不能复制它的设计、代码、模板、CSS、配色、资产、布局 ID、视觉身份或文案"
  ]) {
    assert.match(md, new RegExp(signal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("visual grammar contracts keep real-scene PNG as the only direction validation entry", () => {
  assert.equal(contracts.method.jsonIsNecessaryButNotSufficient, true);
  assert.equal(contracts.method.directionValidationEntry, "real-scene-png");
  assert.deepEqual(contracts.method.forbiddenDirectionValidationEntries, [
    "deck-gallery",
    "contact-sheet",
    "thumbnail-matrix",
    "isolated-type-board"
  ]);
});

test("visual grammar contracts expose approved systems, themes, dimensions, and recipe families", () => {
  assert.equal(contracts.platforms.xhs.width, 1080);
  assert.equal(contracts.platforms.xhs.height, 1440);
  assert.deepEqual(contracts.systems["Still Paper"].approvedThemes, [
    "SP-01 Mist Field",
    "SP-02 Warm Study",
    "SP-03 Coastal Quiet",
    "SP-04 Night Grain",
    "SP-05 Hearth & Table"
  ]);
  assert.deepEqual(contracts.systems["Signal Proof"].approvedThemes, [
    "SL-01 Electric Blue",
    "SL-02 Graphite Mint",
    "SL-03 Safety Coral",
    "SL-04 Acid Lime"
  ]);
  assert.equal(contracts.systems["Bridge Canvas"].forbidOrdinaryContentCardUse, true);
  assert.equal(contracts.recipes.length, 8);
  assert.equal(new Set(contracts.recipes.map(recipe => recipe.id)).size, 8);
});

test("each recipe is a real-scene implementation contract, not a loose style prompt", () => {
  for (const recipe of contracts.recipes) {
    assert.match(recipe.id, /^(SP|SL)-R0[1-4]$/);
    assert.ok(["Still Paper", "Signal Proof"].includes(recipe.system));
    for (const field of ["useCases", "layoutRules", "typeRules", "imageRules", "failureSignals"]) {
      assert.ok(Array.isArray(recipe[field]), `${recipe.id} missing ${field}`);
      assert.ok(recipe[field].length > 0, `${recipe.id} has empty ${field}`);
    }
  }
});

test("first real-scene brief is locked to one XHS PNG target", () => {
  for (const signal of [
    "SP-MF-R01-PROOF",
    "1080×1440",
    "Still Paper",
    "SP-01 Mist Field",
    "SP-MF-R01 Field Photo Cover",
    "references/visual-direction-boards/01.png",
    "不是 deck-gallery",
    "不是 contact sheet"
  ]) {
    assert.match(brief, new RegExp(signal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.doesNotMatch(brief, /XHS-RS-01|SL-02 Graphite Mint|SL-R01 Screenshot Proof/);
});

test("visual grammar contract gate is wired into npm test:gates", () => {
  assert.match(pkg.scripts?.["test:gates"] || "", /node --test scripts\/blcaptain-visual-grammar-contracts\.test\.mjs/);
});

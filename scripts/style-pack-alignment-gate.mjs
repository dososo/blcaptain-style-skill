#!/usr/bin/env node
import { pathToFileURL } from "node:url";
import { STYLE_PACKS } from "../src/stylePacks.mjs";

export const ALLOWED_STYLE_PACK_VISUAL_SYSTEMS = [
  "Still Paper",
  "Signal Proof",
  "Bridge Canvas"
];

export const ALLOWED_STYLE_PACK_THEMES = [
  "SP-01 Mist Field",
  "SP-02 Warm Study",
  "SP-03 Coastal Quiet",
  "SP-04 Night Grain",
  "SP-05 Hearth & Table",
  "SL-01 Electric Blue",
  "SL-02 Graphite Mint",
  "SL-03 Safety Coral",
  "SL-04 Acid Lime",
  "BC-01 Bridge Canvas"
];

const LEGACY_THEME_PREFIXES = [
  "editorial-",
  "swiss-",
  "xhs-"
];

const LEGACY_PACK_ID_TERMS = [
  "editorial",
  "swiss",
  "quiet-current",
  "signal-grid",
  "product-theatre",
  "glass-metro"
];

export function evaluateStylePackAlignment(stylePacks = STYLE_PACKS) {
  const allowedSystems = new Set(ALLOWED_STYLE_PACK_VISUAL_SYSTEMS);
  const allowedThemes = new Set(ALLOWED_STYLE_PACK_THEMES);
  const failures = [];

  for (const pack of stylePacks) {
    if (!allowedSystems.has(pack.visualSystem)) {
      failures.push(`${pack.id} uses legacy visual system: ${pack.visualSystem}`);
    }
    if (!allowedThemes.has(pack.theme)) {
      failures.push(`${pack.id} uses non-approved theme: ${pack.theme}`);
    }
    if (LEGACY_THEME_PREFIXES.some(prefix => pack.theme.startsWith(prefix))) {
      failures.push(`${pack.id} exposes legacy theme prefix: ${pack.theme}`);
    }
    if (LEGACY_PACK_ID_TERMS.some(term => pack.id.includes(term))) {
      failures.push(`${pack.id} exposes legacy pack id wording.`);
    }
  }

  return {
    ok: failures.length === 0,
    checked: stylePacks.length,
    failures
  };
}

export function formatStylePackAlignmentReport(result) {
  const lines = [
    "# Style Pack Alignment Gate",
    `Status: ${result.ok ? "PASS" : "FAIL"}`,
    `Checked: ${result.checked}`,
    ""
  ];

  for (const failure of result.failures) lines.push(`FAIL ${failure}`);
  lines.push(result.ok ? "PASS: style-pack recommendations match the current PRD visual systems." : `FAIL: ${result.failures.length} style-pack alignment issue(s).`);
  return lines.join("\n");
}

function runCli() {
  const result = evaluateStylePackAlignment();
  console.log(formatStylePackAlignmentReport(result));
  if (!result.ok) process.exit(1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) runCli();

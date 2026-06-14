#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DEFAULT_CONTRACT_PATH = "references/full-bleed-image-composition-contracts.json";

function hasValue(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === "object") return Object.keys(value).length > 0;
  return value !== undefined && value !== null && String(value).trim() !== "";
}

function listIncludes(list = [], value) {
  return list.includes(value);
}

function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

export function evaluateCompositionManifest(manifest, contract) {
  const failures = [];
  const warnings = [];
  const cards = manifest?.cards;

  if (!Array.isArray(cards) || cards.length === 0) {
    return {
      ok: false,
      failures: ["Manifest must contain a non-empty cards array."],
      warnings,
      cards: []
    };
  }

  for (const card of cards) {
    const id = card.id || "(missing id)";

    for (const field of contract.requiredFields || []) {
      if (!hasValue(card[field])) failures.push(`${id}: missing required field ${field}`);
    }

    const subjectType = card.subjectMap?.subjectType;
    if (subjectType && !listIncludes(contract.subjectTypes, subjectType)) {
      failures.push(`${id}: unknown subject type ${subjectType}`);
    }

    for (const zone of card.safeTextZones || []) {
      if (!listIncludes(contract.gridZones, zone)) failures.push(`${id}: unknown safe text zone ${zone}`);
    }

    for (const zone of card.avoidZones || []) {
      if (!listIncludes(contract.avoidZones, zone)) failures.push(`${id}: unknown avoid zone ${zone}`);
    }

    if (card.overlayToken && !Object.hasOwn(contract.overlayTokens || {}, card.overlayToken)) {
      failures.push(`${id}: unknown overlay token ${card.overlayToken}`);
    }

    if (card.cropStrategy && !listIncludes(contract.cropStrategies, card.cropStrategy)) {
      failures.push(`${id}: unknown crop strategy ${card.cropStrategy}`);
    }

    if (hasValue(card.quietZoneRatio)) {
      if (!isNumber(card.quietZoneRatio)) {
        failures.push(`${id}: quietZoneRatio must be a number`);
      } else if (isNumber(contract.minQuietZoneRatio) && card.quietZoneRatio < contract.minQuietZoneRatio) {
        failures.push(`${id}: quietZoneRatio ${card.quietZoneRatio} is below ${contract.minQuietZoneRatio}`);
      }
    }

    if (card.lightQuality && !listIncludes(contract.allowedLightQualities || [], card.lightQuality)) {
      failures.push(`${id}: unknown light quality ${card.lightQuality}`);
    }

    if (hasValue(card.noMaskAttempted) && card.noMaskAttempted !== true) {
      failures.push(`${id}: noMaskAttempted must be true before overlay is allowed`);
    }

    if (hasValue(card.titleCanvasRatio)) {
      if (!isNumber(card.titleCanvasRatio)) {
        failures.push(`${id}: titleCanvasRatio must be a number`);
      } else if (isNumber(contract.maxTitleCanvasRatio) && card.titleCanvasRatio > contract.maxTitleCanvasRatio) {
        failures.push(`${id}: titleCanvasRatio ${card.titleCanvasRatio} exceeds ${contract.maxTitleCanvasRatio}`);
      }
    }

    if (hasValue(card.overlayPeakAlpha)) {
      if (!isNumber(card.overlayPeakAlpha)) {
        failures.push(`${id}: overlayPeakAlpha must be a number`);
      } else if (isNumber(contract.maxOverlayPeakAlpha) && card.overlayPeakAlpha > contract.maxOverlayPeakAlpha) {
        failures.push(`${id}: overlayPeakAlpha ${card.overlayPeakAlpha} exceeds ${contract.maxOverlayPeakAlpha}`);
      }
    }

    if (card.thumbnailCheck && !listIncludes(contract.thumbnailChecks || [], card.thumbnailCheck)) {
      failures.push(`${id}: thumbnailCheck must be pass or pending`);
    }

    if (card.subjectMap?.subjectPosition && !listIncludes(contract.gridZones, card.subjectMap.subjectPosition)) {
      failures.push(`${id}: unknown subject position ${card.subjectMap.subjectPosition}`);
    }

    if (card.safeTextZones?.includes(card.subjectMap?.subjectPosition)) {
      warnings.push(`${id}: safe text zone overlaps declared subject position ${card.subjectMap.subjectPosition}`);
    }
  }

  return {
    ok: failures.length === 0,
    failures,
    warnings,
    cards
  };
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

export function runCompositionGate(taskDir, contractPath = DEFAULT_CONTRACT_PATH) {
  const root = path.resolve(taskDir);
  const manifestPath = path.join(root, "assets", "COMPOSITION.json");
  const indexPath = path.join(root, "index.html");
  const failures = [];

  if (!fs.existsSync(indexPath)) failures.push(`Missing index.html: ${indexPath}`);
  if (!fs.existsSync(manifestPath)) failures.push(`Missing assets/COMPOSITION.json: ${manifestPath}`);
  if (!fs.existsSync(contractPath)) failures.push(`Missing composition contract: ${contractPath}`);

  if (failures.length) {
    return { ok: false, root, failures, warnings: [], cards: [] };
  }

  const result = evaluateCompositionManifest(readJson(manifestPath), readJson(contractPath));
  return { root, ...result };
}

export function formatCompositionGateReport(result) {
  const lines = [
    "# Full-Bleed Composition Gate",
    `Task: ${result.root || "(memory)"}`,
    `Cards: ${result.cards?.length || 0}`,
    ""
  ];

  for (const card of result.cards || []) {
    lines.push(`CHECK ${card.id || "(missing id)"}`);
    lines.push(`  imageRole: ${card.imageRole || "(missing)"}`);
    lines.push(`  subject: ${card.subjectMap?.subjectType || "(missing)"} / ${card.subjectMap?.subjectPosition || "(missing)"}`);
    lines.push(`  safeTextZones: ${(card.safeTextZones || []).join(", ") || "(missing)"}`);
    lines.push(`  avoidZones: ${(card.avoidZones || []).join(", ") || "(missing)"}`);
    lines.push(`  quietZoneRatio: ${hasValue(card.quietZoneRatio) ? card.quietZoneRatio : "(missing)"}`);
    lines.push(`  lightQuality: ${card.lightQuality || "(missing)"}`);
    lines.push(`  titleCanvasRatio: ${hasValue(card.titleCanvasRatio) ? card.titleCanvasRatio : "(missing)"}`);
    lines.push(`  thumbnailCheck: ${card.thumbnailCheck || "(missing)"}`);
    lines.push(`  overlayToken: ${card.overlayToken || "(missing)"}`);
  }

  for (const warning of result.warnings || []) lines.push(`WARN ${warning}`);

  if (!result.ok) {
    for (const failure of result.failures || []) lines.push(`FAIL ${failure}`);
    lines.push(`\nFAIL: ${result.failures?.length || 0} composition issue(s).`);
  } else {
    lines.push("\nPASS: full-bleed composition gate");
  }

  return lines.join("\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const taskDir = process.argv[2];
  if (!taskDir) {
    console.error("Usage: node scripts/full-bleed-composition-gate.mjs <task-dir>");
    process.exit(2);
  }

  const result = runCompositionGate(taskDir);
  console.log(formatCompositionGateReport(result));
  if (!result.ok) process.exit(1);
}

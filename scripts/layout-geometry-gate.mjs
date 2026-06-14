#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const taskDir = process.argv[2];
const layoutArg = process.argv[3];

if (!taskDir) {
  console.error("Usage: node scripts/layout-geometry-gate.mjs <task-dir> [layout-id]");
  process.exit(2);
}

const root = path.resolve(taskDir);
const indexPath = path.join(root, "index.html");
const contractsPath = path.resolve("references/geometry-contracts.json");

const fail = [];
const warn = [];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function loadJson(file) {
  return JSON.parse(read(file));
}

function findRule(css, selector) {
  const escaped = selector.replace(".", "\\.");
  const re = new RegExp(`${escaped}\\s*\\{([^}]*)\\}`, "m");
  const match = css.match(re);
  return match ? match[1] : null;
}

function pxValue(block, prop) {
  const re = new RegExp(`${prop}\\s*:\\s*(-?\\d+(?:\\.\\d+)?)px`, "i");
  const m = block?.match(re);
  return m ? Number(m[1]) : null;
}

function inferLayoutId(html) {
  const dataName = html.match(/data-name=["']([^"']+)["']/i)?.[1] || "";
  if (dataName.includes("SP-C01")) return "SP-C01";
  if (dataName.includes("SP-MF-R01B")) return "SP-MF-R01B";
  if (dataName.includes("SP-MF-R01")) return "SP-MF-R01";
  if (dataName.includes("SP-MF-R02")) return "SP-MF-R02";
  if (dataName.includes("SP-MF-R03")) return "SP-MF-R03";
  if (dataName.includes("SP-MF-R04")) return "SP-MF-R04";
  if (dataName.includes("SP-MF-R05")) return "SP-MF-R05";
  if (dataName.includes("SP-MF-R06")) return "SP-MF-R06";
  if (dataName.includes("SP-MF-R07")) return "SP-MF-R07";
  if (dataName.includes("SP-MF-R08")) return "SP-MF-R08";
  if (dataName.includes("SP-C03")) return "SP-C03";
  if (dataName.includes("SL-C02")) return "SL-C02";
  if (dataName.includes("SP-E05")) return "SP-E05";
  return null;
}

function checkBounds(selector, geom, posterWidth) {
  const left = geom.left;
  const width = geom.width;
  if (left == null || width == null) {
    fail.push(`${selector} missing left or width`);
    return;
  }
  if (left < 0) fail.push(`${selector} left is outside poster: ${left}`);
  if (left + width > posterWidth) fail.push(`${selector} right edge exceeds poster: ${left + width} > ${posterWidth}`);
}

if (!fs.existsSync(indexPath)) {
  console.error(`Missing index.html: ${indexPath}`);
  process.exit(1);
}

if (!fs.existsSync(contractsPath)) {
  console.error(`Missing geometry contracts: ${contractsPath}`);
  process.exit(1);
}

const html = read(indexPath);
const contracts = loadJson(contractsPath);
const layoutId = layoutArg || inferLayoutId(html);

if (!layoutId) {
  console.error("Could not infer layout id. Pass it explicitly, e.g. SP-C01.");
  process.exit(2);
}

const contract = contracts.contracts?.[layoutId];

if (!contract) {
  console.error(`No geometry contract for layout: ${layoutId}`);
  process.exit(2);
}

const posterWidth = contract.posterWidth || contracts.defaults?.posterWidth || 1080;
const tolerance = contract.tolerancePx ?? contracts.defaults?.tolerancePx ?? 2;
const mode = contract.mode;

console.log("# Layout Geometry Gate");
console.log(`Task: ${root}`);
console.log(`Layout: ${layoutId}`);
console.log(`Mode: ${mode}`);
console.log(`Poster width: ${posterWidth}px`);
console.log(`Tolerance: ${tolerance}px`);

for (const selector of contract.requiredZones || []) {
  const block = findRule(html, selector);
  if (!block) {
    fail.push(`Missing required zone rule: ${selector}`);
    continue;
  }

  const left = pxValue(block, "left");
  const width = pxValue(block, "width");
  const right = left != null && width != null ? posterWidth - left - width : null;

  if (mode === "symmetric-inset") {
    if (left == null || width == null || right == null) {
      fail.push(`${selector} missing left/width for symmetric inset check`);
      continue;
    }
    const diff = Math.abs(left - right);
    console.log(`CHECK ${selector} left=${left}px right=${right}px diff=${diff}px`);
    checkBounds(selector, { left, width }, posterWidth);
    if (diff > tolerance) {
      fail.push(`${selector} inset mismatch: left=${left}px right=${right}px diff=${diff}px tolerance=${tolerance}px`);
    }
  } else if (mode === "declared-zones") {
    const expected = contract.zones?.[selector];
    if (!expected) {
      fail.push(`${selector} missing declared zone expectation`);
      continue;
    }
    if (left == null || width == null || right == null) {
      fail.push(`${selector} missing left/width for declared zone check`);
      continue;
    }
    const leftDiff = Math.abs(left - expected.left);
    const rightDiff = Math.abs(right - expected.right);
    console.log(`CHECK ${selector} left=${left}px expected=${expected.left}px diff=${leftDiff}px | right=${right}px expected=${expected.right}px diff=${rightDiff}px`);
    checkBounds(selector, { left, width }, posterWidth);
    if (leftDiff > tolerance) fail.push(`${selector} left mismatch: actual=${left}px expected=${expected.left}px`);
    if (rightDiff > tolerance) fail.push(`${selector} right mismatch: actual=${right}px expected=${expected.right}px`);
  } else if (mode === "freeform-with-bounds") {
    console.log(`CHECK ${selector} exists`);
    checkBounds(selector, { left, width }, posterWidth);
  } else {
    fail.push(`Unknown geometry mode: ${mode}`);
  }
}

for (const w of warn) console.log(`WARN ${w}`);

if (fail.length) {
  for (const f of fail) console.log(`FAIL ${f}`);
  console.log(`\nFAIL: ${fail.length} geometry issue(s).`);
  process.exit(1);
}

console.log("\nPASS: layout geometry gate");

#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const taskDir = process.argv[2];

if (!taskDir) {
  console.error("Usage: node scripts/asset-source-gate.mjs <task-dir>");
  process.exit(2);
}

const root = path.resolve(taskDir);
const sourcesPath = path.join(root, "assets", "SOURCES.md");
const requestsPath = path.join(root, "assets", "IMAGE_REQUESTS.md");
const indexPath = path.join(root, "index.html");

const fail = [];
const warn = [];

function exists(p) {
  return fs.existsSync(p);
}

function read(p) {
  return fs.readFileSync(p, "utf8");
}

if (!exists(sourcesPath)) fail.push("Missing assets/SOURCES.md");
if (!exists(requestsPath)) fail.push("Missing assets/IMAGE_REQUESTS.md");
if (!exists(indexPath)) fail.push("Missing index.html");

const sourcesText = exists(sourcesPath) ? read(sourcesPath).toLowerCase() : "";
const html = exists(indexPath) ? read(indexPath) : "";

const actualSourceLines = sourcesText
  .split(/\r?\n/)
  .filter(line => line.includes("<-"))
  .join("\n");

const forbidden = [
  "direction board",
  "direction-board",
  "visual direction",
  "generated still paper direction image",
  "cropped from the ai-generated still paper direction image",
  "cropped from ai-generated still paper direction image",
  "card screenshot",
  "report board",
  "report-board",
  "screenshot of card",
  "alignment asset derived from",
  "temporary alignment asset"
];

for (const term of forbidden) {
  if (actualSourceLines.includes(term)) {
    fail.push(`Forbidden hero source marker found in SOURCES.md actual source line: "${term}"`);
  }
}

const imgSrcs = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);

for (const src of imgSrcs) {
  const imgPath = path.join(root, src);
  if (!exists(imgPath)) {
    fail.push(`Referenced image missing: ${src}`);
  }
  if (!src.toLowerCase().includes("hero")) {
    warn.push(`Image src does not indicate role clearly: ${src}`);
  }
}

const allowedSourceMarkers = [
  "locally generated clean hero asset",
  "pure ai-generated",
  "user-provided",
  "user supplied",
  "unsplash",
  "pexels",
  "stocksnap",
  "pixabay",
  "negativespace",
  "kaboompics",
  "burst",
  "rawpixel",
  "flickr",
  "openverse",
  "wallhaven",
  "direct search"
];

if (!allowedSourceMarkers.some(term => actualSourceLines.includes(term))) {
  warn.push("No approved clean source marker found in SOURCES.md actual source line.");
}

console.log("# Asset Source Gate");
console.log(`Task: ${root}`);

for (const w of warn) console.log(`WARN ${w}`);

if (fail.length) {
  for (const f of fail) console.log(`FAIL ${f}`);
  console.log(`\nFAIL: ${fail.length} blocking asset issue(s).`);
  process.exit(1);
}

console.log("\nPASS: asset source gate");

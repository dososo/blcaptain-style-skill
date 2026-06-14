#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const taskDir = process.argv[2];

if (!taskDir) {
  console.error("Usage: node scripts/run-gates.mjs <task-dir>");
  process.exit(2);
}

const root = path.resolve(taskDir);

function run(label, cmd, args, allowMissing = false) {
  if (allowMissing && !fs.existsSync(args[0])) {
    console.log(`SKIP ${label}: missing ${args[0]}`);
    return 0;
  }

  console.log(`\n## ${label}`);
  console.log(`$ ${cmd} ${args.join(" ")}`);

  const result = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: false
  });

  if (result.error) {
    console.error(result.error.message);
    return 1;
  }

  return result.status ?? 1;
}

const checks = [
  ["Asset Source Gate", "node", ["scripts/asset-source-gate.mjs", root]],
  ["Visual Direction Gate", "node", ["scripts/visual-direction-gate.mjs", root]],
  ["Layout Geometry Gate", "node", ["scripts/layout-geometry-gate.mjs", root]],
  ["Static Social Deck Validator", "node", ["validate-social-deck.mjs", root]],
  ["Visual Audit", "python3", ["scripts/visual-audit.py", root]]
];

for (const [label, cmd, args] of checks) {
  const code = run(label, cmd, args);
  if (code !== 0) {
    console.log(`\nFAIL ${label}`);
    process.exit(code);
  }
}

console.log("\nPASS: all gates");

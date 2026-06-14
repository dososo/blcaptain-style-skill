#!/usr/bin/env node
import { renderDeck } from "./src/render.mjs";

const input = process.argv[2];
if (!input) {
  console.error("Usage: node render.mjs <task-dir-or-index.html>");
  process.exit(2);
}
const files = await renderDeck(input);
for (const f of files) {
  console.log(`Rendered ${f.width}×${f.height}: ${f.file}`);
}

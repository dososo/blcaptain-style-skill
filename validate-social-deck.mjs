#!/usr/bin/env node
import { validateDeck, printValidation } from "./src/validate.mjs";

const input = process.argv[2];
if (!input) {
  console.error("Usage: node validate-social-deck.mjs <task-dir-or-index.html>");
  process.exit(2);
}
const result = await validateDeck(input);
printValidation(result);
process.exitCode = result.fails ? 1 : 0;

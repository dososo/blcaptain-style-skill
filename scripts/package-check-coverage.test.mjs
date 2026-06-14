import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { execSync } from "node:child_process";

// 只统计 git 跟踪的运行时 mjs（与公开仓库一致）：本地 dev 工具留在磁盘但不跟踪，
// 故按 git ls-files 而非扫磁盘，保证本地与 clone/CI 行为一致。
function listRuntimeMjs() {
  const tracked = execSync(
    "git ls-files render.mjs validate-social-deck.mjs bin src scripts",
    { encoding: "utf8" }
  )
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean);

  return tracked
    .filter(file => file.endsWith(".mjs") && !file.endsWith(".test.mjs"))
    .sort();
}

test("npm run check syntax-checks every runtime mjs file", () => {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const checkScript = pkg.scripts?.check || "";
  const missing = listRuntimeMjs().filter(file => !checkScript.includes(`node --check ${file}`));

  assert.deepEqual(missing, []);
});

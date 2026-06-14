import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const readme = fs.readFileSync("README.md", "utf8");

// 用户向 README 应有的信号（接地气、面向用户；工程门禁措辞归 SKILL.md / RELEASE.md，不强求进对外 README）
const requiredReadmeSignals = [
  "Still Paper",
  "Signal Proof",
  "Bridge Canvas",
  "静纸",
  "实证",
  "图桥",
  "## 安装",
  "## 关于作者",
  "商业授权"
];

const stalePublicClaims = [
  /24 style systems/i,
  /six families/i,
  /strict Editorial \/ Swiss theme presets/i,
  /glass-metro/i,
  /Quiet Current/i,
  /Signal Grid/i
];

test("README presents the current two-system PRD and hard-gate posture", () => {
  for (const signal of requiredReadmeSignals) {
    assert.match(readme, new RegExp(signal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), signal);
  }
});

test("README no longer advertises stale public style systems or legacy defaults", () => {
  for (const pattern of stalePublicClaims) {
    assert.doesNotMatch(readme, pattern, String(pattern));
  }
});

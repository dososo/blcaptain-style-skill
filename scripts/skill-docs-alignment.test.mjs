import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

// SKILL.md 是对外发布的 skill「大脑」——用户实际加载的指令。
// 本 gate 断言它描述的是「智能驱动」当前真相（Claude 读懂内容、自己写 brief.json、交确定性引擎渲染），
// 并防止回潮到旧的规则引擎/文档闭环路线措辞。
const skill = fs.readFileSync("SKILL.md", "utf8");

// 必须出现：智能驱动核心 + 三套视觉语言 + 七步工作流 + 字段权威 + 取图留痕 + 硬闸门 + 反 AI / 非复制。
const requiredSignals = [
  "智能驱动",
  "brief.json",
  "Still Paper",
  "Signal Proof",
  "Bridge Canvas",
  "三套视觉语言",
  "五动作出图法",
  "读懂",
  "落版",
  "成图",
  "SOURCES.md",
  "src/engine.mjs",
  "image-fetch",
  "技术 PASS",
  "视觉 PASS",
  "非复制",
  "布局 ID",
  "视觉身份",
  "反 AI"
];

// 不得出现：旧规则引擎/旧路线/旧视觉系统措辞，以及外部项目味话术（保持自有声音，防止回潮）。
const staleSkillPatterns = [
  /v1\.1/i,
  /28 layouts/i,
  /Editorial \/ Swiss/i,
  /glass-metro/i,
  /Layout Contract Selection/,
  /Compose & Render/,
  /Gate & Review/,
  /\beditorial-/i,
  /\bswiss-/i,
  /Intake/i
];

test("SKILL.md 描述智能驱动工作流、三套视觉语言与硬闸门", () => {
  for (const signal of requiredSignals) {
    assert.match(skill, new RegExp(signal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), signal);
  }
});

test("SKILL.md 不携带旧规则引擎/旧路线/旧视觉系统措辞", () => {
  for (const pattern of staleSkillPatterns) {
    assert.doesNotMatch(skill, pattern, String(pattern));
  }
});

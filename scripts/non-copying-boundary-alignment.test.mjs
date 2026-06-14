import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { auditProject } from "../src/audit.mjs";

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function assertIncludesAll(text, signals, label) {
  for (const signal of signals) {
    assert.match(
      text,
      new RegExp(signal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      `${label} missing: ${signal}`
    );
  }
}

test("public and workflow docs expose the non-copying boundary", () => {
  const docs = [
    {
      file: "README.md",
      signals: ["不抄设计", "原创", "产品化", "社交卡片"]
    },
    {
      file: "SKILL.md",
      signals: ["非复制", "布局 ID", "视觉身份"]
    },
    {
      file: "references/implementation-flow.md",
      signals: ["不得复制任何设计、代码、模板、CSS、配色、资产、布局 ID 或视觉身份"]
    }
  ];

  for (const doc of docs) {
    assertIncludesAll(read(doc.file), doc.signals, doc.file);
  }
});

test("method study and non-copying guideline distinguish learnable method from forbidden copying", () => {
  const methodStudy = read("docs/00-source-method-study.md");
  assertIncludesAll(methodStudy, [
    "方法研究",
    "只学习产品化方法",
    "不复制视觉风格、模板、代码、主题名、布局细节或资产",
    "固定版式工作流",
    "图片来源记录",
    "人工视觉确认"
  ], "docs/00-source-method-study.md");

  const guidelines = read("references/non-copying-guidelines.md");
  assertIncludesAll(guidelines, [
    "非复制边界",
    "可以学习",
    "固定版式工作流",
    "种子模板工作流",
    "HTML 到 PNG 渲染链路",
    "资产来源记录",
    "验证门禁",
    "不得复制",
    "代码",
    "模板",
    "CSS",
    "资产",
    "配色",
    "布局 ID",
    "视觉身份",
    "文案"
  ], "references/non-copying-guidelines.md");
});

test("audit treats non-copying guidelines as a required release artifact", async () => {
  const result = await auditProject();
  const items = result.rows.map(row => row.item);

  assert.ok(items.includes("references/non-copying-guidelines.md"));
  assert.equal(result.missing, 0);
});

test("non-copying boundary gate is wired into npm test:gates", () => {
  const pkg = JSON.parse(read("package.json"));
  assert.match(pkg.scripts["test:gates"], /scripts\/non-copying-boundary-alignment\.test\.mjs/);
});

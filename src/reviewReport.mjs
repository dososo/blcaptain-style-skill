import fs from "node:fs/promises";
import path from "node:path";
import { validateDeck } from "./validate.mjs";

const DIMS = {
  xhs: { width: 1080, height: 1440 },
  xpost: { width: 1080, height: 1920 },
  xfeed: { width: 1800, height: 900 },
  square: { width: 1080, height: 1080 },
  wide: { width: 2100, height: 900 },
  xcover: { width: 1500, height: 600 }
};

function resolveIndex(input) {
  const abs = path.resolve(input);
  return abs.endsWith(".html") ? abs : path.join(abs, "index.html");
}

function taskDirFromIndex(indexPath) {
  return path.dirname(indexPath);
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function readJsonIfExists(file) {
  if (!(await exists(file))) return null;
  return JSON.parse(await fs.readFile(file, "utf8"));
}

function getAttr(str, attr) {
  return str.match(new RegExp(`${attr}="([^"]+)"`))?.[1] || "";
}

function extractPosters(html) {
  return html.match(/<section\s+class="poster\b[\s\S]*?<\/section>/g) || [];
}

function posterFormat(cls) {
  const parts = cls.split(/\s+/);
  return Object.keys(DIMS).find(key => parts.includes(key)) || "xhs";
}

function readPngSizeFromBuffer(buf) {
  const isPng = buf.length >= 24
    && buf[0] === 0x89
    && buf[1] === 0x50
    && buf[2] === 0x4e
    && buf[3] === 0x47;
  if (!isPng) return null;
  return {
    width: buf.readUInt32BE(16),
    height: buf.readUInt32BE(20)
  };
}

async function readPngSize(file) {
  if (!(await exists(file))) return null;
  const buf = await fs.readFile(file);
  return readPngSizeFromBuffer(buf);
}

function formatFieldSources(fieldSources) {
  const entries = Object.entries(fieldSources || {});
  if (!entries.length) return "未声明";
  return entries.map(([key, value]) => `${key}: ${value}`).join("；");
}

function formatIssues(issues) {
  if (!issues.length) return "无";
  return issues.map(issue => `${issue.level} ${issue.rule}: ${issue.detail}`).join("；");
}

function formatRenderedSize(rendered, expected) {
  if (!rendered) return "未找到 PNG 输出";
  const scaleX = rendered.width / expected.width;
  const scaleY = rendered.height / expected.height;
  const sameScale = Number.isFinite(scaleX) && Math.abs(scaleX - scaleY) < 0.01;
  if (sameScale && Math.abs(scaleX - 1) > 0.01) {
    return `${rendered.width} x ${rendered.height}（${scaleX.toFixed(1)}x PNG，对应逻辑 ${expected.width} x ${expected.height}）`;
  }
  return `${rendered.width} x ${rendered.height}`;
}

function cardByName(brief, name) {
  return (brief?.cards || []).find(card => card.name === name) || null;
}

async function sourceStatus(taskDir) {
  const assetsDir = path.join(taskDir, "assets");
  const sourcesPath = path.join(assetsDir, "SOURCES.md");
  if (!(await exists(assetsDir))) return { label: "无 assets 目录", path: null };
  if (await exists(sourcesPath)) return { label: "已记录", path: "assets/SOURCES.md" };
  return { label: "缺失 SOURCES.md", path: null };
}

export async function generateUserReviewReport(input, options = {}) {
  const indexPath = resolveIndex(input);
  const taskDir = taskDirFromIndex(indexPath);
  const html = await fs.readFile(indexPath, "utf8");
  const posters = extractPosters(html).map((poster, index) => {
    const cls = getAttr(poster, "class");
    const format = posterFormat(cls);
    return {
      name: getAttr(poster, "data-name") || String(index + 1).padStart(2, "0"),
      style: getAttr(poster, "data-style") || "unknown",
      format,
      expected: DIMS[format]
    };
  });

  const brief = await readJsonIfExists(path.join(taskDir, "brief.resolved.json"));
  const validation = await validateDeck(indexPath);
  const validationByName = new Map(validation.report.map(item => [item.name, item]));
  const sources = await sourceStatus(taskDir);

  const lines = [
    "# 用户级验证报告",
    "",
    `任务目录：\`${path.relative(process.cwd(), taskDir) || "."}\``,
    `验证器：\`${validation.renderer || "unknown"}\``,
    `技术结论：${validation.fails ? "FAIL" : "PASS"}，blocking issue ${validation.fails} 个。`,
    "人工视觉状态：PENDING_USER_REVIEW。",
    "",
    "技术 PASS 不等于视觉 PASS；本报告不能写入 accepted proof，也不能替代用户人工确认。",
    "",
    "## 全局检查",
    "",
    `- 图源记录：${sources.path ? `${sources.label}（\`${sources.path}\`）` : sources.label}`,
    `- 卡片数量：${posters.length}`,
    `- 输出目录：\`${path.relative(process.cwd(), path.join(taskDir, "output"))}\``,
    ""
  ];

  for (const poster of posters) {
    const card = cardByName(brief, poster.name);
    const pngPath = path.join(taskDir, "output", `${poster.name}.png`);
    const rendered = await readPngSize(pngPath);
    const item = validationByName.get(poster.name);
    const issues = item?.issues || [];
    const fails = issues.filter(issue => issue.level === "FAIL").length;
    const warns = issues.filter(issue => issue.level === "WARN").length;

    lines.push(`## ${poster.name}`);
    lines.push("");
    lines.push(`- 预期尺寸：${poster.expected.width} x ${poster.expected.height}（${poster.format}）`);
    lines.push(`- PNG 像素尺寸：${formatRenderedSize(rendered, poster.expected)}`);
    lines.push(`- 视觉系统：${poster.style}`);
    lines.push(`- Recipe：${card?.recipeId || "未声明"}`);
    lines.push(`- 图源策略：${card?.sourcePolicy || "未声明"}`);
    lines.push(`- 字段来源：${formatFieldSources(card?.fieldSources)}`);
    lines.push(`- 技术问题：FAIL ${fails} / WARN ${warns}`);
    lines.push(`- 问题详情：${formatIssues(issues)}`);
    lines.push("- 人工确认问题：这张卡是否在真实阅读尺寸下可读、克制、符合目标内容，并且没有把技术通过误当成视觉通过？");
    lines.push("");
  }

  lines.push("## 下一步");
  lines.push("");
  if (validation.fails) {
    lines.push("- 先修复 blocking issue，再重新生成报告。");
  } else {
    lines.push("- 可以进入人工视觉审阅，但仍需用户明确给出 PASS / PASS_WITH_MINOR_TUNE / FAIL_*。");
  }
  lines.push("- 用户明确 PASS 前，不得写 accepted proof，不得启动 Board 02 / Warm Study。");
  lines.push("");

  const markdown = lines.join("\n");
  const outPath = options.outPath ? path.resolve(options.outPath) : path.join(taskDir, "review-report.md");
  await fs.writeFile(outPath, markdown, "utf8");
  return { markdown, outPath, validation };
}

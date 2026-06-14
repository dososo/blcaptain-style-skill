#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

export const REQUIRED_GROUPS = [
  {
    id: "sp-display",
    label: "Still Paper display",
    identityFonts: ["Source Serif 4", "Newsreader"],
    fonts: ["Source Serif 4", "Newsreader", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", "Georgia"]
  },
  {
    id: "sp-body",
    label: "Still Paper body",
    identityFonts: ["IBM Plex Sans"],
    fonts: ["IBM Plex Sans", "Source Han Sans SC", "Noto Sans CJK SC", "PingFang SC", "Noto Sans", "Helvetica Neue"]
  },
  {
    id: "sl-display",
    label: "Signal Proof display",
    identityFonts: ["IBM Plex Sans", "Inter"],
    fonts: ["IBM Plex Sans", "Inter", "Source Han Sans SC", "Noto Sans CJK SC", "PingFang SC", "Noto Sans", "Helvetica Neue"]
  },
  {
    id: "sl-mono",
    label: "Signal Proof mono",
    identityFonts: ["IBM Plex Mono", "SFMono-Regular", "Roboto Mono", "Consolas"],
    fonts: ["IBM Plex Mono", "SFMono-Regular", "Roboto Mono", "Consolas"]
  }
];

const BAD_FALLBACKS = ["Verdana", "Arial", "Times New Roman"];

function matchFont(font) {
  const result = spawnSync("fc-match", [font], { encoding: "utf8" });
  if (result.error) return { font, ok: false, unavailable: true, output: result.error.message };
  const output = (result.stdout || "").trim();
  const ok = output.toLowerCase().includes(font.toLowerCase());
  return { font, ok, output };
}

export function evaluateFontGroups(groups = REQUIRED_GROUPS, matcher = matchFont) {
  const evaluatedGroups = groups.map(group => {
    const rows = group.fonts.map(matcher);
    const identityFonts = group.identityFonts || group.fonts;
    const identityMatched = rows.some(row => row.ok && identityFonts.includes(row.font));
    const anyMatched = rows.some(row => row.ok);
    const allUnavailable = rows.length > 0 && rows.every(row => row.unavailable);
    const warnings = [];
    const failures = [];

    if (allUnavailable) {
      failures.push(`${group.id}: fc-match unavailable; cannot verify font environment`);
    } else if (!identityMatched) {
      warnings.push(`${group.id}: no identity font matched; using fallback/system font only`);
    }

    if (!anyMatched && !allUnavailable) {
      const fallback = rows[0]?.output || "";
      const knownBad = BAD_FALLBACKS.some(name => fallback.includes(`"${name}"`));
      const detail = knownBad ? `fallback appears generic: ${fallback}` : "no target font matched";
      warnings.push(`${group.id}: ${detail}`);
    }

    return { ...group, rows, warnings, failures };
  });

  const warnings = evaluatedGroups.flatMap(group => group.warnings);
  const failures = evaluatedGroups.flatMap(group => group.failures);
  return {
    groups: evaluatedGroups,
    warnings,
    failures,
    hasWarn: warnings.length > 0,
    hasFail: failures.length > 0
  };
}

export function formatFontGateReport(result) {
  const lines = ["# Font Environment Gate", ""];

  for (const group of result.groups) {
    lines.push(`## ${group.label}`);
    for (const row of group.rows) {
      const status = row.ok ? "PASS" : "MISS";
      lines.push(`${status} ${row.font} -> ${row.output}`);
    }
    for (const warning of group.warnings) lines.push(`WARN ${warning}`);
    for (const failure of group.failures) lines.push(`FAIL_FONT_ENV ${failure}`);
    lines.push("");
  }

  if (result.hasFail) {
    lines.push("FAIL_FONT_ENV: font environment cannot be verified.");
  } else if (result.hasWarn) {
    lines.push("WARN_ENGINEERING_PREVIEW: target bilingual identity fonts are incomplete; rendered proofs are not final visual acceptance.");
  } else {
    lines.push("PASS: target bilingual font environment is available.");
  }

  return lines.join("\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = evaluateFontGroups();
  console.log(formatFontGateReport(result));
  if (result.hasFail) process.exit(1);
}

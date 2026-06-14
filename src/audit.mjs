import fs from "node:fs/promises";
import path from "node:path";

const REQUIRED = [
  "SKILL.md","README.md","AGENTS.md","package.json","src/engine.mjs","src/render.mjs","src/validate.mjs",
  "references/style-system.md","references/layout-recipes.md","references/image-sourcing.md","references/qa-checklist.md",
  "references/image-overlay.md","references/screenshot-treatment.md","references/title-shortener.md","references/category-cookbook.md",
  "references/best-practices.md","references/art-direction-checklist.md","references/non-copying-guidelines.md","scripts/render-weasyprint.py","scripts/visual-audit.py",
  "assets/backgrounds/chrome-dark.png","examples/generated/gallery-contact-sheet.png","scripts/quality-score.py","scripts/make-gallery.py","examples/screenshot-tutorial/brief.json","examples/data-report/brief.json","examples/generated/quality-score.json",".github/workflows/ci.yml","RELEASE.md","references/maturity-model.md","references/release-quality-bar.md","references/xiaohongshu-feed-patterns.md","references/xhs-cover-quality-bar.md","examples/xhs-feed-patterns/brief.json","validate-social-deck.mjs","assets/template-still-paper-card.html","assets/template-signal-ledger-card.html","assets/magazine-bg-webgl.js","assets/screenshot-backgrounds/style-a-editorial/ink-classic-stage.webp","assets/screenshot-backgrounds/style-b-swiss/ikb-stage.webp","references/theme-presets.md","references/background-systems.md","references/map-component.md","references/image-source-workflow.md","src/imageWorkflow.mjs","src/stylePacks.mjs","references/style-pack-catalog.md","references/platform-routing.md","references/wechat-style-system.md","references/xhs-style-system.md","references/style-recommendation-flow.md","examples/style-routing/requests.json"
];

async function exists(p){try{await fs.access(p);return true}catch{return false}}

export async function auditProject(root = process.cwd()) {
  const rows=[];
  for (const f of REQUIRED) rows.push({item:f, ok: await exists(path.join(root,f))});
  const missing = rows.filter(r=>!r.ok).length;
  return {rows, missing};
}

export function printAudit(a) {
  for (const r of a.rows) console.log(`${r.ok?'PASS':'MISS'} ${r.item}`);
  console.log(`\n${a.missing ? 'WARN' : 'PASS'}: ${a.missing} missing required artifact(s).`);
}

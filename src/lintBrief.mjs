import fs from "node:fs/promises";
import { STYLES, FORMATS } from "./data.mjs";

export const KNOWN_LAYOUTS = new Set([
  "statement-cover","essay-split","neo-newspaper","quote-focus",
  "three-lane-flow","stack-map","dashboard-grid","loop-circuit",
  "big-number-poster","trend-compare","research-atlas","evidence-wall",
  "product-hero","feature-strip","feature-matrix","product-storyline",
  "alert-burst","roundup-stack","checklist-strip","meme-focus",
  "diary-scrapbook","annotated-checklist","case-note","lifestyle-story",
  "screenshot-focus","wechat-cover-pair",
  "sp-c01-editorial-cover","sp-c02-essay-split",
  "sl-c01-proof-statement","sl-c02-screenshot-proof",
  "sp-ws-cover-photo","sp-ws-cover-well","sp-ws-body-essay",
  "sp-ws-body-list","sp-ws-body-panel","sp-ws-body-quote"
]);

function textLen(x){return String(x||"").length}

export async function lintBrief(file) {
  const brief = JSON.parse(await fs.readFile(file, "utf8"));
  const issues=[];
  const meta=brief.meta||{};
  if (!brief.cards?.length) issues.push({level:"FAIL", msg:"brief.cards is empty"});
  if (meta.style && !STYLES[meta.style]) issues.push({level:"WARN", msg:`unknown meta.style: ${meta.style}`});
  if (meta.format && !FORMATS[meta.format]) issues.push({level:"WARN", msg:`unknown meta.format: ${meta.format}`});

  for (const [i,card] of (brief.cards||[]).entries()) {
    const id=card.name || `card ${i+1}`;
    if (!KNOWN_LAYOUTS.has(card.layout)) issues.push({level:"FAIL", msg:`${id}: unknown layout ${card.layout}`});
    if (card.style && !STYLES[card.style]) issues.push({level:"WARN", msg:`${id}: unknown style ${card.style}`});
    if (textLen(card.title) > 38 && ["statement-cover","alert-burst","meme-focus"].includes(card.layout)) issues.push({level:"WARN", msg:`${id}: cover title may be too long (${textLen(card.title)} chars)`});
    if (card.layout === "product-hero" && !card.image) issues.push({level:"FAIL", msg:`${id}: product-hero requires image`});
    if (card.layout === "screenshot-focus" && !card.image) issues.push({level:"FAIL", msg:`${id}: screenshot-focus requires screenshot image`});
    if ((card.layout === "sp-ws-cover-photo" || card.layout === "sp-ws-cover-well") && !card.image) issues.push({level:"FAIL", msg:`${id}: SP-WS cover requires a hero image — run image-plan → image-fetch first`});
    if (card.image && !card.image.position && !card.image.objectPosition) issues.push({level:"WARN", msg:`${id}: image should set object-position`});
  }
  return {issues, fails: issues.filter(x=>x.level==='FAIL').length};
}

export function printLint(res) {
  if (!res.issues.length) { console.log('PASS brief lint'); return; }
  for (const i of res.issues) console.log(`${i.level}: ${i.msg}`);
  console.log(`${res.fails ? 'FAIL' : 'PASS'}: ${res.fails} blocking issue(s).`);
}

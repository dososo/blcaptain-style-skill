import fs from "node:fs/promises";
import path from "node:path";
import { FORMATS, getStyle } from "./data.mjs";
import { BASE_CSS } from "./styles.css.mjs";
import { esc, attr, styleVars, list, imageTag, miniLabel } from "./html.mjs";
import { resolveBriefAssets } from "./assets.mjs";

function ensureArray(v) {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function imageSrc(image) {
  return image?.resolvedSrc || image?.src || "";
}

function imagePos(image) {
  return image?.position || image?.objectPosition || "center 50%";
}


function formatClass(format = "xhs") {
  return FORMATS[format]?.className || FORMATS.xhs.className;
}

function cardTitle(card) {
  return card.title || card.headline || "";
}

// 封面标题按字数自适应字号档（短大长小：长标题缩字号塞进两行不截断；业界 responsive type scale）。
function coverTitleLen(card) {
  const n = String(card.title || card.headline || "").replace(/\n/g, "").length;
  return n <= 12 ? "sl-len-lg" : n <= 18 ? "sl-len-md" : n <= 26 ? "sl-len-sm" : "sl-len-xs";
}

function richText(value = "") {
  // esc() does not touch * or _, so markdown inline markers survive escaping
  return esc(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.+?)__/g, '<span class="keep">$1</span>')
    .replace(/\r?\n/g, "<br>");
}

function foot(brief, card) {
  // 中性化（对外开源）：默认不印内部品牌名，仅用户显式 brand/meta.brand 才署名；否则左 span 留空（保 DOM 结构不崩）。
  const brand = card.brand || brief.meta?.brand || "";
  const note = card.note || card.footer || brief.meta?.footer || "";
  return `<div class="foot"><span>${brand ? esc(brand) : ""}</span><span>${esc(note)}</span></div>`;
}

function posterOpen(brief, card, layoutClass) {
  const format = card.format || brief.meta?.format || brief.meta?.platform || "xhs";
  const style = getStyle(card.style || brief.meta?.style);
  const vars = styleVars(style.css);
  const dataName = card.name || card.id || card.layout || "poster";
  const tone = card.paperTone ? ` sp-tone-${attr(card.paperTone)}` : "";
  const variant = card.variant ? ` sp-var-${attr(card.variant)}` : "";
  const grade = card.grade ? ` sp-grade-${attr(card.grade)}` : "";   // 独家影像配方 opt-in（与 variant 正交，不动默认）
  // 封面点睛色可主题化（opt-in card.accent → Bridge --bc-gold 覆盖；不动默认/其它系统）
  const accentVar = card.accent ? `--bc-gold:${card.accent};` : "";
  const cool = card.cool ? " bc-cool" : "";   // Bridge 冷 misty 调（雾/暗场偏冷蓝灰，misty 视觉方向）
  return `<section class="poster ${formatClass(format)} ${layoutClass}${tone}${variant}${grade}${cool}" data-name="${attr(dataName)}" data-style="${attr(style.id)}" style="${attr(accentVar + vars)}">`;
}

function statementCover(brief, card) {
  const chrome = (card.style || brief.meta?.style || "").includes("chrome") ? `<div class="chrome-orb"></div>` : "";
  const signal = (card.style || brief.meta?.style || "").includes("signal") ? `<div class="signal-band"></div>` : "";
  return `
${posterOpen(brief, card, "layout-statement-cover")}
  ${chrome}${signal}
  <div>${miniLabel(card.kicker || brief.meta?.topic)}</div>
  <div class="statement-main">
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p class="subtitle">${esc(card.subtitle)}</p>` : ""}
    ${list(card.points)}
  </div>
  <div class="mark">${esc(card.mark || brief.meta?.mark || "FIXED LAYOUT / SOCIAL CARD")}</div>
  ${foot(brief, card)}
</section>`;
}

function essaySplit(brief, card) {
  return `
${posterOpen(brief, card, "layout-essay-split")}
  <div class="essay-copy">
    ${miniLabel(card.kicker)}
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
    ${list(card.points)}
    ${foot(brief, card)}
  </div>
  <figure class="media-frame essay-media">${imageTag(card.image)}</figure>
</section>`;
}

function neoNewspaper(brief, card) {
  const cols = ensureArray(card.columns || card.points).slice(0, 3);
  return `
${posterOpen(brief, card, "layout-neo-newspaper")}
  <div class="news-head">
    ${miniLabel(card.kicker || "Editorial")}
    <h1>${esc(cardTitle(card))}</h1>
  </div>
  <div class="news-col">
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
    ${cols.map(c => `<div class="card"><h3>${esc(c.title || c)}</h3>${c.body ? `<p>${esc(c.body)}</p>` : ""}</div>`).join("")}
  </div>
  <aside class="side-note">
    <h3>${esc(card.sideTitle || "观察")}</h3>
    <p>${esc(card.sideNote || card.note || "把信息做成结构，而不是把信息堆成噪声。")}</p>
  </aside>
</section>`;
}

function quoteFocus(brief, card) {
  return `
${posterOpen(brief, card, "layout-quote-focus")}
  <div class="quote-mark">“</div>
  <div class="quote-text">${esc(card.quote || cardTitle(card))}</div>
  ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  ${foot(brief, card)}
</section>`;
}

function threeLaneFlow(brief, card) {
  const steps = ensureArray(card.steps || card.points).slice(0, 3);
  return `
${posterOpen(brief, card, "layout-three-lane-flow")}
  <div class="flow-head">
    ${miniLabel(card.kicker || "Flow")}
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  <div class="flow-grid">
    ${steps.map((s, i) => `<div class="card flow-card">
      <div class="flow-index">${i + 1}</div>
      <h3>${esc(s.title || s)}</h3>
      ${s.body ? `<p>${esc(s.body)}</p>` : ""}
    </div>`).join("")}
  </div>
  ${foot(brief, card)}
</section>`;
}

function stackMap(brief, card) {
  const layers = ensureArray(card.layers || card.points).slice(0, 5);
  return `
${posterOpen(brief, card, "layout-stack-map")}
  <div>
    ${miniLabel(card.kicker || "Stack")}
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  <div class="stack">
    ${layers.map((l, i) => `<div class="card stack-layer">
      <div class="layer-no">${String(i + 1).padStart(2, "0")}</div>
      <div><h3>${esc(l.title || l)}</h3>${l.body ? `<p>${esc(l.body)}</p>` : ""}</div>
    </div>`).join("")}
  </div>
  ${foot(brief, card)}
</section>`;
}

function dashboardGrid(brief, card) {
  const panels = ensureArray(card.panels || card.points).slice(0, 6);
  return `
${posterOpen(brief, card, "layout-dashboard-grid")}
  <div>
    ${miniLabel(card.kicker || "Dashboard")}
    <h1>${esc(cardTitle(card))}</h1>
  </div>
  <div class="dashboard">
    ${panels.map(p => `<div class="card">
      <div class="panel-value">${esc(p.value || p.title || "OK")}</div>
      <h3>${esc(p.title || p.label || "")}</h3>
      ${p.body ? `<p>${esc(p.body)}</p>` : ""}
    </div>`).join("")}
  </div>
  ${foot(brief, card)}
</section>`;
}

function loopCircuit(brief, card) {
  const steps = ensureArray(card.steps || card.points).slice(0, 4);
  return `
${posterOpen(brief, card, "layout-loop-circuit")}
  <div>
    ${miniLabel(card.kicker || "Loop")}
    <h1>${esc(cardTitle(card))}</h1>
  </div>
  <div class="loop">
    ${steps.map((s, i) => `<div class="card"><h3>${i + 1}. ${esc(s.title || s)}</h3>${s.body ? `<p>${esc(s.body)}</p>` : ""}</div>`).join("")}
  </div>
  ${foot(brief, card)}
</section>`;
}

function bigNumberPoster(brief, card) {
  const bars = ensureArray(card.bars || [35, 56, 42, 78, 96, 64]);
  return `
${posterOpen(brief, card, "layout-big-number-poster")}
  <div>${miniLabel(card.kicker || "Signal")}<h1>${esc(cardTitle(card))}</h1></div>
  <div class="number-row">
    <div class="big-number">${esc(card.number || "5×")}</div>
    <div>
      ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
      <div class="micro-chart">${bars.map(v => `<div class="bar" style="height:${Math.max(12, Number(v) || 40)}%"></div>`).join("")}</div>
    </div>
  </div>
  ${foot(brief, card)}
</section>`;
}

function trendCompare(brief, card) {
  const left = card.left || { title: "Before", body: "手动、串行、反复返工" };
  const right = card.right || { title: "After", body: "拆成任务，并行推进" };
  return `
${posterOpen(brief, card, "layout-trend-compare")}
  <div>${miniLabel(card.kicker || "Compare")}<h1>${esc(cardTitle(card))}</h1></div>
  <div class="compare">
    <div class="card"><h2>${esc(left.title)}</h2><p>${esc(left.body)}</p>${list(left.points)}</div>
    <div class="card"><h2 class="accent">${esc(right.title)}</h2><p>${esc(right.body)}</p>${list(right.points)}</div>
  </div>
  ${foot(brief, card)}
</section>`;
}

function researchAtlas(brief, card) {
  const items = ensureArray(card.items || card.points).slice(0, 5);
  return `
${posterOpen(brief, card, "layout-research-atlas")}
  <div>${miniLabel(card.kicker || "Atlas")}<h1>${esc(cardTitle(card))}</h1></div>
  <div class="atlas">
    ${items.map((it, i) => `<div class="card"><div class="eyebrow">${String(i + 1).padStart(2, "0")}</div><h3>${esc(it.title || it)}</h3>${it.body ? `<p>${esc(it.body)}</p>` : ""}</div>`).join("")}
  </div>
  ${foot(brief, card)}
</section>`;
}

function evidenceWall(brief, card) {
  const items = ensureArray(card.evidence || card.items || card.points).slice(0, 6);
  return `
${posterOpen(brief, card, "layout-evidence-wall")}
  <div>${miniLabel(card.kicker || "Evidence")}<h1>${esc(cardTitle(card))}</h1></div>
  <div class="evidence-grid">
    ${items.map((it, i) => `<div class="card evidence">
      <div class="eyebrow">EVIDENCE ${i + 1}</div>
      ${it.image ? `<figure class="media-frame" style="min-height:150px">${imageTag(it.image)}</figure>` : ""}
      <h3>${esc(it.title || it)}</h3>
      ${it.body ? `<p>${esc(it.body)}</p>` : ""}
    </div>`).join("")}
  </div>
  ${foot(brief, card)}
</section>`;
}

function productHero(brief, card) {
  return `
${posterOpen(brief, card, "layout-product-hero")}
  <div class="product-copy">
    ${miniLabel(card.kicker || "Product")}
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  <figure class="media-frame product-shot">${imageTag(card.image)}</figure>
</section>`;
}

function featureStrip(brief, card) {
  const features = ensureArray(card.features || card.points).slice(0, 5);
  return `
${posterOpen(brief, card, "layout-feature-strip")}
  <div>${miniLabel(card.kicker || "Features")}<h1>${esc(cardTitle(card))}</h1>${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}</div>
  <div class="feature-list">
    ${features.map((f, i) => `<div class="card feature-item">
      <div class="feature-dot">${i + 1}</div>
      <div><h3>${esc(f.title || f)}</h3>${f.body ? `<p>${esc(f.body)}</p>` : ""}</div>
    </div>`).join("")}
  </div>
  ${foot(brief, card)}
</section>`;
}

function featureMatrix(brief, card) {
  const features = ensureArray(card.features || card.points).slice(0, 8);
  return `
${posterOpen(brief, card, "layout-feature-matrix")}
  <div>${miniLabel(card.kicker || "Matrix")}<h1>${esc(cardTitle(card))}</h1></div>
  <div class="matrix">
    ${features.map(f => `<div class="card"><h3>${esc(f.title || f)}</h3>${f.body ? `<p>${esc(f.body)}</p>` : ""}</div>`).join("")}
  </div>
  ${foot(brief, card)}
</section>`;
}

function productStoryline(brief, card) {
  const rows = ensureArray(card.timeline || card.points).slice(0, 5);
  return `
${posterOpen(brief, card, "layout-product-storyline")}
  <div>${miniLabel(card.kicker || "Story")}<h1>${esc(cardTitle(card))}</h1></div>
  <div class="timeline">
    ${rows.map((r, i) => `<div class="timeline-row"><div class="eyebrow">${r.time || `0${i + 1}`}</div><div><h3>${esc(r.title || r)}</h3>${r.body ? `<p>${esc(r.body)}</p>` : ""}</div></div>`).join("")}
  </div>
  ${foot(brief, card)}
</section>`;
}

function alertBurst(brief, card) {
  const tags = ensureArray(card.tags || ["重要", "变化", "现在"]);
  return `
${posterOpen(brief, card, "layout-alert-burst")}
  <div class="signal-band"></div>
  ${miniLabel(card.kicker || "Alert")}
  <h1>${esc(cardTitle(card))}</h1>
  ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  <div class="alert-tags">${tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>
</section>`;
}

function roundupStack(brief, card) {
  const items = ensureArray(card.items || card.points).slice(0, 8);
  return `
${posterOpen(brief, card, "layout-roundup-stack")}
  <div>${miniLabel(card.kicker || "Roundup")}<h1>${esc(cardTitle(card))}</h1></div>
  <div class="roundup">
    ${items.map((it, i) => `<div class="round-row"><div class="round-no">${i + 1}</div><div><h3>${esc(it.title || it)}</h3>${it.body ? `<p>${esc(it.body)}</p>` : ""}</div></div>`).join("")}
  </div>
  ${foot(brief, card)}
</section>`;
}

function checklistStrip(brief, card) {
  const checks = ensureArray(card.checks || card.points).slice(0, 7);
  return `
${posterOpen(brief, card, "layout-checklist-strip")}
  <div>${miniLabel(card.kicker || "Checklist")}<h1>${esc(cardTitle(card))}</h1></div>
  <div class="checks">
    ${checks.map(ch => `<div class="card check"><div class="check-icon">✓</div><div><h3>${esc(ch.title || ch)}</h3>${ch.body ? `<p>${esc(ch.body)}</p>` : ""}</div></div>`).join("")}
  </div>
  ${foot(brief, card)}
</section>`;
}

function memeFocus(brief, card) {
  return `
${posterOpen(brief, card, "layout-meme-focus")}
  <h1>${esc(cardTitle(card))}</h1>
  ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
</section>`;
}

function diaryScrapbook(brief, card) {
  const notes = ensureArray(card.notes || card.points).slice(0, 3);
  return `
${posterOpen(brief, card, "layout-diary-scrapbook")}
  <div>${miniLabel(card.kicker || "Diary")}<h1>${esc(cardTitle(card))}</h1></div>
  <div class="scrap-grid">
    <figure class="media-frame photo-note">${imageTag(card.image)}</figure>
    <div class="note card">
      <h3>${esc(card.subtitle || "现场记录")}</h3>
      ${list(notes)}
      ${card.annotation ? `<p class="annotation">${esc(card.annotation)}</p>` : ""}
    </div>
  </div>
  ${foot(brief, card)}
</section>`;
}

function annotatedChecklist(brief, card) {
  const checks = ensureArray(card.checks || card.points).slice(0, 6);
  return `
${posterOpen(brief, card, "layout-annotated-checklist")}
  <div>${miniLabel(card.kicker || "Notes")}<h1>${esc(cardTitle(card))}</h1>${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}</div>
  <div class="checks">
    ${checks.map(ch => `<div class="card check"><div class="check-icon">→</div><div><h3>${esc(ch.title || ch)}</h3>${ch.body ? `<p>${esc(ch.body)}</p>` : ""}</div></div>`).join("")}
  </div>
  ${card.annotation ? `<div class="annotation">${esc(card.annotation)}</div>` : ""}
  ${foot(brief, card)}
</section>`;
}

function spMfCoverR08(brief, card) {
  const checks = ensureArray(card.checks || card.points).slice(0, 5);
  return `
${posterOpen(brief, card, "layout-sp-mf-cover-r08 sp-mf-page")}
  <div class="sp-mf-top">
    <div>
      <div class="sp-mf-kicker">${esc(card.kicker || "Still Paper / SP-01")}</div>
      <h1>${esc(cardTitle(card))}</h1>
    </div>
    <div class="sp-mf-folio">${esc(card.folio || "01")}</div>
  </div>
  ${card.subtitle ? `<p class="sp-mf-cover-lead">${esc(card.subtitle)}</p>` : ""}
  <div class="sp-mf-cover-list">
    ${checks.map((ch, index) => `<div class="sp-mf-cover-row">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div><h3>${esc(ch.title || ch)}</h3>${ch.body ? `<p>${esc(ch.body)}</p>` : ""}</div>
    </div>`).join("")}
  </div>
  ${card.annotation ? `<div class="sp-mf-annotation">${esc(card.annotation)}</div>` : ""}
  ${foot(brief, card)}
</section>`;
}

function spMfB01PaperNote(brief, card) {
  const notes = ensureArray(card.notes || card.points).slice(0, 2);
  return `
${posterOpen(brief, card, "layout-sp-mf-b01 sp-mf-page")}
  <div class="sp-mf-kicker">${esc(card.kicker || "Paper Note")}</div>
  <div class="sp-mf-note-main">
    <h1>${esc(cardTitle(card))}</h1>
    ${card.body ? `<p>${esc(card.body)}</p>` : card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  ${notes.length ? `<div class="sp-mf-note-lines">
    ${notes.map(note => `<div class="sp-mf-note-line">${esc(note.title || note)}</div>`).join("")}
  </div>` : ""}
  ${foot(brief, card)}
</section>`;
}

function spMfB04FieldList(brief, card) {
  const items = ensureArray(card.items || card.checks || card.points).slice(0, 5);
  return `
${posterOpen(brief, card, "layout-sp-mf-b04 sp-mf-page")}
  <div class="sp-mf-top">
    <div>
      <div class="sp-mf-kicker">${esc(card.kicker || "Field List")}</div>
      <h1>${esc(cardTitle(card))}</h1>
    </div>
    <div class="sp-mf-folio">${esc(card.folio || "")}</div>
  </div>
  ${card.subtitle ? `<p class="sp-mf-list-lead">${esc(card.subtitle)}</p>` : ""}
  <div class="sp-mf-list">
    ${items.map((item, index) => `<div class="sp-mf-list-row">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div><h3>${esc(item.title || item)}</h3>${item.body ? `<p>${esc(item.body)}</p>` : ""}</div>
    </div>`).join("")}
  </div>
  ${card.note ? `<div class="sp-mf-annotation">${esc(card.note)}</div>` : ""}
  ${foot(brief, card)}
</section>`;
}

function spMfB06QuoteContinuation(brief, card) {
  const formulas = ensureArray(card.formulas || card.points).slice(0, 3);
  return `
${posterOpen(brief, card, "layout-sp-mf-b06 sp-mf-page")}
  <div class="sp-mf-kicker">${esc(card.kicker || "Quote Continuation")}</div>
  <div class="sp-mf-quote-block">
    <div class="sp-mf-quote-mark">“</div>
    <h1>${esc(card.quote || cardTitle(card))}</h1>
    ${card.support ? `<p>${esc(card.support)}</p>` : card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  ${formulas.length ? `<div class="sp-mf-formula-row">
    ${formulas.map(item => `<div><h3>${esc(item.title || item)}</h3>${item.body ? `<p>${esc(item.body)}</p>` : ""}</div>`).join("")}
  </div>` : ""}
  ${foot(brief, card)}
</section>`;
}

function spMfB08ClosingNote(brief, card) {
  const actions = ensureArray(card.actions || card.points).slice(0, 4);
  return `
${posterOpen(brief, card, "layout-sp-mf-b08 sp-mf-page")}
  <div class="sp-mf-kicker">${esc(card.kicker || "Closing Note")}</div>
  <div class="sp-mf-closing-main">
    <h1>${esc(cardTitle(card))}</h1>
    ${card.body ? `<p>${esc(card.body)}</p>` : card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  <div class="sp-mf-action-list">
    ${actions.map((action, index) => `<div class="sp-mf-action">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${esc(action.title || action)}</strong>
      ${action.body ? `<p>${esc(action.body)}</p>` : ""}
    </div>`).join("")}
  </div>
  ${card.note ? `<div class="sp-mf-annotation">${esc(card.note)}</div>` : ""}
  ${foot(brief, card)}
</section>`;
}

function spMfV02Header(card, fallbackKicker) {
  return `<div class="sp-mf-v02-head">
    <div>
      <div class="sp-mf-v02-kicker">${esc(card.kicker || fallbackKicker)}</div>
      ${card.readerQuestion ? `<p class="sp-mf-v02-question">${esc(card.readerQuestion)}</p>` : ""}
    </div>
    <div class="sp-mf-v02-folio">${esc(card.folio || "")}</div>
  </div>`;
}

function spMfV02Note(card) {
  return card.note ? `<div class="sp-mf-v02-note">${esc(card.note)}</div>` : "";
}

function spMfF01MistCoverClaim(brief, card) {
  const points = ensureArray(card.points).slice(0, 4);
  return `
${posterOpen(brief, card, "layout-sp-mf-f01 sp-mf-page sp-mf-v02")}
  ${spMfV02Header(card, "选题流水线")}
  <div class="sp-mf-v02-cover-main">
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  <div class="sp-mf-v02-cover-flow">
    ${points.map((item, index) => `<div class="sp-mf-v02-flow-node">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${esc(item.title || item)}</strong>
      ${item.body ? `<p>${esc(item.body)}</p>` : ""}
    </div>`).join("")}
  </div>
  ${spMfV02Note(card)}
  ${foot(brief, card)}
</section>`;
}

function spMfF02OldNewPassage(brief, card) {
  const pair = ensureArray(card.compare || card.points).slice(0, 2);
  return `
${posterOpen(brief, card, "layout-sp-mf-f02 sp-mf-page sp-mf-v02")}
  ${spMfV02Header(card, "新旧对照")}
  <div class="sp-mf-v02-title-block">
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  <div class="sp-mf-v02-compare-grid">
    ${pair.map((item, index) => `<div class="sp-mf-v02-compare-card ${index === 1 ? "is-primary" : ""}">
      <div class="sp-mf-v02-card-label">${esc(item.label || (index === 0 ? "旧方式" : "新系统"))}</div>
      <h2>${esc(item.title || item)}</h2>
      ${item.body ? `<p>${esc(item.body)}</p>` : ""}
      ${item.points ? `<ul>${ensureArray(item.points).slice(0, 3).map(point => `<li>${esc(point.title || point)}</li>`).join("")}</ul>` : ""}
    </div>`).join("")}
  </div>
  ${spMfV02Note(card)}
  ${foot(brief, card)}
</section>`;
}

function spMfF03SourceLedger(brief, card) {
  const rows = ensureArray(card.rows || card.items || card.points).slice(0, 4);
  return `
${posterOpen(brief, card, "layout-sp-mf-f03 sp-mf-page sp-mf-v02")}
  ${spMfV02Header(card, "来源账本")}
  <div class="sp-mf-v02-title-block compact">
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  <div class="sp-mf-v02-ledger">
    ${rows.map((row, index) => `<div class="sp-mf-v02-ledger-row">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div><h3>${esc(row.title || row.source || row)}</h3>${row.body ? `<p>${esc(row.body)}</p>` : ""}</div>
      <strong>${esc(row.filter || row.role || "")}</strong>
    </div>`).join("")}
  </div>
  ${spMfV02Note(card)}
  ${foot(brief, card)}
</section>`;
}

function spMfF04KeywordNet(brief, card) {
  const groups = ensureArray(card.groups || card.items || card.points).slice(0, 3);
  return `
${posterOpen(brief, card, "layout-sp-mf-f04 sp-mf-page sp-mf-v02")}
  ${spMfV02Header(card, "关键词渔网")}
  <div class="sp-mf-v02-title-block">
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  <div class="sp-mf-v02-net">
    ${groups.map((group, index) => `<div class="sp-mf-v02-net-group tone-${index + 1}">
      <h3>${esc(group.title || group)}</h3>
      ${group.body ? `<p>${esc(group.body)}</p>` : ""}
      <div class="sp-mf-v02-tags">${ensureArray(group.tags || group.points).slice(0, 5).map(tag => `<span>${esc(tag.title || tag)}</span>`).join("")}</div>
    </div>`).join("")}
  </div>
  ${spMfV02Note(card)}
  ${foot(brief, card)}
</section>`;
}

function spMfF05VerticalFlow(brief, card) {
  const steps = ensureArray(card.steps || card.points).slice(0, 5);
  return `
${posterOpen(brief, card, "layout-sp-mf-f05 sp-mf-page sp-mf-v02")}
  ${spMfV02Header(card, "流程压缩")}
  <div class="sp-mf-v02-title-block compact">
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  <div class="sp-mf-v02-vertical-flow">
    ${steps.map((step, index) => `<div class="sp-mf-v02-step">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <div><h3>${esc(step.title || step)}</h3>${step.body ? `<p>${esc(step.body)}</p>` : ""}</div>
      ${step.output ? `<strong>${esc(step.output)}</strong>` : ""}
    </div>`).join("")}
  </div>
  ${spMfV02Note(card)}
  ${foot(brief, card)}
</section>`;
}

function spMfF06JudgmentMatrix(brief, card) {
  const questions = ensureArray(card.questions || card.items || card.points).slice(0, 4);
  return `
${posterOpen(brief, card, "layout-sp-mf-f06 sp-mf-page sp-mf-v02")}
  ${spMfV02Header(card, "人工判断")}
  <div class="sp-mf-v02-title-block compact">
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  <div class="sp-mf-v02-matrix">
    ${questions.map((item, index) => `<div class="sp-mf-v02-matrix-cell">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <h3>${esc(item.title || item)}</h3>
      ${item.body ? `<p>${esc(item.body)}</p>` : ""}
    </div>`).join("")}
  </div>
  ${spMfV02Note(card)}
  ${foot(brief, card)}
</section>`;
}

function spMfF07FormulaNote(brief, card) {
  const formulas = ensureArray(card.formulas || card.points).slice(0, 3);
  return `
${posterOpen(brief, card, "layout-sp-mf-f07 sp-mf-page sp-mf-v02")}
  ${spMfV02Header(card, "结构公式")}
  <div class="sp-mf-v02-formula-hero">
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  <div class="sp-mf-v02-formulas">
    ${formulas.map(item => `<div>
      <strong>${esc(item.title || item)}</strong>
      ${item.body ? `<p>${esc(item.body)}</p>` : ""}
    </div>`).join("")}
  </div>
  ${spMfV02Note(card)}
  ${foot(brief, card)}
</section>`;
}

function spMfF08ActionField(brief, card) {
  const actions = ensureArray(card.actions || card.points).slice(0, 6);
  return `
${posterOpen(brief, card, "layout-sp-mf-f08 sp-mf-page sp-mf-v02")}
  ${spMfV02Header(card, "今天执行")}
  <div class="sp-mf-v02-title-block">
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  <div class="sp-mf-v02-action-grid">
    ${actions.map((action, index) => `<div class="sp-mf-v02-action">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <h3>${esc(action.title || action)}</h3>
      ${action.body ? `<p>${esc(action.body)}</p>` : ""}
    </div>`).join("")}
  </div>
  ${spMfV02Note(card)}
  ${foot(brief, card)}
</section>`;
}

function caseNote(brief, card) {
  return `
${posterOpen(brief, card, "layout-case-note")}
  <div>${miniLabel(card.kicker || "Case")}<h1>${esc(cardTitle(card))}</h1></div>
  <div class="case-grid">
    <div class="card"><h3>${esc(card.caseTitle || "案例")}</h3><p>${esc(card.caseBody || card.subtitle || "")}</p></div>
    <div class="card"><h3>Takeaways</h3>${list(card.points)}</div>
  </div>
  ${foot(brief, card)}
</section>`;
}

function lifestyleStory(brief, card) {
  const src = imageSrc(card.image);
  const pos = imagePos(card.image);
  return `
${posterOpen(brief, card, "layout-lifestyle-story")}
  <figure class="lifestyle-bg" style="background-image:url('${attr(src)}');background-position:${attr(pos)}"></figure>
  <div class="card lifestyle-panel">
    ${miniLabel(card.kicker || "Story")}
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
</section>`;
}


function screenshotFocus(brief, card) {
  return `
${posterOpen(brief, card, "layout-screenshot-focus")}
  <div class="grid-bg"></div>
  <div class="screenshot-copy">
    ${miniLabel(card.kicker || "Screenshot")}
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  <figure class="media-frame frame-shot ${card.device === "phone" ? "device-phone" : "device-browser"}">
    <div class="browser-bar"><span></span><span></span><span></span></div>
    ${imageTag(card.image)}
  </figure>
  ${foot(brief, card)}
</section>`;
}

function wechatCoverPair(brief, card) {
  const wide = { ...card, name: `${card.name || "cover"}-wide`, format: "wide", layout: "statement-cover", title: card.title, subtitle: card.subtitle };
  const square = { ...card, name: `${card.name || "cover"}-square`, format: "square", layout: "statement-cover", title: card.shortTitle || String(card.title || "").slice(0, 12), subtitle: card.squareSubtitle || card.subtitle };
  return `${statementCover(brief, wide)}\n${statementCover(brief, square)}`;
}


function xhsTextBomb(brief, card) {
  return `
${posterOpen(brief, card, "layout-xhs-text-bomb")}
  <figure class="xhs-bg">${imageTag(card.image)}</figure>
  <div class="xhs-scrim"></div>
  <div class="xhs-copy">
    ${card.badge ? `<div class="xhs-badge">${esc(card.badge)}</div>` : ""}
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  ${card.sticker ? `<div class="xhs-sticker">${esc(card.sticker)}</div>` : ""}
</section>`;
}

function xhsPhotoProof(brief, card) {
  return `
${posterOpen(brief, card, "layout-xhs-photo-proof")}
  <figure class="xhs-photo">${imageTag(card.image)}</figure>
  <div class="xhs-photo-caption">
    ${miniLabel(card.kicker || "Real Feed")}
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
</section>`;
}

function xhsHookList(brief, card) {
  const items = ensureArray(card.items || card.points).slice(0, 5);
  return `
${posterOpen(brief, card, "layout-xhs-hook-list")}
  <div class="xhs-topline">
    ${miniLabel(card.kicker || "Cover Hooks")}
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  <div class="xhs-hook-grid">
    ${items.map((it, i) => `<div class="xhs-hook-card">
      <div class="xhs-hook-no">${String(i + 1).padStart(2, "0")}</div>
      <h3>${esc(it.title || it)}</h3>
      ${it.body ? `<p>${esc(it.body)}</p>` : ""}
    </div>`).join("")}
  </div>
  ${foot(brief, card)}
</section>`;
}


// ============================================================
// SP-WS Still Paper / Warm Study — shared structural helpers
// ============================================================
function spKicker(card) {
  const k = card.kicker;
  let en = "MORNING NOTES";
  let cn = "晨间手记";
  if (k && typeof k === "object") {
    en = k.en ?? en;
    cn = k.cn ?? cn;
  } else if (typeof k === "string" && k) {
    cn = k;
    en = "";
  }
  return { en, cn };
}

// 顶栏：朱砂点 + 栏目章(英文大写 + 中文) + 右侧刊号框 或 页码
function spTop(card, { variant = "issue" } = {}) {
  const { en, cn } = spKicker(card);
  const right = variant === "page"
    ? `<div class="sp-page">${esc(card.page || card.folio || "")}</div>`
    : `<div class="sp-issue">${esc(card.issue || card.folio || "NO.01")}</div>`;
  return `<div class="sp-top">
    <div class="sp-kicker"><div class="sp-dot"></div><div>${en ? `<div class="en">${esc(en).replace(/ /g, "&nbsp;")}</div>` : ""}<div class="cn">${esc(cn)}</div></div></div>
    ${right}
  </div>
  <div class="sp-rule-top"></div>`;
}

// 当前日期工具：生成图片的日期一律用「用户当前日期」，不硬编码年份（跨年/跨月自动正确）。
// 引擎是 build 时 node 运行，new Date() 安全（非 workflow 脚本）。需日期的卡——footer 年 / issue 年月 / FIELD NOTE·SCREENSHOT 时间戳——都走这里。
function nowParts() {
  const d = new Date();
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0"), mm = String(d.getMinutes()).padStart(2, "0");
  return { year: String(y), yearMonth: `${y}.${m}`, date: `${y}-${m}-${day}`, dateSlash: `${y} / ${m} / ${day}`, datetime: `${y}-${m}-${day} ${hh}:${mm}` };
}

// 页脚：发丝线=footer border-top + padding，note 两端对齐印章（封面用，印章 50px）
function spFooter(brief, card) {
  // 中性化（对外开源）：默认不印视觉语言内部名（旧"STILL PAPER·温习"），仅用户 footerEn/brand 才显署名；否则只留年份 + 印章 + 发丝线
  const en = card.footerEn || card.brand || brief.meta?.brand || "";
  const cn = card.footerCn || "";
  const year = card.footerYear || nowParts().year;
  const seal = card.seal || "记";
  const sig = en ? `<span class="en">${esc(en)}</span>${cn ? `&nbsp;·&nbsp;<span class="cn">${esc(cn)}</span>` : ""}&nbsp;&nbsp;` : "";
  return `<div class="sp-footer">
    <div class="note">${sig}${esc(year)}</div>
    ${spSeal(seal)}
  </div>`;
}

function spSeal(char) {
  return `<div class="sp-seal"><span>${esc(char || "记")}</span></div>`;
}

// 页脚（分体变体）：独立发丝线 + 左 note + 右下印章（正文页用，印章 58px）
function spFooterSplit(brief, card) {
  // 中性化（对外开源）：默认不印视觉语言内部名，仅用户 footerEn/brand 才显署名；否则只留年份 + 印章 + 发丝线
  const en = card.footerEn || card.brand || brief.meta?.brand || "";
  const cn = card.footerCn || "";
  const year = card.footerYear || nowParts().year;
  const seal = card.seal || "记";
  const sig = en ? `<span class="en">${esc(en)}</span>${cn ? `&nbsp;&nbsp;·&nbsp;&nbsp;<span class="cn">${esc(cn)}</span>` : ""}&nbsp;&nbsp;` : "";
  return `<div class="sp-rule-foot"></div>
  <div class="sp-foot">${sig}${esc(year)}</div>
  <div class="sp-seal-abs"><span>${esc(seal)}</span></div>`;
}

// 静纸暖墨三调 duotone 滤镜（栗褐→驼→cream），独家影像配方·纸本暖调版；仅 grade="duo" 注入
function spDuoFilter() {
  return `<svg class="sp-duo-def" width="0" height="0" aria-hidden="true"><filter id="sp-duo" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"/><feComponentTransfer><feFuncR type="table" tableValues="0.18 0.62 0.90"/><feFuncG type="table" tableValues="0.11 0.49 0.86"/><feFuncB type="table" tableValues="0.06 0.36 0.78"/></feComponentTransfer></filter></svg>`;
}

// 骨架 A 图为主角（母版 recipe-test-01）
function spWsCoverPhoto(brief, card) {
  return `
${posterOpen(brief, card, "layout-sp-ws-cover-photo sp-paper")}
  ${card.grade === "duo" ? spDuoFilter() : ""}
  ${spTop(card, { variant: "issue" })}
  <div class="sp-title-wrap"><h1 class="title">${richText(cardTitle(card))}</h1>${card.titleEn ? `<div class="title-en">${esc(card.titleEn)}</div>` : ""}</div>
  ${card.lead || card.subtitle ? `<p class="lead">${richText(card.lead || card.subtitle)}</p>` : ""}
  <div class="hero">${imageTag(card.image, "")}</div>
  ${spFooter(brief, card)}
</section>`;
}

// 骨架 B 图井（母版 cover-draft-06）
function spWsCoverWell(brief, card) {
  return `
${posterOpen(brief, card, "layout-sp-ws-cover-well sp-paper")}
  ${spTop(card, { variant: "issue" })}
  <div class="sp-title-wrap"><h1 class="title">${richText(cardTitle(card))}</h1>${card.titleEn ? `<div class="title-en">${esc(card.titleEn)}</div>` : ""}</div>
  ${card.lead || card.subtitle ? `<p class="lead">${richText(card.lead || card.subtitle)}</p>` : ""}
  ${card.wellcap ? `<div class="wellcap">${esc(card.wellcap)}</div>` : ""}
  <div class="well">${imageTag(card.image, "")}</div>
  ${spFooterSplit(brief, card)}
</section>`;
}

// 封面母体 R04 标题文字版（无图大标题镇场 + 东方底字；对标小红书「标题文字版」+ 编辑 type-cover；不进取图 gate）
function spWsCoverStatement(brief, card) {
  return `
${posterOpen(brief, card, "layout-sp-ws-cover-statement sp-paper")}
  ${card.anchorChar ? `<div class="sp-bigchar">${esc(card.anchorChar)}</div>` : ""}
  ${spTop(card, { variant: "issue" })}
  <div class="sp-title-wrap"><h1 class="title">${richText(cardTitle(card))}</h1>${card.titleEn ? `<div class="title-en">${esc(card.titleEn)}</div>` : ""}</div>
  ${card.lead || card.subtitle ? `<p class="lead">${richText(card.lead || card.subtitle)}</p>` : ""}
  ${card.pull ? `<div class="pull"><p>${richText(card.pull)}</p></div>` : ""}
  ${spFooter(brief, card)}
</section>`;
}

// 封面母体 R05 引言压图·quote hero（大字引语主角 + 照片氛围 + 朱砂大引号装置；对标引言封面 / quote poster）
function spWsCoverQuote(brief, card) {
  return `
${posterOpen(brief, card, "layout-sp-ws-cover-quote sp-paper")}
  <div class="hero">${imageTag(card.image, "")}</div>
  ${spTop(card, { variant: "issue" })}
  <div class="qmark">${esc(card.qmark || "“")}</div>
  <blockquote class="quote">${richText(cardTitle(card))}</blockquote>
  ${card.attrib ? `<div class="attrib">${esc(card.attrib)}</div>` : ""}
  ${spFooter(brief, card)}
</section>`;
}

// 封面母体 R06 物件特写·居中框（单主体特写入纸面框 + 极简标题 + specimen 标签；对标物件观察封面 / R03 纸面物件）
function spWsCoverObject(brief, card) {
  return `
${posterOpen(brief, card, "layout-sp-ws-cover-object sp-paper")}
  ${spTop(card, { variant: "issue" })}
  <div class="sp-title-wrap"><h1 class="title">${richText(cardTitle(card))}</h1>${card.titleEn ? `<div class="title-en">${esc(card.titleEn)}</div>` : ""}</div>
  <figure class="plate"><div class="plate-img">${imageTag(card.image, "")}</div>${card.platecap ? `<figcaption>${esc(card.platecap)}</figcaption>` : ""}</figure>
  ${spFooter(brief, card)}
</section>`;
}

// 封面母体 R07 清单封面·编号脊柱（短清单做主视觉 + 朱砂编号脊柱；对标合集/攻略/今日记录封面；无图入口）
function spWsCoverIndex(brief, card) {
  const items = ensureArray(card.items).slice(0, 5);
  return `
${posterOpen(brief, card, "layout-sp-ws-cover-index sp-paper")}
  ${spTop(card, { variant: "issue" })}
  <div class="sp-title-wrap"><h1 class="title">${richText(cardTitle(card))}</h1>${card.titleEn ? `<div class="title-en">${esc(card.titleEn)}</div>` : ""}</div>
  <div class="ilist">
    ${items.map((it, i) => `<div class="irow"><div class="inum">${esc(it.num || String(i + 1).padStart(2, "0"))}</div><div class="ibody"><div class="iword">${esc(it.word || it.title || it)}</div>${it.note ? `<div class="inote">${richText(it.note)}</div>` : ""}</div></div>`).join("")}
  </div>
  ${spFooter(brief, card)}
</section>`;
}

// 封面母体 R08 数字索引·强对比（巨数字 hook + 朱砂单位点睛 + 解释标题；对标小红书强对比/数字敏感度×3、盘点合集；无图入口）
function spWsCoverNumber(brief, card) {
  return `
${posterOpen(brief, card, "layout-sp-ws-cover-number sp-paper")}
  ${spTop(card, { variant: "issue" })}
  <div class="bignum">${esc(card.bignum || "7")}</div>
  <div class="numside">
    ${card.unit ? `<div class="unit">${esc(card.unit)}</div>` : ""}
    <h1 class="title">${richText(cardTitle(card))}</h1>
    ${card.titleEn ? `<div class="title-en">${esc(card.titleEn)}</div>` : ""}
  </div>
  ${card.lead ? `<p class="lead">${richText(card.lead)}</p>` : ""}
  ${spFooter(brief, card)}
</section>`;
}

// 观点段落 + 底字（母版 body-essay）
function spWsBodyEssay(brief, card) {
  const paragraphs = ensureArray(card.paragraphs || card.points);
  // 右侧留白锚点：配图② > 竖排批注③ > 大底字① （让多张 essay 轮换，避免同质）
  const anchor = (card.image && (card.image.resolvedSrc || card.image.src))
    ? `<figure class="essay-fig">${imageTag(card.image, "")}${card.figcap ? `<figcaption>${esc(card.figcap)}</figcaption>` : ""}</figure>`
    : card.rail ? `<div class="essay-rail"><span>${esc(card.rail)}</span></div>`
    : card.anchorChar ? `<div class="sp-bigchar">${esc(card.anchorChar)}</div>` : "";
  return `
${posterOpen(brief, card, "layout-sp-ws-body-essay sp-paper")}
  ${anchor}
  ${spTop(card, { variant: "page" })}
  <h2 class="title">${richText(cardTitle(card))}</h2>
  <div class="body">
    ${paragraphs.map(p => `<p>${richText(typeof p === "string" ? p : (p.text || p.title || ""))}</p>`).join("")}
  </div>
  ${card.pull ? `<div class="pull"><p>${richText(card.pull)}</p></div>` : ""}
  ${spFooter(brief, card)}
</section>`;
}

// 纸上清单（母版 body-p02）
function spWsBodyList(brief, card) {
  const items = ensureArray(card.items || card.points).slice(0, 4);
  return `
${posterOpen(brief, card, "layout-sp-ws-body-list sp-paper")}
  ${spTop(card, { variant: "page" })}
  <h1 class="title">${richText(cardTitle(card))}</h1>
  ${card.lead || card.subtitle ? `<p class="lead">${richText(card.lead || card.subtitle)}</p>` : ""}
  <div class="list">
    ${items.map((item, index) => `<div class="row">
      <div class="num">${esc(item.num || String(index + 1).padStart(2, "0"))}</div>
      <div><div class="word">${esc(item.word || item.title || item)}</div>${item.note ? `<div class="rnote">${richText(item.note)}</div>` : ""}</div>
    </div>`).join("")}
  </div>
  ${card.closing ? `<div class="closing">${richText(card.closing)}</div>` : ""}
  ${spFooterSplit(brief, card)}
</section>`;
}

// 暗面板（母版 body-p03）
function spWsBodyPanel(brief, card) {
  const panel = card.panel || {};
  const rows = ensureArray(panel.rows || card.rows || card.points).slice(0, 3);
  return `
${posterOpen(brief, card, "layout-sp-ws-body-panel sp-paper")}
  ${spTop(card, { variant: "page" })}
  <h1 class="title">${richText(cardTitle(card))}</h1>
  ${card.lead || card.subtitle ? `<p class="lead">${richText(card.lead || card.subtitle)}</p>` : ""}
  <div class="panel">
    ${panel.label ? `<div class="plabel">${esc(panel.label)}</div>` : ""}
    ${panel.title ? `<div class="ptitle">${esc(panel.title)}</div>` : ""}
    ${rows.map(row => `<div class="prow"><div class="ptime">${esc(row.time || "")}</div><div class="ptext">${richText(row.text || row.title || row)}</div></div>`).join("")}
  </div>
  ${spFooterSplit(brief, card)}
</section>`;
}

// 引言整版（母版 body-p04）
function spWsBodyQuote(brief, card) {
  return `
${posterOpen(brief, card, "layout-sp-ws-body-quote sp-paper")}
  ${spTop(card, { variant: "page" })}
  <div class="quotemark">${esc(card.quotemark || "“")}</div>
  <h2 class="quote">${richText(card.quote || cardTitle(card))}</h2>
  ${card.src ? `<div class="src">${esc(card.src)}</div>` : ""}
  ${spFooterSplit(brief, card)}
</section>`;
}

// ============================================================
// SP-WS Still Paper — 正文机制扩展（F02–F08 移植进静纸壳：复用 .sp-paper
// 朱砂点/栏目章/发丝线/印章 + Warm/Night token + SP 字阶 + 发丝线结构替代盒子）
// ============================================================

// 步骤流 (F05 Vertical Flow)：纵向主轴贯穿 + 编号节点 + 动作/说明/输出
function spWsBodyFlow(brief, card) {
  const steps = ensureArray(card.steps || card.items || card.points).slice(0, 5);
  return `
${posterOpen(brief, card, "layout-sp-ws-body-flow sp-paper")}
  ${spTop(card, { variant: "page" })}
  <h2 class="title">${richText(cardTitle(card))}</h2>
  ${card.lead || card.subtitle ? `<p class="lead">${richText(card.lead || card.subtitle)}</p>` : ""}
  ${card.rail ? `<div class="flow-rail"><span>${esc(card.rail)}</span></div>` : ""}
  <div class="flow">
    ${steps.map((s, i) => `<div class="step">
      <div class="snum">${esc(s.num || String(i + 1).padStart(2, "0"))}</div>
      <div class="sbody">
        <div class="saction">${richText(s.title || s.word || s.action || s)}</div>
        ${s.note || s.body ? `<div class="sdesc">${richText(s.note || s.body)}</div>` : ""}
        ${s.output ? `<div class="sout">${esc(s.output)}</div>` : ""}
      </div>
    </div>`).join("")}
  </div>
  ${spFooterSplit(brief, card)}
</section>`;
}

// 地图组件 sp-ws-body-map：编辑/画报式静态路线图。对标 Kinfolk/Cereal/editorial cartography——
// route = 唯一朱砂虚线主角（figure），其余皆 ground；暖纸非白、≤3 色、对角斜势、序号圆 pin（非数字地图水滴）、
// 套印偏移手作感、极简指南针（非罗盘花）、疏密不均 + 留白呼吸。旅行 / city guide / 多 PIN 推荐场景。
// 静态 SVG，不需地图瓦片/API（见 references/map-component.md）。Catmull-Rom 平滑 route + S 形自动布点（可 x/y 覆盖）。
function spMapSmooth(pts) {
  if (!pts.length) return "";
  if (pts.length < 2) return `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}
function spWsBodyMap(brief, card) {
  const W = 1000, H = 1040;
  const raw = ensureArray(card.points || card.stops || card.items).slice(0, 6);
  const n = raw.length;
  const pts = raw.map((p, i) => {
    const t = n > 1 ? i / (n - 1) : 0.5;
    // 对角斜势下行 + S 波（非居中、非均匀），可被显式 x/y(%) 覆盖
    // 沿对角线左右交替摆动（Catmull-Rom 平滑后成蜿蜒 S 路线，用足画面宽度、非竖直清单）
    const ax = (typeof p.x === "number") ? p.x : 22 + t * 44 + (i % 2 ? 13 : -13);
    const ay = (typeof p.y === "number") ? p.y : 8 + t * 84;
    return { ...p, _x: ax / 100 * W, _y: ay / 100 * H };
  }).map(p => ({ ...p, x: p._x, y: p._y }));
  const routeD = spMapSmooth(pts);
  const route = pts.length >= 2
    ? `<path class="sp-map-route-shadow" d="${routeD}"/><path class="sp-map-route" d="${routeD}"/>`
    : "";
  const pinSvg = pts.map((p, i) => {
    const num = esc(p.num || String(i + 1));
    const lx = (p.x + 24).toFixed(1);
    const place = esc(p.place || p.word || p.title || (typeof p === "string" ? p : ""));
    const day = p.day ? `<text class="sp-map-day" x="${lx}" y="${(p.y - 30).toFixed(1)}">${esc(p.day)}</text>` : "";
    const placeT = place ? `<text class="sp-map-place" x="${lx}" y="${(p.y - 2).toFixed(1)}">${place}</text>` : "";
    const en = p.en ? `<text class="sp-map-en" x="${lx}" y="${(p.y + 20).toFixed(1)}">${esc(p.en)}</text>` : "";
    const note = p.note ? `<text class="sp-map-note" x="${lx}" y="${(p.y + (p.en ? 40 : 20)).toFixed(1)}">${esc(p.note)}</text>` : "";
    const dot = `<circle class="sp-map-dot" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="13"/><text class="sp-map-num" x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" dy=".34em">${num}</text>`;
    return `<g class="sp-map-pin">${dot}${day}${placeT}${en}${note}</g>`;
  }).join("");
  const compass = `<g class="sp-map-compass" transform="translate(${W - 64} ${H - 60})"><circle class="sp-map-compass-ring" r="25"/><line class="sp-map-needle" x1="0" y1="13" x2="0" y2="-17"/><text class="sp-map-compass-n" x="0" y="-23">N</text></g>`;
  return `
${posterOpen(brief, card, "layout-sp-ws-body-map sp-paper")}
  ${spTop(card, { variant: "page" })}
  <h2 class="title">${richText(cardTitle(card))}</h2>
  ${card.lead || card.subtitle ? `<p class="lead">${richText(card.lead || card.subtitle)}</p>` : ""}
  <div class="sp-map-wrap">
    <svg class="sp-map-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      ${route}
      ${pinSvg}
      ${compass}
    </svg>
    ${card.routeNote ? `<div class="sp-map-foot-note">${richText(card.routeNote)}</div>` : ""}
  </div>
  ${spFooterSplit(brief, card)}
</section>`;
}

// 图集 evidence wall sp-ws-body-gallery：多图照片网格 + FIG 图说。对标 NatGeo/Magnum photo essay +
// Kinfolk 留白 + SPD 模块网格——hero 领头(面积≥支撑图 2.3×)、不等分网格(忌 2×2 方阵)、caption 窄体小字贴块、
// gutter≈画幅 3%、覆盖率≤60% 留白≥40%、直角硬边、一致暖墨 duotone 分级甩 AI 套图（默认轻暖调底，grade=duo 叠强暖墨）。
// 张数→网格由 CSS data-n 切（engine 只吐图+图说，不算坐标）。每图 {image, cap, fig?}；fig 显式空串=不显示编号。
function spWsBodyGallery(brief, card) {
  const shots = ensureArray(card.shots || card.plates || card.gallery || card.images).slice(0, 5);
  const hero = shots[0] || {};
  const heroImg = hero.image || hero;
  const heroFig = hero.fig != null ? hero.fig : "FIG.01";
  const heroCap = hero.cap || hero.caption || hero.note || "";
  const rest = shots.slice(1);
  const strip = rest.map((s, i) => {
    const img = s.image || s;
    const fig = s.fig != null ? s.fig : `FIG.${String(i + 2).padStart(2, "0")}`;
    const cap = s.cap || s.caption || s.note || "";
    return `<figure class="gfig">
      <div class="gfig-img">${imageTag(img, "gallery-img")}</div>
      <figcaption class="sp-fig-cap">${fig ? `<span class="fig-no">${esc(fig)}</span>` : ""}${cap ? `<span class="fig-cap">${richText(cap)}</span>` : ""}</figcaption>
    </figure>`;
  }).join("");
  return `
${posterOpen(brief, card, "layout-sp-ws-body-gallery sp-paper")}
  ${card.grade === "duo" ? spDuoFilter() : ""}
  ${spTop(card, { variant: "page" })}
  <figure class="gallery-hero">
    <div class="gh-img">${imageTag(heroImg, "gallery-img")}</div>
    <div class="gh-veil"></div>
    <div class="gh-text">
      <h2 class="title">${richText(cardTitle(card))}</h2>
      ${card.lead || card.subtitle ? `<p class="lead">${richText(card.lead || card.subtitle)}</p>` : ""}
    </div>
    ${heroCap ? `<figcaption class="gh-cap"><span class="fig-no">${esc(heroFig)}</span><span class="fig-cap">${richText(heroCap)}</span></figcaption>` : ""}
  </figure>
  <div class="sp-gallery" data-n="${rest.length}">
    ${strip}
  </div>
  ${spFooterSplit(brief, card)}
</section>`;
}

// 边注时间轴 sp-ws-body-margin：主栏叙事 + 右边栏时间轴批注（"写作者的一天"）。对标 Tufte sidenotes +
// 编辑 marginalia + 手账时间梯——主栏宽 / 沟槽(发丝线断续) / 右边栏；节点=朱砂空心圈(非实心 badge)；
// 时间锚 baseline 跟随段落(内容驱动不等距=反课程表)；边注 0.78× 左对齐贴沟槽、不每段都配(边栏留白≥50%)。免图。
// 每 entry {time, text, note?, en?}：一行 = 主栏段 + 沟槽线 + 边栏(时间+旁注)，grid 自动按行排、行高随内容。
function spWsBodyMargin(brief, card) {
  const entries = ensureArray(card.entries || card.points || card.items).slice(0, 6);
  const rows = entries.map(e => {
    const text = typeof e === "string" ? e : (e.text || e.body || e.title || "");
    const time = e.time || "";
    const en = e.en || "";
    const note = e.note || e.annot || "";
    return `<div class="em-body"><p>${richText(text)}</p></div><div class="em-rail"></div><div class="em-side">${time ? `<div class="em-time">${esc(time)}</div>` : ""}${en ? `<div class="em-en">${esc(en)}</div>` : ""}${note ? `<div class="em-note">${richText(note)}</div>` : ""}</div>`;
  }).join("");
  return `
${posterOpen(brief, card, "layout-sp-ws-body-margin sp-paper")}
  ${spTop(card, { variant: "page" })}
  <h2 class="title">${richText(cardTitle(card))}</h2>
  ${card.lead || card.subtitle ? `<p class="lead">${richText(card.lead || card.subtitle)}</p>` : ""}
  <div class="essay-margin">
    ${rows}
  </div>
  ${spFooterSplit(brief, card)}
</section>`;
}

// 判断矩阵 (F06 Judgment Matrix)：2×2 发丝线决策格 + 编号 + 问题 + 原则（非 KPI/非盒子）
function spWsBodyMatrix(brief, card) {
  const cells = ensureArray(card.questions || card.items || card.points).slice(0, 4);
  return `
${posterOpen(brief, card, "layout-sp-ws-body-matrix sp-paper")}
  ${spTop(card, { variant: "page" })}
  ${card.anchorChar ? `<div class="matrix-anchor">${esc(card.anchorChar)}</div>` : ""}
  <h2 class="title">${richText(cardTitle(card))}</h2>
  ${card.lead || card.subtitle ? `<p class="lead">${richText(card.lead || card.subtitle)}</p>` : ""}
  <div class="matrix">
    ${cells.map((c, i) => `<div class="cell">
      <div class="cnum">${esc(c.num || String(i + 1).padStart(2, "0"))}</div>
      <div class="cq">${richText(c.title || c.q || c)}</div>
      ${c.note || c.body ? `<div class="cnote">${richText(c.note || c.body)}</div>` : ""}
    </div>`).join("")}
  </div>
  ${card.principle || card.closing ? `<div class="mprinciple">${richText(card.principle || card.closing)}</div>` : ""}
  ${spFooterSplit(brief, card)}
</section>`;
}

// 对比 (F02 Compare)：两栏对照（误区/正解），中间发丝线分隔 + 朱砂标 + 底部裁决
function spWsBodyCompare(brief, card) {
  const left = card.left || {};
  const right = card.right || {};
  const lpoints = ensureArray(left.points || left.items).slice(0, 4);
  const rpoints = ensureArray(right.points || right.items).slice(0, 4);
  const pt = p => richText(typeof p === "string" ? p : (p.word || p.text || p.title || ""));
  return `
${posterOpen(brief, card, "layout-sp-ws-body-compare sp-paper")}
  ${spTop(card, { variant: "page" })}
  ${card.anchorChar ? `<div class="compare-anchor">${esc(card.anchorChar)}</div>` : ""}
  <h2 class="title">${richText(cardTitle(card))}</h2>
  ${card.lead || card.subtitle ? `<p class="lead">${richText(card.lead || card.subtitle)}</p>` : ""}
  <div class="cmp">
    <div class="col col-a">
      <div class="clabel"><span class="cmark">${esc(left.mark || "误")}</span><span class="ctext">${esc(left.label || left.title || "")}</span></div>
      <ul class="cpoints">${lpoints.map(p => `<li>${pt(p)}</li>`).join("")}</ul>
    </div>
    <div class="col col-b">
      <div class="clabel"><span class="cmark cmark-zhu">${esc(right.mark || "正")}</span><span class="ctext">${esc(right.label || right.title || "")}</span></div>
      <ul class="cpoints">${rpoints.map(p => `<li>${pt(p)}</li>`).join("")}</ul>
    </div>
  </div>
  ${card.verdict || card.closing ? `<div class="verdict">${richText(card.verdict || card.closing)}</div>` : ""}
  ${spFooterSplit(brief, card)}
</section>`;
}

// 账本 (F03 Ledger)：发丝线行 + 编号/项/值（等宽数字右对齐）+ 合计行加重
function spWsBodyLedger(brief, card) {
  const entries = ensureArray(card.entries || card.items || card.points).slice(0, 6);
  return `
${posterOpen(brief, card, "layout-sp-ws-body-ledger sp-paper")}
  ${spTop(card, { variant: "page" })}
  <h2 class="title">${richText(cardTitle(card))}</h2>
  ${card.lead || card.subtitle ? `<p class="lead">${richText(card.lead || card.subtitle)}</p>` : ""}
  <div class="ledger">
    ${entries.map((e, i) => `<div class="lrow">
      <div class="lidx">${esc(e.num || String(i + 1).padStart(2, "0"))}</div>
      <div class="litem"><div class="lname">${richText(e.label || e.name || e.title || e)}</div>${e.note ? `<div class="lnote">${richText(e.note)}</div>` : ""}</div>
      <div class="lval">${esc(e.value || e.val || "")}</div>
    </div>`).join("")}
  </div>
  ${card.total ? `<div class="ltotal"><span class="ltlabel">${esc(card.totalLabel || "合计")}</span><span class="ltval">${esc(card.total)}</span></div>` : ""}
  ${spFooterSplit(brief, card)}
</section>`;
}

// 关键词网 (F04 Keyword-net)：编辑式关键词标注，核心词放大朱砂 + 错落 + 发丝线竖连（非 AI 词云）
function spWsBodyKeywords(brief, card) {
  const words = ensureArray(card.keywords || card.words || card.items).slice(0, 6);
  return `
${posterOpen(brief, card, "layout-sp-ws-body-keywords sp-paper")}
  ${spTop(card, { variant: "page" })}
  <h2 class="title">${richText(cardTitle(card))}</h2>
  ${card.lead || card.subtitle ? `<p class="lead">${richText(card.lead || card.subtitle)}</p>` : ""}
  <div class="keywords">
    ${words.map((w, i) => {
      const word = typeof w === "string" ? w : (w.word || w.text || "");
      const note = typeof w === "object" ? (w.note || "") : "";
      const core = typeof w === "object" && w.weight ? w.weight === "core" : i === 0;
      return `<div class="kw ${core ? "kw-core" : "kw-sub"}">
        <span class="kidx">${esc(String(i + 1).padStart(2, "0"))}</span>
        <span class="kword">${richText(word)}</span>
        ${note ? `<span class="knote">${richText(note)}</span>` : ""}
      </div>`;
    }).join("")}
  </div>
  ${spFooterSplit(brief, card)}
</section>`;
}

// 公式 (F07 Formula)：要素块 + 朱砂运算符 + 结果放大（心法/配方公式，非数学冷感）
function spWsBodyFormula(brief, card) {
  const terms = ensureArray(card.terms || card.items || card.points).slice(0, 3);
  const result = card.result || {};
  const word = t => richText(typeof t === "string" ? t : (t.word || t.title || t.text || ""));
  const tnote = t => (typeof t === "object" && t.note ? `<div class="fnote">${richText(t.note)}</div>` : "");
  return `
${posterOpen(brief, card, "layout-sp-ws-body-formula sp-paper")}
  ${spTop(card, { variant: "page" })}
  <h2 class="title">${richText(cardTitle(card))}</h2>
  ${card.lead || card.subtitle ? `<p class="lead">${richText(card.lead || card.subtitle)}</p>` : ""}
  <div class="formula">
    ${terms.map((t, i) => `${i > 0 ? `<div class="fop">${esc(card.op || "+")}</div>` : ""}<div class="fterm"><div class="fword">${word(t)}</div>${tnote(t)}</div>`).join("")}
    <div class="fop fop-eq">=</div>
    <div class="fterm fterm-result"><div class="fword">${word(result.word ? result : (card.resultWord || ""))}</div>${result.note ? `<div class="fnote">${richText(result.note)}</div>` : ""}</div>
  </div>
  ${card.closing ? `<div class="fclosing">${richText(card.closing)}</div>` : ""}
  ${spFooterSplit(brief, card)}
</section>`;
}

// 行动 (F08 Action)：并列行动项 + 朱砂方块勾标记（区别 flow 有序流）+ 可选底字/CTA
function spWsBodyAction(brief, card) {
  const actions = ensureArray(card.actions || card.items || card.points).slice(0, 5);
  return `
${posterOpen(brief, card, "layout-sp-ws-body-action sp-paper")}
  ${spTop(card, { variant: "page" })}
  ${card.anchorChar ? `<div class="action-anchor">${esc(card.anchorChar)}</div>` : ""}
  <h2 class="title">${richText(cardTitle(card))}</h2>
  ${card.lead || card.subtitle ? `<p class="lead">${richText(card.lead || card.subtitle)}</p>` : ""}
  <div class="actions">
    ${actions.map(a => `<div class="arow">
      <span class="abox"></span>
      <div class="abody"><div class="aword">${richText(typeof a === "string" ? a : (a.title || a.word || a.action || a.text || ""))}</div>${typeof a === "object" && a.note ? `<div class="anote">${richText(a.note)}</div>` : ""}</div>
    </div>`).join("")}
  </div>
  ${card.cta ? `<div class="acta">${richText(card.cta)}</div>` : ""}
  ${spFooterSplit(brief, card)}
</section>`;
}

function spCore01EditorialCover(brief, card) {
  const details = ensureArray(card.details || card.meta || card.metadata).slice(0, 4);
  // 中性化（对外开源）：缺省不写死内部主题名/版本号；仅用户显式给 footer* 才渲染那一格（空格不输出）。
  const footer = ensureArray(card.footerGroups || [
    card.footerLeft || "",
    card.footerCenter || "",
    card.footerRight || ""
  ]).filter(Boolean).slice(0, 3);
  const noteTitle = card.noteTitle || "";
  const noteBody = card.noteBody || card.note || "";
  const sourceLabel = card.sourceLabel || card.imageLabel || "";
  const sourceHandle = card.sourceHandle || brief.meta?.handle || "";
  // 中性化：meta-brand 缺省留空（不印 SP-C01 内部代号）；用户给 kicker/brand 才显署名。
  const metaBrand = card.kicker || card.brand || brief.meta?.brand || "";
  return `
${posterOpen(brief, card, "layout-sp-c01")}
  <div class="zone meta-zone">
    <div class="meta-brand">${metaBrand ? richText(metaBrand) : ""}</div>
    <div></div>
    <div class="meta-issue">${card.issue ? richText(card.issue) : ""}</div>
  </div>
  <div class="zone title-zone"><h1>${richText(cardTitle(card))}</h1></div>
  ${card.subtitle ? `<div class="zone lead-zone"><p>${esc(card.subtitle)}</p></div>` : ""}
  ${details.length ? `<div class="zone details-zone"><span class="dot"></span>${details.map(m => `<span>${esc(m)}</span>`).join("")}</div>` : ""}
  <figure class="zone image-zone">${imageTag(card.image, "sp-c01-hero-img")}</figure>
  ${(noteTitle || noteBody || sourceLabel || sourceHandle) ? `<div class="zone bottom-note-zone">
    <div class="note-copy"><div><div class="note-title">${esc(noteTitle)}</div><div class="note-body">${esc(noteBody)}</div></div></div>
    <div class="source">${esc(sourceLabel)}${sourceHandle ? `<br>${esc(sourceHandle)}` : ""}</div>
  </div>` : ""}
  ${footer.length ? `<div class="zone footer-zone">${footer.map(item => `<span>${esc(item)}</span>`).join("")}</div>` : ""}
</section>`;
}

function spCore02EssaySplit(brief, card) {
  return `
${posterOpen(brief, card, "layout-sp-c02")}
  <div class="sp-c02-copy">
    ${(card.kicker || card.brand || brief.meta?.brand) ? `<div class="sp-eyebrow">${esc(card.kicker || card.brand || brief.meta?.brand)}</div>` : ""}
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p class="sp-body">${esc(card.subtitle)}</p>` : ""}
    ${card.quote ? `<blockquote>${esc(card.quote)}</blockquote>` : ""}
    ${card.note ? `<div class="sp-small-note">${esc(card.note)}</div>` : ""}
  </div>
  <figure class="sp-c02-image">${imageTag(card.image)}</figure>
  ${foot(brief, card)}
</section>`;
}

function slCore01ProofStatement(brief, card) {
  const steps = ensureArray(card.steps || card.points).slice(0, 3);
  const metrics = ensureArray(card.metrics).slice(0, 3);
  return `
${posterOpen(brief, card, "layout-sl-c01")}
  <div class="sl-top">
    <div class="sl-eyebrow">${esc(card.kicker || card.brand || brief.meta?.brand || "")}</div>
    <div class="sl-token">${esc(card.token || "PROOF")}</div>
  </div>
  <div class="sl-hero">
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  <div class="sl-flow">
    <div class="sl-nodes">
      ${steps.map((s, i) => `<div class="sl-node">
        <div class="sl-node-index">${String(i + 1).padStart(2, "0")}</div>
        <h3>${esc(s.title || s)}</h3>
        ${s.body ? `<p>${esc(s.body)}</p>` : ""}
      </div>`).join("")}
    </div>
    ${metrics.length ? `<div class="sl-metrics">${metrics.map(m => `<div class="sl-metric"><strong>${esc(m.value || m.title || "")}</strong><span>${esc(m.label || m.body || "")}</span></div>`).join("")}</div>` : ""}
  </div>
  ${foot(brief, card)}
</section>`;
}

// Signal Proof 封面族（第二视觉语言）：共享 chrome（账本网格 + marker eyebrow + 标尺线 + mono footer），不同 hero（ledger 数据行 / metric 大指标 / verdict 判定清单）。
// 反 PPT(quality-bar 警告旧 sl 像企业 PPT)：哑面、无圆角浮卡、无柔投影、近单色 accent≤10%、数据诚信不伪造、黑体。
function slHead(card) {
  return `<div class="sl-head"><div class="sl-eyebrow"><span class="sl-mk"></span>${card.eyebrow ? `<span>${esc(card.eyebrow)}</span>` : ""}${card.board ? `<span class="sl-board">${esc(card.board)}</span>` : ""}</div><div class="sl-token">${esc(card.token || "NO.01")}</div></div>
  <div class="sl-rule"></div>`;
}
function slFootHtml(card) {
  return `<div class="sl-foot"><span class="sl-foot-tag">${card.footer ? esc(card.footer) : ""}</span><span class="sl-foot-id">${esc(card.folio || nowParts().date)}</span></div>`;
}
function slLedgerRows(rows) {
  return `<div class="sl-ledger">${rows.map((r, i) => `<div class="sl-row"><span class="sl-rn">${String(i + 1).padStart(2, "0")}</span><span class="sl-rlabel">${esc(r.label || r.title || "")}</span><span class="sl-rval">${esc(r.value || r.body || "")}</span></div>`).join("")}</div>`;
}

// SL-01 电蓝：大标题 + 等宽数字右对齐 ledger 行（数据 anchor）
function slCoverLedger(brief, card) {
  const rows = ensureArray(card.rows || card.metrics).slice(0, 4);
  return `
${posterOpen(brief, card, "layout-sl-cover-ledger sl-cover")}
  <div class="sl-grid"></div>
  ${slHead(card)}
  <h1 class="sl-title">${richText(cardTitle(card))}</h1>
  ${card.lead ? `<p class="sl-lead">${richText(card.lead)}</p>` : ""}
  ${rows.length ? slLedgerRows(rows) : ""}
  ${slFootHtml(card)}
</section>`;
}

// SL-03 珊瑚：hero 大指标（KPI/复盘）——巨数 fg 立骨 + coral delta 点睛 + 支撑 stat 行
function slCoverMetric(brief, card) {
  const stats = ensureArray(card.rows || card.metrics).slice(0, 3);
  return `
${posterOpen(brief, card, "layout-sl-cover-metric sl-cover")}
  <div class="sl-grid"></div>
  ${slHead(card)}
  ${card.title ? `<h2 class="sl-mtitle">${richText(cardTitle(card))}</h2>` : ""}
  <div class="sl-metric-hero">
    <div class="sl-bignum">${esc(card.metric || "0")}${card.delta ? `<span class="sl-delta">${esc(card.delta)}</span>` : ""}</div>
    <div class="sl-mlabel">${esc(card.metricLabel || "")}</div>
  </div>
  ${stats.length ? slLedgerRows(stats) : ""}
  ${slFootHtml(card)}
</section>`;
}

// SL-04 青柠：判定·清单（对比/决策）——sharp checklist ✓/— + verdict 块
function slCoverVerdict(brief, card) {
  const items = ensureArray(card.checks || card.points).slice(0, 5);
  return `
${posterOpen(brief, card, "layout-sl-cover-verdict sl-cover")}
  <div class="sl-grid"></div>
  ${slHead(card)}
  <h1 class="sl-title">${richText(cardTitle(card))}</h1>
  <div class="sl-checks">
    ${items.map(it => `<div class="sl-check"><span class="sl-ck ${it.no ? "no" : "yes"}">${it.no ? "—" : "✓"}</span><span class="sl-cklabel">${esc(it.label || it.title || it)}</span></div>`).join("")}
  </div>
  ${card.verdict ? `<div class="sl-verdict"><span class="sl-vlabel">${esc(card.verdictLabel || "结论")}</span><span class="sl-vtext">${richText(card.verdict)}</span></div>` : ""}
  ${slFootHtml(card)}
</section>`;
}

// hex → [r,g,b] 0~1
function hexToRgb01(hex) {
  const h = String(hex || "#2F5EA7").replace("#", "");
  const n = h.length === 3 ? h.split("").map(c => c + c).join("") : h;
  return [0, 2, 4].map(i => parseInt(n.slice(i, i + 2), 16) / 255 || 0);
}
// 三调 duotone 表（按主题 accent 算：暗部=accent×.18 / 中调=accent / 高光=accent×.3+.66 冷霜辉光）
function duotoneTable(accentHex) {
  const stop = c => `${(c * 0.18).toFixed(3)} ${c.toFixed(3)} ${(c * 0.3 + 0.66).toFixed(3)}`;
  const [r, g, b] = hexToRgb01(accentHex);
  return { r: stop(r), g: stop(g), b: stop(b) };
}

// SL hero：证据/概念图主导 + 三调 duotone(按主题 accent：暗部→accent→冷霜辉光) + 半调网点 + 网格框 + 印刷套准标记（独家影像配方）。图片冲击力 + 一眼是我们。需图。
function slCoverHero(brief, card) {
  const style = getStyle(card.style || brief.meta?.style);
  const duo = duotoneTable(style.css?.["--accent"]);
  return `
${posterOpen(brief, card, "layout-sl-cover-hero sl-cover")}
  <svg class="sl-duo-def" width="0" height="0" aria-hidden="true"><filter id="sl-duo" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"/><feComponentTransfer><feFuncR type="table" tableValues="${duo.r}"/><feFuncG type="table" tableValues="${duo.g}"/><feFuncB type="table" tableValues="${duo.b}"/></feComponentTransfer></filter></svg>
  <div class="sl-hero"><div class="sl-hero-img">${imageTag(card.image, "")}</div></div>
  <div class="sl-halftone"></div>
  <div class="sl-frame"><span class="sl-fx tl"></span><span class="sl-fx tr"></span><span class="sl-fx bl"></span><span class="sl-fx br"></span></div>
  <div class="sl-reg" aria-hidden="true"></div>
  ${slHead(card)}
  <h1 class="sl-title ${coverTitleLen(card)}">${richText(cardTitle(card))}</h1>
  ${card.tag ? `<div class="sl-tag">${esc(card.tag)}</div>` : ""}
  ${slFootHtml(card)}
</section>`;
}

// SL「宣言式无图大字」sl-cover-manifesto：Swiss/manifesto 风——巨字黑体压冷网格 + 单一 accent 词 + 粗 accent 标尺 + 套准角标，无图。解 typography欠缺 + 图片重复(零图)。type-as-hero。中/英大字。
function slCoverManifesto(brief, card) {
  const idx = card.token || card.index || "";
  return `
${posterOpen(brief, card, "layout-sl-cover-manifesto sl-cover")}
  <div class="sl-grid"></div>
  <div class="sl-reg" aria-hidden="true"><span class="sl-fx tl"></span><span class="sl-fx tr"></span><span class="sl-fx bl"></span><span class="sl-fx br"></span></div>
  ${slHead({ ...card, token: idx || "NO.01" })}
  <div class="sl-manifesto">
    ${card.kickerLine ? `<div class="sl-mlbl">${esc(card.kickerLine)}</div>` : ""}
    <h1 class="sl-mhead">${richText(cardTitle(card))}</h1>
    <div class="sl-mbar"></div>
    ${card.titleEn ? `<div class="sl-mhead-en">${esc(card.titleEn)}</div>` : ""}
    ${card.lead ? `<p class="sl-mlead">${richText(card.lead)}</p>` : ""}
  </div>
  ${slFootHtml(card)}
</section>`;
}

// SL「图+数据 split」sl-cover-split：证据图 band(顶，主题色三调 duotone + 半调签名) + 宣言句 + 折线趋势 + 数据行。对标「信号账本 / 界面是证据」视觉方向(图+折线+宣言)。light+dark 双 register。需图。
function slCoverSplit(brief, card) {
  const style = getStyle(card.style || brief.meta?.style);
  const duo = duotoneTable(style.css?.["--accent"]);
  const rows = ensureArray(card.rows || card.metrics).slice(0, 2);
  const series = ensureArray(card.series).map(Number).filter(n => !Number.isNaN(n));
  let spark = "";
  if (series.length >= 2) {
    const max = Math.max(...series), min = Math.min(...series), span = (max - min) || 1;
    const W = 580, H = 132, step = W / (series.length - 1);
    const xy = series.map((v, i) => [i * step, H - ((v - min) / span) * H]);
    const line = xy.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
    const area = `0,${H} ${line} ${W},${H}`;
    const last = xy[xy.length - 1];
    spark = `<svg class="sl-spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true"><polygon class="sl-spark-area" points="${area}"/><polyline class="sl-spark-line" points="${line}"/><circle class="sl-spark-dot" cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="6"/></svg>`;
  }
  return `
${posterOpen(brief, card, "layout-sl-cover-split sl-cover")}
  <div class="sl-grid"></div>
  <svg class="sl-duo-def" width="0" height="0" aria-hidden="true"><filter id="sl-duo" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"/><feComponentTransfer><feFuncR type="table" tableValues="${duo.r}"/><feFuncG type="table" tableValues="${duo.g}"/><feFuncB type="table" tableValues="${duo.b}"/></feComponentTransfer></filter></svg>
  <figure class="sl-split-img"><div class="sl-split-imgi">${imageTag(card.image, "")}</div><div class="sl-split-half"></div><span class="sl-split-tag">${esc(card.shotLabel || "EVIDENCE")}</span></figure>
  ${slHead(card)}
  <h2 class="sl-stitle">${richText(cardTitle(card))}</h2>
  <div class="sl-split-data">
    ${spark ? `<div class="sl-spark-wrap">${spark}${card.trend ? `<span class="sl-trend">${esc(card.trend)}</span>` : ""}</div>` : ""}
    ${rows.length ? `<div class="sl-split-rows">${rows.map((r, i) => `<div class="sl-srow"><span class="sl-srn">${String(i + 1).padStart(2, "0")}</span><span class="sl-srl">${esc(r.label || r.title || "")}</span><span class="sl-srv">${esc(r.value || r.body || "")}</span></div>`).join("")}</div>` : ""}
  </div>
  ${slFootHtml(card)}
</section>`;
}

// SL body 截图证据卡（SL-02 等）：终端/浏览器框（哑面 sharp，非 mac 圆点）+ 可读截图（轻处理保证据可读）+ 证据批注连线 + 账本 chrome。反 PPT：无圆角浮卡/无柔投影。
function slBodyShot(brief, card) {
  const notes = ensureArray(card.callouts || card.points).slice(0, 2);
  const chromeLabel = esc(card.shotLabel || "terminal");
  return `
${posterOpen(brief, card, "layout-sl-body-shot sl-cover")}
  <div class="sl-grid"></div>
  ${slHead(card)}
  <h2 class="sl-mtitle">${richText(cardTitle(card))}</h2>
  <figure class="sl-shotframe">
    <div class="sl-shotbar"><span class="sl-dot"></span><span class="sl-dot"></span><span class="sl-dot"></span><span class="sl-shotpath">${chromeLabel}</span></div>
    <div class="sl-shotimg">${imageTag(card.image, "")}</div>
  </figure>
  ${notes.length ? `<div class="sl-notes">${notes.map((n, i) => `<div class="sl-note"><span class="sl-note-i">${String(i + 1).padStart(2, "0")}</span><span class="sl-note-t">${richText(n.body || n.title || n)}</span></div>`).join("")}</div>` : ""}
  ${slFootHtml(card)}
</section>`;
}

// Bridge 独家影像配方 split-tone duotone（暗部冷墨蓝 ↔ 高光暖金，cinematic teal-gold）。
// 去饱和 → 三调映射：暗(.04,.07,.15)冷墨蓝 / 中(.52,.40,.26)暖褐 / 高(1.0,.90,.54)暖金。固定签名、不随主题（区别 sp-duo 全暖 / sl-duo 主题色）。
// dramatic register（noir/cover/split）共用；calm register（weave）不上，保 muted 雾感。SVG def 须嵌每个 section 内（render 逐 section 截图）。
const BC_DUO_DEF = `<svg class="bc-duo-def" width="0" height="0" aria-hidden="true"><filter id="bc-duo" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"/><feComponentTransfer><feFuncR type="table" tableValues="0.04 0.52 1.00"/><feFuncG type="table" tableValues="0.07 0.40 0.90"/><feFuncB type="table" tableValues="0.15 0.26 0.54"/></feComponentTransfer></filter></svg>`;

// 图桥 Bridge Canvas 封面（第三视觉语言）：满铺 cinematic 强图 + 电影黑边 letterbox + split-tone 调色 + 颗粒 + 极简压图 + 签名标尺。
// 独家影像配方(区别于纸本暖 sepia / 信号 duotone)：cinematic split-tone(冷阴影+暖高光) + letterbox + 角标。多平台同源(splitImageBridge)。需图。
function bcCover(brief, card) {
  return `
${posterOpen(brief, card, "layout-bc-cover" + (card.calm ? " bc-calm" : ""))}
  ${BC_DUO_DEF}
  <div class="bc-img">${imageTag(card.image, "")}</div>
  <div class="bc-grade"></div>
  <div class="bc-grain"></div>
  <div class="bc-halftone"></div>
  <div class="bc-bar bc-bar-t"></div>
  <div class="bc-bar bc-bar-b"></div>
  <div class="bc-top"><span>${esc(card.kicker?.en || card.eyebrow || "BRIDGE CANVAS")}</span><span>${esc(card.token || "01")}</span></div>
  <div class="bc-mark"></div>
  <div class="bc-title-wrap">
    ${card.board ? `<div class="bc-eyebrow">${esc(card.board)}</div>` : ""}
    <h1 class="bc-title">${richText(cardTitle(card))}</h1>
    ${card.lead ? `<p class="bc-lead">${richText(card.lead)}</p>` : ""}
  </div>
  ${card.footer ? `<div class="bc-foot">${esc(card.footer)}</div>` : ""}
</section>`;
}

// 图桥「黑卡 Noir Poster」纯黑满铺·大字：满铺暗调强图压近黑 + 巨字标题为主角 + 中英三模式排版(cn 纯中文宋体 / mix 香港混排 / en 编辑英文) + 三构图(center 居中 / bottom 沉底 / edge 竖脊)。
// 对标 fashion editorial 满铺封面 + 小红书暗调大字 + bold-minimalism。独家影像配方：暗场 veil + 颗粒；金句点睛(**字**→金)。补 Bridge 封面版式多样性。需图。
function bcNoir(brief, card) {
  const lang = card.lang || "mix";                       // cn 纯中文 / mix 中英混排 / en 纯英文
  const idx = card.index || card.token || "";
  const spine = card.spine || "";                        // 右缘竖排短语（东方编辑气）
  const fontCls = card.font ? ` bc-font-${attr(card.font)}` : "";   // didot 时装刊衬线 / kai 楷体
  return `
${posterOpen(brief, card, `layout-bc-noir bc-lang-${attr(lang)}${fontCls}`)}
  ${BC_DUO_DEF}
  <div class="bc-img">${imageTag(card.image, "")}</div>
  <div class="bc-veil"></div>
  <div class="bc-halftone"></div>
  <div class="bc-grain"></div>
  <header class="bc-mast">
    <span>${esc(card.kicker?.en || card.eyebrow || "BRIDGE CANVAS")}</span>
    ${idx ? `<span class="bc-idx">${esc(idx)}</span>` : ""}
  </header>
  ${spine ? `<div class="bc-spine">${esc(spine)}</div>` : ""}
  <div class="bc-stage">
    ${card.kickerLine ? `<div class="bc-kline">${esc(card.kickerLine)}</div>` : ""}
    <h1 class="bc-h">${richText(cardTitle(card))}</h1>
    ${card.titleEn ? `<div class="bc-en">${esc(card.titleEn)}</div>` : ""}
    ${card.lead ? `<p class="bc-lead">${richText(card.lead)}</p>` : ""}
  </div>
  <footer class="bc-foot"><span>${esc(card.footer || brief.meta?.brand || "")}</span>${card.footerR ? `<span>${esc(card.footerR)}</span>` : ""}</footer>
</section>`;
}

// 图桥「上下分割」bc-split：硬横分割——图占上半 band + 下半奶纸实色字版(ink 字 + 金线)。对标编辑刊物(Gentlewoman/Kinfolk)上图下字版。与暗调 noir 反差(亮/克制/画廊感)。中英三模式。需图。
function bcSplit(brief, card) {
  const lang = card.lang || "mix";
  const idx = card.index || card.token || "";
  return `
${posterOpen(brief, card, `layout-bc-split bcs-${attr(lang)}`)}
  <div class="bc-band">
    <div class="bc-img">${imageTag(card.image, "")}</div>
    <div class="bc-band-grade"></div>
    <header class="bc-mast"><span>${esc(card.kicker?.en || card.eyebrow || "BRIDGE CANVAS")}</span>${idx ? `<span class="bc-idx">${esc(idx)}</span>` : ""}</header>
    ${card.bandcap ? `<div class="bc-bandcap">${esc(card.bandcap)}</div>` : ""}
  </div>
  <div class="bc-field">
    ${card.kickerLine ? `<div class="bc-kline">${esc(card.kickerLine)}</div>` : ""}
    <h1 class="bc-h">${richText(cardTitle(card))}</h1>
    ${card.titleEn ? `<div class="bc-en">${esc(card.titleEn)}</div>` : ""}
    ${card.lead ? `<p class="bc-lead">${richText(card.lead)}</p>` : ""}
    <footer class="bc-foot"><span>${esc(card.footer || brief.meta?.brand || "")}</span>${card.footerR ? `<span>${esc(card.footerR)}</span>` : ""}</footer>
  </div>
</section>`;
}

// 图桥「标题穿插主体」bc-weave：满铺 atmospheric 雾景/孤身人影 + 标题分上下两段绕主体穿插(主体落中段留白) + 竖排短句 + 宋体/楷体。
// 对标「在风景里找回专注力 / 慢下来看得更远」calm 视觉方向——calm 雾感 register(比 noir 更静)。可选 font:"kai" 楷体书法。需图。
function bcWeave(brief, card) {
  const idx = card.index || card.token || "";
  const fontCls = card.font === "kai" ? " bc-font-kai" : "";
  const top = card.titleTop || "";
  const bot = card.titleBot || cardTitle(card);
  return `
${posterOpen(brief, card, `layout-bc-weave${fontCls}`)}
  <div class="bc-img">${imageTag(card.image, "")}</div>
  <div class="bc-mist"></div>
  <div class="bc-grain"></div>
  <header class="bc-mast"><span>${esc(card.kicker?.en || card.eyebrow || "BRIDGE CANVAS")}</span>${idx ? `<span class="bc-idx">${esc(idx)}</span>` : ""}</header>
  ${card.spine ? `<div class="bc-spine">${esc(card.spine)}</div>` : ""}
  ${top ? `<div class="bc-weave-top"><h1 class="bc-h">${richText(top)}</h1></div>` : ""}
  <div class="bc-weave-bot">
    ${card.kickerLine ? `<div class="bc-kline">${esc(card.kickerLine)}</div>` : ""}
    <h1 class="bc-h">${richText(bot)}</h1>
    ${card.titleEn ? `<div class="bc-en">${esc(card.titleEn)}</div>` : ""}
  </div>
  ${card.footer ? `<footer class="bc-foot"><span>${esc(card.footer)}</span>${card.footerR ? `<span>${esc(card.footerR)}</span>` : ""}</footer>` : ""}
</section>`;
}

// SL body 数据网格卡：2×2 KPI 单元格（大 mono 数值 + label + delta），发丝线分隔不浮卡。数据密集内容。
function slBodyGrid(brief, card) {
  const cells = ensureArray(card.cells || card.metrics || card.rows).slice(0, 4);
  return `
${posterOpen(brief, card, "layout-sl-body-grid sl-cover")}
  <div class="sl-grid"></div>
  ${slHead(card)}
  <h2 class="sl-mtitle">${richText(cardTitle(card))}</h2>
  <div class="sl-cells">
    ${cells.map(c => `<div class="sl-cell"><div class="sl-cellv">${esc(c.value || c.metric || "")}${c.delta ? `<span class="sl-celld">${esc(c.delta)}</span>` : ""}</div><div class="sl-celll">${esc(c.label || c.title || "")}</div></div>`).join("")}
  </div>
  ${slFootHtml(card)}
</section>`;
}

// SL body 编号工作流卡：竖向脊柱 + accent 方块编号 + 步骤标题/说明（方法论/教程）。哑面 sharp。
function slBodyFlow(brief, card) {
  const steps = ensureArray(card.steps || card.points).slice(0, 4);
  return `
${posterOpen(brief, card, "layout-sl-body-flow sl-cover")}
  <div class="sl-grid"></div>
  ${slHead(card)}
  <h2 class="sl-mtitle">${esc(card.sectionTitle || cardTitle(card))}</h2>
  <div class="sl-flowsteps">
    ${steps.map((s, i) => `<div class="sl-step"><span class="sl-step-n">${String(i + 1).padStart(2, "0")}</span><div class="sl-step-b"><div class="sl-step-t">${esc(s.title || s.word || s)}</div>${s.body || s.note ? `<div class="sl-step-d">${richText(s.body || s.note)}</div>` : ""}</div></div>`).join("")}
  </div>
  ${slFootHtml(card)}
</section>`;
}

// VERIFIED「已验证」圆印章（Signal 证据方法论签名锚点：双圈 + 勾 + 环绕字，盖章微旋转）。色跟主题 currentColor。
function slStampVerified() {
  return `<div class="sl-ev-stamp"><svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="47" stroke="currentColor" stroke-width="2.5"/><circle cx="50" cy="50" r="38" stroke="currentColor" stroke-width="1"/><path d="M38 50 l8 9 l17 -20" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path id="slstamparc" d="M50 12 a38 38 0 0 1 0 76 a38 38 0 0 1 0 -76" fill="none"/><text fill="currentColor" font-family="Helvetica Neue,sans-serif" font-size="9.5" font-weight="700" letter-spacing="2.6"><textPath href="#slstamparc" startOffset="6%">已验证 · VERIFIED · 已验证 · VERIFIED ·</textPath></text></svg></div>`;
}

// Signal 证据方法论 · SCREENSHOT 截图证据卡：light 档案纸 + 暗底真实截图(哑面框 + mono 路径) + 标注①② + VERIFIED 印章 + 可追溯来源(当前日期)。
// 证据 = 用户产品/界面截图(route A)。区别 SaaS 漂亮数据卡。需图。
function slEvScreenshot(brief, card) {
  const notes = ensureArray(card.notes || card.callouts || card.points).slice(0, 2);
  return `
${posterOpen(brief, card, "layout-sl-ev layout-sl-ev-screenshot")}
  <div class="sl-ev-paper"></div>
  <header class="sl-ev-mast"><div class="sl-ev-mk"><i></i>${card.brand ? `<span class="sl-ev-brand">${esc(card.brand)}</span>` : ""}<span class="sl-ev-sect">${esc(card.sect || "Screenshot · 证据存档")}</span></div><span class="sl-ev-tok">${esc(card.token || "02")}</span></header>
  <div class="sl-ev-rule"></div>
  <div class="sl-ev-head"><div class="sl-ev-title">${richText(cardTitle(card))}</div>${card.sub ? `<div class="sl-ev-sub">${esc(card.sub)}</div>` : ""}</div>
  <figure class="sl-ev-shot sl-ev-shot-${card.device === "phone" ? "phone" : card.device === "clean" ? "clean" : "browser"}">
    <div class="sl-ev-stage">
      <div class="sl-ev-device">
        <div class="sl-ev-bar"><span></span><span></span><span></span></div>
        <div class="sl-ev-shotimg">${imageTag(card.image, "")}</div>
      </div>
    </div>
    <figcaption class="sl-ev-shotcap"><span>${esc(card.shotLabel || "EVIDENCE · 截图证据")}</span>${card.shotNote ? `<span class="sl-ev-priv">${esc(card.shotNote)}</span>` : ""}</figcaption>
  </figure>
  <div class="sl-ev-notes">
    ${notes.map((n, i) => `<div class="sl-ev-note"><span class="sl-ev-nidx">${String(i + 1).padStart(2, "0")}</span><div class="sl-ev-ntitle">${richText(n.title || n.word || n)}</div>${n.body || n.note ? `<div class="sl-ev-nbody">${richText(n.body || n.note)}</div>` : ""}</div>`).join("")}
  </div>
  ${card.source ? `<div class="sl-ev-src">${esc(card.source)}</div>` : ""}
  ${slStampVerified()}
  <footer class="sl-ev-foot">${card.brand ? `<span>${esc(card.brand)}</span>` : `<span></span>`}<span>${nowParts().date}</span></footer>
</section>`;
}

// 证据卡共享 chrome 头/尾（档案纸 + marker 刊头 + 标题 / 来源(当前日期) + VERIFIED 印章 + RECORD·REFLECT·REALIGN footer）。各 sl-ev 卡复用。
function slEvHead(card, defaultSect) {
  return `<div class="sl-ev-paper"></div>
  <header class="sl-ev-mast"><div class="sl-ev-mk"><i></i>${card.brand ? `<span class="sl-ev-brand">${esc(card.brand)}</span>` : ""}<span class="sl-ev-sect">${esc(card.sect || defaultSect)}</span></div><span class="sl-ev-tok">${esc(card.token || "01")}</span></header>
  <div class="sl-ev-rule"></div>
  <div class="sl-ev-head"><div class="sl-ev-title">${richText(cardTitle(card))}</div>${card.sub ? `<div class="sl-ev-sub">${esc(card.sub)}</div>` : ""}</div>`;
}
function slEvFoot(card, defaultFolio) {
  // 中性化：来源仅当用户/真实给值才显（不编假平台），页脚只留可选 brand + 当前日期（去内部编号/标语）。
  return `${card.source ? `<div class="sl-ev-src">${esc(card.source)}</div>` : ""}
  ${slStampVerified()}
  <footer class="sl-ev-foot">${card.brand ? `<span>${esc(card.brand)}</span>` : `<span></span>`}<span>${nowParts().date}</span></footer>`;
}

// Signal 证据方法论 · INSIGHT 洞察数据卡：档案纸 + 折线趋势(SVG·series 归一) + 趋势大数 + 数据行 + VERIFIED 印章。
function slEvInsight(brief, card) {
  const series = ensureArray(card.series).map(Number).filter(n => !isNaN(n));
  const rows = ensureArray(card.rows).slice(0, 2);
  let poly = "", area = "";
  if (series.length >= 2) {
    const max = Math.max(...series), min = Math.min(...series), rng = (max - min) || 1;
    const pts = series.map((v, i) => `${(i / (series.length - 1) * 100).toFixed(1)},${(100 - (v - min) / rng * 84 - 8).toFixed(1)}`);
    poly = pts.join(" "); area = `0,100 ${poly} 100,100`;
  }
  return `
${posterOpen(brief, card, "layout-sl-ev layout-sl-ev-insight")}
  ${slEvHead(card, "Insight · 洞察数据")}
  <div class="sl-ev-chart"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><polygon points="${area}" fill="var(--accent,#2F5EA7)" opacity="0.08"/><polyline points="${poly}" fill="none" stroke="var(--accent,#2F5EA7)" stroke-width="1.5" vector-effect="non-scaling-stroke"/></svg></div>
  ${card.trend ? `<div class="sl-ev-trend">${esc(card.trend)}</div><div class="sl-ev-trendlbl">${esc(card.trendLabel || "趋势")}</div>` : ""}
  <div class="sl-ev-rows">${rows.map(r => `<div class="sl-ev-row"><span>${esc(r.label || r.word || "")}</span><span class="v">${esc(r.value ?? r.amount ?? "")}</span></div>`).join("")}</div>
  ${slEvFoot(card, "SL-01")}
</section>`;
}

// Signal 证据方法论 · DATA 数据网格卡：档案纸 + 2×2 KPI(mono 大数 + label + delta) 发丝线非浮卡 + VERIFIED 印章。
function slEvData(brief, card) {
  const cells = ensureArray(card.cells || card.metrics || card.rows).slice(0, 4);
  return `
${posterOpen(brief, card, "layout-sl-ev layout-sl-ev-data")}
  ${slEvHead(card, "Data · 数据网格")}
  <div class="sl-ev-grid">${cells.map(c => `<div class="sl-ev-cell"><div class="sl-ev-cval">${esc(c.value ?? c.amount ?? "")}</div><div class="sl-ev-clbl">${esc(c.label || c.word || "")}</div>${c.delta ? `<div class="sl-ev-cdelta">${esc(c.delta)}</div>` : ""}</div>`).join("")}</div>
  ${slEvFoot(card, "SL-03")}
</section>`;
}

// Signal 证据方法论 · WORKFLOW 工作流卡：档案纸 + 编号步骤(accent 圆号 + 标题 + body)铺满 + 发丝线 + VERIFIED 印章。去 SaaS 白网格。
function slEvWorkflow(brief, card) {
  const steps = ensureArray(card.steps || card.points).slice(0, 5);
  return `
${posterOpen(brief, card, "layout-sl-ev layout-sl-ev-workflow")}
  ${slEvHead(card, "Workflow · 工作流")}
  <div class="sl-ev-steps">${steps.map((s, i) => `<div class="sl-ev-step"><span class="sl-ev-snum">${String(i + 1).padStart(2, "0")}</span><div class="sl-ev-sb"><div class="sl-ev-stitle">${richText(s.title || s.word || s)}</div>${s.body || s.note ? `<div class="sl-ev-sbody">${richText(s.body || s.note)}</div>` : ""}</div></div>`).join("")}</div>
  ${slEvFoot(card, "SL-02")}
</section>`;
}

// Signal 证据方法论 · COMPARE 对比卡：档案纸 + 三列对照表(维度 | A | B) + 判定 + VERIFIED 印章。
function slEvCompare(brief, card) {
  const cols = ensureArray(card.cols).filter(c => c && (c.points || c.head)).slice(0, 2);
  let body;
  if (cols.length === 2) {
    // 双栏要点对照（误区/正解、过去/现在）：右栏 accent 强调。适配「观点对比」真实内容。
    body = `<div class="sl-ev-cmp sl-ev-cmp-cols">${cols.map((col, i) => `<div class="sl-ev-col sl-ev-col-${i === 0 ? "a" : "b"}"><div class="sl-ev-colhd"><span class="mk">${esc(col.head || (i === 0 ? "A" : "B"))}</span></div><ul class="sl-ev-colpts">${ensureArray(col.points).slice(0, 4).map(p => `<li>${richText(p.word || p.label || p)}</li>`).join("")}</ul></div>`).join("")}</div>`;
  } else {
    // 逐维度三列表（维度 | A | B）：适配「参数对比」结构化内容。
    const a = card.optionA || "A", b = card.optionB || "B";
    const rows = ensureArray(card.rows || card.dims).slice(0, 6);
    body = `<div class="sl-ev-cmp">
    <div class="sl-ev-cmprow sl-ev-cmphead"><span class="dim">维度</span><span class="a">${esc(a)}</span><span class="b">${esc(b)}</span></div>
    ${rows.map(r => `<div class="sl-ev-cmprow"><span class="dim">${esc(r.dim || r.label || "")}</span><span class="a">${esc(r.a ?? "")}</span><span class="b">${esc(r.b ?? "")}</span></div>`).join("")}
  </div>`;
  }
  return `
${posterOpen(brief, card, "layout-sl-ev layout-sl-ev-compare")}
  ${slEvHead(card, "Compare · 对比")}
  ${body}
  ${card.verdict ? `<div class="sl-ev-verdict"><span class="vl">结论</span>${richText(card.verdict)}</div>` : ""}
  ${slEvFoot(card, "SL-04")}
</section>`;
}

// Signal 证据方法论 · FIELD NOTE 现场记录卡：档案纸 + 宋体抒情标题 + lead + 蓝点日期/地点标注 + 雾景照片(light register)。需图。
function slEvFieldnote(brief, card) {
  return `
${posterOpen(brief, card, "layout-sl-ev layout-sl-ev-fieldnote")}
  ${slEvHead(card, "Field Note · 现场记录")}
  ${card.lead ? `<p class="sl-ev-fnlead">${richText(card.lead)}</p>` : ""}
  <div class="sl-ev-fnmeta"><i></i><span>${esc(card.place || "现场")} · ${nowParts().date}</span></div>
  <div class="sl-ev-fnimg">${imageTag(card.image, "")}</div>
  ${slEvFoot(card, "SL-01")}
</section>`;
}

// Signal 测评评分卡 sl-ev-review：综合巨数(10 分制小数 hero) + 右对齐分项账本行(数字脊柱) + verdict 裁定(适合/慎入) +
// 方法论元数据(维度/样本/动态日期/刻度) + VERIFIED。把测评做成「可信证据」——超 app 星级/进度条/红绿 emoji 俗套。
// 对标 Pitchfork 编辑巨数 + SCA 杯测可推导总分 + Wirecutter 方法论叙事。综合分应可由分项推导(避假精度)。
function slEvReview(brief, card) {
  const subs = ensureArray(card.subs || card.scores || card.rows).slice(0, 5);
  return `
${posterOpen(brief, card, "layout-sl-ev layout-sl-ev-review" + (card.image ? " sl-ev-rv-img-led" : ""))}
  ${slEvHead(card, "Field Review · 实测评分")}
  ${card.image ? `<figure class="sl-ev-rv-img">${imageTag(card.image, "")}${card.priceTag ? `<figcaption>${esc(card.priceTag)}</figcaption>` : ""}</figure>` : ""}
  <div class="sl-ev-rv-hero">
    <div class="sl-ev-rv-big">${esc(card.score || "8.4")}<span class="sl-ev-rv-deno">/ 10</span></div>
    <div class="sl-ev-rv-ometa"><span class="sl-ev-rv-olbl">${esc(card.scoreLabel || "OVERALL")}</span><span class="sl-ev-rv-ocn">${esc(card.scoreCn || "综合评分")}</span></div>
  </div>
  <div class="sl-ev-rv-rule"></div>
  <div class="sl-ev-rv-subs">
    ${subs.map(s => `<div class="sl-ev-rv-row"><span class="rv-cn">${esc(s.cn || s.label || s.word || "")}</span>${s.en ? `<span class="rv-en">${esc(s.en)}</span>` : ""}<span class="rv-dot"></span><span class="rv-v">${esc(s.v ?? s.value ?? "")}</span></div>`).join("")}
  </div>
  ${card.verdict ? `<div class="sl-ev-rv-verdict"><span class="rv-vl">${esc(card.verdictLabel || "VERDICT · 裁定")}</span><p>${richText(card.verdict)}</p>${card.fit ? `<div class="rv-fit"><span class="rv-yes">适合 · ${esc(card.fit)}</span>${card.avoid ? `<span class="rv-no">慎入 · ${esc(card.avoid)}</span>` : ""}</div>` : ""}</div>` : ""}
  ${card.method ? `<div class="sl-ev-rv-method">${esc(card.method)}</div>` : ""}
  ${slEvFoot(card, "SL-01")}
</section>`;
}

function slCore02ScreenshotProof(brief, card) {
  const callouts = ensureArray(card.callouts || card.points).slice(0, 2);
  return `
${posterOpen(brief, card, "layout-sl-c02")}
  <div class="sl-top">
    <div class="sl-eyebrow">${esc(card.kicker || card.brand || brief.meta?.brand || "")}</div>
    <div class="sl-token">${esc(card.token || "SCREENSHOT")}</div>
  </div>
  <div class="sl-hero">
    <h1>${esc(cardTitle(card))}</h1>
    ${card.subtitle ? `<p>${esc(card.subtitle)}</p>` : ""}
  </div>
  <div class="sl-proof-grid">
    <figure class="sl-shot frame-shot ${card.device === "phone" ? "device-phone" : "device-browser"}">
      <div class="browser-bar"><span></span><span></span><span></span></div>
      ${imageTag(card.image)}
    </figure>
    <aside class="sl-callouts">
      ${callouts.map((c, i) => `<div class="sl-callout">
        <div class="sl-callout-index">${String(i + 1).padStart(2, "0")}</div>
        <h3>${esc(c.title || c)}</h3>
        ${c.body ? `<p>${esc(c.body)}</p>` : ""}
      </div>`).join("")}
      ${card.proof ? `<div class="sl-proof-note"><span>PROOF</span><strong>${esc(card.proof)}</strong></div>` : ""}
    </aside>
  </div>
  ${foot(brief, card)}
</section>`;
}

// ── Signal 编辑网格封面族（sl-cv-*）：按内容形态 statement 大字 / figure 数据主角 / grid 截图证据。
// 学《静野》图块网格+留白+多层次、《蓝羽毛》大字冷调；奶白档案纸 + 电蓝点睛 + 套准 + 账本栏 + VERIFIED；
// 中性化（默认不印内部名，brand 才印）、动态当前日期、巨数 Helvetica tabular。配方/场景见 SIGNAL-LANGUAGE.md。
function sparkPoints(series) {
  const s = ensureArray(series).map(Number).filter(n => !isNaN(n));
  if (s.length < 2) return { poly: "", area: "" };
  const max = Math.max(...s), min = Math.min(...s), rng = (max - min) || 1;
  const poly = s.map((v, i) => `${(i / (s.length - 1) * 100).toFixed(1)},${(100 - (v - min) / rng * 84 - 8).toFixed(1)}`).join(" ");
  return { poly, area: `0,100 ${poly} 100,100` };
}
function slCvHead(card, defaultSect) {
  const iss = card.iss || nowParts().yearMonth.replace(".", " · ");
  return `<span class="sl-cv-reg tl"></span><span class="sl-cv-reg tr"></span><span class="sl-cv-reg bl"></span><span class="sl-cv-reg br"></span>
  <header class="sl-cv-mast"><div class="sl-cv-mk"><i></i>${card.brand ? `<span class="sl-cv-brand">${esc(card.brand)}</span>` : ""}<span class="sl-cv-sect">${esc(card.sect || defaultSect)}</span></div><span class="sl-cv-iss">${esc(iss)}</span></header>
  <div class="sl-cv-rule"></div>`;
}
function slCvFoot(card) {
  return `<div class="sl-cv-botline"></div>
  <div class="sl-cv-credit">${esc(card.credit || ("№ 01 — " + nowParts().yearMonth))}</div>
  <div class="sl-cv-stamp"><svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="47" stroke="currentColor" stroke-width="2.5"/><circle cx="50" cy="50" r="38" stroke="currentColor" stroke-width="1"/><path d="M38 50 l8 9 l17 -20" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path id="sl-cv-arc" d="M50 12 a38 38 0 0 1 0 76 a38 38 0 0 1 0 -76" fill="none"/><text fill="currentColor" font-family="Helvetica Neue" font-size="9.5" font-weight="700" letter-spacing="2.4"><textPath href="#sl-cv-arc" startOffset="4%">VERIFIED · 已验证 · VERIFIED ·</textPath></text></svg></div>`;
}
function slCvLedger(rows, kind) {
  const items = ensureArray(rows).slice(0, 3);
  if (!items.length) return "";
  return `<div class="sl-cv-ledger">${items.map((r, i) => {
    const n = `<span class="n">${String(i + 1).padStart(2, "0")}</span>`;
    return kind === "wd"
      ? `<div class="lrow">${n}<span class="w">${richText(r.w || r.word || "")}</span><span class="d">${esc(r.d || r.note || "")}</span></div>`
      : `<div class="lrow">${n}<span class="v">${esc(r.v ?? r.value ?? "")}</span><span class="k">${esc(r.k || r.label || "")}</span></div>`;
  }).join("")}</div>`;
}
// 大字主张（纯文字·观点/方法论，最高频）：巨字 type-as-hero（**关键词**电蓝点睛）+ 证据三性账本栏，不靠图。
function slCoverStatement(brief, card) {
  return `
${posterOpen(brief, card, "layout-sl-cv layout-sl-cv-statement")}
  ${slCvHead(card, "Opinion · 方法论")}
  <div class="sl-cv-claim">${card.no ? `<span class="no">${esc(card.no)}</span>` : ""}<h1>${richText(cardTitle(card))}</h1>${card.titleEn ? `<div class="en">${esc(card.titleEn)}</div>` : ""}</div>
  ${card.lead ? `<div class="sl-cv-lead"><div class="bar"></div><p>${richText(card.lead)}</p></div>` : ""}
  ${slCvLedger(card.ledger, "wd")}
  ${slCvFoot(card)}
</section>`;
}
// 数据主角（有数据·复盘/报告）：巨数 hero(Helvetica tabular) + 趋势 + 账本支撑栏。
function slCoverFigure(brief, card) {
  const { poly, area } = sparkPoints(card.series);
  return `
${posterOpen(brief, card, "layout-sl-cv layout-sl-cv-figure")}
  ${slCvHead(card, "Data · 数据复盘")}
  <div class="sl-cv-fhead">${card.no ? `<span class="no">${esc(card.no)}</span>` : ""}<h1>${richText(cardTitle(card))}</h1></div>
  <div class="sl-cv-hero">
    <div class="fig"><div class="lbl">${esc(card.figLabel || "")}</div><div class="big">${esc(card.figBig || "")}</div>${card.figCap ? `<div class="cap">${richText(card.figCap)}</div>` : ""}</div>
    <div class="tr"><span class="lbl">${esc(card.trendLabel || "Trend · 月度")}</span><svg viewBox="0 0 100 100" preserveAspectRatio="none">${area ? `<polygon points="${area}" fill="var(--accent,#2F5EA7)" opacity="0.08"/>` : ""}${poly ? `<polyline points="${poly}" fill="none" stroke="var(--accent,#2F5EA7)" stroke-width="2" vector-effect="non-scaling-stroke"/>` : ""}</svg><div class="axis"><span>${esc(card.axisL || "")}</span><span>${esc(card.axisR || "")}</span></div></div>
  </div>
  ${slCvLedger(card.ledger, "vk")}
  ${slCvFoot(card)}
</section>`;
}
// 截图证据（有真截图·教程/测评/复盘）：用户真截图 + 独家电蓝三调 duotone/riso 半调 + 趋势块 + 账本栏。
function slCoverGrid(brief, card) {
  const style = getStyle(card.style || brief.meta?.style);
  const duo = duotoneTable(style.css?.["--accent"] || "#2F5EA7");
  const { poly, area } = sparkPoints(card.series);
  return `
${posterOpen(brief, card, "layout-sl-cv layout-sl-cv-grid")}
  <svg class="sl-cv-duodef" width="0" height="0" aria-hidden="true"><filter id="sl-cv-duo" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"/><feComponentTransfer><feFuncR type="table" tableValues="${duo.r}"/><feFuncG type="table" tableValues="${duo.g}"/><feFuncB type="table" tableValues="${duo.b}"/></feComponentTransfer></filter></svg>
  ${slCvHead(card, "Insight · 洞察数据")}
  <div class="sl-cv-ghead">${card.no ? `<span class="no">${esc(card.no)}</span>` : ""}<h1>${richText(cardTitle(card))}</h1>${card.titleEn ? `<div class="gsub"><span class="en">${esc(card.titleEn)}</span>${card.sub ? `<span class="zh">${esc(card.sub)}</span>` : ""}</div>` : ""}</div>
  <div class="sl-cv-band">
    <div class="ev">${imageTag(card.image, "")}${card.evTag ? `<span class="tag">${esc(card.evTag)}</span>` : ""}<div class="half"></div><span class="crop"></span></div>
    <div class="tr"><span class="lbl">${esc(card.trendLabel || "Trend · 七日")}</span><svg viewBox="0 0 100 100" preserveAspectRatio="none">${area ? `<polygon points="${area}" fill="var(--accent,#2F5EA7)" opacity="0.08"/>` : ""}${poly ? `<polyline points="${poly}" fill="none" stroke="var(--accent,#2F5EA7)" stroke-width="2" vector-effect="non-scaling-stroke"/>` : ""}</svg>${card.trendBig ? `<div class="big">${esc(card.trendBig)}<span class="up">▲</span></div>` : ""}${card.trendCap ? `<div class="cap">${esc(card.trendCap)}</div>` : ""}</div>
  </div>
  ${slCvLedger(card.ledger, "vk")}
  ${slCvFoot(card)}
</section>`;
}

// 图桥 Bridge body 卡 bc-frame：cinematic 图叙事内页（满铺图 split-tone #bc-duo + 电影黑边 letterbox + 颗粒 + 金句压图 + 序号），
// 复用 bc-cover chrome。连接/叙事——把内容串成跨平台统一表达的图文章节。
function bcFrame(brief, card) {
  return `
${posterOpen(brief, card, "layout-bc-cover layout-bc-frame")}
  ${BC_DUO_DEF}
  <div class="bc-img">${imageTag(card.image, "")}</div>
  <div class="bc-grade"></div>
  <div class="bc-grain"></div>
  <div class="bc-halftone"></div>
  <div class="bc-bar bc-bar-t"></div>
  <div class="bc-bar bc-bar-b"></div>
  <div class="bc-top"><span>${esc(card.kicker?.en || card.eyebrow || "BRIDGE CANVAS")}</span><span>${esc(card.token || "")}</span></div>
  <div class="bc-mark"></div>
  <div class="bc-title-wrap">
    ${card.idx ? `<div class="bc-idx">${esc(card.idx)}</div>` : ""}
    <h1 class="bc-title">${richText(cardTitle(card))}</h1>
    ${card.lead ? `<p class="bc-lead">${richText(card.lead)}</p>` : ""}
  </div>
  ${card.footer ? `<div class="bc-foot">${esc(card.footer)}</div>` : ""}
</section>`;
}

const LAYOUTS = {
  "sp-ws-cover-photo": spWsCoverPhoto,
  "sp-ws-cover-well": spWsCoverWell,
  "sp-ws-cover-statement": spWsCoverStatement,
  "sp-ws-cover-quote": spWsCoverQuote,
  "sp-ws-cover-object": spWsCoverObject,
  "sp-ws-cover-index": spWsCoverIndex,
  "sp-ws-cover-number": spWsCoverNumber,
  "sp-ws-body-essay": spWsBodyEssay,
  "sp-ws-body-list": spWsBodyList,
  "sp-ws-body-panel": spWsBodyPanel,
  "sp-ws-body-quote": spWsBodyQuote,
  "sp-ws-body-flow": spWsBodyFlow,
  "sp-ws-body-map": spWsBodyMap,
  "sp-ws-body-gallery": spWsBodyGallery,
  "sp-ws-body-margin": spWsBodyMargin,
  "sp-ws-body-matrix": spWsBodyMatrix,
  "sp-ws-body-compare": spWsBodyCompare,
  "sp-ws-body-ledger": spWsBodyLedger,
  "sp-ws-body-keywords": spWsBodyKeywords,
  "sp-ws-body-formula": spWsBodyFormula,
  "sp-ws-body-action": spWsBodyAction,
  "sp-c01-editorial-cover": spCore01EditorialCover,
  "sp-c02-essay-split": spCore02EssaySplit,
  "sl-c01-proof-statement": slCore01ProofStatement,
  "sl-c02-screenshot-proof": slCore02ScreenshotProof,
  "sl-cover-ledger": slCoverLedger,
  "sl-cover-metric": slCoverMetric,
  "sl-cover-verdict": slCoverVerdict,
  "sl-cover-hero": slCoverHero,
  "sl-cover-manifesto": slCoverManifesto,
  "sl-cover-split": slCoverSplit,
  "sl-cv-statement": slCoverStatement,
  "sl-cv-figure": slCoverFigure,
  "sl-cv-grid": slCoverGrid,
  "sl-ev-screenshot": slEvScreenshot,
  "sl-ev-review": slEvReview,
  "sl-ev-insight": slEvInsight,
  "sl-ev-data": slEvData,
  "sl-ev-workflow": slEvWorkflow,
  "sl-ev-compare": slEvCompare,
  "sl-ev-fieldnote": slEvFieldnote,
  "sl-body-shot": slBodyShot,
  "sl-body-flow": slBodyFlow,
  "sl-body-grid": slBodyGrid,
  "bc-cover": bcCover,
  "bc-frame": bcFrame,
  "bc-noir": bcNoir,
  "bc-split": bcSplit,
  "bc-weave": bcWeave,
  "statement-cover": statementCover,
  "essay-split": essaySplit,
  "neo-newspaper": neoNewspaper,
  "quote-focus": quoteFocus,
  "three-lane-flow": threeLaneFlow,
  "stack-map": stackMap,
  "dashboard-grid": dashboardGrid,
  "loop-circuit": loopCircuit,
  "big-number-poster": bigNumberPoster,
  "trend-compare": trendCompare,
  "research-atlas": researchAtlas,
  "evidence-wall": evidenceWall,
  "product-hero": productHero,
  "feature-strip": featureStrip,
  "feature-matrix": featureMatrix,
  "product-storyline": productStoryline,
  "alert-burst": alertBurst,
  "roundup-stack": roundupStack,
  "checklist-strip": checklistStrip,
  "meme-focus": memeFocus,
  "diary-scrapbook": diaryScrapbook,
  "annotated-checklist": annotatedChecklist,
  "sp-mf-cover-r08": spMfCoverR08,
  "sp-mf-b01-paper-note": spMfB01PaperNote,
  "sp-mf-b04-field-list": spMfB04FieldList,
  "sp-mf-b06-quote-continuation": spMfB06QuoteContinuation,
  "sp-mf-b08-closing-note": spMfB08ClosingNote,
  "sp-mf-f01-mist-cover-claim": spMfF01MistCoverClaim,
  "sp-mf-f02-old-new-passage": spMfF02OldNewPassage,
  "sp-mf-f03-source-ledger": spMfF03SourceLedger,
  "sp-mf-f04-keyword-net": spMfF04KeywordNet,
  "sp-mf-f05-vertical-flow": spMfF05VerticalFlow,
  "sp-mf-f06-judgment-matrix": spMfF06JudgmentMatrix,
  "sp-mf-f07-formula-note": spMfF07FormulaNote,
  "sp-mf-f08-action-field": spMfF08ActionField,
  "case-note": caseNote,
  "lifestyle-story": lifestyleStory,
  "screenshot-focus": screenshotFocus,
  "wechat-cover-pair": wechatCoverPair,
  "xhs-text-bomb": xhsTextBomb,
  "xhs-photo-proof": xhsPhotoProof,
  "xhs-hook-list": xhsHookList
};

function renderCard(brief, card) {
  // 默认/未知 layout 兜底走干净的三语言版式(静纸标题文字版)，不再掉进遗留 statement-cover
  const layout = card.layout || "sp-ws-cover-statement";
  const fn = LAYOUTS[layout] || LAYOUTS["sp-ws-cover-statement"];
  return fn(brief, card);
}

export function renderHtml(brief) {
  const title = brief.meta?.title || "Social Cards";
  const posters = (brief.cards || []).map(card => renderCard(brief, card)).join("\n");
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${esc(title)}</title>
<style>${BASE_CSS}</style>
</head>
<body>
${posters}
</body>
</html>`;
}

export async function buildDeck(briefPath, outDir) {
  const absBrief = path.resolve(briefPath);
  const absOut = path.resolve(outDir);
  await fs.mkdir(absOut, { recursive: true });
  await fs.mkdir(path.join(absOut, "output"), { recursive: true });

  const raw = await fs.readFile(absBrief, "utf8");
  const brief = JSON.parse(raw);
  const resolved = await resolveBriefAssets(brief, absBrief, absOut);

  // 强制先取图：图卡（带 imageRequest 或 SP-WS 封面）必须有解析到的主视觉，否则拦在渲染前
  const IMAGE_REQUIRED_LAYOUTS = new Set(["sp-ws-cover-photo", "sp-ws-cover-well", "sp-ws-cover-quote", "sp-ws-cover-object", "sl-cover-hero", "sl-cover-split", "sl-cv-grid", "sl-body-shot", "bc-cover", "bc-frame", "bc-noir", "bc-split", "bc-weave"]);
  const blocked = (resolved.cards || []).filter(c => {
    const hasImage = !!(c.image && (c.image.resolvedSrc || c.image.src));
    const needsImage = !!c.imageRequest || IMAGE_REQUIRED_LAYOUTS.has(c.layout);
    return needsImage && !hasImage;
  });
  if (blocked.length) {
    const names = blocked.map(c => c.name || c.layout).join(", ");
    throw new Error(
      `build blocked: ${names} need a hero image. Run image-plan → image-fetch to source one and write it back into the brief, then build. See assets/IMAGE_REQUESTS.md.`
    );
  }

  const html = renderHtml(resolved);

  await fs.writeFile(path.join(absOut, "index.html"), html, "utf8");
  await fs.writeFile(path.join(absOut, "brief.resolved.json"), JSON.stringify(resolved, null, 2), "utf8");
  return { outDir: absOut, indexPath: path.join(absOut, "index.html"), cardCount: resolved.cards?.length || 0 };
}

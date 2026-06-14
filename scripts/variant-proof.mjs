#!/usr/bin/env node
// 一键变体 proof：plan → 塞占位封面图过 build gate → build → render，一条命令出图。
// 用法：node scripts/variant-proof.mjs <article.md> [style=sp-warm] [outDir]
//   node scripts/variant-proof.mjs local-tests/sp-ws-plan-test/article-a.md sp-warm local-tests/proof-a
import { planBrief } from "../src/plan.mjs";
import { buildDeck } from "../src/engine.mjs";
import { renderDeck } from "../src/render.mjs";
import fs from "node:fs/promises";
import path from "node:path";

const [article, style = "sp-warm", outArg] = process.argv.slice(2);
if (!article) { console.error("need <article.md>"); process.exit(1); }
const dir = outArg || `local-tests/variant-proof-${path.basename(article).replace(/\.[^.]+$/, "").replace(/\W+/g, "-")}`;
// 小占位图（已下采样），仅为过封面强制取图 gate；变体看的是正文页，封面图无所谓
const PLACEHOLDER = path.resolve("local-tests/sp-ws-plan-test/deck-a/assets/image.jpg");

const brief = await planBrief(article, { style, format: "xhs" });
brief.cards[0].image = { src: PLACEHOLDER, resolvedSrc: "assets/image.jpg", filename: "image.jpg" };
await fs.mkdir(path.join(dir, "deck", "assets"), { recursive: true });
const briefPath = path.join(dir, "brief.json");
await fs.writeFile(briefPath, JSON.stringify(brief, null, 2), "utf8");
await buildDeck(briefPath, path.join(dir, "deck"));   // buildDeck 收 brief 文件路径，非对象
await fs.copyFile(PLACEHOLDER, path.join(dir, "deck", "assets", "image.jpg"));
await renderDeck(path.join(dir, "deck"));

const variants = brief.cards.filter(c => c.variant).map(c => `${c.layout.replace("sp-ws-body-", "")}:${c.variant}`);
console.log(`\n[proof] cards: ${brief.cards.map(c => c.layout.replace("sp-ws-", "")).join(", ")}`);
console.log(`[proof] variants: ${variants.length ? variants.join(", ") : "(none)"}`);
console.log(`[proof] out: ${path.join(dir, "deck", "output")}`);

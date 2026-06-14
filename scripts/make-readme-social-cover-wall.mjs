import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const outputPath = path.join(rootDir, "docs/hero-cover-wall.png");
const sourcesPath = path.join(rootDir, "docs/hero-cover-wall-sources.md");

const WIDTH = 1920;
const HEIGHT = 1080;

const cards = [
  {
    id: "SP-MF-R01",
    title: "Field Photo Cover",
    system: "Still Paper / SP-01 Mist Field",
    status: "ACCEPTED_BY_USER",
    path: "local-tests/sp-mf-r01-field-photo-cover/output/SP-MF-R01-field-photo-cover-accepted-v12.png"
  },
  {
    id: "SP-MF-R02",
    title: "Full Photo Thesis",
    system: "Still Paper / SP-01 Mist Field",
    status: "ACCEPTED_BY_USER",
    path: "local-tests/sp-mf-r02-full-photo-thesis/output/SP-MF-R02-full-photo-thesis-accepted-v6.png"
  },
  {
    id: "SP-MF-R03",
    title: "Object Observation",
    system: "Still Paper / SP-01 Mist Field",
    status: "ACCEPTED_BY_USER",
    path: "local-tests/sp-mf-r03-object-observation/output/SP-MF-R03-object-observation-accepted-v7.png"
  },
  {
    id: "SP-MF-R04",
    title: "Night Lake Note",
    system: "Still Paper / SP-01 Mist Field",
    status: "ACCEPTED_BY_USER",
    path: "local-tests/sp-mf-r04-night-lake-note/output/SP-MF-R04-night-lake-note-accepted-v1.png"
  },
  {
    id: "SP-MF-R05",
    title: "Daily Record",
    system: "Still Paper / SP-01 Mist Field",
    status: "ACCEPTED_BY_USER",
    path: "local-tests/sp-mf-r05-daily-record/output/SP-MF-R05-daily-record-accepted-v5.png"
  },
  {
    id: "SP-MF-R06",
    title: "Quote Photo",
    system: "Still Paper / SP-01 Mist Field",
    status: "ACCEPTED_BY_USER",
    path: "local-tests/sp-mf-r06-quote-photo/output/SP-MF-R06-quote-photo-accepted-v11.png"
  },
  {
    id: "SP-MF-R07",
    title: "Essay Split",
    system: "Still Paper / SP-01 Mist Field",
    status: "ACCEPTED_BY_USER",
    path: "local-tests/sp-mf-r07-essay-split/output/SP-MF-R07-essay-split-r07k-pexels-v13.png"
  },
  {
    id: "SP-MF-R08",
    title: "Gear List",
    system: "Still Paper / SP-01 Mist Field",
    status: "ACCEPTED_BY_USER",
    path: "local-tests/sp-mf-r08-gear-list/output/SP-MF-R08-gear-list-accepted-v10.png"
  },
  {
    id: "GALLERY-SP-ESSAY",
    title: "Still Paper Essay",
    system: "Still Paper",
    status: "README_GALLERY",
    path: "docs/gallery/01-still-paper-essay.png"
  },
  {
    id: "GALLERY-SP-KEYWORDS",
    title: "Still Paper Keywords",
    system: "Still Paper",
    status: "README_GALLERY",
    path: "docs/gallery/02-still-paper-keywords.png"
  },
  {
    id: "GALLERY-SP-HAZE",
    title: "Still Paper Haze",
    system: "Still Paper",
    status: "README_GALLERY",
    path: "docs/gallery/04-still-paper-haze.png"
  },
  {
    id: "GALLERY-SL-DATA",
    title: "Signal Data",
    system: "Signal Proof",
    status: "README_GALLERY",
    path: "docs/gallery/03-signal-data.png"
  },
  {
    id: "GALLERY-BC-NOIR",
    title: "Bridge Noir",
    system: "Bridge Canvas",
    status: "README_GALLERY",
    path: "docs/gallery/05-bridge-noir.png"
  },
  {
    id: "SL-BLUE",
    title: "Electric Blue Hero",
    system: "Signal Proof / SL-01 Electric Blue",
    status: "LOCAL_THEME_PROOF",
    path: "local-tests/sl-cover-proof/themes/sl-blue/deck/output/01-hero.png"
  },
  {
    id: "BC-COOL-WEAVE",
    title: "Cool Weave",
    system: "Bridge Canvas",
    status: "LOCAL_THEME_PROOF",
    path: "local-tests/bc-noir-proof/deck-cool-weave/output/01-bc.png"
  }
];

const placements = [
  { x: -280, y: -360, w: 410, r: -8.2, z: 3 },
  { x: 155, y: -360, w: 410, r: -8.2, z: 5 },
  { x: 590, y: -360, w: 410, r: -8.2, z: 7 },
  { x: 1025, y: -360, w: 410, r: -8.2, z: 6 },
  { x: 1460, y: -360, w: 410, r: -8.2, z: 4 },
  { x: -280, y: 170, w: 410, r: -8.2, z: 4 },
  { x: 155, y: 170, w: 410, r: -8.2, z: 9 },
  { x: 590, y: 170, w: 410, r: -8.2, z: 14 },
  { x: 1025, y: 170, w: 410, r: -8.2, z: 12 },
  { x: 1460, y: 170, w: 410, r: -8.2, z: 5 },
  { x: -280, y: 700, w: 410, r: -8.2, z: 2 },
  { x: 155, y: 700, w: 410, r: -8.2, z: 5 },
  { x: 590, y: 700, w: 410, r: -8.2, z: 8 },
  { x: 1025, y: 700, w: 410, r: -8.2, z: 7 },
  { x: 1460, y: 700, w: 410, r: -8.2, z: 3 }
];

const displayOrder = [
  "GALLERY-SP-KEYWORDS",
  "SP-MF-R02",
  "SP-MF-R06",
  "GALLERY-SP-HAZE",
  "SP-MF-R03",
  "GALLERY-SL-DATA",
  "SP-MF-R04",
  "GALLERY-BC-NOIR",
  "BC-COOL-WEAVE",
  "SP-MF-R08",
  "SP-MF-R05",
  "GALLERY-SP-ESSAY",
  "SP-MF-R01",
  "SL-BLUE",
  "SP-MF-R07"
];

const cardsById = new Map(cards.map(card => [card.id, card]));
const arrangedCards = displayOrder.map(id => {
  const card = cardsById.get(id);
  if (!card) {
    throw new Error(`missing card id ${id}`);
  }
  return card;
});

if (arrangedCards.length !== placements.length) {
  throw new Error(`cards length ${arrangedCards.length} must match placements length ${placements.length}`);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function assertInputsExist() {
  for (const card of arrangedCards) {
    const absolute = path.join(rootDir, card.path);
    await fs.access(absolute);
  }
}

function cardHtml(card, placement) {
  const absolute = path.join(rootDir, card.path);
  const src = pathToFileURL(absolute).href;
  const style = [
    `--x:${placement.x}px`,
    `--y:${placement.y}px`,
    `--w:${placement.w}px`,
    `--r:${placement.r}deg`,
    `--z:${placement.z}`
  ].join(";");

  return `<article class="card" style="${style}" aria-label="${escapeHtml(card.id)}">
    <img src="${src}" alt="${escapeHtml(card.title)}" />
  </article>`;
}

function buildHtml() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=${WIDTH}, initial-scale=1" />
<title>BLCaptain Style Skill 封面墙</title>
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; }
  body {
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Noto Sans CJK SC", sans-serif;
    color: #15120f;
    background:
      radial-gradient(circle at 18% 10%, rgba(255,255,255,.88), transparent 31%),
      radial-gradient(circle at 72% 84%, rgba(198,205,200,.35), transparent 38%),
      repeating-linear-gradient(0deg, rgba(31,34,31,.018), rgba(31,34,31,.018) 1px, transparent 1px, transparent 5px),
      #e7ece8;
  }
  .wall {
    position: relative;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    overflow: hidden;
    isolation: isolate;
  }
  .wall::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background:
      linear-gradient(101deg, rgba(255,255,255,.62), transparent 23%, transparent 76%, rgba(255,255,255,.44)),
      linear-gradient(180deg, rgba(255,255,255,.68), transparent 35%, rgba(197,204,198,.3));
    pointer-events: none;
  }
  .wall::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 40;
    background:
      linear-gradient(90deg, rgba(16,22,18,.035), transparent 12%, transparent 87%, rgba(16,22,18,.04)),
      linear-gradient(180deg, rgba(255,255,255,.12), transparent 48%, rgba(43,49,43,.035));
    mix-blend-mode: multiply;
    pointer-events: none;
  }
  .card {
    position: absolute;
    left: var(--x);
    top: var(--y);
    z-index: var(--z);
    width: var(--w);
    height: calc(var(--w) * 1.333333);
    padding: 10px;
    background: #fbfbf7;
    border: 1px solid rgba(33,34,31,.16);
    box-shadow:
      0 31px 46px rgba(37,42,38,.18),
      0 8px 16px rgba(37,42,38,.12),
      1px 1px 0 rgba(255,255,255,.82),
      inset 0 1px 0 rgba(255,255,255,.88);
    transform: rotate(var(--r));
    transform-origin: 50% 50%;
    overflow: hidden;
  }
  .card::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(135deg, rgba(255,255,255,.18), transparent 40%, rgba(29,25,21,.055));
    mix-blend-mode: multiply;
  }
  .card img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: #f5f3eb;
    filter: saturate(.96) contrast(.98) sepia(.025);
  }
</style>
</head>
<body>
  <main class="wall">
    ${arrangedCards.map((card, index) => cardHtml(card, placements[index])).join("\n    ")}
  </main>
</body>
</html>`;
}

function buildSourcesMarkdown() {
  const rows = arrangedCards
    .map(card => `| ${card.id} | ${card.system} | ${card.status} | \`${card.path}\` |`)
    .join("\n");

  return `# README / X 16:9 封面墙来源清单

生成文件：\`docs/hero-cover-wall.png\`

用途：GitHub README 顶图与 X / Twitter 发帖配图。

边界：

- 这张图是展示用封面墙，不是生产 proof。
- SP-MF 条目引用已验收或 preserved 的 cover mother。
- README gallery / local theme proof 条目只用于展示三套视觉语言覆盖，不写入 accepted proof。
- 不从本封面墙反裁生产素材。

| ID | 视觉系统 | 状态 | 本地路径 |
|---|---|---|---|
${rows}
`;
}

async function render() {
  await assertInputsExist();
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "blcaptain-cover-wall-"));
  const tempHtmlPath = path.join(tempDir, "index.html");
  await fs.writeFile(tempHtmlPath, buildHtml(), "utf8");

  const browser = await chromium.launch({
    args: ["--allow-file-access-from-files"]
  });
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1
  });

  await page.goto(pathToFileURL(tempHtmlPath).href, { waitUntil: "networkidle" });
  await page.waitForFunction(() => {
    return Array.from(document.images).every(img => img.complete && img.naturalWidth > 0);
  });
  await page.screenshot({ path: outputPath, fullPage: false });
  await browser.close();

  await fs.writeFile(sourcesPath, buildSourcesMarkdown(), "utf8");
  await fs.rm(tempHtmlPath);
  await fs.rmdir(tempDir);

  console.log(`wrote ${path.relative(rootDir, outputPath)}`);
  console.log(`wrote ${path.relative(rootDir, sourcesPath)}`);
}

render().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

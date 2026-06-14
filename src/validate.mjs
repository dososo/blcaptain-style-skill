
import path from "node:path";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";

function resolveIndex(input) {
  const abs = path.resolve(input);
  return abs.endsWith(".html") ? abs : path.join(abs, "index.html");
}

async function exists(p){try{await fs.access(p);return true}catch{return false}}

function findChromium() {
  const candidates = [
    process.env.CHROMIUM_PATH,
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium"
  ].filter(Boolean);
  return candidates.find(candidate => existsSync(candidate));
}

function extractPosters(html) {
  return html.match(/<section\s+class="poster\b[\s\S]*?<\/section>/g) || [];
}

function getAttr(str, attr) {
  return str.match(new RegExp(`${attr}="([^"]+)"`))?.[1] || "";
}

function stripTags(s) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

async function staticValidate(indexPath) {
  const taskDir = path.dirname(indexPath);
  const html = await fs.readFile(indexPath, "utf8");
  const posters = extractPosters(html);
  const styles = new Set(posters.map(p => getAttr(p, "data-style")).filter(Boolean));
  const report = posters.map((poster, idx) => {
    const name = getAttr(poster, "data-name") || String(idx + 1).padStart(2, "0");
    const issues = [];
    const cls = getAttr(poster, "class");
    const text = stripTags(poster);
    const h1 = (poster.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [,""])[1].replace(/<[^>]+>/g,"").trim();
    if (!/(xhs|square|wide|xcover)/.test(cls)) issues.push({level:"FAIL",rule:"S1_FORMAT",detail:"poster has no known format class"});
    if (styles.size > 4) issues.push({level:"WARN",rule:"R10_STYLE_MIX",detail:`deck uses ${styles.size} styles`});
    if (h1.length > 42 && /statement-cover|alert-burst|meme-focus/.test(cls)) issues.push({level:"WARN",rule:"R4_TITLE_LENGTH",detail:`long cover title: ${h1.length} chars`});
    if (text.length < 8) issues.push({level:"FAIL",rule:"S2_EMPTY",detail:"poster text is nearly empty"});
    const imgs = [...poster.matchAll(/<img\b[^>]*>/g)].map(m => m[0]);
    for (const img of imgs) {
      if (!/object-position\s*:/.test(img)) issues.push({level:"WARN",rule:"R9_OBJECT_POSITION",detail:"image lacks explicit object-position"});
    }
    if (/layout-product-hero/.test(cls) && !(/<img\b|background-image/.test(poster))) issues.push({level:"FAIL",rule:"S3_PRODUCT_IMAGE",detail:"product hero needs an image"});
    if (/layout-screenshot-focus/.test(cls) && !/<img\b/.test(poster)) issues.push({level:"FAIL",rule:"S4_SCREENSHOT_IMAGE",detail:"screenshot-focus needs an image"});
    return {name, issues};
  });

  if (await exists(path.join(taskDir, "assets"))) {
    const sources = await exists(path.join(taskDir, "assets", "SOURCES.md"));
    if (!sources) report.push({ name:"assets", issues:[{level:"WARN",rule:"R11_SOURCES",detail:"assets/ exists but SOURCES.md is missing"}]});
  }

  const fails = report.flatMap(r=>r.issues).filter(i=>i.level==="FAIL").length;
  return { indexPath, report, fails, renderer:"static" };
}

async function validateWithPlaywright(indexPath) {
  const { chromium } = await import("playwright");
  const taskDir = path.dirname(indexPath);
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (err) {
    const executablePath = findChromium();
    if (!executablePath || !/Executable doesn't exist/i.test(String(err?.message || err))) throw err;
    browser = await chromium.launch({ headless: true, executablePath });
  }
  const page = await browser.newPage({ viewport: { width: 2600, height: 1900 }, deviceScaleFactor: 1 });
  await page.goto(`file://${indexPath}`);
  await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });

  const report = await page.evaluate(() => {
    function visible(el) {
      const s = getComputedStyle(el);
      return s.display !== "none" && s.visibility !== "hidden" && Number(s.opacity) !== 0;
    }

    const posters = Array.from(document.querySelectorAll(".poster"));
    const styles = new Set(posters.map(p => p.dataset.style).filter(Boolean));

    return posters.map((poster, idx) => {
      const name = poster.getAttribute("data-name") || String(idx + 1).padStart(2, "0");
      const pr = poster.getBoundingClientRect();
      const issues = [];

      if (styles.size > 4) issues.push({ level: "WARN", rule: "R10_STYLE_MIX", detail: `deck uses ${styles.size} styles; visual rhythm may fragment` });

      const nodes = Array.from(poster.querySelectorAll("h1,h2,h3,p,li,figure,img,.card,.foot,.kicker,.quote-text,.big-number"));
      for (const node of nodes) {
        if (!visible(node)) continue;
        const r = node.getBoundingClientRect();
        const tag = node.className ? `${node.tagName}.${String(node.className).split(" ").join(".")}` : node.tagName;
        if (r.left < pr.left - 1 || r.top < pr.top - 1 || r.right > pr.right + 1 || r.bottom > pr.bottom + 1) {
          issues.push({ level: "FAIL", rule: "R1_OVERFLOW", detail: `${tag} exceeds poster bounds` });
        }

        const fs = parseFloat(getComputedStyle(node).fontSize || "0");
        if (["P", "LI"].includes(node.tagName) && fs > 0 && fs < 18) {
          issues.push({ level: "FAIL", rule: "R3_MIN_FONT", detail: `${tag} font-size ${fs}px` });
        }
        // R12 360px 缩略图可读：正文缩到小红书信息流 360px 缩略图时等效字号须 ≥8.5px
        // （poster 宽 W，缩放比 360/W；对应 SP-SCALE-01 正文 26px 底线 = 8.67px 刚好通过）
        if (["P", "LI"].includes(node.tagName) && fs > 0 && pr.width > 0) {
          const thumbFs = fs * (360 / pr.width);
          if (thumbFs < 8.5) issues.push({ level: "WARN", rule: "R12_THUMBNAIL_READABILITY", detail: `${tag} ${fs}px → ${thumbFs.toFixed(1)}px @360px thumbnail` });
        }
        // R16 中文排版禁则(GM-10)：CJK 正文不得 justify 两端对齐 / 伪斜体（仅查含中文的节点，保留英文 italic 声部）
        if (/[一-鿿]/.test(node.textContent || "")) {
          const cst = getComputedStyle(node);
          if (cst.textAlign === "justify" || cst.fontStyle === "italic") {
            issues.push({ level: "WARN", rule: "R16_CJK_TYPOGRAPHY", detail: `${tag} CJK uses ${cst.textAlign === "justify" ? "justify two-side align" : "fake italic"}` });
          }
        }
      }

      const foot = poster.querySelector(".foot");
      if (foot) {
        const fr = foot.getBoundingClientRect();
        const before = Array.from(poster.querySelectorAll("h1,h2,h3,p,li,.card,figure"))
          .filter(n => !foot.contains(n) && visible(n))
          .map(n => n.getBoundingClientRect());
        for (const r of before) {
          const overlaps = !(r.right < fr.left || r.left > fr.right || r.bottom < fr.top || r.top > fr.bottom);
          if (overlaps) {
            issues.push({ level: "FAIL", rule: "R2_FOOTER_COLLISION", detail: "footer overlaps content" });
            break;
          }
        }
      }

      const h1 = poster.querySelector("h1");
      if (h1) {
        const lh = parseFloat(getComputedStyle(h1).lineHeight || "1");
        const lines = h1.getBoundingClientRect().height / Math.max(lh, 1);
        if (lines > 5.2) issues.push({ level: "WARN", rule: "R4_TITLE_LINES", detail: `h1 appears to use ${lines.toFixed(1)} lines` });
      }

      const imgs = Array.from(poster.querySelectorAll("img"));
      for (const img of imgs) {
        const r = img.getBoundingClientRect();
        if (r.width < 160 || r.height < 120) issues.push({ level: "WARN", rule: "R7_IMAGE_SMALL", detail: "image may be too small to matter" });
        const op = img.style.objectPosition || getComputedStyle(img).objectPosition;
        if (!op || op === "50% 50%") issues.push({ level: "WARN", rule: "R9_OBJECT_POSITION", detail: "image uses default object-position; decide crop deliberately" });
        if (img.naturalWidth && img.naturalHeight) {
          const natural = img.naturalWidth / img.naturalHeight;
          const shown = r.width / r.height;
          const objectFit = getComputedStyle(img).objectFit;
          if (objectFit === "fill" && Math.abs(natural - shown) > 0.15) issues.push({ level: "FAIL", rule: "R8_IMAGE_STRETCH", detail: "image object-fit fill changes aspect ratio" });
        }
      }

      const shot = poster.querySelector(".frame-shot img");
      if (shot) {
        const r = shot.getBoundingClientRect();
        if (r.width < 520 && poster.classList.contains("xhs")) issues.push({ level: "WARN", rule: "R7_SCREENSHOT_READABILITY", detail: "screenshot may be too narrow for phone viewing" });
      }

      // R13 文字密度：可见文字字符数 / 面积过高 → 缩略图糊成一团 → WARN（>3.5/万px² ≈ >540 字/卡）
      const bodyChars = (poster.innerText || poster.textContent || "").replace(/\s+/g, "").length;
      const densityPer10k = bodyChars / Math.max(pr.width * pr.height / 10000, 1);
      if (densityPer10k > 3.5) issues.push({ level: "WARN", rule: "R13_TEXT_DENSITY", detail: `${bodyChars} chars ≈ ${densityPer10k.toFixed(1)}/10kpx² crowded` });

      // R15 portrait-fill：仅 Signal 证据/数据卡内容须填充 ≥78%（证据要充实）；Still Paper 留白美学 / Bridge 满铺豁免（不照搬外部密集标准）
      if (poster.classList.contains("xhs") && /layout-sl-/.test(poster.className) && poster.querySelector("p, li")) {
        const cnodes = Array.from(poster.querySelectorAll("h1,h2,h3,p,li,figure,img,.card,.quote-text,.big-number")).filter(visible);
        if (cnodes.length) {
          const rects = cnodes.map(n => n.getBoundingClientRect());
          const top = Math.min(...rects.map(r => r.top));
          const bot = Math.max(...rects.map(r => r.bottom));
          const fill = (bot - top) / pr.height;
          if (fill < 0.78) issues.push({ level: "WARN", rule: "R15_PORTRAIT_FILL", detail: `content fills ${(fill * 100).toFixed(0)}% of height (<78%)` });
        }
      }

      // R14 证据诚信(GM-13)：Signal 截图证据卡不得用 AI 生成/插画图当证据（假证据毁「证据方法论」护城河）→ FAIL
      // 精准匹配「图本身是生成的」，不匹配孤立 AI（避免误伤 AI 工具教程的真实截图）
      if (/sl-ev-screenshot/.test(poster.className) || poster.querySelector(".sl-ev-shotimg")) {
        const evImg = poster.querySelector(".sl-ev-shotimg img, .sl-ev-shot img");
        const srcText = `${poster.querySelector(".sl-ev-src")?.textContent || ""} ${evImg?.getAttribute("alt") || ""}`;
        if (/AI[\s-]*生成|AI[\s-]?generated|generated\s+(image|asset|illustration|render)|midjourney|dall[\s-]?e|stable\s*diffusion|生成图|AI\s*插画|abstract\s+render/i.test(srcText)) {
          issues.push({ level: "FAIL", rule: "R14_EVIDENCE_INTEGRITY", detail: "screenshot-evidence card uses AI-generated/illustration image — fake evidence" });
        }
      }

      return { name, issues };
    });
  });

  await browser.close();

  if (await exists(path.join(taskDir, "assets"))) {
    const sources = await exists(path.join(taskDir, "assets", "SOURCES.md"));
    if (!sources) report.push({ name: "assets", issues: [{ level: "WARN", rule: "R11_SOURCES", detail: "assets/ exists but SOURCES.md is missing" }] });
  }

  const fails = report.flatMap(r=>r.issues).filter(i=>i.level==="FAIL").length;
  return { indexPath, report, fails, renderer:"playwright" };
}

export async function validateDeck(input) {
  const indexPath = resolveIndex(input);
  try {
    return await validateWithPlaywright(indexPath);
  } catch (err) {
    if (!/Cannot find package 'playwright'|ERR_MODULE_NOT_FOUND|Executable doesn't exist/i.test(String(err?.message || err))) throw err;
    const result = await staticValidate(indexPath);
    result.report.unshift({ name:"validator", issues:[{ level:"WARN", rule:"STATIC_FALLBACK", detail:"Playwright not available; ran static validation only" }] });
    return result;
  }
}

export function printValidation(result) {
  console.log(`Validator: ${result.renderer || "unknown"}`);
  for (const poster of result.report) {
    if (!poster.issues.length) {
      console.log(`PASS ${poster.name}`);
      continue;
    }
    console.log(`CHECK ${poster.name}`);
    for (const issue of poster.issues) console.log(`  ${issue.level} ${issue.rule}: ${issue.detail}`);
  }
  console.log(`\n${result.fails ? "FAIL" : "PASS"}: ${result.fails} blocking issue(s).`);
}

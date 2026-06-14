import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawn } from "node:child_process";

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

function posterName(section, index) {
  const m = section.match(/data-name="([^"]+)"/);
  return m ? m[1] : String(index + 1).padStart(2, "0");
}

function posterDim(section) {
  const cls = section.match(/class="([^"]+)"/)?.[1] || "";
  for (const key of Object.keys(DIMS)) {
    if (cls.split(/\s+/).includes(key)) return DIMS[key];
  }
  return DIMS.xhs;
}

function extractPosters(html) {
  const matches = html.match(/<section\s+class="poster\b[\s\S]*?<\/section>/g) || [];
  return matches.map((section, index) => ({
    section,
    name: posterName(section, index),
    ...posterDim(section)
  }));
}

async function renderWithPlaywright(indexPath, outputDir, options = {}) {
  const { chromium } = await import("playwright");
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (err) {
    const executablePath = findChromium();
    if (!executablePath || !/Executable doesn't exist/i.test(String(err?.message || err))) {
      throw err;
    }
    browser = await chromium.launch({ headless: true, executablePath });
  }
  const page = await browser.newPage({
    viewport: { width: 2600, height: 1900 },
    deviceScaleFactor: options.scale || 2,
    colorScheme: "light"
  });

  await page.goto(`file://${indexPath}`);
  await page.addStyleTag({ content: `*{animation:none!important;transition:none!important}` });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    const imgs = Array.from(document.images);
    await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(resolve => {
      img.addEventListener("load", resolve, { once: true });
      img.addEventListener("error", resolve, { once: true });
    })));
  });

  const posters = await page.locator(".poster").elementHandles();
  if (!posters.length) {
    await browser.close();
    throw new Error("No .poster nodes found.");
  }

  const rendered = [];
  for (let i = 0; i < posters.length; i++) {
    const el = posters[i];
    const name = (await el.getAttribute("data-name")) || String(i + 1).padStart(2, "0");
    const file = path.join(outputDir, `${name}.png`);
    await el.screenshot({ path: file, type: "png" });
    const box = await el.boundingBox();
    rendered.push({ file, width: Math.round(box?.width || 0), height: Math.round(box?.height || 0), renderer: "playwright" });
  }

  await browser.close();
  return rendered;
}

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

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ["ignore", "pipe", "pipe"] });
    let settled = false;
    const finish = (fn, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      fn(value);
    };
    const timeout = setTimeout(() => {
      child.kill("SIGTERM");
      finish(reject, new Error(`${cmd} timed out while rendering`));
    }, 30000);
    let stderr = "";
    child.stderr.on("data", d => { stderr += d.toString(); });
    child.on("error", err => finish(reject, err));
    child.on("close", code => {
      if (code === 0) finish(resolve);
      else finish(reject, new Error(`${cmd} exited ${code}\n${stderr}`));
    });
  });
}

async function renderWithChromiumFallback(indexPath, outputDir) {
  const chromium = findChromium();
  if (!chromium) throw new Error("Playwright is not installed and no Chromium executable was found. Run `npm install && npx playwright install chromium`.");

  const html = await fs.readFile(indexPath, "utf8");
  const style = (html.match(/<style>([\s\S]*?)<\/style>/) || [,""])[1];
  const posters = extractPosters(html);
  if (!posters.length) throw new Error("No .poster sections found.");

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "blcaptain-render-"));
  const rendered = [];

  for (const p of posters) {
    const tempHtml = path.join(tempDir, `${p.name}.html`);
    const file = path.join(outputDir, `${p.name}.png`);
    const doc = `<!doctype html><html><head><meta charset="utf-8"><style>${style}
      html,body{margin:0!important;padding:0!important;background:transparent!important;width:${p.width}px;height:${p.height}px;overflow:hidden}
      body{display:block!important}
      .poster{margin:0!important}
      </style></head><body>${p.section}</body></html>`;
    await fs.writeFile(tempHtml, doc, "utf8");
    const profileDir = path.join(tempDir, `profile-${p.name}`);
    await fs.mkdir(profileDir, { recursive: true });
    await run(chromium, [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-crash-reporter",
      "--disable-breakpad",
      "--disable-crashpad",
      "--no-crash-upload",
      "--disable-features=Crashpad",
      `--crash-dumps-dir=${path.join(tempDir, "crashes")}`,
      `--user-data-dir=${profileDir}`,
      `--window-size=${p.width},${p.height}`,
      `--screenshot=${file}`,
      `file://${tempHtml}`
    ]);
    rendered.push({ file, width: p.width, height: p.height, renderer: "chromium-cli" });
  }

  await fs.rm(tempDir, { recursive: true, force: true });
  return rendered;
}

export async function renderDeck(input, options = {}) {
  const indexPath = resolveIndex(input);
  const taskDir = path.dirname(indexPath);
  const outputDir = options.outputDir ? path.resolve(options.outputDir) : path.join(taskDir, "output");
  await fs.mkdir(outputDir, { recursive: true });

  try {
    return await renderWithPlaywright(indexPath, outputDir, options);
  } catch (err) {
    if (!/Cannot find package 'playwright'|ERR_MODULE_NOT_FOUND|Executable doesn't exist/i.test(String(err?.message || err))) {
      throw err;
    }
    return await renderWithChromiumFallback(indexPath, outputDir);
  }
}

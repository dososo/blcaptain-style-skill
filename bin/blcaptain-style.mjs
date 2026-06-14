#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { buildDeck } from "../src/engine.mjs";

function usage() {
  console.log(`BLCaptain Style Skill

Usage:
  blcaptain-style plan <source.md> --out <brief.json> [--style sp-mist|sl-blue|sp-warm] [--format xhs|wide|square|xcover] [--cards 5] [--cover-mother R01|R04|R05|R06|R07|R08] [--system signal|bridge|auto] [--cover-style noir|weave|split|manifesto]
  blcaptain-style lint <brief.json>
  blcaptain-style build <brief.json> --out <task-dir>
  blcaptain-style render <task-dir-or-index.html>
  blcaptain-style validate <task-dir-or-index.html>
  blcaptain-style review-report <task-dir-or-index.html> [--out <report.md>]
  blcaptain-style themes
  blcaptain-style style-packs
  blcaptain-style recommend-style [--platform xhs|wechat] [--category food|ai|career] [--intent proof|essay|tutorial]
  blcaptain-style providers
  blcaptain-style image-plan <brief.json> --out <IMAGE_REQUESTS.md>
  blcaptain-style image-fetch <urls.json> --out <assets-dir> [--brief <brief.json>]
  blcaptain-style status [--status tasks/manual-review-status.json] [--json]
  blcaptain-style review-refresh [--status tasks/manual-review-status.json] [--board tasks/manual-review-board.html] [--packet tasks/manual-review-packet.md]
  blcaptain-style audit
  blcaptain-style demo

Examples:
  node bin/blcaptain-style.mjs plan examples/source-article.md --out examples/generated/planned-brief.json --style sp-mist
  node bin/blcaptain-style.mjs build examples/generated/planned-brief.json --out examples/generated/planned-deck
  node bin/blcaptain-style.mjs render examples/generated/planned-deck
  node bin/blcaptain-style.mjs review-report examples/generated/planned-deck
  node bin/blcaptain-style.mjs status
  node bin/blcaptain-style.mjs review-refresh
`);
}

function argAfter(args, flag) {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : null;
}

async function run() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd || cmd === "-h" || cmd === "--help") {
    usage();
    return;
  }

  if (cmd === "plan") {
    const input = args[1];
    const out = argAfter(args, "--out") || "brief.generated.json";
    if (!input) throw new Error("Missing source markdown/text file");
    const { planBrief } = await import("../src/plan.mjs");
    const brief = await planBrief(input, {
      style: argAfter(args, "--style"),
      format: argAfter(args, "--format") || "xhs",
      cards: argAfter(args, "--cards"),
      kind: argAfter(args, "--kind"),
      brand: argAfter(args, "--brand"),
      title: argAfter(args, "--title"),
      coverLayout: argAfter(args, "--cover-layout"),
      coverMother: argAfter(args, "--cover-mother"),
      system: argAfter(args, "--system"),
      coverStyle: argAfter(args, "--cover-style"),
      bcPalette: argAfter(args, "--bc-palette"),
      shot: argAfter(args, "--shot")
    });
    await fs.mkdir(path.dirname(path.resolve(out)), { recursive: true });
    await fs.writeFile(out, JSON.stringify(brief, null, 2), "utf8");
    console.log(`Planned brief: ${path.resolve(out)}`);
    return;
  }

  if (cmd === "lint") {
    const brief = args[1];
    if (!brief) throw new Error("Missing brief.json");
    const { lintBrief, printLint } = await import("../src/lintBrief.mjs");
    const res = await lintBrief(brief);
    printLint(res);
    process.exitCode = res.fails ? 1 : 0;
    return;
  }


  if (cmd === "themes") {
    const { THEME_PRESETS } = await import("../src/data.mjs");
    const currentThemeNames = [
      "SP-01 Mist Field",
      "SP-02 Warm Study",
      "SP-03 Coastal Quiet",
      "SP-04 Night Grain",
      "SP-05 Hearth & Table",
      "SL-01 Electric Blue",
      "SL-02 Graphite Mint",
      "SL-03 Safety Coral",
      "SL-04 Acid Lime"
    ];
    const currentThemeOrder = new Map(currentThemeNames.map((name, index) => [name, index]));
    const currentThemes = Object.entries(THEME_PRESETS)
      .filter(([, t]) => currentThemeOrder.has(t.name))
      .sort(([, a], [, b]) => currentThemeOrder.get(a.name) - currentThemeOrder.get(b.name));

    console.log("当前已批准主题：");
    for (const [id, t] of currentThemes) {
      console.log(`- ${id} (${t.family}) — ${t.name}`);
    }
    return;
  }


  if (cmd === "style-packs") {
    const { listStylePacks } = await import("../src/stylePacks.mjs");
    for (const p of listStylePacks()) {
      console.log(`- ${p.id} [${p.platform.join(",")}] ${p.name}`);
      console.log(`  visual: ${p.visualSystem}; theme: ${p.theme}`);
      console.log(`  categories: ${p.categories.join(", ")}`);
      console.log(`  layouts: ${p.layouts.join(" → ")}`);
      console.log(`  ${p.description}`);
    }
    return;
  }

  if (cmd === "recommend-style") {
    const { recommendStylePacks } = await import("../src/stylePacks.mjs");
    const res = recommendStylePacks({
      platform: argAfter(args, "--platform"),
      category: argAfter(args, "--category"),
      intent: argAfter(args, "--intent")
    }).slice(0, 8);
    if (!res.length) {
      console.log("No matching style packs. Try fewer filters.");
      return;
    }
    for (const p of res) {
      console.log(`- ${p.id} score=${p.score} — ${p.name}`);
      console.log(`  visual: ${p.visualSystem}; theme: ${p.theme}`);
      console.log(`  layouts: ${p.layouts.join(" → ")}`);
      console.log(`  image: ${p.imagePolicy}`);
      console.log(`  avoid: ${p.antiPatterns.join(" / ")}`);
    }
    return;
  }


  if (cmd === "providers") {
    const { listProviders } = await import("../src/imageWorkflow.mjs");
    console.log("Image provider priority:");
    for (const p of listProviders()) {
      console.log(`- ${p.id}: ${p.label} — ${p.note}`);
    }
    return;
  }

  if (cmd === "image-plan") {
    const brief = args[1];
    const out = argAfter(args, "--out") || "assets/IMAGE_REQUESTS.md";
    if (!brief) throw new Error("Missing brief.json");
    const { imagePlan } = await import("../src/imageWorkflow.mjs");
    const res = await imagePlan(brief, out);
    console.log(`Image plan: ${res.outPath}`);
    console.log(`Missing image cards: ${res.missing}`);
    return;
  }

  if (cmd === "image-fetch") {
    const urls = args[1];
    const out = argAfter(args, "--out") || "assets";
    if (!urls) throw new Error("Missing urls.json");
    const { imageFetch } = await import("../src/imageWorkflow.mjs");
    const res = await imageFetch(urls, out, { brief: argAfter(args, "--brief") });
    console.log(`Fetched ${res.count} image(s) into ${res.assetsDir}`);
    if (res.patchedBrief) console.log(`Patched brief image fields: ${res.patchedBrief}`);
    return;
  }


  if (cmd === "status") {
    const { runStatusSummary } = await import("../scripts/status-summary.mjs");
    console.log(runStatusSummary(argAfter(args, "--status") || "tasks/manual-review-status.json", {
      json: args.includes("--json")
    }));
    return;
  }

  if (cmd === "review-refresh") {
    const statusPath = path.resolve(argAfter(args, "--status") || argAfter(args, "--file") || "tasks/manual-review-status.json");
    const boardPath = path.resolve(argAfter(args, "--board") || "tasks/manual-review-board.html");
    const packetPath = path.resolve(argAfter(args, "--packet") || "tasks/manual-review-packet.md");
    const checkPaths = !args.includes("--no-paths");
    const manifest = JSON.parse(await fs.readFile(statusPath, "utf8"));

    const { generateManualReviewBoard } = await import("../scripts/manual-review-board.mjs");
    const {
      evaluateManualReviewBoardHtml,
      formatManualReviewBoardGateReport
    } = await import("../scripts/manual-review-board-gate.mjs");
    const { generateManualReviewPacket } = await import("../scripts/manual-review-packet.mjs");
    const {
      evaluateManualReviewPacketMarkdown,
      formatManualReviewPacketGateReport
    } = await import("../scripts/manual-review-packet-gate.mjs");
    const {
      evaluateManualReview,
      formatManualReviewReport
    } = await import("../scripts/manual-review-gate.mjs");

    const boardHtml = generateManualReviewBoard(manifest, { outPath: boardPath });
    await fs.mkdir(path.dirname(boardPath), { recursive: true });
    await fs.writeFile(boardPath, boardHtml, "utf8");

    const boardGate = evaluateManualReviewBoardHtml(manifest, boardHtml, {
      boardPath,
      checkOutputPaths: checkPaths
    });
    console.log(formatManualReviewBoardGateReport(boardGate));
    console.log("");

    const packetMarkdown = generateManualReviewPacket(manifest);
    await fs.mkdir(path.dirname(packetPath), { recursive: true });
    await fs.writeFile(packetPath, packetMarkdown, "utf8");

    const packetGate = evaluateManualReviewPacketMarkdown(manifest, packetMarkdown);
    console.log(formatManualReviewPacketGateReport(packetGate));
    console.log("");

    const manualGate = evaluateManualReview(manifest, { checkPaths });
    console.log(formatManualReviewReport(manualGate));

    if (!boardGate.ok || !packetGate.ok || !manualGate.ok) process.exitCode = 1;
    return;
  }

  if (cmd === "build") {
    const brief = args[1];
    const out = argAfter(args, "--out") || "social-card-output";
    if (!brief) throw new Error("Missing brief.json");
    const res = await buildDeck(brief, out);
    console.log(`Built ${res.cardCount} card(s): ${res.indexPath}`);
    return;
  }

  if (cmd === "render") {
    const input = args[1];
    if (!input) throw new Error("Missing task dir or index.html");
    const { renderDeck } = await import("../src/render.mjs");
    const files = await renderDeck(input);
    for (const f of files) console.log(`Rendered ${f.width}×${f.height}: ${f.file}`);
    return;
  }

  if (cmd === "validate") {
    const input = args[1];
    if (!input) throw new Error("Missing task dir or index.html");
    const { validateDeck, printValidation } = await import("../src/validate.mjs");
    const result = await validateDeck(input);
    printValidation(result);
    process.exitCode = result.fails ? 1 : 0;
    return;
  }

  if (cmd === "review-report") {
    const input = args[1];
    if (!input) throw new Error("Missing task dir or index.html");
    const { generateUserReviewReport } = await import("../src/reviewReport.mjs");
    const result = await generateUserReviewReport(input, {
      outPath: argAfter(args, "--out")
    });
    console.log(`Review report: ${result.outPath}`);
    process.exitCode = result.validation.fails ? 1 : 0;
    return;
  }

  if (cmd === "audit") {
    const { auditProject, printAudit } = await import("../src/audit.mjs");
    const res = await auditProject(process.cwd());
    printAudit(res);
    return;
  }

  if (cmd === "demo") {
    const demos = [
      ["examples/agent-parallel-research/brief.json", "examples/generated/agent-parallel-research"],
      ["examples/harmony-auto-campaign/brief.json", "examples/generated/harmony-auto-campaign"],
      ["examples/founder-diary/brief.json", "examples/generated/founder-diary"],
      ["examples/screenshot-tutorial/brief.json", "examples/generated/screenshot-tutorial"],
      ["examples/data-report/brief.json", "examples/generated/data-report"],
      ["examples/xhs-feed-patterns/brief.json", "examples/generated/xhs-feed-patterns"]
    ];
    for (const [brief, out] of demos) {
      const res = await buildDeck(brief, out);
      console.log(`Built demo: ${res.indexPath}`);
    }
    console.log("\nNext:");
    console.log("  npm install");
    console.log("  npx playwright install chromium");
    console.log("  node bin/blcaptain-style.mjs render examples/generated/agent-parallel-research");
    console.log("  node bin/blcaptain-style.mjs validate examples/generated/agent-parallel-research");
    return;
  }

  usage();
  process.exitCode = 1;
}

run().catch(err => {
  console.error(err.stack || err.message);
  process.exit(1);
});

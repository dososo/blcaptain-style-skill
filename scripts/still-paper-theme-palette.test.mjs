import test from "node:test";
import assert from "node:assert/strict";
import { STYLES } from "../src/data.mjs";

// sp-ws 骨架实际消费的「纸本专属」变量（纸底/墨色/印色/纸本宋体/拉丁/mono）。
// 只有定义全套，换 meta.style 才能真正切主题（否则退回默认，纸色/字体不变）。
const SP_WS_VARS = [
  "--gao", "--ya", "--ink", "--dai", "--li", "--tuo", "--zhu", "--zhu-lt",
  "--cream", "--panel",
  "--sp-display", "--sp-body", "--sp-label", "--sp-latin", "--sp-mono",
  "--sp-paper-bg",
];

test("Warm Study (master) is the reference and defines every sp-ws palette var except the opt-in paper-bg hook", () => {
  const css = STYLES["sp-warm-study"].css;
  for (const v of SP_WS_VARS) {
    if (v === "--sp-paper-bg") continue; // Warm 走 CSS 兜底，保持母版像素不变
    assert.ok(css[v], `Warm Study should define ${v}`);
  }
});

test("sp-night-grain defines the full sp-ws palette so Still-Paper skeletons actually theme to dark", () => {
  const css = STYLES["sp-night-grain"].css;
  for (const v of SP_WS_VARS) {
    assert.ok(css[v], `sp-night-grain must define ${v} for sp-ws skeletons`);
  }
  assert.notEqual(css["--ink"], STYLES["sp-warm-study"].css["--ink"], "Night --ink must differ from Warm's dark ink (light on dark)");
  assert.equal(css["--sp-display"], STYLES["sp-warm-study"].css["--sp-display"], "Still-Paper serif display font is shared across themes");
});

test("sp-hearth-table defines the full sp-ws palette (warm food/home variant)", () => {
  const css = STYLES["sp-hearth-table"].css;
  for (const v of SP_WS_VARS) {
    assert.ok(css[v], `sp-hearth-table must define ${v} for sp-ws skeletons`);
  }
  assert.notEqual(css["--zhu"], STYLES["sp-warm-study"].css["--zhu"], "Hearth accent differs from Warm Study");
  assert.equal(css["--sp-display"], STYLES["sp-warm-study"].css["--sp-display"], "Still-Paper serif display font is shared across themes");
});

test("sp-coastal-quiet defines the full sp-ws palette (cool teal variant)", () => {
  const css = STYLES["sp-coastal-quiet"].css;
  for (const v of SP_WS_VARS) {
    assert.ok(css[v], `sp-coastal-quiet must define ${v} for sp-ws skeletons`);
  }
  assert.notEqual(css["--ink"], STYLES["sp-warm-study"].css["--ink"], "Coastal ink differs from Warm's warm ink");
  assert.notEqual(css["--zhu"], STYLES["sp-warm-study"].css["--zhu"], "Coastal accent differs from Warm Study");
  assert.equal(css["--sp-display"], STYLES["sp-warm-study"].css["--sp-display"], "Still-Paper serif display font is shared across themes");
});

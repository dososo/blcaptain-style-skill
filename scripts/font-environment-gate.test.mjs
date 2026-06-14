import test from "node:test";
import assert from "node:assert/strict";
import { evaluateFontGroups } from "./font-environment-gate.mjs";

test("warns when only fallback fonts match and identity fonts are missing", () => {
  const groups = [
    {
      id: "sample-display",
      label: "Sample display",
      identityFonts: ["Identity Serif"],
      fonts: ["Identity Serif", "Fallback Sans"]
    }
  ];

  const result = evaluateFontGroups(groups, font => ({
    font,
    ok: font === "Fallback Sans",
    output: font === "Fallback Sans"
      ? "FallbackSans.ttf: \"Fallback Sans\" \"Regular\""
      : "Verdana.ttf: \"Verdana\" \"Regular\""
  }));

  assert.equal(result.hasWarn, true);
  assert.equal(result.hasFail, false);
  assert.match(result.warnings.join("\n"), /sample-display: no identity font matched/i);
});

test("passes when an identity font matches", () => {
  const groups = [
    {
      id: "sample-display",
      label: "Sample display",
      identityFonts: ["Identity Serif"],
      fonts: ["Identity Serif", "Fallback Sans"]
    }
  ];

  const result = evaluateFontGroups(groups, font => ({
    font,
    ok: font === "Identity Serif",
    output: font === "Identity Serif"
      ? "IdentitySerif.ttf: \"Identity Serif\" \"Regular\""
      : "FallbackSans.ttf: \"Fallback Sans\" \"Regular\""
  }));

  assert.equal(result.hasWarn, false);
  assert.equal(result.hasFail, false);
});

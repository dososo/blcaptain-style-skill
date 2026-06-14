import test from "node:test";
import assert from "node:assert/strict";
import { evaluateCompositionManifest } from "./full-bleed-composition-gate.mjs";

const contract = {
  requiredFields: [
    "imageRole",
    "subjectMap",
    "safeTextZones",
    "avoidZones",
    "quietZoneRatio",
    "lightQuality",
    "noMaskAttempted",
    "titleCanvasRatio",
    "objectPosition",
    "overlayToken",
    "overlayPeakAlpha",
    "cropStrategy",
    "thumbnailCheck",
    "fallbackPlan"
  ],
  minQuietZoneRatio: 0.3,
  maxTitleCanvasRatio: 0.4,
  maxOverlayPeakAlpha: 0.3,
  allowedLightQualities: ["dawn-fog", "overcast", "low-saturation-natural"],
  thumbnailChecks: ["pass", "pending"],
  subjectTypes: ["human", "landscape", "ui"],
  gridZones: ["top-left", "center-left", "bottom-right"],
  avoidZones: ["face", "body-anchor", "dense-ui-text"],
  overlayTokens: {
    "image-local-scrim": "localized title-zone contrast",
    "image-side-paper-panel": "Still Paper editorial text surface beside subject"
  },
  cropStrategies: ["center-crop", "negative-space-left", "reject-image"]
};

test("fails when a full-bleed card omits required composition fields", () => {
  const result = evaluateCompositionManifest({
    cards: [
      {
        id: "SP-FB-PROOF-01",
        imageRole: "full-bleed background",
        subjectMap: { subjectType: "human", subjectPosition: "bottom-right" }
      }
    ]
  }, contract);

  assert.equal(result.ok, false);
  assert.match(result.failures.join("\n"), /safeTextZones/);
  assert.match(result.failures.join("\n"), /avoidZones/);
  assert.match(result.failures.join("\n"), /quietZoneRatio/);
  assert.match(result.failures.join("\n"), /objectPosition/);
});

test("passes when composition fields match the contract vocabulary", () => {
  const result = evaluateCompositionManifest({
    cards: [
      {
        id: "SP-FB-PROOF-01",
        imageRole: "full-bleed background",
        subjectMap: { subjectType: "human", subjectPosition: "bottom-right" },
        safeTextZones: ["top-left", "center-left"],
        avoidZones: ["face", "body-anchor"],
        quietZoneRatio: 0.36,
        lightQuality: "dawn-fog",
        noMaskAttempted: true,
        titleCanvasRatio: 0.28,
        objectPosition: "center center",
        overlayToken: "image-local-scrim",
        overlayPeakAlpha: 0.24,
        cropStrategy: "negative-space-left",
        thumbnailCheck: "pass",
        fallbackPlan: "reject image if title overlaps face or body anchor"
      }
    ]
  }, contract);

  assert.equal(result.ok, true);
  assert.deepEqual(result.failures, []);
});

test("fails when overlay is used to compensate for weak image selection", () => {
  const result = evaluateCompositionManifest({
    cards: [
      {
        id: "SP-FB-PROOF-02",
        imageRole: "full-bleed background",
        subjectMap: { subjectType: "human", subjectPosition: "bottom-right" },
        safeTextZones: ["top-left"],
        avoidZones: ["face"],
        quietZoneRatio: 0.18,
        lightQuality: "high-saturation-noon",
        noMaskAttempted: false,
        titleCanvasRatio: 0.48,
        objectPosition: "center center",
        overlayToken: "image-local-scrim",
        overlayPeakAlpha: 0.46,
        cropStrategy: "negative-space-left",
        thumbnailCheck: "fail",
        fallbackPlan: "try stronger mask"
      }
    ]
  }, contract);

  assert.equal(result.ok, false);
  assert.match(result.failures.join("\n"), /quietZoneRatio/);
  assert.match(result.failures.join("\n"), /unknown light quality/);
  assert.match(result.failures.join("\n"), /noMaskAttempted/);
  assert.match(result.failures.join("\n"), /titleCanvasRatio/);
  assert.match(result.failures.join("\n"), /overlayPeakAlpha/);
  assert.match(result.failures.join("\n"), /thumbnailCheck/);
});

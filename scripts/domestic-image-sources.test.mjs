import test from "node:test";
import assert from "node:assert/strict";
import { listProviders } from "../src/imageWorkflow.mjs";
import { planBrief } from "../src/plan.mjs";

// 国内 CC0 图源接入（搭「国内开箱即用」，国内可访问无需 VPN）。
const DOMESTIC = ["cc0cn", "palayoutu", "ssyer", "hippopx"];

test("4 个国内 CC0 源接入 PROVIDERS，Tier 1 CC0", () => {
  const ps = listProviders();
  for (const id of DOMESTIC) {
    const p = ps.find(x => x.id === id);
    assert.ok(p, `缺国内源 ${id}`);
    assert.match(String(p.tier), /1|CC0/i, `${id} 应 Tier 1 CC0`);
    assert.match(String(p.note), /国内/, `${id} note 应标国内可访问`);
  }
});

test("国内源前置进 cover imageRequest.providerOrder（国内优先于国际）", async () => {
  const b = await planBrief("examples/source-article.md", { kind: "diary", style: "sp-warm" });
  const order = b.cards[0].imageRequest.providerOrder;
  for (const id of DOMESTIC) assert.ok(order.includes(id), `providerOrder 应含 ${id}`);
  // 国内 cc0cn 应排在国际 unsplash/pexels 之前
  assert.ok(order.indexOf("cc0cn") < order.indexOf("pexels"), "国内 CC0 应前置于国际源");
});

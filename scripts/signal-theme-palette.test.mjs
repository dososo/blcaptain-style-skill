import test from "node:test";
import assert from "node:assert/strict";
import { STYLES } from "../src/data.mjs";

// Signal 卡（.sl-cover / sl-cover-* / sl-body-*）实际消费的 token：底/面/字/弱/accent/线/字体。
// 只有 5 个 SL 主题都定义全，换 style 才真切主题（否则掉 fallback、暗场跑不起来）。
const SL_THEMES = ["sl-electric-blue", "sl-safety-coral", "sl-graphite-mint", "sl-acid-lime", "sl-signal-noir"];
const SL_VARS = ["--bg", "--surface", "--fg", "--muted", "--accent", "--line", "--font-display", "--font-body"];

test("Signal 5 主题全部定义 Signal 卡消费的 token", () => {
  for (const id of SL_THEMES) {
    const style = STYLES[id];
    assert.ok(style, `缺主题 ${id}`);
    for (const v of SL_VARS) {
      assert.ok(style.css[v], `${id} 缺 ${v}`);
    }
    assert.equal(style.family, "signal-ledger", `${id} 应属 signal-ledger 家族`);
  }
});

test("SL-05 Signal Noir 是暗场（fg 浅、bg 深）且定义 --grid（暗网格不掉浅 fallback）", () => {
  const noir = STYLES["sl-signal-noir"];
  assert.ok(noir.css["--grid"], "Noir 必须定义 --grid（否则暗场上掉浅色 fallback 网格）");
  // 暗场：fg 应比 bg 亮（浅字深底）
  const lum = hex => { const h = hex.replace("#", ""); return parseInt(h.slice(0, 2), 16) + parseInt(h.slice(2, 4), 16) + parseInt(h.slice(4, 6), 16); };
  assert.ok(lum(noir.css["--fg"]) > lum(noir.css["--bg"]), "Noir 应 fg 亮于 bg（暗场浅字）");
});

test("Signal 主题用黑体(SWISS)，区别于 Still Paper 宋体", () => {
  const blue = STYLES["sl-electric-blue"];
  assert.match(String(blue.css["--font-display"]), /Inter|Helvetica|PingFang|sans/i, "Signal display 应为黑体/sans");
});

// #3 发布：SL-01 是 Signal 默认主题（plan style:"sl-blue" → sl-electric-blue），固化成「奶白档案纸 light + 电蓝 accent」，
// 区别 SaaS 冷灰白（旧 #F6F7FA，B 通道最高=偏冷蓝）。纲领=Signal·账本=奶白档案纸 light 为主。
test("SL-01 Electric Blue 固化为奶白档案纸 light（暖白 #F7F6F2，非冷灰）+ 电蓝 #2F5EA7 accent", () => {
  const blue = STYLES["sl-electric-blue"];
  assert.equal(blue.css["--bg"], "#F7F6F2", "底色应固化为奶白 #F7F6F2（档案纸）");
  assert.equal(blue.css["--accent"], "#2F5EA7", "accent 应为电蓝 #2F5EA7");
  const hex = String(blue.css["--bg"]).replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
  assert.ok(r >= g && g >= b, `奶白档案纸应暖调 R≥G≥B（非冷蓝灰），实得 ${r},${g},${b}`);
});

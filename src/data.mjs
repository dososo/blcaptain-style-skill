export const FORMATS = {
  xhs: { className: "xhs", width: 1080, height: 1440, label: "Xiaohongshu 3:4" },
  square: { className: "square", width: 1080, height: 1080, label: "Square 1:1" },
  wide: { className: "wide", width: 2100, height: 900, label: "WeChat 21:9" },
  xcover: { className: "xcover", width: 1500, height: 600, label: "X 5:2 Cover" }
};

export const STYLE_ALIASES = {
  editorial: "editorial-ink-classic",
  swiss: "swiss-ikb",
  ink: "editorial-ink-classic",
  indigo: "editorial-indigo-porcelain",
  forest: "editorial-forest-ink",
  kraft: "editorial-kraft-paper",
  dune: "editorial-dune",
  midnight: "editorial-midnight-ink",
  ikb: "swiss-ikb",
  lemon: "swiss-lemon",
  green: "swiss-lemon-green",
  orange: "swiss-safety-orange",
  monolith: "monolith-editorial",
  glass: "glass-metro",
  blueprint: "blueprint-flow",
  data: "data-poster-max",
  chrome: "liquid-chrome",
  auto: "velocity-brochure",
  signal: "signal-burst",
  diary: "founder-diary",
  "sp-warm": "sp-warm-study",
  "sp-coastal": "sp-coastal-quiet",
  "sp-night": "sp-night-grain",
  "sp-hearth": "sp-hearth-table",
  "sp-mist": "sp-mist-field",
  "sl-mint": "sl-graphite-mint",
  "sl-coral": "sl-safety-coral",
  "sl-blue": "sl-electric-blue",
  "sl-lime": "sl-acid-lime",
  "sl-noir": "sl-signal-noir",
};


const EDITORIAL_DISPLAY = `"Songti SC", "STSong", "Noto Serif CJK SC", "Source Han Serif SC", Georgia, serif`;
const EDITORIAL_BODY = `"PingFang SC", "Noto Sans CJK SC", "Source Han Sans SC", system-ui, sans-serif`;
const SWISS_DISPLAY = `Inter, "Helvetica Neue", Arial, "PingFang SC", system-ui, sans-serif`;
const SWISS_BODY = `Inter, "Helvetica Neue", Arial, "PingFang SC", system-ui, sans-serif`;
const SP_DISPLAY = `"Source Serif 4", "Newsreader", "Source Han Serif SC", "Noto Serif CJK SC", "Songti SC", "STSong", Georgia, serif`;
const SP_BODY = `"IBM Plex Sans", "Source Han Sans SC", "Noto Sans CJK SC", "PingFang SC", "Noto Sans", system-ui, sans-serif`;
const SP_LABEL = `"DIN Condensed", "Gill Sans", "Helvetica Neue", "PingFang SC", system-ui, sans-serif`;
// 拉丁 editorial serif（英文副题 / quote lead，文学气质搭纸本，替没装的 Source Serif）
const SP_LATIN = `"Hoefler Text", "Iowan Old Style", "Charter", "Baskerville", Georgia, serif`;
// mono 微证据（来源 / 文件式微声部，替没装的 IBM Plex Mono）
const SP_MONO = `"Menlo", "SF Mono", "SFMono-Regular", ui-monospace, monospace`;

export const THEME_PRESETS = {

  "sp-warm-study": {
    family: "still-paper", name: "SP-02 Warm Study",
    css: {
      "--bg":"#F2EAD9", "--surface":"#F1EADA", "--fg":"#2B2622", "--muted":"#5A5147",
      "--accent":"#B5482F", "--accent-2":"#C9A184", "--subaccent":"#A88462", "--line":"#D8CBB0",
      "--radius":"22px", "--font-display": SP_DISPLAY, "--font-body": SP_BODY,
      "--gao":"#F2EAD9", "--ya":"#EBDEC0", "--ink":"#2B2622", "--dai":"#5A5147",
      "--tuo":"#A88462", "--li":"#6E4B3A", "--zhu":"#B5482F", "--zhu-lt":"#CE7A5C",
      "--panel":"#211E1A", "--cream":"#F4ECDD",
      "--sp-display": SP_DISPLAY, "--sp-body": SP_BODY, "--sp-label": SP_LABEL, "--sp-latin": SP_LATIN, "--sp-mono": SP_MONO,
      "--texture":"radial-gradient(ellipse 85% 60% at 18% 12%, rgba(208,186,150,.14), transparent 55%), radial-gradient(ellipse 70% 50% at 86% 84%, rgba(168,132,98,.09), transparent 55%), repeating-linear-gradient(0deg, rgba(43,38,34,.022) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(43,38,34,.015) 0 1px, transparent 1px 4px), linear-gradient(165deg,#F3ECDC,#EFE6D2 60%,#E9DEC8)"
    }
  },
  "sp-coastal-quiet": {
    family: "still-paper", name: "SP-03 Coastal Quiet",
    css: {
      "--bg":"#EFF2F0", "--surface":"#FAFBFA", "--fg":"#1D2622", "--muted":"#5E706A",
      "--accent":"#4A7D7E", "--accent-2":"#B5CCC8", "--subaccent":"#8AA09A", "--line":"#CDD8D4",
      "--radius":"22px", "--font-display": SP_DISPLAY, "--font-body": SP_BODY,
      "--gao":"#EFF2F0", "--ya":"#E3E8E5", "--ink":"#1D2622", "--dai":"#5E706A",
      "--tuo":"#8A8272", "--li":"#3A5854", "--zhu":"#4A7D7E", "--zhu-lt":"#6A9E9E",
      "--panel":"#1A2420", "--cream":"#F5F7F5",
      "--sp-display": SP_DISPLAY, "--sp-body": SP_BODY, "--sp-label": SP_LABEL, "--sp-latin": SP_LATIN, "--sp-mono": SP_MONO,
      "--sp-paper-bg":"radial-gradient(ellipse 85% 60% at 18% 12%, rgba(126,166,156,.12), transparent 55%), radial-gradient(ellipse 70% 50% at 86% 84%, rgba(90,130,120,.08), transparent 55%), repeating-linear-gradient(0deg, rgba(29,38,34,.018) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(29,38,34,.012) 0 1px, transparent 1px 4px), linear-gradient(165deg,#F0F3F0,#EBF0EC 60%,#E4EBE6)",
      "--texture":"radial-gradient(circle at 86% 14%, rgba(74,125,126,.14), transparent 28%), repeating-linear-gradient(0deg, rgba(29,38,34,.016) 0 1px, transparent 1px 5px)"
    }
  },
  "sp-night-grain": {
    family: "still-paper", name: "SP-04 Night Grain",
    css: { "--bg":"#141312", "--surface":"#1E1C1A", "--fg":"#F2EAD9", "--muted":"#B9AA94", "--accent":"#D0A164", "--accent-2":"#766245", "--subaccent":"#766245", "--line":"#3A332C", "--radius":"26px", "--font-display": EDITORIAL_DISPLAY, "--font-body": EDITORIAL_BODY,
      "--gao":"#1E1C1A", "--ya":"#262220", "--ink":"#F2EAD9", "--dai":"#B9AA94", "--tuo":"#6E5C45", "--li":"#C7A77E", "--zhu":"#D0A164", "--zhu-lt":"#E2BC85", "--panel":"#2A211A", "--cream":"#F2EAD9",
      "--sp-display": SP_DISPLAY, "--sp-body": SP_BODY, "--sp-label": SP_LABEL, "--sp-latin": SP_LATIN, "--sp-mono": SP_MONO,
      "--sp-paper-bg":"radial-gradient(ellipse 85% 60% at 18% 12%, rgba(208,161,100,.11), transparent 55%), radial-gradient(ellipse 70% 50% at 86% 84%, rgba(118,98,69,.13), transparent 55%), repeating-linear-gradient(0deg, rgba(255,250,240,.018) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(255,250,240,.012) 0 1px, transparent 1px 4px), linear-gradient(165deg,#181513,#141312 60%,#100E0C)",
      "--texture":"radial-gradient(circle at 78% 16%, rgba(208,161,100,.14), transparent 28%), radial-gradient(circle at 12% 86%, rgba(255,255,255,.05), transparent 30%)" }
  },
  "sp-hearth-table": {
    family: "still-paper", name: "SP-05 Hearth & Table",
    css: { "--bg":"#F8F0E2", "--surface":"#FFFDF8", "--fg":"#2C211A", "--muted":"#5E4B3B",
      "--accent":"#BC5234", "--accent-2":"#D9B08A", "--subaccent":"#B07A4C", "--line":"#E0CFB8", "--radius":"26px",
      "--font-display": SP_DISPLAY, "--font-body": SP_BODY,
      "--gao":"#F8F0E2", "--ya":"#F1E5D1", "--ink":"#2C211A", "--dai":"#5E4B3B",
      "--tuo":"#B07A4C", "--li":"#9A5232", "--zhu":"#BC5234", "--zhu-lt":"#D6845A",
      "--cream":"#FBF5EA", "--panel":"#2A1F17",
      "--sp-display": SP_DISPLAY, "--sp-body": SP_BODY, "--sp-label": SP_LABEL, "--sp-latin": SP_LATIN, "--sp-mono": SP_MONO,
      "--sp-paper-bg":"radial-gradient(ellipse 85% 60% at 18% 12%, rgba(214,160,110,.15), transparent 55%),radial-gradient(ellipse 70% 50% at 86% 84%, rgba(176,122,76,.10), transparent 55%),radial-gradient(ellipse 50% 40% at 60% 50%, rgba(248,240,226,.4), transparent 70%),repeating-linear-gradient(0deg,rgba(44,33,26,.022) 0 1px,transparent 1px 3px),repeating-linear-gradient(90deg,rgba(44,33,26,.015) 0 1px,transparent 1px 4px),linear-gradient(165deg,#F8EFDF,#F2E6D2 60%,#EBDCC4)",
      "--texture":"radial-gradient(circle at 20% 12%, rgba(188,82,52,.10), transparent 30%), repeating-linear-gradient(90deg, rgba(44,33,26,.018) 0 1px, transparent 1px 7px)" }
  },
  "sp-mist-field": {
    family: "still-paper", name: "SP-01 Mist Field",
    css: { "--bg":"#F2F3EC", "--surface":"#FFFFFA", "--fg":"#1D241D", "--muted":"#69705F", "--accent":"#6F805D", "--accent-2":"#C6D1B7", "--subaccent":"#C6D1B7", "--line":"#D8DDCF", "--radius":"26px", "--font-display": EDITORIAL_DISPLAY, "--font-body": EDITORIAL_BODY, "--texture":"radial-gradient(circle at 84% 12%, rgba(111,128,93,.16), transparent 30%), repeating-linear-gradient(0deg, rgba(29,36,29,.020) 0 1px, transparent 1px 6px)" }
  },
  "sl-graphite-mint": {
    family: "signal-ledger", name: "SL-02 Graphite Mint",
    css: { "--bg":"#F6F5F1", "--surface":"#FFFFFF", "--fg":"#171A1D", "--muted":"#6D7680", "--accent":"#4A7A74", "--accent-2":"#B8D4CF", "--subaccent":"#B8D4CF", "--line":"#DCE3E1", "--dark":"#141817", "--radius":"18px", "--font-display": SWISS_DISPLAY, "--font-body": SWISS_BODY, "--texture":"linear-gradient(90deg, rgba(74,122,116,.085), transparent 46%), linear-gradient(#DCE3E1 1px, transparent 1px), linear-gradient(90deg,#DCE3E1 1px, transparent 1px)" }
  },
  "sl-safety-coral": {
    family: "signal-ledger", name: "SL-03 Safety Coral",
    css: { "--bg":"#F7F4F0", "--surface":"#FFFFFF", "--fg":"#171515", "--muted":"#746B67", "--accent":"#E56A4B", "--accent-2":"#F3C7BA", "--subaccent":"#F3C7BA", "--line":"#E5D9D4", "--dark":"#161514", "--radius":"18px", "--font-display": SWISS_DISPLAY, "--font-body": SWISS_BODY, "--texture":"linear-gradient(90deg, rgba(229,106,75,.095), transparent 46%), linear-gradient(#E5D9D4 1px, transparent 1px), linear-gradient(90deg,#E5D9D4 1px, transparent 1px)" }
  },
  "sl-electric-blue": {
    family: "signal-ledger", name: "SL-01 Electric Blue",
    css: { "--bg":"#F7F6F2", "--surface":"#FFFFFF", "--fg":"#15181D", "--muted":"#6C7580", "--accent":"#2F5EA7", "--accent-2":"#AFC2DE", "--subaccent":"#AFC2DE", "--line":"#DCE3EE", "--dark":"#12161D", "--radius":"18px", "--font-display": SWISS_DISPLAY, "--font-body": SWISS_BODY, "--texture":"linear-gradient(90deg, rgba(47,94,167,.085), transparent 46%), linear-gradient(#DCE3EE 1px, transparent 1px), linear-gradient(90deg,#DCE3EE 1px, transparent 1px)" }
  },
  "sl-acid-lime": {
    family: "signal-ledger", name: "SL-04 Acid Lime",
    css: { "--bg":"#F5F7EF", "--surface":"#FFFFFF", "--fg":"#151715", "--muted":"#6E7369", "--accent":"#A6C833", "--accent-2":"#DCE9A8", "--subaccent":"#DCE9A8", "--line":"#DDE5CC", "--dark":"#151713", "--radius":"18px", "--font-display": SWISS_DISPLAY, "--font-body": SWISS_BODY, "--texture":"linear-gradient(90deg, rgba(166,200,51,.10), transparent 46%), linear-gradient(#DDE5CC 1px, transparent 1px), linear-gradient(90deg,#DDE5CC 1px, transparent 1px)" }
  },
  "sl-signal-noir": {
    family: "signal-ledger", name: "SL-05 Signal Noir",
    css: { "--bg":"#131110", "--surface":"#1C1916", "--fg":"#F2ECDF", "--muted":"#A29A8C", "--accent":"#C9A461", "--accent-2":"#5E7D72", "--subaccent":"#5E7D72", "--line":"#2E2A24", "--grid":"#221E18", "--dark":"#0C0A08", "--radius":"18px", "--font-display": SWISS_DISPLAY, "--font-body": SWISS_BODY, "--texture":"linear-gradient(90deg, rgba(201,164,97,.06), transparent 46%), linear-gradient(#221E18 1px, transparent 1px), linear-gradient(90deg,#221E18 1px, transparent 1px)" }
  },
  "editorial-ink-classic": {
    family: "editorial",
    name: "Ink Classic",
    css: {
      "--bg": "#f3f0e8", "--fg": "#0a0a0b", "--muted": "#68625a", "--accent": "#111111", "--accent-2": "#d8d2c6",
      "--surface": "rgba(255,255,255,.40)", "--line": "rgba(10,10,11,.22)", "--radius": "18px",
      "--font-display": EDITORIAL_DISPLAY, "--font-body": EDITORIAL_BODY,
      "--texture": "radial-gradient(circle at 18% 12%, rgba(10,10,11,.055), transparent 26%), repeating-linear-gradient(0deg, rgba(10,10,11,.025) 0 1px, transparent 1px 4px)"
    }
  },
  "editorial-indigo-porcelain": {
    family: "editorial",
    name: "Indigo Porcelain",
    css: {
      "--bg": "#f2f4f5", "--fg": "#0a1f3d", "--muted": "#5f6d78", "--accent": "#315d93", "--accent-2": "#d7e1ec",
      "--surface": "rgba(255,255,255,.46)", "--line": "rgba(10,31,61,.20)", "--radius": "18px",
      "--font-display": EDITORIAL_DISPLAY, "--font-body": EDITORIAL_BODY,
      "--texture": "radial-gradient(circle at 82% 10%, rgba(49,93,147,.12), transparent 30%), repeating-linear-gradient(0deg, rgba(10,31,61,.018) 0 1px, transparent 1px 5px)"
    }
  },
  "editorial-forest-ink": {
    family: "editorial",
    name: "Forest Ink",
    css: {
      "--bg": "#f5f1e8", "--fg": "#16251b", "--muted": "#5d665d", "--accent": "#2e6b4f", "--accent-2": "#d4dfd2",
      "--surface": "rgba(255,255,255,.42)", "--line": "rgba(22,37,27,.22)", "--radius": "18px",
      "--font-display": EDITORIAL_DISPLAY, "--font-body": EDITORIAL_BODY,
      "--texture": "radial-gradient(circle at 20% 86%, rgba(46,107,79,.12), transparent 28%)"
    }
  },
  "editorial-kraft-paper": {
    family: "editorial",
    name: "Kraft Paper",
    css: {
      "--bg": "#eedfc7", "--fg": "#2a1e13", "--muted": "#755f49", "--accent": "#9b5a2e", "--accent-2": "#d5b58f",
      "--surface": "rgba(255,245,225,.46)", "--line": "rgba(42,30,19,.24)", "--radius": "18px",
      "--font-display": EDITORIAL_DISPLAY, "--font-body": EDITORIAL_BODY,
      "--texture": "repeating-linear-gradient(0deg, rgba(42,30,19,.035) 0 1px, transparent 1px 6px)"
    }
  },
  "editorial-dune": {
    family: "editorial",
    name: "Dune",
    css: {
      "--bg": "#f0e6d2", "--fg": "#1f1a14", "--muted": "#6f6557", "--accent": "#8f7650", "--accent-2": "#d4c2a4",
      "--surface": "rgba(255,255,255,.35)", "--line": "rgba(31,26,20,.22)", "--radius": "22px",
      "--font-display": EDITORIAL_DISPLAY, "--font-body": EDITORIAL_BODY,
      "--texture": "radial-gradient(circle at 76% 18%, rgba(143,118,80,.16), transparent 30%)"
    }
  },
  "editorial-midnight-ink": {
    family: "editorial",
    name: "Midnight Ink",
    css: {
      "--bg": "#0e0d0c", "--fg": "#ece2cf", "--muted": "#9a8c75", "--accent": "#d4a04a", "--accent-2": "#3a2a14",
      "--surface": "rgba(255,255,255,.07)", "--line": "rgba(236,226,207,.22)", "--radius": "22px",
      "--font-display": EDITORIAL_DISPLAY, "--font-body": EDITORIAL_BODY,
      "--texture": "radial-gradient(80% 50% at 28% 16%, rgba(212,160,74,.12), transparent 64%), radial-gradient(70% 60% at 80% 86%, rgba(60,40,20,.20), transparent 72%)"
    }
  },
  "swiss-ikb": {
    family: "swiss",
    name: "IKB",
    css: {
      "--bg": "#f7f8fb", "--fg": "#050608", "--muted": "#5b6472", "--accent": "#002FA7", "--accent-2": "#111111",
      "--surface": "#ffffff", "--line": "#d8dee8", "--radius": "4px",
      "--font-display": SWISS_DISPLAY, "--font-body": SWISS_BODY,
      "--texture": "linear-gradient(90deg, rgba(0,47,167,.06), transparent 44%)"
    }
  },
  "swiss-lemon": {
    family: "swiss",
    name: "Lemon",
    css: {
      "--bg": "#fbf7e2", "--fg": "#121212", "--muted": "#5f5a3c", "--accent": "#FFD500", "--accent-2": "#111111",
      "--surface": "#ffffff", "--line": "#e7d98a", "--radius": "4px",
      "--font-display": SWISS_DISPLAY, "--font-body": SWISS_BODY,
      "--texture": "linear-gradient(90deg, rgba(255,213,0,.13), transparent 42%)"
    }
  },
  "swiss-lemon-green": {
    family: "swiss",
    name: "Lemon Green",
    css: {
      "--bg": "#f3fae7", "--fg": "#111511", "--muted": "#58664b", "--accent": "#C5E803", "--accent-2": "#111111",
      "--surface": "#ffffff", "--line": "#d9ecc1", "--radius": "4px",
      "--font-display": SWISS_DISPLAY, "--font-body": SWISS_BODY,
      "--texture": "linear-gradient(90deg, rgba(197,232,3,.18), transparent 40%)"
    }
  },
  "swiss-safety-orange": {
    family: "swiss",
    name: "Safety Orange",
    css: {
      "--bg": "#fff6ef", "--fg": "#17120e", "--muted": "#725b49", "--accent": "#FF6B35", "--accent-2": "#111111",
      "--surface": "#ffffff", "--line": "#f2c7ae", "--radius": "4px",
      "--font-display": SWISS_DISPLAY, "--font-body": SWISS_BODY,
      "--texture": "linear-gradient(90deg, rgba(255,107,53,.16), transparent 42%)"
    }
  }
};


export const STYLES = {
  ...THEME_PRESETS,
  "monolith-editorial": {
    family: "editorial",
    name: "Monolith Editorial",
    css: {
      "--bg": "#f5f1e8",
      "--fg": "#0d0d0d",
      "--muted": "#6f6a60",
      "--accent": "#a51f2b",
      "--accent-2": "#111111",
      "--surface": "rgba(255,255,255,.50)",
      "--line": "rgba(13,13,13,.18)",
      "--radius": "22px",
      "--font-display": SWISS_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "radial-gradient(circle at 20% 10%, rgba(165,31,43,.10), transparent 26%), linear-gradient(180deg, rgba(0,0,0,.035), transparent 40%)"
    }
  },
  "poster-manifesto": {
    family: "editorial",
    name: "Poster Manifesto",
    css: {
      "--bg": "#111111",
      "--fg": "#f7f2e8",
      "--muted": "#c7bca8",
      "--accent": "#ff3b30",
      "--accent-2": "#f4d35e",
      "--surface": "rgba(255,255,255,.08)",
      "--line": "rgba(255,255,255,.18)",
      "--radius": "8px",
      "--font-display": "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
      "--font-body": SWISS_BODY,
      "--texture": "linear-gradient(135deg, rgba(255,59,48,.20), transparent 34%), repeating-linear-gradient(-8deg, transparent 0 18px, rgba(255,255,255,.035) 18px 19px)"
    }
  },
  "neo-newspaper": {
    family: "editorial",
    name: "Neo Newspaper",
    css: {
      "--bg": "#f3eadc",
      "--fg": "#171512",
      "--muted": "#70685d",
      "--accent": "#7f1d1d",
      "--accent-2": "#1d3557",
      "--surface": "rgba(255,255,255,.36)",
      "--line": "rgba(23,21,18,.24)",
      "--radius": "0px",
      "--font-display": EDITORIAL_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "repeating-linear-gradient(0deg, rgba(0,0,0,.025) 0 1px, transparent 1px 5px)"
    }
  },
  "quiet-luxury": {
    family: "editorial",
    name: "Quiet Luxury",
    css: {
      "--bg": "#efe7dc",
      "--fg": "#201b18",
      "--muted": "#7b7066",
      "--accent": "#6d2638",
      "--accent-2": "#b49b72",
      "--surface": "rgba(255,255,255,.42)",
      "--line": "rgba(32,27,24,.13)",
      "--radius": "30px",
      "--font-display": EDITORIAL_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "radial-gradient(circle at 85% 10%, rgba(180,155,114,.24), transparent 25%)"
    }
  },
  "glass-metro": {
    family: "systems",
    name: "Glass Metro",
    css: {
      "--bg": "#eaf7f5",
      "--fg": "#0f172a",
      "--muted": "#526070",
      "--accent": "#22c7b8",
      "--accent-2": "#7c8cff",
      "--surface": "rgba(255,255,255,.60)",
      "--line": "rgba(255,255,255,.70)",
      "--radius": "30px",
      "--font-display": SWISS_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "radial-gradient(circle at 20% 15%, rgba(34,199,184,.35), transparent 30%), radial-gradient(circle at 80% 0%, rgba(124,140,255,.25), transparent 32%)"
    }
  },
  "blueprint-flow": {
    family: "systems",
    name: "Blueprint Flow",
    css: {
      "--bg": "#071832",
      "--fg": "#eaf7ff",
      "--muted": "#9ec7d8",
      "--accent": "#41d9ff",
      "--accent-2": "#76f7c8",
      "--surface": "rgba(12,42,78,.72)",
      "--line": "rgba(87,214,255,.32)",
      "--radius": "14px",
      "--font-display": SWISS_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "linear-gradient(rgba(65,217,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(65,217,255,.12) 1px, transparent 1px)"
    }
  },
  "os-dashboard": {
    family: "systems",
    name: "OS Dashboard",
    css: {
      "--bg": "#070b10",
      "--fg": "#eef7f2",
      "--muted": "#8da79a",
      "--accent": "#55f39b",
      "--accent-2": "#40b7ff",
      "--surface": "rgba(15,24,32,.86)",
      "--line": "rgba(85,243,155,.24)",
      "--radius": "20px",
      "--font-display": SWISS_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "radial-gradient(circle at 50% -10%, rgba(64,183,255,.18), transparent 35%)"
    }
  },
  "sticky-lab": {
    family: "systems",
    name: "Sticky Lab",
    css: {
      "--bg": "#f4ecd8",
      "--fg": "#242016",
      "--muted": "#746b59",
      "--accent": "#d93f2d",
      "--accent-2": "#e7ba43",
      "--surface": "rgba(255,250,235,.72)",
      "--line": "rgba(36,32,22,.18)",
      "--radius": "18px",
      "--font-display": SWISS_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "radial-gradient(circle at 10% 20%, rgba(231,186,67,.26), transparent 22%), repeating-linear-gradient(0deg, transparent 0 34px, rgba(36,32,22,.055) 35px)"
    }
  },
  "data-poster-max": {
    family: "data",
    name: "Data Poster Max",
    css: {
      "--bg": "#f8fafc",
      "--fg": "#0f172a",
      "--muted": "#64748b",
      "--accent": "#2563eb",
      "--accent-2": "#f97316",
      "--surface": "#ffffff",
      "--line": "#dbe3ef",
      "--radius": "22px",
      "--font-display": SWISS_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "linear-gradient(120deg, rgba(37,99,235,.08), transparent 38%)"
    }
  },
  "quant-signal": {
    family: "data",
    name: "Quant Signal",
    css: {
      "--bg": "#06111f",
      "--fg": "#edf7ff",
      "--muted": "#8fa7bd",
      "--accent": "#2dd4bf",
      "--accent-2": "#fb7185",
      "--surface": "rgba(9,25,44,.76)",
      "--line": "rgba(148,184,210,.20)",
      "--radius": "18px",
      "--font-display": SWISS_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "linear-gradient(90deg, rgba(45,212,191,.08), transparent 60%)"
    }
  },
  "research-atlas": {
    family: "data",
    name: "Research Atlas",
    css: {
      "--bg": "#ebe7da",
      "--fg": "#171717",
      "--muted": "#6d675b",
      "--accent": "#2f6f73",
      "--accent-2": "#9b4d2f",
      "--surface": "rgba(255,255,255,.42)",
      "--line": "rgba(23,23,23,.18)",
      "--radius": "16px",
      "--font-display": SWISS_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "radial-gradient(circle at 0% 0%, rgba(47,111,115,.14), transparent 30%)"
    }
  },
  "evidence-wall": {
    family: "data",
    name: "Evidence Wall",
    css: {
      "--bg": "#1d1713",
      "--fg": "#f7efe5",
      "--muted": "#b5a899",
      "--accent": "#e11d48",
      "--accent-2": "#f4c430",
      "--surface": "rgba(255,255,255,.08)",
      "--line": "rgba(255,255,255,.16)",
      "--radius": "10px",
      "--font-display": SWISS_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "repeating-linear-gradient(-12deg, rgba(255,255,255,.03) 0 1px, transparent 1px 11px)"
    }
  },
  "liquid-chrome": {
    family: "product",
    name: "Liquid Chrome",
    css: {
      "--bg": "#05070d",
      "--fg": "#f4f8ff",
      "--muted": "#aab7ca",
      "--accent": "#b8d8ff",
      "--accent-2": "#8b5cf6",
      "--surface": "rgba(255,255,255,.08)",
      "--line": "rgba(255,255,255,.16)",
      "--radius": "32px",
      "--font-display": SWISS_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "radial-gradient(circle at 18% 0%, rgba(184,216,255,.28), transparent 31%), radial-gradient(circle at 90% 25%, rgba(139,92,246,.20), transparent 33%)"
    }
  },
  "soft-futurism": {
    family: "product",
    name: "Soft Futurism",
    css: {
      "--bg": "#f7fbff",
      "--fg": "#162033",
      "--muted": "#667085",
      "--accent": "#79a7ff",
      "--accent-2": "#ffb58a",
      "--surface": "rgba(255,255,255,.75)",
      "--line": "rgba(22,32,51,.10)",
      "--radius": "32px",
      "--font-display": SWISS_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "radial-gradient(circle at 25% 20%, rgba(121,167,255,.24), transparent 28%), radial-gradient(circle at 85% 10%, rgba(255,181,138,.24), transparent 30%)"
    }
  },
  "design-system-minimal": {
    family: "product",
    name: "Design System Minimal",
    css: {
      "--bg": "#ffffff",
      "--fg": "#111827",
      "--muted": "#6b7280",
      "--accent": "#2563eb",
      "--accent-2": "#111827",
      "--surface": "#f8fafc",
      "--line": "#e5e7eb",
      "--radius": "20px",
      "--font-display": SWISS_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "linear-gradient(180deg, #fff, #f8fafc)"
    }
  },
  "velocity-brochure": {
    family: "product",
    name: "Velocity Brochure",
    css: {
      "--bg": "#090909",
      "--fg": "#f8f6ef",
      "--muted": "#c6beb0",
      "--accent": "#d8b46a",
      "--accent-2": "#8fa3ad",
      "--surface": "rgba(255,255,255,.075)",
      "--line": "rgba(216,180,106,.22)",
      "--radius": "28px",
      "--font-display": SWISS_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "radial-gradient(circle at 60% 10%, rgba(216,180,106,.16), transparent 34%), linear-gradient(180deg, rgba(255,255,255,.04), transparent 50%)"
    }
  },
  "signal-burst": {
    family: "social",
    name: "Signal Burst",
    css: {
      "--bg": "#050505",
      "--fg": "#f8f8f2",
      "--muted": "#b7b7aa",
      "--accent": "#ff2b2b",
      "--accent-2": "#b7ff00",
      "--surface": "rgba(255,255,255,.08)",
      "--line": "rgba(255,255,255,.18)",
      "--radius": "12px",
      "--font-display": "Inter, Impact, ui-sans-serif, system-ui, sans-serif",
      "--font-body": SWISS_BODY,
      "--texture": "linear-gradient(135deg, rgba(255,43,43,.24), transparent 30%), repeating-linear-gradient(0deg, transparent 0 9px, rgba(183,255,0,.06) 10px)"
    }
  },
  "kinetic-tabloid": {
    family: "social",
    name: "Kinetic Tabloid",
    css: {
      "--bg": "#f4f000",
      "--fg": "#080808",
      "--muted": "#3f3f18",
      "--accent": "#ff3355",
      "--accent-2": "#0047ff",
      "--surface": "rgba(255,255,255,.68)",
      "--line": "#080808",
      "--radius": "6px",
      "--font-display": "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
      "--font-body": SWISS_BODY,
      "--texture": "repeating-linear-gradient(-6deg, transparent 0 18px, rgba(0,0,0,.06) 18px 20px)"
    }
  },
  "meme-brutalism": {
    family: "social",
    name: "Meme Brutalism",
    css: {
      "--bg": "#ffffff",
      "--fg": "#000000",
      "--muted": "#333333",
      "--accent": "#ff0000",
      "--accent-2": "#0000ff",
      "--surface": "#ffffff",
      "--line": "#000000",
      "--radius": "0px",
      "--font-display": "Arial Black, Impact, sans-serif",
      "--font-body": "Arial, sans-serif",
      "--texture": "none"
    }
  },
  "alert-strip": {
    family: "social",
    name: "Alert Strip",
    css: {
      "--bg": "#111111",
      "--fg": "#fff6d6",
      "--muted": "#e6c96b",
      "--accent": "#ffd000",
      "--accent-2": "#ff3b30",
      "--surface": "rgba(255,208,0,.10)",
      "--line": "rgba(255,208,0,.34)",
      "--radius": "8px",
      "--font-display": SWISS_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "repeating-linear-gradient(45deg, rgba(255,208,0,.10) 0 12px, transparent 12px 24px)"
    }
  },
  "founder-diary": {
    family: "human",
    name: "Founder Diary",
    css: {
      "--bg": "#efe5d1",
      "--fg": "#231f18",
      "--muted": "#756b5b",
      "--accent": "#a33a2f",
      "--accent-2": "#3d6f64",
      "--surface": "rgba(255,250,240,.70)",
      "--line": "rgba(35,31,24,.17)",
      "--radius": "20px",
      "--font-display": EDITORIAL_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "radial-gradient(circle at 85% 10%, rgba(163,58,47,.15), transparent 26%), repeating-linear-gradient(0deg, rgba(35,31,24,.045) 0 1px, transparent 1px 32px)"
    }
  },
  "warm-notebook": {
    family: "human",
    name: "Warm Notebook",
    css: {
      "--bg": "#f5eedf",
      "--fg": "#222017",
      "--muted": "#736b5e",
      "--accent": "#6f8d68",
      "--accent-2": "#b47a3c",
      "--surface": "rgba(255,255,246,.72)",
      "--line": "rgba(34,32,23,.15)",
      "--radius": "24px",
      "--font-display": SWISS_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "radial-gradient(circle at 15% 10%, rgba(111,141,104,.20), transparent 28%)"
    }
  },
  "community-scrapbook": {
    family: "human",
    name: "Community Scrapbook",
    css: {
      "--bg": "#efe8d8",
      "--fg": "#1f1c17",
      "--muted": "#766f60",
      "--accent": "#db4b39",
      "--accent-2": "#3b82f6",
      "--surface": "rgba(255,255,255,.60)",
      "--line": "rgba(31,28,23,.18)",
      "--radius": "16px",
      "--font-display": SWISS_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "radial-gradient(circle at 88% 5%, rgba(59,130,246,.16), transparent 28%)"
    }
  },
  "future-lifestyle": {
    family: "human",
    name: "Future Lifestyle",
    css: {
      "--bg": "#f4f7fb",
      "--fg": "#161b26",
      "--muted": "#657083",
      "--accent": "#8b7cf6",
      "--accent-2": "#64d2c8",
      "--surface": "rgba(255,255,255,.66)",
      "--line": "rgba(22,27,38,.10)",
      "--radius": "32px",
      "--font-display": SWISS_DISPLAY,
      "--font-body": SWISS_BODY,
      "--texture": "radial-gradient(circle at 70% 15%, rgba(139,124,246,.20), transparent 30%), radial-gradient(circle at 20% 80%, rgba(100,210,200,.18), transparent 35%)"
    }
  }
};

export function normalizeStyle(style) {
  if (!style) return "monolith-editorial";
  const key = String(style).trim().toLowerCase();
  return STYLE_ALIASES[key] || key;
}

export function getStyle(style) {
  const id = normalizeStyle(style);
  return STYLES[id] ? { id, ...STYLES[id] } : { id: "monolith-editorial", ...STYLES["monolith-editorial"] };
}

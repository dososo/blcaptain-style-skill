export const BASE_CSS = `
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{background:#d9dde5;font-family:var(--font-body);display:flex;flex-direction:column;gap:40px;padding:40px}
.poster{position:relative;overflow:hidden;color:var(--fg);background:var(--bg);background-image:var(--texture);display:flex;flex-direction:column;gap:28px;padding:64px;border-radius:0;isolation:isolate}
.poster.xhs{width:1080px;height:1440px}
.poster.square{width:1080px;height:1080px}
.poster.wide{width:2100px;height:900px}
.poster.xcover{width:1500px;height:600px}
.poster::after{content:"";position:absolute;inset:0;pointer-events:none;border:1px solid rgba(255,255,255,.04);z-index:3}
.rendering .poster{box-shadow:none!important}
h1,h2,h3,p,figure,ul,li{margin:0}
h1{font-family:var(--font-display);font-size:104px;line-height:.92;letter-spacing:-.06em;text-wrap:balance}
h2{font-size:54px;line-height:1.02;letter-spacing:-.035em;text-wrap:balance}
h3{font-size:30px;line-height:1.08;letter-spacing:-.02em}
p{font-size:27px;line-height:1.42;color:var(--muted)}
.poster.wide h1{font-size:92px;max-width:15ch}.poster.xcover h1{font-size:76px;max-width:14ch}
.poster.wide p,.poster.xcover p{font-size:25px}
.kicker{display:inline-flex;align-items:center;align-self:flex-start;gap:10px;padding:9px 13px;border:1px solid var(--line);border-radius:999px;color:var(--accent);font-size:18px;letter-spacing:.08em;text-transform:uppercase;font-weight:800;background:color-mix(in srgb,var(--surface),transparent 14%)}
.eyebrow{font-size:18px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);font-weight:900}
.foot{margin-top:auto;font-size:18px;line-height:1.4;color:var(--muted);display:flex;justify-content:space-between;gap:20px;border-top:1px solid var(--line);padding-top:18px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:28px;backdrop-filter:blur(14px)}
.line{height:1px;background:var(--line);width:100%}
.accent{color:var(--accent)}
.muted{color:var(--muted)}
.big-number{font-size:190px;line-height:.82;letter-spacing:-.09em;font-weight:950;color:var(--accent)}
.poster.wide .big-number,.poster.xcover .big-number{font-size:132px}
.bullets{display:grid;gap:14px;padding:0;list-style:none}
.bullets li{font-size:25px;line-height:1.28;color:var(--fg);padding-left:28px;position:relative}
.bullets li::before{content:"";position:absolute;left:0;top:.48em;width:11px;height:11px;border-radius:999px;background:var(--accent)}
.media-frame{position:relative;overflow:hidden;border-radius:var(--radius);background:var(--surface);border:1px solid var(--line);min-height:280px}
.media-img{display:block;width:100%;height:100%;object-fit:cover;object-position:center 50%}
.placeholder{display:flex;align-items:center;justify-content:center;min-height:280px;color:var(--muted);background:linear-gradient(135deg,color-mix(in srgb,var(--accent),transparent 72%),color-mix(in srgb,var(--accent-2),transparent 84%))}
.placeholder span{font-size:18px;letter-spacing:.18em}
.chrome-orb{position:absolute;right:-180px;top:-180px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.78),rgba(184,216,255,.34) 26%,rgba(139,92,246,.14) 54%,transparent 72%);filter:blur(.2px);z-index:-1}
.signal-band{position:absolute;left:-20px;right:-20px;top:54px;height:88px;background:var(--accent);transform:rotate(-3deg);z-index:-1}
.grid-bg{position:absolute;inset:0;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:42px 42px;opacity:.35;z-index:-2}
.layout-statement-cover{justify-content:flex-start}.layout-statement-cover .kicker{margin-bottom:190px}.poster.wide.layout-statement-cover .kicker,.poster.xcover.layout-statement-cover .kicker{margin-bottom:70px}
.statement-main{display:grid;gap:34px;max-width:900px;position:relative}.statement-main::before{content:"";width:96px;height:10px;background:var(--accent);border-radius:999px;display:block;margin-bottom:8px}
.statement-main .subtitle{max-width:780px;font-size:36px;color:var(--fg);opacity:.78}
.poster.wide .statement-main,.poster.xcover .statement-main{max-width:1060px}
.layout-statement-cover .mark{position:absolute;right:64px;top:64px;font-size:15px;letter-spacing:.14em;color:var(--muted)}
.layout-essay-split{display:grid;grid-template-columns:1fr .9fr;gap:42px}
.poster.xhs.layout-essay-split,.poster.square.layout-essay-split{grid-template-columns:1fr;grid-template-rows:auto 1fr}
.essay-copy{display:flex;flex-direction:column;gap:24px}
.essay-copy h1{font-size:82px}
.poster.wide .essay-copy h1,.poster.xcover .essay-copy h1{font-size:64px}
.essay-media{min-height:440px}
.layout-neo-newspaper{display:grid;grid-template-columns:1.1fr .9fr .62fr;gap:34px}
.poster.xhs.layout-neo-newspaper,.poster.square.layout-neo-newspaper{grid-template-columns:1fr}
.news-head{border-bottom:2px solid var(--fg);padding-bottom:24px}
.news-col{display:grid;gap:18px}
.side-note{border-left:4px solid var(--accent);padding-left:18px}
.layout-quote-focus{justify-content:center;align-items:flex-start}
.quote-mark{font-family:Georgia,serif;font-size:150px;line-height:.7;color:var(--accent)}
.quote-text{font-size:74px;line-height:1.02;letter-spacing:-.045em;max-width:900px}
.poster.wide .quote-text,.poster.xcover .quote-text{font-size:56px;max-width:1200px}
.layout-three-lane-flow{justify-content:space-between}
.flow-head{display:grid;gap:16px;max-width:850px}
.flow-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:20px}
.poster.xhs .flow-grid,.poster.square .flow-grid{grid-template-columns:1fr}
.flow-card{min-height:210px;display:flex;flex-direction:column;gap:16px;justify-content:flex-start}
.flow-index{width:46px;height:46px;border-radius:50%;background:var(--accent);color:var(--bg);display:flex;align-items:center;justify-content:center;font-weight:950}
.layout-stack-map{justify-content:space-between}
.stack{display:grid;gap:16px}
.stack-layer{display:grid;grid-template-columns:110px 1fr;gap:20px;align-items:center}
.layer-no{font-size:42px;font-weight:950;color:var(--accent)}
.layout-dashboard-grid{display:grid;grid-template-rows:auto 1fr auto;gap:24px}
.dashboard{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.poster.wide .dashboard{grid-template-columns:repeat(4,1fr)}
.panel-value{font-size:54px;font-weight:950;color:var(--accent);letter-spacing:-.06em}
.layout-loop-circuit{justify-content:space-between}
.loop{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;position:relative}
.loop::after{content:"LOOP";position:absolute;inset:auto 38% 42% 38%;border:1px solid var(--line);border-radius:999px;text-align:center;padding:12px;color:var(--accent);font-weight:900}
.layout-big-number-poster{justify-content:space-between}
.number-row{display:grid;grid-template-columns:auto 1fr;gap:32px;align-items:end}
.poster.xhs .number-row,.poster.square .number-row{grid-template-columns:1fr}
.micro-chart{height:160px;display:flex;align-items:end;gap:12px}
.bar{flex:1;background:var(--accent);border-radius:10px 10px 0 0;opacity:.86}
.layout-trend-compare{display:grid;grid-template-rows:auto 1fr auto;gap:28px}
.compare{display:grid;grid-template-columns:1fr 1fr;gap:22px}
.poster.xhs .compare,.poster.square .compare{grid-template-columns:1fr}
.compare .card{display:flex;flex-direction:column;gap:16px}
.layout-research-atlas{display:grid;grid-template-rows:auto 1fr auto;gap:24px}
.atlas{display:grid;grid-template-columns:1.2fr .8fr;grid-template-rows:repeat(2,1fr);gap:16px}
.poster.xhs .atlas,.poster.square .atlas{grid-template-columns:1fr;grid-template-rows:auto}
.atlas .card:first-child{grid-row:span 2}
.layout-evidence-wall{display:grid;grid-template-rows:auto 1fr auto;gap:24px}
.evidence-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.poster.xhs .evidence-grid,.poster.square .evidence-grid{grid-template-columns:repeat(2,1fr)}
.evidence{min-height:210px;transform:rotate(var(--tilt,0deg))}
.evidence:nth-child(2n){--tilt:1.2deg}
.evidence:nth-child(3n){--tilt:-1.1deg}
.layout-product-hero{display:grid;grid-template-columns:.72fr 1.28fr;gap:42px;align-items:center;background-image:var(--texture),radial-gradient(circle at 72% 38%,rgba(216,180,106,.14),transparent 33%),var(--bg)}.poster.xhs.layout-product-hero,.poster.square.layout-product-hero{grid-template-columns:1fr;grid-template-rows:auto 1fr}
.product-visual{position:absolute;inset:0;z-index:0;background-size:cover;background-repeat:no-repeat;background-position:center}
.product-visual img{width:100%;height:100%;object-fit:cover}

.product-copy{position:relative;z-index:2;display:flex;flex-direction:column;gap:22px;max-width:760px}
.product-copy h1{color:var(--fg);text-shadow:0 10px 32px rgba(0,0,0,.20)}
.product-copy p{color:var(--muted)}
.product-shot{min-height:680px;box-shadow:0 30px 120px rgba(0,0,0,.36)}.poster.square .product-shot,.poster.xhs .product-shot{min-height:520px}
.layout-feature-strip{justify-content:space-between}
.feature-list{display:grid;gap:16px}
.feature-item{display:grid;grid-template-columns:72px 1fr;gap:18px;align-items:start}
.feature-dot{width:56px;height:56px;border-radius:18px;background:var(--accent);color:var(--bg);display:flex;align-items:center;justify-content:center;font-weight:950}
.layout-feature-matrix{display:grid;grid-template-rows:auto 1fr auto;gap:24px}
.matrix{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
.poster.wide .matrix{grid-template-columns:repeat(4,1fr)}
.matrix .card{min-height:170px;position:relative;overflow:hidden}.matrix .card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:8px;background:var(--accent);opacity:.86}.matrix .card::after{content:"";position:absolute;right:-38px;bottom:-38px;width:120px;height:120px;border-radius:50%;background:color-mix(in srgb,var(--accent),transparent 82%)}
.layout-product-storyline{justify-content:space-between}
.timeline{display:grid;gap:14px}
.timeline-row{display:grid;grid-template-columns:130px 1fr;gap:22px;align-items:start;border-top:1px solid var(--line);padding-top:16px}
.layout-alert-burst{justify-content:center}
.layout-alert-burst h1{font-size:126px;max-width:820px}
.poster.wide.layout-alert-burst h1,.poster.xcover.layout-alert-burst h1{font-size:86px;max-width:1100px}
.alert-tags{display:flex;flex-wrap:wrap;gap:12px}
.alert-tags span{background:var(--accent);color:var(--bg);padding:10px 14px;font-weight:950}
.layout-roundup-stack{justify-content:space-between}
.roundup{display:grid;gap:12px}
.round-row{display:grid;grid-template-columns:78px 1fr;gap:20px;align-items:center;border-bottom:1px solid var(--line);padding:16px 0}
.round-no{font-size:46px;font-weight:950;color:var(--accent)}
.layout-checklist-strip{justify-content:space-between}
.checks{display:grid;gap:18px}
.check{display:grid;grid-template-columns:48px 1fr;gap:16px;align-items:start}
.check-icon{width:40px;height:40px;border-radius:999px;border:2px solid var(--accent);display:flex;align-items:center;justify-content:center;color:var(--accent);font-weight:950}
.layout-meme-focus{justify-content:center;align-items:center;text-align:center}
.layout-meme-focus h1{font-size:120px;max-width:900px}
.layout-diary-scrapbook{display:grid;grid-template-rows:auto 1fr auto;gap:22px}
.scrap-grid{display:grid;grid-template-columns:1fr .78fr;gap:20px}
.poster.xhs .scrap-grid,.poster.square .scrap-grid{grid-template-columns:1fr}
.note{transform:rotate(-1deg)}
.photo-note{min-height:360px}
.layout-annotated-checklist{justify-content:space-between}
.annotation{font-size:20px;color:var(--accent);border-left:3px solid var(--accent);padding-left:14px;transform:rotate(-1deg)}
.layout-case-note{display:grid;grid-template-rows:auto 1fr auto;gap:22px}
.case-grid{display:grid;grid-template-columns:1fr .8fr;gap:20px}
.poster.xhs .case-grid,.poster.square .case-grid{grid-template-columns:1fr}

/* SP-MF S16 real-content body recipes */
.sp-mf-page{padding:72px 76px 60px;background:var(--bg);background-image:var(--texture);gap:0}
.sp-mf-page h1,.sp-mf-page h2,.sp-mf-page h3,.sp-mf-page p{letter-spacing:0}
.sp-mf-page h1{font-family:var(--font-display);font-size:76px;line-height:1.08;font-weight:680;max-width:780px;color:var(--fg)}
.sp-mf-page h3{font-size:28px;line-height:1.20;font-weight:620;color:var(--fg)}
.sp-mf-page p{font-size:23px;line-height:1.52;color:var(--muted)}
.sp-mf-page .foot{font-size:15px;letter-spacing:.04em}
.sp-mf-kicker{font-size:15px;line-height:1;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);font-weight:720}
.sp-mf-top{display:flex;justify-content:space-between;align-items:flex-start;gap:40px}
.sp-mf-folio{width:72px;height:72px;border:1px solid var(--line);border-radius:999px;display:flex;align-items:center;justify-content:center;color:var(--accent);font-size:20px;font-weight:680;flex:none}
.sp-mf-annotation{font-size:18px;line-height:1.42;color:var(--accent);border-left:3px solid var(--accent);padding-left:18px;max-width:760px}
.layout-sp-mf-cover-r08{justify-content:space-between}
.layout-sp-mf-cover-r08 h1{font-size:82px;line-height:1.05;max-width:760px;margin-top:28px}
.sp-mf-cover-lead{font-size:30px!important;line-height:1.42!important;max-width:760px;color:var(--fg)!important;margin-top:28px}
.sp-mf-cover-list{display:grid;gap:22px;margin-top:40px}
.sp-mf-cover-row{display:grid;grid-template-columns:64px 1fr;gap:24px;align-items:start;border-top:1px solid var(--line);padding-top:22px}
.sp-mf-cover-row span{font-size:18px;color:var(--accent);font-weight:720;letter-spacing:.08em}
.sp-mf-cover-row h3{font-size:30px}
.sp-mf-cover-row p{margin-top:8px;max-width:660px}
.layout-sp-mf-b01{justify-content:space-between}
.layout-sp-mf-b01 .sp-mf-note-main{margin-top:180px;display:grid;gap:34px;max-width:820px}
.layout-sp-mf-b01 h1{font-size:88px;max-width:760px}
.layout-sp-mf-b01 .sp-mf-note-main p{font-size:32px;line-height:1.55;color:var(--fg);max-width:760px}
.sp-mf-note-lines{display:grid;gap:14px;max-width:760px}
.sp-mf-note-line{border-top:1px solid var(--line);padding-top:16px;font-size:20px;line-height:1.46;color:var(--muted)}
.layout-sp-mf-b04{justify-content:space-between}
.layout-sp-mf-b04 h1{font-size:72px;margin-top:24px;max-width:760px}
.sp-mf-list-lead{font-size:27px!important;line-height:1.48!important;max-width:760px;color:var(--fg)!important;margin-top:26px}
.sp-mf-list{display:grid;gap:20px;margin-top:36px}
.sp-mf-list-row{display:grid;grid-template-columns:70px 1fr;gap:24px;align-items:start;border-top:1px solid var(--line);padding-top:20px;min-height:112px}
.sp-mf-list-row span{font-size:20px;color:var(--accent);font-weight:760;letter-spacing:.10em}
.sp-mf-list-row h3{font-size:30px}
.sp-mf-list-row p{margin-top:8px;max-width:680px}
.layout-sp-mf-b06{justify-content:space-between}
.sp-mf-quote-block{display:grid;gap:26px;margin-top:92px;max-width:820px}
.sp-mf-quote-mark{font-family:Georgia,serif;font-size:116px;line-height:.72;color:var(--accent)}
.layout-sp-mf-b06 h1{font-size:76px;line-height:1.12;max-width:810px}
.layout-sp-mf-b06 .sp-mf-quote-block p{font-size:29px;line-height:1.52;color:var(--fg);max-width:760px}
.sp-mf-formula-row{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;border-top:1px solid var(--line);padding-top:22px}
.sp-mf-formula-row>div{min-height:148px;background:color-mix(in srgb,var(--surface),transparent 24%);border:1px solid var(--line);padding:22px}
.sp-mf-formula-row h3{font-size:26px;color:var(--accent)}
.sp-mf-formula-row p{font-size:19px;margin-top:10px}
.layout-sp-mf-b08{justify-content:space-between}
.sp-mf-closing-main{display:grid;gap:26px;margin-top:90px;max-width:820px}
.layout-sp-mf-b08 h1{font-size:84px;line-height:1.08;max-width:780px}
.sp-mf-closing-main p{font-size:30px!important;line-height:1.52!important;color:var(--fg)!important;max-width:760px}
.sp-mf-action-list{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.sp-mf-action{border-top:1px solid var(--line);padding-top:18px;min-height:150px}
.sp-mf-action span{display:block;font-size:18px;letter-spacing:.12em;color:var(--accent);font-weight:760;margin-bottom:14px}
.sp-mf-action strong{display:block;font-size:25px;line-height:1.18;color:var(--fg);font-weight:640}
.sp-mf-action p{font-size:19px;margin-top:8px}
.sp-mf-v02{padding:64px 70px 54px;background:var(--bg);background-image:var(--texture);gap:0}
.sp-mf-v02 h1,.sp-mf-v02 h2,.sp-mf-v02 h3,.sp-mf-v02 p,.sp-mf-v02 li{letter-spacing:0}
.sp-mf-v02 h1{font-family:var(--font-display);font-size:72px;line-height:1.08;font-weight:680;max-width:820px;color:var(--fg)}
.sp-mf-v02 h2{font-size:42px;line-height:1.16;font-weight:650;color:var(--fg)}
.sp-mf-v02 h3{font-size:28px;line-height:1.22;font-weight:650;color:var(--fg)}
.sp-mf-v02 p{font-size:22px;line-height:1.46;color:var(--muted)}
.sp-mf-v02 .foot{font-size:14px;letter-spacing:.04em}
.sp-mf-v02-head{display:grid;grid-template-columns:1fr 68px;gap:26px;align-items:start}
.sp-mf-v02-kicker{font-size:14px;line-height:1;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);font-weight:760}
.sp-mf-v02-question{font-size:18px!important;line-height:1.42!important;max-width:660px;margin-top:16px;color:var(--muted)!important}
.sp-mf-v02-folio{width:64px;height:64px;border:1px solid var(--line);border-radius:999px;display:flex;align-items:center;justify-content:center;color:var(--accent);font-size:18px;font-weight:720}
.sp-mf-v02-title-block{display:grid;gap:20px;margin-top:72px;max-width:820px}
.sp-mf-v02-title-block.compact{margin-top:52px}
.sp-mf-v02-title-block>p{font-size:28px;line-height:1.42;color:var(--fg);max-width:760px}
.sp-mf-v02-note{font-size:18px;line-height:1.42;color:var(--accent);border-left:3px solid var(--accent);padding-left:18px;max-width:820px;margin-top:28px}
.sp-mf-v02-cover-main{display:grid;gap:28px;margin-top:130px;max-width:840px}
.sp-mf-v02-cover-main h1{font-size:84px;line-height:1.06}
.sp-mf-v02-cover-main p{font-size:30px;line-height:1.42;color:var(--fg);max-width:760px}
.sp-mf-v02-cover-flow{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:74px}
.sp-mf-v02-flow-node{min-height:150px;border-top:1px solid var(--line);padding-top:18px}
.sp-mf-v02-flow-node span,.sp-mf-v02-step span,.sp-mf-v02-action span,.sp-mf-v02-matrix-cell span{display:block;font-size:16px;letter-spacing:.12em;color:var(--accent);font-weight:780;margin-bottom:12px}
.sp-mf-v02-flow-node strong{display:block;font-size:23px;line-height:1.18;color:var(--fg);font-weight:660}
.sp-mf-v02-flow-node p{font-size:18px;margin-top:8px}
.sp-mf-v02-compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-top:54px}
.sp-mf-v02-compare-card{min-height:430px;border:1px solid var(--line);background:color-mix(in srgb,var(--surface),transparent 18%);padding:34px;display:flex;flex-direction:column;gap:18px}
.sp-mf-v02-compare-card.is-primary{background:color-mix(in srgb,var(--accent-2),var(--surface) 56%);border-color:color-mix(in srgb,var(--accent),var(--line) 62%)}
.sp-mf-v02-card-label{font-size:14px;letter-spacing:.12em;color:var(--accent);font-weight:780;text-transform:uppercase}
.sp-mf-v02-compare-card ul{margin:auto 0 0;padding:0;list-style:none;display:grid;gap:12px}
.sp-mf-v02-compare-card li{font-size:21px;line-height:1.28;color:var(--fg);border-top:1px solid var(--line);padding-top:12px}
.sp-mf-v02-ledger{display:grid;gap:0;margin-top:54px;border-top:1px solid var(--line)}
.sp-mf-v02-ledger-row{display:grid;grid-template-columns:62px 1fr 180px;gap:24px;align-items:start;border-bottom:1px solid var(--line);padding:22px 0;min-height:126px}
.sp-mf-v02-ledger-row>span{font-size:17px;letter-spacing:.12em;color:var(--accent);font-weight:760}
.sp-mf-v02-ledger-row p{font-size:20px;margin-top:7px;max-width:560px}
.sp-mf-v02-ledger-row strong{font-size:18px;line-height:1.34;color:var(--fg);font-weight:560}
.sp-mf-v02-net{position:relative;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:18px;margin-top:48px;min-height:610px}
.sp-mf-v02-net::before{content:"";position:absolute;left:12%;right:12%;top:50%;height:1px;background:var(--line)}
.sp-mf-v02-net::after{content:"";position:absolute;top:12%;bottom:12%;left:50%;width:1px;background:var(--line)}
.sp-mf-v02-net-group{position:relative;z-index:1;background:color-mix(in srgb,var(--surface),transparent 14%);border:1px solid var(--line);padding:30px;display:flex;flex-direction:column;gap:14px}
.sp-mf-v02-net-group.tone-3{grid-column:1 / -1;min-height:230px;background:color-mix(in srgb,var(--accent-2),var(--surface) 62%)}
.sp-mf-v02-tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:auto}
.sp-mf-v02-tags span{font-size:19px;line-height:1;border:1px solid var(--line);background:var(--surface);padding:10px 12px;color:var(--fg)}
.sp-mf-v02-vertical-flow{display:grid;gap:0;margin-top:42px;border-top:1px solid var(--line)}
.sp-mf-v02-step{display:grid;grid-template-columns:56px 1fr 150px;gap:22px;align-items:start;border-bottom:1px solid var(--line);padding:20px 0;min-height:116px}
.sp-mf-v02-step h3{font-size:28px}
.sp-mf-v02-step p{font-size:20px;margin-top:6px}
.sp-mf-v02-step strong{font-size:18px;line-height:1.30;color:var(--accent);font-weight:650}
.sp-mf-v02-matrix{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:46px}
.sp-mf-v02-matrix-cell{min-height:250px;border:1px solid var(--line);background:color-mix(in srgb,var(--surface),transparent 12%);padding:30px;display:flex;flex-direction:column}
.sp-mf-v02-matrix-cell p{font-size:21px;margin-top:auto;color:var(--muted)}
.sp-mf-v02-formula-hero{display:grid;gap:24px;margin-top:120px;max-width:820px}
.sp-mf-v02-formula-hero h1{font-size:82px}
.sp-mf-v02-formula-hero p{font-size:29px;line-height:1.44;color:var(--fg)}
.sp-mf-v02-formulas{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:74px}
.sp-mf-v02-formulas>div{min-height:190px;border-top:1px solid var(--line);padding-top:20px}
.sp-mf-v02-formulas strong{display:block;font-size:42px;line-height:1;color:var(--accent);font-weight:720}
.sp-mf-v02-formulas p{font-size:20px;margin-top:14px}
.sp-mf-v02-action-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:44px}
.sp-mf-v02-action{min-height:184px;border:1px solid var(--line);background:color-mix(in srgb,var(--surface),transparent 12%);padding:24px}
.sp-mf-v02-action h3{font-size:26px}
.sp-mf-v02-action p{font-size:20px;margin-top:8px}
.layout-lifestyle-story{padding:0}
.lifestyle-bg{position:absolute;inset:0;z-index:0;background-size:cover;background-repeat:no-repeat;background-position:center}
.lifestyle-bg img{width:100%;height:100%;object-fit:cover}
.lifestyle-panel{position:relative;z-index:2;margin:auto 64px 64px 64px;max-width:760px}
@media print{body{background:white;padding:0}.poster{break-after:page}}

.layout-screenshot-focus{display:grid;grid-template-rows:auto 1fr auto;gap:26px}
.screenshot-copy{display:grid;gap:14px;max-width:900px}
.frame-shot{background:linear-gradient(135deg,rgba(255,255,255,.86),rgba(255,255,255,.48));padding:42px;box-shadow:0 28px 90px rgba(0,0,0,.18);min-height:620px;display:flex;flex-direction:column}
.poster.wide .frame-shot,.poster.xcover .frame-shot{min-height:360px}
.frame-shot img{border-radius:18px;object-fit:contain;background:#fff;border:1px solid var(--line)}
.browser-bar{height:42px;display:flex;gap:9px;align-items:center;padding:0 0 18px 0}
.browser-bar span{width:13px;height:13px;border-radius:50%;background:var(--line)}
.device-phone{max-width:470px;margin-inline:auto;border-radius:44px;padding:54px 24px;background:#111;border:2px solid rgba(255,255,255,.2)}
.device-phone .browser-bar{display:none}
.device-phone img{border-radius:30px;border:0}


/* v0.5 maturity refinements */
.poster.xhs.layout-statement-cover h1{font-size:120px;max-width:7.8ch}
.poster.xhs.layout-statement-cover .bullets li{font-size:29px}
.poster.xhs.layout-statement-cover .foot{font-size:19px}
.poster[data-style="monolith-editorial"].layout-statement-cover{background-image:radial-gradient(circle at 86% 18%,rgba(165,31,43,.13),transparent 28%),linear-gradient(180deg,rgba(0,0,0,.035),transparent 42%),var(--texture)}
.poster[data-style="monolith-editorial"].layout-statement-cover::after{content:"";position:absolute;right:64px;top:170px;width:180px;height:180px;border:1px solid var(--line);border-radius:50%;opacity:.75}
.poster[data-style="quiet-luxury"].layout-quote-focus{background-image:radial-gradient(circle at 18% 78%,rgba(109,38,56,.18),transparent 26%),var(--texture)}
.poster[data-style="quiet-luxury"] .quote-text{color:var(--fg)}
.poster[data-style="design-system-minimal"] .card{border-color:#cbd5e1;box-shadow:0 18px 50px rgba(15,23,42,.06)}
.poster[data-style="design-system-minimal"] h1{color:#0f172a}
.poster[data-style="design-system-minimal"] p{color:#334155}
.layout-feature-matrix .matrix .card h3{font-size:32px}
.layout-feature-matrix .matrix .card p{color:#334155;font-size:25px}
.layout-feature-matrix .matrix .card{background:linear-gradient(180deg,#ffffff,#f4f7fb)}
.layout-evidence-wall .evidence{box-shadow:0 18px 40px rgba(0,0,0,.18)}
.layout-evidence-wall .evidence h3{color:var(--fg)}
.layout-big-number-poster .big-number{text-shadow:0 18px 50px color-mix(in srgb,var(--accent),transparent 72%)}
.layout-dashboard-grid .card{box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 24px 60px rgba(0,0,0,.18)}
.layout-diary-scrapbook .note.card{box-shadow:0 18px 50px rgba(35,31,24,.10)}


.poster.square h1{font-size:72px;line-height:.95;letter-spacing:-.055em}
.poster.square.layout-feature-strip h1,
.poster.square.layout-feature-matrix h1{font-size:64px;max-width:900px}
.poster.square .feature-list{gap:14px}.poster.square .matrix{gap:18px}.poster.square .matrix .card{min-height:190px;padding:32px}
.poster.square .feature-item{grid-template-columns:64px 1fr;padding:24px;min-height:120px}
.poster.square .feature-dot{width:52px;height:52px;border-radius:16px}
.poster.square h3{font-size:28px}
.poster.square p{font-size:24px}

.poster[data-style="monolith-editorial"] h1,
.poster[data-style="quiet-luxury"] h1{font-family:var(--font-display)}
.poster[data-style="signal-burst"] h1,
.poster[data-style="kinetic-tabloid"] h1{letter-spacing:-.07em;text-transform:none}
.poster[data-style="blueprint-flow"] .card{box-shadow:inset 0 0 0 1px rgba(65,217,255,.10)}
.poster[data-style="liquid-chrome"] .card,
.poster[data-style="velocity-brochure"] .card{box-shadow:0 24px 80px rgba(0,0,0,.24)}
.layout-statement-cover::before{content:"";position:absolute;left:64px;right:64px;top:132px;height:1px;background:var(--line)}
.layout-three-lane-flow::before{content:"";position:absolute;right:72px;top:72px;width:180px;height:180px;border-radius:50%;border:1px solid var(--line);opacity:.52}
.layout-big-number-poster::before{content:"";position:absolute;right:60px;top:60px;width:240px;height:240px;border:1px solid var(--line);border-radius:28px;transform:rotate(8deg);opacity:.55}
.frame-shot{padding:18px;background:linear-gradient(180deg,rgba(255,255,255,.68),rgba(255,255,255,.34));border:1px solid var(--line);border-radius:28px;box-shadow:0 28px 70px rgba(0,0,0,.18)}
.device-browser{overflow:hidden;border-radius:24px;border:1px solid var(--line);background:var(--surface)}
.browser-bar{height:42px;display:flex;gap:8px;align-items:center;padding:0 16px;border-bottom:1px solid var(--line)}
.browser-bar span{width:10px;height:10px;border-radius:50%;background:var(--accent);opacity:.8}
.device-phone{border-radius:42px;border:8px solid color-mix(in srgb,var(--fg),transparent 72%);overflow:hidden;background:#111}
.layout-screenshot-focus{display:grid;grid-template-columns:.78fr 1.22fr;gap:36px;align-items:center}
.poster.xhs.layout-screenshot-focus,.poster.square.layout-screenshot-focus{grid-template-columns:1fr;grid-template-rows:auto 1fr auto}
.screenshot-copy{display:flex;flex-direction:column;gap:22px}
.screenshot-copy h1{font-size:76px}
.screenshot-stage{height:100%;min-height:520px}
.layout-wechat-cover-pair{display:grid;grid-template-columns:1fr 420px;gap:28px;align-items:stretch}
.cover-pair-main{display:flex;flex-direction:column;justify-content:center;gap:22px}
.cover-pair-mini{border:1px solid var(--line);border-radius:var(--radius);background:var(--surface);padding:32px;display:flex;flex-direction:column;justify-content:center}


/* v0.6 Xiaohongshu real-feed patterns */
.layout-xhs-text-bomb{padding:0;background:#000;justify-content:flex-end}
.xhs-bg{position:absolute;inset:0;margin:0;z-index:0}
.xhs-bg img{width:100%;height:100%;object-fit:cover;display:block}
.xhs-scrim{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(0,0,0,.18) 0%,rgba(0,0,0,.05) 35%,rgba(0,0,0,.48) 100%)}
.xhs-copy{position:relative;z-index:2;padding:72px 58px 82px;display:flex;flex-direction:column;gap:18px}
.xhs-copy h1{font-size:118px;line-height:.9;letter-spacing:-.07em;color:#fff;text-shadow:0 5px 0 #000,0 0 24px rgba(0,0,0,.72);-webkit-text-stroke:2px #000}
.xhs-copy p{font-size:34px;line-height:1.2;color:#fff;font-weight:900;text-shadow:0 3px 0 #000}
.xhs-badge{align-self:flex-start;background:#ffe100;color:#080808;border:5px solid #080808;box-shadow:6px 6px 0 #080808;padding:10px 18px;font-size:34px;font-weight:1000;transform:rotate(-2deg)}
.xhs-sticker{position:absolute;z-index:3;right:42px;top:44px;background:#ff2b2b;color:#fff;border:5px solid #fff;border-radius:20px;padding:12px 18px;font-size:32px;font-weight:1000;box-shadow:0 8px 0 rgba(0,0,0,.34);transform:rotate(3deg)}
.layout-xhs-photo-proof{padding:0;background:#111}
.xhs-photo{position:absolute;inset:0;margin:0}
.xhs-photo img{width:100%;height:100%;object-fit:cover;display:block}
.xhs-photo-caption{position:absolute;left:48px;right:48px;bottom:48px;background:rgba(255,255,255,.86);border:1px solid rgba(255,255,255,.65);border-radius:34px;padding:34px;backdrop-filter:blur(14px);box-shadow:0 24px 90px rgba(0,0,0,.28)}
.xhs-photo-caption h1{font-size:74px;line-height:.95;color:#111827}
.xhs-photo-caption p{font-size:28px;color:#374151}
.layout-xhs-hook-list{background:#fff7ed;background-image:radial-gradient(circle at 88% 8%,rgba(255,43,43,.20),transparent 24%),radial-gradient(circle at 8% 94%,rgba(255,225,0,.28),transparent 28%);justify-content:space-between}
.xhs-topline{display:grid;gap:18px}
.xhs-topline h1{font-size:96px;max-width:8.5ch}
.xhs-hook-grid{display:grid;gap:18px}
.xhs-hook-card{position:relative;background:#fff;border:4px solid #111827;border-radius:26px;padding:26px 28px 26px 96px;box-shadow:8px 8px 0 #111827}
.xhs-hook-no{position:absolute;left:24px;top:26px;width:48px;height:48px;border-radius:14px;background:#ff2b2b;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:1000}
.xhs-hook-card h3{font-size:34px;line-height:1.05}
.xhs-hook-card p{font-size:24px;color:#374151}


/* v1 Core 4 production layouts */
.sp-eyebrow,.sl-eyebrow{font-size:16px;letter-spacing:.15em;text-transform:uppercase;font-weight:760;color:var(--accent)}
.sp-meta,.sl-token{font-size:15px;letter-spacing:.08em;color:var(--muted);border:1px solid var(--line);padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.62)}
.layout-sp-c01,.layout-sp-c02{background:var(--bg);background-image:var(--texture);color:var(--fg);font-family:var(--font-body)}
.layout-sp-c01{display:block;padding:0;position:relative;background:radial-gradient(circle at 82% 10%, rgba(122,133,108,.13), transparent 24%),radial-gradient(circle at 16% 88%, rgba(255,255,255,.38), transparent 22%),repeating-linear-gradient(0deg, rgba(32,38,32,.018) 0 1px, transparent 1px 8px),repeating-linear-gradient(90deg, rgba(255,255,255,.04) 0 2px, transparent 2px 12px),linear-gradient(180deg, rgba(255,255,255,.14), rgba(255,255,255,0) 26%),var(--bg)}
.zone{position:absolute;overflow:hidden}
.meta-zone{left:64px;top:58px;width:952px;height:42px;display:grid;grid-template-columns:auto 1fr auto;gap:22px;align-items:start}
.meta-brand{font-size:13px;line-height:1.42;letter-spacing:.13em;text-transform:uppercase;color:var(--fg);font-weight:620}
.meta-issue{font-size:13px;line-height:1.40;text-align:right;letter-spacing:.07em;color:var(--muted)}
.title-zone{left:64px;top:144px;width:770px;height:168px}
.title-zone h1{margin:0;font-family:var(--font-display);font-size:73px;line-height:1.13;letter-spacing:-.023em;font-weight:670;color:var(--fg)}
.lead-zone{left:64px;top:340px;width:720px;height:60px}
.lead-zone p{margin:0;font-size:22px;line-height:1.58;color:var(--muted)}
.details-zone{left:64px;top:414px;width:952px;height:34px;display:flex;align-items:center;gap:22px;color:var(--muted);font-size:14px;letter-spacing:.07em}
.details-zone .dot{width:7px;height:7px;border-radius:50%;background:var(--accent);flex:none}
.image-zone{left:64px;top:476px;width:952px;height:690px;border-radius:28px;overflow:hidden;border:1px solid var(--line);background:#e6e7dd;box-shadow:0 18px 42px rgba(58,62,54,.065)}
.image-zone img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.90) contrast(1.00) brightness(1.015)}
.image-zone::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg, rgba(255,255,255,.055), transparent 58%, rgba(0,0,0,.035)),radial-gradient(circle at 70% 10%, rgba(255,255,255,.06), transparent 30%),repeating-linear-gradient(0deg, rgba(255,255,255,.025) 0 1px, transparent 1px 5px)}
.bottom-note-zone{left:64px;top:1208px;width:952px;height:94px;display:grid;grid-template-columns:1fr 260px;gap:32px;align-items:start;padding-top:6px}
.note-copy{display:grid;grid-template-columns:3px 1fr;column-gap:20px;align-items:start}
.note-copy::before{content:"";display:block;width:3px;height:58px;border-radius:99px;background:var(--accent);opacity:.70;margin-top:3px}
.note-title{font-size:19px;color:var(--fg);font-weight:560;line-height:1.42;margin:0 0 7px}
.note-body{font-size:16px;color:var(--muted);line-height:1.48;margin:0}
.source{font-size:14px;line-height:1.50;text-align:right;color:var(--muted);letter-spacing:.03em;padding-top:4px}
.footer-zone{left:64px;top:1348px;width:952px;height:46px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;border-top:1px solid var(--line);color:var(--muted);font-size:14px;letter-spacing:.085em;text-transform:uppercase}
.footer-zone span:nth-child(2){text-align:center}.footer-zone span:nth-child(3){text-align:right}
.layout-sp-c02{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr auto;gap:34px;padding:64px 66px}
.sp-c02-copy{display:flex;flex-direction:column;gap:24px;min-height:0}
.sp-c02-copy h1{font-family:var(--font-display);font-size:74px;line-height:1.02;letter-spacing:-.028em;font-weight:720;max-width:7.4ch;color:var(--fg)}
.sp-c02-copy .sp-body{font-size:27px;line-height:1.48;max-width:480px;color:var(--muted)}
.sp-c02-copy blockquote{font-family:var(--font-display);font-size:34px;line-height:1.16;letter-spacing:-.02em;color:var(--fg);margin:auto 0 0}
.sp-small-note{font-size:16px;letter-spacing:.09em;color:var(--muted)}
.sp-c02-image{border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;min-height:0;background:var(--surface);box-shadow:0 22px 65px rgba(74,51,35,.10)}
.layout-sp-c02 .foot{grid-column:1 / -1}

.layout-sl-c01,.layout-sl-c02{background:var(--bg);background-image:var(--texture);background-size:auto,72px 72px,72px 72px;color:var(--fg);font-family:var(--font-body)}
.layout-sl-c01,.layout-sl-c02{display:grid;grid-template-rows:auto auto 1fr auto;gap:26px;padding:62px}
.sl-top{display:flex;justify-content:space-between;align-items:center;gap:24px}
.sl-hero{display:grid;gap:20px}
.sl-hero h1{font-family:var(--font-display);font-size:90px;line-height:.95;letter-spacing:-.054em;font-weight:560;max-width:8.6ch;color:var(--fg)}
.sl-hero p{font-size:25px;line-height:1.36;max-width:700px;color:var(--muted)}
.sl-flow{background:rgba(255,255,255,.82);border:1px solid var(--line);border-radius:22px;padding:34px;display:grid;grid-template-rows:1fr auto;gap:24px;box-shadow:0 28px 80px rgba(20,35,70,.10)}
.sl-nodes{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:18px;align-items:center}
.sl-nodes::before{content:"";position:absolute;left:12%;right:12%;top:50%;height:3px;background:var(--accent);opacity:.70}
.sl-node{position:relative;background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:24px;min-height:185px;box-shadow:0 16px 45px rgba(20,35,70,.08)}
.sl-node-index{font-family:var(--font-body);font-size:18px;color:var(--accent);font-weight:800}
.sl-node h3{font-size:30px;line-height:1.05;letter-spacing:-.03em;margin:18px 0 12px;font-weight:580;color:var(--fg)}
.sl-node p{font-size:21px;line-height:1.34;color:var(--muted)}
.sl-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.sl-metric{background:rgba(255,255,255,.72);border:1px solid var(--line);border-radius:12px;padding:18px}
.sl-metric strong{display:block;font-size:40px;line-height:1;color:var(--accent);letter-spacing:-.05em}
.sl-metric span{display:block;margin-top:8px;font-size:17px;color:var(--muted)}
.sl-proof-grid{display:grid;grid-template-columns:1fr 300px;gap:24px;min-height:0}
.sl-shot{border:1px solid var(--line);background:var(--surface);border-radius:22px;padding:20px;box-shadow:0 28px 90px rgba(20,35,70,.14);min-height:0}
.sl-shot .browser-bar{height:36px}
.sl-shot img{border-radius:15px;overflow:hidden}
.sl-callouts{display:grid;grid-template-rows:auto auto 1fr;gap:16px}
.sl-callout{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:24px}
.sl-callout-index{font-size:15px;letter-spacing:.12em;color:var(--accent);font-weight:800}
.sl-callout h3{font-size:30px;line-height:1.05;letter-spacing:-.03em;margin:12px 0 10px;font-weight:580;color:var(--fg)}
.sl-callout p{font-size:21px;line-height:1.35;color:var(--muted)}
.sl-proof-note{background:var(--dark,#111);color:#eaf8ff;border:1px solid var(--accent);border-radius:14px;padding:24px;display:flex;flex-direction:column;justify-content:flex-end}
.sl-proof-note span{font-size:14px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
.sl-proof-note strong{font-size:46px;line-height:.98;margin-top:16px;color:var(--accent)}
/* ============================================================
   Signal Proof — 信号账本（第二视觉语言，路线 B）
   SL 封面 SL-01 电蓝：账本网格 + 大黑体标题 + 等宽数字右对齐 ledger 行 + 标尺线/编号 + 电蓝 flat marker。
   反 PPT/反 AI：哑面、无圆角浮卡、无柔投影、近单色 accent≤10%、数据诚信。中文黑体(vs Still Paper 宋体)。
   ============================================================ */
.sl-cover{position:relative;background:var(--bg);color:var(--fg);font-family:var(--font-body);overflow:hidden;display:block;padding:0;isolation:isolate}
.sl-cover .sl-grid{position:absolute;inset:0;pointer-events:none;z-index:0;
  background-image:linear-gradient(var(--grid,#E7EDF5) 1px,transparent 1px),linear-gradient(90deg,var(--grid,#E7EDF5) 1px,transparent 1px);
  background-size:72px 72px;opacity:.7;-webkit-mask-image:linear-gradient(180deg,transparent,#000 13%,#000 87%,transparent)}
.sl-cover .sl-head{position:absolute;left:74px;right:74px;top:78px;display:flex;justify-content:space-between;align-items:center;z-index:2}
.sl-cover .sl-eyebrow{display:flex;align-items:center;gap:14px;font-size:18px;letter-spacing:.2em;text-transform:uppercase;font-weight:700;color:var(--fg)}
.sl-cover .sl-mk{width:36px;height:14px;background:var(--accent)}
.sl-cover .sl-board{color:var(--muted);font-weight:600;letter-spacing:.12em}
.sl-cover .sl-token{font-family:Menlo,"SF Mono",monospace;font-size:15px;letter-spacing:.08em;color:var(--fg);border:1.5px solid var(--fg);border-radius:0;background:none;padding:7px 14px;font-variant-numeric:tabular-nums}
.sl-cover .sl-rule{position:absolute;left:74px;right:74px;top:140px;height:2px;background:var(--fg);z-index:2}
.sl-cover .sl-title{position:absolute;left:72px;right:74px;top:206px;z-index:2;
  font-family:var(--font-display);font-size:96px;line-height:1.0;letter-spacing:-.035em;font-weight:800;color:var(--fg)}
.sl-cover .sl-title .em{color:var(--accent)}
.sl-cover .sl-lead{position:absolute;left:76px;width:648px;top:520px;z-index:2;font-size:27px;line-height:1.52;color:var(--muted)}
.sl-cover .sl-ledger{position:absolute;left:74px;right:74px;bottom:150px;z-index:2}
.sl-cover .sl-row{display:grid;grid-template-columns:54px 1fr auto;align-items:baseline;column-gap:20px;padding:24px 0;border-top:1px solid var(--line)}
.sl-cover .sl-row:last-child{border-bottom:1px solid var(--line)}
.sl-cover .sl-rn{font-family:Menlo,"SF Mono",monospace;font-size:18px;color:var(--accent);font-weight:700;font-variant-numeric:tabular-nums}
.sl-cover .sl-rlabel{font-size:31px;font-weight:600;color:var(--fg);letter-spacing:-.01em}
.sl-cover .sl-rval{font-family:Menlo,"SF Mono",monospace;font-size:42px;font-weight:700;color:var(--fg);font-variant-numeric:tabular-nums;letter-spacing:-.02em}
.sl-cover .sl-foot{position:absolute;left:74px;right:74px;bottom:70px;display:flex;justify-content:space-between;align-items:center;z-index:2;
  font-family:Menlo,"SF Mono",monospace;font-size:14px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.sl-cover .sl-foot-id{color:var(--fg);font-weight:700}

/* SL-03 珊瑚 hero 大指标（KPI/复盘）：巨数 fg 立骨 + coral delta 点睛 + 支撑 stat 行 */
.layout-sl-cover-metric .sl-mtitle{position:absolute;left:74px;right:74px;top:198px;z-index:2;font-family:var(--font-display);font-size:40px;font-weight:700;letter-spacing:-.01em;color:var(--fg)}
.layout-sl-cover-metric .sl-metric-hero{position:absolute;left:70px;right:74px;top:316px;z-index:2}
.layout-sl-cover-metric .sl-bignum{font-family:var(--font-display);font-size:300px;line-height:.8;font-weight:800;letter-spacing:-.05em;color:var(--fg);display:flex;align-items:flex-start;gap:16px}
.layout-sl-cover-metric .sl-delta{font-family:Menlo,"SF Mono",monospace;font-size:54px;font-weight:700;color:var(--accent);letter-spacing:-.02em;margin-top:22px}
.layout-sl-cover-metric .sl-mlabel{font-size:34px;font-weight:600;color:var(--muted);margin-top:14px}

/* SL-04 青柠 判定·清单（对比/决策）：sharp checklist ✓/— + verdict 块 */
.layout-sl-cover-verdict .sl-checks{position:absolute;left:74px;right:74px;top:470px;z-index:2}
.layout-sl-cover-verdict .sl-check{display:flex;align-items:center;gap:22px;padding:22px 0;border-top:1px solid var(--line);font-size:33px;font-weight:600;color:var(--fg)}
.layout-sl-cover-verdict .sl-check:last-child{border-bottom:1px solid var(--line)}
.layout-sl-cover-verdict .sl-ck{width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;flex:none}
.layout-sl-cover-verdict .sl-ck.yes{background:var(--accent);color:#fff}
.layout-sl-cover-verdict .sl-ck.no{border:1.5px solid var(--line);color:var(--muted)}
.layout-sl-cover-verdict .sl-verdict{position:absolute;left:74px;right:74px;bottom:150px;z-index:2;display:flex;align-items:baseline;gap:20px;border-left:6px solid var(--accent);padding-left:24px}
.layout-sl-cover-verdict .sl-vlabel{font-family:Menlo,"SF Mono",monospace;font-size:16px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.layout-sl-cover-verdict .sl-vtext{font-family:var(--font-display);font-size:54px;font-weight:800;color:var(--fg);letter-spacing:-.02em}

/* SL body 截图证据卡：终端/浏览器框（哑面 sharp，非 mac 圆点用方块）+ 可读截图 + 编号证据批注。反 PPT：无圆角浮卡/无柔投影。 */
.layout-sl-body-shot .sl-mtitle{position:absolute;left:74px;right:74px;top:196px;z-index:2;font-family:var(--font-display);font-size:46px;font-weight:700;letter-spacing:-.015em;line-height:1.12;color:var(--fg)}
.layout-sl-body-shot .sl-shotframe{position:absolute;left:74px;right:74px;top:322px;height:648px;z-index:2;margin:0;border:1.5px solid var(--fg);background:var(--surface);display:flex;flex-direction:column;overflow:hidden}
.layout-sl-body-shot .sl-shotbar{height:48px;flex:none;border-bottom:1.5px solid var(--fg);display:flex;align-items:center;gap:9px;padding:0 18px;background:var(--bg)}
.layout-sl-body-shot .sl-shotbar .sl-dot{width:11px;height:11px;background:var(--fg);opacity:.32}
.layout-sl-body-shot .sl-shotpath{margin-left:14px;font-family:Menlo,"SF Mono",monospace;font-size:16px;letter-spacing:.03em;color:var(--muted)}
.layout-sl-body-shot .sl-shotimg{flex:1;overflow:hidden;position:relative}
.layout-sl-body-shot .sl-shotimg img{width:100%;height:100%;object-fit:cover;object-position:top center;filter:contrast(1.05) saturate(.88)}
.layout-sl-body-shot .sl-notes{position:absolute;left:74px;right:74px;bottom:148px;z-index:2}
.layout-sl-body-shot .sl-note{display:grid;grid-template-columns:54px 1fr;align-items:baseline;column-gap:18px;padding:18px 0;border-top:1px solid var(--line)}
.layout-sl-body-shot .sl-note:last-child{border-bottom:1px solid var(--line)}
.layout-sl-body-shot .sl-note-i{font-family:Menlo,"SF Mono",monospace;font-size:18px;color:var(--accent);font-weight:700}
.layout-sl-body-shot .sl-note-t{font-size:27px;line-height:1.4;color:var(--fg);font-weight:500}

/* SL body 数据网格卡：2×2 KPI 单元格，发丝线分隔(非浮卡)，大 mono 数值 + delta。 */
.layout-sl-body-grid .sl-mtitle{position:absolute;left:74px;right:74px;top:196px;z-index:2;font-family:var(--font-display);font-size:46px;font-weight:700;letter-spacing:-.015em;line-height:1.12;color:var(--fg)}
.layout-sl-body-grid .sl-cells{position:absolute;left:74px;right:74px;top:344px;bottom:150px;z-index:2;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr}
.layout-sl-body-grid .sl-cell{padding:40px 36px;border-top:1px solid var(--line);display:flex;flex-direction:column;justify-content:center}
.layout-sl-body-grid .sl-cell:nth-child(odd){border-right:1px solid var(--line)}
.layout-sl-body-grid .sl-cellv{font-family:Menlo,"SF Mono",monospace;font-size:84px;line-height:.92;font-weight:700;letter-spacing:-.04em;color:var(--fg);font-variant-numeric:tabular-nums}
.layout-sl-body-grid .sl-celld{font-family:Menlo,"SF Mono",monospace;font-size:28px;font-weight:700;color:var(--accent);margin-left:12px;letter-spacing:-.02em}
.layout-sl-body-grid .sl-celll{font-size:28px;font-weight:600;color:var(--muted);margin-top:18px}

/* SL body 编号工作流卡：竖脊柱 + accent 方块编号 + 步骤。哑面 sharp、无浮卡。 */
/* 栏目标题（小，非复读封面大标题）+ 步骤铺满 + 巨 mono 编号当视觉锚（瑞士数据美学：字阶极差 + 网格发丝线 + accent 点睛） */
.layout-sl-body-flow .sl-mtitle{position:absolute;left:74px;right:74px;top:176px;z-index:2;font-family:var(--font-display);font-size:38px;font-weight:700;letter-spacing:-.01em;line-height:1.14;color:var(--fg)}
.layout-sl-body-flow .sl-flowsteps{position:absolute;left:74px;right:74px;top:286px;bottom:116px;z-index:2;display:flex;flex-direction:column;justify-content:space-between}
.layout-sl-body-flow .sl-step{position:relative;display:grid;grid-template-columns:150px 1fr;column-gap:36px;align-items:baseline;border-top:1.5px solid var(--line);padding-top:24px}
.layout-sl-body-flow .sl-step-n{font-family:Menlo,"SF Mono",monospace;font-size:92px;font-weight:600;line-height:.8;letter-spacing:-.04em;color:var(--accent)}
.layout-sl-body-flow .sl-step-t{font-family:var(--font-display);font-size:46px;font-weight:700;letter-spacing:-.01em;color:var(--fg);line-height:1.1}
.layout-sl-body-flow .sl-step-d{font-size:28px;line-height:1.42;color:var(--muted);margin-top:12px}

/* ---- SL hero 封面：证据/概念图主导 + 电蓝 duotone + 半调网点 + 网格框（独家影像配方）。图片冲击力 + 一眼是我们 + 反 PPT/反通用 ---- */
.layout-sl-cover-hero{position:relative;background:#0B0F16;color:#EAF1FB;overflow:hidden;display:block;padding:0;isolation:isolate;font-family:var(--font-body)}
.layout-sl-cover-hero .sl-hero{position:absolute;inset:0;z-index:0;overflow:hidden}
.layout-sl-cover-hero .sl-hero-img{position:absolute;inset:0}
.layout-sl-cover-hero .sl-hero-img img{width:100%;height:100%;object-fit:cover;object-position:center 42%;filter:url(#sl-duo) contrast(1.05) brightness(.96)}
.layout-sl-cover-hero .sl-hero::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse 90% 80% at 50% 40%, transparent 40%, rgba(5,9,18,.5) 100%)}
.layout-sl-cover-hero .sl-hero::before{content:"";position:absolute;inset:0;z-index:2;background:linear-gradient(180deg,rgba(6,10,20,.5) 0%,transparent 28%,transparent 46%,rgba(5,9,18,.9) 100%)}
.layout-sl-cover-hero .sl-halftone{position:absolute;inset:0;z-index:3;pointer-events:none;opacity:.17;mix-blend-mode:overlay;background-image:radial-gradient(circle,#fff 1px,transparent 1.5px);background-size:6px 6px}
.layout-sl-cover-hero .sl-frame{position:absolute;left:40px;right:40px;top:40px;bottom:40px;z-index:4;border:1.5px solid rgba(220,232,248,.4);pointer-events:none}
.layout-sl-cover-hero .sl-fx{position:absolute;width:14px;height:14px;border:2px solid var(--accent)}
.layout-sl-cover-hero .sl-fx.tl{left:-2px;top:-2px;border-right:0;border-bottom:0}
.layout-sl-cover-hero .sl-fx.tr{right:-2px;top:-2px;border-left:0;border-bottom:0}
.layout-sl-cover-hero .sl-fx.bl{left:-2px;bottom:-2px;border-right:0;border-top:0}
.layout-sl-cover-hero .sl-fx.br{right:-2px;bottom:-2px;border-left:0;border-top:0}
.layout-sl-cover-hero .sl-reg{position:absolute;right:62px;bottom:150px;width:26px;height:26px;z-index:6;opacity:.55;
  background:linear-gradient(rgba(220,232,248,.9),rgba(220,232,248,.9)) center/1.5px 26px no-repeat,
            linear-gradient(rgba(220,232,248,.9),rgba(220,232,248,.9)) center/26px 1.5px no-repeat}
.layout-sl-cover-hero .sl-reg::after{content:"";position:absolute;inset:6px;border:1.5px solid rgba(220,232,248,.7);border-radius:50%}
.layout-sl-cover-hero .sl-head{top:80px;z-index:6}
.layout-sl-cover-hero .sl-eyebrow{color:#EAF1FB}
.layout-sl-cover-hero .sl-mk{background:#EAF1FB}
.layout-sl-cover-hero .sl-board{color:rgba(234,241,251,.72)}
.layout-sl-cover-hero .sl-token{color:#EAF1FB;border-color:rgba(234,241,251,.6)}
.layout-sl-cover-hero .sl-rule{top:142px;background:rgba(234,241,251,.5);z-index:6}
.layout-sl-cover-hero .sl-title{position:absolute;left:74px;right:74px;top:auto;bottom:236px;z-index:6;color:#fff;font-size:106px;line-height:.98;letter-spacing:-.035em;font-weight:800;text-shadow:0 2px 32px rgba(0,0,0,.42)}
.layout-sl-cover-hero .sl-title .em{color:#9FC2F2}
/* 长标题字号自适应：短标题大字保冲击力，长标题缩字号塞进两行不截断（业界 responsive type scale） */
.layout-sl-cover-hero .sl-title.sl-len-md{font-size:84px;line-height:1.0}
.layout-sl-cover-hero .sl-title.sl-len-sm{font-size:64px;line-height:1.06;letter-spacing:-.02em}
.layout-sl-cover-hero .sl-title.sl-len-xs{font-size:52px;line-height:1.12;letter-spacing:-.01em}
.layout-sl-cover-hero .sl-tag{position:absolute;left:76px;bottom:172px;z-index:6;font-family:Menlo,"SF Mono",monospace;font-size:16px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);background:#EAF1FB;padding:6px 13px}
.layout-sl-cover-hero .sl-foot{bottom:74px;z-index:6;color:rgba(234,241,251,.66)}
.layout-sl-cover-hero .sl-foot-id{color:#EAF1FB}
/* 多平台同源：Signal hero 跨 3:4 / 1:1 / 16:9，文字位/字阶随画幅适配 */
.poster.square.layout-sl-cover-hero .sl-title{font-size:86px;bottom:184px}
.poster.square.layout-sl-cover-hero .sl-tag{bottom:130px}
.poster.wide.layout-sl-cover-hero .sl-head{top:60px}
.poster.wide.layout-sl-cover-hero .sl-rule{top:116px}
.poster.wide.layout-sl-cover-hero .sl-title{font-size:90px;bottom:140px}
.poster.wide.layout-sl-cover-hero .sl-title.sl-len-sm{font-size:64px}
.poster.wide.layout-sl-cover-hero .sl-title.sl-len-xs{font-size:54px}
.poster.wide.layout-sl-cover-hero .sl-tag{bottom:96px}
.poster.wide.layout-sl-cover-hero .sl-foot{bottom:56px}

/* ============================================================
   Bridge Canvas — 图桥（第三视觉语言）：满铺 cinematic 强图 + 电影黑边 letterbox + split-tone 调色 + 颗粒 + 极简压图 + 签名标尺。
   独家影像配方：cinematic split-tone(冷阴影+暖高光) + letterbox + 角标，区别于纸本暖 sepia / 信号 duotone。多平台同源。
   ============================================================ */
/* Bridge 通用 riso 半调网点签名层（split-tone duo 配套，加印刷颗粒签名感）。dramatic register(noir/cover/split)用。 */
.bc-halftone{position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.1;mix-blend-mode:overlay;background-image:radial-gradient(circle,#fff 1px,transparent 1.6px);background-size:6px 6px}
.layout-bc-cover{position:relative;background:#0A0B0D;overflow:hidden;display:block;padding:0;isolation:isolate;color:#F4F0E8;font-family:"Helvetica Neue","PingFang SC",system-ui,sans-serif}
.layout-bc-cover .bc-img{position:absolute;inset:0;z-index:0}
.layout-bc-cover .bc-img img{width:100%;height:100%;object-fit:cover;object-position:center 38%;filter:url(#bc-duo) contrast(1.06) saturate(1.04) brightness(.96)}
.layout-bc-cover .bc-grade{position:absolute;inset:0;z-index:1;pointer-events:none;
  background:linear-gradient(180deg, rgba(10,16,26,.5) 0%, transparent 24%, transparent 50%, rgba(6,9,16,.9) 100%),
    radial-gradient(ellipse 105% 82% at 50% 40%, transparent 46%, rgba(7,10,16,.6) 100%),
    linear-gradient(180deg, rgba(34,56,70,.24), rgba(62,42,24,.18))}
.layout-bc-cover .bc-grain{position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.06;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150'><filter id='bcn'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='150' height='150' filter='url(%23bcn)'/></svg>");background-size:200px 200px}
.layout-bc-cover .bc-bar{position:absolute;left:0;right:0;height:62px;background:#08090B;z-index:3}
.layout-bc-cover .bc-bar-t{top:0}
.layout-bc-cover .bc-bar-b{bottom:0}
.layout-bc-cover .bc-top{position:absolute;left:72px;right:72px;top:100px;display:flex;justify-content:space-between;align-items:center;z-index:4;font-family:Menlo,"SF Mono",monospace;font-size:15px;letter-spacing:.24em;text-transform:uppercase;color:rgba(244,240,232,.82)}
.layout-bc-cover .bc-mark{position:absolute;left:72px;top:160px;width:46px;height:2px;background:rgba(244,240,232,.72);z-index:4}
.layout-bc-cover .bc-title-wrap{position:absolute;left:72px;right:72px;bottom:148px;z-index:4}
.layout-bc-cover .bc-eyebrow{font-family:Menlo,"SF Mono",monospace;font-size:16px;letter-spacing:.2em;text-transform:uppercase;color:rgba(244,240,232,.72);margin-bottom:20px}
.layout-bc-cover .bc-title{font-family:"Songti SC","Source Han Serif SC","Noto Serif CJK SC",Georgia,serif;font-size:94px;line-height:1.12;font-weight:500;letter-spacing:.02em;color:#fff;text-shadow:0 2px 42px rgba(0,0,0,.5)}
.layout-bc-cover .bc-title .em{color:#E8C98C}
.layout-bc-cover .bc-lead{margin-top:22px;width:600px;font-size:26px;line-height:1.52;color:rgba(244,240,232,.82)}
.layout-bc-cover .bc-foot{position:absolute;left:72px;bottom:88px;z-index:4;font-family:Menlo,"SF Mono",monospace;font-size:14px;letter-spacing:.18em;text-transform:uppercase;color:rgba(244,240,232,.62)}
/* 多平台同源 splitImageBridge：同图跨 3:4 / 1:1 / 16:9，文字位/字阶随画幅适配 */
.poster.square.layout-bc-cover .bc-img img{object-position:center 44%}
.poster.square.layout-bc-cover .bc-title{font-size:78px}
.poster.square.layout-bc-cover .bc-title-wrap{bottom:128px}
.poster.square.layout-bc-cover .bc-lead{width:560px}
.poster.wide.layout-bc-cover .bc-bar{height:46px}
.poster.wide.layout-bc-cover .bc-img img{object-position:center 40%}
.poster.wide.layout-bc-cover .bc-title{font-size:84px;white-space:nowrap}
.poster.wide.layout-bc-cover .bc-title-wrap{bottom:118px;width:1700px}
.poster.wide.layout-bc-cover .bc-lead{width:900px;margin-top:18px}
/* 图桥 body bc-frame：cinematic 图叙事内页 + 金色序号。calm register=守本色（覆盖 bc-cover 的 teal-gold duo）——
   理念/风景叙事图无强暗部，上 duo 必染黄糊；守本色保真实色 + Kinfolk 画廊感（duo 留给 noir 暗调强图）。letterbox+grain+暗角 chrome 仍在。 */
.layout-bc-frame .bc-img img{filter:contrast(1.05) saturate(1.0) brightness(.82)}
/* bc-cover calm register：守本色（覆盖 teal-gold duo）——calm 风景叙事整组协调、Kinfolk 真实感；duo 留给 noir 等 dramatic 强图 */
.layout-bc-cover.bc-calm .bc-img img{filter:contrast(1.05) saturate(1.0) brightness(.82)}
.layout-bc-frame .bc-title{font-size:66px;line-height:1.2}
.layout-bc-frame .bc-idx{font-family:Menlo,"SF Mono",monospace;font-size:17px;letter-spacing:.2em;color:#E8C98C;margin-bottom:18px}
.poster.square.layout-bc-frame .bc-title{font-size:58px}
.poster.wide.layout-bc-frame .bc-title{font-size:60px;white-space:normal}
.poster.wide.layout-bc-cover .bc-top{top:84px}
.poster.wide.layout-bc-cover .bc-mark{top:138px}

/* ============================================================
   Bridge Canvas · 黑卡 Noir Poster — 纯黑满铺强图 + 巨字主角 + 中英三模式(cn/mix/en) + 三构图(center/bottom/edge)
   对标 fashion editorial 满铺封面 / 小红书暗调大字 / bold-minimalism。补 Bridge 封面版式多样性。
   ============================================================ */
.layout-bc-noir{position:relative;background:#000;overflow:hidden;display:block;padding:0;isolation:isolate;color:#F6F2EA;--bc-gold:#E5C07A}
.layout-bc-noir .bc-img{position:absolute;inset:0;z-index:0}
.layout-bc-noir .bc-img img{width:100%;height:100%;object-fit:cover;object-position:center 32%;filter:url(#bc-duo) contrast(1.12) saturate(1.12)}
/* 暗场 veil：四周压近黑、留中上一束光，让巨字处处可读；上下最深承刊头/标题 */
.layout-bc-noir .bc-veil{position:absolute;inset:0;z-index:1;pointer-events:none;
  background:
    radial-gradient(126% 96% at 50% 34%, rgba(8,11,18,0) 0%, rgba(8,11,18,.10) 52%, rgba(6,9,15,.54) 84%, rgba(5,8,13,.84) 100%),
    linear-gradient(180deg, rgba(6,10,18,.66) 0%, rgba(8,11,18,.04) 26%, rgba(8,11,18,.12) 54%, rgba(5,8,13,.84) 100%)}
.layout-bc-noir .bc-grain{position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.07;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150'><filter id='bng'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='150' height='150' filter='url(%23bng)'/></svg>");background-size:220px 220px}
/* 刊头 masthead：窄体大写、克制、字距宽 */
.layout-bc-noir .bc-mast{position:absolute;top:80px;left:80px;right:80px;z-index:5;display:flex;justify-content:space-between;align-items:baseline;
  font-family:"DIN Condensed","Gill Sans","Helvetica Neue",sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.34em;font-size:21px;color:rgba(246,242,234,.82)}
.layout-bc-noir .bc-mast .bc-idx{font-family:Menlo,"SF Mono",monospace;letter-spacing:.12em;font-weight:400;font-size:18px;color:rgba(246,242,234,.6)}
/* 竖脊 spine：右缘竖排短语，东方编辑气 */
.layout-bc-noir .bc-spine{position:absolute;top:152px;right:84px;z-index:5;writing-mode:vertical-rl;text-orientation:upright;
  font-family:"Songti SC","Source Han Serif SC",serif;letter-spacing:.42em;font-size:25px;color:rgba(246,242,234,.66)}
/* 舞台 stage：默认沉底左对齐 */
.layout-bc-noir .bc-stage{position:absolute;left:80px;right:80px;bottom:130px;z-index:5}
.layout-bc-noir .bc-kline{font-family:"DIN Condensed","Gill Sans",sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.28em;font-size:20px;color:var(--bc-gold);margin-bottom:20px}
.layout-bc-noir .bc-h{font-size:120px;line-height:1.04;font-weight:500;letter-spacing:-.01em;color:#FFF;text-shadow:0 2px 50px rgba(0,0,0,.62),0 1px 4px rgba(0,0,0,.5);margin:0}
.layout-bc-noir .bc-h strong{color:var(--bc-gold);font-weight:inherit}
.layout-bc-noir .bc-en{margin-top:24px;color:rgba(246,242,234,.9)}
.layout-bc-noir .bc-lead{margin-top:26px;max-width:640px;font-family:"Songti SC","Source Han Serif SC",serif;font-size:27px;line-height:1.6;color:rgba(246,242,234,.8)}
.layout-bc-noir .bc-foot{position:absolute;left:80px;right:80px;bottom:74px;z-index:5;display:flex;justify-content:space-between;
  font-family:Menlo,"SF Mono",monospace;text-transform:uppercase;letter-spacing:.2em;font-size:14px;color:rgba(246,242,234,.52)}

/* —— 三语言模式 —— */
/* cn 纯中文：宋体巨字，无英文副题 */
.bc-lang-cn .bc-h{font-family:"Songti SC","Source Han Serif SC","Noto Serif CJK SC",serif}
.bc-lang-cn .bc-en{display:none}
/* mix 香港混排：中文宋体大 + 英文细高斜体衬线副题，金线分隔 */
.bc-lang-mix .bc-h{font-family:"Songti SC","Source Han Serif SC",serif}
.bc-lang-mix .bc-en{font-family:"Hoefler Text","Iowan Old Style",Baskerville,Georgia,serif;font-style:italic;font-size:34px;letter-spacing:.04em;line-height:1.32;color:rgba(246,242,234,.84);margin-top:26px;padding-top:24px;border-top:1px solid var(--bc-gold);display:inline-block}
/* en 纯英文：编辑衬线大字，紧排 */
.bc-lang-en .bc-h{font-family:"Hoefler Text","Iowan Old Style","Charter",Baskerville,Georgia,serif;font-size:130px;line-height:.98;letter-spacing:-.01em;font-weight:500}
.bc-lang-en .bc-en{display:none}
/* 字体声部扩充（克制不发散）：didot=时装刊高对比衬线(Vogue 气) / kai=楷体书法。仅 en/拉丁标题换脸，CJK 自动回退宋体。 */
.bc-font-didot.bc-lang-en .bc-h,.bc-font-didot .bc-en{font-family:"Didot","Bodoni 72",Cochin,"Hoefler Text",Georgia,serif}
.bc-font-didot.bc-lang-en .bc-h{letter-spacing:0;font-weight:400}
.bc-font-kai .bc-h{font-family:"Kaiti SC","STKaiti","Songti SC",serif;font-weight:400;letter-spacing:.06em}

/* —— 三构图变体（复用 posterOpen 的 sp-var 注入；engine 零改通用） —— */
/* center 居中：巨字垂直居中、文字居中，最"海报"；中央更暗保对比 */
.sp-var-center.layout-bc-noir .bc-stage{top:50%;bottom:auto;transform:translateY(-50%);text-align:center}
.sp-var-center.layout-bc-noir .bc-img img{filter:url(#bc-duo) contrast(1.12) saturate(1.12) brightness(.92)}
.sp-var-center.layout-bc-noir .bc-en{display:inline-block}
/* bottom 沉底：默认即沉底（显式占位，无需覆盖） */
/* edge 竖脊：版心偏左让出右脊，竖脊放大为装置 */
.sp-var-edge.layout-bc-noir .bc-stage{right:208px}
.sp-var-edge.layout-bc-noir .bc-spine{font-size:26px;letter-spacing:.5em;color:rgba(246,242,234,.66)}

/* 多平台同源：square 1:1 / wide 16:9 */
.poster.square.layout-bc-noir .bc-h{font-size:98px}
.poster.square.layout-bc-noir .bc-lang-en .bc-h,.poster.square.layout-bc-noir.bc-lang-en .bc-h{font-size:104px}
.poster.square.layout-bc-noir .bc-stage{bottom:112px}
.poster.wide.layout-bc-noir .bc-h{font-size:104px}
.poster.wide.layout-bc-noir .bc-stage{right:auto;width:1500px;bottom:118px}
.poster.wide.layout-bc-noir .bc-img img{object-position:center 36%}

/* ============================================================
   Bridge Canvas · 上下分割 bc-split — 图 band(上) + 奶纸字版(下) + 金线分隔。编辑刊物上图下字；与暗调 noir 反差(亮/克制/画廊感)。
   ============================================================ */
.layout-bc-split{position:relative;background:#F4EEE2;overflow:hidden;display:block;padding:0;isolation:isolate;color:#1A1714;--bc-gold:#C2924A}
.layout-bc-split .bc-band{position:absolute;left:0;right:0;top:0;height:58%;overflow:hidden;background:#0A0B0D}
.layout-bc-split .bc-band .bc-img{position:absolute;inset:0}
.layout-bc-split .bc-band .bc-img img{width:100%;height:100%;object-fit:cover;object-position:center 36%;filter:contrast(1.06) saturate(.98) brightness(1.02)}
.layout-bc-split .bc-band-grade{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(8,9,11,.55) 0%,transparent 24%,transparent 80%,rgba(8,9,11,.28) 100%)}
.layout-bc-split .bc-mast{position:absolute;top:64px;left:80px;right:80px;z-index:3;display:flex;justify-content:space-between;align-items:baseline;color:#F6F2EA;
  font-family:"DIN Condensed","Gill Sans","Helvetica Neue",sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.34em;font-size:21px}
.layout-bc-split .bc-mast .bc-idx{font-family:Menlo,"SF Mono",monospace;letter-spacing:.12em;font-weight:400;font-size:18px;opacity:.85}
.layout-bc-split .bc-bandcap{position:absolute;left:80px;bottom:28px;z-index:3;color:rgba(246,242,234,.72);font-family:Menlo,"SF Mono",monospace;font-size:14px;letter-spacing:.16em;text-transform:uppercase}
.layout-bc-split .bc-field{position:absolute;left:80px;right:80px;top:58%;bottom:0;z-index:3;display:flex;flex-direction:column;justify-content:center}
/* 金线作为居中内容组首项(标题上方短金线分隔)，整组垂直居中、上下留白均衡——解决标题贴 band 顶 + 下方大空白 */
.layout-bc-split .bc-field::before{content:"";width:104px;height:4px;background:var(--bc-gold);margin-bottom:30px}
.layout-bc-split .bc-kline{font-family:"DIN Condensed","Gill Sans",sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.28em;font-size:19px;color:var(--bc-gold)}
.layout-bc-split .bc-h{margin:18px 0 0;font-size:78px;line-height:1.08;font-weight:500;letter-spacing:.01em;color:#1A1714}
.layout-bc-split .bc-h strong{color:var(--bc-gold);font-weight:inherit}
.layout-bc-split .bc-lead{margin-top:18px;max-width:600px;font-family:"Songti SC","Source Han Serif SC",serif;font-size:25px;line-height:1.55;color:#5A5249}
.layout-bc-split .bc-foot{position:absolute;left:0;right:0;bottom:70px;display:flex;justify-content:space-between;font-family:Menlo,"SF Mono",monospace;text-transform:uppercase;letter-spacing:.2em;font-size:13px;color:rgba(26,23,20,.5)}
/* lang 模式（奶纸 ink 字，独立于 noir 的 bc-lang-*） */
.bcs-cn .bc-h{font-family:"Songti SC","Source Han Serif SC","Noto Serif CJK SC",serif}
.bcs-cn .bc-en{display:none}
.bcs-mix .bc-h{font-family:"Songti SC","Source Han Serif SC",serif}
.bcs-mix .bc-en{font-family:"Hoefler Text","Iowan Old Style",Baskerville,Georgia,serif;font-style:italic;font-size:30px;line-height:1.32;color:#574E44;margin-top:22px;padding-top:22px;border-top:1px solid var(--bc-gold);display:inline-block}
.bcs-en .bc-h{font-family:"Hoefler Text","Iowan Old Style","Charter",Baskerville,Georgia,serif;font-size:90px;line-height:1.0;letter-spacing:-.01em}
.bcs-en .bc-en{display:none}
.poster.square.layout-bc-split .bc-band{height:54%}
.poster.square.layout-bc-split .bc-field{top:54%}
.poster.square.layout-bc-split .bc-h{font-size:66px}
.poster.wide.layout-bc-split .bc-band{height:50%}
.poster.wide.layout-bc-split .bc-field{top:50%}

/* ============================================================
   Signal · 宣言式无图大字 sl-cover-manifesto — 巨字黑体压冷网格 + accent 词 + 粗 accent 标尺 + 套准角标，无图。type-as-hero；解 typography欠缺 + 图片重复。
   ============================================================ */
.layout-sl-cover-manifesto .sl-reg{position:absolute;left:44px;right:44px;top:44px;bottom:44px;z-index:1;pointer-events:none;border:1.5px solid color-mix(in srgb,var(--fg),transparent 84%)}
.layout-sl-cover-manifesto .sl-fx{position:absolute;width:16px;height:16px;border:2px solid var(--accent)}
.layout-sl-cover-manifesto .sl-fx.tl{left:-2px;top:-2px;border-right:0;border-bottom:0}
.layout-sl-cover-manifesto .sl-fx.tr{right:-2px;top:-2px;border-left:0;border-bottom:0}
.layout-sl-cover-manifesto .sl-fx.bl{left:-2px;bottom:-2px;border-right:0;border-top:0}
.layout-sl-cover-manifesto .sl-fx.br{right:-2px;bottom:-2px;border-left:0;border-top:0}
/* 整块垂直居中：消除中部死空白（评审标注），content 成一团均衡留白 */
.layout-sl-cover-manifesto .sl-manifesto{position:absolute;left:74px;right:74px;top:50%;transform:translateY(-50%);z-index:2}
.layout-sl-cover-manifesto .sl-mlbl{font-family:Menlo,"SF Mono",monospace;font-size:18px;letter-spacing:.22em;text-transform:uppercase;color:var(--accent);margin-bottom:30px}
.layout-sl-cover-manifesto .sl-mhead{font-family:var(--font-display);font-size:112px;line-height:1.03;font-weight:800;letter-spacing:-.03em;color:var(--fg)}
.layout-sl-cover-manifesto .sl-mhead strong{color:var(--accent);font-weight:inherit}
.layout-sl-cover-manifesto .sl-mbar{margin-top:40px;width:172px;height:12px;background:var(--accent)}
.layout-sl-cover-manifesto .sl-mhead-en{margin-top:30px;font-family:Menlo,"SF Mono",monospace;font-size:21px;letter-spacing:.05em;line-height:1.5;color:var(--muted);max-width:780px}
.layout-sl-cover-manifesto .sl-mlead{margin-top:34px;max-width:720px;font-size:25px;line-height:1.5;color:var(--muted)}
.poster.square.layout-sl-cover-manifesto .sl-mhead{font-size:88px}
.poster.wide.layout-sl-cover-manifesto .sl-mhead{font-size:84px}

/* ============================================================
   Signal Proof · 证据方法论正文卡（light 档案纸基座 — 对位封面暗底 duotone）
   共享 chrome：档案纸 + marker 刊头 + VERIFIED 印章 + 来源(当前日期) + RECORD·REFLECT·REALIGN footer。
   独家=审阅过的证据（截图/标注/验证/可追溯），区别于通用 SaaS 漂亮数据卡。accent 跟主题 var(--accent)。
   ============================================================ */
.layout-sl-ev{position:relative;background:#F4F2EC;color:#1A1A1A;overflow:hidden;display:block;padding:0;isolation:isolate;font-family:"Helvetica Neue","PingFang SC",system-ui,sans-serif}
.layout-sl-ev .sl-ev-paper{position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.6;background:repeating-linear-gradient(0deg,rgba(40,38,32,.014) 0 1px,transparent 1px 7px),radial-gradient(circle at 86% 8%,rgba(47,94,167,.05),transparent 36%)}
.layout-sl-ev .sl-ev-mast{position:absolute;left:74px;right:74px;top:74px;z-index:2;display:flex;justify-content:space-between;align-items:center}
.layout-sl-ev .sl-ev-mk{display:flex;align-items:center;gap:16px}
.layout-sl-ev .sl-ev-mk i{width:34px;height:16px;background:var(--accent,#2F5EA7);display:block}
.layout-sl-ev .sl-ev-brand{font-weight:700;letter-spacing:.14em;font-size:23px}
.layout-sl-ev .sl-ev-sect{font-family:Menlo,"SF Mono",monospace;font-size:17px;letter-spacing:.12em;color:#6C7580;text-transform:uppercase}
.layout-sl-ev .sl-ev-tok{font-family:Menlo,"SF Mono",monospace;font-size:17px;letter-spacing:.1em;border:1.5px solid #1A1A1A;padding:7px 14px}
.layout-sl-ev .sl-ev-rule{position:absolute;left:74px;right:74px;top:132px;height:2px;background:#1A1A1A;z-index:2}
.layout-sl-ev .sl-ev-head{position:absolute;left:74px;right:74px;top:182px;z-index:2}
.layout-sl-ev .sl-ev-title{font-size:50px;font-weight:700;letter-spacing:-.01em;line-height:1.12}
.layout-sl-ev .sl-ev-title strong{color:var(--accent,#2F5EA7);font-weight:inherit}
.layout-sl-ev .sl-ev-sub{margin-top:14px;font-family:Menlo,"SF Mono",monospace;font-size:19px;letter-spacing:.04em;color:#6C7580}
.layout-sl-ev .sl-ev-stamp{position:absolute;right:74px;bottom:130px;z-index:3;width:84px;height:84px;transform:rotate(-9deg);color:var(--accent,#2F5EA7)}
.layout-sl-ev .sl-ev-stamp svg{width:100%;height:100%}
.layout-sl-ev .sl-ev-src{position:absolute;left:74px;bottom:152px;z-index:2;font-family:Menlo,"SF Mono",monospace;font-size:16px;letter-spacing:.05em;color:#6C7580}
.layout-sl-ev .sl-ev-foot{position:absolute;left:74px;right:74px;bottom:74px;z-index:2;display:flex;justify-content:space-between;font-family:Menlo,"SF Mono",monospace;font-size:14px;letter-spacing:.2em;text-transform:uppercase;color:rgba(26,26,26,.5);border-top:1px solid #D5CFC0;padding-top:20px}
/* —— SCREENSHOT 截图证据卡：暗底真实截图(哑面直角框) + mono 路径条 + 标注引线 —— */
/* 中性证据框：用户截图直接放(任意比例 object-fit cover 适配)，无假浏览器 chrome / 无网址；图下克制 mono 标签 */
.layout-sl-ev-screenshot .sl-ev-shot{position:absolute;left:74px;right:74px;top:340px;z-index:2}
/* 纹理点阵舞台：托住截图不再「白底飘白底」（纹理底，托住截图不飘）*/
.layout-sl-ev-screenshot .sl-ev-stage{padding:44px 40px;background:#E7E2D6;background-image:radial-gradient(rgba(40,38,32,.11) 1.1px,transparent 1.3px);background-size:13px 13px;border:1px solid #C9C3B4}
/* 设备卡浮在舞台上：圆角 + 投影 = 杂志/官方宣传感 */
.layout-sl-ev-screenshot .sl-ev-device{background:#fff;border-radius:12px;box-shadow:0 24px 56px rgba(20,24,29,.22),0 2px 6px rgba(20,24,29,.10);overflow:hidden;border:1px solid rgba(20,24,29,.06)}
.layout-sl-ev-screenshot .sl-ev-bar{height:36px;display:flex;align-items:center;gap:8px;padding:0 16px;background:#F1EEE9;border-bottom:1px solid rgba(20,24,29,.07)}
.layout-sl-ev-screenshot .sl-ev-bar span{width:11px;height:11px;border-radius:50%;background:#CFC8BA}
.layout-sl-ev-screenshot .sl-ev-shotimg{height:452px;overflow:hidden;background:#fff;display:flex;align-items:center;justify-content:center}
.layout-sl-ev-screenshot .sl-ev-shotimg img{width:100%;height:100%;object-fit:contain;object-position:center;display:block}
.layout-sl-ev-screenshot .sl-ev-shot-clean .sl-ev-bar{display:none}
.layout-sl-ev-screenshot .sl-ev-shot-phone .sl-ev-bar{display:none}
.layout-sl-ev-screenshot .sl-ev-shot-phone .sl-ev-device{max-width:296px;margin-inline:auto;border-radius:36px;padding:13px;background:#15181D;border:0}
.layout-sl-ev-screenshot .sl-ev-shot-phone .sl-ev-shotimg{border-radius:24px;height:486px}
.layout-sl-ev-screenshot .sl-ev-shotcap{display:flex;justify-content:space-between;align-items:center;padding:16px 4px 0;font-family:Menlo,"SF Mono",monospace;font-size:15px;letter-spacing:.08em;color:#6C7580;text-transform:uppercase}
.layout-sl-ev-screenshot .sl-ev-shotcap .sl-ev-priv{color:var(--accent,#2F5EA7)}
/* 测评评分卡 sl-ev-review：综合巨数 hero + 右对齐分项账本行(数字脊柱) + verdict 裁定 + 方法论脚注 */
.layout-sl-ev-review .sl-ev-rv-hero{position:absolute;left:74px;right:74px;top:344px;z-index:2;display:flex;align-items:flex-end;gap:32px}
.layout-sl-ev-review .sl-ev-rv-big{font-family:"Helvetica Neue",Arial,sans-serif;font-feature-settings:"tnum" 1,"lnum" 1;font-size:258px;font-weight:600;line-height:.82;letter-spacing:-.02em;color:#1A1A1A}
.layout-sl-ev-review .sl-ev-rv-deno{font-size:58px;font-weight:400;color:#9A958C;letter-spacing:0;margin-left:12px}
.layout-sl-ev-review .sl-ev-rv-ometa{padding-bottom:22px}
.layout-sl-ev-review .sl-ev-rv-olbl{display:block;font-family:var(--sp-label,"DIN Condensed"),"Helvetica Neue";font-size:28px;letter-spacing:.18em;color:var(--accent,#2F5EA7);font-weight:700;text-transform:uppercase}
.layout-sl-ev-review .sl-ev-rv-ocn{display:block;margin-top:6px;font-size:26px;color:#5A5F66}
.layout-sl-ev-review .sl-ev-rv-rule{position:absolute;left:74px;right:74px;top:606px;height:2px;background:var(--accent,#2F5EA7);z-index:2}
.layout-sl-ev-review .sl-ev-rv-subs{position:absolute;left:74px;right:74px;top:636px;z-index:2}
.layout-sl-ev-review .sl-ev-rv-row{display:flex;align-items:baseline;gap:14px;height:82px;border-bottom:1px solid #DAD4C6}
.layout-sl-ev-review .rv-cn{font-size:31px;color:#1A1A1A}
.layout-sl-ev-review .rv-en{font-family:var(--sp-label,"DIN Condensed"),"Helvetica Neue";font-size:19px;letter-spacing:.1em;text-transform:uppercase;color:#9A958C}
.layout-sl-ev-review .rv-dot{flex:1;border-bottom:1px dotted #C4BEB0;transform:translateY(-9px)}
.layout-sl-ev-review .rv-v{font-family:"Helvetica Neue",Arial,sans-serif;font-feature-settings:"tnum" 1,"lnum" 1;font-size:48px;font-weight:600;color:#1A1A1A;min-width:92px;text-align:right}
.layout-sl-ev-review .sl-ev-rv-verdict{position:absolute;left:74px;right:74px;bottom:206px;z-index:2}
.layout-sl-ev-review .sl-ev-rv-verdict .rv-vl{font-family:var(--sp-label,"DIN Condensed"),"Helvetica Neue";font-size:22px;letter-spacing:.16em;color:var(--accent,#2F5EA7);font-weight:700;text-transform:uppercase}
.layout-sl-ev-review .sl-ev-rv-verdict p{margin-top:12px;font-family:"PingFang SC",sans-serif;font-size:36px;font-weight:600;line-height:1.5;color:#1A1A1A}
.layout-sl-ev-review .rv-fit{margin-top:18px;display:flex;gap:44px;font-size:27px;color:#3A3A3A}
.layout-sl-ev-review .rv-yes{position:relative;padding-left:24px}
.layout-sl-ev-review .rv-yes::before{content:"";position:absolute;left:0;top:12px;width:11px;height:11px;background:var(--accent,#2F5EA7)}
.layout-sl-ev-review .rv-no{position:relative;padding-left:24px;color:#7A746A}
.layout-sl-ev-review .rv-no::before{content:"";position:absolute;left:0;top:12px;width:11px;height:11px;border:1.6px solid #9A958C}
.layout-sl-ev-review .sl-ev-rv-method{position:absolute;left:74px;right:300px;bottom:118px;z-index:2;font-family:Menlo,"SF Mono",monospace;font-size:18px;line-height:1.65;color:#8A857B}
/* 图先说话变体(card.image 时)：产品图 band 在上 + 综合巨数左 + 分项右栏紧凑(图+评分的证据组合，原创+证据层) */
.layout-sl-ev-review.sl-ev-rv-img-led .sl-ev-rv-img{position:absolute;left:74px;right:74px;top:296px;height:388px;z-index:2;overflow:hidden;background:#15181D;border:1px solid #C9C3B4;margin:0}
.layout-sl-ev-review.sl-ev-rv-img-led .sl-ev-rv-img img{width:100%;height:100%;object-fit:cover;object-position:center;display:block}
.layout-sl-ev-review.sl-ev-rv-img-led .sl-ev-rv-img figcaption{position:absolute;left:0;bottom:0;background:rgba(20,24,29,.82);color:#fff;font:600 23px/1 "Helvetica Neue",Arial,sans-serif;font-feature-settings:"tnum" 1;padding:13px 18px}
.layout-sl-ev-review.sl-ev-rv-img-led .sl-ev-rv-hero{top:716px}
.layout-sl-ev-review.sl-ev-rv-img-led .sl-ev-rv-big{font-size:150px}
.layout-sl-ev-review.sl-ev-rv-img-led .sl-ev-rv-deno{font-size:38px}
.layout-sl-ev-review.sl-ev-rv-img-led .sl-ev-rv-rule{display:none}
.layout-sl-ev-review.sl-ev-rv-img-led .sl-ev-rv-subs{top:726px;left:522px}
.layout-sl-ev-review.sl-ev-rv-img-led .sl-ev-rv-row{height:60px}
.layout-sl-ev-review.sl-ev-rv-img-led .rv-cn{font-size:27px}
.layout-sl-ev-review.sl-ev-rv-img-led .rv-v{font-size:36px;min-width:60px}
.layout-sl-ev-screenshot .sl-ev-notes{position:absolute;left:74px;right:74px;top:980px;z-index:2;display:grid;grid-template-columns:1fr 1fr}
.layout-sl-ev-screenshot .sl-ev-note{position:relative;padding:26px 30px 26px 0;border-top:1.5px solid #1A1A1A}
.layout-sl-ev-screenshot .sl-ev-note:last-child{padding-left:40px;border-left:1px solid #D5CFC0}
.layout-sl-ev-screenshot .sl-ev-nidx{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;background:var(--accent,#2F5EA7);color:#fff;font-family:Menlo,"SF Mono",monospace;font-size:16px;font-weight:700;margin-bottom:16px}
.layout-sl-ev-screenshot .sl-ev-ntitle{font-size:27px;font-weight:700;line-height:1.25}
.layout-sl-ev-screenshot .sl-ev-ntitle strong,.layout-sl-ev-screenshot .sl-ev-nbody strong{color:var(--accent,#2F5EA7);font-weight:700}
.layout-sl-ev-screenshot .sl-ev-nbody{margin-top:8px;font-size:20px;line-height:1.45;color:#5A5F66}
/* —— INSIGHT 洞察数据卡：折线趋势(SVG·series 归一) + 趋势大数 + 数据行 —— */
.layout-sl-ev-insight .sl-ev-chart{position:absolute;left:74px;right:74px;top:372px;height:470px;z-index:2;border:1px solid #D5CFC0;background:rgba(255,255,255,.45)}
.layout-sl-ev-insight .sl-ev-chart svg{width:100%;height:100%;display:block}
.layout-sl-ev-insight .sl-ev-trend{position:absolute;right:104px;top:398px;z-index:3;font-family:"Helvetica Neue",Arial,"PingFang SC",sans-serif;font-feature-settings:"tnum" 1,"lnum" 1;font-size:88px;font-weight:700;letter-spacing:-.02em;line-height:1;color:var(--accent,#2F5EA7)}
.layout-sl-ev-insight .sl-ev-trendlbl{position:absolute;right:104px;top:502px;z-index:3;font-family:Menlo,"SF Mono",monospace;font-size:17px;color:#6C7580;letter-spacing:.1em;text-transform:uppercase}
.layout-sl-ev-insight .sl-ev-rows{position:absolute;left:74px;right:74px;top:904px;z-index:2}
.layout-sl-ev-insight .sl-ev-row{display:flex;justify-content:space-between;align-items:baseline;padding:22px 0;border-top:1px solid #D5CFC0;font-size:27px}
.layout-sl-ev-insight .sl-ev-row .v{font-family:Menlo,"SF Mono",monospace;font-weight:700;font-size:36px;letter-spacing:-.01em;color:#1A1A1A}
/* —— DATA 数据网格卡：2×2 KPI(mono 大数 + label + delta)，发丝线非浮卡 —— */
.layout-sl-ev-data .sl-ev-grid{position:absolute;left:74px;right:74px;top:372px;bottom:250px;z-index:2;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr}
.layout-sl-ev-data .sl-ev-cell{padding:44px 40px;border-top:1.5px solid #1A1A1A;display:flex;flex-direction:column;justify-content:center}
.layout-sl-ev-data .sl-ev-cell:nth-child(even){border-left:1px solid #D5CFC0;padding-left:52px}
.layout-sl-ev-data .sl-ev-cval{font-family:"Helvetica Neue",Arial,"PingFang SC",sans-serif;font-feature-settings:"tnum" 1,"lnum" 1;font-size:84px;font-weight:700;letter-spacing:-.02em;line-height:1;color:#1A1A1A}
.layout-sl-ev-data .sl-ev-clbl{margin-top:16px;font-size:25px;color:#5A5F66}
.layout-sl-ev-data .sl-ev-cdelta{margin-top:10px;font-family:Menlo,"SF Mono",monospace;font-size:21px;color:var(--accent,#2F5EA7);font-weight:700}
/* —— WORKFLOW 工作流卡：accent 圆编号 + 步骤铺满 + 发丝线（档案纸，非 SaaS 白网格） —— */
.layout-sl-ev-workflow .sl-ev-steps{position:absolute;left:74px;right:74px;top:356px;bottom:250px;z-index:2;display:flex;flex-direction:column;justify-content:space-between}
.layout-sl-ev-workflow .sl-ev-step{display:grid;grid-template-columns:56px 1fr;column-gap:30px;align-items:start;border-top:1.5px solid #1A1A1A;padding-top:26px}
.layout-sl-ev-workflow .sl-ev-snum{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:50%;background:var(--accent,#2F5EA7);color:#fff;font-family:Menlo,"SF Mono",monospace;font-size:19px;font-weight:700}
.layout-sl-ev-workflow .sl-ev-stitle{font-size:36px;font-weight:700;letter-spacing:-.01em;line-height:1.14}
.layout-sl-ev-workflow .sl-ev-sbody{margin-top:9px;font-size:23px;line-height:1.45;color:#5A5F66}
/* —— COMPARE 对比卡：三列对照表(维度 | A | B) + 判定 —— */
.layout-sl-ev-compare .sl-ev-cmp{position:absolute;left:74px;right:74px;top:360px;z-index:2}
.layout-sl-ev-compare .sl-ev-cmprow{display:grid;grid-template-columns:1.1fr 1fr 1fr;align-items:center;padding:26px 0;border-top:1px solid #D5CFC0;font-size:26px}
.layout-sl-ev-compare .sl-ev-cmphead{border-top:0;border-bottom:2px solid #1A1A1A;padding-top:0;padding-bottom:18px}
.layout-sl-ev-compare .sl-ev-cmphead .dim{color:#6C7580;font-size:20px;letter-spacing:.04em;text-transform:uppercase;font-family:Menlo,"SF Mono",monospace}
.layout-sl-ev-compare .sl-ev-cmphead .a,.layout-sl-ev-compare .sl-ev-cmphead .b{font-size:30px;font-weight:700}
.layout-sl-ev-compare .sl-ev-cmprow .dim{color:#5A5F66;font-size:23px}
.layout-sl-ev-compare .sl-ev-cmprow .a{font-weight:600}
.layout-sl-ev-compare .sl-ev-cmprow .b{font-weight:700;color:var(--accent,#2F5EA7)}
.layout-sl-ev-compare .sl-ev-cmphead .b{color:var(--accent,#2F5EA7)}
.layout-sl-ev-compare .sl-ev-verdict{position:absolute;left:74px;right:74px;bottom:250px;z-index:2;border-top:2px solid #1A1A1A;padding-top:24px;font-size:30px;font-weight:700;line-height:1.3}
.layout-sl-ev-compare .sl-ev-verdict .vl{display:inline-block;font-family:Menlo,"SF Mono",monospace;font-size:16px;letter-spacing:.1em;color:var(--accent,#2F5EA7);text-transform:uppercase;margin-right:16px;vertical-align:middle}
/* —— COMPARE 双栏要点对照（cols）：误区/正解、过去/现在；右栏 accent 强调。区别逐维度三列表，适配观点对比真实内容 —— */
.layout-sl-ev-compare .sl-ev-cmp-cols{display:grid;grid-template-columns:1fr 1fr;top:330px;bottom:252px;gap:0}
.layout-sl-ev-compare .sl-ev-col{padding:0 0 0 44px;display:flex;flex-direction:column}
.layout-sl-ev-compare .sl-ev-col-a{padding-left:0;padding-right:44px}
.layout-sl-ev-compare .sl-ev-col-b{border-left:2px solid var(--accent,#2F5EA7)}
.layout-sl-ev-compare .sl-ev-colhd{border-bottom:2px solid #1A1A1A;padding-bottom:16px;margin-bottom:0}
.layout-sl-ev-compare .sl-ev-col-b .sl-ev-colhd{border-bottom-color:var(--accent,#2F5EA7)}
.layout-sl-ev-compare .sl-ev-colhd .mk{font-family:"Helvetica Neue","PingFang SC",sans-serif;font-weight:700;font-size:32px;color:#1A1A1A}
.layout-sl-ev-compare .sl-ev-col-b .sl-ev-colhd .mk{color:var(--accent,#2F5EA7)}
/* 账本行紧凑成组 + 整组居中：li 固定 padding 行块 + border 分隔，ul justify-content:center → 2 条紧凑居中（行距恒定≈相邻账本行、不散）、3-4 条自然下排接近撑满。弃 flex:1 等高（2 条时每条占半栏、间距达栏高一半过散，已弃）；plan trimTo 18 字保每条 ≤2 行不溢出 */
.layout-sl-ev-compare .sl-ev-colpts{list-style:none;margin:0;padding:0;flex:1;display:flex;flex-direction:column;justify-content:center}
.layout-sl-ev-compare .sl-ev-colpts li{font-size:28px;line-height:1.55;color:#33373D;padding:26px 0 26px 32px;position:relative;display:flex;align-items:center;border-top:1px solid #E5DFD0}
.layout-sl-ev-compare .sl-ev-colpts li:first-child{border-top:0}
.layout-sl-ev-compare .sl-ev-colpts li::before{content:"";position:absolute;left:0;top:50%;transform:translateY(-50%);width:9px;height:9px;background:#C9C3B4}
.layout-sl-ev-compare .sl-ev-col-b .sl-ev-colpts li::before{background:var(--accent,#2F5EA7)}
/* —— FIELD NOTE 现场记录卡：宋体抒情标题 + lead + 蓝点日期/地点 + 雾景照片(light) —— */
.layout-sl-ev-fieldnote .sl-ev-title{font-family:"Songti SC","Source Han Serif SC","Noto Serif CJK SC",serif;font-size:62px;font-weight:600;letter-spacing:.01em;line-height:1.2}
.layout-sl-ev-fieldnote .sl-ev-fnlead{position:absolute;left:74px;right:74px;top:300px;z-index:2;font-size:26px;line-height:1.6;color:#5A5F66;max-width:780px}
.layout-sl-ev-fieldnote .sl-ev-fnmeta{position:absolute;left:74px;top:392px;z-index:2;font-family:Menlo,"SF Mono",monospace;font-size:18px;letter-spacing:.05em;color:#6C7580;display:flex;align-items:center;gap:12px}
.layout-sl-ev-fieldnote .sl-ev-fnmeta i{width:10px;height:10px;border-radius:50%;background:var(--accent,#2F5EA7);display:block}
.layout-sl-ev-fieldnote .sl-ev-fnimg{position:absolute;left:74px;right:74px;top:474px;bottom:250px;z-index:1;overflow:hidden;border:1px solid #C9C3B4}
.layout-sl-ev-fieldnote .sl-ev-fnimg img{width:100%;height:100%;object-fit:cover;display:block;filter:contrast(1.02) saturate(.97)}

/* ============================================================
   Signal 编辑网格封面族 sl-cv（statement 大字 / figure 数据主角 / grid 截图证据）
   学《静野》图块网格+留白+多层次、《蓝羽毛》大字冷调；奶白档案纸 + 电蓝点睛 + 套准 + 账本栏 + VERIFIED；中性化、巨数 tabular。配方=SIGNAL-LANGUAGE.md。
   ============================================================ */
.layout-sl-cv{position:relative;background:var(--bg,#F7F6F2);color:#15181D;overflow:hidden;display:block;padding:0;isolation:isolate;font-family:"Helvetica Neue","PingFang SC",system-ui,sans-serif;background-image:repeating-linear-gradient(0deg,rgba(40,38,32,.013) 0 1px,transparent 1px 7px)}
.layout-sl-cv .sl-cv-reg{position:absolute;width:22px;height:22px;z-index:5}
.layout-sl-cv .sl-cv-reg::before,.layout-sl-cv .sl-cv-reg::after{content:"";position:absolute;background:var(--accent,#2F5EA7)}
.layout-sl-cv .sl-cv-reg::before{left:50%;top:0;width:1px;height:100%;transform:translateX(-.5px)}
.layout-sl-cv .sl-cv-reg::after{top:50%;left:0;height:1px;width:100%;transform:translateY(-.5px)}
.layout-sl-cv .sl-cv-reg.tl{left:30px;top:30px}.layout-sl-cv .sl-cv-reg.tr{right:30px;top:30px}
.layout-sl-cv .sl-cv-reg.bl{left:30px;bottom:30px}.layout-sl-cv .sl-cv-reg.br{right:30px;bottom:30px}
.layout-sl-cv .sl-cv-mast{position:absolute;left:74px;right:74px;top:74px;display:flex;justify-content:space-between;align-items:center;z-index:4}
.layout-sl-cv .sl-cv-mk{display:flex;align-items:center;gap:14px}
.layout-sl-cv .sl-cv-mk i{width:34px;height:15px;background:var(--accent,#2F5EA7);display:block}
.layout-sl-cv .sl-cv-brand{font-weight:700;letter-spacing:.06em;font-size:20px}
.layout-sl-cv .sl-cv-sect{font-family:Menlo,"SF Mono",monospace;font-size:17px;letter-spacing:.13em;text-transform:uppercase;color:#6C7580}
.layout-sl-cv .sl-cv-iss{font-family:Menlo,"SF Mono",monospace;font-size:17px;letter-spacing:.1em;color:#6C7580;border:1.5px solid #15181D;padding:6px 13px}
.layout-sl-cv .sl-cv-rule{position:absolute;left:74px;right:74px;top:128px;height:2px;background:#15181D;z-index:4}
.layout-sl-cv .sl-cv-botline{position:absolute;left:74px;right:74px;bottom:182px;height:1px;background:#D9DCE2;z-index:4}
.layout-sl-cv .sl-cv-credit{position:absolute;left:74px;bottom:132px;font-family:Menlo,monospace;font-size:14px;letter-spacing:.16em;text-transform:uppercase;color:rgba(21,24,29,.45);z-index:4}
.layout-sl-cv .sl-cv-stamp{position:absolute;right:74px;bottom:64px;width:76px;height:76px;transform:rotate(-8deg);color:var(--accent,#2F5EA7);z-index:4}
.layout-sl-cv .sl-cv-stamp svg{width:100%;height:100%}
.layout-sl-cv .sl-cv-ledger{position:absolute;left:74px;right:74px;top:1000px;z-index:4;display:grid;grid-template-columns:repeat(3,1fr);border-top:2px solid #15181D}
.layout-sl-cv .sl-cv-ledger .lrow{display:flex;flex-direction:column;padding:24px 22px 0 0}
.layout-sl-cv .sl-cv-ledger .lrow + .lrow{border-left:1px solid #D9DCE2;padding-left:34px}
.layout-sl-cv .sl-cv-ledger .n{font-family:Menlo,monospace;font-size:13px;letter-spacing:.12em;color:var(--accent,#2F5EA7);margin-bottom:8px}
.layout-sl-cv .sl-cv-ledger .v{font-family:"Helvetica Neue",sans-serif;font-weight:800;font-size:50px;letter-spacing:-.012em;font-variant-numeric:tabular-nums;line-height:1}
.layout-sl-cv .sl-cv-ledger .k{font-size:16px;color:#6C7580;margin-top:9px;letter-spacing:.02em}
.layout-sl-cv .sl-cv-ledger .w{font-size:38px;font-weight:800;letter-spacing:.02em;line-height:1}
.layout-sl-cv .sl-cv-ledger .d{font-size:15px;color:#6C7580;margin-top:11px;letter-spacing:.02em;line-height:1.4}
/* statement 大字主张（纯文字最高频） */
.layout-sl-cv-statement .sl-cv-claim{position:absolute;left:74px;right:74px;top:212px;z-index:3}
.layout-sl-cv-statement .sl-cv-claim .no{position:absolute;right:0;top:4px;font-weight:800;font-size:64px;color:#D9DCE2;letter-spacing:-.02em}
.layout-sl-cv-statement .sl-cv-claim h1{font-size:128px;font-weight:800;letter-spacing:-.02em;line-height:1.02}
.layout-sl-cv-statement .sl-cv-claim h1 strong{color:var(--accent,#2F5EA7);font-weight:inherit}
.layout-sl-cv-statement .sl-cv-claim .en{font-family:"Hoefler Text","Iowan Old Style",Georgia,serif;font-style:italic;font-size:30px;letter-spacing:.01em;color:#6C7580;margin-top:26px}
.layout-sl-cv-statement .sl-cv-lead{position:absolute;left:74px;right:300px;top:716px;z-index:3}
.layout-sl-cv-statement .sl-cv-lead .bar{width:46px;height:4px;background:var(--accent,#2F5EA7);margin-bottom:26px}
.layout-sl-cv-statement .sl-cv-lead p{font-size:42px;font-weight:600;line-height:1.5;letter-spacing:.005em}
.layout-sl-cv-statement .sl-cv-lead p strong{color:var(--accent,#2F5EA7);font-weight:inherit}
/* figure 数据主角（有数据复盘） */
.layout-sl-cv-figure .sl-cv-fhead{position:absolute;left:74px;right:160px;top:170px;z-index:3}
.layout-sl-cv-figure .sl-cv-fhead h1{font-size:50px;font-weight:800;letter-spacing:-.01em;line-height:1.18}
.layout-sl-cv-figure .sl-cv-fhead h1 strong{color:var(--accent,#2F5EA7);font-weight:inherit}
.layout-sl-cv-figure .sl-cv-fhead .no{position:absolute;right:-86px;top:0;font-weight:800;font-size:64px;color:#D9DCE2;letter-spacing:-.02em}
.layout-sl-cv-figure .sl-cv-hero{position:absolute;left:74px;right:74px;top:360px;height:512px;z-index:3;display:flex;align-items:stretch;gap:24px}
.layout-sl-cv-figure .sl-cv-hero .fig{flex:1.5;display:flex;flex-direction:column;justify-content:center;border-top:2px solid #15181D}
.layout-sl-cv-figure .sl-cv-hero .fig .lbl{font-family:Menlo,monospace;font-size:16px;letter-spacing:.13em;text-transform:uppercase;color:#6C7580;margin-top:22px}
.layout-sl-cv-figure .sl-cv-hero .fig .big{font-family:"Helvetica Neue",sans-serif;font-weight:800;font-size:236px;letter-spacing:-.03em;line-height:.9;font-variant-numeric:tabular-nums;color:var(--accent,#2F5EA7);margin-top:6px}
.layout-sl-cv-figure .sl-cv-hero .fig .cap{font-size:20px;color:#6C7580;margin-top:18px;letter-spacing:.01em}
.layout-sl-cv-figure .sl-cv-hero .fig .cap strong{color:#15181D;font-weight:700}
.layout-sl-cv-figure .sl-cv-hero .tr{flex:1;border:1px solid #C9C3B4;background:var(--bg,#F7F6F2);padding:26px 26px 22px;display:flex;flex-direction:column}
.layout-sl-cv-figure .sl-cv-hero .tr .lbl{font-family:Menlo,monospace;font-size:13px;letter-spacing:.13em;text-transform:uppercase;color:#6C7580}
.layout-sl-cv-figure .sl-cv-hero .tr svg{width:100%;flex:1;display:block;margin-top:10px}
.layout-sl-cv-figure .sl-cv-hero .tr .axis{display:flex;justify-content:space-between;font-family:Menlo,monospace;font-size:13px;color:#6C7580;margin-top:8px}
/* grid 截图证据（有真截图） */
.layout-sl-cv-grid .sl-cv-ghead{position:absolute;left:74px;right:74px;top:176px;z-index:3}
.layout-sl-cv-grid .sl-cv-ghead h1{font-size:108px;font-weight:800;letter-spacing:-.012em;line-height:1.0}
.layout-sl-cv-grid .sl-cv-ghead h1 strong{color:var(--accent,#2F5EA7);font-weight:inherit}
.layout-sl-cv-grid .sl-cv-ghead .no{position:absolute;right:0;top:6px;font-weight:800;font-size:64px;color:#D9DCE2;letter-spacing:-.02em}
.layout-sl-cv-grid .sl-cv-ghead .gsub{display:flex;align-items:baseline;gap:18px;margin-top:22px}
.layout-sl-cv-grid .sl-cv-ghead .gsub .en{font-family:"Hoefler Text","Iowan Old Style",Georgia,serif;font-style:italic;font-size:30px;color:#15181D}
.layout-sl-cv-grid .sl-cv-ghead .gsub .zh{font-family:Menlo,monospace;font-size:16px;letter-spacing:.12em;text-transform:uppercase;color:#6C7580}
.layout-sl-cv-grid .sl-cv-band{position:absolute;left:74px;right:74px;top:454px;height:506px;z-index:3;display:flex;gap:16px}
.layout-sl-cv-grid .sl-cv-band .ev{flex:2.15;position:relative;border:1px solid #C9C3B4;overflow:hidden;background:#0e1624}
.layout-sl-cv-grid .sl-cv-band .ev img{width:100%;height:100%;object-fit:cover;object-position:60% 36%;filter:url(#sl-cv-duo) contrast(1.06);display:block}
.layout-sl-cv-grid .sl-cv-band .ev .half{position:absolute;inset:0;opacity:.16;mix-blend-mode:overlay;background-image:radial-gradient(circle,#fff 1px,transparent 1.4px);background-size:7px 7px}
.layout-sl-cv-grid .sl-cv-band .ev .tag{position:absolute;left:0;bottom:0;background:rgba(10,14,24,.5);color:#fff;font-family:Menlo,monospace;font-size:14px;letter-spacing:.16em;text-transform:uppercase;padding:8px 14px}
.layout-sl-cv-grid .sl-cv-band .ev .crop{position:absolute;right:14px;top:14px;width:18px;height:18px}
.layout-sl-cv-grid .sl-cv-band .ev .crop::before,.layout-sl-cv-grid .sl-cv-band .ev .crop::after{content:"";position:absolute;background:rgba(255,255,255,.7)}
.layout-sl-cv-grid .sl-cv-band .ev .crop::before{right:0;top:0;width:1px;height:100%}.layout-sl-cv-grid .sl-cv-band .ev .crop::after{top:0;right:0;height:1px;width:100%}
.layout-sl-cv-grid .sl-cv-band .tr{flex:1;border:1px solid #C9C3B4;background:var(--bg,#F7F6F2);padding:24px 24px 20px;display:flex;flex-direction:column}
.layout-sl-cv-grid .sl-cv-band .tr .lbl{font-family:Menlo,monospace;font-size:13px;letter-spacing:.13em;text-transform:uppercase;color:#6C7580}
.layout-sl-cv-grid .sl-cv-band .tr svg{width:100%;flex:1;display:block;margin-top:6px}
.layout-sl-cv-grid .sl-cv-band .tr .big{font-family:"Helvetica Neue",sans-serif;font-weight:800;font-size:46px;letter-spacing:-.01em;font-variant-numeric:tabular-nums;line-height:1}
.layout-sl-cv-grid .sl-cv-band .tr .big .up{color:var(--accent,#2F5EA7);font-size:22px;font-weight:700;margin-left:4px}
.layout-sl-cv-grid .sl-cv-band .tr .cap{font-size:14px;color:#6C7580;margin-top:6px}

/* ============================================================
   Bridge Canvas · 标题穿插主体 bc-weave — 满铺雾景/孤身人影 + 标题上下两段绕主体穿插 + 竖排短句 + 宋体/楷体。
   calm 雾感 register（对标 calm 雾感视觉方向，比 noir 更静）。font:"kai" → 楷体书法声部。
   ============================================================ */
.layout-bc-weave{position:relative;background:#0A0B0D;overflow:hidden;display:block;padding:0;isolation:isolate;color:#F6F2EA;--bc-gold:#E5C07A}
.layout-bc-weave .bc-img{position:absolute;inset:0;z-index:0}
.layout-bc-weave .bc-img img{width:100%;height:100%;object-fit:cover;object-position:center 46%;filter:contrast(1.05) saturate(.9) brightness(.92)}
/* 雾感 scrim：上下轻压、中段留白给主体（不重压、保 misty 通透） */
.layout-bc-weave .bc-mist{position:absolute;inset:0;z-index:1;pointer-events:none;
  background:linear-gradient(180deg, rgba(8,10,14,.62) 0%, rgba(8,10,14,.14) 20%, transparent 40%, transparent 56%, rgba(8,10,14,.34) 76%, rgba(8,10,14,.74) 100%)}
.layout-bc-weave .bc-grain{position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.06;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150'><filter id='bwg'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='150' height='150' filter='url(%23bwg)'/></svg>");background-size:220px 220px}
.layout-bc-weave .bc-mast{position:absolute;top:80px;left:80px;right:80px;z-index:5;display:flex;justify-content:space-between;align-items:baseline;
  font-family:"DIN Condensed","Gill Sans","Helvetica Neue",sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.34em;font-size:21px;color:rgba(246,242,234,.82)}
.layout-bc-weave .bc-mast .bc-idx{font-family:Menlo,"SF Mono",monospace;letter-spacing:.12em;font-weight:400;font-size:18px;color:rgba(246,242,234,.6)}
.layout-bc-weave .bc-spine{position:absolute;top:50%;right:78px;transform:translateY(-50%);z-index:5;writing-mode:vertical-rl;text-orientation:upright;
  font-family:"Songti SC","Source Han Serif SC",serif;letter-spacing:.5em;font-size:22px;color:rgba(246,242,234,.6)}
.layout-bc-weave .bc-weave-top{position:absolute;left:80px;right:160px;top:158px;z-index:5}
.layout-bc-weave .bc-weave-bot{position:absolute;left:80px;right:120px;bottom:150px;z-index:5}
.layout-bc-weave .bc-h{font-family:"Songti SC","Source Han Serif SC","Noto Serif CJK SC",serif;font-size:96px;line-height:1.14;font-weight:600;letter-spacing:.06em;color:#fff;text-shadow:0 2px 30px rgba(0,0,0,.55),0 1px 3px rgba(0,0,0,.55);margin:0}
.layout-bc-weave .bc-h strong{color:var(--bc-gold);font-weight:inherit}
.layout-bc-weave.bc-font-kai .bc-h{font-family:"Kaiti SC","STKaiti","Songti SC",serif;letter-spacing:.08em;font-weight:400}
.layout-bc-weave .bc-kline{font-family:"DIN Condensed","Gill Sans",sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.3em;font-size:18px;color:var(--bc-gold);margin-bottom:18px}
.layout-bc-weave .bc-en{margin-top:22px;font-family:"Hoefler Text","Iowan Old Style",Baskerville,Georgia,serif;font-style:italic;font-size:30px;line-height:1.34;letter-spacing:.02em;color:rgba(246,242,234,.86)}
.layout-bc-weave .bc-foot{position:absolute;left:80px;right:80px;bottom:74px;z-index:5;display:flex;justify-content:space-between;
  font-family:Menlo,"SF Mono",monospace;text-transform:uppercase;letter-spacing:.2em;font-size:14px;color:rgba(246,242,234,.5)}
.poster.square.layout-bc-weave .bc-h{font-size:72px}
.poster.square.layout-bc-weave .bc-weave-top{top:130px}
.poster.wide.layout-bc-weave .bc-h{font-size:74px}
.poster.wide.layout-bc-weave .bc-weave-bot{right:auto;width:1480px}
/* 雾感更多构图（走通用 sp-var，engine 零改）：quiet=标题沉底角·大留白(calm 沉底构图) / vertical=竖排卷轴 */
.sp-var-quiet.layout-bc-weave .bc-weave-top{display:none}
.sp-var-quiet.layout-bc-weave .bc-weave-bot{bottom:120px;right:44%}
.sp-var-quiet.layout-bc-weave .bc-h{font-size:84px}
.sp-var-quiet.layout-bc-weave .bc-mist{background:linear-gradient(180deg, rgba(8,10,14,.5) 0%, transparent 30%, transparent 52%, rgba(8,10,14,.84) 100%)}
.sp-var-vertical.layout-bc-weave .bc-weave-top,.sp-var-vertical.layout-bc-weave .bc-spine,.sp-var-vertical.layout-bc-weave .bc-kline,.sp-var-vertical.layout-bc-weave .bc-en{display:none}
.sp-var-vertical.layout-bc-weave .bc-weave-bot{top:140px;bottom:auto;left:auto;right:84px;width:auto}
.sp-var-vertical.layout-bc-weave .bc-h{writing-mode:vertical-rl;text-orientation:upright;font-size:82px;letter-spacing:.2em;line-height:1.08}
.sp-var-vertical.layout-bc-weave .bc-mist{background:linear-gradient(90deg, transparent 40%, rgba(8,10,14,.5) 100%),linear-gradient(180deg, rgba(8,10,14,.55) 0%, transparent 26%, transparent 100%)}

/* Bridge 冷 misty 主题色预设（bc-cool）：图去饱和、雾/暗场偏冷蓝灰，贴 muted 冷调视觉方向 */
.bc-cool.layout-bc-weave .bc-img img{filter:grayscale(.26) contrast(1.04) brightness(.9) saturate(.66)}
.bc-cool.layout-bc-noir .bc-img img{filter:grayscale(.3) contrast(1.1) brightness(.58) saturate(.6)}
.bc-cool.layout-bc-weave .bc-mist{background:linear-gradient(180deg, rgba(20,28,36,.62) 0%, rgba(20,28,36,.14) 20%, transparent 40%, transparent 56%, rgba(18,26,34,.36) 76%, rgba(14,21,29,.8) 100%)}
.bc-cool.layout-bc-noir .bc-veil{background:radial-gradient(122% 92% at 50% 30%, rgba(0,0,0,0) 0%, rgba(14,20,28,.3) 46%, rgba(12,18,26,.74) 78%, rgba(9,14,20,.93) 100%),linear-gradient(180deg, rgba(12,18,26,.72) 0%, rgba(12,18,26,.12) 25%, rgba(12,18,26,.2) 52%, rgba(9,14,20,.9) 100%)}
.bc-cool.layout-bc-split{--bc-gold:#7E9AAA}
.bc-cool.layout-bc-split .bc-band .bc-img img{filter:contrast(1.04) saturate(.7) brightness(.96)}

/* ============================================================
   Signal · 图+数据 split sl-cover-split — 证据图 band(顶，主题色 duotone+半调) + 宣言句 + 折线趋势 + 数据行。对标证据图+折线视觉方向。light+dark 双 register。
   ============================================================ */
.layout-sl-cover-split .sl-split-img{position:absolute;left:0;right:0;top:0;height:44%;overflow:hidden;z-index:0;background:var(--dark,#101317)}
.layout-sl-cover-split .sl-split-imgi{position:absolute;inset:0;overflow:hidden}
/* 配图作背景氛围：模糊化 + 压暗，让证据图不抢标题/正文（代码字别干扰；用软抽象图） */
.layout-sl-cover-split .sl-split-imgi img{width:100%;height:100%;object-fit:cover;object-position:center 44%;filter:url(#sl-duo) blur(3px) contrast(1.04) brightness(.78) saturate(.92);transform:scale(1.08)}
.layout-sl-cover-split .sl-split-half{position:absolute;inset:0;pointer-events:none;opacity:.14;mix-blend-mode:overlay;background-image:radial-gradient(circle,#fff 1px,transparent 1.5px);background-size:7px 7px}
.layout-sl-cover-split .sl-split-img::after{content:"";position:absolute;left:0;right:0;bottom:0;height:120px;background:linear-gradient(180deg,transparent,var(--bg))}
.layout-sl-cover-split .sl-split-tag{position:absolute;left:74px;bottom:24px;z-index:2;font-family:Menlo,"SF Mono",monospace;font-size:14px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.86);background:rgba(0,0,0,.32);padding:5px 10px}
.layout-sl-cover-split .sl-head .sl-eyebrow,.layout-sl-cover-split .sl-head .sl-token{color:#fff;border-color:rgba(255,255,255,.62)}
/* board 标签压在暗图上要读得清（原 muted 灰看不清，评审标注） */
.layout-sl-cover-split .sl-head .sl-board{color:rgba(255,255,255,.8);text-shadow:0 1px 6px rgba(0,0,0,.5)}
.layout-sl-cover-split .sl-rule{background:rgba(255,255,255,.5)}
.layout-sl-cover-split .sl-stitle{position:absolute;left:74px;right:74px;top:calc(44% + 44px);z-index:2;font-family:var(--font-display);font-size:82px;font-weight:800;line-height:1.06;letter-spacing:-.035em;color:var(--fg)}
/* 中文风格化：accent 关键句给设计感高亮下划线（克制，不发散） */
.layout-sl-cover-split .sl-stitle .em,.layout-sl-cover-split .sl-stitle strong{color:var(--accent);font-weight:inherit;box-shadow:inset 0 -.13em 0 color-mix(in srgb,var(--accent),transparent 74%)}
.layout-sl-cover-split .sl-split-data{position:absolute;left:74px;right:74px;bottom:138px;z-index:2}
.layout-sl-cover-split .sl-spark-wrap{position:relative;margin-bottom:24px}
.layout-sl-cover-split .sl-spark{width:100%;height:132px;display:block}
.layout-sl-cover-split .sl-spark-area{fill:var(--accent);opacity:.13}
.layout-sl-cover-split .sl-spark-line{fill:none;stroke:var(--accent);stroke-width:3;stroke-linejoin:round;stroke-linecap:round}
.layout-sl-cover-split .sl-spark-dot{fill:var(--accent)}
.layout-sl-cover-split .sl-trend{position:absolute;right:0;top:-6px;font-family:Menlo,"SF Mono",monospace;font-size:30px;font-weight:700;color:var(--accent);font-variant-numeric:tabular-nums}
.layout-sl-cover-split .sl-srow{display:grid;grid-template-columns:46px 1fr auto;align-items:baseline;column-gap:18px;padding:17px 0;border-top:1px solid var(--line)}
.layout-sl-cover-split .sl-srow:last-child{border-bottom:1px solid var(--line)}
.layout-sl-cover-split .sl-srn{font-family:Menlo,"SF Mono",monospace;font-size:16px;color:var(--accent);font-weight:700;font-variant-numeric:tabular-nums}
.layout-sl-cover-split .sl-srl{font-size:27px;font-weight:600;color:var(--fg)}
.layout-sl-cover-split .sl-srv{font-family:Menlo,"SF Mono",monospace;font-size:34px;font-weight:700;color:var(--fg);font-variant-numeric:tabular-nums}
.poster.square.layout-sl-cover-split .sl-split-img{height:40%}
.poster.square.layout-sl-cover-split .sl-stitle{top:calc(40% + 46px);font-size:44px}
.poster.wide.layout-sl-cover-split .sl-split-img{height:54%}
.poster.wide.layout-sl-cover-split .sl-stitle{top:calc(54% + 40px)}

@media print{.layout-sp-c01,.layout-sp-c02,.layout-sl-c01,.layout-sl-c02{box-shadow:none}}


/* ============================================================
   SP-WS Still Paper / Warm Study — 6 absolute-zone skeletons
   Ported 1:1 from local-tests master px coordinates.
   .sp-paper = shared paper base for all 6 skeletons.
   ============================================================ */
.sp-paper{display:block;padding:0;position:relative;overflow:hidden;isolation:isolate;
  background:var(--sp-paper-bg,
    radial-gradient(ellipse 85% 60% at 18% 12%, rgba(208,186,150,.14), transparent 55%),
    radial-gradient(ellipse 70% 50% at 86% 84%, rgba(168,132,98,.09), transparent 55%),
    radial-gradient(ellipse 50% 40% at 60% 50%, rgba(241,234,217,.4), transparent 70%),
    repeating-linear-gradient(0deg, rgba(43,38,34,.022) 0 1px, transparent 1px 3px),
    repeating-linear-gradient(90deg, rgba(43,38,34,.015) 0 1px, transparent 1px 4px),
    linear-gradient(165deg,#F3ECDC,#EFE6D2 60%,#E9DEC8));
  color:var(--ink);font-family:var(--sp-label)}
.sp-paper::before{content:"";position:absolute;inset:0;pointer-events:none;z-index:6;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/><feColorMatrix type='saturate' values='0'/></filter><rect width='150' height='150' filter='url(%23n)' opacity='0.6'/></svg>");
  background-size:190px 190px;opacity:.06;mix-blend-mode:multiply}
/* haze 散焦氛围 register（2026 趋势·影像吸睛）：图 blur+压暗+去饱和成 cinematic 情绪底，字浮其上 + 颗粒。
   仅满铺压字封面 opt-in（grade:"haze"），勿用于图集/截图（会糊掉内容） */
.sp-grade-haze img{filter:blur(7px) brightness(.58) saturate(.5) contrast(1.08) !important;transform:scale(1.1) !important}
.sp-grade-haze .gh-veil,.sp-grade-haze .veil{background:linear-gradient(to top,rgba(16,11,8,.7) 0%,rgba(16,11,8,.42) 38%,rgba(16,11,8,.24) 100%)}
.sp-grade-haze::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:5;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='hz'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix type='saturate' values='0'/></filter><rect width='120' height='120' filter='url(%23hz)' opacity='0.5'/></svg>");
  background-size:150px 150px;opacity:.12;mix-blend-mode:overlay}
/* 多面纸色：warm 系内浅(3)/中(base)/深(2)三档纸调，组图轮换形成"纸张批次感"，仅在无 inline --sp-paper-bg 的主题(warm)生效，night 不受影响 */
.sp-tone-2{--sp-paper-bg:radial-gradient(ellipse 85% 60% at 18% 12%,rgba(206,180,138,.16),transparent 55%),radial-gradient(ellipse 70% 50% at 86% 84%,rgba(166,128,92,.11),transparent 55%),radial-gradient(ellipse 50% 40% at 60% 50%,rgba(238,228,205,.4),transparent 70%),repeating-linear-gradient(0deg,rgba(43,38,34,.022) 0 1px,transparent 1px 3px),repeating-linear-gradient(90deg,rgba(43,38,34,.015) 0 1px,transparent 1px 4px),linear-gradient(165deg,#F0E5C8,#EADFBC 60%,#E1D2AC)}
.sp-tone-3{--sp-paper-bg:radial-gradient(ellipse 85% 60% at 18% 12%,rgba(212,196,162,.12),transparent 55%),radial-gradient(ellipse 70% 50% at 86% 84%,rgba(180,160,130,.07),transparent 55%),radial-gradient(ellipse 50% 40% at 60% 50%,rgba(246,240,228,.45),transparent 70%),repeating-linear-gradient(0deg,rgba(43,38,34,.020) 0 1px,transparent 1px 3px),repeating-linear-gradient(90deg,rgba(43,38,34,.014) 0 1px,transparent 1px 4px),linear-gradient(165deg,#F7F1E2,#F2EBD9 60%,#ECE3CF)}

/* 重音排版（当代吸睛）：静纸标题 / 引言 / 核心词内 **强调** 关键词朱砂点睛，让单条标题"会演戏"——关键词从标题里跳出来，单行内有轻重戏剧对比 */
.sp-paper h2 strong,.sp-paper .title strong,.sp-paper .quote strong,.sp-paper .kword strong{color:var(--zhu);font-weight:inherit}
/* shared top bar (栏目章 + 刊号/页码) */
.sp-paper .sp-top{position:absolute;left:96px;right:96px;top:80px;display:flex;justify-content:space-between;align-items:flex-start;z-index:3}
.sp-paper .sp-kicker{display:flex;align-items:flex-start;gap:12px}
.sp-paper .sp-dot{width:11px;height:11px;background:var(--zhu);margin-top:4px}
.sp-paper .sp-kicker .en{font-family:var(--sp-label);font-size:18px;letter-spacing:.26em;font-weight:700;color:var(--li)}
.sp-paper .sp-kicker .cn{font-family:var(--sp-display);font-size:19px;letter-spacing:.16em;color:var(--dai);margin-top:9px}
.sp-paper .sp-issue{font-family:var(--sp-label);border:1px solid var(--tuo);padding:8px 16px;font-size:15px;letter-spacing:.16em;color:var(--li);font-variant-numeric:tabular-nums}
.sp-paper .sp-page{font-family:var(--sp-label);font-size:15px;letter-spacing:.16em;color:var(--li);font-variant-numeric:tabular-nums}
.sp-paper .sp-rule-top{position:absolute;left:96px;right:96px;top:160px;height:1px;background:var(--line);z-index:3}

/* shared footer system — 发丝线 = footer border-top + padding (印章不压线) */
.sp-paper .sp-footer{position:absolute;left:96px;right:96px;bottom:62px;z-index:3;
  display:flex;align-items:center;justify-content:space-between;
  border-top:1px solid var(--line);padding-top:30px}
.sp-paper .sp-footer .note{font-family:var(--sp-label);font-size:16px;letter-spacing:.15em;color:var(--dai)}
.sp-paper .sp-footer .note .en{font-weight:500;color:var(--li)}
.sp-paper .sp-footer .note .cn{font-family:var(--sp-display);letter-spacing:.10em}
.sp-paper .sp-seal{width:50px;height:50px;flex:none;border:2px solid var(--zhu);border-radius:2px;
  display:flex;align-items:center;justify-content:center;background:rgba(181,72,47,.06)}
.sp-paper .sp-seal span{font-family:var(--sp-display);font-size:25px;font-weight:600;color:var(--zhu);line-height:1}

/* footer split variant (发丝线在容器上方独立 + 左 note + 右下印章), for body pages */
.sp-paper .sp-rule-foot{position:absolute;left:96px;right:206px;bottom:122px;height:1px;background:var(--line);z-index:3}
.sp-paper .sp-foot{position:absolute;left:96px;bottom:70px;z-index:3;font-family:var(--sp-label);font-size:16px;letter-spacing:.15em;color:var(--dai)}
.sp-paper .sp-foot .en{font-weight:500;color:var(--li)}
.sp-paper .sp-foot .cn{font-family:var(--sp-display);letter-spacing:.10em}
.sp-paper .sp-seal-abs{position:absolute;right:96px;bottom:46px;width:54px;height:54px;border:2px solid var(--zhu);border-radius:2px;
  display:flex;align-items:center;justify-content:center;background:rgba(181,72,47,.05);z-index:4}
.sp-paper .sp-seal-abs span{font-family:var(--sp-display);font-size:26px;font-weight:600;color:var(--zhu);line-height:1}

/* 东方底字 (留白平衡锚点) */
.sp-paper .sp-bigchar{position:absolute;z-index:1;pointer-events:none;
  font-family:var(--sp-display);font-weight:500;color:var(--li);opacity:.06}

/* 中文专业排版兜底 */
.sp-paper .body{line-break:strict;text-wrap:pretty;text-spacing-trim:space-first}
.sp-paper .keep{white-space:nowrap}

/* ---- 骨架 A 图为主角 (cover-photo, master: recipe-test-01) ---- */
.layout-sp-ws-cover-photo .sp-title-wrap{position:absolute;left:96px;top:196px;width:900px;z-index:3}
.layout-sp-ws-cover-photo .title{font-family:var(--sp-display);font-size:94px;line-height:1.22;font-weight:500;letter-spacing:.02em;color:var(--ink)}
.layout-sp-ws-cover-photo .title-en{margin-top:22px;font-family:var(--sp-latin);font-size:26px;letter-spacing:.02em;font-weight:400;font-style:italic;color:var(--tuo);text-transform:none}
.layout-sp-ws-cover-photo .lead{position:absolute;left:96px;top:528px;width:640px;z-index:3;
  font-family:var(--sp-body);font-size:28px;line-height:1.82;font-weight:400;color:var(--dai);
  line-break:strict;text-spacing-trim:space-first}
.layout-sp-ws-cover-photo .hero{position:absolute;left:0;right:0;top:712px;bottom:158px;overflow:hidden;z-index:2;background:#8a6b4d}
.layout-sp-ws-cover-photo .hero img{width:100%;height:100%;object-fit:cover;object-position:center 42%;
  filter:saturate(.74) sepia(.07) brightness(1.0) contrast(1.04);display:block}

/* ---- 骨架 B 图井 (cover-well, master: cover-draft-06) ---- */
.layout-sp-ws-cover-well .sp-title-wrap{position:absolute;left:96px;top:224px;width:860px;z-index:3}
.layout-sp-ws-cover-well .title{font-family:var(--sp-display);font-size:85px;line-height:1.24;font-weight:500;letter-spacing:.025em;color:var(--ink)}
.layout-sp-ws-cover-well .title-en{margin-top:20px;font-family:var(--sp-latin);font-size:25px;letter-spacing:.02em;font-weight:400;font-style:italic;color:var(--tuo);text-transform:none}
.layout-sp-ws-cover-well .lead{position:absolute;left:98px;top:506px;width:590px;z-index:3;
  font-family:var(--sp-body);font-size:28px;line-height:1.8;font-weight:400;color:var(--dai);letter-spacing:.005em}
.layout-sp-ws-cover-well .wellcap{position:absolute;left:230px;top:700px;z-index:3;font-family:var(--sp-label);
  font-size:13px;letter-spacing:.22em;color:var(--tuo);text-transform:uppercase}
.layout-sp-ws-cover-well .well{position:absolute;left:230px;top:730px;right:0;bottom:196px;overflow:hidden;z-index:2;
  border-top-left-radius:2px;border-bottom-left-radius:2px;
  background:linear-gradient(150deg,#b79873,#8a6b4d 55%,#6e4b3a)}
.layout-sp-ws-cover-well .well img{width:100%;height:100%;object-fit:cover;object-position:center 46%;
  filter:saturate(.72) sepia(.08) brightness(.99) contrast(1.02);display:block}
.layout-sp-ws-cover-well .well::after{content:"";position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(105deg, rgba(243,236,220,.16), transparent 28%)}

/* ---- 封面母体 R01 满铺摄影·标题压图 (sp-var-bleed on cover-photo) ----
   行业共识(NN/g+Smashing+WCAG / D&AD 三分法 / Kinfolk·Monocle 刊物味 / 小红书质感为王):
   照片满铺整版 + masthead 报头压顶(暖墨顶 scrim) + 超大宋体标题落下三分压 floor-scrim + 页脚朱砂印压底。
   压图可读: 文字/底对比≥4.5:1(大字≥3:1), scrim ~50% 暖墨(非纯黑保暖调) floor-fade 底深顶透, 标题避焦点靠边留呼吸。
   engine 零改(posterOpen 拼 sp-var- 后缀通用); 仅 .sp-var-bleed 触发, 现有 photo 基线/已 accepted 封面零影响。 */
.sp-var-bleed.layout-sp-ws-cover-photo .hero{top:0;right:0;bottom:0;left:0;z-index:1;background:#3a2c20}
.sp-var-bleed.layout-sp-ws-cover-photo .hero img{object-position:center 46%;
  filter:saturate(.72) sepia(.08) brightness(.9) contrast(1.06)}
/* 双向 scrim: 顶压 masthead(0-24%) + 中段全透留照片(44-52%) + 底 floor-fade 压标题/页脚(64-100%) */
.sp-var-bleed.layout-sp-ws-cover-photo .hero::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:2;
  background:linear-gradient(180deg, rgba(26,21,17,.56) 0%, rgba(26,21,17,.18) 22%, transparent 44%,
    transparent 46%, rgba(20,15,11,.46) 60%, rgba(15,11,8,.74) 74%, rgba(11,8,5,.90) 100%)}
/* masthead 报头 → cream 压顶 scrim, 朱砂点保留点睛 */
.sp-var-bleed.layout-sp-ws-cover-photo .sp-top{top:84px}
.sp-var-bleed.layout-sp-ws-cover-photo .sp-kicker .en{color:var(--cream)}
.sp-var-bleed.layout-sp-ws-cover-photo .sp-kicker .cn{color:rgba(244,236,221,.86)}
.sp-var-bleed.layout-sp-ws-cover-photo .sp-issue{color:var(--cream);border-color:rgba(244,236,221,.5)}
.sp-var-bleed.layout-sp-ws-cover-photo .sp-rule-top{background:rgba(244,236,221,.3)}
/* 超大标题落下三分, cream 压 floor-scrim 镇场; 英文副题低调跟随 */
.sp-var-bleed.layout-sp-ws-cover-photo .sp-title-wrap{top:auto;bottom:238px;width:864px}
.sp-var-bleed.layout-sp-ws-cover-photo .title{color:var(--cream);font-size:92px;line-height:1.2;
  text-shadow:0 1px 2px rgba(8,6,4,.7), 0 2px 12px rgba(8,6,4,.55), 0 0 32px rgba(10,7,4,.4)}
.sp-var-bleed.layout-sp-ws-cover-photo .title-en{color:rgba(244,236,221,.82);margin-top:20px}
.sp-var-bleed.layout-sp-ws-cover-photo .lead{display:none}
/* 页脚 → cream 压底 floor-scrim; 朱砂印描 cream 边在暗底可读 */
.sp-var-bleed.layout-sp-ws-cover-photo .sp-footer{border-top-color:rgba(244,236,221,.32)}
.sp-var-bleed.layout-sp-ws-cover-photo .sp-footer .note{color:rgba(244,236,221,.8)}
.sp-var-bleed.layout-sp-ws-cover-photo .sp-footer .note .en{color:var(--cream)}
.sp-var-bleed.layout-sp-ws-cover-photo .sp-footer .note .cn{color:rgba(244,236,221,.9)}
.sp-var-bleed.layout-sp-ws-cover-photo .sp-seal{border-color:rgba(244,236,221,.68);background:rgba(181,72,47,.34)}
.sp-var-bleed.layout-sp-ws-cover-photo .sp-seal span{color:var(--cream)}

/* 独家影像配方 opt-in：Still Paper 照片暖墨 duotone(grayscale+强 sepia → 栗褐/驼 暖单色调)，把三语言影像签名统一(纸本暖调版)。
   仅 card.grade==="duo" 触发，默认/已 accepted 的 9 张零影响；只改 img filter，与 sp-var-bleed 的 scrim ::after 正交不冲突。 */
.sp-grade-duo.layout-sp-ws-cover-photo .hero img{filter:url(#sp-duo) contrast(1.04) brightness(.99)}
/* 多平台同源：R01 满铺压图跨 3:4 / 1:1 / 16:9，标题位/字阶随画幅适配 */
.poster.square.sp-var-bleed.layout-sp-ws-cover-photo .title{font-size:80px}
.poster.square.sp-var-bleed.layout-sp-ws-cover-photo .sp-title-wrap{bottom:202px}
.poster.wide.sp-var-bleed.layout-sp-ws-cover-photo .title{font-size:78px;white-space:nowrap}
.poster.wide.sp-var-bleed.layout-sp-ws-cover-photo .sp-title-wrap{bottom:150px;width:1200px}

/* ---- 封面母体 R04 标题文字版·无图大标题 (sp-ws-cover-statement) ----
   行业共识(typographic cover: scale=最强注意力工具 / serif+sans 层次≥3:1 / restraint 一两主色+干净几何+subtle texture / 小红书「标题文字版」痛点·悬念·数字×3):
   超大宋体标题镇场 + 东方底字(subtle texture + 签名锚点①) + 朱砂 accent bar + sans hook lead + 朱砂 pull 次钩。
   无图 → 不进 IMAGE_REQUIRED_LAYOUTS gate(解无图入口); 已 accepted 封面零影响。 */
.layout-sp-ws-cover-statement .sp-bigchar{right:-58px;top:300px;font-size:540px;line-height:.74;opacity:.055}
.layout-sp-ws-cover-statement .sp-title-wrap{position:absolute;left:96px;top:292px;width:864px;z-index:3}
.layout-sp-ws-cover-statement .sp-title-wrap::before{content:"";position:absolute;left:2px;top:-42px;width:76px;height:8px;background:var(--zhu)}
.layout-sp-ws-cover-statement .title{font-family:var(--sp-display);font-size:104px;line-height:1.18;font-weight:500;letter-spacing:.02em;color:var(--ink)}
.layout-sp-ws-cover-statement .title-en{margin-top:24px;font-family:var(--sp-latin);font-size:27px;letter-spacing:.02em;font-weight:400;font-style:italic;color:var(--tuo);text-transform:none}
.layout-sp-ws-cover-statement .lead{position:absolute;left:98px;top:768px;width:600px;z-index:3;
  font-family:var(--sp-body);font-size:30px;line-height:1.8;font-weight:400;color:var(--dai);
  line-break:strict;text-spacing-trim:space-first}
.layout-sp-ws-cover-statement .pull{position:absolute;left:96px;top:1044px;width:720px;z-index:3;padding-left:26px;border-left:4px solid var(--zhu)}
.layout-sp-ws-cover-statement .pull p{margin:0;font-family:var(--sp-display);font-size:44px;line-height:1.34;font-weight:500;color:var(--li)}

/* ---- 封面母体 R05 引言压图·quote hero (sp-ws-cover-quote) ----
   行业共识(quote poster: serif 引语主角 / 大号 stylized 引号装置 / ≤2-3 字体 / 引言封面情感感):
   满铺暖调氛围照片(darker) + 巨型朱砂引号 + 左对齐大字宋体引语(cream 压 scrim) + 小字署名。左对齐非对称(避居中 AI)。需图→进 IMAGE_REQUIRED gate。 */
.layout-sp-ws-cover-quote .hero{position:absolute;inset:0;z-index:1;background:#6e5640;overflow:hidden}
.layout-sp-ws-cover-quote .hero img{width:100%;height:100%;object-fit:cover;object-position:center 42%;
  filter:saturate(.7) sepia(.08) brightness(.82) contrast(1.05);display:block}
.layout-sp-ws-cover-quote .hero::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:2;
  background:linear-gradient(180deg, rgba(20,15,11,.5) 0%, transparent 24%, transparent 74%, rgba(15,11,8,.66) 100%),
    radial-gradient(ellipse 130% 66% at 46% 44%, rgba(18,13,9,.58), transparent 72%)}
.layout-sp-ws-cover-quote .qmark{position:absolute;left:78px;top:300px;z-index:3;
  font-family:var(--sp-display);font-size:210px;line-height:.7;font-weight:600;color:var(--zhu)}
.layout-sp-ws-cover-quote .quote{position:absolute;left:96px;top:472px;width:786px;margin:0;z-index:3;
  font-family:var(--sp-display);font-size:62px;line-height:1.44;font-weight:500;letter-spacing:.02em;color:var(--cream);
  text-shadow:0 2px 22px rgba(12,9,6,.5)}
.layout-sp-ws-cover-quote .attrib{position:absolute;left:98px;top:792px;z-index:3;
  font-family:var(--sp-label);font-size:22px;letter-spacing:.14em;color:rgba(244,236,221,.82)}
/* 满铺压图通用 cream chrome（masthead/footer），与 R01 bleed 同；固化时抽成 .sp-on-photo 共享 */
.layout-sp-ws-cover-quote .sp-top{top:84px}
.layout-sp-ws-cover-quote .sp-kicker .en{color:var(--cream)}
.layout-sp-ws-cover-quote .sp-kicker .cn{color:rgba(244,236,221,.86)}
.layout-sp-ws-cover-quote .sp-issue{color:var(--cream);border-color:rgba(244,236,221,.5)}
.layout-sp-ws-cover-quote .sp-rule-top{background:rgba(244,236,221,.3)}
.layout-sp-ws-cover-quote .sp-footer{border-top-color:rgba(244,236,221,.32)}
.layout-sp-ws-cover-quote .sp-footer .note{color:rgba(244,236,221,.8)}
.layout-sp-ws-cover-quote .sp-footer .note .en{color:var(--cream)}
.layout-sp-ws-cover-quote .sp-footer .note .cn{color:rgba(244,236,221,.9)}
.layout-sp-ws-cover-quote .sp-seal{border-color:rgba(244,236,221,.68);background:rgba(181,72,47,.34)}
.layout-sp-ws-cover-quote .sp-seal span{color:var(--cream)}

/* ---- 封面母体 R06 物件特写·居中框 (sp-ws-cover-object) ----
   行业共识(物件观察/specimen plate: 单主体特写 + 纸面框留白 + 极简标题 + 标本标签；Kinfolk/Cereal object study 克制):
   单物件照片入纸面双框(发丝线 specimen mount) + 标题左上 + condensed 标本标签。纸面主导、物件为主视觉、安静。需图→进 gate。 */
.layout-sp-ws-cover-object .sp-title-wrap{position:absolute;left:96px;top:198px;width:760px;z-index:3}
.layout-sp-ws-cover-object .title{font-family:var(--sp-display);font-size:60px;line-height:1.26;font-weight:500;letter-spacing:.02em;color:var(--ink)}
.layout-sp-ws-cover-object .title-en{margin-top:16px;font-family:var(--sp-latin);font-size:24px;letter-spacing:.02em;font-weight:400;font-style:italic;color:var(--tuo);text-transform:none}
.layout-sp-ws-cover-object .plate{position:absolute;left:170px;right:118px;top:404px;bottom:250px;z-index:2;margin:0;
  padding:14px;border:1px solid var(--line);background:rgba(255,252,245,.5)}
.layout-sp-ws-cover-object .plate-img{position:absolute;inset:14px;overflow:hidden;border:1px solid var(--line)}
.layout-sp-ws-cover-object .plate-img img{width:100%;height:100%;object-fit:cover;object-position:center 36%;
  filter:saturate(.72) sepia(.08) brightness(1.0) contrast(1.03);display:block}
.layout-sp-ws-cover-object .plate figcaption{position:absolute;left:2px;bottom:-36px;
  font-family:var(--sp-label);font-size:15px;letter-spacing:.2em;color:var(--tuo);text-transform:uppercase}

/* ---- 封面母体 R07 清单封面·编号脊柱 (sp-ws-cover-index) ----
   行业共识(清单/合集封面: 短清单做主视觉 + 编号脊柱建节奏 + 标题钩子；小红书合集/攻略；scale 层次):
   标题左上 + 3-5 项朱砂编号(左列朱砂数字=脊柱, 衬发丝线)+ serif 词目 + sans 注。无图→不进 gate(无图入口)。 */
.layout-sp-ws-cover-index .sp-title-wrap{position:absolute;left:96px;top:210px;width:800px;z-index:3}
.layout-sp-ws-cover-index .title{font-family:var(--sp-display);font-size:64px;line-height:1.26;font-weight:500;letter-spacing:.02em;color:var(--ink)}
.layout-sp-ws-cover-index .title-en{margin-top:16px;font-family:var(--sp-latin);font-size:24px;letter-spacing:.02em;font-weight:400;font-style:italic;color:var(--tuo);text-transform:none}
.layout-sp-ws-cover-index .ilist{position:absolute;left:96px;right:96px;top:486px;bottom:182px;z-index:3}
.layout-sp-ws-cover-index .ilist::before{content:"";position:absolute;left:20px;top:8px;bottom:34px;width:1px;background:var(--line)} /* 发丝线脊柱 */
.layout-sp-ws-cover-index .irow{position:relative;display:grid;grid-template-columns:96px 1fr;align-items:start;padding:0 0 40px}
.layout-sp-ws-cover-index .inum{font-family:var(--sp-display);font-size:32px;font-weight:600;color:var(--zhu);font-variant-numeric:tabular-nums;line-height:1;
  background:var(--gao);padding:2px 0 6px;margin-left:5px}
.layout-sp-ws-cover-index .iword{font-family:var(--sp-display);font-size:42px;font-weight:500;color:var(--ink);line-height:1.18}
.layout-sp-ws-cover-index .inote{font-family:var(--sp-body);font-size:25px;line-height:1.6;color:var(--dai);margin-top:10px}

/* ---- 封面母体 R08 数字索引·强对比 (sp-ws-cover-number) ----
   行业共识(小红书强对比/数字敏感度×3 / scale=最强注意力 / 盘点合集): 巨数字 hook 镇场(暖墨立骨,非朱砂—守朱砂≤2%) + 朱砂单位点睛 + 解释标题侧栏 + lead。强 scale 对比(数字 vs 文字≥5:1)。无图→不进 gate。 */
.layout-sp-ws-cover-number .bignum{position:absolute;left:40px;top:286px;z-index:3;
  font-family:var(--sp-display);font-size:452px;line-height:.78;font-weight:500;letter-spacing:-.02em;color:var(--ink);font-variant-numeric:lining-nums}
.layout-sp-ws-cover-number .numside{position:absolute;left:566px;top:388px;width:420px;z-index:3}
.layout-sp-ws-cover-number .numside .unit{font-family:var(--sp-display);font-size:88px;line-height:.9;font-weight:500;color:var(--zhu)} /* 朱砂点睛 */
.layout-sp-ws-cover-number .numside .title{font-family:var(--sp-display);font-size:50px;line-height:1.3;font-weight:500;letter-spacing:.02em;color:var(--ink);margin-top:14px}
.layout-sp-ws-cover-number .numside .title-en{margin-top:14px;font-family:var(--sp-latin);font-size:23px;letter-spacing:.02em;font-weight:400;font-style:italic;color:var(--tuo);text-transform:none}
.layout-sp-ws-cover-number .lead{position:absolute;left:96px;top:872px;width:780px;z-index:3;
  font-family:var(--sp-body);font-size:28px;line-height:1.8;font-weight:400;color:var(--dai);
  line-break:strict;text-spacing-trim:space-first}

/* ---- 观点段落 (body-essay, master: body-essay) ---- */
.layout-sp-ws-body-essay .sp-bigchar{right:-46px;top:404px;font-size:470px;line-height:.78}
.layout-sp-ws-body-essay .title{position:absolute;left:96px;top:210px;width:820px;z-index:3;
  font-family:var(--sp-display);font-size:92px;line-height:1.16;font-weight:500;letter-spacing:-.005em;color:var(--ink)}
.layout-sp-ws-body-essay .body{position:absolute;left:96px;top:470px;max-width:512px;z-index:3;
  font-family:var(--sp-body);font-size:28px;line-height:1.94;font-weight:400;color:#403A31;
  text-align:left}
.layout-sp-ws-body-essay .body p{margin:0 0 42px}
.layout-sp-ws-body-essay .body .em{color:var(--ink);font-weight:500;border-bottom:2px solid rgba(181,72,47,.4);padding-bottom:1px}
.layout-sp-ws-body-essay .pull{position:absolute;left:96px;top:1010px;width:760px;z-index:3;padding-left:26px;border-left:4px solid var(--zhu)}
.layout-sp-ws-body-essay .pull p{margin:0;font-family:var(--sp-display);font-size:44px;line-height:1.38;font-weight:500;color:var(--ink)}
/* 留白锚点③ 竖排批注（东方 edge rail，纯文字，不需图） */
.layout-sp-ws-body-essay .essay-rail{position:absolute;right:148px;top:502px;z-index:3;
  writing-mode:vertical-rl;text-orientation:upright;
  font-family:var(--sp-display);font-size:25px;letter-spacing:.26em;color:var(--tuo)}
.layout-sp-ws-body-essay .essay-rail span{position:relative;padding-top:36px}
.layout-sp-ws-body-essay .essay-rail span::before{content:"";position:absolute;top:0;left:50%;width:1px;height:24px;background:var(--tuo);transform:translateX(-50%);opacity:.7}
/* 留白锚点② 配图（右侧竖裁小图，有图时用） */
.layout-sp-ws-body-essay .essay-fig{position:absolute;right:96px;top:470px;width:288px;height:496px;overflow:hidden;z-index:2;border-radius:2px}
.layout-sp-ws-body-essay .essay-fig img{width:100%;height:100%;object-fit:cover;filter:saturate(.72) sepia(.08) contrast(1.02);display:block}
.layout-sp-ws-body-essay .essay-fig figcaption{position:absolute;left:12px;bottom:12px;font-family:var(--sp-label);font-size:14px;letter-spacing:.1em;color:#F4ECDD}
/* 版式变体：右重心·竖排批注 (sp-var-right) — 重心右移右对齐、底字镜像到左出血(填左侧留白+平衡右移文字)、批注移左叠在水印上。仅 essaySeen v===1 触发，首张/基线零影响 */
.sp-var-right.layout-sp-ws-body-essay .sp-bigchar{left:-46px;right:auto}
.sp-var-right.layout-sp-ws-body-essay .title{left:auto;right:96px;width:780px;text-align:right}
.sp-var-right.layout-sp-ws-body-essay .body{left:auto;right:96px;width:512px;max-width:512px;text-align:right}
.sp-var-right.layout-sp-ws-body-essay .pull{left:auto;right:96px;padding-left:0;padding-right:26px;border-left:none;border-right:4px solid var(--zhu);text-align:right}
.sp-var-right.layout-sp-ws-body-essay .essay-rail{right:auto;left:160px;top:470px}
/* 左栏发丝线脊柱：固定位贯穿左留白(y~232→1278)，rail 文字挂其上，左栏从"空"变"有结构的留白"，不随内容长短塌陷 */
.sp-var-right.layout-sp-ws-body-essay .essay-rail::before{content:"";position:absolute;left:-30px;top:-238px;width:1px;height:1046px;background:var(--line);z-index:1}

/* ---- 纸上清单 (body-list, master: body-p02) ---- */
.layout-sp-ws-body-list .title{position:absolute;left:96px;top:218px;width:840px;z-index:3;
  font-family:var(--sp-display);font-size:80px;line-height:1.16;font-weight:500;letter-spacing:-.005em;color:var(--ink)}
.layout-sp-ws-body-list .lead{position:absolute;left:98px;top:414px;width:660px;z-index:3;
  font-family:var(--sp-body);font-size:28px;line-height:1.8;font-weight:400;color:var(--dai)}
.layout-sp-ws-body-list .list{position:absolute;left:96px;right:96px;top:560px;z-index:3}
.layout-sp-ws-body-list .row{display:grid;grid-template-columns:118px 1fr;align-items:baseline;padding:34px 0;border-top:1px solid var(--line)}
.layout-sp-ws-body-list .row:last-child{border-bottom:1px solid var(--line)}
.layout-sp-ws-body-list .num{font-family:var(--sp-display);font-size:46px;font-weight:500;color:var(--zhu);font-variant-numeric:tabular-nums;line-height:1}
.layout-sp-ws-body-list .word{font-family:var(--sp-display);font-size:46px;font-weight:500;color:var(--ink);line-height:1.2;letter-spacing:-.005em}
.layout-sp-ws-body-list .rnote{font-family:var(--sp-body);font-size:26px;line-height:1.74;color:var(--dai);margin-top:14px}
.layout-sp-ws-body-list .closing{position:absolute;left:98px;bottom:180px;z-index:3;width:660px;
  font-family:var(--sp-display);font-size:30px;line-height:1.55;color:var(--li)}
/* 版式变体：两栏网格·圈点 (sp-var-grid) — 满版两栏、朱砂圈点数字、脱单列脊柱。仅 list listSeen v===1 且 items≥3 触发，单列基线零影响 */
.sp-var-grid.layout-sp-ws-body-list .list{display:grid;grid-template-columns:1fr 1fr;column-gap:44px;top:540px;bottom:196px;align-content:center;row-gap:60px}
.sp-var-grid.layout-sp-ws-body-list .row{grid-template-columns:72px 1fr;align-items:start;padding:36px 0 0}
.sp-var-grid.layout-sp-ws-body-list .row:last-child{border-bottom:none}
.sp-var-grid.layout-sp-ws-body-list .num{width:60px;height:60px;border:1.5px solid var(--zhu);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px}
.sp-var-grid.layout-sp-ws-body-list .word{font-size:38px;line-height:1.2}
.sp-var-grid.layout-sp-ws-body-list .rnote{font-size:26px;line-height:1.62;margin-top:12px}

/* ---- 暗面板 (body-panel, master: body-p03) ---- */
.layout-sp-ws-body-panel .title{position:absolute;left:96px;top:224px;width:840px;z-index:3;
  font-family:var(--sp-display);font-size:64px;line-height:1.3;font-weight:500;letter-spacing:.02em;color:var(--ink)}
.layout-sp-ws-body-panel .lead{position:absolute;left:98px;top:414px;width:640px;z-index:3;
  font-family:var(--sp-body);font-size:28px;line-height:1.8;font-weight:400;color:var(--dai)}
.layout-sp-ws-body-panel .panel{position:absolute;left:96px;right:96px;top:560px;bottom:188px;z-index:2;
  background:radial-gradient(ellipse 80% 60% at 30% 20%, #2A2620, #211E1A 70%);
  border-radius:3px;padding:54px 60px;color:var(--cream);overflow:hidden}
.layout-sp-ws-body-panel .panel::after{content:"";position:absolute;inset:0;pointer-events:none;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='m'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/><feColorMatrix type='saturate' values='0'/></filter><rect width='120' height='120' filter='url(%23m)' opacity='0.5'/></svg>");
  background-size:150px 150px;opacity:.06;mix-blend-mode:overlay}
.layout-sp-ws-body-panel .plabel{font-family:var(--sp-label);font-size:14px;letter-spacing:.28em;color:var(--zhu-lt);text-transform:uppercase;display:flex;align-items:center;gap:10px}
.layout-sp-ws-body-panel .plabel::before{content:"";width:9px;height:9px;background:var(--zhu-lt)}
.layout-sp-ws-body-panel .ptitle{font-family:var(--sp-display);font-size:36px;font-weight:500;margin-top:14px;color:var(--cream)}
.layout-sp-ws-body-panel .prow{display:grid;grid-template-columns:140px 1fr;align-items:baseline;margin-top:42px}
.layout-sp-ws-body-panel .ptime{font-family:var(--sp-display);font-size:30px;font-weight:500;color:var(--zhu-lt);font-variant-numeric:tabular-nums}
.layout-sp-ws-body-panel .ptext{font-family:var(--sp-body);font-size:26px;line-height:1.7;color:#E7DECB}

/* ---- 引言整版 (body-quote, master: body-p04) ---- */
.layout-sp-ws-body-quote .quotemark{position:absolute;left:92px;top:320px;z-index:3;
  font-family:var(--sp-display);font-size:150px;line-height:1;color:var(--zhu);opacity:.9}
.layout-sp-ws-body-quote .quote{position:absolute;left:98px;top:456px;width:880px;z-index:3;
  font-family:var(--sp-display);font-size:80px;line-height:1.3;font-weight:500;letter-spacing:.02em;color:var(--ink);text-wrap:balance}
.layout-sp-ws-body-quote .src{position:absolute;left:100px;top:988px;z-index:3;
  font-family:var(--sp-label);font-size:20px;letter-spacing:.16em;color:var(--tuo);text-transform:uppercase}

/* ===== 版式变体批次 v0.2（matrix/action/keywords/quote）— engine 零改、纯 CSS scoped、基线零影响 ===== */
/* matrix 超大衬数·问句序列 (sp-var-figure)：每问配 88px 大序号当装置（oversized numerals 做层次），脱 2×2 网格、脱平庸清单。依据 GM-04 数字锚 + 业界"超大编号建层次" */
.sp-var-figure.layout-sp-ws-body-matrix .matrix{grid-template-columns:1fr;border-left:none;top:500px;bottom:172px;display:grid;align-content:space-between}
.sp-var-figure.layout-sp-ws-body-matrix .cell{border-right:none;min-height:0;padding:0 8px 26px;flex-direction:row;align-items:center;gap:36px}
.sp-var-figure.layout-sp-ws-body-matrix .cnum{flex:none;width:104px;font-family:var(--sp-display);font-size:90px;font-weight:500;color:var(--li);opacity:.2;line-height:.78;letter-spacing:0}
.sp-var-figure.layout-sp-ws-body-matrix .cq{flex:1;font-size:37px;line-height:1.26}
.sp-var-figure.layout-sp-ws-body-matrix .cnote{margin-top:0;flex:none;max-width:260px;text-align:right;align-self:center}
/* action 两栏方框·居中 (sp-var-grid)：竖列勾选翻两栏网格 */
.sp-var-grid.layout-sp-ws-body-action .actions{display:grid;grid-template-columns:1fr 1fr;gap:40px 56px;bottom:188px;align-content:center}
.sp-var-grid.layout-sp-ws-body-action .aword{font-size:32px}
/* keywords 右重心网 (sp-var-right)：词网右锚、留白落左 */
.sp-var-right.layout-sp-ws-body-keywords .keywords{align-items:flex-end;text-align:right}
.sp-var-right.layout-sp-ws-body-keywords .kw-sub{margin-left:0;margin-right:62px}
/* quote 右重心收尾 (sp-var-right)：大引用右锚，呼应 essay 右重心语言 */
.sp-var-right.layout-sp-ws-body-quote .quote{left:auto;right:96px;text-align:right}
.sp-var-right.layout-sp-ws-body-quote .quotemark{left:auto;right:120px}
.sp-var-right.layout-sp-ws-body-quote .src{left:auto;right:100px;text-align:right}
/* ===== 版式变体批次 v0.3（flow/formula/panel）收尾 body 机制 ===== */
/* flow 居中交错时间轴 (sp-var-center)：竖版 process 行业最流行解——中央脊柱、数字锚在脊柱上、步骤左右交错往下（venngage/infogram「centered vertical timeline」共识）。竖向填满高画布、与基线"左脊柱"区分、避横向逆格式下虚 */
.sp-var-center.layout-sp-ws-body-flow .flow{left:96px;right:96px;top:512px;bottom:176px;gap:30px;justify-content:space-between}
.sp-var-center.layout-sp-ws-body-flow .flow::before{left:50%;top:8px;bottom:8px}
.sp-var-center.layout-sp-ws-body-flow .flow-rail{display:none}
.sp-var-center.layout-sp-ws-body-flow .step{grid-template-columns:1fr 74px 1fr;align-items:center;gap:0}
.sp-var-center.layout-sp-ws-body-flow .snum{grid-column:2;width:74px;text-align:center;padding:6px 0;margin-top:0}
.sp-var-center.layout-sp-ws-body-flow .step:nth-child(odd) .sbody{grid-column:1;text-align:right;padding-right:32px}
.sp-var-center.layout-sp-ws-body-flow .step:nth-child(even) .sbody{grid-column:3;text-align:left;padding-left:32px}
.sp-var-center.layout-sp-ws-body-flow .saction{margin-top:0}
.sp-var-center.layout-sp-ws-body-flow .sdesc{max-width:none;margin-top:10px}
/* formula 右重心 (sp-var-right)：方程右对齐、留白落左 */
.sp-var-right.layout-sp-ws-body-formula .formula{align-items:flex-end;text-align:right}
.sp-var-right.layout-sp-ws-body-formula .fterm{padding-left:0;padding-right:30px;align-items:flex-end}
.sp-var-right.layout-sp-ws-body-formula .fterm-result{padding-left:0;padding-right:30px}
.sp-var-right.layout-sp-ws-body-formula .fop{width:auto;padding-right:30px;text-align:right}
/* panel 大时刻 (sp-var-rail)：时刻放大成左排程列 */
.sp-var-rail.layout-sp-ws-body-panel .prow{grid-template-columns:170px 1fr;margin-top:38px}
.sp-var-rail.layout-sp-ws-body-panel .ptime{font-size:44px;line-height:1}


/* body 骨架专属纸帘纹（东方抄纸帘纹，材质加一档脱 AI 暖白；不动 .sp-paper 基类 = 封面零影响）*/
.layout-sp-ws-body-flow::after,.layout-sp-ws-body-matrix::after,.layout-sp-ws-body-compare::after,.layout-sp-ws-body-ledger::after,.layout-sp-ws-body-keywords::after,.layout-sp-ws-body-formula::after,.layout-sp-ws-body-action::after,.layout-sp-ws-body-map::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:0;
  background-image:repeating-linear-gradient(90deg, rgba(120,92,60,.038) 0 1px, transparent 1px 7px),repeating-linear-gradient(90deg, rgba(108,75,58,.05) 0 1px, transparent 1px 52px);
  mix-blend-mode:multiply}

/* ---- 地图组件 (body-map：编辑式静态路线图，朱砂虚线 route 主角 + 序号圆 pin + 极简指南针) ---- */
.layout-sp-ws-body-map .title{position:absolute;left:96px;top:208px;width:840px;z-index:3;
  font-family:var(--sp-display);font-size:60px;line-height:1.26;font-weight:500;letter-spacing:.02em;color:var(--ink)}
.layout-sp-ws-body-map .lead{position:absolute;left:98px;top:340px;width:660px;z-index:3;
  font-family:var(--sp-body);font-size:26px;line-height:1.8;color:var(--ink);opacity:.8}
.layout-sp-ws-body-map .sp-map-wrap{position:absolute;left:88px;right:88px;top:352px;z-index:2}
.layout-sp-ws-body-map .sp-map-svg{display:block;width:100%;height:auto;overflow:visible}
.layout-sp-ws-body-map .sp-map-route{fill:none;stroke:var(--zhu);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:2 13}
.layout-sp-ws-body-map .sp-map-route-shadow{fill:none;stroke:var(--tuo);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:2 13;transform:translate(1.4px,1.6px);opacity:.5}
.layout-sp-ws-body-map .sp-map-dot{fill:var(--zhu)}
.layout-sp-ws-body-map .sp-map-num{fill:var(--sp-paper-bg,#efe7d8);font-family:var(--sp-display);font-size:16px;font-weight:600;text-anchor:middle}
.layout-sp-ws-body-map .sp-map-place{fill:var(--ink);font-family:var(--sp-display);font-size:30px;font-weight:500}
.layout-sp-ws-body-map .sp-map-en{fill:var(--ink);font-family:var(--sp-latin);font-style:italic;font-size:17px;opacity:.5}
.layout-sp-ws-body-map .sp-map-note{fill:var(--ink);font-family:var(--sp-body);font-size:17px;opacity:.68}
.layout-sp-ws-body-map .sp-map-day{fill:var(--zhu);font-family:var(--sp-label);font-size:15px;letter-spacing:.14em;text-transform:uppercase}
.layout-sp-ws-body-map .sp-map-compass-ring{fill:none;stroke:var(--ink);stroke-width:1;opacity:.38}
.layout-sp-ws-body-map .sp-map-needle{stroke:var(--zhu);stroke-width:1.6;stroke-linecap:round}
.layout-sp-ws-body-map .sp-map-compass-n{fill:var(--ink);font-family:var(--sp-label);font-size:15px;text-anchor:middle;opacity:.6}
.layout-sp-ws-body-map .sp-map-foot-note{position:absolute;left:6px;bottom:54px;max-width:42%;z-index:3;
  font-family:var(--sp-latin);font-style:italic;font-size:21px;line-height:1.5;color:var(--ink);opacity:.55}

/* ---- 图集 evidence wall (body-gallery)：多图照片网格 + FIG 图说。机制源自 NatGeo/Magnum photo essay +
   Kinfolk 留白 + SPD 模块网格——hero 领头 / 不等分网格(忌 2×2) / caption 窄体小字 / 一致暖墨分级甩 AI 套图 ---- */
.layout-sp-ws-body-gallery .sp-rule-top{display:none}
/* 英雄图：满宽近出血、占画面上半，第一眼视觉冲击 */
.layout-sp-ws-body-gallery .gallery-hero{position:absolute;left:60px;right:60px;top:150px;height:700px;z-index:2;overflow:hidden;background:var(--tuo)}
.layout-sp-ws-body-gallery .gh-img{position:absolute;inset:0}
.layout-sp-ws-body-gallery .gallery-img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.72) sepia(.10) contrast(1.02)}
.sp-grade-duo.layout-sp-ws-body-gallery .gallery-img{filter:url(#sp-duo) contrast(1.02)}
/* 底部暖墨渐变 veil：压暗让压图标题可读，上半透出图 */
.layout-sp-ws-body-gallery .gh-veil{position:absolute;inset:0;z-index:2;pointer-events:none;
  background:linear-gradient(to top, rgba(28,20,14,.85) 0%, rgba(28,20,14,.48) 23%, rgba(28,20,14,0) 50%)}
/* 标题压英雄图底部：宋体大字米色 */
.layout-sp-ws-body-gallery .gh-text{position:absolute;left:48px;right:48px;bottom:42px;z-index:3}
.layout-sp-ws-body-gallery .gh-text .title{margin:0;font-family:var(--sp-display);font-size:64px;line-height:1.14;font-weight:500;letter-spacing:.01em;color:var(--cream)}
.layout-sp-ws-body-gallery .gh-text .lead{margin:16px 0 0;font-family:var(--sp-body);font-size:25px;line-height:1.5;color:rgba(247,242,230,.82);max-width:720px}
/* 英雄图左上角 FIG 图说(米色) */
.layout-sp-ws-body-gallery .gh-cap{position:absolute;left:48px;top:36px;z-index:3;display:flex;align-items:baseline;gap:10px}
.layout-sp-ws-body-gallery .gh-cap .fig-no{font-family:var(--sp-label);font-size:15px;letter-spacing:.16em;color:var(--cream);font-weight:700;font-variant-numeric:tabular-nums}
.layout-sp-ws-body-gallery .gh-cap .fig-cap{font-family:var(--sp-body);font-size:18px;color:rgba(247,242,230,.74)}
/* 下方节奏小图条带：不等大横向、留白呼吸；一致暖墨分级 grade=duo 叠强暖墨 */
.layout-sp-ws-body-gallery .sp-gallery{position:absolute;left:60px;right:60px;top:886px;bottom:134px;z-index:2;
  display:grid;gap:24px;grid-template-columns:1.3fr 1fr 1fr}
.layout-sp-ws-body-gallery .sp-gallery[data-n="0"]{display:none}
.layout-sp-ws-body-gallery .sp-gallery[data-n="1"]{grid-template-columns:1fr}
.layout-sp-ws-body-gallery .sp-gallery[data-n="2"]{grid-template-columns:1.25fr .85fr}
.layout-sp-ws-body-gallery .sp-gallery[data-n="3"]{grid-template-columns:1.3fr 1fr 1fr}
.layout-sp-ws-body-gallery .sp-gallery[data-n="4"]{grid-template-columns:1fr 1fr 1fr 1fr}
.layout-sp-ws-body-gallery .gfig{display:flex;flex-direction:column;min-height:0;margin:0;position:relative}
.layout-sp-ws-body-gallery .gfig-img{flex:1;min-height:0;overflow:hidden;background:var(--tuo)}
/* 图说：FIG 编号(朱砂窄体)+ 说明(墨色小字)，左对齐贴块、限 2 行不挤图 */
.layout-sp-ws-body-gallery .sp-fig-cap{flex:none;display:flex;align-items:baseline;gap:8px;padding-top:9px;min-height:18px}
.layout-sp-ws-body-gallery .fig-no{font-family:var(--sp-label);font-size:12px;letter-spacing:.12em;color:var(--zhu);font-weight:700;font-variant-numeric:tabular-nums;flex:none}
.layout-sp-ws-body-gallery .fig-cap{font-family:var(--sp-body);font-size:18px;line-height:1.3;color:var(--dai);
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}

/* ---- 边注时间轴 (body-margin)：主栏叙事 + 右边栏时间轴批注。机制源自 Tufte sidenotes + 编辑 marginalia +
   手账时间梯——主栏 / 沟槽(发丝线断续) / 右边栏；节点=朱砂空心圈、时间锚跟随段落(内容驱动不等距=反课程表)、边注 0.78× ---- */
.layout-sp-ws-body-margin .title{position:absolute;left:96px;top:218px;width:880px;z-index:3;
  font-family:var(--sp-display);font-size:56px;line-height:1.26;font-weight:500;letter-spacing:.02em;color:var(--ink)}
.layout-sp-ws-body-margin .lead{position:absolute;left:98px;top:306px;width:760px;z-index:3;
  font-family:var(--sp-body);font-size:24px;line-height:1.66;color:var(--dai)}
.layout-sp-ws-body-margin .essay-margin{position:absolute;left:96px;right:96px;top:372px;bottom:150px;z-index:3;
  display:grid;grid-template-columns:1fr 60px 264px;row-gap:62px;align-content:center}
.layout-sp-ws-body-margin .em-body{grid-column:1;align-self:start}
.layout-sp-ws-body-margin .em-body p{margin:0;font-family:var(--sp-body);font-size:28px;line-height:1.85;color:var(--ink)}
.layout-sp-ws-body-margin .em-rail{grid-column:2;margin-left:30px;border-left:1px solid color-mix(in srgb,var(--ink) 22%,transparent)}
.layout-sp-ws-body-margin .em-side{grid-column:3;align-self:start;padding-top:5px}
.layout-sp-ws-body-margin .em-time{font-family:var(--sp-label);font-size:22px;letter-spacing:.04em;font-variant-numeric:tabular-nums;color:var(--ink)}
.layout-sp-ws-body-margin .em-time::before{content:"";display:inline-block;width:7px;height:7px;border:1.2px solid var(--zhu);border-radius:50%;background:transparent;margin-right:11px;vertical-align:.18em}
.layout-sp-ws-body-margin .em-en{font-family:var(--sp-latin);font-style:italic;font-size:17px;color:var(--ink);opacity:.45;margin-top:4px;margin-left:18px}
.layout-sp-ws-body-margin .em-note{font-family:var(--sp-body);font-size:21px;line-height:1.5;text-align:left;
  color:color-mix(in srgb,var(--ink) 76%,transparent);margin-top:9px;margin-left:18px}

/* ---- 步骤流 (body-flow, F05 移植进静纸壳：三步聚拢 + 数字脊柱 + 竖排锚) ---- */
.layout-sp-ws-body-flow .title{position:absolute;left:96px;top:216px;width:840px;z-index:3;
  font-family:var(--sp-display);font-size:62px;line-height:1.28;font-weight:500;letter-spacing:.02em;color:var(--ink)}
.layout-sp-ws-body-flow .lead{position:absolute;left:98px;top:402px;width:600px;z-index:3;
  font-family:var(--sp-body);font-size:27px;line-height:1.7;color:var(--dai)}
.layout-sp-ws-body-flow .flow-rail{position:absolute;right:80px;top:528px;bottom:178px;z-index:1;pointer-events:none;
  writing-mode:vertical-rl;font-family:var(--sp-display);font-size:31px;font-weight:500;letter-spacing:.30em;
  color:var(--li);opacity:.5;display:flex;align-items:flex-start}
.layout-sp-ws-body-flow .flow{position:absolute;left:96px;right:210px;top:520px;z-index:3;
  display:flex;flex-direction:column;gap:50px}
.layout-sp-ws-body-flow .flow::before{content:"";position:absolute;left:33px;top:16px;bottom:16px;width:1px;background:var(--line);z-index:0}
.layout-sp-ws-body-flow .step{position:relative;display:grid;grid-template-columns:66px 1fr;align-items:start;gap:34px;z-index:1}
.layout-sp-ws-body-flow .snum{font-family:var(--sp-display);font-size:52px;font-weight:500;color:var(--zhu);
  font-variant-numeric:tabular-nums;line-height:1;width:66px;text-align:center;padding:6px 0;background:var(--bg)}
.layout-sp-ws-body-flow .saction{font-family:var(--sp-display);font-size:37px;font-weight:500;color:var(--ink);line-height:1.24;margin-top:2px}
.layout-sp-ws-body-flow .sdesc{font-family:var(--sp-body);font-size:25px;line-height:1.66;color:var(--dai);margin-top:12px;max-width:17em}
.layout-sp-ws-body-flow .sout{display:inline-flex;align-items:center;gap:11px;margin-top:18px;
  font-family:var(--sp-label);font-size:17px;letter-spacing:.13em;color:var(--tuo)}
.layout-sp-ws-body-flow .sout::before{content:"";width:7px;height:7px;background:var(--zhu);flex:none}

/* ---- 判断矩阵 (body-matrix, F06 移植进静纸壳：发丝线决策格 + 底字锚) ---- */
.layout-sp-ws-body-matrix .matrix-anchor{position:absolute;right:54px;top:198px;z-index:0;pointer-events:none;
  font-family:var(--sp-display);font-size:300px;line-height:.78;font-weight:500;color:var(--li);opacity:.05}
.layout-sp-ws-body-matrix .title{position:absolute;left:96px;top:216px;width:780px;z-index:3;
  font-family:var(--sp-display);font-size:62px;line-height:1.28;font-weight:500;letter-spacing:.02em;color:var(--ink)}
.layout-sp-ws-body-matrix .lead{position:absolute;left:98px;top:400px;width:700px;z-index:3;
  font-family:var(--sp-body);font-size:27px;line-height:1.66;color:var(--dai)}
.layout-sp-ws-body-matrix .matrix{position:absolute;left:96px;right:96px;top:520px;z-index:3;
  display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--line);border-left:1px solid var(--line)}
.layout-sp-ws-body-matrix .cell{border-right:1px solid var(--line);border-bottom:1px solid var(--line);
  min-height:252px;padding:34px 40px;display:flex;flex-direction:column;gap:16px}
.layout-sp-ws-body-matrix .cnum{font-family:var(--sp-label);font-size:17px;letter-spacing:.18em;color:var(--zhu);
  font-variant-numeric:tabular-nums;font-weight:600}
.layout-sp-ws-body-matrix .cq{font-family:var(--sp-display);font-size:34px;font-weight:500;line-height:1.3;color:var(--ink)}
.layout-sp-ws-body-matrix .cnote{font-family:var(--sp-body);font-size:23px;line-height:1.6;color:var(--dai);margin-top:auto}
.layout-sp-ws-body-matrix .mprinciple{position:absolute;left:96px;right:120px;bottom:178px;z-index:3;
  font-family:var(--sp-display);font-size:30px;line-height:1.5;color:var(--li);padding-left:26px;border-left:4px solid var(--zhu)}

/* ---- 对比 (body-compare, F02 移植进静纸壳：两栏对照 + 中缝发丝线 + 朱砂标) ---- */
.layout-sp-ws-body-compare .title{position:absolute;left:96px;top:200px;width:880px;z-index:3;
  font-family:var(--sp-display);font-size:60px;line-height:1.26;font-weight:500;letter-spacing:.02em;color:var(--ink)}
.layout-sp-ws-body-compare .lead{position:absolute;left:98px;top:382px;width:760px;z-index:3;
  font-family:var(--sp-body);font-size:26px;line-height:1.66;color:var(--dai)}
.layout-sp-ws-body-compare .cmp{position:absolute;left:96px;right:96px;top:470px;bottom:200px;z-index:3;
  display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr}
.layout-sp-ws-body-compare .col{display:flex;flex-direction:column;justify-content:flex-start;padding-top:78px}
.layout-sp-ws-body-compare .col-a{padding-right:52px}
.layout-sp-ws-body-compare .col-b{padding-left:52px;border-left:1px solid var(--line)}
.layout-sp-ws-body-compare .clabel{display:flex;align-items:center;gap:14px;margin-bottom:30px;
  font-family:var(--sp-display);font-size:29px;font-weight:500;color:var(--ink)}
.layout-sp-ws-body-compare .cmark{width:44px;height:44px;flex:none;display:flex;align-items:center;justify-content:center;
  font-family:var(--sp-display);font-size:23px;color:var(--dai);border:1px solid var(--tuo);border-radius:2px}
.layout-sp-ws-body-compare .cmark-zhu{color:#fff;background:var(--zhu);border-color:var(--zhu)}
.layout-sp-ws-body-compare .cpoints{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:22px}
/* 纸本编辑留白：点组在标题下剩余空间整体垂直居中（仅左右栏基础版，不动 stack 变体），内容少时上下对称呼吸、不堆顶塌空 */
.layout-sp-ws-body-compare:not(.sp-var-stack) .cpoints{flex:1;justify-content:center}
.layout-sp-ws-body-compare .cpoints li{font-family:var(--sp-body);font-size:25px;line-height:1.5;color:var(--dai);padding-left:24px;position:relative}
.layout-sp-ws-body-compare .cpoints li::before{content:"";position:absolute;left:0;top:14px;width:9px;height:1px;background:var(--tuo)}
.layout-sp-ws-body-compare .col-b .cpoints li{color:var(--ink)}
.layout-sp-ws-body-compare .col-b .cpoints li::before{background:var(--zhu);width:8px;height:8px;top:9px}
.layout-sp-ws-body-compare .verdict{position:absolute;left:96px;right:120px;bottom:172px;z-index:3;
  font-family:var(--sp-display);font-size:29px;line-height:1.5;color:var(--li);padding-left:26px;border-left:4px solid var(--zhu)}
.layout-sp-ws-body-compare .compare-anchor{position:absolute;right:88px;bottom:212px;z-index:0;pointer-events:none;
  font-family:var(--sp-display);font-size:190px;line-height:.8;font-weight:500;color:var(--li);opacity:.05}
/* 版式变体：上下对照·横向铺点 (sp-var-stack) — 误上/正下两横带、横发丝线分隔替竖分栏、点横向铺满宽，构图重心从横翻竖。仅 compare v===1 触发，基线零影响 */
.sp-var-stack.layout-sp-ws-body-compare .cmp{grid-template-columns:1fr;grid-template-rows:1fr 1fr}
.sp-var-stack.layout-sp-ws-body-compare .col{padding-top:0;justify-content:center}
.sp-var-stack.layout-sp-ws-body-compare .col-a{padding-right:0;padding-bottom:36px}
.sp-var-stack.layout-sp-ws-body-compare .col-b{padding-left:0;border-left:none;border-top:1px solid var(--line);padding-top:40px}
.sp-var-stack.layout-sp-ws-body-compare .cpoints{flex-direction:row;flex-wrap:wrap;gap:16px 56px}
.sp-var-stack.layout-sp-ws-body-compare .cpoints li{width:calc(50% - 28px)}

/* ---- 账本 (body-ledger, F03 移植进静纸壳：发丝线行 + 编号/项/值 + 合计加重) ---- */
.layout-sp-ws-body-ledger .title{position:absolute;left:96px;top:200px;width:840px;z-index:3;
  font-family:var(--sp-display);font-size:60px;line-height:1.26;font-weight:500;letter-spacing:.02em;color:var(--ink)}
.layout-sp-ws-body-ledger .lead{position:absolute;left:98px;top:380px;width:740px;z-index:3;
  font-family:var(--sp-body);font-size:26px;line-height:1.64;color:var(--dai)}
.layout-sp-ws-body-ledger .ledger{position:absolute;left:96px;right:96px;top:486px;z-index:3;
  display:flex;flex-direction:column;border-top:1px solid var(--line)}
.layout-sp-ws-body-ledger .lrow{display:grid;grid-template-columns:64px 1fr auto;align-items:baseline;gap:26px;
  padding:23px 4px 21px;border-bottom:1px solid var(--line)}
.layout-sp-ws-body-ledger .lidx{font-family:var(--sp-label);font-size:18px;letter-spacing:.1em;color:var(--zhu);
  font-variant-numeric:tabular-nums;font-weight:600}
.layout-sp-ws-body-ledger .lname{font-family:var(--sp-display);font-size:31px;font-weight:500;color:var(--ink);line-height:1.3}
.layout-sp-ws-body-ledger .lnote{font-family:var(--sp-body);font-size:22px;line-height:1.5;color:var(--dai);margin-top:7px}
.layout-sp-ws-body-ledger .lval{font-family:var(--sp-display);font-size:30px;font-weight:500;color:var(--li);
  font-variant-numeric:tabular-nums;white-space:nowrap}
.layout-sp-ws-body-ledger .ltotal{position:absolute;left:96px;right:96px;bottom:166px;z-index:3;
  display:flex;justify-content:space-between;align-items:baseline;padding-top:20px;border-top:2px solid var(--ink)}
.layout-sp-ws-body-ledger .ltlabel{font-family:var(--sp-label);font-size:20px;letter-spacing:.2em;color:var(--dai)}
.layout-sp-ws-body-ledger .ltval{font-family:var(--sp-display);font-size:38px;font-weight:600;color:var(--zhu);font-variant-numeric:tabular-nums}
/* 版式变体：结算重心·红合计大数 (sp-var-figure) — 合计放大成朱砂红主角大数(忠实视觉稿点睛逻辑:红=点睛大数、栗褐=安静衬)，行值保基线安静栗褐。仅 ledger v===1 且 entries≥3+可求和触发 */
.sp-var-figure.layout-sp-ws-body-ledger .ltotal{align-items:flex-end;padding-top:26px}
.sp-var-figure.layout-sp-ws-body-ledger .ltlabel{font-size:22px}
.sp-var-figure.layout-sp-ws-body-ledger .ltval{font-size:78px;line-height:.84;letter-spacing:.005em}

/* ---- 关键词网 (body-keywords, F04 移植进静纸壳：核心词放大朱砂 + 错落标注) ---- */
.layout-sp-ws-body-keywords .title{position:absolute;left:96px;top:200px;width:820px;z-index:3;
  font-family:var(--sp-display);font-size:60px;line-height:1.26;font-weight:500;letter-spacing:.02em;color:var(--ink)}
.layout-sp-ws-body-keywords .lead{position:absolute;left:98px;top:380px;width:680px;z-index:3;
  font-family:var(--sp-body);font-size:26px;line-height:1.64;color:var(--dai)}
.layout-sp-ws-body-keywords .keywords{position:absolute;left:96px;right:110px;top:496px;bottom:172px;z-index:3;
  display:flex;flex-direction:column;justify-content:center;gap:30px}
.layout-sp-ws-body-keywords .kw{position:relative;display:flex;align-items:baseline;gap:18px}
.layout-sp-ws-body-keywords .kidx{font-family:var(--sp-label);font-size:17px;letter-spacing:.08em;color:var(--tuo);
  font-variant-numeric:tabular-nums;flex:none;width:28px}
.layout-sp-ws-body-keywords .kword{font-family:var(--sp-display);font-weight:500;color:var(--ink);line-height:1.08}
.layout-sp-ws-body-keywords .knote{font-family:var(--sp-body);font-size:22px;color:var(--dai);line-height:1.4}
.layout-sp-ws-body-keywords .kw-core .kword{font-size:86px;color:var(--zhu)}
.layout-sp-ws-body-keywords .kw-sub{margin-left:62px}
.layout-sp-ws-body-keywords .kw-sub .kword{font-size:40px}
.layout-sp-ws-body-keywords .kw-sub:nth-of-type(even){margin-left:168px}

/* ---- 公式 (body-formula, F07 移植进静纸壳：要素 + 朱砂运算符 + 结果放大) ---- */
.layout-sp-ws-body-formula .title{position:absolute;left:96px;top:200px;width:820px;z-index:3;
  font-family:var(--sp-display);font-size:60px;line-height:1.26;font-weight:500;letter-spacing:.02em;color:var(--ink)}
.layout-sp-ws-body-formula .lead{position:absolute;left:98px;top:380px;width:680px;z-index:3;
  font-family:var(--sp-body);font-size:26px;line-height:1.64;color:var(--dai)}
.layout-sp-ws-body-formula .formula{position:absolute;left:96px;right:110px;top:494px;bottom:198px;z-index:3;
  display:flex;flex-direction:column;justify-content:center;gap:6px}
.layout-sp-ws-body-formula .fterm{display:flex;flex-direction:column;gap:7px;padding-left:30px}
.layout-sp-ws-body-formula .fword{font-family:var(--sp-display);font-size:42px;font-weight:500;color:var(--ink);line-height:1.16}
.layout-sp-ws-body-formula .fnote{font-family:var(--sp-body);font-size:23px;color:var(--dai);line-height:1.5;max-width:20em}
.layout-sp-ws-body-formula .fop{font-family:var(--sp-display);font-size:38px;font-weight:500;color:var(--zhu);line-height:1;padding:6px 0;width:30px;text-align:left}
.layout-sp-ws-body-formula .fop-eq{font-size:44px}
.layout-sp-ws-body-formula .fterm-result{padding-left:30px;margin-top:4px}
.layout-sp-ws-body-formula .fterm-result .fword{font-size:60px;color:var(--zhu)}
.layout-sp-ws-body-formula .fclosing{position:absolute;left:96px;right:120px;bottom:168px;z-index:3;
  font-family:var(--sp-body);font-size:24px;line-height:1.55;color:var(--li)}

/* ---- 行动 (body-action, F08 移植进静纸壳：朱砂方框勾 + 并列行动 + 底字锚) ---- */
.layout-sp-ws-body-action .action-anchor{position:absolute;right:54px;top:198px;z-index:0;pointer-events:none;
  font-family:var(--sp-display);font-size:300px;line-height:.78;font-weight:500;color:var(--li);opacity:.05}
.layout-sp-ws-body-action .title{position:absolute;left:96px;top:200px;width:800px;z-index:3;
  font-family:var(--sp-display);font-size:60px;line-height:1.26;font-weight:500;letter-spacing:.02em;color:var(--ink)}
.layout-sp-ws-body-action .lead{position:absolute;left:98px;top:380px;width:700px;z-index:3;
  font-family:var(--sp-body);font-size:26px;line-height:1.64;color:var(--dai)}
.layout-sp-ws-body-action .actions{position:absolute;left:96px;right:120px;top:498px;z-index:3;
  display:flex;flex-direction:column;gap:30px}
.layout-sp-ws-body-action .arow{display:grid;grid-template-columns:42px 1fr;align-items:start;gap:28px}
.layout-sp-ws-body-action .abox{width:30px;height:30px;margin-top:6px;border:2px solid var(--zhu);border-radius:2px;flex:none}
.layout-sp-ws-body-action .aword{font-family:var(--sp-display);font-size:35px;font-weight:500;color:var(--ink);line-height:1.26}
.layout-sp-ws-body-action .anote{font-family:var(--sp-body);font-size:24px;line-height:1.55;color:var(--dai);margin-top:8px;max-width:19em}
.layout-sp-ws-body-action .acta{position:absolute;left:96px;right:120px;bottom:170px;z-index:3;
  font-family:var(--sp-display);font-size:29px;line-height:1.5;color:var(--li);padding-left:26px;border-left:4px solid var(--zhu)}

/* v1 Core4 WeasyPrint stabilization for screenshot proof */
.layout-sl-c02{display:flex!important;flex-direction:column!important;gap:22px!important}
.layout-sl-c02 .sl-proof-grid{display:block!important;min-height:auto!important}
.layout-sl-c02 .sl-shot{height:720px!important;min-height:720px!important;margin:0!important}
.layout-sl-c02 .sl-shot .browser-bar{height:34px!important}
.layout-sl-c02 .sl-shot .media-img{height:640px!important;object-fit:cover!important}
.layout-sl-c02 .sl-callouts{display:grid!important;grid-template-columns:1fr 1fr 1fr!important;grid-template-rows:auto!important;gap:14px!important;margin-top:18px!important}
.layout-sl-c02 .sl-callout{padding:20px!important}
.layout-sl-c02 .sl-callout h3{font-size:26px!important}
.layout-sl-c02 .sl-callout p{font-size:19px!important}
.layout-sl-c02 .sl-proof-note{padding:20px!important}
.layout-sl-c02 .sl-proof-note strong{font-size:34px!important}

`;

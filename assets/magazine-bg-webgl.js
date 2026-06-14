/*
 * Lightweight ink-flow background for editorial hero pages.
 * It is optional. Disable it for low-performance environments or when
 * deterministic screenshots are required.
 */
export function mountInkFlow(canvas, {
  ink = "rgba(10,10,11,0.10)",
  paper = "rgba(243,240,232,1)",
  speed = 0.004
} = {}) {
  const ctx = canvas.getContext("2d");
  let t = 0;
  function resize() {
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;
  }
  resize();
  addEventListener("resize", resize);
  function draw() {
    const w = canvas.width, h = canvas.height;
    ctx.fillStyle = paper;
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 9; i++) {
      const x = w * (0.15 + i * 0.1);
      const y = h * (0.35 + Math.sin(t + i) * 0.12);
      const r = h * (0.18 + Math.sin(t * .7 + i) * .05);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, ink);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    t += speed;
    requestAnimationFrame(draw);
  }
  draw();
  return () => removeEventListener("resize", resize);
}

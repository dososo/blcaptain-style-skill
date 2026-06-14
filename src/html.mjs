export function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function attr(value = "") {
  return esc(value).replaceAll("'", "&#039;");
}

export function styleVars(vars = {}) {
  return Object.entries(vars).map(([k, v]) => `${k}:${v}`).join(";");
}

export function list(items = [], cls = "bullets") {
  if (!items.length) return "";
  return `<ul class="${cls}">${items.map(item => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

export function imageTag(image, cls = "media-img") {
  if (!image?.resolvedSrc && !image?.src) return `<div class="${cls} placeholder"><span>NO IMAGE</span></div>`;
  const src = image.resolvedSrc || image.src;
  const pos = image.position || image.objectPosition || "center 50%";
  const alt = image.alt || image.purpose || "";
  return `<img class="${cls}" src="${attr(src)}" alt="${attr(alt)}" style="object-position:${attr(pos)}" />`;
}

export function miniLabel(text) {
  return text ? `<div class="kicker">${esc(text)}</div>` : "";
}

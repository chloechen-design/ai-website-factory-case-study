import { SectionHeading } from "../../src/components.js?v=sop-07-stepb";

const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[character]));

export function PsbCampusContext({ content }) {
  return `<section class="section psb-campus-context" id="campus" aria-labelledby="psb-campus-title"><div class="psb-campus-context__copy"><p class="psb-campus-context__label">Campus partagé</p><h2 id="psb-campus-title">${escapeHTML(content.title)}</h2><p>${escapeHTML(content.description)}</p><a href="${escapeHTML(content.sourceUrl)}" target="_blank" rel="noreferrer">${escapeHTML(content.linkLabel)}</a></div><div class="psb-campus-context__aside"><span>${escapeHTML(content.place)}</span><small>${escapeHTML(content.note)}</small></div></section>`;
}

export function PsbRecognitionPanel({ content }) {
  const items = content.items.map((item) => `<article class="psb-recognition-item"><div><p>${escapeHTML(item.category)}</p><h3>${escapeHTML(item.title)}</h3><span>${escapeHTML(item.description)}</span></div><a href="${escapeHTML(item.sourceUrl)}" target="_blank" rel="noreferrer">${escapeHTML(item.sourceLabel)}</a></article>`).join("");
  return `<section class="section psb-recognition-panel" id="reconnaissances" aria-labelledby="psb-recognition-title">${SectionHeading({ title: content.title, intro: content.intro, id: "psb-recognition-title" })}<div class="psb-recognition-panel__items">${items}</div><p class="source-note">${escapeHTML(content.note)}</p></section>`;
}

/* Composants partagés : aucune donnée de marque ou de contenu éditorial ici. */
const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[character]));

export function Button({ label, href, variant = "primary" }) {
  return `<a class="button button--${escapeHTML(variant)}" href="${escapeHTML(href)}">${escapeHTML(label)}</a>`;
}

export function SectionHeading({ title, intro, id }) {
  return `<header class="section-heading"><h2 id="${escapeHTML(id)}">${escapeHTML(title)}</h2>${intro ? `<p>${escapeHTML(intro)}</p>` : ""}</header>`;
}

export function EditorialMedia({ media, className = "", mode = "public" }) {
  if (!media) return "";
  const forcedError = media.state === "error";
  const hasImage = Boolean(media.imageUrl) && !forcedError;
  if (!hasImage && mode !== "diagnostic") {
    if (!forcedError) return media.emptyLabel ? `<p class="media-availability">${escapeHTML(media.emptyLabel)}</p>` : "";
  }
  const attribution = [media.provenanceLabel, media.source].filter(Boolean).map(escapeHTML).join("<br>");
  const visual = hasImage
    ? `<img class="media-slot__image" src="${escapeHTML(media.imageUrl)}" alt="${escapeHTML(media.alt || "")}" loading="${className.includes("hero") ? "eager" : "lazy"}" decoding="async" data-media-image /><span class="media-load-error" data-media-error hidden><strong>${escapeHTML(media.loadErrorTitle || "Image indisponible.")}</strong><span>${escapeHTML(media.loadErrorLabel || "Consultez la source ou réessayez plus tard.")}</span></span>`
    : forcedError
      ? `<span class="media-load-error"><strong>${escapeHTML(media.loadErrorTitle || "Image indisponible.")}</strong><span>${escapeHTML(media.loadErrorLabel || "La composition reste lisible sans ce média.")}</span></span>`
      : `<div class="media-slot__notice media-slot__notice--diagnostic"><span class="media-slot__tag">Diagnostic · média absent</span><strong>${escapeHTML(media.title || "Média non fourni")}</strong><span>${escapeHTML(media.alt || "Aucune image n’est configurée pour cet aperçu.")}</span></div>`;
  const sourceLink = media.sourceUrl
    ? `<a href="${escapeHTML(media.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escapeHTML(media.sourceLinkLabel || "Voir la source")}</a>`
    : "";
  const caption = hasImage || mode === "diagnostic" || forcedError
    ? `<figcaption><span><strong>${escapeHTML(media.title || "Visuel")}</strong>${attribution ? `<br>${attribution}` : ""}</span>${sourceLink}</figcaption>`
    : "";
  return `<figure class="media-slot media-slot--${escapeHTML(media.ratio || "wide")} ${escapeHTML(className)}" data-media-state="${forcedError ? "error" : hasImage ? "loading" : "absent"}">${visual}${caption}</figure>`;
}

function NavigationItem({ item }) {
  if (!item.children?.length) return `<a href="${escapeHTML(item.href)}">${escapeHTML(item.label)}</a>`;
  return `<details class="navigation-group"><summary>${escapeHTML(item.label)}</summary><div class="navigation-submenu">${item.children.map((child) => `<a href="${escapeHTML(child.href)}">${escapeHTML(child.label)}</a>`).join("")}</div></details>`;
}

export function Navigation({ content }) {
  const links = (content.navigation || []).map((item) => NavigationItem({ item })).join("");
  const actions = content.navigationActions || (content.navigationAction ? [content.navigationAction] : []);
  return `${links}${actions.map((action) => `<a class="nav-action" href="${escapeHTML(action.href)}">${escapeHTML(action.label)}</a>`).join("")}`;
}

export function SiteHeader({ brand, content }) {
  const announcement = content.announcement;
  return `
    <a class="skip-link" href="#contenu">Aller au contenu</a>
    ${announcement ? `<div class="announcement"><span>${escapeHTML(announcement.label)}</span><a href="${escapeHTML(announcement.href)}">${escapeHTML(announcement.linkLabel)}</a></div>` : ""}
    <header class="site-header">
      <a class="brand-lockup" href="#ecole" aria-label="${escapeHTML(brand.name)}, accueil"><span class="brand-name">${escapeHTML(brand.name)}</span><span class="brand-caption">${escapeHTML(brand.positioning)}</span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" data-menu-toggle><span data-menu-label>Menu</span><span class="menu-lines" aria-hidden="true"><i></i><i></i></span></button>
      <nav id="primary-navigation" class="primary-navigation" aria-label="Navigation principale">${Navigation({ content })}</nav>
    </header>`;
}

export function Hero({ brand, content }) {
  const variant = content.variant || "split";
  const actions = content.actions || [content.primaryAction, content.secondaryAction].filter(Boolean);
  const mediaError = content.media?.state === "error";
  const copy = `<div class="hero-copy">${content.label ? `<p class="demo-label">${escapeHTML(brand.proposalLabel)} · ${escapeHTML(content.label)}</p>` : ""}<h1 id="hero-title">${escapeHTML(content.title).replace(/\n/g, "<br>")}</h1>${content.description ? `<p class="hero-description">${escapeHTML(content.description)}</p>` : ""}<div class="hero-actions">${actions.map((action, index) => Button({ label: action.label, href: action.href, variant: action.variant || (index === 0 ? "light" : "text-light") })).join("")}</div>${mediaError ? `<p class="hero-media-fallback" role="status">${escapeHTML(content.media.loadErrorLabel || "Le média ne s’est pas chargé ; la composition éditoriale reste affichée.")}</p>` : `<p class="hero-media-fallback" data-hero-media-error role="status" hidden>Le média ne s’est pas chargé ; la composition éditoriale reste affichée.</p>`}</div>`;
  const hasMedia = Boolean(content.media?.imageUrl) && !mediaError;
  const media = hasMedia ? EditorialMedia({ media: content.media, className: variant === "cover" ? "media-slot--hero hero-cover-media" : "media-slot--hero" }) : "";
  const aside = content.aside ? `<aside class="hero-brief" aria-label="${escapeHTML(content.aside.label || "Repère éditorial")}"><p class="hero-brief__label">${escapeHTML(content.aside.label || "À explorer")}</p>${content.aside.value ? `<strong class="hero-brief__value">${escapeHTML(content.aside.value)}</strong>` : ""}${content.aside.detail ? `<p class="hero-brief__detail">${escapeHTML(content.aside.detail)}</p>` : ""}${content.aside.items?.length ? `<ul>${content.aside.items.map((item) => `<li>${item.href ? `<a href="${escapeHTML(item.href)}">${escapeHTML(item.label)}</a>` : `<span>${escapeHTML(item.label)}</span>`}</li>`).join("")}</ul>` : ""}${content.aside.href ? `<a class="hero-brief__link" href="${escapeHTML(content.aside.href)}">${escapeHTML(content.aside.linkLabel || "En savoir plus")}</a>` : ""}</aside>` : "";
  if (variant === "cover" && hasMedia) {
    return `<section class="hero hero--cover" id="ecole" aria-labelledby="hero-title"><div class="hero-cover-background">${media}</div>${copy}</section>`;
  }
  if (variant === "editorial" || variant === "cover") {
    return `<section class="hero hero--editorial${variant === "cover" ? " hero--cover-fallback" : ""}${mediaError ? " hero--media-error" : ""}${aside ? " hero--with-brief" : ""}" id="ecole" aria-labelledby="hero-title">${copy}${aside}</section>`;
  }
  return `<section class="hero hero--split${hasMedia ? " hero--with-media" : " hero--without-media"}${mediaError ? " hero--media-error" : ""}${aside ? " hero--with-brief" : ""}" id="ecole" aria-labelledby="hero-title">${copy}${media ? `<div class="hero-media">${media}</div>` : ""}${aside}</section>`;
}

function programKindLabel(kind) {
  return ({ domain: "Domaine de formation", family: "Famille de programmes", program: "Programme individuel", domaine: "Domaine de formation", famille: "Famille de programmes", formation: "Formation", programme: "Programme individuel" })[kind] || "Contenu de formation";
}

export function ProgramCard({ item }) {
  const program = item.program || {};
  const tone = item.tone ? ` formation-card--${escapeHTML(item.tone)}` : "";
  const meta = program.meta || item.meta || {};
  const fields = [
    ["Niveau de sortie", meta.level], ["Ville(s)", meta.campus], ["Diplôme / certification", meta.qualification],
    ["Durée", meta.duration], ["Modalité", meta.mode],
  ].filter(([, value]) => value);
  const attributes = [...fields, ...(program.attributes || item.attributes || []).filter(({ value }) => value).map(({ label, value }) => [label, value])]
    .map(([label, value]) => `<li><span>${escapeHTML(label)}</span><strong>${escapeHTML(value)}</strong></li>`).join("");
  const href = program.href || item.href;
  const title = href ? `<a class="program-card__title-link" href="${escapeHTML(href)}">${escapeHTML(item.title)}</a>` : escapeHTML(item.title);
  const id = program.id || item.id;
  const type = program.type || item.type;
  return `<article class="formation-card program-card${tone}"${id ? ` id="program-${escapeHTML(id)}" data-program-id="${escapeHTML(id)}"` : ""}${type ? ` data-program-type="${escapeHTML(type)}"` : ""}><div class="program-card__topline"><span class="program-card__kind">${escapeHTML(programKindLabel(type))}</span>${item.number ? `<span class="formation-card-number">${escapeHTML(item.number)}</span>` : ""}</div>${program.family ? `<p class="program-card__family">${escapeHTML(program.family)}</p>` : ""}${item.media ? EditorialMedia({ media: item.media, className: "formation-card-media" }) : ""}<h3>${title}</h3>${item.summary ? `<p class="program-card__summary">${escapeHTML(item.summary)}</p>` : ""}${attributes ? `<ul class="program-card__attributes">${attributes}</ul>` : ""}${item.caption ? `<span class="formation-card-caption">${escapeHTML(item.caption)}</span>` : ""}</article>`;
}

export const FormationCard = ProgramCard;

export function FormationSection({ content }) {
  const layout = ["grid", "rows", "domains"].includes(content.layout) ? content.layout : "grid";
  const action = content.action ? `<div class="formation-section__action">${Button(content.action)}</div>` : "";
  return `<section class="section formation-section formation-section--${layout}" id="formations" aria-labelledby="formations-title">${SectionHeading({ title: content.title, intro: content.intro, id: "formations-title" })}<div class="formation-grid formation-grid--${layout}">${content.items.map((item) => ProgramCard({ item })).join("")}</div>${action}${content.note ? `<p class="source-note">${escapeHTML(content.note)}</p>` : ""}</section>`;
}

export const ProgramSection = FormationSection;

export function Metric({ item }) {
  return `<article class="metric"><p class="metric-value">${escapeHTML(item.value)}</p><p class="metric-label">${escapeHTML(item.label)}</p></article>`;
}

export function MetricsSection({ content }) {
  return `<section class="metrics-section section" aria-labelledby="metrics-title">${SectionHeading({ title: content.title, id: "metrics-title" })}<div class="metrics-grid">${content.items.map((item) => Metric({ item })).join("")}</div><p class="source-note">${escapeHTML(content.note)}</p></section>`;
}

export function MediaCard({ item, index }) {
  return `<article class="project-card project-card--${index + 1}">${EditorialMedia({ media: item })}<div class="project-card__copy"><p class="editorial-category">${escapeHTML(item.credit)}</p><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.detail)}</p></div></article>`;
}

export function ProjectGallery({ content }) {
  return `<section class="section projects-section" id="projets" aria-labelledby="projects-title">${SectionHeading({ title: content.title, intro: content.intro, id: "projects-title" })}<div class="project-gallery">${content.items.map((item, index) => MediaCard({ item, index })).join("")}</div></section>`;
}

export function EditorialCard({ item, linkLabel }) {
  const action = item.href ? `<a class="editorial-link" href="${escapeHTML(item.href)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.linkLabel || linkLabel || "Consulter la source")}</a>` : "";
  return `<article class="editorial-card editorial-card--${escapeHTML(item.format || "compact")}">${item.media ? EditorialMedia({ media: item.media, className: "editorial-card__media" }) : ""}<p class="editorial-category">${escapeHTML(item.category)}</p><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.summary)}</p>${action}</article>`;
}

export function NewsSection({ content }) {
  return `<section class="section news-section" id="actualites" aria-labelledby="news-title">${SectionHeading({ title: content.title, intro: content.intro, id: "news-title" })}<div class="editorial-grid">${content.items.map((item) => EditorialCard({ item, linkLabel: content.linkLabel })).join("")}</div></section>`;
}

export function EventItem({ item }) {
  const action = item.href ? `<a class="event-link" href="${escapeHTML(item.href)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.linkLabel || "Consulter la source")}</a>` : "";
  return `<article class="event-item${item.href ? "" : " event-item--no-action"}"><div class="event-date"><span>${escapeHTML(item.date)}</span><small>${escapeHTML(item.month)}</small></div><div class="event-copy"><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.time)}</p><small>${escapeHTML(item.detail)}</small></div>${action}</article>`;
}

export function AgendaSection({ content }) {
  return `<section class="section agenda-section" id="agenda" aria-labelledby="agenda-title">${SectionHeading({ title: content.title, intro: content.intro, id: "agenda-title" })}<div class="event-list">${content.items.map((item) => EventItem({ item })).join("")}</div></section>`;
}

export function SiteFooter({ brand, content }) {
  const groups = content.linkGroups || (content.links ? [{ title: content.linksTitle || "Liens", links: content.links }] : []);
  return `<footer class="site-footer"><div class="footer-main"><div class="footer-intro"><p class="footer-brand">${escapeHTML(brand.name)}</p><p>${escapeHTML(content.description)}</p></div><div class="footer-address"><p class="footer-label">${escapeHTML(content.addressLabel)}</p><address>${escapeHTML(content.address)}</address><a href="${escapeHTML(brand.officialUrl)}" target="_blank" rel="noreferrer">${escapeHTML(content.officialLinkLabel || "Visiter le site")}</a></div><nav class="footer-links" aria-label="Liens de pied de page">${groups.map((group) => `<section class="footer-link-group">${group.title ? `<h3>${escapeHTML(group.title)}</h3>` : ""}${group.links.map(({ label, href }) => `<a href="${escapeHTML(href)}">${escapeHTML(label)}</a>`).join("")}</section>`).join("")}</nav></div><div class="footer-bottom"><span>${escapeHTML(brand.proposalLabel)}</span><span>${escapeHTML(content.legalNote)}</span></div></footer>`;
}

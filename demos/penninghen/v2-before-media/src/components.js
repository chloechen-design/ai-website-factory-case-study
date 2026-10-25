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

export function MediaPlaceholder({ media, className = "" }) {
  return `<figure class="media-slot media-slot--${escapeHTML(media.ratio || "wide")} ${escapeHTML(className)}">
    <div class="media-slot__notice"><span class="media-slot__tag">Média non intégré</span><strong>${escapeHTML(media.title)}</strong><span>${escapeHTML(media.alt)}</span></div>
    <figcaption><span>${escapeHTML(media.source)} · Droits à vérifier</span><a href="${escapeHTML(media.sourceUrl)}" target="_blank" rel="noreferrer">Consulter l’original</a></figcaption>
  </figure>`;
}

export function SiteHeader({ brand, content }) {
  const links = content.navigation.map(({ label, href }) => `<a href="${escapeHTML(href)}">${escapeHTML(label)}</a>`).join("");
  return `
    <a class="skip-link" href="#contenu">Aller au contenu</a>
    <div class="announcement"><span>${escapeHTML(content.announcement.label)}</span><a href="${escapeHTML(content.announcement.href)}">${escapeHTML(content.announcement.linkLabel)}</a></div>
    <header class="site-header">
      <a class="brand-lockup" href="#ecole" aria-label="${escapeHTML(brand.name)}, accueil"><span class="brand-name">${escapeHTML(brand.name)}</span><span class="brand-caption">${escapeHTML(brand.positioning)}</span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" data-menu-toggle><span data-menu-label>Menu</span><span class="menu-lines" aria-hidden="true"><i></i><i></i></span></button>
      <nav id="primary-navigation" class="primary-navigation" aria-label="Navigation principale">${links}<a class="nav-action" href="#formations">Explorer</a></nav>
    </header>`;
}

export function Hero({ brand, content }) {
  return `<section class="hero" id="ecole" aria-labelledby="hero-title">
    <div class="hero-copy"><p class="demo-label">${escapeHTML(brand.proposalLabel)} · ${escapeHTML(content.label)}</p><h1 id="hero-title">${escapeHTML(content.title).replace(/\n/g, "<br>")}</h1><p class="hero-description">${escapeHTML(content.description)}</p><div class="hero-actions">${Button({ label: content.primaryAction.label, href: content.primaryAction.href, variant: "light" })}${Button({ label: content.secondaryAction.label, href: content.secondaryAction.href, variant: "text-light" })}</div></div>
    <div class="hero-media">${MediaPlaceholder({ media: content.media, className: "media-slot--hero" })}<p class="hero-media-note">Sélection éditoriale · visuel à valider</p></div>
  </section>`;
}

export function FormationCard({ item }) {
  return `<article class="formation-card formation-card--${escapeHTML(item.tone)}"><span class="formation-card-number">${escapeHTML(item.number)}</span>${MediaPlaceholder({ media: item.media, className: "formation-card-media" })}<h3>${escapeHTML(item.title)}</h3><span class="formation-card-caption">Intitulé observé · détails à confirmer</span></article>`;
}

export function FormationSection({ content }) {
  return `<section class="section formation-section" id="formations" aria-labelledby="formations-title">${SectionHeading({ title: content.title, intro: content.intro, id: "formations-title" })}<div class="formation-grid">${content.items.map((item) => FormationCard({ item })).join("")}</div><p class="source-note">${escapeHTML(content.note)}</p></section>`;
}

export function Metric({ item }) {
  return `<article class="metric"><p class="metric-value">${escapeHTML(item.value)}</p><p class="metric-label">${escapeHTML(item.label)}</p></article>`;
}

export function MetricsSection({ content }) {
  return `<section class="metrics-section section" aria-labelledby="metrics-title">${SectionHeading({ title: content.title, id: "metrics-title" })}<div class="metrics-grid">${content.items.map((item) => Metric({ item })).join("")}</div><p class="source-note">${escapeHTML(content.note)}</p></section>`;
}

export function MediaCard({ item, index }) {
  return `<article class="project-card project-card--${index + 1}">${MediaPlaceholder({ media: item })}<div class="project-card__copy"><p class="editorial-category">${escapeHTML(item.credit)}</p><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.detail)}</p></div></article>`;
}

export function ProjectGallery({ content }) {
  return `<section class="section projects-section" id="projets" aria-labelledby="projects-title">${SectionHeading({ title: content.title, intro: content.intro, id: "projects-title" })}<div class="project-gallery">${content.items.map((item, index) => MediaCard({ item, index })).join("")}</div></section>`;
}

export function EditorialCard({ item }) {
  return `<article class="editorial-card editorial-card--${escapeHTML(item.format)}">${item.media ? MediaPlaceholder({ media: item.media, className: "editorial-card__media" }) : ""}<p class="editorial-category">${escapeHTML(item.category)}</p><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.summary)}</p><a class="editorial-link" href="${escapeHTML(item.href)}" target="_blank" rel="noreferrer">Lire sur le site officiel</a></article>`;
}

export function NewsSection({ content }) {
  return `<section class="section news-section" id="actualites" aria-labelledby="news-title">${SectionHeading({ title: content.title, intro: content.intro, id: "news-title" })}<div class="editorial-grid">${content.items.map((item) => EditorialCard({ item })).join("")}</div></section>`;
}

export function EventItem({ item }) {
  return `<article class="event-item"><div class="event-date"><span>${escapeHTML(item.date)}</span><small>${escapeHTML(item.month)}</small></div><div class="event-copy"><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.time)}</p><small>${escapeHTML(item.detail)}</small></div><a class="event-link" href="${escapeHTML(item.href)}" target="_blank" rel="noreferrer">${escapeHTML(item.linkLabel)}</a></article>`;
}

export function AgendaSection({ content }) {
  return `<section class="section agenda-section" id="agenda" aria-labelledby="agenda-title">${SectionHeading({ title: content.title, intro: content.intro, id: "agenda-title" })}<div class="event-list">${content.items.map((item) => EventItem({ item })).join("")}</div></section>`;
}

export function SiteFooter({ brand, content }) {
  return `<footer class="site-footer"><div class="footer-main"><div class="footer-intro"><p class="footer-brand">${escapeHTML(brand.name)}</p><p>${escapeHTML(content.description)}</p></div><div class="footer-address"><p class="footer-label">${escapeHTML(content.addressLabel)}</p><address>${escapeHTML(content.address)}</address><a href="${escapeHTML(brand.officialUrl)}" target="_blank" rel="noreferrer">Accéder au site officiel</a></div><nav class="footer-links" aria-label="Liens de pied de page">${content.links.map(({ label, href }) => `<a href="${escapeHTML(href)}">${escapeHTML(label)}</a>`).join("")}</nav></div><div class="footer-bottom"><span>${escapeHTML(brand.proposalLabel)}</span><span>${escapeHTML(content.legalNote)}</span></div></footer>`;
}

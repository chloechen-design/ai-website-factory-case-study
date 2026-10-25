import {
  AgendaSection,
  Button,
  EditorialMedia,
  EventItem,
  FormationSection,
  Hero,
  Metric,
  MetricsSection,
  NewsSection,
  ProgramCard,
  SectionHeading,
  SiteFooter,
  SiteHeader,
} from "./components.js?v=sop-07-stepb";
import penninghenSite from "../brands/penninghen/site.js?v=sop-07-stepb";
import lisaaSite from "../brands/lisaa/site.js?v=sop-07-stepb";
import psbSite from "../brands/psb/site.js?v=sop-07-closure";

export const brands = {
  shared: null,
  penninghen: penninghenSite,
  lisaa: lisaaSite,
  psb: psbSite,
};

const sharedSite = {
  brand: {
    id: "shared", name: "Socle commun", positioning: "Exemple neutre pour les primitives partagées",
    proposalLabel: "Contenu de démonstration", officialUrl: "#", pageTitle: "Socle commun",
  },
  content: {
    announcement: { label: "Exemple neutre", href: "#", linkLabel: "État de démonstration" },
    navigation: [{ label: "Rubrique", children: [{ label: "Sous-rubrique", href: "#" }] }, { label: "Agenda", href: "#" }],
    navigationActions: [{ label: "Action principale", href: "#" }, { label: "Action secondaire", href: "#" }],
    hero: { label: "Socle commun", title: "Une structure, plusieurs usages", description: "Exemple de contenu remplaçable par chaque marque.", variant: "split", actions: [{ label: "Action principale", href: "#", variant: "light" }] },
    programs: { title: "Programme de démonstration", intro: "Aucun contenu d’école n’est utilisé dans cet aperçu neutre.", items: [{ program: { id: "demo-program", type: "exemple", attributes: [{ label: "Type", value: "Démonstration" }] }, title: "Contenu à configurer", caption: "Exemple neutre" }] },
    news: { title: "Actualité de démonstration", intro: "Contenu fictif, réservé à l’aperçu du composant.", linkLabel: "Voir l’exemple", items: [{ category: "Exemple", title: "Titre remplaçable", summary: "Résumé de démonstration.", format: "large", href: "#" }] },
    agenda: { title: "Événement de démonstration", intro: "Contenu fictif, réservé à l’aperçu du composant.", items: [{ date: "01", month: "EXEMPLE", title: "Événement remplaçable", time: "Horaire à configurer", detail: "Donnée de démonstration", linkLabel: "Voir", href: "#" }] },
    footer: { description: "Exemple neutre pour visualiser les groupes de liens.", addressLabel: "Information", address: "Donnée à configurer", linkGroups: [{ title: "Exemple", links: [{ label: "Lien remplaçable", href: "#" }] }], legalNote: "Contenu fictif de démonstration." },
  },
  page: { sections: [
    { component: "Hero", contentKey: "hero" },
    { component: "ProgramSection", contentKey: "programs" },
    { component: "NewsSection", contentKey: "news" },
    { component: "AgendaSection", contentKey: "agenda" },
  ], footer: { component: "SiteFooter", contentKey: "footer" } },
};

const catalog = [
  { key: "Button", category: "Core Components", level: "A · Core", title: "Button", variants: "primary, secondary, light, text-light", props: "label, href, variant", usage: "Choisir une variante selon le contraste du fond. Les libellés et liens viennent des données.", status: "Développé", schools: "Penninghen, LISAA, PSB" },
  { key: "SectionHeading", category: "Core Components", level: "A · Core", title: "SectionHeading", variants: "titre seul ou titre et introduction", props: "title, intro, id", usage: "Introduire une section avec un titre descriptif et un court texte facultatif.", status: "Développé", schools: "Penninghen, LISAA, PSB" },
  { key: "EditorialMedia", category: "Core Components", level: "A · Core", title: "EditorialMedia", variants: "wide, portrait, square; source, absent, erreur, diagnostic", props: "title, imageUrl, alt, ratio, sourceUrl, rights, state", usage: "Fournir une description alternative et la provenance. L’état erreur est compact ; l’état diagnostic n’apparaît qu’en bibliothèque.", status: "Développé", schools: "Penninghen, LISAA, PSB", playground: true },
  { key: "Metric", category: "Core Components", level: "A · Core", title: "Metric", variants: "valeur et libellé", props: "value, label", usage: "Utiliser uniquement avec un chiffre sourcé et un périmètre lisible.", status: "Développé", schools: "Penninghen, PSB" },
  { key: "EventItem", category: "Core Components", level: "A · Core", title: "EventItem", variants: "date, horaire, détail, lien", props: "date, month, title, time, detail, href", usage: "Convient à une entrée d’agenda statique. Les filtres ne font pas partie de cette primitive.", status: "Développé", schools: "Penninghen, LISAA, PSB" },
  { key: "SiteHeader", category: "Configurable Components", level: "B · Configurable", title: "Navigation et Header", variants: "liens plats ou menus à divulgation; une ou plusieurs actions; menu mobile", props: "navigation[], children[], navigationActions[], announcement", usage: "Garder les groupes courts. Les sous-menus utilisent les éléments natifs details/summary.", status: "Développé", schools: "Penninghen, LISAA, PSB" },
  { key: "Hero", category: "Configurable Components", level: "B · Configurable", title: "Hero", variants: "split, editorial, cover; composition de repli sans média", props: "variant, title, description, actions[], media, aside", usage: "Tester le média source, l’absence et l’erreur. `cover` devient éditorial en l’absence d’image.", status: "Développé", schools: "Penninghen, LISAA, PSB", playground: true },
  { key: "ProgramCard", category: "Configurable Components", level: "B · Configurable", title: "ProgramCard", variants: "domaine, famille, programme individuel", props: "program.id, program.type, family, meta, attributes[], href", usage: "Employer une catégorie pour les familles et une fiche pour un programme. N’afficher que les métadonnées confirmées.", status: "Développé", schools: "Penninghen, LISAA, PSB", playground: true },
  { key: "ProgramSection", category: "Configurable Components", level: "B · Configurable", title: "ProgramSection", variants: "grille, lignes éditoriales, index de domaines", props: "layout, items[], action, note", usage: "Choisir une composition selon la densité réelle. La grille en lignes convient mieux aux cartes riches en métadonnées.", status: "Développé", schools: "Penninghen, LISAA, PSB", playground: true },
  { key: "NewsSection", category: "Configurable Components", level: "B · Configurable", title: "Actualités", variants: "large, compact, wide; média facultatif", props: "category, title, summary, format, media, href", usage: "Les sources externes doivent pointer vers une publication précise si son URL est connue.", status: "Développé", schools: "Penninghen, LISAA, PSB" },
  { key: "AgendaSection", category: "Configurable Components", level: "B · Configurable", title: "Agenda", variants: "liste statique responsive", props: "items[]: date, time, detail, href", usage: "La liste ne simule ni réservation ni filtre par ville.", status: "Développé", schools: "Penninghen, LISAA, PSB" },
  { key: "SiteFooter", category: "Configurable Components", level: "B · Configurable", title: "Footer à groupes", variants: "groupes de liens configurables", props: "description, address, linkGroups[], legalNote", usage: "Un groupe vide est omis. Les contenus juridiques restent propres à la marque.", status: "Développé", schools: "Penninghen, LISAA, PSB" },
  { key: "LisaaStudyAreaIndex", category: "Brand-specific Components", level: "C · LISAA", title: "Index des domaines LISAA", variants: "index d’ancrages vers les cartes de domaine", props: "title, intro, items[{id,label}]", usage: "Organise les catégories observées. N’invente pas de filtre de catalogue.", status: "Développé", schools: "LISAA" },
  { key: "LisaaProgramFinder", category: "Brand-specific Components", level: "C · LISAA", title: "Programme Finder LISAA", variants: "filière × ville × niveau; résultats, état vide, remise à zéro", props: "programs[{families,cities,level,href}]", usage: "Échantillon de fiches documentées, distinct du moteur et du catalogue officiel LISAA.", status: "Développé · échantillon", schools: "LISAA", playground: true },
  { key: "LisaaCampusOverview", category: "Brand-specific Components", level: "C · LISAA", title: "Aperçu du réseau LISAA", variants: "nombre annoncé, explication et lien source", props: "value, unit, description, sourceUrl, note", usage: "Le nombre est rapporté comme annoncé par LISAA. Le répertoire ville/école n’est pas simulé.", status: "Partiellement développé", schools: "LISAA" },
  { key: "PsbCampusContext", category: "Brand-specific Components", level: "C · PSB", title: "Contexte du Campus Le Delta", variants: "contexte et source", props: "title, place, description, sourceUrl, note", usage: "Présenter le contexte rapporté par PSB sans simuler les services mutualisés du lieu.", status: "Développé", schools: "PSB" },
  { key: "PsbRecognitionPanel", category: "Brand-specific Components", level: "C · PSB", title: "Reconnaissance institutionnelle PSB", variants: "entrée sourcée, texte sans logo", props: "category, title, description, sourceUrl, note", usage: "Vérifier le statut, la période, le périmètre et les droits avant publication.", status: "Partiellement développé", schools: "PSB" },
];

export const componentCatalog = catalog;

function readPath(value, path) {
  return path.split(".").reduce((current, key) => current?.[key], value);
}

function slotContent(site, componentName) {
  const slot = site.page.sections.find((item) => item.component === componentName);
  return slot?.contentKey ? readPath(site.content, slot.contentKey) : undefined;
}

export function getSite(brandId) {
  return brandId === "shared" ? sharedSite : brands[brandId];
}

export function renderComponentPreview(componentName, brandId, options = {}) {
  const site = getSite(brandId);
  const { brand, content } = site;
  if (componentName === "Button") return Button({ label: "Action principale", href: "#preview", variant: "primary" });
  if (componentName === "SectionHeading") return SectionHeading({ title: "Titre de section", intro: "Une introduction facultative, alimentée par les données.", id: "preview-heading" });
  if (componentName === "EditorialMedia") {
    const source = content.hero?.media;
    const state = options.mediaState || "source";
    const media = source ? { ...source } : { title: `Aucun média configuré · ${brand.name}`, alt: "Aucun visuel autorisé n’est configuré pour cet aperçu.", ratio: "wide" };
    if (state === "absent") media.imageUrl = "";
    if (state === "error") { media.imageUrl = media.imageUrl || "preview-error-state"; media.state = "error"; media.loadErrorLabel = "Erreur simulée dans la bibliothèque ; aucun appel réseau n’est effectué."; }
    if (options.ratio) media.ratio = options.ratio;
    return EditorialMedia({ media, mode: "diagnostic" });
  }
  if (componentName === "Metric") return Metric({ item: { value: "Exemple", label: "Valeur à renseigner et à sourcer" } });
  if (componentName === "EventItem") return EventItem({ item: content.agenda.items[0] });
  if (componentName === "SiteHeader") return SiteHeader({ brand, content });
  if (componentName === "Hero") {
    const heroContent = { ...content.hero };
    if (options.variant && options.variant !== "source") heroContent.variant = options.variant;
    if (options.mediaState === "absent") heroContent.media = null;
    if (options.mediaState === "error") heroContent.media = { ...(heroContent.media || {}), state: "error", imageUrl: heroContent.media?.imageUrl || "preview-error-state", loadErrorLabel: "Erreur simulée dans la bibliothèque ; la composition éditoriale reste affichée." };
    if (options.titleLength === "long") {
      heroContent.title = "Un titre de démonstration volontairement plus long pour observer les retours à la ligne";
      heroContent.label = "Titre de démonstration · non éditorial";
    }
    return Hero({ brand, content: heroContent });
  }
  if (componentName === "ProgramSection") {
    const value = slotContent(site, "ProgramSection");
    if (value) return FormationSection({ content: { ...value, ...(options.layout && options.layout !== "source" ? { layout: options.layout } : {}) } });
    return `<p class="preview-unavailable">Cette page ne contient pas de section programme à cet endroit.</p>`;
  }
  if (componentName === "NewsSection") return NewsSection({ content: content.news });
  if (componentName === "AgendaSection") return AgendaSection({ content: content.agenda });
  if (componentName === "SiteFooter") return SiteFooter({ brand, content: content.footer });
  if (componentName === "ProgramCard") {
    const programs = content.programs || content.formations || slotContent(site, "ProgramSection");
    const item = programs.items[0];
    const nextItem = { ...item, program: { ...(item.program || {}), type: options.programType && options.programType !== "source" ? options.programType : item.program?.type } };
    if (options.titleLength === "long") nextItem.title = "Titre de démonstration volontairement étendu pour observer le comportement de la carte";
    return ProgramCard({ item: nextItem });
  }
  const custom = site.components?.[componentName];
  const customSlot = site.page.sections.find((item) => item.component === componentName);
  if (custom && customSlot) return custom({ brand, content: readPath(content, customSlot.contentKey), slot: customSlot, site });
  const targetBrandId = componentName.startsWith("Lisaa") ? "lisaa" : componentName.startsWith("Psb") ? "psb" : brandId;
  const targetBrand = brands[targetBrandId]?.brand || brand;
  return `<p class="preview-unavailable">Composant spécifique à ${targetBrand.name}. Sélectionne ${targetBrand.name} pour afficher son aperçu.</p>`;
}

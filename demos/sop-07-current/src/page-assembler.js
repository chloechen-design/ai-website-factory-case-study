import { sharedComponentRegistry } from "./component-registry.js?v=sop-07-stepb";

function getPath(value, path) {
  if (!path) return value;
  return path.split(".").reduce((current, key) => current?.[key], value);
}

function renderSlot(slot, site, registry) {
  if (!slot) return "";
  const component = site.components?.[slot.component] || registry[slot.component];
  if (typeof component !== "function") {
    throw new Error(`Composant introuvable dans le registre : ${slot.component}`);
  }
  const content = slot.contentKey ? getPath(site.content, slot.contentKey) : site.content;
  if (content === undefined) throw new Error(`Contenu introuvable : ${slot.contentKey}`);
  return component({ brand: site.brand, content, slot, site });
}

/* Fonction pure, utilisée par le navigateur et les tests du contrat d'assemblage. */
export function renderPageMarkup(site, registry = sharedComponentRegistry) {
  if (!site?.brand || !site?.content || !Array.isArray(site?.page?.sections)) {
    throw new Error("Le manifeste de page doit définir une marque, un contenu et une liste de sections.");
  }
  const header = renderSlot(site.page.header || { component: "SiteHeader" }, site, registry);
  const sections = site.page.sections.map((slot) => renderSlot(slot, site, registry)).join("");
  const footer = renderSlot(site.page.footer || { component: "SiteFooter", contentKey: "footer" }, site, registry);
  return `${header}<main id="contenu">${sections}</main>${footer}`;
}

async function applyBrandPresentation(site, documentRef) {
  const { brand } = site;
  documentRef.documentElement.dataset.brand = brand.id;
  const themeLink = documentRef.querySelector("[data-brand-theme]");
  if (themeLink && site.themeUrl) {
    const themeUrl = new URL(site.themeUrl, documentRef.baseURI).href;
    if (themeLink.href !== themeUrl) {
      await new Promise((resolve, reject) => {
        themeLink.addEventListener("load", resolve, { once: true });
        themeLink.addEventListener("error", reject, { once: true });
        themeLink.href = themeUrl;
      });
    }
  }
  const themeColorMeta = documentRef.querySelector('meta[name="theme-color"]');
  const descriptionMeta = documentRef.querySelector('meta[name="description"]');
  if (brand.pageTitle) documentRef.title = brand.pageTitle;
  if (themeColorMeta && brand.themeColor) themeColorMeta.content = brand.themeColor;
  if (descriptionMeta && brand.metaDescription) descriptionMeta.content = brand.metaDescription;
}

function bindPageInteractions(root, documentRef) {
  root.querySelectorAll("[data-media-image]").forEach((image) => {
    const figure = image.closest("[data-media-state]");
    const markLoaded = () => { if (figure) figure.dataset.mediaState = "loaded"; };
    const markError = () => {
      image.hidden = true;
      if (figure) figure.dataset.mediaState = "error";
      const fallback = image.parentElement.querySelector("[data-media-error]");
      if (fallback) fallback.hidden = false;
      const hero = image.closest(".hero");
      if (hero) {
        hero.classList.add("hero--media-error");
        hero.querySelectorAll(".hero-media, .hero-cover-background").forEach((container) => { container.hidden = true; });
        const heroFallback = hero.querySelector("[data-hero-media-error]");
        if (heroFallback) heroFallback.hidden = false;
      }
    };
    image.addEventListener("error", markError, { once: true });
    image.addEventListener("load", markLoaded, { once: true });
    if (image.complete && image.naturalWidth > 0) markLoaded();
    else if (image.complete && image.naturalWidth === 0) markError();
  });

  const menuToggle = root.querySelector("[data-menu-toggle]");
  const menuLabel = root.querySelector("[data-menu-label]");
  if (!menuToggle || !menuLabel) return;

  const setMenuOpen = (open) => {
    documentRef.documentElement.dataset.menuOpen = String(open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuLabel.textContent = open ? "Fermer" : "Menu";
  };
  menuToggle.addEventListener("click", () => setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true"));
  root.querySelectorAll(".primary-navigation a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });
  documentRef.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    setMenuOpen(false);
    root.querySelectorAll(".navigation-group[open]").forEach((group) => group.removeAttribute("open"));
  });
}

export async function assemblePage({ root, site, registry = sharedComponentRegistry, documentRef = globalThis.document }) {
  if (!root || !documentRef) throw new Error("Il faut un conteneur et un document pour assembler la page.");
  await applyBrandPresentation(site, documentRef);
  root.innerHTML = renderPageMarkup(site, registry);
  root.dataset.pageAssembler = "shared";
  bindPageInteractions(root, documentRef);
  await site.initialize?.({ root, documentRef, site });
  return { brandId: site.brand.id, sectionCount: site.page.sections.length };
}

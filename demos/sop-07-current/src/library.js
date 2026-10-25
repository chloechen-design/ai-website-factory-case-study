import { componentCatalog, getSite, renderComponentPreview } from "./library-catalog.js?v=sop-07-closure";
import { gapInventory } from "../data/06c-gap-inventory.js?v=sop-07-stepb2";

const app = document.querySelector("#library-app");
const themeLink = document.querySelector("[data-library-brand-theme]");
const demoRoot = new URL("../", import.meta.url);
const demoRoute = (path) => new URL(path, demoRoot).href;
const brands = [
  { id: "shared", label: "Core / Shared" },
  { id: "penninghen", label: "Penninghen" },
  { id: "lisaa", label: "LISAA" },
  { id: "psb", label: "PSB" },
];
let selectedBrand = "shared";
let selectedViewport = "desktop";
const playgroundSettings = Object.create(null);

const sections = [
  ["foundations", "Fondations"],
  ["core-components", "Core Components"],
  ["configurable-components", "Configurable Components"],
  ["brand-components", "Brand-specific Components"],
  ["page-templates", "Page Templates"],
  ["gap-inventory", "Gap Inventory"],
];

function renderShell() {
  if (!app) throw new Error("Conteneur de bibliothèque introuvable.");
  app.innerHTML = `
    <a class="lib-skip" href="#library-main">Aller au contenu de la bibliothèque</a>
    <div class="lib-frame">
      <aside class="lib-sidebar" aria-label="Navigation de la bibliothèque">
        <a class="lib-wordmark" href="#top" aria-label="School Website Factory, accueil bibliothèque"><span class="lib-mark" aria-hidden="true">S</span><span><strong>School Website</strong><small>Factory POC</small></span></a>
        <p class="lib-sidebar-label">Bibliothèque</p>
        <nav class="lib-side-nav">${sections.map(([id, label]) => `<a href="#${id}">${label}</a>`).join("")}</nav>
        <div class="lib-sidebar-bottom"><span>POC indépendant</span><span>HTML · CSS · JavaScript</span></div>
      </aside>
      <main id="library-main" class="lib-main">
        <header id="top" class="lib-topbar">
          <div class="lib-breadcrumb"><span>Design system</span><span aria-hidden="true">/</span><strong>Multi-marques</strong></div>
          <div class="lib-brand-picker" role="group" aria-label="Choisir le thème des aperçus">
            <span>Marque de l’aperçu</span>
            ${brands.map(({ id, label }) => `<button type="button" data-brand-select="${id}" aria-pressed="${id === selectedBrand}">${label}</button>`).join("")}
          </div>
        </header>
        <section class="lib-intro" aria-labelledby="library-title">
          <div class="lib-intro-copy">
            <p class="lib-kicker">Composants, thèmes et pages</p>
            <h1 id="library-title">Un système.<br><span>Trois identités.</span></h1>
            <p>Une bibliothèque de consultation construite avec les composants qui assemblent réellement les prototypes Penninghen, LISAA et PSB.</p>
          </div>
          <div class="lib-intro-summary" aria-label="Niveaux de mutualisation">
            <a href="#core-components"><strong>A</strong><span>Core</span></a>
            <a href="#configurable-components"><strong>B</strong><span>Configurable</span></a>
            <a href="#brand-components"><strong>C</strong><span>Spécifique</span></a>
            <p>Les annotations C signalent ici un composant réservé à une marque. Dans la matrice 06B, C désignait une capacité manquante.</p>
          </div>
        </section>

        <section id="foundations" class="lib-section" aria-labelledby="foundations-title">
          <div class="lib-section-heading"><p class="lib-kicker">01 · Fondations</p><h2 id="foundations-title">Rôles communs, valeurs de marque</h2><p>Les composants consomment les mêmes rôles. Les thèmes changent les valeurs, pas la structure.</p></div>
          <div id="token-board" class="token-board" aria-live="polite"></div>
        </section>

        <section id="core-components" class="lib-section" aria-labelledby="core-title">
          <div class="lib-section-heading"><p class="lib-kicker">02 · Niveau A</p><h2 id="core-title">Core Components</h2><p>Primitives structurelles utilisables sans adaptation propre à une marque.</p></div>
          <div class="component-list" data-catalog-category="Core Components"></div>
        </section>

        <section id="configurable-components" class="lib-section" aria-labelledby="configurable-title">
          <div class="lib-section-heading"><p class="lib-kicker">03 · Niveau B</p><h2 id="configurable-title">Configurable Components</h2><p>La structure reste partagée. Les données, le thème ou une variante prévue changent selon la page.</p></div>
          <div class="component-list" data-catalog-category="Configurable Components"></div>
        </section>

        <section id="brand-components" class="lib-section" aria-labelledby="brand-title">
          <div class="lib-section-heading"><p class="lib-kicker">04 · Niveau C</p><h2 id="brand-title">Brand-specific Components</h2><p>Extensions isolées, gardées hors du registre commun tant qu’un besoin partagé ne le justifie pas.</p></div>
          <div class="component-list component-list--brand" data-catalog-category="Brand-specific Components"></div>
        </section>

        <section id="page-templates" class="lib-section" aria-labelledby="templates-title">
          <div class="lib-section-heading"><p class="lib-kicker">05 · Assemblage</p><h2 id="templates-title">Page Templates</h2><p>Chaque route charge son manifeste de marque, ses données et son thème, puis passe par le même Page Assembler.</p></div>
          <div class="template-toolbar"><div id="template-brand-tabs" role="group" aria-label="Choisir la page à prévisualiser"></div><div class="viewport-switch" role="group" aria-label="Format de prévisualisation"><button type="button" data-viewport-select="desktop" aria-pressed="true">Desktop</button><button type="button" data-viewport-select="mobile" aria-pressed="false">Mobile · 390 px</button></div></div>
          <div class="template-frame-wrap"><iframe id="template-preview" title="Aperçu de page assemblée" loading="lazy"></iframe></div>
          <div id="template-links" class="template-links"></div>
        </section>

        <section id="gap-inventory" class="lib-section" aria-labelledby="gaps-title">
          <div class="lib-section-heading"><p class="lib-kicker">06 · Décisions</p><h2 id="gaps-title">Gap Inventory</h2><p>Les besoins sont regroupés lorsque la même extension peut répondre à plusieurs écoles.</p></div>
          <p class="gap-definition"><strong>Lecture :</strong> la cause est issue du code ou de l’audit ; « preuve » décrit ce qui a réellement été vérifié ou reste à vérifier. A désigne le socle commun, B la configuration partagée, C un composant spécifique.</p>
          <div class="gap-table-wrap"><table class="gap-table"><thead><tr><th scope="col">Problème initial</th><th scope="col">École</th><th scope="col">Cause vérifiée</th><th scope="col">Décision</th><th scope="col">Solution / composant</th><th scope="col">État / preuve</th><th scope="col">Limites / priorité</th></tr></thead><tbody id="gap-rows"></tbody></table></div>
        </section>
        <footer class="lib-footer"><span>Projet exploratoire indépendant, non affilié à Galileo Global Education.</span><a href="#top">Retour en haut</a></footer>
      </main>
    </div>`;
}

function selectedTheme(siteId) {
  return siteId === "shared" ? null : getSite(siteId)?.themeUrl;
}

async function setBrand(brandId) {
  selectedBrand = brandId;
  document.documentElement.dataset.brand = brandId;
  const href = selectedTheme(brandId);
  if (themeLink) {
    if (!href) themeLink.removeAttribute("href");
    else if (themeLink.href !== new URL(href, document.baseURI).href) {
      await new Promise((resolve) => {
        themeLink.addEventListener("load", resolve, { once: true });
        themeLink.addEventListener("error", resolve, { once: true });
        themeLink.href = href;
      });
    }
  }
  document.querySelectorAll("[data-brand-select]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.brandSelect === brandId)));
  renderTokenBoard();
  renderComponentLists();
}

function tokenValue(style, name, fallback) {
  return style.getPropertyValue(name).trim() || fallback;
}

function renderTokenBoard() {
  const root = document.querySelector("#token-board");
  if (!root) return;
  const style = getComputedStyle(document.documentElement);
  const colors = [
    ["Surface de page", "--color-page", "#f5f5f2"],
    ["Encre", "--color-ink", "#111111"],
    ["Accent de marque", "--color-accent", "#f2dc00"],
    ["Trait", "--color-rule", "#c9c9c3"],
  ];
  const swatches = colors.map(([label, token, fallback]) => {
    const value = tokenValue(style, token, fallback);
    return `<div class="token-swatch"><span style="--swatch:${value}" aria-hidden="true"></span><div><strong>${label}</strong><code>${value}</code></div></div>`;
  }).join("");
  const displayFont = tokenValue(style, "--font-display", "Helvetica, Arial, sans-serif");
  const bodyFont = tokenValue(style, "--font-body", "Helvetica, Arial, sans-serif");
  root.innerHTML = `<div class="token-panel token-panel--colors"><div class="token-panel-head"><h3>Couleurs sémantiques</h3><span>${selectedBrand === "shared" ? "Fallback commun" : `Thème ${selectedBrand}`}</span></div><div class="token-swatches">${swatches}</div></div><div class="token-panel token-panel--type"><div class="token-panel-head"><h3>Typographie</h3><span>Rôles partagés</span></div><p class="token-display-sample" style="font-family:${displayFont}">Aa <span>Titre</span></p><dl><div><dt>Display</dt><dd>${displayFont}</dd></div><div><dt>Texte</dt><dd>${bodyFont}</dd></div></dl></div><div class="token-panel token-panel--scale"><div class="token-panel-head"><h3>Espacement et grille</h3><span>Échelle commune</span></div><div class="spacing-samples"><div><span>space-1</span><i style="--sample-size:.5rem"></i></div><div><span>space-2</span><i style="--sample-size:1rem"></i></div><div><span>space-3</span><i style="--sample-size:1.5rem"></i></div><div><span>space-4</span><i style="--sample-size:2.5rem"></i></div></div><p>Gouttière fluide · largeur de contenu limitée · grille repliée en une colonne sous 760 px.</p></div>`;
}

function renderComponentCard(item) {
  const settings = playgroundSettings[item.key] || {};
  const preview = renderComponentPreview(item.key, selectedBrand, settings);
  const controls = renderPlaygroundControls(item, settings);
  const source = item.key === "LisaaProgramFinder" || item.key.startsWith("Lisaa") ? "brands/lisaa/components.js" : item.key.startsWith("Psb") ? "brands/psb/components.js" : item.key === "Hero" || item.key.startsWith("Program") ? "src/components.js · src/page-assembler.js" : "src/components.js";
  return `<article class="component-doc" id="component-${item.key}"><header class="component-doc-head"><div><p>${item.level}</p><h3>${item.title}</h3></div><span class="component-status">${item.status}</span></header><div class="component-doc-body"><div class="component-playground">${controls}<div class="component-preview" data-component-preview="${item.key}">${preview}</div></div><aside class="component-meta"><dl><div><dt>Variantes</dt><dd>${item.variants}</dd></div><div><dt>Propriétés</dt><dd><code>${item.props}</code></dd></div><div><dt>Usage</dt><dd>${item.usage}</dd></div><div><dt>Écoles concernées</dt><dd>${item.schools}</dd></div><div><dt>Source dans le projet</dt><dd><code>${source}</code></dd></div></dl></aside></div></article>`;
}

function renderPlaygroundControls(item, settings) {
  if (!item.playground) return "";
  const control = (label, key, options) => `<label>${label}<select data-playground-component="${item.key}" data-playground-setting="${key}">${options.map(([value, text]) => `<option value="${value}"${(settings[key] || options[0][0]) === value ? " selected" : ""}>${text}</option>`).join("")}</select></label>`;
  let controls = "";
  if (item.key === "Hero") {
    controls = control("Composition", "variant", [["source", "Configuration de la marque"], ["split", "Split"], ["editorial", "Éditorial"], ["cover", "Cover · média si fourni"]])
      + control("État média", "mediaState", [["source", "Source de la marque"], ["absent", "Absent"], ["error", "Erreur simulée"]])
      + control("Titre", "titleLength", [["source", "Contenu de la marque"], ["long", "Démonstration longue"]]);
  } else if (item.key === "EditorialMedia") {
    controls = control("État média", "mediaState", [["source", "Source de la marque"], ["absent", "Absent · diagnostic"], ["error", "Erreur simulée"]])
      + control("Proportion", "ratio", [["wide", "Paysage"], ["portrait", "Portrait"], ["square", "Carré"]]);
  } else if (item.key === "ProgramCard") {
    controls = control("Type de contenu", "programType", [["source", "Type de la marque"], ["domain", "Domaine"], ["family", "Famille de programmes"], ["program", "Programme individuel"]])
      + control("Titre", "titleLength", [["source", "Contenu de la marque"], ["long", "Démonstration longue"]]);
  } else if (item.key === "ProgramSection") {
    controls = control("Composition", "layout", [["source", "Configuration de la marque"], ["grid", "Grille"], ["rows", "Lignes éditoriales"], ["domains", "Domaines"]]);
  } else if (item.key === "LisaaProgramFinder") {
    controls = `<p class="playground-note">Les trois filtres ci-dessous sont fonctionnels sur l’échantillon documenté. Aucun catalogue officiel n’est connecté.</p>`;
  }
  return `<div class="playground-controls" aria-label="Contrôles de prévisualisation ${item.title}">${controls}<p class="playground-note" data-playground-note>${item.key === "Hero" || item.key === "EditorialMedia" ? "Le mode erreur est simulé sans requête réseau." : "Les titres de démonstration ne sont pas des contenus d’école."}</p></div>`;
}

function renderComponentLists() {
  document.querySelectorAll("[data-catalog-category]").forEach((container) => {
    container.innerHTML = componentCatalog.filter((item) => item.category === container.dataset.catalogCategory).map(renderComponentCard).join("");
  });
  const site = getSite(selectedBrand);
  if (site?.initialize) void site.initialize({ root: app, documentRef: document, site });
}

function renderTemplateControls() {
  const tabs = document.querySelector("#template-brand-tabs");
  const links = document.querySelector("#template-links");
  if (!tabs || !links) return;
  const pages = brands.filter(({ id }) => id !== "shared");
  tabs.innerHTML = pages.map(({ id, label }) => `<button type="button" data-template-brand="${id}" aria-pressed="false">${label}</button>`).join("");
  links.innerHTML = pages.map(({ id, label }) => `<a href="${demoRoute(`sites/${id}/`)}" target="_blank" rel="noreferrer">Ouvrir ${label} dans un nouvel onglet</a>`).join("");
  selectTemplate("penninghen");
}

function selectTemplate(brandId) {
  const frame = document.querySelector("#template-preview");
  if (!frame) return;
  frame.src = demoRoute(`sites/${brandId}/`);
  frame.title = `Aperçu du prototype ${brandId}`;
  document.querySelectorAll("[data-template-brand]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.templateBrand === brandId)));
}

function renderGaps() {
  const rows = document.querySelector("#gap-rows");
  if (!rows) return;
  rows.innerHTML = gapInventory.map((item) => `<tr><th scope="row">${item.need}</th><td>${item.schools}</td><td>${item.cause}</td><td><span class="gap-category gap-category--${item.decision.startsWith("A") ? "a" : item.decision.startsWith("B") ? "b" : item.decision.startsWith("C") ? "c" : "shared"}">${item.decision}</span></td><td>${item.solution}<br><code>${item.component}</code></td><td><strong>${item.status}</strong><br>${item.proof}</td><td>${item.limits}<br><strong>${item.priority}</strong></td></tr>`).join("");
}

function bindInteractions() {
  app.addEventListener("click", (event) => {
    const brandButton = event.target.closest("[data-brand-select]");
    if (brandButton) void setBrand(brandButton.dataset.brandSelect);
    const templateButton = event.target.closest("[data-template-brand]");
    if (templateButton) selectTemplate(templateButton.dataset.templateBrand);
    const viewportButton = event.target.closest("[data-viewport-select]");
    if (viewportButton) {
      selectedViewport = viewportButton.dataset.viewportSelect;
      const frame = document.querySelector("#template-preview");
      frame?.classList.toggle("is-mobile", selectedViewport === "mobile");
      document.querySelectorAll("[data-viewport-select]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.viewportSelect === selectedViewport)));
    }
  });
  app.addEventListener("change", (event) => {
    const setting = event.target.closest("[data-playground-setting]");
    if (!setting) return;
    const { playgroundComponent: component, playgroundSetting: key } = setting.dataset;
    playgroundSettings[component] = { ...(playgroundSettings[component] || {}), [key]: setting.value };
    renderComponentLists();
  });
}

renderShell();
renderTokenBoard();
renderComponentLists();
renderGaps();
renderTemplateControls();
bindInteractions();

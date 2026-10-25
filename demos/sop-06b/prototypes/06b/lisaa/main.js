import { AgendaSection, NewsSection, SectionHeading, SiteFooter, SiteHeader, MetricsSection } from "../../../src/components.js?v=sop-06b-1";
import { lisaaBrand as brand } from "../../../brands/lisaa/config.js";
import { lisaaHomepage as content } from "../../../data/lisaa-homepage.js";
import { auditAssemblyGap, auditBanner, auditMarker, diagnosticGap } from "../audit-tools.js?v=sop-06b-1";

const app = document.querySelector("#app");
document.title = brand.pageTitle;
const headerC = {
  id: "gap-header", need: "Navigation hiérarchique par domaine, niveau et ville, avec plusieurs actions",
  limit: "SiteHeader ne rend qu’une liste plate de liens et un CTA ; il ne sait pas grouper les domaines ni gérer plusieurs utilitaires.",
  extension: "Navigation à divulgation accessible, groupes configurables et actions multiples avec comportement clavier/mobile.",
};
const heroC = {
  id: "gap-hero", need: "Hero photo, repères de filière et accès immédiat à la recherche de formation",
  limit: "Hero commun figé en deux colonnes, avec un média adjacent et exactement deux actions ; il ne couvre pas la composition observée LISAA.",
  extension: "Variantes de composition avec média plein cadre, catégories configurables et zone d’action ; rien n’est rendu fonctionnel ici.",
};
const finderC = {
  id: "gap-finder", need: "Recherche combinée par ville, filière et niveau, avec orientation vers les programmes",
  limit: "Aucun moteur ou modèle de programme filtrable n’existe dans le système actuel.",
  extension: "Formulaire de recherche accessible connecté à un catalogue avec taxonomies et états explicites.",
};
const catalogC = {
  id: "gap-catalog", need: "Catalogue structuré par filière, campus, spécialité, niveau, rythme et langue",
  limit: "FormationCard n’a ni lien de destination ni métadonnées structurées ; concaténer ces champs dans son texte empêcherait filtrage et lecture fiable.",
  extension: "Type de contenu programme et carte de programme liée avec attributs structurés, sans inventer de formations.",
};
const campusC = {
  id: "gap-campus", need: "Réseau LISAA multi-villes et plusieurs écoles/domaines à Paris",
  limit: "Aucun modèle de campus ou de relation ville → école → filière n’existe.",
  extension: "Répertoire de campus et sélecteur de ville liés à des données d’établissement configurables.",
};
const eventFilterC = {
  id: "gap-event-filter", need: "Filtrer les événements selon la ville choisie",
  limit: "AgendaSection affiche une liste statique sans taxonomie de ville ni état de filtre.",
  extension: "Filtre accessible relié à des champs d’événement structurés (ville, date, format).",
};
const admissionC = {
  id: "gap-admissions", need: "Présenter le parcours d’admission en quatre étapes tel qu’observé chez LISAA",
  limit: "Le système n’a pas de composant d’étapes ni de contenu typé pour les démarches.",
  extension: "Pattern d’étapes alimenté par des données d’admission vérifiées et datées.",
};
const testimonialC = {
  id: "gap-testimonial", need: "Mettre en avant le témoignage observé sur la page LISAA",
  limit: "EditorialCard ne représente pas une citation avec auteur, rôle, portrait et droits associés.",
  extension: "Composant de témoignage sémantique avec citation, identité, fonction, média et consentement configurables.",
};
const footerC = {
  id: "gap-footer", need: "Footer avec liens vers les différentes écoles, raccourcis et réseaux sociaux",
  limit: "SiteFooter ne propose qu’un bloc de présentation, une adresse, un groupe de liens et une note légale.",
  extension: "Footer à groupes de liens typés, réseau d’écoles, contact et réseaux sociaux configurables.",
};

const config = {
  brand,
  content,
  gaps: { headerC, heroC, finderC, catalogC, campusC, eventFilterC, admissionC, testimonialC, footerC },
};

app.innerHTML = `
  ${auditBanner({ name: brand.name, counterpart: "PSB", counterpartHref: "../psb/", observationNote: "valeurs de thème approximatives, polices exactes et chartes non vérifiées." })}
  <div class="audit-legend" aria-label="Légende des statuts">
    <span><b class="audit-state audit-state--a">A — Réutilisation directe</b> structure commune inchangée</span>
    <span><b class="audit-state audit-state--b">B — Configuration</b> contenu ou thème remplacé</span>
    <span><b class="audit-state audit-state--c">C — Extension nécessaire</b> diagnostic statique, pas de fonctionnalité</span>
  </div>
  ${SiteHeader({ brand, content })}
  ${auditMarker("b", "SiteHeader configuré avec contenu et thème LISAA · liens simples seulement")}
  ${diagnosticGap(headerC)}
  <main id="contenu">
    <section class="audit-hero-shell" id="ecole" aria-labelledby="audit-hero-title">
      <div class="audit-hero-shell__inner">
        <p class="audit-hero-shell__eyebrow">Contenu observé · composition non développée</p>
        <h1 id="audit-hero-title">${content.hero.title.replace(/\n/g, "<br>")}</h1>
        <p class="audit-hero-shell__note">${content.hero.note || content.hero.description}</p>
        ${diagnosticGap(heroC).replace('class="audit-gap"', 'class="audit-gap audit-gap--hero"')}
      </div>
    </section>
    <section class="audit-section" id="formations">
      ${auditMarker("a", "SectionHeading · titre et introduction seulement")}
      ${SectionHeading({ title: "Trouver une formation", intro: "Les domaines ci-dessous sont ceux observés sur l’accueil LISAA ; aucun programme ou parcours n’est ajouté." , id: "lisaa-finder-title" })}
      <p class="audit-datasource">Domaines observés : ${content.studyAreas.join(" · ")}</p>
      ${diagnosticGap(finderC)}
    </section>
    <section class="audit-section audit-section--soft">
      ${auditMarker("a", "SectionHeading · structure commune sans changement")}
      ${SectionHeading({ title: "Catalogue de formations", intro: "Zone conservée à sa place logique ; les programmes détaillés ne sont pas simulés.", id: "lisaa-catalog-title" })}
      ${diagnosticGap(catalogC)}
    </section>
    <section class="audit-section" id="campus">
      ${auditMarker("a", "SectionHeading · structure commune sans changement")}
      ${SectionHeading({ title: "Un réseau de campus", intro: "LISAA annonce dix campus en France sur son accueil ; la relation entre villes, écoles et filières demande un modèle dédié.", id: "lisaa-campus-title" })}
      ${MetricsSection({ content: { title: "Repère affiché par LISAA", note: "Donnée rapportée telle que présentée par LISAA sur l’accueil consulté le 24 octobre 2026 ; périmètre à revérifier.", items: [{ value: "10", label: "campus en France — chiffre annoncé par LISAA" }] } })}
      ${diagnosticGap(campusC)}
    </section>
    <section class="audit-section audit-section--media" id="vie-etudiante">
      ${SectionHeading({ title: "Vie de l’école · emplacement média", intro: "Emplacement provisoire de l’audit ; une ressource autorisée et son texte alternatif restent à fournir.", id: "lisaa-media-title" })}
      <figure class="audit-media-placeholder" role="note" aria-label="Emplacement média vide ; aucune photographie intégrée">
        <span>EMPLACEMENT MÉDIA · NON REMPLI</span><strong>${content.mediaSlot.title}</strong><p>${content.mediaSlot.alt}</p>
      </figure>
      <div class="audit-section--media__copy"><h3>Un emplacement, pas une attribution.</h3><p>Aucune photographie n’est embarquée. La description alternative sera à renseigner dans les données lorsqu’une ressource autorisée sera disponible.</p>${auditMarker("b", "Slot média renseigné dans les données · aucune image chargée")}</div>
    </section>
    <section class="audit-section audit-section--news" id="actualites">
      ${auditMarker("b", "NewsSection / EditorialCard · titres, résumés, catégories et liens configurés")}
      ${NewsSection({ content: config.content.news })}
    </section>
    <section class="audit-section audit-section--soft" id="agenda">
      ${auditMarker("a", "SectionHeading et EventItem · liste statique configurée, pas de filtre")}
      ${SectionHeading({ title: content.agenda.title, intro: content.agenda.intro, id: "lisaa-agenda-title" })}
      ${diagnosticGap(eventFilterC)}
    </section>
    <section class="audit-section audit-section--agenda" aria-labelledby="lisaa-events-title">
      ${AgendaSection({ content: { ...content.agenda, title: "Rendez-vous publiés", intro: "Liste B statique. Les événements ne sont ni filtrés ni inscrivables depuis ce prototype." } })}
    </section>
    <section class="audit-section" id="admissions">
      ${auditMarker("a", "SectionHeading · structure commune sans changement")}
      ${SectionHeading({ title: "Admissions", intro: "Le site officiel présente un parcours rapide en quatre étapes ; aucune étape opérationnelle n’est reconstruite ici.", id: "lisaa-admission-title" })}
      ${diagnosticGap(admissionC)}
    </section>
    <section class="audit-section audit-section--soft">
      ${auditMarker("a", "SectionHeading · structure commune sans changement")}
      ${SectionHeading({ title: "Paroles de l’école", intro: "Un témoignage est observé sur l’accueil officiel ; sa citation complète et les droits de réutilisation ne sont pas reproduits.", id: "lisaa-testimonial-title" })}
      ${diagnosticGap(testimonialC)}
    </section>
  </main>
  <section class="audit-section--footer-gap">${diagnosticGap(footerC)}</section>
  <section class="audit-section audit-section--soft">${auditAssemblyGap()}</section>
  ${SiteFooter({ brand, content: config.content.footer })}
`;

const menuToggle = document.querySelector("[data-menu-toggle]");
if (menuToggle) {
  const menuLabel = document.querySelector("[data-menu-label]");
  const setMenuOpen = (open) => {
    document.documentElement.dataset.menuOpen = String(open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuLabel.textContent = open ? "Fermer" : "Menu";
  };
  menuToggle.addEventListener("click", () => setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true"));
  document.querySelectorAll(".primary-navigation a").forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenuOpen(false); });
}

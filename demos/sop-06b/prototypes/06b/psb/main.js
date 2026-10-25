import { AgendaSection, MetricsSection, NewsSection, SectionHeading, SiteFooter, SiteHeader } from "../../../src/components.js?v=sop-06b-1";
import { psbBrand as brand } from "../../../brands/psb/config.js";
import { psbHomepage as content } from "../../../data/psb-homepage.js";
import { auditAssemblyGap, auditBanner, auditMarker, diagnosticGap } from "../audit-tools.js?v=sop-06b-1";

const app = document.querySelector("#app");
document.title = brand.pageTitle;
const headerC = {
  id: "gap-header", need: "Navigation hiérarchique par domaine, plusieurs actions utilitaires et langues",
  limit: "SiteHeader ne rend qu’une liste plate de liens et un CTA ; aucun menu de divulgation, groupe ou sélecteur de langue.",
  extension: "Navigation à divulgation accessible, groupes configurables, actions multiples et comportement clavier/mobile.",
};
const heroC = {
  id: "gap-hero", need: "Hero photo plein cadre avec titre et trois appels à l’action sur desktop",
  limit: "Hero commun est une composition fixe à deux colonnes, média adjacent, deux actions ; les trois CTA et la photographie immersive ne sont pas configurables.",
  extension: "Variantes de composition plein cadre et split, nombre d’actions paramétrable et adaptation mobile dédiée.",
};
const finderC = {
  id: "gap-finder", need: "Point d’entrée vers l’outil d’orientation / program finder de PSB",
  limit: "Aucun outil d’orientation ni parcours associé n’existe dans le système ; la cible et le comportement externe ne sont pas définis ici.",
  extension: "Composant de lancement configurable vers l’outil officiel ou un parcours simulé explicitement, après validation de sa destination.",
};
const catalogC = {
  id: "gap-catalog", need: "Présenter PGE, Bachelors, MSc/Masters of Science et Executive Education avec leurs parcours",
  limit: "FormationCard n’a ni destination cliquable ni champs structurés pour diplômes, tracks et voies d’admission.",
  extension: "Type de contenu programme et carte liée avec métadonnées structurées par famille de programme.",
};
const campusC = {
  id: "gap-campus", need: "Présenter le Campus Le Delta comme campus partagé et le relier à la vie de l’école",
  limit: "Aucun composant ni modèle de campus partagé n’existe.",
  extension: "Pattern de présentation de campus et relations entre lieu, école et services, nourri par des données configurables.",
};
const admissionC = {
  id: "gap-admissions", need: "Orienter vers des voies d’admission différentes selon PGE, Bachelor et autres programmes",
  limit: "Aucun parcours par programme ni séquence d’étapes n’est représentable avec les composants actuels.",
  extension: "Parcours d’admission ramifiés par type de programme, alimentés par des règles vérifiées et datées.",
};
const recognitionC = {
  id: "gap-recognition", need: "Présenter les accréditations et reconnaissances comme preuves institutionnelles distinctes",
  limit: "MetricsSection affiche seulement des couples valeur / libellé ; aucun organisme, logo, statut, date ou portée ne peut être exprimé.",
  extension: "Bandeau ou liste de reconnaissances avec nom, organisme, portée, période, source et ressource graphique autorisée.",
};
const testimonialC = {
  id: "gap-testimonial", need: "Mettre en valeur des citations d’alumni avec portrait, fonction et organisation",
  limit: "EditorialCard ne modélise pas la sémantique de citation, l’auteur, son rôle ou l’organisation.",
  extension: "Composant témoignage configurable et accessible, avec texte, identité, fonction, organisation, portrait et droits.",
};
const videoC = {
  id: "gap-video", need: "Présenter une vidéo éditoriale ou de présentation sans lecteur tiers chargé par défaut",
  limit: "EditorialMedia ne rend qu’une image ; il ne gère ni lecteur, poster, sous-titres, consentement ni chargement à la demande.",
  extension: "Composant vidéo avec poster configurable, sous-titres/transcription, consentement et activation contrôlée.",
};
const footerC = {
  id: "gap-footer", need: "Footer complet avec groupes de liens, statut et reconnaissances",
  limit: "SiteFooter ne propose qu’un groupe de liens et aucun bloc structuré pour accréditations ou informations de groupe.",
  extension: "Footer multi-colonnes configurable avec groupes typés, contact et reconnaissances sourcées.",
};

const config = { brand, content, gaps: { headerC, heroC, finderC, catalogC, campusC, admissionC, recognitionC, testimonialC, videoC, footerC } };

app.innerHTML = `
  ${auditBanner({ name: brand.name, counterpart: "LISAA", counterpartHref: "../lisaa/", observationNote: "valeurs de thème approximatives, polices exactes et chartes non vérifiées." })}
  <div class="audit-legend" aria-label="Légende des statuts">
    <span><b class="audit-state audit-state--a">A — Réutilisation directe</b> structure commune inchangée</span>
    <span><b class="audit-state audit-state--b">B — Configuration</b> contenu ou thème remplacé</span>
    <span><b class="audit-state audit-state--c">C — Extension nécessaire</b> diagnostic statique, pas de fonctionnalité</span>
  </div>
  ${SiteHeader({ brand, content })}
  ${auditMarker("b", "SiteHeader configuré avec contenu et thème PSB · liens simples seulement")}
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
      ${SectionHeading({ title: "Programmes & orientation", intro: "Les catégories suivantes sont celles observées sur l’accueil PSB ; aucun programme individuel ou outil d’orientation n’est simulé.", id: "psb-finder-title" })}
      <p class="audit-datasource">Familles observées : PGE · Bachelors · MSc / Masters of Science · Executive Education</p>
      ${diagnosticGap(finderC)}
      ${diagnosticGap(catalogC)}
    </section>
    <section class="audit-section audit-section--soft" id="campus">
      ${auditMarker("a", "SectionHeading · structure commune sans changement")}
      ${SectionHeading({ title: "Le campus", intro: "PSB présente le Campus Le Delta à Paris et décrit un lieu partagé avec d’autres écoles.", id: "psb-campus-title" })}
      ${diagnosticGap(campusC)}
    </section>
    <section class="audit-section audit-section--media" id="vie-etudiante">
      ${SectionHeading({ title: "Vie étudiante · emplacement média", intro: "Emplacement provisoire de l’audit ; une ressource autorisée et son texte alternatif restent à fournir.", id: "psb-media-title" })}
      <figure class="audit-media-placeholder" role="note" aria-label="Emplacement média vide ; aucune photographie intégrée">
        <span>EMPLACEMENT MÉDIA · NON REMPLI</span><strong>${content.mediaSlot.title}</strong><p>${content.mediaSlot.alt}</p>
      </figure>
      <div class="audit-section--media__copy"><h3>Le campus, à documenter.</h3><p>Aucune photo ou vidéo n’est embarquée. Une description alternative sera à fournir avec toute ressource autorisée ; la vidéo demande une extension distincte.</p>${auditMarker("b", "Slot média renseigné dans les données · aucune image chargée")}</div>
    </section>
    <section class="audit-section audit-section--news">
      ${auditMarker("b", "MetricsSection · valeurs configurées ; NewsSection / EditorialCard · contenus et dates configurés")}
      ${MetricsSection({ content: config.content.metrics })}
      ${NewsSection({ content: config.content.news })}
    </section>
    <section class="audit-section audit-section--agenda" id="agenda">
      ${auditMarker("a", "SectionHeading et EventItem · liste statique configurée")}
      ${AgendaSection({ content: config.content.agenda })}
    </section>
    <section class="audit-section" id="admissions">
      ${auditMarker("a", "SectionHeading · structure commune sans changement")}
      ${SectionHeading({ title: "Admissions", intro: "Les règles et voies varient selon les programmes ; aucun parcours opérationnel n’est reconstruit ici.", id: "psb-admission-title" })}
      ${diagnosticGap(admissionC)}
    </section>
    <section class="audit-section audit-section--soft">
      ${auditMarker("a", "SectionHeading · structure commune sans changement")}
      ${SectionHeading({ title: "Reconnaissances & classements", intro: "Les accréditations, organismes et classements mentionnés par PSB sont des affirmations du site officiel, non validées indépendamment ici.", id: "psb-recognition-title" })}
      ${diagnosticGap(recognitionC)}
    </section>
    <section class="audit-section">
      ${auditMarker("a", "SectionHeading · structure commune sans changement")}
      ${SectionHeading({ title: "Alumni & témoignages", intro: "Aucune citation ni identité personnelle n’est reproduite dans cette maquette.", id: "psb-testimonial-title" })}
      ${diagnosticGap(testimonialC)}
    </section>
    <section class="audit-section audit-section--soft">
      ${auditMarker("a", "SectionHeading · structure commune sans changement")}
      ${SectionHeading({ title: "Vidéo éditoriale", intro: "Emplacement conservé dans le fil éditorial ; aucun lecteur ou média tiers n’est chargé.", id: "psb-video-title" })}
      ${diagnosticGap(videoC)}
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

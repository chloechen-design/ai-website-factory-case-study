/* Contenus repérés sur le site officiel LISAA, consultation documentée le 24/10/2026.
   Les fiches détaillées du Programme Finder restent un échantillon, pas un catalogue complet. */
import { lisaaProgramCatalog } from "./lisaa-program-catalog.js?v=sop-07-stepb";
const officialHome = "https://www.lisaa.com/fr";
const officialCatalog = "https://www.lisaa.com/fr/recherchez-nos-formations";
const officialAdmissions = "https://www.lisaa.com/fr/demande-entretien";
const studyAreaItems = [
  { id: "architecture-design", label: "Architecture & Design", href: "https://www.lisaa.com/fr/formations/architecture-interieur-design" },
  { id: "mode", label: "Mode", href: "https://www.lisaa.com/fr/formations/mode-stylisme" },
  { id: "graphisme-communication", label: "Graphisme & Com’", href: "https://www.lisaa.com/fr/formations/graphisme-motion-design" },
  { id: "animation", label: "Animation", href: "https://www.lisaa.com/fr/formations/animation-jeu-video" },
  { id: "game-video", label: "Jeu vidéo", href: "https://www.lisaa.com/fr/ecole-de-jeux-video" },
];

export const lisaaHomepage = {
  announcement: {
    label: "Prototype indépendant · contenus et couleurs à confirmer",
    linkLabel: "Ouvrir la source officielle",
    href: officialHome,
  },
  navigation: [
    { label: "Écoles", children: studyAreaItems.map((item) => ({ label: item.label, href: `#program-${item.id}` })) },
    { label: "Formations", children: [{ label: "Domaines de formation", href: "#domaines" }, { label: "Catalogue officiel", href: officialCatalog }] },
    { label: "Vie de l’école", children: [{ label: "Campus", href: "#campus" }, { label: "Actualités", href: "#actualites" }, { label: "Événements", href: "#agenda" }] },
    { label: "Admissions", href: officialAdmissions },
  ],
  navigationActions: [
    { label: "Catalogue", href: officialCatalog },
    { label: "Événements", href: "#agenda" },
  ],
  hero: {
    title: "L’ÉCOLE DES\nMÉTIERS CRÉATIFS",
    label: "Prototype exploratoire",
    description: "Architecture, mode, graphisme, animation et jeu vidéo : cinq domaines observés sur l’accueil LISAA.",
    variant: "split",
    actions: [
      { label: "Explorer les domaines", href: "#domaines", variant: "light" },
      { label: "Catalogue officiel", href: officialCatalog, variant: "text-light" },
    ],
    aside: {
      label: "Un réseau annoncé par LISAA",
      value: "10",
      detail: "campus annoncés en France",
      href: "#campus",
      linkLabel: "Voir les implantations",
    },
    media: {
      title: "Photographie de filière non intégrée",
      alt: "Emplacement provisoire pour une photographie autorisée représentant une filière LISAA ; aucune image n’est fournie dans ce POC.",
      ratio: "wide",
    },
  },
  studyAreas: studyAreaItems.map(({ label }) => label),
  studyAreaIndex: {
    title: "Cinq domaines de formation",
    intro: "Accès direct aux catégories observées sur la page d’accueil officielle.",
    items: studyAreaItems,
  },
  programs: {
    title: "Cinq domaines, des parcours différents",
    intro: "Ces cartes représentent les domaines de formation de LISAA. Elles ne sont pas des fiches programme.",
    layout: "domains",
    note: "Un échantillon de fiches sourcées et filtrables est présenté dans le Programme Finder ci-dessus.",
    items: studyAreaItems.map((area, index) => ({
      program: { id: area.id, type: "domain", href: area.href },
      title: area.label,
      number: String(index + 1).padStart(2, "0"),
      tone: ["dark", "yellow", "paper", "outline", "paper"][index],
      caption: "Domaine observé sur le site officiel",
    })),
  },
  programFinder: {
    title: "Trouver une formation",
    intro: "Filtrez un échantillon de fiches officielles par filière, ville et niveau de sortie.",
    scopeNote: "Échantillon démonstratif — ce module ne reproduit pas le moteur officiel et ne couvre pas l’ensemble du catalogue.",
    disclaimer: "Données reprises depuis les fiches LISAA consultées le 24 octobre 2026. Vérifier les modalités avant toute décision d’orientation.",
    catalogUrl: officialCatalog,
    catalogLinkLabel: "Ouvrir le catalogue officiel complet",
    programs: lisaaProgramCatalog,
  },
  campusOverview: {
    title: "Un réseau de campus",
    description: "LISAA annonce dix campus en France. Les villes et relations entre écoles et filières ne sont pas détaillées dans ce module.",
    value: "10",
    unit: "campus annoncés en France",
    sourceUrl: officialHome,
    linkLabel: "Consulter le site officiel",
    note: "Chiffre rapporté depuis la page d’accueil LISAA, consultation du 24 octobre 2026. À revérifier avant publication.",
  },
  mediaSlot: {
    title: "Emplacement média · créations et vie de l’école",
    alt: "Aucune photographie n’est intégrée dans ce prototype. Prévoir une ressource autorisée et sa description alternative.",
    ratio: "wide",
  },
  news: {
    title: "Actualités · sélection de l’accueil",
    intro: "Titres repris de l’accueil officiel. Les liens mènent aux publications LISAA lorsque l’URL de l’article était disponible dans l’analyse.",
    linkLabel: "Lire sur LISAA",
    items: [
      {
        category: "Actualité · LISAA Mode Paris",
        title: "LISAA Mode Paris au Salon Who’s Next 2025",
        summary: "Titre publié sur l’accueil officiel ; aucune information complémentaire n’est simulée ici.",
        format: "large",
        href: "https://www.lisaa.com/fr/actualite-lisaa-salon-whosnext",
      },
      {
        category: "Actualité · LISAA Nantes",
        title: "Partenariat ESB (École Supérieure du Bois) x LISAA Nantes",
        summary: "Publication officielle repérée lors de l’analyse comparative.",
        format: "compact",
        href: "https://www.lisaa.com/fr/actualite-ecole-art-applique/partenariat-esb-ecole-superieure-du-bois-x-lisaa-nantes",
      },
      {
        category: "Actualité · LISAA Toulouse",
        title: "Quand la créativité rencontre le cinéma : un partenariat inspirant entre LISAA Toulouse et l’AFCAE",
        summary: "Publication officielle repérée lors de l’analyse comparative.",
        format: "wide",
        href: "https://www.lisaa.com/fr/actualite-ecole-art-applique/quand-la-creativite-rencontre-le-cinema-un-partenariat-inspirant-entre",
      },
    ],
  },
  agenda: {
    title: "Événements · liste statique",
    intro: "Entrées visibles sur l’accueil officiel consulté le 24 octobre 2026 ; ce prototype n’applique aucun filtre de ville.",
    items: [
      {
        date: "24", month: "OCT. 2026", title: "Portes ouvertes · Design graphique & communication",
        time: "11:00–17:00", detail: "Paris · événement listé par LISAA",
        linkLabel: "Inscription portes ouvertes", href: "https://www.lisaa.com/fr/jpo?event=urn%3Abossanova%3Acommercial_unit_meeting%3A628828c8-99ea-4680-b6c7-718035201f12&id_l_1=21&id_l_2=83",
      },
      {
        date: "26", month: "OCT. 2026", title: "Stage · Animation & Jeu vidéo",
        time: "26–30 octobre", detail: "Événement listé par LISAA",
        linkLabel: "Inscription au stage", href: "https://www.lisaa.com/fr/inscription-atelier?event=urn%3Abossanova%3Acommercial_unit_meeting%3A9fda3d72-3a6c-47d9-a4e8-027f17a30eea&id_l_1=21&id_l_2=22",
      },
    ],
  },
  footer: {
    description: "Prototype d’audit non officiel. Les titres cités proviennent de l’accueil LISAA ; aucun média étudiant n’est intégré.",
    addressLabel: "Source consultée",
    address: "lisaa.com/fr · consultation du 24 octobre 2026",
    officialLinkLabel: "Accéder au site LISAA",
    linkGroups: [
      { title: "Découvrir", links: [{ label: "Accueil officiel", href: officialHome }, { label: "Catalogue des formations", href: officialCatalog }] },
      { title: "Parcours", links: [{ label: "Demander un entretien", href: officialAdmissions }, { label: "Accueil officiel · événements", href: officialHome }] },
    ],
    legalNote: "Exercice indépendant · valeurs visuelles exploratoires · aucune affiliation à LISAA ou Galileo Global Education.",
  },
};

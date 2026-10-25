/* Médias de banque d'images : illustrations autonomes, sans lien avec Penninghen.
   Les images restent configurables ici, jamais dans le code des composants. */
const media = {
  workshop: {
    title: "Atelier collectif de création",
    imageUrl: "https://images.pexels.com/photos/35376319/pexels-photo-35376319/free-photo-of-art-students-engaged-in-creative-workshop.jpeg?auto=compress&dpr=1&h=750&w=1260",
    alt: "Groupe de jeunes adultes travaillant avec du matériel de dessin pendant un atelier créatif à Tokyo ; photo d’illustration sans lien avec Penninghen.",
    source: "Pexels · Gu Ko",
    sourceUrl: "https://www.pexels.com/photo/art-students-engaged-in-creative-workshop-35376319/",
    rights: "Page Pexels marquée Free to use ; licence Pexels pour usages web, attribution non obligatoire mais créditée ici. Les droits de tiers éventuels restent à vérifier.",
    ratio: "wide",
  },
  drawing: {
    title: "Croquis en situation de travail",
    imageUrl: "https://images.pexels.com/photos/4499469/pexels-photo-4499469.jpeg?auto=compress&dpr=1&h=750&w=1260",
    alt: "Jeune homme concentré sur un dessin à une table de classe ; photographie de banque d’images, sans lien avec Penninghen.",
    source: "Pexels · Roxanne Minnish",
    sourceUrl: "https://www.pexels.com/photo/college-student-drawing-on-paper-4499469/",
    rights: "Page Pexels marquée Free ; licence Pexels pour usages web, attribution non obligatoire mais créditée ici. Les droits de tiers éventuels restent à vérifier.",
    ratio: "wide",
  },
  model: {
    title: "Maquette d’architecture en cours",
    imageUrl: "https://images.pexels.com/photos/9618126/pexels-photo-9618126.jpeg?auto=compress&dpr=1&h=750&w=1260",
    alt: "Architecte fabriquant une maquette détaillée dans un espace intérieur ; photo d’illustration, pas un atelier de Penninghen.",
    source: "Pexels · Ron Lach",
    sourceUrl: "https://www.pexels.com/photo/architect-building-architectural-model-at-home-9618126/",
    rights: "Page Pexels marquée Free ; licence Pexels pour usages web, attribution non obligatoire mais créditée ici. Les droits de tiers éventuels restent à vérifier.",
    ratio: "portrait",
  },
  digital: {
    title: "Création graphique sur ordinateur",
    imageUrl: "https://images.pexels.com/photos/13451104/pexels-photo-13451104.jpeg?auto=compress&dpr=1&h=750&w=1260",
    alt: "Graphiste travaillant sur un ordinateur dans un bureau lumineux ; photo de banque d’images, sans lien avec Penninghen.",
    source: "Pexels · Jonathan Borba",
    sourceUrl: "https://www.pexels.com/photo/graphic-designer-working-on-computer-13451104/",
    rights: "Page Pexels marquée Free ; licence Pexels pour usages web, attribution non obligatoire mais créditée ici. Les droits de tiers éventuels restent à vérifier.",
    ratio: "wide",
  },
  print: {
    title: "Presse typographique et affiches",
    imageUrl: "https://images.pexels.com/photos/6620963/pexels-photo-6620963.jpeg?auto=compress&dpr=1&h=750&w=1260",
    alt: "Presse d’impression et affiches dans un atelier professionnel ; photographie d’illustration, sans lien avec Penninghen.",
    source: "Pexels · Antoni Shkraba",
    sourceUrl: "https://www.pexels.com/photo/studio-with-typography-press-and-posters-6620963/",
    rights: "Page Pexels marquée Free ; licence Pexels pour usages web, attribution non obligatoire mais créditée ici. Les droits de tiers éventuels restent à vérifier.",
    ratio: "portrait",
  },
  sketchbook: {
    title: "Carnet et outils de dessin",
    imageUrl: "https://images.pexels.com/photos/35597256/pexels-photo-35597256/free-photo-of-creative-art-project-with-markers-and-sketchbook.jpeg?auto=compress&dpr=1&h=750&w=1260",
    alt: "Personne dessinant aux marqueurs dans un carnet entouré de matériel artistique ; photo d’illustration, sans lien avec Penninghen.",
    source: "Pexels · Berna",
    sourceUrl: "https://www.pexels.com/photo/creative-art-project-with-markers-and-sketchbook-35597256/",
    rights: "Page Pexels marquée Free ; licence Pexels pour usages web, attribution non obligatoire mais créditée ici. Les droits de tiers éventuels restent à vérifier.",
    ratio: "square",
  },
};

/* Libellés de provenance et de repli propres aux médias de cette page. */
Object.values(media).forEach((item) => Object.assign(item, {
  provenanceLabel: "Image d’illustration — aucun lien avec Penninghen",
  sourceLinkLabel: "Source Pexels",
  loadErrorLabel: "Image indisponible · voir la source Pexels",
}));

export const homepageContent = {
  announcement: {
    label: "POC indépendant · contenus et images à valider",
    linkLabel: "Comparer avec la V2 sans médias",
    href: "../../../penninghen/v2-before-media/",
  },
  navigation: [
    { label: "L’école", href: "#ecole" },
    { label: "Formations", href: "#formations" },
    { label: "Projets", href: "#projets" },
    { label: "Actualités", href: "#actualites" },
    { label: "Agenda", href: "#agenda" },
  ],
  navigationAction: { label: "Explorer", href: "#formations" },
  hero: {
    label: "Les créations prennent place",
    title: "Voir juste.\nCréer libre.",
    description: "À travers ses pages officielles, Penninghen présente des formations en arts appliqués, direction artistique, communication et architecture intérieure.",
    primaryAction: { label: "Explorer les formations", href: "#formations" },
    secondaryAction: { label: "Voir les projets étudiants", href: "#projets" },
    media: media.drawing,
  },
  formations: {
    title: "Des voies, des regards.",
    intro: "Intitulés observés sur le site officiel. Les photographies sont des illustrations de banque d’images, non des images de l’école.",
    note: "Les parcours et contenus de formation doivent être revérifiés avant toute publication.",
    items: [
      { program: { id: "preparatory-year", type: "formation", attributes: [] }, title: "Année préparatoire intégrée en arts appliqués", number: "01", tone: "dark", caption: "Intitulé observé · détails à confirmer", media: media.drawing },
      { program: { id: "interior-architecture", type: "formation", attributes: [] }, title: "Architecture intérieure", number: "02", tone: "yellow", caption: "Intitulé observé · détails à confirmer", media: media.model },
      { program: { id: "communication", type: "formation", attributes: [] }, title: "Communication", number: "03", tone: "paper", caption: "Intitulé observé · détails à confirmer", media: media.digital },
      { program: { id: "art-direction", type: "formation", attributes: [] }, title: "Direction artistique", number: "04", tone: "outline", caption: "Intitulé observé · détails à confirmer", media: media.print },
    ],
  },
  projects: {
    title: "Des gestes de création.",
    intro: "Ces photographies illustrent des pratiques créatives génériques ; elles ne représentent pas des projets ou des étudiants de Penninghen.",
    items: [
      { ...media.sketchbook, credit: "Illustration · recherche dessinée", detail: "Photographie de banque d’images. Elle n’est ni une création étudiante ni un travail réalisé à Penninghen." },
      { ...media.model, credit: "Illustration · maquette et volume", detail: "Photographie de banque d’images. Elle ne documente pas un projet de l’école." },
    ],
  },
  metrics: {
    title: "Une école, des trajectoires.",
    note: "Chiffres visibles sur la page d’accueil officielle ; périmètre et date de mise à jour à confirmer.",
    items: [
      { value: "93 %", label: "d’insertion professionnelle dans les deux ans sur les formations titrées" },
      { value: "55+", label: "ans d’expertise pédagogique annoncés" },
      { value: "3 900", label: "alumni annoncés" },
    ],
  },
  news: {
    title: "Dans la vie de l’école.",
    intro: "Titres d’actualités publiés sur le site officiel. Ouvrir chaque source pour consulter le contenu et son contexte.",
    linkLabel: "Lire sur le site officiel",
    items: [
      { category: "Actualité · 2026", title: "Pourquoi dessiner à l’heure de l’intelligence artificielle ?", summary: "Actualité publiée sur le site officiel ; la page présente aussi des visuels de cours et de dessin.", format: "large", href: "https://www.penninghen.fr/vie-ecole/actualites/pourquoi-dessiner-lheure-de-lintelligence-artificielle" },
      { category: "Actualité · 2026", title: "Direction artistique, la formation devient plurielle", summary: "Article officiel sur les deux spécialisations de direction artistique.", format: "compact", href: "https://www.penninghen.fr/vie-ecole/actualites/direction-artistique-la-formation-devient-plurielle-1" },
      { category: "Actualité · 2026", title: "Architecture intérieure à Penninghen, une formation reconnue par le CFAI", summary: "Actualité officielle sur la reconnaissance de la formation par le CFAI.", format: "compact", href: "https://www.penninghen.fr/vie-ecole/actualites/architecture-interieure-penninghen-une-formation-reconnue-par-le-cfai" },
      { category: "Vie de l’école · 2026", title: "Soirée de remise du Yearbook 2026", summary: "Page dédiée à la soirée de remise du Yearbook 2026.", format: "wide", href: "https://www.penninghen.fr/vie-ecole/actualites/soiree-de-remise-du-yearbook-2026" },
    ],
  },
  agenda: {
    title: "Les prochains rendez-vous.",
    intro: "Dates et informations relevées sur l’agenda officiel ; les détails peuvent évoluer.",
    items: [
      { date: "04", month: "NOV. 2026", title: "Réunion d’information en ligne", time: "18:30 – 19:30", detail: "Inscription indiquée sur l’agenda officiel", linkLabel: "Consulter l’agenda officiel", href: "https://www.penninghen.fr/vie-ecole/agenda/nos-prochains-evenements" },
      { date: "05", month: "DÉC. 2026", title: "Journée portes ouvertes", time: "10:00 – 18:30", detail: "Campus Le Delta · Paris", linkLabel: "Consulter l’agenda officiel", href: "https://www.penninghen.fr/vie-ecole/agenda/nos-prochains-evenements" },
      { date: "15", month: "FÉV. 2027", title: "Atelier découverte", time: "Du 15 au 19 février", detail: "Informations et inscription sur le site officiel", linkLabel: "Consulter l’agenda officiel", href: "https://www.penninghen.fr/vie-ecole/agenda/nos-prochains-evenements" },
    ],
  },
  footer: {
    description: "Proposition exploratoire de page d’accueil. Les contenus Penninghen sont sourcés ; les photographies sont des illustrations Pexels sans lien avec l’école.",
    addressLabel: "Source officielle",
    address: "penninghen.fr · Paris",
    officialLinkLabel: "Accéder au site officiel",
    links: [
      { label: "Site officiel", href: "https://www.penninghen.fr/" },
      { label: "Actualités", href: "https://www.penninghen.fr/vie-ecole/actualites" },
      { label: "Agenda", href: "https://www.penninghen.fr/vie-ecole/agenda/nos-prochains-evenements" },
    ],
    legalNote: "Projet indépendant non affilié. Photos Pexels illustratives, créditées et non attribuées à Penninghen.",
  },
};

/* Contenus observés sur l'accueil officiel PSB, consultation documentée le 24/10/2026.
   Les affirmations de l'école sont rapportées comme telles, pas validées indépendamment. */
const officialHome = "https://www.psbedu.paris/fr";
const officialAdmissions = "https://www.psbedu.paris/fr/admissions";
const officialAccreditations = "https://www.psbedu.paris/fr/ecole/accreditation";
const officialCampus = "https://www.psbedu.paris/index.php/fr/ecole/campus";
const officialBrochure = "https://www.psbedu.paris/fr/brochure?source_entity_id=541&source_entity_type=media";
const officialCatalogue = "https://www.psbedu.paris/fr/programmes";
const officialEvents = "https://www.psbedu.paris/fr/ecole/nous-rencontrer";
const officialWebinar = "https://www.psbedu.paris/fr/landing-page/webinars";
const officialEquisNews = "https://www.psbedu.paris/fr/actus/vie-ecole/paris-school-business-obtient-accreditation-equis";
const officialProgrammes = [
  { id: "pge", title: "Programme Grande École", type: "program", href: "https://www.psbedu.paris/fr/programmes/programme-grande-ecole" },
  { id: "bachelors", title: "Bachelors", type: "family", href: "https://www.psbedu.paris/fr/programmes/bachelors" },
  { id: "msc", title: "MSc / Masters of Science", type: "family" },
  { id: "executive", title: "Executive Education", type: "family" },
];

export const psbHomepage = {
  announcement: {
    label: "Prototype indépendant · contenus et couleurs à confirmer",
    linkLabel: "Ouvrir la source officielle",
    href: officialHome,
  },
  navigation: [
    { label: "École", children: [{ label: "Présentation sur l’accueil PSB", href: officialHome }, { label: "Campus Le Delta", href: "#campus" }, { label: "Accréditations", href: "#reconnaissances" }] },
    { label: "Programmes", children: officialProgrammes.map((item) => ({ label: item.title, href: `#program-${item.id}` })) },
    { label: "Admissions", href: officialAdmissions },
    { label: "Vie de l’école", children: [{ label: "Actualités", href: "#actualites" }, { label: "Agenda", href: "#agenda" }] },
  ],
  navigationActions: [
    { label: "Demander la brochure", href: officialBrochure },
    { label: "Admissions", href: officialAdmissions },
  ],
  hero: {
    title: "GRANDE ÉCOLE\nDE COMMERCE\nET DE MANAGEMENT",
    label: "Prototype exploratoire",
    description: "Programmes, admissions et vie étudiante, organisés autour des contenus observés sur l’accueil PSB.",
    variant: "editorial",
    actions: [
      { label: "Découvrir les programmes", href: "#formations", variant: "light" },
      { label: "Admissions", href: officialAdmissions, variant: "secondary" },
      { label: "Événements", href: "#agenda", variant: "text-light" },
    ],
    aside: {
      label: "Explorer par parcours",
      items: [
        { label: "Programme Grande École", href: "#program-pge" },
        { label: "Bachelors", href: "#program-bachelors" },
        { label: "MSc / Masters of Science", href: "#program-msc" },
        { label: "Executive Education", href: "#program-executive" },
      ],
    },
  },
  mediaSlot: {
    title: "Emplacement média · campus ou vie étudiante",
    alt: "Aucune photographie n’est intégrée dans ce prototype. Prévoir une ressource autorisée et sa description alternative.",
    ratio: "wide",
  },
  programs: {
    title: "Des voies pour chaque ambition",
    intro: "Du Programme Grande École aux cycles Bachelor, MSc et Executive Education : repères observés dans l’offre PSB.",
    layout: "rows",
    action: { label: "Voir toutes les formations PSB", href: officialCatalogue, variant: "primary" },
    note: "Certaines cartes désignent des familles de programmes, pas une formation individuelle. Ouvrir le catalogue officiel pour consulter l’offre détaillée.",
    items: officialProgrammes.map((item, index) => ({
      program: { id: item.id, type: item.type, href: item.href, attributes: [] },
      title: item.title,
      number: String(index + 1).padStart(2, "0"),
      caption: "Catégorie observée sur l’accueil PSB",
    })),
  },
  metrics: {
    title: "Quelques repères affichés par PSB",
    note: "Valeurs telles que présentées sur la page officielle consultée le 24 octobre 2026 ; périmètre et actualité à revérifier avant toute publication.",
    items: [
      { value: "4 000", label: "étudiants — chiffre communiqué par PSB" },
      { value: "20 000", label: "alumni — chiffre communiqué par PSB" },
    ],
  },
  campusContext: {
    title: "Le Delta, un campus partagé",
    description: "La page campus de PSB présente Le Delta à Paris comme un lieu accueillant plusieurs écoles.",
    place: "Paris · Campus Le Delta",
    sourceUrl: officialCampus,
    linkLabel: "Voir la présentation du campus",
    note: "Informations rapportées depuis la page campus PSB. Les modalités et services communs ne sont pas développés dans ce prototype.",
  },
  recognition: {
    title: "Reconnaissances institutionnelles",
    intro: "Module propre à PSB pour présenter une reconnaissance avec sa source et son périmètre.",
    items: [
      {
        category: "Accréditation mentionnée par PSB",
        title: "EQUIS",
        description: "Une actualité PSB observée indique une première obtention de l’accréditation EQUIS.",
        sourceUrl: officialEquisNews,
        sourceLabel: "Consulter la page officielle",
      },
    ],
    note: "Statut, période de validité, périmètre et autorisation d’usage de tout logo à vérifier avant publication. Aucun logo n’est reproduit ici.",
  },
  news: {
    title: "Actualités · sélection de l’accueil",
    intro: "Sélection de publications PSB vérifiées individuellement. Les résultats de classement restent rapportés comme des communications de l’école.",
    linkLabel: "Lire l’article officiel",
    items: [
      {
        category: "Actualité · 9 septembre 2026",
        title: "Financial Times 2026 : Paris School of Business entre dans le Top 20 mondial des Masters in Management",
        summary: "Titre de publication tel qu’affiché sur l’accueil de PSB ; classement rapporté par l’école.",
        format: "large", href: "https://www.psbedu.paris/fr/actus/vie-ecole/classement-financial-times-2026",
      },
      {
        category: "Actualité · 27 janvier 2026",
        title: "Paris School of Business classée 6e au Classement Le Figaro des Bachelors en Management 2026",
        summary: "Titre de publication tel qu’affiché sur l’accueil de PSB ; classement rapporté par l’école.",
        format: "compact", href: "https://www.psbedu.paris/fr/actus/classement-figaro-bachelors-2026",
      },
      {
        category: "Actualité · 15 décembre 2025",
        title: "Paris School of Business obtient pour la première fois l’accréditation EQUIS",
        summary: "Titre de publication tel qu’affiché sur l’accueil de PSB ; accréditation à vérifier à la date de publication.",
        format: "wide", href: officialEquisNews,
      },
    ],
  },
  agenda: {
    title: "Événements · liste statique",
    intro: "Entrées visibles sur l’accueil officiel consulté le 24 octobre 2026 ; liste sans inscription ni action de réservation.",
    items: [
      {
        date: "04", month: "NOV. 2026", title: "Webinaire · Pourquoi rejoindre une école post-bac ?",
        time: "18:00–19:00", detail: "Événement listé par PSB · lien vers la liste des webinaires",
        linkLabel: "Voir les webinaires PSB", href: officialWebinar,
      },
    ],
  },
  footer: {
    description: "Prototype d’audit non officiel. Les contenus sont repris de la page publique de PSB ; aucun média ou logo n’est intégré.",
    addressLabel: "Campus cité par PSB",
    address: "Campus Le Delta · Paris",
    officialLinkLabel: "Accéder au site PSB",
    linkGroups: [
      { title: "L’école", links: [{ label: "Accueil officiel", href: officialHome }, { label: "Campus Le Delta", href: officialCampus }, { label: "Accréditations", href: officialAccreditations }, { label: "Tous les événements", href: officialEvents }] },
      { title: "Candidater", links: [{ label: "Admissions officielles", href: officialAdmissions }, { label: "Catalogue des programmes", href: officialCatalogue }, { label: "Demander la brochure", href: officialBrochure }] },
    ],
    legalNote: "Exercice indépendant · valeurs visuelles exploratoires · aucune affiliation à PSB ou Galileo Global Education.",
  },
};

/* Contenus de la page. Le texte éditorial non sourcé est explicitement démonstratif. */
export const homepageContent = {
  announcement: {
    label: "Proposition de POC, non officielle",
    linkLabel: "Événement observé : réunion d’information, 4 novembre 2026",
    href: "#agenda",
  },
  navigation: [
    { label: "L’école", href: "#ecole" },
    { label: "Formations", href: "#formations" },
    { label: "À découvrir", href: "#actualites" },
    { label: "Agenda", href: "#agenda" },
  ],
  hero: {
    label: "Texte de démonstration",
    title: "Le regard\nprend forme.",
    description: "Penninghen se présente comme une école de direction artistique, de communication et d’architecture intérieure.",
    primaryAction: { label: "Explorer les formations", href: "#formations" },
    secondaryAction: { label: "Voir l’agenda", href: "#agenda" },
    disciplines: ["Direction artistique", "Communication", "Architecture intérieure"],
  },
  formations: {
    title: "Quatre portes d’entrée.",
    intro: "Les intitulés ci-dessous reprennent les catégories visibles sur la page officielle observée.",
    note: "Contenu repris de la page observée, offre et intitulés à confirmer avant publication.",
    items: [
      { title: "Année préparatoire intégrée en arts appliqués", number: "01", tone: "dark" },
      { title: "Architecture intérieure", number: "02", tone: "yellow" },
      { title: "Communication", number: "03", tone: "paper" },
      { title: "Direction artistique", number: "04", tone: "outline" },
    ],
  },
  metrics: {
    title: "Une école, des trajectoires.",
    note: "Chiffres affichés sur la page d’accueil observée le 23 octobre 2026. Leur source, leur périmètre et leur date de mise à jour restent à vérifier.",
    items: [
      { value: "93 %", label: "d’insertion professionnelle dans les deux ans sur les formations titrées" },
      { value: "55+", label: "ans d’expertise pédagogique annoncés" },
      { value: "3 900", label: "alumni annoncés" },
    ],
  },
  news: {
    title: "À découvrir.",
    intro: "La page observée met en avant des actualités illustrées. Les entrées ci-dessous sont des exemples éditoriaux, pas des actualités réelles.",
    items: [
      { category: "Exemple · vie de l’école", title: "Un lieu, des idées en mouvement", summary: "Titre et texte de démonstration à remplacer par une actualité validée.", format: "large" },
      { category: "Exemple · création", title: "La forme commence par une question", summary: "Contenu fictif, fourni uniquement pour tester la hiérarchie éditoriale.", format: "compact" },
      { category: "Exemple · regards", title: "Explorer de nouvelles perspectives", summary: "Aucun événement ni projet réel n’est décrit dans cette carte.", format: "compact" },
    ],
  },
  agenda: {
    title: "L’école en rendez-vous.",
    intro: "Les détails sont ceux consignés dans l’analyse de la page d’accueil ; les liens d’inscription directs ne sont pas disponibles dans le POC.",
    items: [
      { date: "04", month: "NOV", title: "Réunion d’information", time: "18:30 – 19:30", detail: "Événement observé · année 2026", linkLabel: "Consulter le site officiel", href: "https://www.penninghen.fr/" },
      { date: "15", month: "FÉV", title: "Atelier découverte", time: "Horaire non vérifié", detail: "Année non précisée sur la page observée", linkLabel: "Consulter le site officiel", href: "https://www.penninghen.fr/" },
    ],
  },
  footer: {
    description: "Penninghen se présente comme un établissement d’enseignement supérieur privé technique consacré à la direction artistique, à la communication et à l’architecture intérieure.",
    addressLabel: "Adresse affichée sur le site officiel",
    address: "31 rue du Dragon, 75006 Paris, France",
    links: [
      { label: "Site officiel", href: "https://www.penninghen.fr/" },
      { label: "Formations", href: "#formations" },
      { label: "Agenda", href: "#agenda" },
    ],
    legalNote: "Les coordonnées détaillées, liens sociaux et mentions légales sont à reprendre depuis une source officielle validée.",
  },
};

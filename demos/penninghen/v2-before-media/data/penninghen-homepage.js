/* Contenus vérifiés sur le site officiel. Les médias restent des liens-source
   tant qu'aucune licence ou autorisation de réutilisation n'est établie. */
const media = {
  drawing: {
    title: "Pourquoi dessiner à l’heure de l’intelligence artificielle ?",
    alt: "Emplacement réservé à une photographie d’un cours de dessin mentionné dans l’article officiel.",
    source: "Actualité officielle de Penninghen",
    sourceUrl: "https://www.penninghen.fr/vie-ecole/actualites/pourquoi-dessiner-lheure-de-lintelligence-artificielle",
    rights: "Droits de réutilisation non précisés ; la page est une source éditoriale, pas une licence d’image.",
    ratio: "wide",
  },
  hermes: {
    title: "Penninghen donne l’allure au carrousel d’Hermès",
    alt: "Emplacement réservé à une photographie des créations de l’atelier étudiant présentées dans l’article officiel.",
    source: "Page projets officielle de Penninghen",
    sourceUrl: "https://www.penninghen.fr/vie-ecole/projets/penninghen-donne-lallure-carrousel-dhermes",
    rights: "Droits de réutilisation non précisés sur la page consultée ; autorisation requise avant intégration du fichier.",
    ratio: "wide",
  },
  atelier: {
    title: "Atelier design",
    alt: "Emplacement réservé à une photographie des réalisations de l’atelier design décrites dans l’article officiel.",
    source: "Page projets officielle de Penninghen",
    sourceUrl: "https://www.penninghen.fr/vie-ecole/projets/atelier-design",
    rights: "Droits de réutilisation non précisés sur la page consultée ; autorisation requise avant intégration du fichier.",
    ratio: "portrait",
  },
  yearbook: {
    title: "Soirée de remise du Yearbook 2026",
    alt: "Emplacement réservé à la photographie officielle de la soirée Yearbook 2026.",
    source: "Actualité officielle de Penninghen",
    sourceUrl: "https://www.penninghen.fr/vie-ecole/actualites/soiree-de-remise-du-yearbook-2026",
    rights: "Droits de réutilisation non précisés ; la page est une source éditoriale, pas une licence d’image.",
    ratio: "square",
  },
  agenda: {
    title: "Nos prochains événements",
    alt: "Emplacement réservé à une photographie d’un événement de l’école.",
    source: "Agenda officiel de Penninghen",
    sourceUrl: "https://www.penninghen.fr/vie-ecole/agenda/nos-prochains-evenements",
    rights: "Droits de réutilisation non précisés sur la page consultée.",
    ratio: "wide",
  },
};

export const homepageContent = {
  announcement: {
    label: "POC indépendant · contenus et images à valider",
    linkLabel: "Comparer avec la V1",
    href: "../v1/",
  },
  navigation: [
    { label: "L’école", href: "#ecole" },
    { label: "Formations", href: "#formations" },
    { label: "Projets", href: "#projets" },
    { label: "Actualités", href: "#actualites" },
    { label: "Agenda", href: "#agenda" },
  ],
  hero: {
    label: "Les créations prennent place",
    title: "Voir juste.\nCréer libre.",
    description: "À travers ses pages officielles, Penninghen présente des formations en arts appliqués, direction artistique, communication et architecture intérieure.",
    primaryAction: { label: "Explorer les formations", href: "#formations" },
    secondaryAction: { label: "Voir les projets étudiants", href: "#projets" },
    media: media.hermes,
  },
  formations: {
    title: "Des voies, des regards.",
    intro: "Intitulés observés sur le site officiel. Les exemples visuels restent des liens vers les pages source, en attente des droits d’image.",
    note: "Les parcours et contenus de formation doivent être revérifiés avant toute publication.",
    items: [
      { title: "Année préparatoire intégrée en arts appliqués", number: "01", tone: "dark", media: media.drawing },
      { title: "Architecture intérieure", number: "02", tone: "yellow", media: media.atelier },
      { title: "Communication", number: "03", tone: "paper", media: media.hermes },
      { title: "Direction artistique", number: "04", tone: "outline", media: media.hermes },
    ],
  },
  projects: {
    title: "La création comme terrain d’étude.",
    intro: "Deux projets documentés sur le site officiel : les images ne sont pas reproduites ici, leurs droits n’étant pas établis.",
    items: [
      { ...media.hermes, credit: "Projet d’atelier · direction artistique et communication", detail: "L’article présente un workshop d’étudiants de cinquième année et cite notamment le projet Royal Bluff, de Laurane Cambassédès et Valentin Mignot." },
      { ...media.atelier, credit: "Projet d’atelier · architecture intérieure", detail: "L’article documente des travaux d’étudiants en architecture intérieure ; il cite notamment Otto-Tension, de Chloé Massip et Marthe Simon." },
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
    items: [
      { category: "Actualité · 2026", title: "Pourquoi dessiner à l’heure de l’intelligence artificielle ?", summary: "Actualité publiée sur le site officiel ; la page présente aussi des visuels de cours et de dessin.", format: "large", href: "https://www.penninghen.fr/vie-ecole/actualites/pourquoi-dessiner-lheure-de-lintelligence-artificielle" },
      { category: "Actualité · 2026", title: "Direction artistique, la formation devient plurielle", summary: "Article officiel sur les deux spécialisations de direction artistique.", format: "compact", href: "https://www.penninghen.fr/vie-ecole/actualites/direction-artistique-la-formation-devient-plurielle-1" },
      { category: "Actualité · 2026", title: "Architecture intérieure à Penninghen, une formation reconnue par le CFAI", summary: "Actualité officielle sur la reconnaissance de la formation par le CFAI.", format: "compact", href: "https://www.penninghen.fr/vie-ecole/actualites/architecture-interieure-penninghen-une-formation-reconnue-par-le-cfai" },
      { category: "Vie de l’école · 2026", title: media.yearbook.title, summary: "Page dédiée à la soirée de remise du Yearbook 2026.", format: "wide", href: media.yearbook.sourceUrl, media: media.yearbook },
    ],
  },
  agenda: {
    title: "Les prochains rendez-vous.",
    intro: "Dates et informations relevées sur l’agenda officiel ; les détails peuvent évoluer.",
    items: [
      { date: "04", month: "NOV. 2026", title: "Réunion d’information en ligne", time: "18:30 – 19:30", detail: "Inscription indiquée sur l’agenda officiel", linkLabel: "Voir l’événement", href: media.agenda.sourceUrl },
      { date: "05", month: "DÉC. 2026", title: "Journée portes ouvertes", time: "10:00 – 18:30", detail: "Campus Le Delta · Paris", linkLabel: "Voir l’événement", href: media.agenda.sourceUrl },
      { date: "15", month: "FÉV. 2027", title: "Atelier découverte", time: "Du 15 au 19 février", detail: "Informations et inscription sur le site officiel", linkLabel: "Voir l’événement", href: media.agenda.sourceUrl },
    ],
  },
  footer: {
    description: "Proposition exploratoire de page d’accueil. Les contenus, médias et droits restent à valider par leurs ayants droit.",
    addressLabel: "Source officielle",
    address: "penninghen.fr · Paris",
    links: [
      { label: "Site officiel", href: "https://www.penninghen.fr/" },
      { label: "Actualités", href: "https://www.penninghen.fr/vie-ecole/actualites" },
      { label: "Agenda", href: "https://www.penninghen.fr/vie-ecole/agenda/nos-prochains-evenements" },
    ],
    legalNote: "Projet indépendant non affilié. Aucun fichier média du site officiel n’est intégré ; droits à clarifier avant réutilisation.",
  },
};

# SOP 06B — Matrice des gaps LISAA / PSB

**Périmètre :** aperçu exploratoire des pages d’accueil, limité aux capacités A et B du Design System Penninghen existant. Les éléments C sont des diagnostics statiques, pas des composants.

**Cadre d’observation :** documents de recherche consultés le 24 octobre 2026. Les couleurs des thèmes sont des approximations à l’écran et ne sont pas des valeurs officielles. Les affirmations d’écoles sont rapportées comme telles. Aucune image, vidéo, identité visuelle officielle ou donnée d’admission non sourcée n’est intégrée.

| École | Besoin | Composant existant | Extension nécessaire | Priorité proposée |
|---|---|---|---|---|
| LISAA | Navigation par domaines, niveaux, villes et plusieurs actions | `SiteHeader` (liste plate, un CTA) | Menus hiérarchiques à divulgation, groupes/actions multiples, états clavier et mobile | P1 — parcours primaire |
| LISAA | Hero photo, catégories de filière et accès à la recherche | `Hero` (2 colonnes et 2 actions fixes) | Variantes de composition et nombre d’actions configurable | P1 — premier écran |
| LISAA | Recherche par ville, filière et niveau | Aucun | Formulaire accessible relié aux taxonomies de programme | P1 — découverte des formations |
| LISAA | Catalogue avec campus, spécialité, niveau, rythme et langue | `FormationCard` (titre, numéro, ton, légende, média) | Type Programme, métadonnées structurées et carte liée | P1 — information centrale |
| LISAA | Réseau de campus et relation ville → école → filière | Aucun | Répertoire de campus/écoles et sélecteur de ville | P1 — orientation multi-campus |
| LISAA | Filtrer les événements par ville | `AgendaSection` (liste statique) | Taxonomie de ville et filtre accessible | P2 — navigation événementielle |
| LISAA | Parcours d’admission en quatre étapes | Aucun | Pattern d’étapes avec contenu vérifié et daté | P1 — action prioritaire |
| LISAA | Témoignage avec identité et rôle | `EditorialCard` (actualité, pas citation structurée) | Témoignage avec champs auteur, rôle, citation, portrait et droits | P2 — réassurance |
| LISAA | Footer avec liens par école et réseaux sociaux | `SiteFooter` (un groupe de liens) | Footer multi-groupes, liens d’écoles et réseaux | P3 — complétude globale |
| LISAA | Choisir l’ordre et la présence des sections | `src/main.js` (ordre fixe Penninghen) | Composition déclarative par configuration de marque | P1 — préalable à la réutilisation réelle |
| PSB | Navigation par domaines avec plusieurs actions et langues | `SiteHeader` (liste plate, un CTA) | Menus hiérarchiques, groupes et actions utilitaires configurables | P1 — parcours primaire |
| PSB | Hero photo plein cadre et trois CTA desktop | `Hero` (2 colonnes, 2 actions fixes) | Variantes plein cadre/split et actions configurables | P1 — premier écran |
| PSB | Point d’entrée vers le program finder | Aucun | Lancement configurable vers la destination officielle, validée avant intégration | P1 — orientation |
| PSB | Programmes PGE, Bachelors, MSc et Executive Education | `FormationCard` sans liens ni attributs de programme | Type Programme, liens et métadonnées structurées | P1 — information centrale |
| PSB | Campus Le Delta et contexte de campus partagé | Aucun | Pattern de campus et relations lieu/école/services | P2 — contexte institutionnel |
| PSB | Voies d’admission différentes selon les programmes | Aucun | Parcours ramifiés, alimentés par des règles vérifiées et datées | P1 — candidature |
| PSB | Accréditations et reconnaissances | `MetricsSection` (valeur/libellé seulement) | Présentation structurée avec organisme, portée, période, source et média autorisé | P1 — preuve institutionnelle |
| PSB | Témoignages d’alumni, fonction et organisation | `EditorialCard` (actualité, pas citation structurée) | Témoignage sémantique avec auteur, rôle, organisation, portrait et droits | P2 — réassurance |
| PSB | Vidéo éditoriale avec poster, sous-titres et chargement contrôlé | `EditorialMedia` (image statique seulement) | Lecteur média accessible, poster, transcription/sous-titres et consentement | P2 — média riche |
| PSB | Footer avec groupes, statut et reconnaissances | `SiteFooter` (structure simple) | Footer multi-colonnes et bloc de reconnaissances sourcées | P3 — complétude globale |
| PSB | Choisir l’ordre et la présence des sections | `src/main.js` (ordre fixe Penninghen) | Composition déclarative par configuration de marque | P1 — préalable à la réutilisation réelle |

## Lecture des aperçus

- **A — réutilisation directe :** `SectionHeading`, emplacement `EditorialMedia` image, et structure statique `EventItem` / `AgendaSection` lorsqu’aucun filtre n’est requis.
- **B — adaptation par configuration :** thème exploratoire, texte du `SiteHeader`, actualités via `NewsSection` / `EditorialCard`, chiffres via `MetricsSection`, agenda statique et pied de page simple.
- **C — non développé :** chaque gap du tableau est matérialisé par un encart « C — Extension nécessaire » dans la zone où il aurait sa place. L’encart expose le besoin, la limite actuelle et la forme possible de l’extension ; il ne contient ni formulaire, ni filtre, ni séquence réelle, ni lecteur, ni menus imbriqués.

## Réutilisabilité démontrée et limite connue

Les aperçus importent sans modification `SiteHeader`, `SectionHeading`, `MetricsSection`, `NewsSection`, `AgendaSection` et `SiteFooter` depuis `src/components.js`; leurs styles dans `src/styles/base.css` sont également inchangés. Les textes et événements viennent de modules `data/*`; les valeurs visuelles sont isolées dans `brands/*/theme.css`. Les emplacements média montrés sont des placeholders statiques du prototype, pas des médias ni une nouvelle implémentation de `EditorialMedia`. En revanche, chaque page de test possède un point d’entrée d’audit dédié : ce montage confirme la limite déjà recensée dans `src/main.js` et **ne constitue pas** un assembleur multi-marque réutilisable. La généralisation de l’ordre des sections reste un gap C pour l’étape 06C.

Les pages ne reprennent aucun logo ou média officiel. Les événements et actualités affichent une date de consultation et renvoient à leurs sources officielles quand l’URL précise de la publication est disponible ; sinon, le lien ouvre la page d’accueil officielle source.

## Sources de référence

- [Analyse SOP 06A et sources LISAA / PSB](06-multibrand-reuse-analysis.md)
- [Accueil officiel LISAA](https://www.lisaa.com/fr)
- [Catalogue de formations LISAA](https://www.lisaa.com/fr/recherchez-nos-formations)
- [Accueil officiel Paris School of Business](https://www.psbedu.paris/fr)
- [Admissions PSB](https://www.psbedu.paris/fr/admissions)
- [Accréditations PSB](https://www.psbedu.paris/fr/ecole/accreditation)

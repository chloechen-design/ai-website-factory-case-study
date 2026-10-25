# SOP 07 — Audit de qualité, benchmark et propositions

**ÉTAPE A seulement — 24 octobre 2026.** Ce document analyse le code, les données et les pages locales Penninghen, LISAA et PSB, puis propose des priorités. Aucun composant, style, contenu, configuration de marque ou page n’a été modifié. L’architecture de la bibliothèque est conservée.

## Synthèse

Le projet prouve déjà une réutilisation technique crédible : les trois routes passent par le même Page Assembler, le même registre de composants partagés, et des manifestes de page séparés. Le problème principal n’est donc pas l’absence d’architecture commune, mais la qualité de ce que les données et les variantes actuelles font afficher.

Les défauts les plus visibles sont :

1. **Le fallback média du Hero prend trop de place quand aucune image n’est fournie.** Sur LISAA, le grand avis orange de média absent domine le Hero ; sur PSB, son texte se superpose au titre. C’est confirmé dans le navigateur et expliqué par le rendu de `EditorialMedia` et les styles de `hero--cover` (`src/components.js:19–26`, `src/styles/base.css:68–74,109–114`).
2. **Les cartes de programmes ressemblent parfois à des destinations sans en être.** Elles savent recevoir un lien, mais les données ne les fournissent pas toujours : aucun des cinq domaines LISAA n’a de destination dans la carte ; pour PSB, seul le Programme Grande École est lié sur quatre familles (`src/components.js:69–76`, `data/lisaa-homepage.js:50–60`, `data/psb-homepage.js:7–12,51–61`).
3. **Certains CTA ne conduisent pas à l’objet annoncé.** Le bouton « Brochure » PSB mène à l’accueil ; les événements LISAA et PSB renvoient également à l’accueil plutôt qu’à une fiche d’événement (`data/psb-homepage.js:26–29,118–131`, `data/lisaa-homepage.js:104–117`).
4. **Les trois identités se distinguent surtout par couleur, pas par les systèmes visuels complets.** Les trois thèmes partagent les mêmes familles typographiques et réglages principaux ; LISAA et PSB indiquent eux-mêmes que leurs valeurs sont exploratoires. Sans chartes/assets autorisés, la fidélité officielle reste inconnue (`brands/*/theme.css`).
5. **Le contenu est honnête sur ses limites, mais trop souvent mince pour aider à choisir.** Les mentions de prototype sont répétées et les cartes montrent souvent une catégorie sans niveau, campus, diplôme ou prochaine étape. Les visiteurs doivent poursuivre leur recherche hors de la page.

**Verdict de spécificité :** la bibliothèque répond bien au problème multi-marques (manifestes, thème par marque, vrais composants et extensions isolées), mais les trois pages restent visuellement plus interchangeables que leurs contenus officiels. C’est une inférence de revue visuelle, pas un jugement de conformité aux chartes.

### Légende des preuves

- **FAIT** : présent dans le code ou les données, ou vu sur une route servie.
- **HYPOTHÈSE** : impact probable sur une personne ; à confirmer par test utilisateur.
- **NON VÉRIFIÉ** : source, autorisation, comportement ou mesure manquante.

## 1. Audit de l’existant

| Priorité / composant | Observation et preuve | Cause (code / données / présentation) et impact | Suite proposée |
|---|---|---|---|
| **P1 — `EditorialMedia` + Hero, LISAA / PSB** | **FAIT :** le Hero LISAA montre un placeholder orange de grande taille. Le Hero cover PSB montre une notice média au même emplacement que le titre ; le chevauchement est visible sur `/sites/psb/`. Penninghen, à l’inverse, emploie des photos de banque d’images, explicitement non attribuées à l’école. | **Cause vérifiée :** sans `imageUrl`, `EditorialMedia` rend une notice ; `.media-slot--placeholder` impose `min-height: clamp(16rem, 31vw, 29rem)`, tandis que le cover fait remplir tout le Hero par le média. Le style place la copie devant ce fond (`src/components.js:19–26,55–66`, `src/styles/base.css:68–74,108–114`). **HYPOTHÈSE :** les pages paraissent inachevées avant même que l’offre soit comprise. | Prévoir un état « sans média » composé (Hero éditorial sans média, ou réduction/omission du média). Garder un placeholder diagnostique compact seulement en mode audit. Ne pas remplacer un grand vide par une série de petits blocs. Tester les deux variantes avec média autorisé et sans média. |
| **P1 — cartes et découverte des formations, toutes** | **FAIT :** `ProgramCard` ne rend le titre cliquable que si `href` est fourni. LISAA présente cinq domaines sans destination depuis les cartes ; PSB lie seulement 1 famille sur 4 ; les cartes Penninghen consultées n’ont pas de destinations de formation. Le finder LISAA observé officiellement (Ville/Filière/Niveau) n’existe pas dans le POC. | **Cause :** la structure partagée est assez flexible pour un titre, un résumé, des attributs et un lien, mais le contenu actuel se limite surtout aux catégories. Il n’existe pas de modèle de catalogue exhaustif ni de filtre relationnel. **HYPOTHÈSE :** l’internaute doit recommencer sa recherche sur le site officiel. | Séparer « domaine/famille observée » de « programme détaillé ». Compléter uniquement les données sourcées et les liens vérifiés. Concevoir le finder LISAA comme un pattern distinct, pas comme une grille de cartes renommée. |
| **P1 — destinations News / Agenda, LISAA / PSB** | **FAIT :** les boutons « Source officielle » des événements LISAA et PSB mènent à leur page d’accueil ; plusieurs liens d’actualités PSB y mènent aussi faute d’URL d’article conservée. « Brochure » PSB mène à l’accueil. Les destinations des objets sont dans les données ci-dessus. | **Cause :** absence d’URL précise dans la sélection de contenu ; libellé du lien peut promettre davantage qu’une source générale. **HYPOTHÈSE :** l’utilisateur s’attend à une fiche événement, une inscription ou un document et doit chercher à nouveau. | Dans les données, distinguer le lien vers l’objet, le lien de source et le libellé correspondant. Ne pas afficher un CTA d’inscription ou de brochure si la destination réelle n’est pas confirmée. |
| **P1 — différenciation de marque** | **FAIT :** les trois thèmes partagent Helvetica Neue/Helvetica/Arial, le poids display 800 et des réglages de tracking proches. Les couleurs LISAA/PSB sont explicitement provisoires ; les layouts et composants partagés restent dominants. **NON VÉRIFIÉ :** chartes, polices, logos et règles graphiques approuvés. | **Cause :** les tokens de marque actuels modifient principalement la palette et quelques valeurs, sans fondement fourni pour leurs typos ou motifs. **HYPOTHÈSE :** le système démontre mieux la vitesse de réutilisation que la capacité à conserver trois identités distinctes. | Avant de déclarer une fidélité de marque, obtenir des références autorisées. Ne pas ajouter des variantes visuelles arbitraires pour compenser l’absence de charte. Mesurer ensuite ce qui relève des tokens, de variantes et de patterns spécifiques. |
| **P2 — Média, propriété et authenticité** | **FAIT :** Penninghen utilise des photos de banque d’images Pexels, avec avertissements qu’elles ne sont pas des créations étudiantes ; certaines sont répétées. La bibliothèque documente une propriété `rights` pour `EditorialMedia`, mais le renderer n’affiche que titre, provenance/source et URL (`src/library-catalog.js:53`, `src/components.js:14–29`). | **Cause :** les contenus prouvent une composition, pas la vie réelle des écoles ; le contrat de propriété des médias est incomplet. **NON VÉRIFIÉ :** dimensions pixels réellement téléchargées et résolution utile des images distantes ; aucun défaut de flou n’est donc affirmé. | Ajouter, après décision, une provenance et un état de permission traçables au modèle média ; ne jamais attribuer une image d’illustration à une école ou à ses étudiants. Vérifier la résolution intrinsèque et la taille affichée avant de conclure à un problème de netteté. |
| **P2 — densité éditoriale et rythme** | **FAIT :** le système réutilise un grand titre, des cartes et grilles répétées ; les pages répètent des avertissements de prototype. Les données de programme restent souvent des catégories ; aucune admission étape-par-étape n’est affichée. | **Cause :** déficit de contenu structuré validé, pas nécessairement défaut du seul composant. **HYPOTHÈSE :** les avertissements occupent l’attention sans aider à comparer, et la page offre peu de progression « comprendre → preuve → agir ». | Conserver une mention non officielle claire et unique ; utiliser le reste de l’espace seulement pour du contenu vérifié. Introduire des compositions éditoriales à densité variée uniquement lorsqu’un contenu réel les justifie. |
| **P2 — bibliothèque / documentation** | **FAIT :** la bibliothèque rend des fonctions réelles du projet et permet de choisir marque, page et largeur d’aperçu. Les propriétés d’un composant sont listées, mais il n’y a pas de panneau de contrôles permettant de modifier en direct chaque propriété. Les rubriques mélangent français et anglais. | **Cause :** catalogue descriptif distinct des arguments réels transmis au composant ; les previews ne sont pas un bac à sable complet de props. | Pour l’étape suivante, donner la priorité à quelques contrôles représentatifs (contenu, variante, média on/off) plutôt qu’à une copie de Storybook ou à un catalogue de props sans comportement. Harmoniser la langue de navigation. |

### Usage, charge cognitive et qualité d’interaction

Revue heuristique manuelle, à ne pas lire comme un test avec des personnes ni comme une certification d’accessibilité :

| Heuristique | Score | Lecture observée |
|---|---:|---|
| Retour sur l’état du système | 3/4 | Le sélecteur de marque et d’aperçu indique son état ; le menu mobile a `aria-expanded`. |
| Correspondance avec le monde réel | 3/4 | Noms et catégories sont familiers, mais beaucoup de détails d’offre et de destinations manquent. |
| Contrôle et liberté | 3/4 | Liens et ancres ordinaires ; le code ferme le menu et les `<details>` sur Échap. Le test clavier direct n’a été exécuté que sur le menu PSB. |
| Cohérence et standards | 3/4 | Les composants communs sont cohérents ; les styles de marques restent provisoires. |
| Prévention des erreurs | N/A | Pas de saisie utilisateur ou d’action destructive dans ce périmètre. |
| Reconnaissance plutôt que mémorisation | 3/4 | Les sections sont annoncées, mais les cartes montrent parfois seulement un libellé. |
| Flexibilité et efficacité | 2/4 | La bibliothèque filtre marque/viewport ; les sites n’ont pas les parcours de recherche et filtres des sites officiels. |
| Esthétique et minimalisme | 2/4 | L’aplat du placeholder, la répétition et les grands titres peuvent concurrencer le contenu. |
| Reconnaissance et reprise après erreur | N/A | Aucun flux de saisie/erreur utilisateur ; un fallback existe en cas d’échec d’image, sans vérification réseau exhaustive. |
| Aide et documentation | 3/4 | Variantes et sources sont documentées ; pas de recherche de composants et langue mixte. |

**Résultat indicatif : 22/32 (69 %).** Les deux N/A sont exclus du dénominateur ; ce score sert seulement à comparer une future revue. Charge cognitive **modérée** : le chemin vers une formation et la hiérarchie du Hero PSB sont les principales frictions. Profils de tâche à confirmer : futur étudiant cherchant une formation, parent cherchant à comprendre admissions/réassurance, visiteur mobile cherchant un événement. Aucun entretien n’a validé ces profils.

**Points forts :** le même assembleur et registre sont utilisés sur trois routes ; les pages ont des manifestes/données séparés ; les modules réellement spécifiques restent isolés ; les images d’illustration et contenus à vérifier sont signalés avec transparence. Ce sont des atouts structurels, pas une preuve de pertinence éditoriale finale.

## 2. Benchmark de Design Systems professionnels

Les références ci-dessous documentent des pratiques, pas une charte graphique à transposer. Spectrum, Carbon et Storybook visent majoritairement des composants d’interfaces et de documentation ; ils ne remplacent pas l’étude du contenu éditorial d’une école.

| Source exacte et capacité consultée | Problème traité / principe transférable | Limite pour ce POC |
|---|---|---|
| [Adobe Spectrum — States](https://spectrum.adobe.com/page/states/) et [Button](https://spectrum.adobe.com/web/swc/components/button/) | Distinguer variantes et états (focus, hover, disabled, etc.), documenter quand utiliser/éviter un composant et ses comportements clavier. Transférable : chaque Hero, carte et contrôle doit annoncer ses états et règles d’usage, pas seulement son nom. | Guide de composants produit ; ne détermine ni le langage d’une école ni la densité d’une page d’accueil. Les noms d’états ne justifient pas d’ajouter toutes les variantes. |
| [IBM Carbon — Components](https://www.carbondesignsystem.com/building-blocks/core/components/overview/components), [Patterns](https://www.carbondesignsystem.com/building-blocks/core/patterns/overview), [Filtering](https://www.carbondesignsystem.com/building-blocks/core/patterns/filtering), [Empty states](https://www.carbondesignsystem.com/building-blocks/core/patterns/empty-states) | Distinguer un composant de base d’un pattern qui enchaîne plusieurs composants et étapes. Le filtrage se conçoit autour d’une tâche et de données ; un état vide doit expliquer la situation et offrir une sortie plutôt que laisser une impasse. Transférable : le finder LISAA est un pattern de découverte, pas une carte ; un catalogue vide doit rester intelligible. | Carbon est un système d’interface produit. Ses patterns ne sont pas des modèles éditoriaux obligatoires ; ne pas copier sa structure ni imposer ses choix aux sites. |
| [Storybook — Controls](https://storybook.js.org/docs/essentials/controls) | Les args/controls permettent d’essayer des propriétés sur la vraie story sans réécrire le composant. Transférable : previews du DS contrôlables par marque, variante, contenu, média présent/absent. | Une page de composants vanilla JS n’a pas besoin de Storybook ni d’une dépendance pour le démontrer. Les structures de données complexes peuvent être peu adaptées à des contrôles simples. |

**Conclusion de benchmark :** mieux documenter le contrat (props, états, limites, usage avec/sans média), et mettre les besoins multi-étapes dans des patterns. Ne pas augmenter le nombre de variantes sans tâche et données justifiant chacune.

## 3. Benchmark des sites d’écoles et références éditoriales

Pages officielles consultées ou relues le 24/10/2026. Les constats sur un site officiel décrivent ce qu’il publie ; ils ne valident ni ses affirmations ni les droits de ses visuels.

| Site / source exacte | Contenus et modèle observés | Ce qui peut inspirer / ce qui reste propre au site |
|---|---|---|
| [Penninghen — accueil](https://www.penninghen.fr/) | Campagne et Hero, catégories/formations, vie de l’école, actualités et agenda. **FAIT visuel (revue navigateur A) :** la page associe sa marque, des contrastes noir/jaune et des images de l’école. Le POC a une photo de banque d’images, pas des créations de l’école. | Réutiliser le rythme éditorial et les catégories d’orientation comme références de contenu. Wordmark, campagne, photos, textes et hiérarchie officielle ne sont pas des assets réutilisables sans autorisation. |
| [LISAA — accueil](https://www.lisaa.com/fr) et [recherche de formations](https://www.lisaa.com/fr/recherchez-nos-formations) | Accès Ville/Filière/Niveau, domaines créatifs, écoles/campus, actualités, événements et parcours de candidature. **FAIT visuel (A) :** cinq catégories de filière sont différenciées ; elles sont des indicateurs observés, pas preuve d’identités autonomes. | Le modèle multi-facettes et les relations géographiques sont un vrai besoin. Le catalogue de données, filtres et taxonomies sont propres à LISAA ; le POC ne possède ni cette base ni la recherche actuelle. |
| [PSB — accueil](https://www.psbedu.paris/fr), [admissions](https://www.psbedu.paris/fr/admissions), [accréditations](https://www.psbedu.paris/fr/ecole/accreditation) | Catégories de programmes, accès au finder, candidature, événements, campus, témoignages et éléments de reconnaissance. Les affirmations de classement/accréditation sont celles de l’école et nécessitent contrôle de date, portée et source. | Séparer découverte de programmes, admission et preuves institutionnelles. Les règles d’admission, preuves et éventuels logos sont PSB-spécifiques ; ne pas les fabriquer ni les généraliser sous forme de badges décoratifs. |
| [UAL — Portfolio Showcase](https://portfolio.arts.ac.uk/showcase-pages/) et [IP & crediting](https://www.arts.ac.uk/brand/intellectual-property-and-crediting) | Présentation consultable de projets créatifs ; règles de crédit et de propriété intellectuelle expliquent pourquoi l’auteur et la permission font partie du modèle de contenu. | Bon modèle pour une future galerie avec créateur, discipline, projet et crédit. Ne pas réutiliser les œuvres UAL ; les conditions de droits de chaque école/étudiant doivent être obtenues. |
| [Aalto — Personal Project](https://www.aalto.fi/en/contemporary-design/personal-project) | Page éditoriale centrée sur un projet, son contexte et ses éléments visuels. | Inspire un patron « projet » plus riche qu’une carte, si des projets et informations d’auteur vérifiés existent. Le contenu et les choix de mise en page appartiennent à Aalto. |
| [ESCP — Master in Management](https://escp.eu/fr/programmes/master-in-management) et [candidature](https://escp.eu/programmes/master-in-management/apply) | Pages de programme et d’admission distinctes, qui montrent qu’un parcours demande des contenus structurés par programme et étape. | Inspiration pour la séparation découverte/détails/candidature ; les exigences et dates ne sont pas transférables. Ne pas réutiliser leur contenu. |

Aucune capture de benchmark n’est jointe : les preuves sont les URLs officielles et les observations de consultation. Les images, textes, marques et logos des références n’ont pas été copiés.

## 4. Relecture du Gap Inventory 06B → 06C

**Règle de statut :** « développé » décrit l’existence dans le code ; « validé » exige un test exécuté. Une route HTTP 200 ne valide ni le contenu, ni l’accessibilité, ni le parcours métier. Les C de 06B signifiaient « capacité manquante » ; la colonne finale emploie A/B/C de l’architecture 06C.

| Besoin de 06B | État réel observé | Classe finale / décision |
|---|---|---|
| LISAA — navigation domaines/niveaux/villes et actions | Développée ; menu PSB testé au clavier, pas le modèle complet LISAA. Pas de méga-menu, finder ou recherche globale. | **B** — header hiérarchique configurable ; le finder reste un autre pattern. |
| LISAA — Hero photo, filières et recherche | Variantes présentes ; qualité insuffisante sans photo et recherche absente. | **B** — Hero configurable ; état sans média à revoir, finder séparé. |
| LISAA — recherche ville/filière/niveau | Non développée. | **C LISAA** — dépend des relations campus/école/filière/programme et d’un catalogue vérifié. |
| LISAA — métadonnées catalogue | Partiel : `ProgramCard` supporte certains champs, les données actuelles sont des catégories et presque sans attributs ni liens. | **B** — modèle de programme commun, alimenté uniquement avec champs confirmés. |
| LISAA — relation ville → école → filière | Partiel : un nombre annoncé et une note source, pas de répertoire relationnel. | **C LISAA** — aucune donnée structurée permettant encore de l’afficher. |
| LISAA — filtre événement par ville | Non développé ; agenda liste statique. | **C LISAA** — ne pas ajouter un faux filtre sans ville sur chaque événement. |
| LISAA — admission en quatre étapes | Non développé. | **B** — pattern d’étapes réutilisable, mais contenu daté et validé par école requis. |
| LISAA — témoignage attribué | Non développé ; actualité générique ne suffit pas. | **B** — structure potentiellement commune, citation/identité/consentement requis. |
| LISAA — footer groupes/écoles/réseaux | Footer à groupes développé ; ses URLs doivent être éditorialement vérifiées. | **B** — configurable. |
| LISAA — présence/ordre des sections | Manifeste `brands/lisaa/site.js` et assembleur commun existent ; mêmes mécanismes dans les trois marques. | **Infrastructure partagée** — développé dans le code ; contrat de réutilisation non retesté ici. |
| PSB — navigation multi-domaines/actions/langues | Développée ; menu mobile et sous-menu Programmes ouverts avec Entrée. Pas de mega-menu ni recherche globale. | **B** — configurable ; limiter les choix au besoin réel. |
| PSB — Hero cover photo / trois CTA | Variante et trois actions disponibles ; le placeholder se superpose au titre si le média manque. | **B, développé mais qualitativement insuffisant** — fallback et lisibilité mobile à revoir. |
| PSB — entrée vers le program finder | Aucun CTA finder spécifique ; une partie des familles n’a pas de destination. **Omission de suivi :** gap P1 de 06B non repris comme ligne dédiée dans 06C. | **B** pour un lien de sortie vers une destination officielle vérifiée ; toute intégration au moteur externe reste non évaluée et hors périmètre actuel. |
| PSB — familles PGE/Bachelors/MSc/Executive | Partiel : modèle structuré mais 1 destination sur 4. | **B** — même composant, données/liens vérifiés nécessaires. |
| PSB — Campus Le Delta | Contexte éditorial spécifique développé, sans inventer des services partagés. | **C PSB** — composant spécifique justifié par le campus nommé. |
| PSB — admissions ramifiées par programme | Non développé. | **B** — modèle commun d’étapes/branches piloté par programme, à différer sans règles officielles datées. |
| PSB — accréditations/reconnaissances | Partiel : panneau textuel, une entrée, source et réserve ; statut, portée, période et droits de logo à vérifier. | **C PSB** — besoin de preuve institutionnelle spécifique ; ne pas le réduire à une métrique ou à un badge. |
| PSB — témoignages alumni/fonction/organisation | Non développé. | **B** — structuration commune possible ; consentement et attribution requis. |
| PSB — vidéo éditoriale accessible | Non développé. | **C PSB au périmètre actuel** — seul besoin identifié ici ; reclasser en B seulement si un besoin commun et des sources réelles apparaissent. |
| PSB — footer groupes/statut/reconnaissances | Footer à groupes développé ; statut et reconnaissances restent à sourcer. | **B** — configurable, avec contenu vérifié. |

## 5. Propositions priorisées — sans implémentation

| Priorité / solution | Problème → preuve / benchmark | Données, variantes et interactions attendues | Sans média / responsive / accessibilité | Acceptation, impact, complexité |
|---|---|---|---|---|
| **P1 · B — contrat média + fallback éditorial** | Placeholder trop dominant (`EditorialMedia`, CSS). Carbon Empty States : un état vide doit avoir un sens et une sortie ; Spectrum documente des états et usages. | Média : titre, texte alternatif, source, crédit, droits/permission, ratio et cadrage. États : média autorisé ; média absent ; échec de chargement ; aperçu d’audit. | Sans média : basculer vers le layout éditorial ou réduire/omettre le slot ; pas de grand rectangle d’attente. Mobile : conserver le titre/CTA avant ou avec l’image selon le layout. Alt pertinent, source lisible, erreur annoncée. | Aucun placeholder géant visible dans un prototype « page » ; aucun média présenté comme création d’école sans provenance et permission. **Impact : 3 pages. Complexité : M.** |
| **P1 · B — Hero comme pattern de composition** | Trois variantes existent, mais le Hero PSB devient illisible sans média. A/B compare desktop et aperçu 390 px. Spectrum : documenter variantes/états. | Split, editorial sans média, cover avec média ; titre, sous-titre, ordre, 1 action principale + actions secondaires configurables ; ne pas imposer un même nombre de lignes. | Tester à 390 px et desktop avec titres réels ; ordre de lecture texte/média cohérent ; boutons accessibles au clavier et état focus visible ; respecter réduction du mouvement. | Titre sans chevauchement, CTA principal visible sans scroll déraisonnable, et état sans image évalué. **Impact : 3 pages. Complexité : M.** |
| **P1 · B — modèle Programme + ProgrammeSection** | Catégories sans métadonnées ni lien ; `ProgramCard` accepte `href`/`attributes` mais le contenu ne les renseigne pas. Les sites LISAA/PSB offrent découverte plus spécifique. | Entité avec type (domaine/famille/programme), niveau, diplôme, campus, durée/modalité si sourcés, résumé, URL officielle et média optionnel ; filtres ne sont pas inclus dans cette carte. | Carte lisible sans image ; média facultatif ; en grille ou rangée selon quantité ; champs annoncés par libellé, lien identifié, tabulation logique. | Afficher uniquement les champs présents et vérifiés ; si ce n’est qu’une catégorie, ne pas la présenter comme programme détaillé ; aucun CTA vers page d’accueil sous un libellé de détail. **Impact : 3 pages. Complexité : M.** |
| **P1 · C LISAA — pattern Program Finder** | Le site officiel utilise Ville/Filière/Niveau ; POC n’a qu’un index d’ancrages. Carbon Filtering fournit un modèle de réflexion sur contrôles, remise à zéro et états. | Relations campus→ville, domaine→programme, niveau ; filtres sélectionnables, résultat, réinitialisation, lien vers fiche officielle. Aucun catalogue fictif. | Formulaire empilé sur mobile, libellés explicites, clavier, résultat annoncé, état zéro avec sortie/réinitialisation. Pas de média requis ; ne pas confondre filtres et cartes. | Sur données de test sourcées, chaque combinaison retourne uniquement les correspondances et la remise à zéro fonctionne ; sans données, afficher un renvoi honnête au catalogue officiel. **Impact LISAA. Complexité : É.** |
| **P2 · B — actualités et Agenda avec destinations fiables** | Le composant est présent ; plusieurs événements/actualités renvoient à l’accueil. | Séparer `itemUrl` et `sourceUrl`; date, statut/expiration, ville si applicable, libellé d’action précis. Filtre ville seulement dans le pattern LISAA. | Cartes utilisables sans image ; dates et lieux restent textuels ; liens clavier et focus clairs ; dates expirées explicitement exclues ou marquées. | Un clic mène à la publication/événement promis, ou le CTA dit clairement « Voir la source officielle » ; pas de réservation simulée. **Impact : 3 pages. Complexité : F–M.** |
| **P2 · B — AdmissionsJourney (pattern partagé)** | Étapes LISAA et chemins différents PSB recensés en 06B, absents en 06C. Carbon invite à distinguer pattern de composants. | Étapes, programme/voie concernée, pièces/dates, liens, date de vérification ; variantes linéaire et branches par programme. Aucune connexion candidature interne. | Alternative linéaire mobile, titres de niveaux cohérents, navigation clavier ; média facultatif. Les dates doivent avoir un état « à vérifier » en prototype, non une fausse échéance. | Seules les étapes sourcées sont affichées ; toutes les branches ont une sortie/action claire ; aucune étape d’admission inventée. **Impact LISAA + PSB. Complexité : É.** |
| **P2 · B — ProjectFeature / galerie attribuée** | Penninghen a des photos stock et un avertissement ; UAL/Aalto montrent l’intérêt d’un objet projet et de crédits. | Projet, auteur(s), discipline, titre, résumé/processus, médias, source, accord de publication et crédit. Galerie ou vedette éditoriale selon le contenu disponible. | Si aucun projet autorisé, masquer la galerie ou garder un emplacement compact d’audit ; layout sans média ne doit pas imiter une œuvre. Alt contextualisé, crédits persistants, grille empilée sur petit écran. | Aucune photo d’illustration présentée comme œuvre étudiante ; chaque projet affiché a son attribution et accord. **Impact Penninghen + potentiellement LISAA. Complexité : M.** |
| **P2 · C PSB — panneau de reconnaissances probant** | Panneau présent mais partiel ; PSB publie ses reconnaissances. Aucune preuve n’est encore modélisée par portée/période complète. | Organisme, objet, périmètre/programmes, état, période valide, date de vérification, source et droit du logo éventuel. | Texte d’abord ; logo facultatif uniquement autorisé ; panneau en une colonne mobile ; source et période lisibles au clavier/lecteur. | Toute entrée a une source officielle, une portée et une date ; les statuts incertains sont masqués ou marqués comme à confirmer ; aucune reconnaissance déduite d’un chiffre. **Impact PSB. Complexité : M.** |

Complexité indicative relative (F faible, M moyenne, É élevée), pas un chiffrage. Les lignes P2 peuvent être repriorisées après validation du but de la prochaine étape et obtention des contenus.

## 6. Décisions de périmètre et critères de réussite du prochain lot

### À développer en premier, si validation

1. **Fallback média + Hero**, communs : traiter le défaut le plus visible sur LISAA/PSB avant d’ajouter de nouvelles sections.
2. **Données et destinations de programmes**, commun : séparer proprement catégorie observée et programme complet.
3. **Finder LISAA**, seulement après disponibilité d’une table de programmes/campus et de liens officiels à jour.
4. Puis choisir un seul pattern métier à éprouver : admissions (LISAA/PSB) ou preuve créative (Penninghen/LISAA), selon les contenus autorisés disponibles.

### Mesurer la vraie réutilisation

- Démontrer qu’un seul fichier de composant est consommé par les trois manifestes ; ne pas copier le HTML dans les marques.
- Modifier un titre, une action et la présence/absence de média uniquement dans les données ; exécuter le test et vérifier le rendu desktop/mobile.
- Tester une variation de thème sans altérer la structure ; vérifier séparément qu’elle ne prétend pas représenter une charte non fournie.
- Vérifier qu’un composant C ne s’importe que dans son manifeste, et qu’aucune autre marque ne dépend de ses styles.
- Mesurer les liens, états vides, médias cassés, clavier et débordements ; conserver captures et résultats reproductibles.

### Ne pas développer maintenant

- CMS, moteur de candidature, réservation, recherche globale ou connecteurs internes Galileo.
- Un moteur de filtre universel, avant d’avoir confirmé un second besoin comparable et normalisé les données.
- Témoignages, projets étudiants, logos ou chiffres inventés ; médias dont le droit d’usage n’est pas établi.
- De nouveaux lots de cartes ou variantes décoratives sans tâche éditoriale identifiée.
- Des animations de prestige ; elles ne résolvent ni le vide média ni les destinations de liens.
- Fidélité officielle des chartes LISAA/PSB/Penninghen sans documents/actifs de marque autorisés.

### Décisions humaines requises avant l’étape B

- Quelles ressources (charte, typographies, logos, photos, projets, témoignages) sont autorisées, et qui peut valider leurs droits/crédits ?
- La prochaine étape doit-elle privilégier la qualité commune (fallback + Hero + programmes) ou le parcours spécifique LISAA (finder) ? La recommandation est de sécuriser le socle commun d’abord.
- Pour PSB, faut-il garder un renvoi vers le finder officiel ou envisager plus tard une intégration ? L’URL et le comportement à intégrer ne sont pas validés ici.
- Quelle action est prioritaire par école (explorer, s’inscrire à un événement, candidature) ? Les destinations actuelles ne permettent pas encore de l’affirmer.

## Tests, limites et provenance de l’audit

**Exécuté / observé :**

- Évaluation A indépendante : consultation des pages officielles et revue des quatre surfaces locales en desktop et dans leurs aperçus 390 px.
- Évaluation B indépendante : les 4 routes locales — bibliothèque, Penninghen, LISAA, PSB — ont répondu HTTP 200. Les aperçus intégrés des trois marques ont été regardés à 390 px. Dans le preview PSB, Entrée a ouvert le menu mobile puis le sous-menu « Programmes ».
- Le code confirme un assembleur commun (`src/page-assembler.js`, `src/site-entry.js`) et des manifestes distincts ; les routes 200 seules ne prouvent pas toute l’acceptation du contrat de réutilisation.
- Les liens génériques et le chevauchement du Hero PSB ont été vérifiés dans la page servie et les données.
- Le détecteur Impeccable a été tenté mais n'a pas pu s'exécuter (permission refusée). Aucun contournement, installation ou changement de permission n’a été effectué.

**Non réalisé / non vérifié :**

- Pas d’audit console/réseau complet ; le navigateur utilisé ne l’exposait pas. Les HTTP 200 n’excluent pas une erreur JavaScript ou réseau.
- Pas de test clavier systématique des quatre pages, ni d’audit WCAG/contraste automatisé ; seule l’ouverture clavier du menu PSB a été testée directement.
- Pas de test exécuté de `tests/reuse-contract.html` dans cette revue ; aucun test n’est déclaré réussi sur le remplacement de données.
- Pas de collecte de captures de benchmark externes ; aucun rapport visuel sauvegardé.
- Pas de mesure de `naturalWidth` ou des pixels servis par les images Pexels, ni comparaison systématique avec les dimensions CSS. Aucun flou n’est affirmé ; la priorité vérifiée est l’absence de média sur LISAA/PSB et l’authenticité/provenance sur Penninghen.
- Les profils, l’effet sur la confiance, la hiérarchie des CTA et la fidélité de marque restent des hypothèses tant qu’ils ne sont pas testés avec des utilisateurs et des référentiels officiels.

**Évaluations indépendantes :** A et B convergent sur la faiblesse des parcours de programme, les placeholders Hero, les destinations trop générales et le caractère provisoire des identités. Aucun désaccord matériel n’a été observé. B complète A par les HTTP 200, l’essai clavier PSB et l’omission du program finder PSB dans le registre 06C ; A apporte l’analyse comparative de la page, du rythme visuel et des tâches probables. La couverture et les méthodes diffèrent, sans se contredire.

## Sources de projet relues

- [Analyse de réutilisabilité 06A](06-multibrand-reuse-analysis.md)
- [Matrice des gaps 06B](06b-gap-matrix.md)
- [Gap Inventory 06C](06c-gap-inventory.md)
- [Matrice des composants 06C](06c-component-matrix.md)
- [Analyse homepage Penninghen](../research/01-penninghen-homepage-analysis.md)
- [Matrice de personnalisation Penninghen](02-brand-customisation-matrix.md)

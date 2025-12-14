# Guide de Tests Multi-Navigateurs

Ce document liste tous les tests à effectuer pour garantir la compatibilité du portfolio sur différents navigateurs.

## Navigateurs à Tester

### Desktop
- ✅ Google Chrome (dernière version)
- ✅ Mozilla Firefox (dernière version)
- ✅ Microsoft Edge (dernière version)
- ⚠️ Safari (macOS uniquement)
- ⚠️ Opera (optionnel)

### Mobile
- ✅ Chrome Mobile (Android)
- ✅ Safari Mobile (iOS)
- ⚠️ Firefox Mobile
- ⚠️ Samsung Internet

## Checklist de Tests par Page

### Page index.html (À propos)

#### Affichage
- [ ] La navbar s'affiche correctement
- [ ] Le bouton de changement de thème fonctionne
- [ ] Les sections Ynov, ESIEA, JB2B s'affichent correctement
- [ ] Les images des écoles chargent correctement
- [ ] Le texte est lisible et bien formaté

#### Fonctionnalités
- [ ] Les liens de navigation fonctionnent
- [ ] Le changement de thème (clair/sombre) fonctionne
- [ ] Les animations de fondu s'affichent au scroll
- [ ] Le compteur de visites s'affiche et s'incrémente
- [ ] Le footer s'affiche avec toutes les informations

#### Responsive
- [ ] La page est responsive sur mobile (< 768px)
- [ ] La page est responsive sur tablette (768px - 992px)
- [ ] La page est responsive sur desktop (> 992px)
- [ ] Les images s'adaptent correctement
- [ ] La navbar se transforme en menu hamburger sur mobile

### Page competences.html (Compétences)

#### Affichage
- [ ] Le titre "Compétences" s'affiche
- [ ] Les cartes de compétences (Front-End / Back-End) s'affichent
- [ ] Le séparateur vertical s'affiche (desktop uniquement)
- [ ] Les icônes et textes sont bien alignés

#### Fonctionnalités
- [ ] Le changement de thème fonctionne
- [ ] Les animations de fondu fonctionnent
- [ ] Le compteur de visites fonctionne
- [ ] Les cartes ont un effet hover

#### Responsive
- [ ] Les colonnes passent en mode vertical sur mobile
- [ ] Le séparateur disparaît sur mobile
- [ ] Les textes sont lisibles sur tous les écrans

### Page projets.html (Projets)

#### Affichage
- [ ] Le carousel s'affiche correctement
- [ ] Les indicateurs du carousel sont visibles
- [ ] Les boutons précédent/suivant fonctionnent
- [ ] Toutes les slides (12 au total) s'affichent

#### Système de Filtrage
- [ ] Les boutons de filtrage s'affichent correctement
- [ ] Le filtre par école (ESIEA/Ynov/Personnel) fonctionne
- [ ] Le filtre par domaine (Programmation/Humain) fonctionne
- [ ] Les filtres combinés fonctionnent
- [ ] Le bouton "Réinitialiser" fonctionne
- [ ] Le texte des résultats se met à jour
- [ ] Les indicateurs du carousel se mettent à jour
- [ ] Les couleurs des boutons changent avec le thème sombre

#### Fonctionnalités
- [ ] Le carousel auto-slide ne se déclenche pas
- [ ] Les liens GitHub dans les projets fonctionnent
- [ ] Les images des logos (ESIEA, Ynov, Unity) chargent
- [ ] Le changement de thème affecte les filtres

#### Responsive
- [ ] Le carousel est navigable sur mobile
- [ ] Les filtres passent en colonne sur mobile
- [ ] Les boutons de navigation du carousel sont visibles
- [ ] Le texte des projets reste lisible

### Page contact.html (Contact)

#### Affichage
- [ ] La carte de profil s'affiche
- [ ] L'image de profil charge (si présente)
- [ ] Le formulaire de contact s'affiche
- [ ] Le bouton CV s'affiche

#### Fonctionnalités
- [ ] Le formulaire de contact fonctionne
- [ ] La validation des champs fonctionne
- [ ] L'envoi d'email fonctionne (EmailJS)
- [ ] Le message de confirmation s'affiche
- [ ] Les liens mailto et téléphone fonctionnent

#### Responsive
- [ ] Le formulaire est utilisable sur mobile
- [ ] La carte de profil s'adapte sur mobile
- [ ] Les champs du formulaire sont cliquables/tapables

### Page cv-gamifie.html (CV Gamifié)

#### Affichage
- [ ] La carte joueur s'affiche avec l'avatar
- [ ] Les statistiques (XP, Succès, Projets) s'affichent
- [ ] La barre de progression s'affiche
- [ ] L'arbre de compétences s'affiche correctement
- [ ] Les branches (Front-End, Back-End, Autres) sont visibles
- [ ] Les succès débloqués et verrouillés se distinguent
- [ ] La timeline des quêtes s'affiche

#### Fonctionnalités
- [ ] L'animation de comptage des stats fonctionne
- [ ] La barre de progression s'anime au chargement
- [ ] Cliquer sur une compétence affiche les détails
- [ ] La tooltip se positionne correctement
- [ ] La tooltip se ferme en cliquant à l'extérieur
- [ ] Les XP se calculent basés sur les visites
- [ ] Le bouton "Télécharger CV" fonctionne

#### Animations
- [ ] L'animation de fond (gradient rotatif) fonctionne
- [ ] Les succès ont un effet hover
- [ ] Les compétences ont un effet hover
- [ ] Les quêtes actives pulsent

#### Responsive
- [ ] La carte joueur s'adapte sur mobile
- [ ] Les statistiques passent en colonne sur mobile
- [ ] L'arbre de compétences est scrollable
- [ ] Les succès passent en une seule colonne sur mobile
- [ ] La timeline reste lisible sur mobile
- [ ] La tooltip se centre sur mobile

### Fonctionnalités Globales

#### Mode Sombre/Clair
- [ ] Le changement de thème persiste après rechargement
- [ ] Toutes les couleurs changent correctement
- [ ] Les images/logos restent visibles
- [ ] Les bordures et ombres s'adaptent
- [ ] Les boutons changent de couleur
- [ ] L'icône du bouton change (lune/soleil)

#### Compteur de Visites
- [ ] Le compteur s'affiche en bas à gauche
- [ ] Le compteur s'incrémente à chaque visite
- [ ] Le compteur persiste après rechargement
- [ ] Le bouton de réinitialisation fonctionne
- [ ] Le compteur est bien positionné (ne chevauche rien)

#### Animations
- [ ] Les éléments apparaissent avec un fondu au scroll
- [ ] Les animations ne se déclenchent qu'une fois
- [ ] Les animations sont fluides (pas de saccades)
- [ ] Les animations respectent `prefers-reduced-motion`

#### Navigation
- [ ] Tous les liens de la navbar fonctionnent
- [ ] La page active est bien indiquée
- [ ] Le menu hamburger fonctionne sur mobile
- [ ] Les liens du footer fonctionnent

## Tests de Performance

### Temps de Chargement
- [ ] Page index : < 2 secondes
- [ ] Page competences : < 2 secondes
- [ ] Page projets : < 2.5 secondes
- [ ] Page contact : < 2 secondes
- [ ] Page cv-gamifie : < 2.5 secondes

### Métriques Web Vitals
- [ ] LCP (Largest Contentful Paint) : < 2.5s
- [ ] FID (First Input Delay) : < 100ms
- [ ] CLS (Cumulative Layout Shift) : < 0.1

### Outils de Test
- [ ] Google PageSpeed Insights
- [ ] Lighthouse (Chrome DevTools)
- [ ] GTmetrix
- [ ] WebPageTest

## Tests de Compatibilité CSS

### Propriétés Modernes
- [ ] CSS Grid fonctionne
- [ ] CSS Flexbox fonctionne
- [ ] CSS Variables (custom properties) fonctionnent
- [ ] CSS Transitions fonctionnent
- [ ] CSS Animations fonctionnent
- [ ] Border-radius fonctionne
- [ ] Box-shadow fonctionne

### JavaScript
- [ ] LocalStorage fonctionne
- [ ] Intersection Observer fonctionne
- [ ] ES6+ (const, let, arrow functions) fonctionne
- [ ] Bootstrap 5 fonctionne
- [ ] Font Awesome icons chargent

## Tests d'Accessibilité

- [ ] Les images ont des attributs `alt`
- [ ] Les boutons ont des labels appropriés
- [ ] Le contraste des couleurs est suffisant
- [ ] La navigation au clavier fonctionne
- [ ] Les animations respectent `prefers-reduced-motion`
- [ ] Les liens ont du texte descriptif

## Problèmes Connus

### Safari
- Certaines animations CSS peuvent être moins fluides
- Les CSS Grid layouts peuvent nécessiter des préfixes `-webkit-`

### Internet Explorer 11 (Non Supporté)
- CSS Grid non supporté
- CSS Variables non supportées
- Intersection Observer non supporté
- De nombreuses fonctionnalités ES6+ non supportées

### Mobile
- Les animations complexes peuvent être moins performantes
- Le mode paysage peut nécessiter des ajustements

## Comment Tester

### Méthode 1 : Navigateurs Réels
1. Ouvrir le fichier dans chaque navigateur
2. Tester toutes les fonctionnalités
3. Vérifier le responsive design
4. Noter les bugs dans ce document

### Méthode 2 : BrowserStack / LambdaTest
1. Créer un compte gratuit
2. Uploader le site
3. Tester sur plusieurs navigateurs simultanément

### Méthode 3 : Outils DevTools
1. Chrome DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Tester différentes résolutions
4. Utiliser l'émulation de réseau

## Rapport de Bugs

Si vous trouvez un bug, documentez :
- Navigateur et version
- Système d'exploitation
- Résolution d'écran
- Description du problème
- Étapes pour reproduire
- Captures d'écran si possible

## Notes

- Tester régulièrement pendant le développement
- Prioriser Chrome, Firefox, Edge et Safari
- Tester sur de vrais appareils mobiles si possible
- Vérifier après chaque mise à jour majeure

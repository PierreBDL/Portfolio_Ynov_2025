# 🔍 Explication Détaillée du Système de Filtrage

## Vue d'Ensemble

Le système de filtrage des projets permet de filtrer les projets affichés dans le carousel selon deux critères :
1. **École** : ESIEA, Ynov, ou Personnel
2. **Domaine** : Programmation ou Humain

Les filtres peuvent être combinés pour une recherche plus précise.

---

## Architecture du Système

### 1. Fichiers Impliqués

```
Assets/
├── JavaScript/
│   └── filtrage.js          # Logique de filtrage
└── Css/
    └── Commun/
        └── filtrage.css     # Styles des filtres
```

---

## Fonctionnement Détaillé

### Étape 1 : Initialisation (initProjectFilters)

Quand la page se charge, la fonction `initProjectFilters()` est appelée :

```javascript
function initProjectFilters() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    categorizeProjects(carouselItems);  // Étape 2
    createFilterUI();                   // Étape 3
    setupFilterEvents();                // Étape 4
}
```

### Étape 2 : Catégorisation Automatique (categorizeProjects)

Cette fonction analyse chaque slide du carousel et lui attribue des catégories :

```javascript
function categorizeProjects(items) {
    items.forEach((item, index) => {
        const content = item.textContent.toLowerCase();
        
        // 1. Déterminer l'école
        let school = '';
        if (content.includes('esiea')) {
            school = 'esiea';
        } else if (content.includes('ynov')) {
            school = 'ynov';
        } else if (content.includes('personnel')) {
            school = 'perso';
        }
        
        // 2. Déterminer le domaine
        let domain = '';
        if (content.includes('formation humaine') || 
            content.includes('maquettes')) {
            domain = 'humain';
        } else if (content.includes('site web') || 
                   content.includes('rpg') ||
                   content.includes('golang')) {
            domain = 'programmation';
        }
        
        // 3. Ajouter les attributs data
        item.setAttribute('data-school', school);
        item.setAttribute('data-domain', domain);
        item.setAttribute('data-index', index);
    });
}
```

**Résultat HTML :**
```html
<!-- Avant -->
<div class="carousel-item">
    <h5>Premier Semestre : Créer un site web statique</h5>
    <p>...ESIEA...</p>
</div>

<!-- Après -->
<div class="carousel-item" data-school="esiea" data-domain="programmation" data-index="2">
    <h5>Premier Semestre : Créer un site web statique</h5>
    <p>...ESIEA...</p>
</div>
```

### Étape 3 : Création de l'Interface (createFilterUI)

Cette fonction crée dynamiquement l'interface de filtrage :

```javascript
function createFilterUI() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container fade-in';
    filterContainer.innerHTML = `
        <div class="filter-section">
            <h3><i class="fas fa-filter"></i> Filtrer les projets</h3>
            <div class="filter-groups">
                <!-- Filtres par école -->
                <div class="filter-group">
                    <label><i class="fas fa-school"></i> École :</label>
                    <div class="filter-buttons">
                        <button class="filter-btn active" data-filter-type="school" data-filter-value="all">
                            Toutes
                        </button>
                        <button class="filter-btn" data-filter-type="school" data-filter-value="esiea">
                            ESIEA
                        </button>
                        <button class="filter-btn" data-filter-type="school" data-filter-value="ynov">
                            Ynov
                        </button>
                        <button class="filter-btn" data-filter-type="school" data-filter-value="perso">
                            Personnel
                        </button>
                    </div>
                </div>
                
                <!-- Filtres par domaine -->
                <div class="filter-group">
                    <label><i class="fas fa-code"></i> Domaine :</label>
                    <div class="filter-buttons">
                        <button class="filter-btn active" data-filter-type="domain" data-filter-value="all">
                            Tous
                        </button>
                        <button class="filter-btn" data-filter-type="domain" data-filter-value="programmation">
                            Programmation
                        </button>
                        <button class="filter-btn" data-filter-type="domain" data-filter-value="humain">
                            Humain
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Bouton de réinitialisation -->
            <button class="reset-filters-btn" id="resetFilters">
                <i class="fas fa-redo"></i> Réinitialiser les filtres
            </button>
        </div>
        
        <!-- Texte des résultats -->
        <div class="filter-results">
            <p id="filterResultText">Affichage de tous les projets</p>
        </div>
    `;
    
    // Insérer après le titre de la page
    const intro = document.querySelector('.intro_main');
    intro.after(filterContainer);
}
```

### Étape 4 : Gestion des Événements (setupFilterEvents)

Cette fonction écoute les clics sur les boutons de filtrage :

```javascript
function setupFilterEvents() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const resetButton = document.getElementById('resetFilters');
    
    // État initial : tous les filtres à "all"
    let activeFilters = {
        school: 'all',
        domain: 'all'
    };
    
    // Écouter les clics sur les boutons de filtrage
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter-type');
            const filterValue = this.getAttribute('data-filter-value');
            
            // Désactiver les autres boutons du même groupe
            const siblings = this.parentElement.querySelectorAll('.filter-btn');
            siblings.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Mettre à jour l'état
            activeFilters[filterType] = filterValue;
            
            // Appliquer les filtres (Étape 5)
            applyFilters(activeFilters);
        });
    });
    
    // Écouter le bouton de réinitialisation
    resetButton.addEventListener('click', function() {
        activeFilters = { school: 'all', domain: 'all' };
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter-value') === 'all') {
                btn.classList.add('active');
            }
        });
        applyFilters(activeFilters);
    });
}
```

### Étape 5 : Application des Filtres (applyFilters)

C'est le cœur du système. Cette fonction affiche/masque les slides selon les filtres :

```javascript
function applyFilters(filters) {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carousel = document.getElementById('projetsCarousel');
    const bsCarousel = bootstrap.Carousel.getInstance(carousel);
    
    let visibleCount = 0;
    let firstVisibleIndex = -1;
    
    carouselItems.forEach((item, index) => {
        const school = item.getAttribute('data-school');
        const domain = item.getAttribute('data-domain');
        
        // Vérifier si l'item correspond aux filtres
        const matchSchool = filters.school === 'all' || school === filters.school;
        const matchDomain = filters.domain === 'all' || domain === filters.domain;
        
        // Les slides de titre n'ont pas de data-school/data-domain
        const isTitleSlide = !school && !domain;
        
        // Afficher ou masquer
        if ((matchSchool && matchDomain) || isTitleSlide) {
            item.style.display = '';
            visibleCount++;
            if (firstVisibleIndex === -1) {
                firstVisibleIndex = index;
            }
        } else {
            item.style.display = 'none';
        }
    });
    
    // Mettre à jour les indicateurs du carousel
    updateCarouselIndicators(carouselItems);
    
    // Si le slide actif est masqué, aller au premier visible
    const activeItem = document.querySelector('.carousel-item.active');
    if (activeItem && activeItem.style.display === 'none') {
        bsCarousel.to(firstVisibleIndex);
    }
    
    // Mettre à jour le texte des résultats
    updateFilterResultText(filters, visibleCount);
}
```

### Étape 6 : Mise à Jour des Indicateurs (updateCarouselIndicators)

Les petits points en bas du carousel doivent aussi être filtrés :

```javascript
function updateCarouselIndicators(items) {
    const indicators = document.querySelectorAll('.carousel-indicators button');
    
    items.forEach((item, index) => {
        if (indicators[index]) {
            if (item.style.display === 'none') {
                indicators[index].style.display = 'none';
            } else {
                indicators[index].style.display = '';
            }
        }
    });
}
```

### Étape 7 : Texte des Résultats (updateFilterResultText)

Affiche un texte descriptif des filtres actifs :

```javascript
function updateFilterResultText(filters, count) {
    const resultText = document.getElementById('filterResultText');
    
    if (filters.school === 'all' && filters.domain === 'all') {
        resultText.textContent = 'Affichage de tous les projets';
    } else {
        let text = 'Affichage des projets ';
        
        if (filters.domain !== 'all') {
            text += filters.domain === 'programmation' ? 'de programmation ' : 'humains ';
        }
        
        if (filters.school !== 'all') {
            const schoolNames = {
                'esiea': 'ESIEA',
                'ynov': 'Ynov',
                'perso': 'personnels'
            };
            text += `(${schoolNames[filters.school]})`;
        }
        
        resultText.textContent = text;
    }
}
```

---

## Exemples de Filtrage

### Exemple 1 : Filtrer par ESIEA uniquement

**Action utilisateur :**
- Clic sur "ESIEA" dans la section École

**État des filtres :**
```javascript
activeFilters = {
    school: 'esiea',
    domain: 'all'
}
```

**Logique :**
```javascript
// Pour chaque slide
matchSchool = ('esiea' === 'all' || school === 'esiea')  // true si school === 'esiea'
matchDomain = ('all' === 'all' || domain === 'all')      // toujours true

// Afficher si matchSchool && matchDomain
```

**Résultat :**
- Affichage : Slides avec `data-school="esiea"` + slides de titre
- Masquage : Slides avec `data-school="ynov"` ou `data-school="perso"`
- Texte : "Affichage des projets (ESIEA)"

### Exemple 2 : Filtrer par Programmation uniquement

**Action utilisateur :**
- Clic sur "Programmation" dans la section Domaine

**État des filtres :**
```javascript
activeFilters = {
    school: 'all',
    domain: 'programmation'
}
```

**Résultat :**
- Affichage : Slides avec `data-domain="programmation"` + slides de titre
- Masquage : Slides avec `data-domain="humain"`
- Texte : "Affichage des projets de programmation"

### Exemple 3 : Combinaison - Ynov + Programmation

**Action utilisateur :**
- Clic sur "Ynov" puis "Programmation"

**État des filtres :**
```javascript
activeFilters = {
    school: 'ynov',
    domain: 'programmation'
}
```

**Logique :**
```javascript
matchSchool = school === 'ynov'              // true uniquement pour Ynov
matchDomain = domain === 'programmation'     // true uniquement pour programmation

// Afficher si matchSchool ET matchDomain
```

**Résultat :**
- Affichage : Uniquement les projets Ynov de programmation + slides de titre
- Masquage : Tout le reste
- Texte : "Affichage des projets de programmation (Ynov)"

---

## Compatibilité Mode Sombre

Le CSS utilise des variables CSS pour s'adapter au thème :

```css
.filter-btn {
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 2px solid var(--border-color);
}

.filter-btn.active {
    background: var(--accent-color);
    color: white;
}

/* Mode sombre */
[data-theme="dark"] .filter-btn {
    background: var(--bg-primary);
    color: var(--text-primary);
    border-color: var(--border-color);
}

[data-theme="dark"] .filter-btn:hover {
    background: var(--accent-color);
    color: white;
}
```

Les variables changent automatiquement selon le thème dans `theme.css` :

```css
/* Thème clair */
:root {
    --bg-primary: #ffffff;
    --accent-color: #007bff;
}

/* Thème sombre */
[data-theme="dark"] {
    --bg-primary: #1a1a1a;
    --accent-color: #4da6ff;
}
```

---

## Avantages de Cette Approche

### 1. **Automatique**
- Pas besoin de coder manuellement les catégories
- Détection basée sur le contenu

### 2. **Flexible**
- Facile d'ajouter de nouveaux filtres
- Facile d'ajouter de nouveaux projets

### 3. **Performant**
- Utilise `display: none` pour masquer (pas de DOM manipulation)
- Mise à jour uniquement quand nécessaire

### 4. **Intuitif**
- Interface claire avec boutons
- Feedback visuel immédiat
- Texte des résultats descriptif

### 5. **Accessible**
- Compatible clavier
- Boutons bien labelisés
- Indicateurs visuels clairs

---

## Amélirations Possibles

### 1. Filtrage par Année
Ajouter un filtre temporel :
```javascript
if (content.includes('2024')) {
    year = '2024';
} else if (content.includes('2025')) {
    year = '2025';
}
```

### 2. Filtrage par Technologie
Détecter les technologies utilisées :
```javascript
let technologies = [];
if (content.includes('html')) technologies.push('html');
if (content.includes('golang')) technologies.push('golang');
```

### 3. Recherche Textuelle
Ajouter une barre de recherche :
```javascript
const searchTerm = input.value.toLowerCase();
const matchSearch = content.includes(searchTerm);
```

### 4. URL Parameters
Sauvegarder les filtres dans l'URL :
```javascript
const params = new URLSearchParams();
params.set('school', filters.school);
params.set('domain', filters.domain);
window.history.pushState({}, '', `?${params}`);
```

---

## Conclusion

Ce système de filtrage est :
- ✅ Automatique et intelligent
- ✅ Flexible et extensible
- ✅ Compatible mode sombre
- ✅ Performant et réactif
- ✅ Bien intégré avec Bootstrap
- ✅ Facile à maintenir

Il permet de naviguer efficacement parmi les projets sans perdre le contexte du carousel Bootstrap.

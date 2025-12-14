// Système de filtrage des projets par catégorie
// Supporte le filtrage par domaine (programmation/humain) et par école (ESIEA/Ynov/Perso)

document.addEventListener('DOMContentLoaded', function() {
    initProjectFilters();
});

function initProjectFilters() {
    // Récupérer tous les projets (slides du carousel)
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    // Ajouter des attributs data pour identifier les projets
    categorizeProjects(carouselItems);
    
    // Créer l'interface de filtrage
    createFilterUI();
    
    // Gérer les événements de filtrage
    setupFilterEvents();
}

function categorizeProjects(items) {
    items.forEach((item, index) => {
        const title = item.querySelector('.carousel-title, .carousel-title-main');
        const content = item.textContent.toLowerCase();
        
        // Déterminer l'école
        let school = '';
        if (content.includes('esiea')) {
            school = 'esiea';
        } else if (content.includes('ynov')) {
            school = 'ynov';
        } else if (content.includes('personnel')) {
            school = 'perso';
        }
        
        // Déterminer le domaine
        let domain = '';
        if (content.includes('formation humaine') || 
            content.includes('maquettes') || 
            content.includes('communication print') ||
            content.includes('evad')) {
            domain = 'humain';
        } else if (content.includes('site web') || 
                   content.includes('rpg') || 
                   content.includes('power 4') ||
                   content.includes('groupi') ||
                   content.includes('jeu 2d') ||
                   content.includes('infrastructure') ||
                   content.includes('html') ||
                   content.includes('golang')) {
            domain = 'programmation';
        }
        
        // Ajouter les attributs data
        item.setAttribute('data-school', school);
        item.setAttribute('data-domain', domain);
        item.setAttribute('data-index', index);
    });
}

function createFilterUI() {
    const main = document.querySelector('main');
    const intro = document.querySelector('.intro_main');
    
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container fade-in';
    filterContainer.innerHTML = `
        <div class="filter-section">
            <h3><i class="fas fa-filter"></i> Filtrer les projets</h3>
            <div class="filter-groups">
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
            
            <button class="reset-filters-btn" id="resetFilters">
                <i class="fas fa-redo"></i> Réinitialiser les filtres
            </button>
        </div>
        
        <div class="filter-results">
            <p id="filterResultText">Affichage de tous les projets</p>
        </div>
    `;
    
    // Insérer après l'intro
    intro.after(filterContainer);
}

function setupFilterEvents() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const resetButton = document.getElementById('resetFilters');
    
    let activeFilters = {
        school: 'all',
        domain: 'all'
    };
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.getAttribute('data-filter-type');
            const filterValue = this.getAttribute('data-filter-value');
            
            // Mettre à jour l'état actif des boutons
            const siblings = this.parentElement.querySelectorAll('.filter-btn');
            siblings.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Mettre à jour les filtres actifs
            activeFilters[filterType] = filterValue;
            
            // Appliquer les filtres
            applyFilters(activeFilters);
        });
    });
    
    resetButton.addEventListener('click', function() {
        activeFilters = {
            school: 'all',
            domain: 'all'
        };
        
        // Réactiver tous les boutons "Tous/Toutes"
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter-value') === 'all') {
                btn.classList.add('active');
            }
        });
        
        applyFilters(activeFilters);
    });
}

function applyFilters(filters) {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carousel = document.getElementById('projetsCarousel');
    const bsCarousel = bootstrap.Carousel.getInstance(carousel) || new bootstrap.Carousel(carousel);
    
    let visibleCount = 0;
    let firstVisibleIndex = -1;
    
    carouselItems.forEach((item, index) => {
        const school = item.getAttribute('data-school');
        const domain = item.getAttribute('data-domain');
        
        // Vérifier si l'item correspond aux filtres
        const matchSchool = filters.school === 'all' || school === filters.school;
        const matchDomain = filters.domain === 'all' || domain === filters.domain;
        
        // Les slides de titre (sans data-school et data-domain) sont toujours affichés
        const isTitleSlide = !school && !domain;
        
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
    
    // Mettre à jour les indicateurs
    updateCarouselIndicators(carouselItems);
    
    // Si on est sur un slide caché, aller au premier visible
    const activeItem = document.querySelector('.carousel-item.active');
    if (activeItem && activeItem.style.display === 'none') {
        bsCarousel.to(firstVisibleIndex);
    }
    
    // Mettre à jour le texte des résultats
    updateFilterResultText(filters, visibleCount);
}

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

// Compteur de visites utilisant localStorage
// Le compteur est incrémenté à chaque visite et affiché dans le footer

document.addEventListener('DOMContentLoaded', function() {
    initVisitCounter();
});

function initVisitCounter() {
    // Récupérer le nombre de visites depuis localStorage
    let visitCount = localStorage.getItem('visitCount');
    
    // Si c'est la première visite, initialiser à 0
    if (visitCount === null) {
        visitCount = 0;
    } else {
        visitCount = parseInt(visitCount);
    }
    
    // Incrémenter le compteur
    visitCount++;
    
    // Sauvegarder dans localStorage
    localStorage.setItem('visitCount', visitCount);
    
    // Sauvegarder la date de la dernière visite
    const now = new Date();
    localStorage.setItem('lastVisit', now.toISOString());
    
    // Afficher le compteur dans le footer
    displayVisitCounter(visitCount);
}

function displayVisitCounter(count) {
    const footer = document.querySelector('footer .container');
    
    if (!footer) {
        console.error('Footer container not found');
        return;
    }
    
    // Créer l'élément du compteur
    const counterDiv = document.createElement('div');
    counterDiv.className = 'visit-counter';
    counterDiv.id = 'visitCounter';
    
    // Formater le nombre avec des espaces pour les milliers
    const formattedCount = count.toLocaleString('fr-FR');
    
    // Déterminer le texte (singulier/pluriel)
    const visitText = count === 1 ? 'visite' : 'visites';
    
    counterDiv.innerHTML = `
        <div class="counter-content">
            <i class="fas fa-eye"></i>
            <div class="counter-info">
                <span class="counter-number">${formattedCount}</span>
                <span class="counter-label">${visitText}</span>
            </div>
        </div>
        <button class="reset-counter-btn" onclick="resetVisitCounter()" title="Réinitialiser le compteur">
            <i class="fas fa-redo-alt"></i>
        </button>
    `;
    
    // Insérer le compteur en bas à gauche du footer
    footer.insertBefore(counterDiv, footer.firstChild);
    
    // Ajouter une animation au compteur
    setTimeout(() => {
        counterDiv.classList.add('counter-visible');
    }, 100);
}

function resetVisitCounter() {
    // Demander confirmation
    if (confirm('Voulez-vous vraiment réinitialiser le compteur de visites ?')) {
        localStorage.setItem('visitCount', '0');
        
        // Mettre à jour l'affichage
        const counterNumber = document.querySelector('.counter-number');
        const counterLabel = document.querySelector('.counter-label');
        
        if (counterNumber && counterLabel) {
            counterNumber.textContent = '0';
            counterLabel.textContent = 'visite';
            
            // Animation de réinitialisation
            const counterDiv = document.getElementById('visitCounter');
            counterDiv.classList.add('counter-reset-animation');
            
            setTimeout(() => {
                counterDiv.classList.remove('counter-reset-animation');
            }, 600);
        }
    }
}

// Fonction pour obtenir des statistiques de visite
function getVisitStats() {
    const count = localStorage.getItem('visitCount') || 0;
    const lastVisit = localStorage.getItem('lastVisit');
    
    return {
        totalVisits: parseInt(count),
        lastVisit: lastVisit ? new Date(lastVisit) : null
    };
}

// Exporter les fonctions pour les rendre accessibles globalement
window.resetVisitCounter = resetVisitCounter;
window.getVisitStats = getVisitStats;

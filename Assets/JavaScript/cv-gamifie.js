// JavaScript pour le CV Gamifié
// Gère les animations et interactions du CV gamifié

document.addEventListener('DOMContentLoaded', function() {
    initGameCV();
    animateStats();
    setupSkillNodeInteractions();
});

function initGameCV() {
    // Calculer les statistiques basées sur localStorage
    updateStatsFromLocalStorage();
    
    // Animer la barre de progression au chargement
    setTimeout(() => {
        const progressBar = document.querySelector('.progress-bar-fill');
        if (progressBar) {
            progressBar.style.width = '17%';
        }
    }, 500);
}

function updateStatsFromLocalStorage() {
    // Récupérer les visites pour ajuster les XP
    const visitCount = parseInt(localStorage.getItem('visitCount')) || 0;
    
    // Calculer les XP basés sur les visites (chaque visite = 10 XP bonus)
    const baseXP = 1250;
    const bonusXP = visitCount * 10;
    const totalXP = baseXP + bonusXP;
    
    // Mettre à jour l'affichage
    const xpElement = document.getElementById('totalXP');
    if (xpElement) {
        xpElement.textContent = totalXP.toLocaleString('fr-FR');
    }
    
    // Sauvegarder dans localStorage
    localStorage.setItem('gameCV_XP', totalXP);
}

function animateStats() {
    // Animation de comptage pour les statistiques
    const statElements = document.querySelectorAll('.stat-value');
    
    statElements.forEach(element => {
        const targetValue = parseInt(element.textContent.replace(/\s/g, ''));
        let currentValue = 0;
        const increment = Math.ceil(targetValue / 50);
        const duration = 1500; // 1.5 secondes
        const stepTime = duration / (targetValue / increment);
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(counter);
            }
            element.textContent = currentValue.toLocaleString('fr-FR');
        }, stepTime);
    });
}

function setupSkillNodeInteractions() {
    const skillNodes = document.querySelectorAll('.skill-node');
    
    skillNodes.forEach(node => {
        node.addEventListener('click', function() {
            const skillName = this.getAttribute('data-skill');
            showSkillDetails(skillName, this);
        });
    });
}

function showSkillDetails(skillName, nodeElement) {
    // Informations détaillées sur chaque compétence
    const skillDetails = {
        'HTML': {
            description: 'Maîtrise du langage de balisage HTML5 pour la structure des pages web.',
            projects: ['Site Jean Pouzet', 'Portfolio', 'Puissance 4', 'Groupi-Tracker'],
            xp: 250
        },
        'CSS': {
            description: 'Expertise en CSS3, animations, responsive design et frameworks CSS.',
            projects: ['Site Jean Pouzet', 'Portfolio', 'Puissance 4'],
            xp: 250
        },
        'JavaScript': {
            description: 'Programmation JavaScript pour l\'interactivité et les fonctionnalités dynamiques.',
            projects: ['Portfolio', 'Groupi-Tracker', 'Formulaires de contact'],
            xp: 200
        },
        'Bootstrap': {
            description: 'Utilisation du framework Bootstrap pour des interfaces responsives.',
            projects: ['Portfolio', 'Site Jean Pouzet S2'],
            xp: 150
        },
        'PHP': {
            description: 'Développement backend avec PHP pour sites dynamiques et gestion de données.',
            projects: ['Site Jean Pouzet S2'],
            xp: 150
        },
        'MySQL': {
            description: 'Conception et gestion de bases de données relationnelles.',
            projects: ['Site Jean Pouzet S2'],
            xp: 150
        },
        'Golang': {
            description: 'Programmation en Go pour applications performantes et serveurs web.',
            projects: ['RPG CLI', 'Puissance 4', 'Groupi-Tracker'],
            xp: 200
        },
        'Python': {
            description: 'Développement Python pour scripts, automatisation et apprentissage.',
            projects: ['Projets personnels', 'Exercices lycée'],
            xp: 120
        },
        'C++': {
            description: 'Programmation C++ sur Arduino pour systèmes embarqués.',
            projects: ['Projets Arduino lycée'],
            xp: 80
        },
        'C#': {
            description: 'Développement de jeux 2D avec Unity et C#.',
            projects: ['Chroniques du Sceau d\'Émeraude'],
            xp: 100
        },
        'Git': {
            description: 'Gestion de versions avec Git et GitHub pour le travail collaboratif.',
            projects: ['Tous les projets Ynov'],
            xp: 180
        }
    };
    
    const skill = skillDetails[skillName];
    if (!skill) return;
    
    // Créer une tooltip ou modal
    const existingTooltip = document.querySelector('.skill-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-header">
            <h4>${skillName}</h4>
            <span class="tooltip-xp">+${skill.xp} XP</span>
        </div>
        <p>${skill.description}</p>
        <div class="tooltip-projects">
            <strong>Projets utilisés :</strong>
            <ul>
                ${skill.projects.map(p => `<li>${p}</li>`).join('')}
            </ul>
        </div>
        <button class="tooltip-close">✕</button>
    `;
    
    // Positionner la tooltip
    document.body.appendChild(tooltip);
    
    const rect = nodeElement.getBoundingClientRect();
    tooltip.style.position = 'fixed';
    tooltip.style.top = `${rect.top + window.scrollY}px`;
    tooltip.style.left = `${rect.right + 20}px`;
    
    // Ajuster si hors écran
    const tooltipRect = tooltip.getBoundingClientRect();
    if (tooltipRect.right > window.innerWidth) {
        tooltip.style.left = `${rect.left - tooltipRect.width - 20}px`;
    }
    if (tooltipRect.bottom > window.innerHeight) {
        tooltip.style.top = `${window.innerHeight - tooltipRect.height - 20}px`;
    }
    
    // Animation d'apparition
    setTimeout(() => tooltip.classList.add('visible'), 10);
    
    // Fermer la tooltip
    tooltip.querySelector('.tooltip-close').addEventListener('click', () => {
        tooltip.classList.remove('visible');
        setTimeout(() => tooltip.remove(), 300);
    });
    
    // Fermer en cliquant à l'extérieur
    setTimeout(() => {
        document.addEventListener('click', function closeTooltip(e) {
            if (!tooltip.contains(e.target) && !nodeElement.contains(e.target)) {
                tooltip.classList.remove('visible');
                setTimeout(() => tooltip.remove(), 300);
                document.removeEventListener('click', closeTooltip);
            }
        });
    }, 100);
}

// Ajouter le style de la tooltip dynamiquement
const style = document.createElement('style');
style.textContent = `
.skill-tooltip {
    background: var(--bg-card);
    border: 3px solid var(--accent-color);
    border-radius: 12px;
    padding: 20px;
    max-width: 350px;
    box-shadow: 0 10px 30px var(--shadow-medium);
    z-index: 10000;
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.3s ease;
}

.skill-tooltip.visible {
    opacity: 1;
    transform: scale(1);
}

.tooltip-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--accent-color);
}

.tooltip-header h4 {
    margin: 0;
    color: var(--accent-color);
    font-size: 1.3rem;
}

.tooltip-xp {
    background: linear-gradient(135deg, #FFD700, #FFA500);
    color: white;
    padding: 4px 12px;
    border-radius: 8px;
    font-weight: bold;
    font-size: 0.9rem;
}

.skill-tooltip p {
    color: var(--text-primary);
    margin-bottom: 15px;
    line-height: 1.6;
}

.tooltip-projects {
    color: var(--text-primary);
}

.tooltip-projects strong {
    color: var(--accent-color);
    display: block;
    margin-bottom: 8px;
}

.tooltip-projects ul {
    margin: 0;
    padding-left: 20px;
    color: var(--text-secondary);
}

.tooltip-projects li {
    margin-bottom: 5px;
}

.tooltip-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    color: var(--text-secondary);
    font-size: 1.5rem;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.tooltip-close:hover {
    background: var(--bg-secondary);
    color: var(--accent-color);
    transform: rotate(90deg);
}

@media (max-width: 768px) {
    .skill-tooltip {
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) scale(0.9);
        max-width: 90%;
    }
    
    .skill-tooltip.visible {
        transform: translate(-50%, -50%) scale(1);
    }
}
`;
document.head.appendChild(style);

// Fonction pour débloquer un nouveau succès (peut être appelée depuis la console)
function unlockAchievement(achievementName) {
    const achievements = document.querySelectorAll('.achievement.locked');
    achievements.forEach(ach => {
        const title = ach.querySelector('h4').textContent;
        if (title.toLowerCase().includes(achievementName.toLowerCase())) {
            ach.classList.remove('locked');
            ach.classList.add('unlocked');
            
            // Animation de déblocage
            ach.style.animation = 'achievementUnlock 0.6s ease';
            
            // Notifier l'utilisateur
            showAchievementNotification(title);
        }
    });
}

function showAchievementNotification(achievementName) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <i class="fas fa-trophy"></i>
        <div>
            <strong>Succès débloqué !</strong>
            <p>${achievementName}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('visible'), 100);
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Ajouter le style pour les notifications
const notifStyle = document.createElement('style');
notifStyle.textContent = `
@keyframes achievementUnlock {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.achievement-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #FFD700, #FFA500);
    color: white;
    padding: 15px 20px;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(255, 215, 0, 0.5);
    display: flex;
    align-items: center;
    gap: 15px;
    z-index: 10000;
    opacity: 0;
    transform: translateX(400px);
    transition: all 0.3s ease;
}

.achievement-notification.visible {
    opacity: 1;
    transform: translateX(0);
}

.achievement-notification i {
    font-size: 2rem;
}

.achievement-notification strong {
    display: block;
    margin-bottom: 5px;
}

.achievement-notification p {
    margin: 0;
    font-size: 0.9rem;
}
`;
document.head.appendChild(notifStyle);

// Exporter les fonctions utiles
window.unlockAchievement = unlockAchievement;

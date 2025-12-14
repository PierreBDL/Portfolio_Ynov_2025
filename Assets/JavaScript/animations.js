// Animations de fondu pour les éléments au scroll (style Canva)

// Configuration de l'Intersection Observer pour détecter les éléments visibles
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // L'élément doit être visible à 10% pour déclencher l'animation
};

// Fonction callback appelée quand un élément entre dans le viewport
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Ajoute la classe 'fade-in-visible' pour déclencher l'animation
            entry.target.classList.add('fade-in-visible');
            // Optionnel: arrêter d'observer l'élément après l'animation
            observer.unobserve(entry.target);
        }
    });
};

// Créer l'observer
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Fonction d'initialisation des animations
function initAnimations() {
    // Sélectionner tous les éléments à animer
    const elementsToAnimate = document.querySelectorAll(
        '.fade-in, .card, .carousel-item, .skills_intro, #Ynov, #ESIEA, #JB2B, .skill-category, .contact-section'
    );

    // Observer chaque élément
    elementsToAnimate.forEach(element => {
        // Ajouter la classe initiale pour l'état non-visible
        element.classList.add('fade-in-element');
        observer.observe(element);
    });
}

// Initialiser les animations au chargement de la page
document.addEventListener('DOMContentLoaded', initAnimations);

// Réinitialiser les animations si la page devient visible après avoir été cachée
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        initAnimations();
    }
});

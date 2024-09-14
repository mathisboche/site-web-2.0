// transitions.js

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                entry.target.classList.remove('section-hidden');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        section.classList.add('section-hidden');
        observer.observe(section);
    });
});

// Throttle function to limit the rate of execution
function throttle(fn, wait) {
    let time = Date.now();
    return function() {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}

// Ajout de l'effet de fondu et de parallaxe sur le canvas de fond avec throttle
window.addEventListener('scroll', throttle(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const backgroundCanvas = document.getElementById('background-canvas');
    const transitionSection = document.getElementById('transition-noir'); // Si tu as ajouté une section de transition

    // Calculer l'opacité en fonction de la position de défilement
    let opacity = 1 - (scrollY / windowHeight);
    opacity = Math.max(opacity, 0);

    backgroundCanvas.style.opacity = opacity;

    // Effet de parallaxe: décaler légèrement le canvas vers le haut
    const parallaxSpeed = 0.5;
    const translateY = scrollY * parallaxSpeed;

    backgroundCanvas.style.transform = `translateY(${translateY}px)`;

    // Optionnel : Afficher la section de transition noir
    if (scrollY > windowHeight * 0.8) { // Ajuste ce seuil selon tes préférences
        if (transitionSection) {
            transitionSection.classList.add('transition-visible');
        }
    } else {
        if (transitionSection) {
            transitionSection.classList.remove('transition-visible');
        }
    }
}, 16)); // Environ 60fps

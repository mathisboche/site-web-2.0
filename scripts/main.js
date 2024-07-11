// Initialisation de GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Animation du header
gsap.from("header", {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "power3.out"
});

// Animation des sections au défilement
gsap.utils.toArray("section").forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
});

// Création de la timeline
const timelineData = [
    { year: 2007, title: "Naissance", description: "Je suis né le 17 août 2007 à Fécamp." },
    { year: 2011, title: "Commencement du Tennis", description: "Début du tennis à l'âge de 4 ans, début d'une passion pour le sport." },
    { year: 2018, title: "Pic Tennis et Découverte des Échecs", description: "Classement 15/4 en tennis et entraînement avec la ligue de Normandie. Découverte des échecs et premier tournoi." },
    { year: 2019, title: "Déménagement à Paris", description: "Arrivée sur Paris, continuation du tennis et adhésion à un club d'échecs en Île-de-France." },
    { year: 2020, title: "Confinement Covid et Retour en Normandie", description: "Pratique des échecs à distance durant le confinement. Un jeune renardeau sauvage devenait un visiteur fréquent dans notre jardin en Normandie." },
    { year: 2021, title: "Championnat de France Jeunes U14 (Échecs)", description: "Participation aux championnats de France jeunes U14 en échecs." },
    { year: 2022, title: "Championnat de France Jeunes U16 (Échecs)", description: "Participation au championnat de France jeunes U16 en échecs. Découverte de l'intelligence artificielle." },
    { year: 2023, title: "Sortie de GPT-4", description: "Poursuite de l'intérêt pour l'intelligence artificielle avec la sortie de GPT-4." },
    { year: 2024, title: "Présent", description: "16 ans, passionné par l'IA, les échecs et le tennis." }
];

const timelineContainer = document.querySelector('.timeline-container');

timelineData.forEach((item, index) => {
    const timelineItem = document.createElement('div');
    timelineItem.classList.add('timeline-item');
    timelineItem.classList.add(index % 2 === 0 ? 'left' : 'right');

    const content = document.createElement('div');
    content.classList.add('content');
    content.innerHTML = `
        <h3>${item.year}</h3>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
    `;

    timelineItem.appendChild(content);
    timelineContainer.appendChild(timelineItem);
});

// Code existant...

// Fonctionnalité du menu mobile
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fermer le menu lorsqu'un lien est cliqué
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Ajuster les animations GSAP pour le mobile
function setupAnimations() {
    const isMobile = window.innerWidth < 768;

    gsap.from("header", {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: "power3.out"
    });

    gsap.utils.toArray("section").forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: isMobile ? 30 : 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

setupAnimations();

// Réajuster les animations lors du redimensionnement de la fenêtre
window.addEventListener('resize', setupAnimations);
document.addEventListener('DOMContentLoaded', function() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    
    scrollArrow.addEventListener('click', function() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Glow effect and icon visibility
    const glowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timelineItems.forEach(item => {
                    item.classList.remove('glow');
                    item.querySelector('.timeline-icon').style.opacity = '0';
                });
                entry.target.classList.add('glow');
                entry.target.querySelector('.timeline-icon').style.opacity = '1';
            }
        });
    }, {
        threshold: 0.7,
        rootMargin: '-30% 0px -30% 0px'
    });

    timelineItems.forEach(item => {
        glowObserver.observe(item);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const clouds = document.querySelectorAll('.cloud');
    clouds.forEach(cloud => {
        const randomDuration = 70 + Math.random() * 30; // Entre 70 et 100 secondes
        const randomDelay = Math.random() * -50; // Départ décalé
        const randomTop = Math.random() * 70; // Position verticale aléatoire

        cloud.style.setProperty('--duration', `${randomDuration}s`);
        cloud.style.animationDelay = `${randomDelay}s`;
        cloud.style.top = `${randomTop}%`;
    });
});
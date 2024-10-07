document.addEventListener('DOMContentLoaded', () => {
    const backgroundImageDiv = document.querySelector('.background-image');
    const loadingPlaceholder = document.querySelector('.loading-placeholder');

    // Charger l'image de basse qualité
    const imgLowRes = new Image();
    imgLowRes.src = 'images/low-res-landscape.png'; // Remplacez par le chemin de votre image basse résolution

    imgLowRes.onload = function() {
        // Une fois l'image de basse qualité chargée
        backgroundImageDiv.style.backgroundImage = `url('${imgLowRes.src}')`;
        backgroundImageDiv.classList.add('loaded'); // Rendre le conteneur visible
        // Masquer le placeholder de chargement
        loadingPlaceholder.style.display = 'none';

        // Initialiser les particules après le chargement de l'image de basse qualité
        initParticles();
        // Ajouter les ombres aux textes après les animations
        addTextShadows();

        // Commencer à charger l'image de haute qualité
        loadHighResImage();
    };

    // Gérer le cas où l'image de basse qualité est en cache
    if (imgLowRes.complete) {
        imgLowRes.onload();
    }

    function loadHighResImage() {
        // Charger l'image de haute qualité
        const imgHighRes = new Image();
        imgHighRes.src = 'images/lanscape.png'; // Remplacez par le chemin de votre image haute résolution

        imgHighRes.onload = function() {
            // Une fois l'image de haute qualité chargée, remplacer l'image de fond
            backgroundImageDiv.style.backgroundImage = `url('${imgHighRes.src}')`;
            // Optionnel : ajouter une transition pour un effet plus fluide
            backgroundImageDiv.style.transition = 'background-image 0.5s ease-in-out';
        };

        // Gérer le cas où l'image de haute qualité est en cache
        if (imgHighRes.complete) {
            imgHighRes.onload();
        }
    }

    // Fonction pour initialiser les particules
    function initParticles() {
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = [];

        // Créer des particules
        function createParticles() {
            particlesArray = [];
            const numberOfParticles = Math.floor(canvas.width / 30);
            for (let i = 0; i < numberOfParticles; i++) {
                const size = Math.random() * 2 + 1;
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const speedX = (Math.random() * 0.5) - 0.25;
                const speedY = (Math.random() * 0.5) - 0.25;
                particlesArray.push({ x, y, size, speedX, speedY });
            }
        }

        // Animer les particules
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Réinitialiser la position si la particule sort de l'écran
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.y > canvas.height) particle.y = 0;
                if (particle.y < 0) particle.y = canvas.height;

                // Dessiner la particule
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(animateParticles);
        }

        createParticles();
        animateParticles();

        // Adapter le canvas lors du redimensionnement de la fenêtre
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            createParticles();
        });
    }

    function addTextShadows() {
        // Durée totale des animations avant l'ajout des ombres (en millisecondes)
        const totalAnimationDuration = 3000; // 3 secondes
    
        setTimeout(() => {
            const mainTitle = document.querySelector('.main-title');
            const subtitle = document.querySelector('.subtitle');
    
            // Appliquer le filtre pour faire apparaître l'ombre en fondu
            mainTitle.style.filter = 'drop-shadow(2px 2px 100px rgba(0, 0, 0, 0.5))';
            subtitle.style.filter = 'drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.4))';
        }, totalAnimationDuration);
    }

    const heroSection = document.querySelector('.hero-section');

    // Variables pour contrôler la création des particules
    let isDrawing = false;
    let lastTouchTime = 0;

    function createTrailParticle(x, y) {
        const particle = document.createElement('span');
        particle.classList.add('trail-particle');
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        heroSection.appendChild(particle);

        // Supprimer la particule après l'animation
        particle.addEventListener('animationend', () => {
            particle.parentElement.removeChild(particle);
        });
    }

    // Fonction pour gérer les mouvements de la souris
    function handleMouseMove(event) {
        if (isDrawing) {
            const rect = heroSection.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            createTrailParticle(x, y);
        }
    }

    // Fonction pour gérer les mouvements tactiles
    function handleTouchMove(event) {
        event.preventDefault(); // Empêche le comportement par défaut du défilement
        const touch = event.touches[0];
        const rect = heroSection.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        // Limiter la fréquence de création des particules
        const currentTime = new Date().getTime();
        if (currentTime - lastTouchTime > 10) { // Crée une particule tous les 10ms
            createTrailParticle(x, y);
            lastTouchTime = currentTime;
        }
    }

    // Événements pour la souris
    heroSection.addEventListener('mousedown', () => {
        isDrawing = true;
    });

    heroSection.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    heroSection.addEventListener('mouseleave', () => {
        isDrawing = false;
    });

    heroSection.addEventListener('mousemove', handleMouseMove);

    // Événements pour le tactile
    heroSection.addEventListener('touchstart', () => {
        isDrawing = true;
    });

    heroSection.addEventListener('touchend', () => {
        isDrawing = false;
    });

    heroSection.addEventListener('touchcancel', () => {
        isDrawing = false;
    });

    heroSection.addEventListener('touchmove', handleTouchMove);
});

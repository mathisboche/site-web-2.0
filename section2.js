window.addEventListener('load', () => {
    const canvas = document.getElementById('programmation-canvas');
    const ctx = canvas.getContext('2d');

    let particlesArray = [];
    const mouse = {
        x: null,
        y: null,
        radius:  (canvas.height / 80) * (canvas.width / 80)
    };

    let speedMultiplier = 1; // Ajout d'un multiplicateur de vitesse global

    // Création des particules
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        // Dessiner chaque particule
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
        }

        // Mettre à jour la position des particules
        update() {
            // Vérifier les bords du canvas
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            // Détecter la souris
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                    this.x += 10;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= 10;
                }
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                    this.y += 10;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= 10;
                }
            }

            // Déplacer la particule avec le multiplicateur de vitesse
            this.x += this.directionX * speedMultiplier;
            this.y += this.directionY * speedMultiplier;

            // Dessiner la particule
            this.draw();
        }
    }

    // Ajuster le canvas lors du redimensionnement
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        mouse.radius = (canvas.height / 80) * (canvas.width / 80);
        init();
    }

    // Définir l'objet 'mouse' avant d'appeler 'resizeCanvas'
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    // Enregistrer la position de la souris
    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    // Pour les appareils tactiles
    window.addEventListener('touchmove', (event) => {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
    });

    window.addEventListener('touchend', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Créer le tableau de particules
    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 5) + 1;
            let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 2) - 1;
            let directionY = (Math.random() * 2) - 1;
            let color = '#FFFFFF';

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Connecter les particules
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2);
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = 'rgba(255,255,255,' + opacityValue + ')';
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    // Démarrer l'animation
    init();
    animate();

    // Contrôle de l'animation
    const speedControl = document.getElementById('speed');
    speedControl.addEventListener('input', (e) => {
        speedMultiplier = parseFloat(e.target.value);
    });
});

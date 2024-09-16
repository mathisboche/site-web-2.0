// section1.js

document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.getElementById('name');
    const texts = [
        "Mathis Boche",
        "Développeur Passionné",
        "Amateur d'Échecs",
        "Ancien Joueur de Tennis",
        "Coming Soon"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let wait = 2000; // Temps d'attente avant l'effacement

    function typeWriter() {
        const currentText = texts[textIndex];
        const speed = isDeleting ? 50 : 100; // Vitesse d'effacement et de frappe

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        nameElement.textContent = currentText.substring(0, charIndex);

        if (!isDeleting && charIndex === currentText.length) {
            // Pause après avoir terminé de taper le mot
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, wait);
        } else if (isDeleting && charIndex === 0) {
            // Passe au mot suivant après avoir effacé
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeWriter();
        } else {
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
});

window.addEventListener('load', () => {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');

    let fontSize;
    let columns;
    let yPos;
    let animationFrameId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Ajuster la taille de la police en fonction de la largeur de l'écran
        if (window.innerWidth < 480) {
            fontSize = 10;
        } else if (window.innerWidth < 768) {
            fontSize = 14;
        } else {
            fontSize = 16;
        }

        columns = Math.floor(canvas.width / fontSize);
        yPos = Array(columns).fill(0);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function matrixEffect() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        yPos.forEach((y, index) => {
            const text = String.fromCharCode(0x30A0 + Math.random() * 96);
            const x = index * fontSize;
            ctx.fillText(text, x, y);
            if (y > canvas.height + Math.random() * 10000) {
                yPos[index] = 0;
            } else {
                yPos[index] = y + fontSize;
            }
        });

        animationFrameId = requestAnimationFrame(matrixEffect);
    }

    // Utilisation de l'IntersectionObserver pour arrêter l'animation lorsque la section n'est pas visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // La section est visible, démarrer l'animation
                animationFrameId = requestAnimationFrame(matrixEffect);
            } else {
                // La section n'est pas visible, arrêter l'animation
                cancelAnimationFrame(animationFrameId);
            }
        });
    }, { threshold: 0 });

    observer.observe(document.querySelector('#accueil'));
});
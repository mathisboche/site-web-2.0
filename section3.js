// section3.js

// Section Échecs
window.addEventListener('load', () => {
    const chessboardDiv = document.getElementById('chessboard');

    // Utilisation de Chessboard.js pour un échiquier interactif
    // Assurez-vous d'inclure la bibliothèque Chessboard.js dans votre projet
    // Pour cet exemple, nous utiliserons une image statique

    const chessboardImg = document.createElement('img');
    chessboardImg.src = 'assets/chessboard.png'; // Placez une image d'échiquier dans le dossier assets
    chessboardImg.style.width = '100%';
    chessboardDiv.appendChild(chessboardImg);
});

// Animation Tennis
window.addEventListener('load', () => {
    const tennisCanvas = document.getElementById('tennis-canvas');
    const tennisCtx = tennisCanvas.getContext('2d');

    tennisCanvas.width = tennisCanvas.clientWidth;
    tennisCanvas.height = tennisCanvas.clientHeight;

    let ball = {
        x: tennisCanvas.width / 2,
        y: tennisCanvas.height / 2,
        vx: 5,
        vy: 3,
        radius: 20
    };

    function drawBall() {
        tennisCtx.clearRect(0, 0, tennisCanvas.width, tennisCanvas.height);
        tennisCtx.fillStyle = '#FFD700';
        tennisCtx.beginPath();
        tennisCtx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        tennisCtx.fill();

        // Traînées lumineuses
        tennisCtx.strokeStyle = '#FFD700';
        tennisCtx.lineWidth = 2;
        tennisCtx.beginPath();
        tennisCtx.moveTo(ball.x, ball.y);
        tennisCtx.lineTo(ball.x - ball.vx * 10, ball.y - ball.vy * 10);
        tennisCtx.stroke();

        moveBall();
        requestAnimationFrame(drawBall);
    }

    function moveBall() {
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x + ball.radius > tennisCanvas.width || ball.x - ball.radius < 0) {
            ball.vx *= -1;
        }
        if (ball.y + ball.radius > tennisCanvas.height || ball.y - ball.radius < 0) {
            ball.vy *= -1;
        }
    }

    // Interaction au clic
    tennisCanvas.addEventListener('click', () => {
        ball.vx *= 1.2;
        ball.vy *= 1.2;
    });

    drawBall();
});

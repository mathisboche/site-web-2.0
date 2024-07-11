// Simulons un échiquier simple pour l'exemple
const chessboard = document.getElementById('chessboard');
const openingColorSelect = document.getElementById('opening-color');

function createChessboard() {
    for (let i = 0; i < 64; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        if ((i + Math.floor(i / 8)) % 2 === 0) {
            square.classList.add('white');
        } else {
            square.classList.add('black');
        }
        chessboard.appendChild(square);
    }
}

function showOpening(color) {
    // Ici, vous pouvez ajouter la logique pour afficher différentes ouvertures
    console.log(`Showing opening for ${color}`);
}

createChessboard();

openingColorSelect.addEventListener('change', (e) => {
    showOpening(e.target.value);
});

// Animation de l'échiquier
gsap.from("#chessboard .square", {
    scale: 0,
    duration: 0.5,
    stagger: 0.01,
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: "#chess",
        start: "top center"
    }
});
const tennisVideo = document.getElementById('tennis-video');

// Animation de la vidéo de tennis
gsap.from(tennisVideo, {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    scrollTrigger: {
        trigger: "#tennis",
        start: "top center"
    }
});

// Vous pouvez ajouter ici d'autres fonctionnalités liées à la section tennis
// Sélection des éléments du DOM
const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');
const bars = document.querySelectorAll('.barre');
const navigation = document.querySelector('.navigation');
const navLinks = document.querySelectorAll('.navigation li');

// Gestion du clic sur le menu hamburger
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navigation.classList.toggle('active');
  document.body.classList.toggle('menu-opened');
  menuOverlay.classList.toggle('active');

  if (menuToggle.classList.contains('active')) {
    // Ouverture du menu hamburger avec animation fluide
    bars[0].style.transition =
      'top 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s';
    bars[2].style.transition =
      'top 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s';
    bars[1].style.transition = 'opacity 0.3s ease-in-out';

    // Réinitialisation des transitions après l'animation
    setTimeout(() => {
      bars[0].style.transition = '';
      bars[2].style.transition = '';
      bars[1].style.transition = '';
    }, 600);

    // Suppression de la classe 'closing' des liens si elle est présente
    navLinks.forEach((link) => {
      link.classList.remove('closing');
    });
  } else {
    // Fermeture du menu hamburger avec animation fluide
    bars[0].style.transition =
      'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), top 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s';
    bars[2].style.transition =
      'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), top 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s';
    bars[1].style.transition = 'opacity 0.3s ease-in-out 0.2s';

    // Réinitialisation des transitions après l'animation
    setTimeout(() => {
      bars[0].style.transition = '';
      bars[2].style.transition = '';
      bars[1].style.transition = '';
    }, 600);

    // Ajout de la classe 'closing' aux liens pour l'animation de fermeture
    navLinks.forEach((link) => {
      link.classList.add('closing');
    });

    // Attendre la fin de l'animation avant de retirer la classe 'closing'
    setTimeout(() => {
      navLinks.forEach((link) => {
        link.classList.remove('closing');
      });
    }, 800);
  }
});

// Animation "Pop" au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  // Ajouter la classe d'animation après un court délai (100ms)
  setTimeout(() => {
    menuToggle.classList.add('pop-animation');
  }, 100);

  // Retirer la classe après l'animation pour éviter de la rejouer
  menuToggle.addEventListener('animationend', () => {
    menuToggle.classList.remove('pop-animation');
  });
});

// Effet d'enfoncement pour les interactions tactiles et souris
// Touch Events
menuToggle.addEventListener('touchstart', () => {
  menuToggle.classList.add('pressed');
});

menuToggle.addEventListener('touchend', () => {
  menuToggle.classList.remove('pressed');
});

menuToggle.addEventListener('touchmove', () => {
  menuToggle.classList.remove('pressed');
});

// Mouse Events
menuToggle.addEventListener('mousedown', () => {
  menuToggle.classList.add('pressed');
});

menuToggle.addEventListener('mouseup', () => {
  menuToggle.classList.remove('pressed');
});

menuToggle.addEventListener('mouseleave', () => {
  menuToggle.classList.remove('pressed');
});

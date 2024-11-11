const menuToggle = document.getElementById('menuToggle');
const bars = document.querySelectorAll('.barre');
const navigation = document.querySelector('.navigation');
const navLinks = document.querySelectorAll('.navigation li');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navigation.classList.toggle('active');
  document.body.classList.toggle('menu-opened');

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

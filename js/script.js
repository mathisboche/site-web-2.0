const menuToggle = document.getElementById('menuToggle');
const bars = document.querySelectorAll('.barre');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  document.querySelector('.navigation').classList.toggle('active');
  document.body.classList.toggle('menu-opened');

  if (menuToggle.classList.contains('active')) {
    // Ouverture du menu avec animation fluide
    bars[0].style.transition = 'top 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s';
    bars[2].style.transition = 'top 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s';
    bars[1].style.transition = 'opacity 0.3s ease-in-out';

    // Réinitialisation des transitions après l'animation
    setTimeout(() => {
      bars[0].style.transition = '';
      bars[2].style.transition = '';
      bars[1].style.transition = '';
    }, 600);
  } else {
    // Fermeture du menu avec animation fluide
    bars[0].style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), top 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s';
    bars[2].style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), top 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s';
    bars[1].style.transition = 'opacity 0.3s ease-in-out 0.2s';

    // Réinitialisation des transitions après l'animation
    setTimeout(() => {
      bars[0].style.transition = '';
      bars[2].style.transition = '';
      bars[1].style.transition = '';
    }, 600);
  }
});
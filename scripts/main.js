document.addEventListener('DOMContentLoaded', function() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    
    scrollArrow.addEventListener('click', function() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
});
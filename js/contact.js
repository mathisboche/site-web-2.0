document.addEventListener('DOMContentLoaded', function () {
    // Animation de la timeline au défilement
    const formElements = document.querySelectorAll('.page-content .form-group, .page-content .contact-form .btn, #reseaux-sociaux');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    formElements.forEach(element => {
        observer.observe(element);
    });
});




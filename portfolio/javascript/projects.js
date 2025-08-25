document.addEventListener('DOMContentLoaded', () => {
    // --- Active Navigation Link Highlighting ---
    const navLinks = document.querySelectorAll('.main-navbar a');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');

        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- Element Animations on Scroll (Intersection Observer) ---
    const elementsToAnimate = document.querySelectorAll('.project-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                entry.target.style.animation = `fadeInUp 0.9s ease-out forwards ${index * 0.2}s`;
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for internal links (if any will be added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate elements on scroll using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-content')) {
                    entry.target.classList.add('fade-in-up');
                    entry.target.querySelectorAll('.about-text p').forEach((p, index) => {
                        p.style.animationDelay = `${0.2 + index * 0.2}s`;
                        p.style.opacity = 1;
                        p.style.transform = 'translateY(0)';
                    });
                } else if (entry.target.classList.contains('education-item') || entry.target.classList.contains('certification-item')) {
                    entry.target.classList.add('fade-in'); // Apply a generic fade-in
                    entry.target.querySelector('.laptop-icon, .certificate-icon').classList.add('bounce-in');
                }
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    document.querySelectorAll('.about-content').forEach(element => {
        observer.observe(element);
    });

    document.querySelectorAll('.education-item').forEach(element => {
        observer.observe(element);
    });

    document.querySelectorAll('.certification-item').forEach(element => {
        observer.observe(element);
    });

    // Add classes for animations (these match the CSS keyframes)
    // You might want to add these classes dynamically in the JS
    // For example, when an element comes into view (using Intersection Observer)
    // For now, let's just make sure the initial animations are linked
    const addClassOnLoad = (selector, className) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.classList.add(className));
    };

    // Initial animations for elements already in view
    addClassOnLoad('.about-header h1', 'neon-glow'); // Already handled by CSS directly
    addClassOnLoad('.profile-pic', 'float'); // Already handled by CSS directly

    // Example of dynamic class addition for better control (optional, as CSS handles most already)
    // You can use a more sophisticated approach with IntersectionObserver for elements that come into view
    // For elements immediately visible, CSS animations are sufficient.
});
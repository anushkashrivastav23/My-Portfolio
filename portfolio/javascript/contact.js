document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // In a real application, you would send this data to a backend server
            // using fetch() or XMLHttpRequest. For this client-side example,
            // we'll just simulate success.

            // Simulate form submission
            console.log('Form submitted!');
            console.log('Name:', this.name.value);
            console.log('Email:', this.email.value);
            console.log('Subject:', this.subject.value);
            console.log('Message:', this.message.value);

            // Display success message
            formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            formMessage.style.backgroundColor = 'rgba(0, 188, 212, 0.4)'; // A success color
            formMessage.style.display = 'block';
            formMessage.style.opacity = 1;

            // Clear the form fields
            this.reset();

            // Hide message after a few seconds
            setTimeout(() => {
                formMessage.style.opacity = 0;
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 500); // Wait for fade out to complete
            }, 5000); // Message visible for 5 seconds
        });
    }

    // Optional: Add an Intersection Observer for a fade-in animation on the contact-content
    const contactContent = document.querySelector('.contact-content');
    if (contactContent) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, observerOptions);

        observer.observe(contactContent);
    }
});
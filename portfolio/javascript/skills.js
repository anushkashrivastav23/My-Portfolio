document.addEventListener('DOMContentLoaded', () => {
    // Function to animate linear progress bars
    const animateProgressBar = (progressBar, percentageElement, targetPercentage) => {
        let currentPercentage = 0;
        const duration = 1500; // milliseconds
        const interval = 10; // milliseconds
        const increment = (targetPercentage / (duration / interval));

        const timer = setInterval(() => {
            currentPercentage += increment;
            if (currentPercentage >= targetPercentage) {
                currentPercentage = targetPercentage;
                clearInterval(timer);
            }
            progressBar.style.width = `${currentPercentage}%`;
            percentageElement.textContent = `${Math.round(currentPercentage)}%`;
        }, interval);
    };

    // Function to animate circular progress bars
    const animateCircularProgress = (circleElement, percentageElement, targetPercentage) => {
        // Use a fixed radius derived from the viewBox or CSS for robustness
        // For a viewBox="0 0 36 36" and a path M18 2.0845..., the effective radius is 15.9155.
        const radius = 15.9155; 
        const circumference = 2 * Math.PI * radius;
        
        // Set initial stroke-dasharray and stroke-dashoffset for animation
        circleElement.style.strokeDasharray = `${circumference} ${circumference}`;
        circleElement.style.strokeDashoffset = circumference; // Start fully hidden

        let currentPercentage = 0;
        const duration = 1500; // milliseconds
        const interval = 10; // milliseconds
        const increment = (targetPercentage / (duration / interval));

        const timer = setInterval(() => {
            currentPercentage += increment;
            if (currentPercentage >= targetPercentage) {
                currentPercentage = targetPercentage;
                clearInterval(timer);
            }
            const offset = circumference - (currentPercentage / 100) * circumference;
            circleElement.style.strokeDashoffset = offset;
            percentageElement.textContent = `${Math.round(currentPercentage)}%`;
        }, interval);
    };

    // Intersection Observer to trigger animations when elements are in view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the item is visible
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skill-item')) {
                    const percentage = parseInt(entry.target.dataset.percentage);
                    const progressBar = entry.target.querySelector('.progress-bar-fill');
                    const percentageText = entry.target.querySelector('.skill-percentage');
                    animateProgressBar(progressBar, percentageText, percentage);
                } else if (entry.target.classList.contains('professional-skill-item')) {
                    const percentage = parseInt(entry.target.dataset.percentage);
                    const circle = entry.target.querySelector('.circular-chart .circle');
                    const percentageText = entry.target.querySelector('.percentage-text');
                    
                    // Only animate if the circle element is found
                    if (circle) {
                        animateCircularProgress(circle, percentageText, percentage);
                    }
                }
                entry.target.style.opacity = 1; // Fade in the container
                entry.target.style.transform = 'translateY(0)'; // Slide up the container
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe all skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        skillObserver.observe(item);
    });

    document.querySelectorAll('.professional-skill-item').forEach(item => {
        skillObserver.observe(item);
    });
});
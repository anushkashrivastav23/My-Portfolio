// PART 1: Particles.js configuration
// This code initializes the particles.js background.
// It must run AFTER the particles.js library itself is loaded in your HTML.
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80, // Number of particles
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#38b2ac" // Teal color for particles
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        // If you want to use an image for particles, uncomment the line below
        // and ensure the path is correct. Otherwise, the particles will be circles.
        // "src": "assets/img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5, // Particle opacity
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3, // Particle size
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150, // Max distance for lines to connect
      "color": "#38b2ac", // Teal color for lines
      "opacity": 0.4, // Line opacity
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1, // Slow particle movement
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true, // Enable hover interactions
        "mode": "grab" // Lines will appear/react on hover
      },
      "onclick": {
        "enable": true, // Enable click interactions
        "mode": "push" // New particles appear on click
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});


// PART 2: Your existing DOM-related JavaScript for skill bar and timeline animations
// This code runs only after the entire HTML document has been loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {

    // Function to animate linear progress bars (for .skill-item)
    const animateProgressBar = (progressBar, percentageElement, targetPercentage) => {
        let currentPercentage = 0;
        const duration = 1500; // milliseconds for animation
        const interval = 10; // milliseconds between animation steps
        const increment = (targetPercentage / (duration / interval)); // How much percentage to add per step

        const timer = setInterval(() => {
            currentPercentage += increment;
            if (currentPercentage >= targetPercentage) {
                currentPercentage = targetPercentage; // Cap at target
                clearInterval(timer); // Stop animation
            }
            if (progressBar) { // Ensure progressBar exists before manipulating style
                progressBar.style.width = `${currentPercentage}%`; // Update bar width
            }
            if (percentageElement) { // Ensure percentageElement exists
                percentageElement.textContent = `${Math.round(currentPercentage)}%`; // Update text
            }
        }, interval);
    };

    // Function to animate circular progress bars (for .professional-skill-item)
    const animateCircularProgress = (circleElement, percentageElement, targetPercentage) => {
        if (!circleElement || !percentageElement) return; // Exit if elements are missing

        const radius = circleElement.r.baseVal.value; // Get circle radius
        const circumference = 2 * Math.PI * radius; // Calculate circumference
        circleElement.style.strokeDasharray = `${circumference} ${circumference}`; // Set dash array
        circleElement.style.strokeDashoffset = circumference; // Start fully hidden (offset by full circumference)

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
            // Calculate stroke-dashoffset to reveal the circle
            const offset = circumference - (currentPercentage / 100) * circumference;
            circleElement.style.strokeDashoffset = offset;
            percentageElement.textContent = `${Math.round(currentPercentage)}%`;
        }, interval);
    };

    // Intersection Observer to trigger skill animations when they enter the viewport
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If it's a linear skill bar
                if (entry.target.classList.contains('skill-item')) {
                    const percentage = parseInt(entry.target.dataset.percentage);
                    const progressBar = entry.target.querySelector('.progress-bar-fill');
                    const percentageText = entry.target.querySelector('.skill-percentage');
                    if (progressBar && percentageText && !entry.target.classList.contains('animated')) { // Prevent re-animating
                        animateProgressBar(progressBar, percentageText, percentage);
                        entry.target.classList.add('animated'); // Mark as animated
                    }
                // If it's a circular skill bar
                } else if (entry.target.classList.contains('professional-skill-item')) {
                    const percentage = parseInt(entry.target.dataset.percentage);
                    const circle = entry.target.querySelector('.circular-chart .circle');
                    const percentageText = entry.target.querySelector('.percentage-text');
                    if (circle && percentageText && !entry.target.classList.contains('animated')) { // Prevent re-animating
                        animateCircularProgress(circle, percentageText, percentage);
                        entry.target.classList.add('animated'); // Mark as animated
                    }
                }
                // Also apply fade-in/slide-up effects to the container
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                // We observe, but don't unobserve immediately if you want the fade-in to happen on every visit.
                // If you want it to animate only once, uncomment the line below:
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all linear skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        skillObserver.observe(item);
    });

    // Observe all circular skill items
    document.querySelectorAll('.professional-skill-item').forEach(item => {
        skillObserver.observe(item);
    });


    // Timeline animation for other pages (like about.html)
    // This part relies on '.timeline-item' elements and 'fadeInSlide' CSS animation.
    // It's placed here to ensure DOM is ready for querySelectorAll.
    window.addEventListener('scroll', animateTimeline);
    window.addEventListener('load', animateTimeline); // Also run on load in case items are already in view

    function animateTimeline() {
        const items = document.querySelectorAll('.timeline-item');
        const triggerY = window.innerHeight * 0.8; // Trigger when item is 80% up from bottom of viewport

        items.forEach((item, i) => {
            const pos = item.getBoundingClientRect().top;
            if (pos < triggerY && item.style.animation === '') { // Only animate if not already animated
                item.style.animation = `fadeInSlide 0.6s ease forwards ${i * 0.2}s`;
            }
        });
    }
});
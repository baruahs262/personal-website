// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all showcase items and project cards
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.showcase-item, .project-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href').split('#')[0];
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before');
    parallaxElements.forEach(el => {
        el.style.transform = `translateX(-50%) translateY(${scrolled * 0.5}px)`;
    });
});

// Autoplay video when scrolled into view
document.addEventListener('DOMContentLoaded', () => {
    const videoContainer = document.querySelector('.video-embed-container');
    if (videoContainer) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const iframe = entry.target.querySelector('iframe');
                if (entry.isIntersecting) {
                    // Video is in view - it will autoplay due to URL parameters
                    entry.target.style.opacity = '1';
                } else {
                    // Optionally pause when out of view
                    // Note: Pausing requires YouTube IFrame API for full control
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of video is visible
        });

        videoObserver.observe(videoContainer);
    }
});

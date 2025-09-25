// Additional JavaScript animations
document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect for hero image
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroImage = document.querySelector('.hero-image');
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
    });
    
    // Mouse move effect for hero section
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        heroSection.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            heroSection.style.background = `linear-gradient(135deg, 
                rgba(245, 247, 250, ${0.8 + y * 0.2}) 0%, 
                rgba(195, 207, 226, ${0.8 + x * 0.2}) 100%)`;
        });
    }
    
    // Add staggered animation to hero elements
    const heroElements = document.querySelectorAll('.hero h1, .hero p, .cta-btn');
    
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
});
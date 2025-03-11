// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scrolling
    initSmoothScrolling();
    // Initialize animations
    initAnimations();
    // Initialize form handling
    initFormHandling();
    // Initialize gallery toggle
    initGalleryToggle();
});

// Smooth scrolling function
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: targetPosition - navHeight,
                behavior: 'smooth'
            });
        });
    });
}

// Initialize animations
function initAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Animate skill bars if this is the skills section
                if (entry.target.id === 'skills') {
                    const skillBars = entry.target.querySelectorAll('.progress');
                    skillBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });
}

// Initialize form handling
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
}

// Initialize gallery toggle
function initGalleryToggle() {
    const gallerySection = document.getElementById('gallery');
    const galleryLink = document.querySelector('a[href="#gallery"]');
    let isGalleryVisible = true;

    galleryLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (isGalleryVisible) {
            gallerySection.classList.add('hidden-gallery');
            gallerySection.classList.remove('visible-gallery');
        } else {
            gallerySection.classList.remove('hidden-gallery');
            gallerySection.classList.add('visible-gallery');
            // Smooth scroll to gallery
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = gallerySection.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: targetPosition - navHeight,
                behavior: 'smooth'
            });
        }
        
        isGalleryVisible = !isGalleryVisible;
    });
}

// Add scroll event listener for navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.boxShadow = 'none';
    }
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}); 
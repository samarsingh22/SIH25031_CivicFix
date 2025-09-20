// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initCounterAnimations();
    initTestimonialsCarousel();
    initBeforeAfterSlider();
    initRippleEffect();
});

// Navigation
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 15, 26, 0.95)';
        } else {
            navbar.style.background = 'rgba(15, 15, 26, 0.9)';
        }
    });
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger counter animation when impact section is visible
                if (entry.target.classList.contains('impact-section')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.mission-card, .step-card, .stat-card, .team-card, .testimonial-slide');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Counter animations
function initCounterAnimations() {
    let countersAnimated = false;

    window.animateCounters = function() {
        if (countersAnimated) return;
        countersAnimated = true;

        const counters = document.querySelectorAll('.stat-number');
        counters.forEach((counter, index) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (current > target) current = target;
                    
                    // Format number with commas and add random fluctuation for realism
                    const displayValue = Math.floor(current + (Math.random() * 10 - 5));
                    const finalValue = Math.max(0, Math.min(displayValue, target));
                    counter.textContent = finalValue.toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    // Final formatting
                    if (target >= 1000) {
                        const kValue = (target / 1000).toFixed(1);
                        counter.textContent = kValue + 'K+';
                    } else {
                        counter.textContent = target.toLocaleString() + '+';
                    }
                    
                    // Add pulsing effect when animation completes
                    counter.style.animation = 'pulse 2s infinite';
                }
            };

            // Add staggered delay for each counter
            setTimeout(updateCounter, index * 200);
        });
    };
}

// Testimonials carousel
function initTestimonialsCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide
        });
    });

    // Pause on hover
    const carousel = document.getElementById('testimonialsCarousel');
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    // Start auto-slide
    startAutoSlide();
}

// Before/After slider
function initBeforeAfterSlider() {
    const container = document.querySelector('.before-after-container');
    const afterImage = document.querySelector('.after-image');
    let isSliding = false;

    if (!container || !afterImage) return;

    container.addEventListener('mouseenter', () => {
        afterImage.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
    });

    container.addEventListener('mouseleave', () => {
        afterImage.style.clipPath = 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)';
    });

    // Touch support for mobile
    container.addEventListener('touchstart', (e) => {
        isSliding = true;
        handleSlide(e.touches[0]);
    });

    container.addEventListener('touchmove', (e) => {
        if (isSliding) {
            e.preventDefault();
            handleSlide(e.touches[0]);
        }
    });

    container.addEventListener('touchend', () => {
        isSliding = false;
    });

    function handleSlide(touch) {
        const rect = container.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const percentage = (x / rect.width) * 100;
        const clampedPercentage = Math.max(0, Math.min(100, percentage));
        
        afterImage.style.clipPath = `polygon(${clampedPercentage}% 0%, 100% 0%, 100% 100%, ${clampedPercentage}% 100%)`;
    }
}

// Ripple effect for buttons
function initRippleEffect() {
    const buttons = document.querySelectorAll('.cta-button-large');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = button.querySelector('.ripple-effect');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.transform = 'scale(0)';
            
            // Trigger animation
            requestAnimationFrame(() => {
                ripple.style.transform = 'scale(4)';
                ripple.style.opacity = '0';
            });
            
            // Reset after animation
            setTimeout(() => {
                ripple.style.transform = 'scale(0)';
                ripple.style.opacity = '1';
            }, 600);
        });
    });
}

// Step card animations
document.querySelectorAll('.step-card').forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
        
        // Add pulse animation to icon
        const icon = card.querySelector('.step-icon');
        icon.style.animation = 'pulse 1s infinite';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        
        // Remove pulse animation
        const icon = card.querySelector('.step-icon');
        icon.style.animation = 'none';
    });
});

// Team card hover effects
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.team-card-inner').style.transform = 'rotateY(180deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.team-card-inner').style.transform = 'rotateY(0deg)';
    });
});

// Parallax effect for final CTA section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxBg = document.querySelector('.final-cta-section');
    
    if (parallaxBg) {
        const speed = scrolled * 0.5;
        parallaxBg.style.backgroundPosition = `center ${speed}px`;
    }
});

// Smooth scroll for navigation links
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

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Stagger animation of hero elements
    const heroElements = ['.hero-title', '.hero-subtitle', '.cta-button'];
    heroElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 26, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 15, 26, 0.9)';
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const parallaxBg = document.querySelector('.final-cta-section');
    if (parallaxBg) {
        const speed = scrolled * 0.5;
        parallaxBg.style.backgroundPosition = `center ${speed}px`;
    }
}, 16)); // ~60fps

// Add intersection observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    fadeInObserver.observe(section);
});

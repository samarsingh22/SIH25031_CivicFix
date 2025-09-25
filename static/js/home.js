// CivicFix Home Page JavaScript - Dropbox Inspired Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    initLoadingScreen();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Intersection Observer for animations
    initScrollAnimations();
    
    // Counter animations
    initCounterAnimations();
    
    // Button ripple effects
    initRippleEffects();
    
    // Parallax effects
    initParallaxEffects();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after transition
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 2000);
}

// Smooth Scrolling
function initSmoothScrolling() {
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
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for staggered animations
                if (entry.target.classList.contains('features-grid')) {
                    animateFeatureCards(entry.target);
                }
                
                if (entry.target.classList.contains('process-steps')) {
                    animateProcessSteps(entry.target);
                }
                
                if (entry.target.classList.contains('testimonials-section')) {
                    animateTestimonials(entry.target);
                }
                
                if (entry.target.classList.contains('stats-section')) {
                    animateStatsSection(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.features-section, .demo-section, .process-section, .stats-section, .testimonials-section, .cta-section').forEach(el => {
        observer.observe(el);
    });
}

// Animate Feature Cards
function animateFeatureCards(container) {
    const cards = container.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 150);
    });
}

// Animate Process Steps
function animateProcessSteps(container) {
    const steps = container.querySelectorAll('.step-item');
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(50px)';
            step.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
            }, 50);
        }, index * 200);
    });
}

// Animate Testimonials
function animateTestimonials(container) {
    const testimonials = container.querySelectorAll('.testimonial-card');
    testimonials.forEach((testimonial, index) => {
        setTimeout(() => {
            testimonial.style.opacity = '0';
            testimonial.style.transform = 'translateY(30px) scale(0.95)';
            testimonial.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                testimonial.style.opacity = '1';
                testimonial.style.transform = 'translateY(0) scale(1)';
            }, 50);
        }, index * 150);
    });
}

// Animate Stats Section
function animateStatsSection(container) {
    const cards = container.querySelectorAll('.stat-card');
    const cta = container.querySelector('.stats-cta');
    
    // Animate cards with stagger
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.9)';
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
                
                // Animate progress bar after card appears
                setTimeout(() => {
                    const progressBar = card.querySelector('.progress-bar');
                    if (progressBar) {
                        const progress = progressBar.getAttribute('data-progress');
                        progressBar.style.width = progress + '%';
                    }
                }, 300);
            }, 50);
        }, index * 200);
    });
    
    // Animate CTA section
    if (cta) {
        setTimeout(() => {
            cta.style.opacity = '0';
            cta.style.transform = 'translateY(30px)';
            cta.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                cta.style.opacity = '1';
                cta.style.transform = 'translateY(0)';
            }, 50);
        }, cards.length * 200 + 400);
    }
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Delay counter animation to sync with card animation
                setTimeout(() => {
                    animateCounter(entry.target);
                }, 600);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2500;
    const start = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function - more dramatic
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOutCubic * target);
        
        // Format number with better styling
        if (target >= 1000) {
            const thousands = (current / 1000).toFixed(1);
            element.textContent = thousands + 'K+';
        } else {
            element.textContent = current + '+';
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Add final pulse effect
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Ripple Effects
function initRippleEffects() {
    document.querySelectorAll('.btn-primary, .btn-cta-primary').forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
}

function createRipple(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.classList.add('btn-ripple');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-card, .element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Enhanced Hover Effects for Cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Special hover effects for stat cards
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.stat-icon');
        const number = this.querySelector('.stat-number');
        
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
        if (number) {
            number.style.transform = 'scale(1.05)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.stat-icon');
        const number = this.querySelector('.stat-number');
        
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
        if (number) {
            number.style.transform = 'scale(1)';
        }
    });
});

// Image Lazy Loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Smooth reveal animations for text
function initTextAnimations() {
    const textElements = document.querySelectorAll('.hero-title, .section-title, .demo-title');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.3s ease ${index * 0.02}s`;
            element.appendChild(span);
        });
        
        // Trigger animation when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('span').forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Mouse movement effects
function initMouseEffects() {
    const hero = document.querySelector('.hero-section');
    
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPercent = (clientX / innerWidth) * 100;
        const yPercent = (clientY / innerHeight) * 100;
        
        document.querySelectorAll('.floating-card').forEach((card, index) => {
            const speed = (index + 1) * 0.5;
            const x = (xPercent - 50) * speed * 0.01;
            const y = (yPercent - 50) * speed * 0.01;
            
            card.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Initialize additional effects
setTimeout(() => {
    initTextAnimations();
    initMouseEffects();
    initLazyLoading();
    initStatsInteractions();
}, 100);

// Stats Section Interactive Effects
function initStatsInteractions() {
    // Add click effects to stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('click', function() {
            // Create pulse effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Re-animate the progress bar
            const progressBar = this.querySelector('.progress-bar');
            if (progressBar) {
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 100);
            }
            
            // Re-animate the counter
            const counter = this.querySelector('.stat-number');
            if (counter) {
                const originalText = counter.textContent;
                counter.textContent = '0';
                setTimeout(() => {
                    animateCounter(counter);
                }, 200);
            }
        });
    });
    
    // Add parallax effect to stats background
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        window.addEventListener('scroll', () => {
            const rect = statsSection.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const overlay = statsSection.querySelector('.stats-overlay');
                if (overlay) {
                    overlay.style.transform = `translateY(${rate}px)`;
                }
            }
        });
    }
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Add any scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Add loading states for better UX
function showLoadingState(element) {
    element.classList.add('loading');
}

function hideLoadingState(element) {
    element.classList.remove('loading');
}

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn('Failed to load image:', this.src);
    });
});

// Ensure all buttons are clickable and working
document.querySelectorAll('a[class*="btn"]').forEach(button => {
    button.style.cursor = 'pointer';
    button.style.pointerEvents = 'auto';
    button.style.zIndex = '1';
    
    // Add click handler to ensure navigation works
    button.addEventListener('click', function(e) {
        if (this.href && this.href !== '#' && this.href !== '') {
            e.preventDefault();
            window.location.href = this.href;
        }
    });
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-blue) !important;
        outline-offset: 2px !important;
    }
    
    .stat-number {
        transition: transform 0.3s ease;
    }
    
    .stat-icon {
        transition: all 0.3s ease;
    }
    
    .progress-bar {
        transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .btn-primary, .btn-secondary, .btn-demo, .btn-cta, .btn-cta-primary, .btn-cta-secondary {
        cursor: pointer !important;
        z-index: 1 !important;
        pointer-events: auto !important;
    }
`;
document.head.appendChild(style);
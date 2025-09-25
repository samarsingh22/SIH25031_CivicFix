// Auth Pages - Home Style Animations and Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initInputAnimations();
    initButtonRippleEffect();
    initFormValidationAnimations();
    initScrollAnimations();
    initHoverEffects();
});

// Input field animations and interactions
function initInputAnimations() {
    const inputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea');
    
    inputs.forEach(input => {
        // Add focus/blur animations
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            animateIcon(this.parentElement.querySelector('.input-icon'));
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
        
        // Add typing animation
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.parentElement.classList.add('has-content');
            } else {
                this.parentElement.classList.remove('has-content');
            }
        });
        
        // Check initial state
        if (input.value.length > 0) {
            input.parentElement.classList.add('has-content');
        }
    });
}

// Animate input icons
function animateIcon(icon) {
    if (icon) {
        icon.style.transform = 'translateY(-50%) scale(1.2)';
        setTimeout(() => {
            icon.style.transform = 'translateY(-50%) scale(1.1)';
        }, 150);
    }
}

// Button ripple effect
function initButtonRippleEffect() {
    const buttons = document.querySelectorAll('.auth-btn, .role-btn');
    
    buttons.forEach(button => {
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

// Form validation animations
function initFormValidationAnimations() {
    const form = document.querySelector('.auth-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let hasErrors = false;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                showFieldError(input, 'This field is required');
                hasErrors = true;
            } else {
                clearFieldError(input);
            }
        });
        
        // Email validation
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                showFieldError(emailInput, 'Please enter a valid email address');
                hasErrors = true;
            }
        }
        
        // Password validation
        const passwordInput = form.querySelector('input[type="password"]');
        if (passwordInput && passwordInput.value && passwordInput.value.length < 6) {
            showFieldError(passwordInput, 'Password must be at least 6 characters long');
            hasErrors = true;
        }
        
        if (hasErrors) {
            e.preventDefault();
            animateFormShake();
        }
    });
}

function showFieldError(input, message) {
    clearFieldError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('field-error');
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i><span>${message}</span>`;
    
    input.parentElement.parentElement.appendChild(errorDiv);
    input.parentElement.classList.add('error');
    
    // Add shake animation to input
    input.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        input.style.animation = '';
    }, 500);
}

function clearFieldError(input) {
    const errorDiv = input.parentElement.parentElement.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.parentElement.classList.remove('error');
}

function animateFormShake() {
    const authCard = document.querySelector('.auth-card');
    if (authCard) {
        authCard.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            authCard.style.animation = '';
        }, 500);
    }
}

// Scroll animations for form elements
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe form groups for staggered animation
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.animationDelay = `${index * 0.1}s`;
        observer.observe(group);
    });
    
    // Observe other elements
    const elementsToObserve = document.querySelectorAll('.auth-header, .auth-btn, .role-buttons, .auth-footer');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// Enhanced hover effects
function initHoverEffects() {
    // Role button hover effects
    const roleButtons = document.querySelectorAll('.role-btn');
    roleButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Input wrapper hover effects
    const inputWrappers = document.querySelectorAll('.input-wrapper');
    inputWrappers.forEach(wrapper => {
        wrapper.addEventListener('mouseenter', function() {
            if (!this.classList.contains('focused')) {
                this.style.transform = 'translateY(-3px)';
            }
        });
        
        wrapper.addEventListener('mouseleave', function() {
            if (!this.classList.contains('focused')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Auth card hover effect
    const authCard = document.querySelector('.auth-card');
    if (authCard) {
        let hoverTimeout;
        
        authCard.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            this.style.transform = 'translateY(-8px)';
        });
        
        authCard.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                this.style.transform = 'translateY(0)';
            }, 100);
        });
    }
}

// Smooth scroll for long forms
function smoothScrollToError() {
    const firstError = document.querySelector('.field-error');
    if (firstError) {
        firstError.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// Loading animation for form submission
function showLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    button.disabled = true;
    
    return function() {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Auto-resize textarea
function initTextareaResize() {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initTextareaResize();
    
    // Add CSS for additional animations
    const style = document.createElement('style');
    style.textContent = `
        .input-wrapper.focused {
            transform: translateY(-2px) !important;
        }
        
        .input-wrapper.error input {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});
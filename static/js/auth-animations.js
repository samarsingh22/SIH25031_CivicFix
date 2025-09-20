// Auth Page Animations - Dark Bluish Theme
document.addEventListener('DOMContentLoaded', function() {
    initFloatingLabels();
    initRippleEffects();
    initFormValidation();
    initParticleEffects();
    initHoverAnimations();
});

// Floating Labels Animation
function initFloatingLabels() {
    const inputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea');
    
    inputs.forEach(input => {
        // Check if input has value on load
        if (input.value) {
            input.classList.add('has-value');
        }
        
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
}

// Ripple Effects for Buttons
function initRippleEffects() {
    const buttons = document.querySelectorAll('.auth-btn, .role-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = this.querySelector('.btn-ripple') || document.createElement('div');
            ripple.className = 'btn-ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            if (!this.querySelector('.btn-ripple')) {
                this.appendChild(ripple);
            }
            
            ripple.style.animation = 'none';
            ripple.offsetHeight; // Trigger reflow
            ripple.style.animation = 'ripple 0.6s linear';
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
}

// Enhanced Form Validation
function initFormValidation() {
    const form = document.querySelector('.auth-form');
    const inputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea');
    
    if (!form) return;
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            shakeForm();
        }
    });
}

function validateField(input) {
    const wrapper = input.closest('.input-wrapper');
    const formGroup = input.closest('.form-group');
    
    // Remove existing validation classes
    wrapper.classList.remove('error', 'success');
    
    // Basic validation
    if (input.hasAttribute('required') && !input.value.trim()) {
        wrapper.classList.add('error');
        showFieldError(formGroup, 'This field is required');
        return false;
    }
    
    // Email validation
    if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            wrapper.classList.add('error');
            showFieldError(formGroup, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Password validation
    if (input.type === 'password' && input.value) {
        if (input.value.length < 6) {
            wrapper.classList.add('error');
            showFieldError(formGroup, 'Password must be at least 6 characters');
            return false;
        }
    }
    
    wrapper.classList.add('success');
    return true;
}

function showFieldError(formGroup, message) {
    clearFieldError(formGroup);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i>${message}`;
    
    formGroup.appendChild(errorDiv);
}

function clearFieldError(element) {
    const formGroup = element.closest ? element.closest('.form-group') : element;
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    const wrapper = formGroup.querySelector('.input-wrapper');
    if (wrapper) {
        wrapper.classList.remove('error');
    }
}

function shakeForm() {
    const card = document.querySelector('.auth-card');
    card.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
        card.style.animation = '';
    }, 500);
}

// Particle Effects
function initParticleEffects() {
    const container = document.querySelector('.auth-bg');
    if (!container) return;
    
    // Create additional floating particles
    for (let i = 0; i < 10; i++) {
        createParticle(container, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        animation: particleFloat ${Math.random() * 10 + 15}s linear infinite;
        animation-delay: ${index * 0.5}s;
        left: ${Math.random() * 100}%;
        top: 100%;
    `;
    
    container.appendChild(particle);
}

// Hover Animations
function initHoverAnimations() {
    // Card tilt effect
    const card = document.querySelector('.auth-card');
    if (card) {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }
    
    // Input focus glow effect
    const inputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 20px rgba(29, 78, 216, 0.3)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = '';
        });
    });
    
    // Role button magnetic effect
    const roleButtons = document.querySelectorAll('.role-btn');
    roleButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `translateY(-3px) rotateX(${deltaY * 10}deg) rotateY(${deltaX * 10}deg)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
        });
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .input-wrapper.success input {
        border-color: #10b981;
    }
    
    .input-wrapper.error input {
        border-color: #ef4444;
        animation: inputShake 0.3s ease-in-out;
    }
    
    @keyframes inputShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .auth-card {
        transition: transform 0.1s ease-out;
    }
    
    .role-btn {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .input-wrapper {
        transition: box-shadow 0.3s ease;
    }
`;

document.head.appendChild(style);
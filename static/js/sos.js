// SOS Page JavaScript - Enhanced Interactions and Animations
document.addEventListener('DOMContentLoaded', function() {
    initSOSAnimations();
    initEmergencyFeatures();
    initContactAnimations();
    initStatusUpdates();
    initAccessibilityFeatures();
});

// Initialize SOS page animations
function initSOSAnimations() {
    // Stagger animation of main elements
    const elements = [
        '.emergency-badge',
        '.sos-title', 
        '.sos-description',
        '.sos-btn-main',
        '.emergency-instructions',
        '.emergency-contacts',
        '.additional-actions'
    ];
    
    elements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
    
    // Add floating animation to emergency tips
    const tips = document.querySelector('.emergency-tips');
    if (tips) {
        setInterval(() => {
            tips.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                tips.style.transform = 'translateY(0)';
            }, 1000);
        }, 3000);
    }
}

// Initialize emergency features
function initEmergencyFeatures() {
    const sosButton = document.querySelector('.sos-btn-main');
    const emergencyContacts = document.querySelectorAll('.contact-link');
    
    // Enhanced SOS button interactions
    if (sosButton) {
        let clickCount = 0;
        let clickTimer = null;
        
        sosButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add ripple effect
            createRippleEffect(e, this);
            
            // Handle multiple clicks for confirmation
            clickCount++;
            
            if (clickCount === 1) {
                showConfirmationDialog();
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 3000);
            } else if (clickCount >= 2) {
                clearTimeout(clickTimer);
                clickCount = 0;
                initiateEmergencyCall();
            }
            
            // Add press animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Add hover sound effect (optional)
        sosButton.addEventListener('mouseenter', function() {
            // You can add audio feedback here if needed
            this.style.boxShadow = '0 20px 50px rgba(220, 53, 69, 0.8)';
        });
        
        sosButton.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 30px rgba(220, 53, 69, 0.4)';
        });
    }
    
    // Enhanced contact link interactions
    emergencyContacts.forEach(contact => {
        contact.addEventListener('click', function(e) {
            e.preventDefault();
            
            const number = this.getAttribute('href').replace('tel:', '');
            showCallConfirmation(number, this.textContent);
        });
    });
}

// Initialize contact card animations
function initContactAnimations() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach((card, index) => {
        // Stagger the initial animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 800 + (index * 100));
        
        // Add hover animations
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Initialize status updates
function initStatusUpdates() {
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.status-text');
    
    if (statusIndicator && statusText) {
        // Simulate real-time status updates
        const statuses = [
            { text: 'Emergency Services Ready', color: '#10b981' },
            { text: 'All Systems Operational', color: '#3b82f6' },
            { text: 'Location Services Active', color: '#8b5cf6' }
        ];
        
        let currentStatus = 0;
        
        setInterval(() => {
            currentStatus = (currentStatus + 1) % statuses.length;
            const status = statuses[currentStatus];
            
            statusIndicator.style.background = status.color;
            statusText.textContent = status.text;
            
            // Add pulse animation
            statusIndicator.style.animation = 'none';
            setTimeout(() => {
                statusIndicator.style.animation = 'statusPulse 2s ease-in-out infinite';
            }, 100);
        }, 5000);
    }
}

// Initialize accessibility features
function initAccessibilityFeatures() {
    // Keyboard navigation for SOS button
    const sosButton = document.querySelector('.sos-btn-main');
    if (sosButton) {
        sosButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // High contrast mode detection
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }
    
    // Reduced motion detection
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
        
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Create ripple effect for button clicks
function createRippleEffect(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Show confirmation dialog for SOS
function showConfirmationDialog() {
    const dialog = document.createElement('div');
    dialog.className = 'confirmation-dialog';
    dialog.innerHTML = `
        <div class="dialog-content">
            <div class="dialog-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Emergency SOS</h3>
            <p>Click the SOS button again to confirm emergency call to 112</p>
            <div class="dialog-timer">
                <div class="timer-bar"></div>
            </div>
            <button class="cancel-btn" onclick="this.parentElement.parentElement.remove()">
                Cancel
            </button>
        </div>
    `;
    
    // Add dialog styles
    const style = document.createElement('style');
    style.textContent = `
        .confirmation-dialog {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .dialog-content {
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 3rem 2rem;
            text-align: center;
            border: 1px solid var(--glass-border);
            box-shadow: var(--shadow-lg);
            max-width: 400px;
            animation: popIn 0.5s ease-out;
        }
        
        .dialog-icon {
            width: 80px;
            height: 80px;
            background: rgba(220, 53, 69, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            color: var(--emergency-red);
            font-size: 2rem;
            animation: pulse 1s ease-in-out infinite;
        }
        
        .dialog-content h3 {
            color: var(--text-primary);
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        
        .dialog-content p {
            color: var(--text-secondary);
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        
        .dialog-timer {
            width: 100%;
            height: 4px;
            background: rgba(220, 53, 69, 0.2);
            border-radius: 2px;
            margin-bottom: 2rem;
            overflow: hidden;
        }
        
        .timer-bar {
            width: 100%;
            height: 100%;
            background: var(--emergency-red);
            transform: scaleX(1);
            transform-origin: left;
            animation: timerCountdown 3s linear;
        }
        
        .cancel-btn {
            background: transparent;
            color: var(--text-secondary);
            border: 2px solid var(--border);
            padding: 0.75rem 2rem;
            border-radius: 12px;
            cursor: pointer;
            font-weight: 500;
            transition: var(--transition);
        }
        
        .cancel-btn:hover {
            background: var(--text-secondary);
            color: var(--white);
        }
        
        @keyframes timerCountdown {
            to { transform: scaleX(0); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes popIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(dialog);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (dialog.parentElement) {
            dialog.remove();
        }
    }, 3000);
}

// Show call confirmation dialog
function showCallConfirmation(number, serviceName) {
    const dialog = document.createElement('div');
    dialog.className = 'call-confirmation-dialog';
    dialog.innerHTML = `
        <div class="dialog-content">
            <div class="dialog-icon">
                <i class="fas fa-phone"></i>
            </div>
            <h3>Call ${serviceName}?</h3>
            <p>You are about to call <strong>${number}</strong></p>
            <div class="dialog-actions">
                <button class="cancel-btn" onclick="this.parentElement.parentElement.parentElement.remove()">
                    Cancel
                </button>
                <button class="call-btn" onclick="window.location.href='tel:${number}'">
                    <i class="fas fa-phone"></i>
                    Call Now
                </button>
            </div>
        </div>
    `;
    
    // Add dialog styles
    const style = document.createElement('style');
    style.textContent = `
        .call-confirmation-dialog {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .dialog-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 2rem;
        }
        
        .call-btn {
            background: var(--emergency-red);
            color: var(--white);
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 12px;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: var(--transition);
        }
        
        .call-btn:hover {
            background: var(--emergency-red-dark);
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(dialog);
}

// Initiate emergency call
function initiateEmergencyCall() {
    // Show loading state
    showLoadingState();
    
    // Simulate emergency call initiation
    setTimeout(() => {
        window.location.href = 'tel:112';
        hideLoadingState();
    }, 1000);
}

// Show loading state
function showLoadingState() {
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    loading.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <h3>Initiating Emergency Call...</h3>
            <p>Connecting to emergency services</p>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .loading-content {
            text-align: center;
            color: var(--white);
        }
        
        .loading-spinner {
            width: 60px;
            height: 60px;
            border: 4px solid rgba(220, 53, 69, 0.3);
            border-top: 4px solid var(--emergency-red);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 2rem;
        }
        
        .loading-content h3 {
            margin-bottom: 0.5rem;
            font-size: 1.5rem;
        }
        
        .loading-content p {
            color: rgba(255, 255, 255, 0.7);
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(loading);
}

// Hide loading state
function hideLoadingState() {
    const loading = document.querySelector('.loading-overlay');
    if (loading) {
        loading.remove();
    }
}

// Add emergency tips rotation
function rotateEmergencyTips() {
    const tips = [
        "Stay calm and speak clearly",
        "Know your exact location",
        "Don't hang up until told to do so",
        "Follow dispatcher instructions",
        "Keep your phone charged"
    ];
    
    const tipsList = document.querySelector('.tips-list');
    if (tipsList) {
        let currentTip = 0;
        
        setInterval(() => {
            const listItems = tipsList.querySelectorAll('li');
            listItems.forEach((item, index) => {
                item.style.opacity = index === currentTip ? '1' : '0.5';
                item.style.transform = index === currentTip ? 'translateX(5px)' : 'translateX(0)';
            });
            
            currentTip = (currentTip + 1) % listItems.length;
        }, 3000);
    }
}

// Initialize tips rotation
setTimeout(rotateEmergencyTips, 2000);

// Add page visibility change handler
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden - pause animations
        document.body.classList.add('paused');
    } else {
        // Page is visible - resume animations
        document.body.classList.remove('paused');
    }
});

// Add emergency mode toggle (for testing)
let emergencyMode = false;
document.addEventListener('keydown', function(e) {
    // Press 'E' key 3 times quickly to toggle emergency mode
    if (e.key.toLowerCase() === 'e') {
        // This could be used for testing emergency features
        console.log('Emergency mode shortcut detected');
    }
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

// Add scroll-based animations
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax effect for background shapes
    const shapes = document.querySelectorAll('.bg-shapes > div');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${rate * speed}px)`;
    });
}, 16));
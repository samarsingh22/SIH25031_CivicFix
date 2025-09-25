// Extended Sample Data
const notificationsData = [
    {
        id: 1,
        title: "Complaint Status Update",
        message: "Your complaint at Main Street is now In Progress",
        type: "status_update",
        time: "2 hours ago",
        unread: true,
        complaintId: 2
    },
    {
        id: 2,
        title: "Complaint Resolved",
        message: "Broken streetlight complaint has been resolved",
        type: "resolved",
        time: "1 day ago",
        unread: true,
        complaintId: 1
    },
    {
        id: 3,
        title: "New Complaint Submitted",
        message: "Your complaint has been submitted for review",
        type: "submitted",
        time: "3 days ago",
        unread: false,
        complaintId: 5
    },
    {
        id: 4,
        title: "Complaint Assigned",
        message: "Your water pipe leak complaint has been assigned to a technician",
        type: "assigned",
        time: "4 days ago",
        unread: false,
        complaintId: 4
    },
    {
        id: 5,
        title: "Photo Required",
        message: "Please upload additional photos for your sidewalk complaint",
        type: "action_required",
        time: "5 days ago",
        unread: false,
        complaintId: 5
    }
];

// Profile helpers: fetch from API and update via PUT
function getCSRFToken() {
    const match = document.cookie.match(/(?:^|; )csrftoken=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
}

async function fetchProfile() {
    const res = await fetch('/api/auth/profile/', { credentials: 'same-origin' });
    if (!res.ok) throw new Error('Failed to load profile');
    return res.json();
}

async function updateProfile(data) {
    const res = await fetch('/api/auth/profile/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken(),
        },
        credentials: 'same-origin',
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to save profile');
    return res.json();
}

// Sample Data
const complaintsData = [
    {
        id: 1,
        title: "Broken Streetlight",
        location: "Park Street & 5th Avenue",
        status: "pending",
        date: "28 Aug 2025",
        category: "lights",
        description: "Streetlight has been flickering for 3 days",
        thumbnail: "assets/streetlight-thumb.jpg"
    },
    {
        id: 2,
        title: "Pothole on Main Road",
        location: "Main Road near City Mall",
        status: "progress",
        date: "25 Aug 2025",
        category: "roads",
        description: "Large pothole causing traffic issues",
        thumbnail: "assets/pothole-thumb.jpg"
    },
    {
        id: 3,
        title: "Overflowing Garbage Bin",
        location: "Central Park Entrance",
        status: "resolved",
        date: "22 Aug 2025",
        category: "garbage",
        description: "Garbage bin overflowing for several days",
        thumbnail: "assets/garbage-thumb.jpg"
    },
    {
        id: 4,
        title: "Water Pipe Leak",
        location: "Oak Street Residential Area",
        status: "progress",
        date: "26 Aug 2025",
        category: "water",
        description: "Water leaking from underground pipe",
        thumbnail: "assets/water-thumb.jpg"
    },
    {
        id: 5,
        title: "Damaged Sidewalk",
        location: "University District",
        status: "pending",
        date: "29 Aug 2025",
        category: "roads",
        description: "Cracked sidewalk creating safety hazard",
        thumbnail: "assets/sidewalk-thumb.jpg"
    },
    {
        id: 6,
        title: "Graffiti on Public Wall",
        location: "Downtown Metro Station",
        status: "pending",
        date: "27 Aug 2025",
        category: "maintenance",
        description: "Vandalism needs cleanup",
        thumbnail: "assets/graffiti-thumb.jpg"
    },
    {
        id: 7,
        title: "Traffic Light Malfunction",
        location: "Broadway & 2nd Street",
        status: "resolved",
        date: "20 Aug 2025",
        category: "lights",
        description: "Traffic light stuck on red",
        thumbnail: "assets/traffic-thumb.jpg"
    },
    {
        id: 8,
        title: "Blocked Storm Drain",
        location: "Riverside Park",
        status: "resolved",
        date: "18 Aug 2025",
        category: "water",
        description: "Storm drain clogged with debris",
        thumbnail: "assets/drain-thumb.jpg"
    }
];

// Category Icons
const categoryIcons = {
    lights: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 21C9 22.1 9.9 23 11 23H13C14.1 23 15 22.1 15 21V20H9V21ZM12 2C8.14 2 5 5.14 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.14 15.86 2 12 2Z" fill="currentColor"/>
    </svg>`,
    roads: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 8H16V6C16 4.9 15.1 4 14 4H10C8.9 4 8 4.9 8 6V8H4C2.9 8 2 8.9 2 10V20C2 21.1 2.9 22 4 22H20C21.1 22 22 21.1 22 20V10C22 8.9 21.1 8 20 8ZM10 6H14V8H10V6ZM20 20H4V10H20V20Z" fill="currentColor"/>
    </svg>`,
    garbage: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor"/>
    </svg>`,
    water: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C7.58 2 4 5.58 4 10C4 14.42 7.58 18 12 18S20 14.42 20 10C20 5.58 16.42 2 12 2ZM12 16C8.69 16 6 13.31 6 10C6 6.69 8.69 4 12 4S18 6.69 18 10C18 13.31 15.31 16 12 16Z" fill="currentColor"/>
    </svg>`,
    maintenance: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 0.6 4.7 1.7L9 6L6 9L1.6 4.7C0.4 7.1 0.9 10.1 2.9 12.1C4.8 14 7.5 14.5 9.8 13.6L18.9 22.7C19.3 23.1 19.9 23.1 20.3 22.7L22.6 20.4C23.1 20 23.1 19.3 22.7 19Z" fill="currentColor"/>
    </svg>`
};

// DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mainContent = document.getElementById('mainContent');
const mobileOverlay = document.getElementById('mobileOverlay');

// Sidebar Toggle Functionality
function toggleSidebar() {
    sidebar.classList.toggle('active');
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
    mobileOverlay.classList.toggle('active');
    
    // Add ripple effect to toggle button
    createRipple(sidebarToggle);
}

// Ripple Effect
function createRipple(element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(59, 130, 246, 0.3)';
    ripple.style.position = 'absolute';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    ripple.animate([
        { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 0 }
    ], {
        duration: 600,
        easing: 'ease-out'
    }).onfinish = () => {
        ripple.remove();
    };
}

// Navigation Functionality
function initNavigation() {
    // Limit to sidebar nav links to avoid interfering with top navbar links
    const navLinks = document.querySelectorAll('#sidebar .nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            link.classList.add('active');

            // Add click animation
            createRipple(link);

            // Switch to the selected section
            const section = link.dataset.section;
            switchSection(section);
        });
    });
}

// Section Switching
function switchSection(sectionName) {
    const currentSection = document.querySelector('.content-section.active');
    const targetSection = document.getElementById(`${sectionName}-section`);
    
    if (!targetSection || currentSection === targetSection) return;
    
    // Fade out current section
    currentSection.style.opacity = '0';
    currentSection.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        currentSection.classList.remove('active');
        targetSection.classList.add('active');
        
        // Fade in new section
        setTimeout(() => {
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
            
            // Load section-specific content
            loadSectionContent(sectionName);
        }, 50);
    }, 200);
    
    // Update navigation active state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionName) {
            link.classList.add('active');
        }
    });
}

// Load Section Content
function loadSectionContent(sectionName) {
    switch (sectionName) {
        case 'dashboard':
            loadDashboardContent();
            break;
        case 'complaints':
            loadComplaintsContent();
            break;
        case 'track':
            loadTrackingContent();
            break;
        case 'notifications':
            loadNotificationsContent();
            break;
        case 'profile':
            loadProfileContent();
            break;
    }
}

// Render Complaints
function renderComplaints(complaints = complaintsData) {
    complaintsGrid.innerHTML = '';
    
    complaints.forEach((complaint, index) => {
        const complaintCard = document.createElement('div');
        complaintCard.className = `complaint-card fade-in fade-in-delay-${Math.min(index + 1, 4)}`;
        
        complaintCard.innerHTML = `
            <div class="complaint-header">
                <div class="complaint-info">
                    <h3 class="complaint-title">${complaint.title}</h3>
                    <div class="complaint-location">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5Z" fill="currentColor"/>
                        </svg>
                        ${complaint.location}
                    </div>
                </div>
                <div class="complaint-thumbnail">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="currentColor"/>
                    </svg>
                </div>
            </div>
            
            <div class="complaint-meta">
                <div class="complaint-category">
                    <div class="category-icon">
                        ${categoryIcons[complaint.category] || categoryIcons.maintenance}
                    </div>
                    <span>${complaint.category.charAt(0).toUpperCase() + complaint.category.slice(1)}</span>
                </div>
                
                <div class="complaint-status status-${complaint.status}">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        ${getStatusIcon(complaint.status)}
                    </svg>
                    ${getStatusText(complaint.status)}
                </div>
                
                <div class="complaint-date">${complaint.date}</div>
            </div>
        `;
        
        // Add click event for complaint details
        complaintCard.addEventListener('click', () => {
            showComplaintDetails(complaint);
        });
        
        complaintsGrid.appendChild(complaintCard);
    });
}

// Get Status Icon
function getStatusIcon(status) {
    switch (status) {
        case 'pending':
            return '<path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>';
        case 'progress':
            return '<path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>';
        case 'resolved':
            return '<path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>';
        default:
            return '<path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>';
    }
}

// Get Status Text
function getStatusText(status) {
    switch (status) {
        case 'pending': return 'Pending';
        case 'progress': return 'In Progress';
        case 'resolved': return 'Resolved';
        default: return 'Unknown';
    }
}

// Filter Complaints
function filterComplaints() {
    const statusFilter = document.getElementById('statusFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const complaintsGrid = document.getElementById('allComplaintsGrid');
    
    if (!statusFilter || !categoryFilter || !complaintsGrid) return;
    
    const statusValue = statusFilter.value;
    const categoryValue = categoryFilter.value;
    
    let filteredComplaints = complaintsData;
    
    if (statusValue !== 'all') {
        filteredComplaints = filteredComplaints.filter(complaint => complaint.status === statusValue);
    }
    
    if (categoryValue !== 'all') {
        filteredComplaints = filteredComplaints.filter(complaint => complaint.category === categoryValue);
    }
    
    renderComplaintsToGrid(filteredComplaints, complaintsGrid);
    
    // Add filter animation
    complaintsGrid.style.opacity = '0';
    complaintsGrid.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        complaintsGrid.style.transition = 'all 0.3s ease';
        complaintsGrid.style.opacity = '1';
        complaintsGrid.style.transform = 'translateY(0)';
    }, 100);
}

// Show Complaint Details (Modal simulation)
function showComplaintDetails(complaint) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${complaint.title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="detail-row">
                    <strong>Location:</strong> ${complaint.location}
                </div>
                <div class="detail-row">
                    <strong>Status:</strong> 
                    <span class="complaint-status status-${complaint.status}">
                        ${getStatusText(complaint.status)}
                    </span>
                </div>
                <div class="detail-row">
                    <strong>Date Submitted:</strong> ${complaint.date}
                </div>
                <div class="detail-row">
                    <strong>Category:</strong> ${complaint.category.charAt(0).toUpperCase() + complaint.category.slice(1)}
                </div>
                <div class="detail-row">
                    <strong>Description:</strong> ${complaint.description}
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: rgba(30, 41, 59, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 16px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        border: 1px solid rgba(51, 65, 85, 0.3);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    const modalHeader = modal.querySelector('.modal-header');
    modalHeader.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(51, 65, 85, 0.3);
    `;
    
    const modalClose = modal.querySelector('.modal-close');
    modalClose.style.cssText = `
        background: none;
        border: none;
        color: #94a3b8;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 8px;
        transition: all 0.3s ease;
    `;
    
    modal.querySelectorAll('.detail-row').forEach(row => {
        row.style.cssText = `
            margin-bottom: 1rem;
            color: #f8fafc;
            line-height: 1.6;
        `;
    });
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close functionality
    function closeModal() {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.9)';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Add hover effect to close button
    modalClose.addEventListener('mouseenter', () => {
        modalClose.style.color = '#ef4444';
        modalClose.style.background = 'rgba(239, 68, 68, 0.1)';
        modalClose.style.transform = 'scale(1.1)';
    });
    
    modalClose.addEventListener('mouseleave', () => {
        modalClose.style.color = '#94a3b8';
        modalClose.style.background = 'none';
        modalClose.style.transform = 'scale(1)';
    });
}

// Stats Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 30;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(currentValue);
        }, 50);
    });
}

// Rewards Data
const rewardsData = [
    {
        id: 1,
        title: "Gift Voucher",
        description: "Get ₹500 Amazon voucher for your efforts",
        points: 1000,
        icon: "🎁",
        available: true
    },
    {
        id: 2,
        title: "Civic Champion Badge",
        description: "Showcase your contribution with a digital badge",
        points: 500,
        icon: "🏅",
        available: true
    },
    {
        id: 3,
        title: "CivicFix T-Shirt",
        description: "Exclusive CivicFix branded T-shirt",
        points: 2000,
        icon: "👕",
        available: true
    },
    {
        id: 4,
        title: "Coffee Voucher",
        description: "Enjoy a free coffee at partner cafes",
        points: 300,
        icon: "☕",
        available: true
    },
    {
        id: 5,
        title: "Movie Tickets",
        description: "2 tickets to any local cinema",
        points: 800,
        icon: "🎬",
        available: false
    },
    {
        id: 6,
        title: "Shopping Coupon",
        description: "20% off at partner stores",
        points: 600,
        icon: "🛍",
        available: true
    }
];

const leaderboardData = [
    { rank: 1, name: "Aditya", points: 3500, issues: 45 },
    { rank: 2, name: "Samar", points: 2800, issues: 38 },
    { rank: 3, name: "Ananya", points: 2500, issues: 32 },
    { rank: 4, name: "Rahul", points: 1800, issues: 28 },
    { rank: 5, name: "Priya", points: 1500, issues: 25 }
];

// User points (you can fetch this from your backend)
let userPoints = 1200;

// Load Rewards Content
function loadRewardsContent() {
    const container = document.getElementById('rewardsContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="user-points-display fade-in">
            <h3>Your Current Points</h3>
            <div class="points-count">${userPoints}</div>
            <p class="points-subtitle">Keep contributing to earn more rewards</p>
            <div class="points-progress">
                <div class="progress-label">
                    <span>Next reward at 1500 points</span>
                    <span>${userPoints}/1500</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(userPoints / 1500) * 100}%"></div>
                </div>
            </div>
        </div>

        <div class="section-header">
            <h2>Available Rewards</h2>
            <span class="filter-select">Sort by: Points</span>
        </div>

        <div class="rewards-grid" id="rewardsGrid"></div>

        <div class="section-header">
            <h2>Top Contributors</h2>
        </div>

        <div class="leaderboard-grid" id="leaderboardGrid"></div>
    `;

    renderRewards();
    renderLeaderboard();
}

// Render Rewards
function renderRewards() {
    const grid = document.getElementById('rewardsGrid');
    if (!grid) return;

    grid.innerHTML = rewardsData.map((reward, index) => `
        <div class="reward-card fade-in fade-in-delay-${Math.min(index + 1, 4)}" 
             onclick="showRewardDetails(${reward.id})">
            <div class="reward-header">
                <div class="reward-icon">
                    ${reward.icon}
                </div>
                <div class="reward-info">
                    <h3>${reward.title}</h3>
                    <p>${reward.description}</p>
                </div>
            </div>
            <div class="reward-points">
                <span class="points-badge">${reward.points} Points</span>
                <button class="redeem-btn" 
                        ${userPoints >= reward.points && reward.available ? '' : 'disabled'}
                        onclick="event.stopPropagation(); redeemReward(${reward.id})">
                    ${userPoints >= reward.points ? 'Redeem' : 'Need More Points'}
                </button>
            </div>
        </div>
    `).join('');
}

// Render Leaderboard
function renderLeaderboard() {
    const grid = document.getElementById('leaderboardGrid');
    if (!grid) return;

    grid.innerHTML = leaderboardData.map((user, index) => `
        <div class="leaderboard-item fade-in fade-in-delay-${Math.min(index + 1, 4)}">
            <div class="leaderboard-rank ${user.rank <= 3 ? `rank-${user.rank}` : 'rank-other'}">
                ${user.rank <= 3 ? ['🥇', '🥈', '🥉'][user.rank - 1] : user.rank}
            </div>
            <div class="leaderboard-info">
                <h4>${user.name}</h4>
                <div class="leaderboard-points">
                    <span>${user.points} points</span>
                    <span>•</span>
                    <span>${user.issues} issues resolved</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Show Reward Details
function showRewardDetails(rewardId) {
    const reward = rewardsData.find(r => r.id === rewardId);
    if (!reward) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${reward.title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">${reward.icon}</div>
                    <div class="points-badge" style="display: inline-block; font-size: 1.125rem;">
                        ${reward.points} Points
                    </div>
                </div>
                
                <div class="detail-row">
                    <strong>Description:</strong> ${reward.description}
                </div>
                
                <div class="detail-row">
                    <strong>Status:</strong> 
                    <span style="color: ${reward.available ? '#10b981' : '#ef4444'}">
                        ${reward.available ? 'Available' : 'Coming Soon'}
                    </span>
                </div>
                
                <div class="detail-row">
                    <strong>Your Points:</strong> ${userPoints}
                </div>
                
                ${reward.available ? `
                <div style="margin-top: 1.5rem; text-align: center;">
                    <button class="redeem-btn" 
                            style="padding: 0.75rem 2rem; font-size: 1rem;"
                            ${userPoints >= reward.points ? '' : 'disabled'}
                            onclick="redeemReward(${reward.id})">
                        ${userPoints >= reward.points ? 'Redeem Now' : 'Need ' + (reward.points - userPoints) + ' More Points'}
                    </button>
                </div>
                ` : ''}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: rgba(30, 41, 59, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 16px;
        padding: 2rem;
        max-width: 400px;
        width: 90%;
        border: 1px solid rgba(51, 65, 85, 0.3);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;

    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);

    // Close functionality
    function closeModal() {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.9)';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Redeem Reward
function redeemReward(rewardId) {
    const reward = rewardsData.find(r => r.id === rewardId);
    if (!reward || !reward.available) return;

    if (userPoints >= reward.points) {
        if (confirm(`Are you sure you want to redeem ${reward.title} for ${reward.points} points?`)) {
            // Simulate API call
            const button = event.target;
            const originalText = button.textContent;
            button.textContent = 'Processing...';
            button.disabled = true;

            setTimeout(() => {
                userPoints -= reward.points;
                reward.available = false; // Mark as redeemed
                
                // Update UI
                loadRewardsContent();
                updateRewardsBadge();
                
                // Show success message
                alert(`🎉 Congratulations! You've successfully redeemed ${reward.title}!`);
                
                // Add success animation (optional function)
                if (typeof createSuccessParticles === 'function') {
                    createSuccessParticles(button);
                }
            }, 1500);
        }
    } else {
        alert(`You need ${reward.points - userPoints} more points to redeem this reward.`);
    }
}

// Update Rewards Badge
function updateRewardsBadge() {
    const availableRewards = rewardsData.filter(r => r.available && userPoints >= r.points).length;
    const badge = document.querySelector('.rewards-badge');
    if (badge) {
        badge.textContent = availableRewards;
        
        // Pulse animation when rewards are available
        if (availableRewards > 0) {
            badge.style.animation = 'rewardPulse 2s infinite';
        } else {
            badge.style.animation = 'none';
        }
    }
}

// Update the loadSectionContent function to include rewards
function loadSectionContent(sectionName) {
    switch (sectionName) {
        case 'dashboard':
            loadDashboardContent();
            break;
        case 'complaints':
            loadComplaintsContent();
            break;
        case 'track':
            loadTrackingContent();
            break;
        case 'rewards':  // Add this case
            loadRewardsContent();
            break;
        case 'notifications':
            loadNotificationsContent();
            break;
        case 'profile':
            loadProfileContent();
            break;
    }
}


// Notification Management
function markNotificationAsRead(notification) {
    notification.classList.remove('unread');
    notification.style.opacity = '0.7';
    
    // Add success animation
    const icon = notification.querySelector('.notification-icon');
    icon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        icon.style.transform = 'scale(1)';
    }, 200);
}

function markAllNotificationsAsRead() {
    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
    
    unreadNotifications.forEach((notification, index) => {
        setTimeout(() => {
            markNotificationAsRead(notification);
        }, index * 100);
    });
}

// Enhanced Hover Effects
function addEnhancedHoverEffects() {
    // Stat cards hover effect
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.stat-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            
            // Add glow effect
            const number = card.querySelector('.stat-number');
            number.style.textShadow = '0 0 20px currentColor';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.stat-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
            
            const number = card.querySelector('.stat-number');
            number.style.textShadow = 'none';
        });
    });
    
    // Action button hover effect
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Particle Effect for Success Actions
function createSuccessParticles(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--success);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 6) * Math.PI * 2;
        const distance = 30 + Math.random() * 20;
        
        particle.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1)`, opacity: 1 },
            { transform: `translate(${Math.cos(angle) * distance * 1.5}px, ${Math.sin(angle) * distance * 1.5}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            delay: i * 50
        }).onfinish = () => {
            particle.remove();
        };
    }
}

// Load Dashboard Content
function loadDashboardContent() {
    const recentGrid = document.getElementById('recentComplaintsGrid');
    const quickNotifications = document.getElementById('quickNotificationsList');
    
    // Load recent complaints (first 3)
    const recentComplaints = complaintsData.slice(0, 3);
    renderComplaintsToGrid(recentComplaints, recentGrid);
    
    // Load quick notifications (first 3)
    const recentNotifications = notificationsData.slice(0, 3);
    renderNotificationsToList(recentNotifications, quickNotifications);
    
    // Animate stats
    setTimeout(() => animateStats(), 500);
}

// Load Complaints Content
function loadComplaintsContent() {
    const allGrid = document.getElementById('allComplaintsGrid');
    renderComplaintsToGrid(complaintsData, allGrid);
}

// Load Tracking Content
function loadTrackingContent() {
    const container = document.getElementById('trackingContainer');
    const activeComplaints = complaintsData.filter(c => c.status !== 'resolved');
    
    container.innerHTML = activeComplaints.map(complaint => `
        <div class="tracking-card fade-in">
            <div class="tracking-header">
                <div class="tracking-info">
                    <h3>${complaint.title}</h3>
                    <div class="tracking-location">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor"/>
                        </svg>
                        ${complaint.location}
                    </div>
                </div>
                <div class="complaint-status status-${complaint.status}">
                    ${getStatusText(complaint.status)}
                </div>
            </div>
            
            <div class="progress-timeline">
                <div class="timeline-step completed">
                    <div class="timeline-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="timeline-label">Submitted</div>
                </div>
                <div class="timeline-step ${complaint.status === 'progress' || complaint.status === 'resolved' ? 'completed' : complaint.status === 'pending' ? 'active' : ''}">
                    <div class="timeline-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="timeline-label">Under Review</div>
                </div>
                <div class="timeline-step ${complaint.status === 'progress' ? 'active' : complaint.status === 'resolved' ? 'completed' : ''}">
                    <div class="timeline-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="timeline-label">In Progress</div>
                </div>
                <div class="timeline-step ${complaint.status === 'resolved' ? 'completed' : ''}">
                    <div class="timeline-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="timeline-label">Resolved</div>
                </div>
            </div>
            
            <div class="progress-bar-container">
                <div class="progress-label">
                    <span>Progress</span>
                    <span>${getProgressPercentage(complaint.status)}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${getProgressPercentage(complaint.status)}%"></div>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize Dashboard
function initDashboard() {
    initNavigation();
    loadDashboardContent();
    addEnhancedHoverEffects();
    
    // Add floating animation to sidebar logo
    const logo = document.querySelector('.logo');
    setInterval(() => {
        logo.style.transform = 'translateY(-2px)';
        setTimeout(() => {
            logo.style.transform = 'translateY(0)';
        }, 1000);
    }, 3000);
}

// Helper Functions
function getProgressPercentage(status) {
    switch (status) {
        case 'pending': return 25;
        case 'progress': return 75;
        case 'resolved': return 100;
        default: return 0;
    }
}

function renderComplaintsToGrid(complaints, gridElement) {
    gridElement.innerHTML = complaints.map((complaint, index) => `
        <div class="complaint-card fade-in fade-in-delay-${Math.min(index + 1, 4)}" onclick="showComplaintDetails(${JSON.stringify(complaint).replace(/"/g, '&quot;')})">
            <div class="complaint-header">
                <div class="complaint-info">
                    <h3 class="complaint-title">${complaint.title}</h3>
                    <div class="complaint-location">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor"/>
                        </svg>
                        ${complaint.location}
                    </div>
                </div>
                <div class="complaint-thumbnail">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="currentColor"/>
                    </svg>
                </div>
            </div>
            <div class="complaint-meta">
                <div class="complaint-category">
                    <div class="category-icon">${categoryIcons[complaint.category] || categoryIcons.maintenance}</div>
                    <span>${complaint.category.charAt(0).toUpperCase() + complaint.category.slice(1)}</span>
                </div>
                <div class="complaint-status status-${complaint.status}">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        ${getStatusIcon(complaint.status)}
                    </svg>
                    ${getStatusText(complaint.status)}
                </div>
                <div class="complaint-date">${complaint.date}</div>
            </div>
        </div>
    `).join('');
}

function renderNotificationsToList(notifications, listElement) {
    listElement.innerHTML = notifications.map(notification => `
        <div class="notification-item ${notification.unread ? 'unread' : ''}" onclick="markNotificationAsRead(this)">
            <div class="notification-icon status-${notification.type.includes('resolved') ? 'resolved' : notification.type.includes('progress') ? 'progress' : 'pending'}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    ${getNotificationIcon(notification.type)}
                </svg>
            </div>
            <div class="notification-content">
                <p><strong>${notification.title}</strong></p>
                <p>${notification.message}</p>
                <span class="notification-time">${notification.time}</span>
            </div>
        </div>
    `).join('');
}

function getNotificationIcon(type) {
    switch (type) {
        case 'resolved':
            return '<path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>';
        case 'status_update':
        case 'assigned':
            return '<path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="currentColor"/>';
        default:
            return '<path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>';
    }
}

function loadNotificationsContent() {
    const detailedList = document.getElementById('detailedNotificationsList');
    renderNotificationsToList(notificationsData, detailedList);
}

async function loadProfileContent() {
    const container = document.getElementById('profileContainer');
    container.innerHTML = '<div class="profile-card">Loading profile...</div>';

    try {
        const data = await fetchProfile();
        const name = data.first_name || data.username || '';
        const email = data.email || '';
        const phone = data.phone || '';
        const address = data.address || '';

        const initials = (name || data.username || '?')
            .split(' ')
            .filter(Boolean)
            .map(n => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

        container.innerHTML = `
            <div class="profile-card fade-in">
                <div class="profile-header">
                    <div class="profile-avatar">${initials}</div>
                    <div class="profile-details">
                        <h2>${name}</h2>
                        <p>${email}</p>
                    </div>
                </div>
                
                <form class="profile-form" id="profileForm">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="profileName">Full Name</label>
                            <input type="text" id="profileName" class="profile-input" value="${name}" autocomplete="name">
                        </div>
                        <div class="form-group">
                            <label for="profileEmail">Email</label>
                            <input type="email" id="profileEmail" class="profile-input" value="${email}" autocomplete="email">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="profilePhone">Phone</label>
                            <input type="tel" id="profilePhone" class="profile-input" value="${phone}" autocomplete="tel">
                        </div>
                        <div class="form-group">
                            <label for="profileAddress">Address</label>
                            <input type="text" id="profileAddress" class="profile-input" value="${address}" autocomplete="street-address">
                        </div>
                    </div>
                    
                    <div class="profile-actions">
                        <button type="button" class="btn-secondary" id="profileCancel">Cancel</button>
                        <button type="submit" class="action-btn">Save Changes</button>
                    </div>
                </form>
            </div>
        `;

        // Save handler
        document.getElementById('profileForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const payload = {
                first_name: document.getElementById('profileName').value.trim(),
                email: document.getElementById('profileEmail').value.trim(),
                phone: document.getElementById('profilePhone').value.trim(),
                address: document.getElementById('profileAddress').value.trim(),
            };
            try {
                const saved = await updateProfile(payload);
                // Re-render with saved values
                loadProfileContent();
            } catch (err) {
                alert('Could not save profile.');
            }
        });

        // Cancel handler: reload from API
        document.getElementById('profileCancel').addEventListener('click', () => loadProfileContent());
    } catch (err) {
        container.innerHTML = '<div class="profile-card">Failed to load profile.</div>';
    }
}

// Event Listeners
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}

sidebarToggle.addEventListener('click', toggleSidebar);

mobileOverlay.addEventListener('click', () => {
    if (sidebar.classList.contains('active')) {
        toggleSidebar();
    }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.click();
        }
    }
    
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
    }
});

// Filter functionality
document.addEventListener('change', (e) => {
    if (e.target.id === 'statusFilter' || e.target.id === 'categoryFilter') {
        filterComplaints();
    }
});

// Notification filters
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        filterNotifications(e.target.dataset.filter);
    }
    
    if (e.target.classList.contains('mark-all-read')) {
        markAllNotificationsAsRead();
        createSuccessParticles(e.target);
    }

    // Open New Complaint modal (only intercept when it's not a link with href)
    if (e.target.closest('.new-complaint-btn')) {
        const link = e.target.closest('a');
        if (link && link.getAttribute('href')) {
            // Let the browser navigate to the complaints page
        } else {
            e.preventDefault();
            openNewComplaintModal();
        }
    }
});

function filterNotifications(filter) {
    const notifications = document.querySelectorAll('.notification-item');
    notifications.forEach(notification => {
        const isUnread = notification.classList.contains('unread');
        const isUpdate = notification.querySelector('.notification-content p').textContent.includes('Progress') || 
                        notification.querySelector('.notification-content p').textContent.includes('resolved');
        
        let show = true;
        if (filter === 'unread' && !isUnread) show = false;
        if (filter === 'updates' && !isUpdate) show = false;
        
        notification.style.display = show ? 'flex' : 'none';
    });
}

// Window Resize Handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        mobileOverlay.classList.remove('active');
    }
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

/* ==============================
   New Complaint Modal + Submit
   ============================== */
function openNewComplaintModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>New Complaint</h2>
                <button class="modal-close" aria-label="Close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="newComplaintForm" class="profile-form">
                    <div class="form-group">
                        <label for="complaintDescription">Description</label>
                        <textarea id="complaintDescription" class="profile-input" rows="3" placeholder="Describe the issue..." required></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="complaintLatitude">Latitude</label>
                            <input type="number" step="0.000001" id="complaintLatitude" class="profile-input" placeholder="e.g. 12.971599" required>
                        </div>
                        <div class="form-group">
                            <label for="complaintLongitude">Longitude</label>
                            <input type="number" step="0.000001" id="complaintLongitude" class="profile-input" placeholder="e.g. 77.594566" required>
                        </div>
                    </div>
                    <div class="form-row" style="align-items:center; gap:1rem;">
                        <div class="form-group" style="display:flex; align-items:center; gap:0.5rem; margin:0;">
                            <input type="checkbox" id="complaintIsSOS">
                            <label for="complaintIsSOS" style="margin:0;">Mark as SOS</label>
                        </div>
                        <button type="button" class="btn-secondary" id="useLocationBtn">Use My Location</button>
                    </div>
                    <div class="profile-actions" style="margin-top:1rem;">
                        <button type="button" class="btn-secondary" id="newComplaintCancel">Cancel</button>
                        <button type="submit" class="action-btn" id="newComplaintSubmit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    // Styling (reuse modal style used elsewhere)
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.8); display: flex; align-items: center; justify-content: center;
        z-index: 2000; opacity: 0; transition: opacity 0.3s ease;
    `;
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: rgba(30, 41, 59, 0.95); backdrop-filter: blur(20px); border-radius: 16px; padding: 2rem;
        max-width: 640px; width: 92%; border: 1px solid rgba(51, 65, 85, 0.3); transform: scale(0.96); transition: transform 0.3s ease;
    `;
    const modalHeader = modal.querySelector('.modal-header');
    modalHeader.style.cssText = `
        display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid rgba(51,65,85,0.3);
    `;
    const modalClose = modal.querySelector('.modal-close');
    modalClose.style.cssText = `
        background: none; border: none; color: #94a3b8; font-size: 1.5rem; cursor: pointer; padding: 0.5rem; border-radius: 8px; transition: all 0.3s ease;
    `;

    document.body.appendChild(modal);
    setTimeout(() => { modal.style.opacity = '1'; modalContent.style.transform = 'scale(1)'; }, 10);

    function closeModal() {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.96)';
        setTimeout(() => modal.remove(), 300);
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    const form = modal.querySelector('#newComplaintForm');
    const submitBtn = modal.querySelector('#newComplaintSubmit');
    const cancelBtn = modal.querySelector('#newComplaintCancel');
    const useLocationBtn = modal.querySelector('#useLocationBtn');
    const latInput = modal.querySelector('#complaintLatitude');
    const lngInput = modal.querySelector('#complaintLongitude');

    cancelBtn.addEventListener('click', closeModal);
    useLocationBtn.addEventListener('click', () => tryUseGeolocation(latInput, lngInput));
    form.addEventListener('submit', (e) => { e.preventDefault(); submitNewComplaint(form, submitBtn, closeModal); });
}

async function submitNewComplaint(form, submitBtn, onSuccessClose) {
    const description = form.querySelector('#complaintDescription').value.trim();
    const latitude = form.querySelector('#complaintLatitude').value;
    const longitude = form.querySelector('#complaintLongitude').value;
    const isSOS = form.querySelector('#complaintIsSOS').checked;

    if (!description || latitude === '' || longitude === '') {
        alert('Please fill description, latitude and longitude.');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
        const res = await fetch('/api/complaints/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),
            },
            credentials: 'same-origin',
            body: JSON.stringify({ description, latitude, longitude, is_sos: isSOS })
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.detail || 'Failed to submit complaint');
        }
        const data = await res.json();
        // Success: animate, close, refresh complaints UI
        try { createSuccessParticles(submitBtn); } catch {}
        onSuccessClose && onSuccessClose();
        try { switchSection('complaints'); } catch {}
        try {
            complaintsData.unshift({
                id: data.id,
                title: description.slice(0, 32) || 'Complaint',
                location: `${latitude}, ${longitude}`,
                status: 'pending',
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                category: 'maintenance',
                description,
                thumbnail: ''
            });
            const allGrid = document.getElementById('allComplaintsGrid');
            if (allGrid) renderComplaintsToGrid(complaintsData, allGrid);
        } catch {}
    } catch (e) {
        alert(e.message || 'Could not submit complaint.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
    }
}

function tryUseGeolocation(latInput, lngInput) {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords;
            latInput.value = latitude.toFixed(6);
            lngInput.value = longitude.toFixed(6);
        },
        () => alert('Unable to retrieve your location.'),
        { enableHighAccuracy: true, timeout: 8000 }
    );
}
// Enhanced Rewards Functionality for the New Rewards Section

// Reward redemption function for the enhanced rewards section
function redeemReward(rewardId) {
    // Show confirmation dialog with enhanced styling
    const confirmModal = document.createElement('div');
    confirmModal.className = 'modal-overlay';
    confirmModal.innerHTML = `
        <div class="modal-content reward-confirm-modal">
            <div class="modal-header">
                <div class="reward-confirm-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9L16 14.74L17.18 21.02L12 18L6.82 21.02L8 14.74L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                    </svg>
                </div>
                <h2>Confirm Redemption</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to redeem this reward?</p>
                <div class="reward-confirm-details">
                    <div class="points-cost-display">Points Required: <span class="points-highlight">200</span></div>
                    <div class="points-remaining">Points After: <span class="points-highlight">250</span></div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary cancel-redeem">Cancel</button>
                <button class="action-btn confirm-redeem">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9L16 14.74L17.18 21.02L12 18L6.82 21.02L8 14.74L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                    </svg>
                    Redeem Now
                </button>
            </div>
        </div>
    `;

    // Add modal styles
    confirmModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const modalContent = confirmModal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95));
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 2rem;
        max-width: 400px;
        width: 90%;
        border: 2px solid rgba(255, 215, 0, 0.3);
        box-shadow: 0 20px 40px rgba(255, 215, 0, 0.2);
        transform: scale(0.9);
        transition: transform 0.3s ease;
        color: var(--charcoal-gray);
    `;

    document.body.appendChild(confirmModal);

    // Animate in
    setTimeout(() => {
        confirmModal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);

    // Close functionality
    function closeConfirmModal() {
        confirmModal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.9)';
        setTimeout(() => {
            confirmModal.remove();
        }, 300);
    }

    // Event listeners
    confirmModal.querySelector('.modal-close').addEventListener('click', closeConfirmModal);
    confirmModal.querySelector('.cancel-redeem').addEventListener('click', closeConfirmModal);
    confirmModal.addEventListener('click', (e) => {
        if (e.target === confirmModal) closeConfirmModal();
    });

    // Confirm redemption
    confirmModal.querySelector('.confirm-redeem').addEventListener('click', () => {
        processRewardRedemption(rewardId);
        closeConfirmModal();
    });
}

// Process the actual reward redemption
function processRewardRedemption(rewardId) {
    // Show processing animation
    const processingModal = document.createElement('div');
    processingModal.className = 'modal-overlay';
    processingModal.innerHTML = `
        <div class="modal-content processing-modal">
            <div class="processing-animation">
                <div class="reward-processing-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9L16 14.74L17.18 21.02L12 18L6.82 21.02L8 14.74L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                    </svg>
                </div>
                <h3>Processing Redemption...</h3>
                <div class="processing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `;

    // Add processing modal styles
    processingModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2001;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const processingContent = processingModal.querySelector('.modal-content');
    processingContent.style.cssText = `
        background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 102, 0, 0.1));
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 3rem;
        text-align: center;
        border: 2px solid rgba(255, 215, 0, 0.3);
        color: white;
    `;

    document.body.appendChild(processingModal);

    // Animate in
    setTimeout(() => {
        processingModal.style.opacity = '1';
    }, 10);

    // Simulate API call and show success
    setTimeout(() => {
        processingModal.remove();
        showRedemptionSuccess(rewardId);
        
        // Update the rewards section to reflect the redemption
        updateRewardsAfterRedemption(rewardId);
    }, 2000);
}

// Show redemption success animation
function showRedemptionSuccess(rewardId) {
    const successModal = document.createElement('div');
    successModal.className = 'modal-overlay';
    successModal.innerHTML = `
        <div class="modal-content success-modal">
            <div class="success-animation">
                <div class="success-checkmark">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h2>🎉 Redemption Successful!</h2>
                <p>Your reward has been successfully redeemed. You'll receive further instructions via email.</p>
                <button class="action-btn success-close">
                    <span>Awesome!</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9L16 14.74L17.18 21.02L12 18L6.82 21.02L8 14.74L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>
    `;

    // Add success modal styles
    successModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2001;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const successContent = successModal.querySelector('.modal-content');
    successContent.style.cssText = `
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(34, 197, 94, 0.95));
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 3rem;
        text-align: center;
        border: 2px solid rgba(16, 185, 129, 0.5);
        color: white;
        max-width: 400px;
        width: 90%;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(successModal);

    // Animate in
    setTimeout(() => {
        successModal.style.opacity = '1';
        successContent.style.transform = 'scale(1)';
    }, 10);

    // Create celebration particles
    createCelebrationParticles();

    // Close functionality
    function closeSuccessModal() {
        successModal.style.opacity = '0';
        successContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            successModal.remove();
        }, 300);
    }

    successModal.querySelector('.success-close').addEventListener('click', closeSuccessModal);
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) closeSuccessModal();
    });

    // Auto close after 5 seconds
    setTimeout(closeSuccessModal, 5000);
}

// Create celebration particles effect
function createCelebrationParticles() {
    const colors = ['#ffd700', '#ff6b00', '#10b981', '#3b82f6', '#8b5cf6'];
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 2002;
            left: 50%;
            top: 50%;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 50;
        const velocity = 100 + Math.random() * 100;
        const gravity = 0.5;
        
        particle.animate([
            { 
                transform: 'translate(-50%, -50%) scale(0)', 
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * velocity - 50}px, ${Math.sin(angle) * velocity - 50}px) scale(1)`, 
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * velocity * 1.5 - 50}px, ${Math.sin(angle) * velocity * 1.5 + 200 - 50}px) scale(0)`, 
                opacity: 0 
            }
        ], {
            duration: 2000 + Math.random() * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            delay: Math.random() * 200
        }).onfinish = () => {
            particle.remove();
        };
    }
}

// Update rewards section after redemption
function updateRewardsAfterRedemption(rewardId) {
    // Update points display
    const pointsValue = document.querySelector('.points-value');
    if (pointsValue) {
        const currentPoints = parseInt(pointsValue.textContent.replace(/,/g, ''));
        const newPoints = currentPoints - 200; // Assuming 200 points were redeemed
        pointsValue.textContent = newPoints.toLocaleString();
        
        // Animate the points change
        pointsValue.style.transform = 'scale(1.2)';
        pointsValue.style.color = '#ef4444';
        setTimeout(() => {
            pointsValue.style.transform = 'scale(1)';
            pointsValue.style.color = '';
        }, 300);
    }

    // Update available balance in stats
    const availableBalance = document.querySelector('.reward-stat-card.available .stat-value-reward');
    if (availableBalance) {
        const currentBalance = parseInt(availableBalance.textContent);
        const newBalance = currentBalance - 200;
        availableBalance.textContent = newBalance;
        
        // Animate the balance change
        availableBalance.style.transform = 'scale(1.1)';
        availableBalance.style.color = '#ef4444';
        setTimeout(() => {
            availableBalance.style.transform = 'scale(1)';
            availableBalance.style.color = '';
        }, 300);
    }

    // Update redeemed points in stats
    const redeemedPoints = document.querySelector('.reward-stat-card.redeemed .stat-value-reward');
    if (redeemedPoints) {
        const currentRedeemed = parseInt(redeemedPoints.textContent);
        const newRedeemed = currentRedeemed + 200;
        redeemedPoints.textContent = newRedeemed;
        
        // Animate the redeemed change
        redeemedPoints.style.transform = 'scale(1.1)';
        redeemedPoints.style.color = '#10b981';
        setTimeout(() => {
            redeemedPoints.style.transform = 'scale(1)';
            redeemedPoints.style.color = '';
        }, 300);
    }

    // Add a new activity item to the timeline
    const activityTimeline = document.querySelector('.activity-timeline');
    if (activityTimeline) {
        const newActivity = document.createElement('div');
        newActivity.className = 'activity-item redeemed';
        newActivity.innerHTML = `
            <div class="activity-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="activity-content">
                <h5>Reward Redeemed</h5>
                <p>Successfully redeemed reward</p>
                <span class="activity-time">Just now</span>
            </div>
            <div class="activity-points redeemed">-200</div>
        `;
        
        // Insert at the beginning
        activityTimeline.insertBefore(newActivity, activityTimeline.firstChild);
        
        // Animate the new activity
        newActivity.style.opacity = '0';
        newActivity.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            newActivity.style.transition = 'all 0.4s ease';
            newActivity.style.opacity = '1';
            newActivity.style.transform = 'translateX(0)';
        }, 100);
    }
}

// Enhanced rewards filter functionality
function filterRewards(category) {
    const rewardCards = document.querySelectorAll('.reward-card');
    
    rewardCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const shouldShow = category === 'all' || cardCategory === category;
        
        if (shouldShow) {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 200);
        }
    });
    
    // Update filter select appearance
    const filterSelect = document.getElementById('rewardsFilter');
    if (filterSelect) {
        filterSelect.style.transform = 'scale(1.05)';
        setTimeout(() => {
            filterSelect.style.transform = 'scale(1)';
        }, 150);
    }
}

// Add event listener for rewards filter
document.addEventListener('change', (e) => {
    if (e.target.id === 'rewardsFilter') {
        filterRewards(e.target.value);
    }
});

// Enhanced achievement unlock animation
function unlockAchievement(achievementId) {
    const achievementCard = document.querySelector(`[data-achievement-id="${achievementId}"]`);
    if (!achievementCard) return;
    
    // Add unlock animation
    achievementCard.classList.remove('locked');
    achievementCard.classList.add('unlocked');
    
    // Create unlock effect
    const unlockEffect = document.createElement('div');
    unlockEffect.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent, rgba(255, 215, 0, 0.3), transparent);
        border-radius: 16px;
        pointer-events: none;
        z-index: 1;
    `;
    
    achievementCard.style.position = 'relative';
    achievementCard.appendChild(unlockEffect);
    
    // Animate the unlock effect
    unlockEffect.animate([
        { transform: 'translateX(-100%)', opacity: 0 },
        { transform: 'translateX(0%)', opacity: 1 },
        { transform: 'translateX(100%)', opacity: 0 }
    ], {
        duration: 800,
        easing: 'ease-out'
    }).onfinish = () => {
        unlockEffect.remove();
    };
    
    // Show achievement unlock notification
    showAchievementNotification(achievementId);
}

// Show achievement unlock notification
function showAchievementNotification(achievementId) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-notification-content">
            <div class="achievement-notification-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="achievement-notification-text">
                <h4>Achievement Unlocked!</h4>
                <p>You've earned a new achievement</p>
            </div>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, rgba(255, 215, 0, 0.95), rgba(255, 102, 0, 0.95));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3);
        z-index: 2000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        cursor: pointer;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// Initialize enhanced rewards functionality
function initEnhancedRewards() {
    // Add hover effects to reward cards
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.reward-card')) {
            const card = e.target.closest('.reward-card');
            const icon = card.querySelector('.reward-icon-large');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        }
        
        if (e.target.closest('.achievement-card')) {
            const card = e.target.closest('.achievement-card');
            const icon = card.querySelector('.achievement-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.reward-card')) {
            const card = e.target.closest('.reward-card');
            const icon = card.querySelector('.reward-icon-large');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        }
        
        if (e.target.closest('.achievement-card')) {
            const card = e.target.closest('.achievement-card');
            const icon = card.querySelector('.achievement-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        }
    });
}

// Add to the existing initialization
document.addEventListener('DOMContentLoaded', () => {
    initEnhancedRewards();
});

// Export functions for global access
window.redeemReward = redeemReward;
window.filterRewards = filterRewards;
window.unlockAchievement = unlockAchievement;
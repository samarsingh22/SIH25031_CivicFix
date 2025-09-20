// Authority Dashboard JavaScript - Professional Interactive Dashboard

// Sample Data for Authority Dashboard
const assignedComplaints = [
    {
        id: "CF-101",
        title: "Pothole near Sector 5 Road",
        location: "Salt Lake, Kolkata",
        category: "roads",
        priority: "high",
        status: "pending",
        date: "2024-08-12",
        assignedTo: "John Doe",
        description: "Large pothole causing vehicle damage and traffic disruption. Immediate repair needed.",
        citizenName: "Sarah Johnson",
        citizenPhone: "+91 98765 43210"
    },
    {
        id: "CF-102",
        title: "Streetlight not working",
        location: "Park Street",
        category: "lights",
        priority: "medium",
        status: "progress",
        date: "2024-08-14",
        assignedTo: "Mike Wilson",
        description: "Multiple streetlights are not working, causing safety concerns for pedestrians.",
        citizenName: "Robert Chen",
        citizenPhone: "+91 98765 43211"
    },
    {
        id: "CF-103",
        title: "Garbage overflow at Block B",
        location: "Howrah",
        category: "garbage",
        priority: "low",
        status: "resolved",
        date: "2024-08-15",
        assignedTo: "Lisa Davis",
        description: "Garbage bins overflowing, causing hygiene issues in the residential area.",
        citizenName: "Maria Rodriguez",
        citizenPhone: "+91 98765 43212"
    },
    {
        id: "CF-104",
        title: "Water pipe burst in Commercial Area",
        location: "Commercial District, Building 45",
        category: "water",
        priority: "high",
        status: "progress",
        date: "2024-08-16",
        assignedTo: "David Brown",
        description: "Major water pipe burst causing flooding and water supply disruption.",
        citizenName: "James Wilson",
        citizenPhone: "+91 98765 43213"
    },
    {
        id: "CF-105",
        title: "Park bench vandalism",
        location: "Central Park, Zone A",
        category: "maintenance",
        priority: "low",
        status: "pending",
        date: "2024-08-18",
        assignedTo: "Emily Johnson",
        description: "Several park benches vandalized with graffiti, need cleaning and repair.",
        citizenName: "Alex Thompson",
        citizenPhone: "+91 98765 43214"
    },
    {
        id: "CF-106",
        title: "Traffic signal malfunction",
        location: "Highway Junction, Exit 7",
        category: "lights",
        priority: "high",
        status: "pending",
        date: "2024-08-20",
        assignedTo: "John Doe",
        description: "Traffic signal stuck on red, causing major traffic congestion.",
        citizenName: "Jennifer Lee",
        citizenPhone: "+91 98765 43215"
    }
];

const teamMembers = [
    {
        id: 1,
        name: "John Doe",
        role: "Senior Technician",
        email: "john.doe@civicfix.com",
        assignedCount: 12,
        avatar: "JD",
        specialization: "Electrical & Lighting"
    },
    {
        id: 2,
        name: "Mike Wilson",
        role: "Road Maintenance Lead",
        email: "mike.wilson@civicfix.com",
        assignedCount: 8,
        avatar: "MW",
        specialization: "Roads & Pavements"
    },
    {
        id: 3,
        name: "Lisa Davis",
        role: "Waste Management Supervisor",
        email: "lisa.davis@civicfix.com",
        assignedCount: 15,
        avatar: "LD",
        specialization: "Waste & Recycling"
    },
    {
        id: 4,
        name: "David Brown",
        role: "Water Systems Engineer",
        email: "david.brown@civicfix.com",
        assignedCount: 6,
        avatar: "DB",
        specialization: "Water & Drainage"
    },
    {
        id: 5,
        name: "Emily Johnson",
        role: "Parks & Recreation Officer",
        email: "emily.johnson@civicfix.com",
        assignedCount: 10,
        avatar: "EJ",
        specialization: "Parks & Green Spaces"
    }
];

const analyticsData = {
    totalComplaints: 156,
    pendingComplaints: 42,
    inProgressComplaints: 28,
    resolvedComplaints: 86,
    avgResolutionTime: 4.2,
    resolutionRate: 85,
    citizenSatisfaction: 92
};

// Category Icons
const categoryIcons = {
    roads: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/></svg>`,
    lights: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" fill="currentColor"/></svg>`,
    garbage: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 6H21M8 6V4C8 2.9 8.9 2 10 2H14C15.1 2 16 2.9 16 4V6M19 6V20C19 21.1 18.1 22 17 22H7C5.9 22 5 21.1 5 20V6H19Z" stroke="currentColor" stroke-width="2"/></svg>`,
    water: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2.69L17.71 8.4C18.37 9.06 18.37 10.12 17.71 10.78L12 16.49L6.29 10.78C5.63 10.12 5.63 9.06 6.29 8.4L12 2.69Z" fill="currentColor"/></svg>`,
    maintenance: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22.7 19L13.6 9.9C14.5 7.6 14 4.9 12.1 3C10.1 1 7.1 0.6 4.7 1.7L9 6L6 9L1.6 4.7C0.4 7.1 0.9 10.1 2.9 12.1C4.8 14 7.5 14.5 9.8 13.6L18.9 22.7C19.3 23.1 19.9 23.1 20.3 22.7L22.6 20.4C23.1 20 23.1 19.3 22.7 19Z" fill="currentColor"/></svg>`
};

// DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mainContent = document.getElementById('mainContent');
const mobileOverlay = document.getElementById('mobileOverlay');

// Initialize Dashboard
function initDashboard() {
    initNavigation();
    loadAssignedComplaints();
    setupEventListeners();
}

// Navigation Functions
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Skip logout link
            if (link.classList.contains('logout')) {
                return;
            }
            
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
}

function loadSectionContent(sectionName) {
    switch (sectionName) {
        case 'assigned':
            loadAssignedComplaints();
            break;
        case 'analytics':
            loadAnalytics();
            break;
        case 'team':
            loadTeamManagement();
            break;
    }
}

// Sidebar Toggle
function toggleSidebar() {
    sidebar.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    createRipple(sidebarToggle);
}

// Assigned Complaints Functions
function loadAssignedComplaints() {
    const container = document.getElementById('assignedComplaintsGrid');
    if (!container) return;
    
    renderComplaintsGrid(assignedComplaints, container);
}

function renderComplaintsGrid(complaints, container) {
    container.innerHTML = complaints.map(complaint => `
        <div class="complaint-card fade-in" onclick="openComplaintModal('${complaint.id}')">
            <div class="complaint-header">
                <div class="complaint-info">
                    <h3>${complaint.title}</h3>
                    <div class="complaint-location">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="currentColor"/>
                        </svg>
                        ${complaint.location}
                    </div>
                </div>
                <div class="complaint-priority priority-${complaint.priority}">
                    ${complaint.priority.toUpperCase()}
                </div>
            </div>
            
            <div class="complaint-meta">
                <div class="complaint-category">
                    ${categoryIcons[complaint.category]}
                    ${complaint.category.charAt(0).toUpperCase() + complaint.category.slice(1)}
                </div>
                <div class="complaint-date">${formatDate(complaint.date)}</div>
                <div class="complaint-id">${complaint.id}</div>
            </div>
            
            <div class="complaint-status status-${complaint.status}">
                ${getStatusText(complaint.status)}
            </div>
            
            <p class="complaint-description">${complaint.description}</p>
            
            <div class="complaint-actions">
                ${complaint.status === 'pending' ? 
                    `<button class="action-btn primary" onclick="updateComplaintStatus('${complaint.id}', 'progress', event)">
                        Start Progress
                    </button>` : 
                    complaint.status === 'progress' ?
                    `<button class="action-btn primary" onclick="updateComplaintStatus('${complaint.id}', 'resolved', event)">
                        Mark Resolved
                    </button>` :
                    `<button class="action-btn secondary" disabled>
                        Resolved
                    </button>`
                }
                <button class="action-btn secondary" onclick="openComplaintModal('${complaint.id}', event)">
                    View Details
                </button>
            </div>
        </div>
    `).join('');
}

// Analytics Functions
function loadAnalytics() {
    updateMetrics();
    setTimeout(() => {
        createCharts();
    }, 300);
}

function updateMetrics() {
    const avgResolutionTime = document.getElementById('avgResolutionTime');
    const resolutionRate = document.getElementById('resolutionRate');
    const citizenSatisfaction = document.getElementById('citizenSatisfaction');
    
    if (avgResolutionTime) {
        animateCounter(avgResolutionTime, 0, analyticsData.avgResolutionTime, 1000);
    }
    if (resolutionRate) {
        animateCounter(resolutionRate, 0, analyticsData.resolutionRate, 1000, '%');
    }
    if (citizenSatisfaction) {
        animateCounter(citizenSatisfaction, 0, analyticsData.citizenSatisfaction, 1000, '%');
    }
}

function createCharts() {
    createComplaintsChart();
    createCategoryChart();
    createTimelineChart();
}

function createComplaintsChart() {
    const canvas = document.getElementById('complaintsChart');
    if (!canvas) return;
    
    const container = canvas.parentElement;
    container.innerHTML = `
        <div class="chart-placeholder">
            <div style="display: flex; justify-content: space-around; align-items: end; height: 150px; padding: 20px;">
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 40px; height: ${(analyticsData.totalComplaints / 200) * 100}px; background: #3b82f6; margin-bottom: 10px; border-radius: 4px;"></div>
                    <span style="font-size: 12px; color: rgba(255,255,255,0.7);">Total</span>
                    <span style="font-size: 14px; font-weight: 600; color: white;">${analyticsData.totalComplaints}</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 40px; height: ${(analyticsData.pendingComplaints / 200) * 100}px; background: #f59e0b; margin-bottom: 10px; border-radius: 4px;"></div>
                    <span style="font-size: 12px; color: rgba(255,255,255,0.7);">Pending</span>
                    <span style="font-size: 14px; font-weight: 600; color: white;">${analyticsData.pendingComplaints}</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 40px; height: ${(analyticsData.inProgressComplaints / 200) * 100}px; background: #60a5fa; margin-bottom: 10px; border-radius: 4px;"></div>
                    <span style="font-size: 12px; color: rgba(255,255,255,0.7);">Progress</span>
                    <span style="font-size: 14px; font-weight: 600; color: white;">${analyticsData.inProgressComplaints}</span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="width: 40px; height: ${(analyticsData.resolvedComplaints / 200) * 100}px; background: #10b981; margin-bottom: 10px; border-radius: 4px;"></div>
                    <span style="font-size: 12px; color: rgba(255,255,255,0.7);">Resolved</span>
                    <span style="font-size: 14px; font-weight: 600; color: white;">${analyticsData.resolvedComplaints}</span>
                </div>
            </div>
        </div>
    `;
}

function createCategoryChart() {
    const canvas = document.getElementById('categoryChart');
    if (!canvas) return;
    
    const container = canvas.parentElement;
    const categories = ['roads', 'lights', 'garbage', 'water', 'maintenance'];
    const counts = [35, 28, 31, 22, 40];
    const total = counts.reduce((a, b) => a + b, 0);
    
    container.innerHTML = `
        <div class="chart-placeholder">
            <div style="display: flex; flex-direction: column; gap: 15px; padding: 20px;">
                ${categories.map((category, index) => {
                    const percentage = Math.round((counts[index] / total) * 100);
                    return `
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <div style="display: flex; align-items: center; gap: 8px; min-width: 100px;">
                                ${categoryIcons[category]}
                                <span style="font-size: 12px; color: rgba(255,255,255,0.8); text-transform: capitalize;">${category}</span>
                            </div>
                            <div style="flex: 1; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                                <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%); border-radius: 4px;"></div>
                            </div>
                            <span style="font-size: 12px; color: white; font-weight: 600; min-width: 40px;">${counts[index]}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function createTimelineChart() {
    const canvas = document.getElementById('timelineChart');
    if (!canvas) return;
    
    const container = canvas.parentElement;
    const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
    const complaints = [55, 49, 63, 58, 52, 47];
    const resolved = [47, 42, 54, 49, 44, 38];
    const maxValue = Math.max(...complaints, ...resolved);
    
    container.innerHTML = `
        <div class="chart-placeholder">
            <div style="display: flex; justify-content: space-between; align-items: end; height: 150px; padding: 20px;">
                ${months.map((month, index) => `
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                        <div style="display: flex; gap: 2px; align-items: end;">
                            <div style="width: 12px; height: ${(complaints[index] / maxValue) * 100}px; background: #f59e0b; border-radius: 2px;"></div>
                            <div style="width: 12px; height: ${(resolved[index] / maxValue) * 100}px; background: #10b981; border-radius: 2px;"></div>
                        </div>
                        <span style="font-size: 10px; color: rgba(255,255,255,0.7);">${month}</span>
                    </div>
                `).join('')}
            </div>
            <div style="display: flex; justify-content: center; gap: 20px; margin-top: 10px;">
                <div style="display: flex; align-items: center; gap: 5px;">
                    <div style="width: 12px; height: 12px; background: #f59e0b; border-radius: 2px;"></div>
                    <span style="font-size: 12px; color: rgba(255,255,255,0.7);">Complaints</span>
                </div>
                <div style="display: flex; align-items: center; gap: 5px;">
                    <div style="width: 12px; height: 12px; background: #10b981; border-radius: 2px;"></div>
                    <span style="font-size: 12px; color: rgba(255,255,255,0.7);">Resolved</span>
                </div>
            </div>
        </div>
    `;
}

// Team Management Functions
function loadTeamManagement() {
    const container = document.getElementById('teamGrid');
    if (!container) return;
    
    container.innerHTML = teamMembers.map(member => `
        <div class="team-card fade-in">
            <div class="team-avatar">${member.avatar}</div>
            <h3 class="team-name">${member.name}</h3>
            <p class="team-role">${member.role}</p>
            <p class="team-email">${member.email}</p>
            
            <div class="team-stats">
                <div class="team-stat">
                    <div class="team-stat-value">${member.assignedCount}</div>
                    <div class="team-stat-label">Assigned</div>
                </div>
                <div class="team-stat">
                    <div class="team-stat-value">${member.specialization.split(' ')[0]}</div>
                    <div class="team-stat-label">Specialty</div>
                </div>
            </div>
            
            <div class="team-actions">
                <button class="action-btn primary" onclick="assignComplaint(${member.id})">
                    Assign Task
                </button>
                <button class="action-btn secondary" onclick="viewMemberDetails(${member.id})">
                    View Details
                </button>
            </div>
        </div>
    `).join('');
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
}

function getStatusText(status) {
    switch (status) {
        case 'pending': return 'Pending';
        case 'progress': return 'In Progress';
        case 'resolved': return 'Resolved';
        default: return 'Unknown';
    }
}

// Interactive Functions
function updateComplaintStatus(complaintId, newStatus, event) {
    if (event) {
        event.stopPropagation();
    }
    
    const complaint = assignedComplaints.find(c => c.id === complaintId);
    if (complaint) {
        complaint.status = newStatus;
        loadAssignedComplaints();
        
        // Show success animation
        createSuccessParticles(event.target);
        
        // Show notification
        showNotification(`Complaint ${complaintId} status updated to ${getStatusText(newStatus)}`, 'success');
    }
}

function filterComplaints() {
    const priorityFilter = document.getElementById('priorityFilter');
    const statusFilter = document.getElementById('statusFilter');
    const container = document.getElementById('assignedComplaintsGrid');
    
    if (!priorityFilter || !statusFilter || !container) return;
    
    let filteredComplaints = assignedComplaints;
    
    if (priorityFilter.value !== 'all') {
        filteredComplaints = filteredComplaints.filter(c => c.priority === priorityFilter.value);
    }
    
    if (statusFilter.value !== 'all') {
        filteredComplaints = filteredComplaints.filter(c => c.status === statusFilter.value);
    }
    
    renderComplaintsGrid(filteredComplaints, container);
}

function openComplaintModal(complaintId, event) {
    if (event) {
        event.stopPropagation();
    }
    
    const complaint = assignedComplaints.find(c => c.id === complaintId);
    if (!complaint) return;
    
    const modal = document.getElementById('complaintModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = complaint.title;
    modalBody.innerHTML = `
        <div style="display: grid; gap: 1rem;">
            <div><strong>Complaint ID:</strong> ${complaint.id}</div>
            <div><strong>Location:</strong> ${complaint.location}</div>
            <div><strong>Category:</strong> ${complaint.category.charAt(0).toUpperCase() + complaint.category.slice(1)}</div>
            <div><strong>Priority:</strong> ${complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}</div>
            <div><strong>Status:</strong> ${getStatusText(complaint.status)}</div>
            <div><strong>Date Reported:</strong> ${formatDate(complaint.date)}</div>
            <div><strong>Assigned To:</strong> ${complaint.assignedTo}</div>
            <div><strong>Citizen:</strong> ${complaint.citizenName}</div>
            <div><strong>Contact:</strong> ${complaint.citizenPhone}</div>
            <div><strong>Description:</strong> ${complaint.description}</div>
        </div>
    `;
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeModal() {
    const modal = document.getElementById('complaintModal');
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
}

// Animation Functions
function createRipple(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function animateCounter(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = start + (end - start) * progress;
        
        element.textContent = Math.round(current * 10) / 10 + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function createSuccessParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'success-particle';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.setProperty('--random-x', (Math.random() - 0.5) * 100 + 'px');
        particle.style.setProperty('--random-y', (Math.random() - 0.5) * 100 + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 800);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 0.5rem;
        padding: 1rem 1.5rem;
        color: white;
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 10);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Team Management Functions
function assignComplaint(memberId) {
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
        showNotification(`New complaint assigned to ${member.name}`, 'success');
        createSuccessParticles(event.target);
    }
}

function viewMemberDetails(memberId) {
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
        showNotification(`Viewing details for ${member.name}`, 'info');
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Mobile overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        });
    }
    
    // Filter listeners
    document.addEventListener('change', (e) => {
        if (e.target.id === 'priorityFilter' || e.target.id === 'statusFilter') {
            filterComplaints();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
        
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            toggleSidebar();
        }
    });
    
    // Window resize handler
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            mobileOverlay.classList.remove('active');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);

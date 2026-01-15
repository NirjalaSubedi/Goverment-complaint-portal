// Officer Dashboard Language Toggle
// Load language preference from localStorage, default to 'en'
let currentLanguage = localStorage.getItem('currentLanguage') || 'en';

const officerTranslations = {
    'en': {
        languageToggle: 'नेपाली',
        title: 'Nikaas',
        role: 'Officer',
        
        // Notifications
        notifications: 'Notifications',
        markAllRead: 'Mark all as read',
        noNotifications: 'No notifications yet',
        
        // Profile Dropdown
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Logout',
        logoutSuccess: 'Account logout successfully!',
        
        // Navigation
        allComplaints: 'All Complaints',
        assignedMe: 'Assigned Me',
        pending: 'Pending',
        completed: 'Completed',
        
        // Main Dashboard
        sort: 'Sort',
        
        // Table Headers
        complaint: 'COMPLAINT',
        status: 'STATUS',
        priority: 'PRIORITY',
        date: 'DATE',
        actions: 'ACTIONS',
        
        // Completed Section
        completedTasks: 'Completed Tasks',
        completedDesc: 'View all successfully resolved complaints',
        completedComplaints: 'Completed Complaints',
        
        // Common
        viewDetails: 'View Details',
        noComplaintsFound: 'No complaints found',
        
        // Profile Modal
        profileInformation: 'Profile Information',
        fullName: 'Full Name',
        email: 'Email',
        userType: 'User Type',
        department: 'Department',
        userId: 'User ID'
    },
    'ne': {
        languageToggle: 'English',
        title: 'निकास',
        role: 'अधिकृत',
        
        // Notifications
        notifications: 'सूचनाहरू',
        markAllRead: 'सबै पढिसकेको चिन्ह लगाउनुहोस्',
        noNotifications: 'कुनै सूचना छैन',
        
        // Profile Dropdown
        profile: 'प्रोफाइल',
        settings: 'सेटिङ्हरू',
        logout: 'लगआउट',
        logoutSuccess: 'खाता सफलतापूर्वक लगआउट भयो!',
        
        // Navigation
        allComplaints: 'सबै गुनासोहरू',
        assignedMe: 'मलाई तोकिएको',
        pending: 'बाँकी',
        completed: 'पूरा भएको',
        
        // Main Dashboard
        sort: 'क्रमबद्ध',
        
        // Table Headers
        complaint: 'गुनासो',
        status: 'स्थिति',
        priority: 'प्राथमिकता',
        date: 'मिति',
        actions: 'कार्यहरू',
        
        // Completed Section
        completedTasks: 'पूरा भएका कार्यहरू',
        completedDesc: 'सफलतापूर्वक समाधान भएका सबै गुनासोहरू हेर्नुहोस्',
        completedComplaints: 'पूरा भएका गुनासोहरू',
        
        // Common
        viewDetails: 'विवरण हेर्नुहोस्',
        noComplaintsFound: 'कुनै गुनासो फेला परेन',
        
        // Profile Modal
        profileInformation: 'प्रोफाइल जानकारी',
        fullName: 'पूरा नाम',
        email: 'इमेल',
        userType: 'प्रयोगकर्ता प्रकार',
        department: 'विभाग',
        userId: 'प्रयोगकर्ता आईडी'
    }
};

// Function to update profile modal labels
function updateProfileModalLabels() {
    const lang = officerTranslations[currentLanguage];
    const profileLabels = document.querySelectorAll('.profile-field label');
    if (profileLabels.length >= 5) {
        profileLabels[0].textContent = lang.fullName;
        profileLabels[1].textContent = lang.email;
        profileLabels[2].textContent = lang.userType;
        profileLabels[3].textContent = lang.department;
        profileLabels[4].textContent = lang.userId;
    }
    const profileModalHeader = document.querySelector('.profile-modal-header h2');
    if (profileModalHeader) profileModalHeader.textContent = lang.profileInformation;
}

// Function to update page content
function updateOfficerContent() {
    const lang = officerTranslations[currentLanguage];
    
    // Update language toggle button
    const langBtn = document.getElementById('language-toggle');
    if (langBtn) {
        langBtn.innerHTML = `<i class="material-icons">language</i> ${lang.languageToggle}`;
    }
    
    // Update header
    const title = document.querySelector('.Heading1');
    if (title) title.textContent = lang.title;
    
    const role = document.querySelector('.role');
    if (role) role.textContent = lang.role;
    
    // Update notification dropdown
    const notificationHeader = document.querySelector('.notification-header span');
    if (notificationHeader) notificationHeader.textContent = lang.notifications;
    
    const markAllReadBtn = document.querySelector('.mark-all-read');
    if (markAllReadBtn) markAllReadBtn.textContent = lang.markAllRead;
    
    // Update profile dropdown
    const profileLinks = document.querySelectorAll('.dropdown-text');
    if (profileLinks[0]) profileLinks[0].textContent = lang.profile;
    if (profileLinks[1]) profileLinks[1].textContent = lang.settings;
    if (profileLinks[2]) {
        const logoutLink = profileLinks[2];
        const onclickAttr = logoutLink.getAttribute('onclick');
        if (onclickAttr) {
            const newOnclick = onclickAttr.replace(/alert\('.*?'\)/, `alert('${lang.logoutSuccess}')`);
            logoutLink.setAttribute('onclick', newOnclick);
        }
        logoutLink.textContent = lang.logout;
    }
    
    // Update navigation
    const myComplaints = document.querySelector('.myComplaints');
    if (myComplaints) myComplaints.textContent = lang.allComplaints;
    
    const assignedToMe = document.querySelector('.assignedtome');
    if (assignedToMe) assignedToMe.textContent = lang.assignedMe;
    
    const pendingTasks = document.querySelectorAll('.pendingtask1');
    pendingTasks.forEach(el => {
        if (el) el.textContent = lang.pending;
    });
    
    const completedTasks = document.querySelectorAll('.completed1');
    completedTasks.forEach(el => {
        if (el) el.textContent = lang.completed;
    });
    
    // Update sort button
    const sortText = document.querySelector('.sortText');
    if (sortText) sortText.textContent = lang.sort;
    
    // Update table headers
    const tableHeaders = document.querySelectorAll('.ComplaintHeader1 th');
    if (tableHeaders.length >= 5) {
        tableHeaders[0].textContent = lang.complaint;
        tableHeaders[1].textContent = lang.status;
        tableHeaders[2].textContent = lang.priority;
        tableHeaders[3].textContent = lang.date;
        tableHeaders[4].textContent = lang.actions;
    }
    
    // Update completed section
    const completedHeading = document.querySelector('.completed-officer-section .myComplaintsText');
    if (completedHeading) completedHeading.textContent = lang.completedTasks;
    
    const completedDesc = document.querySelector('#complainttopdesc');
    if (completedDesc) completedDesc.textContent = lang.completedDesc;
    
    const completedTableHeading = document.querySelector('.completed-officer-section .myComplaintsText1');
    if (completedTableHeading) completedTableHeading.textContent = lang.completedComplaints;
    
    // Update "All Complaints" heading
    const allComplaintsHeading = document.querySelectorAll('.myComplaintsText1');
    if (allComplaintsHeading[0]) allComplaintsHeading[0].textContent = lang.allComplaints;
    
    // Update Profile Modal
    updateProfileModalLabels();
}

// Function to toggle language
function LanguageTranslate() {
    currentLanguage = currentLanguage === 'en' ? 'ne' : 'en';
    localStorage.setItem('currentLanguage', currentLanguage);
    updateOfficerContent();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateOfficerContent();
    
    // Watch for profile modal changes
    const profileModal = document.getElementById('profileModal');
    if (profileModal) {
        // Use MutationObserver to detect when modal display style changes
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'style') {
                    // Update labels every time modal style changes (when it's shown)
                    updateProfileModalLabels();
                }
            });
        });
        
        observer.observe(profileModal, {
            attributes: true,
            attributeFilter: ['style']
        });
    }
});

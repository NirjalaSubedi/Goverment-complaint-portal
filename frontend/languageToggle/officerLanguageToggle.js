// Officer Dashboard Language Toggle
// Load language preference from localStorage, default to 'en'
let currentLanguage = localStorage.getItem('officerLanguage') || 'en';

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
        noComplaintsFound: 'No complaints found'
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
        noComplaintsFound: 'कुनै गुनासो फेला परेन'
    }
};

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
      if (allComplaintsHeading[0]) allComplaintsHeading[0].textContent = lang.allComplaints;
}

// Function to toggle language
function LanguageTranslate() {
    currentLanguage = currentLanguage === 'en' ? 'ne' : 'en';
    localStorage.setItem('officerLanguage', currentLanguage);
    updateOfficerContent();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateOfficerContent();
});

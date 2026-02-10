// Officer Dashboard Language Toggle
// Load language preference from localStorage, default to 'en'
let currentLanguage = localStorage.getItem('currentLanguage') || 'ne';

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
        noAssignedComplaints: 'No assigned complaints',
        noPendingComplaints: 'No pending complaints',
        noCompletedComplaints: 'No completed complaints yet',
        completedTasksHint: 'Completed tasks will appear here',
        review: 'Review',
        approve: 'Approve',
        reject: 'Reject',
        assignedToMe: 'Assigned to me',
        rejectReasonPrompt: 'Please enter a rejection reason:',
        rejectReasonRequired: 'Rejection reason is required.',
        rejectReasonTitle: 'Rejection Reason',
        rejectReasonPlaceholder: 'Write why this complaint is being rejected...',
        submitReject: 'Reject Complaint',
        cancelReject: 'Cancel',

        // Status labels
        statusPending: 'Pending',
        statusInProgress: 'In Progress',
        statusResolved: 'Resolved',
        statusCompleted: 'Completed',
        statusRejected: 'Rejected',

        // Priority labels
        priorityHigh: 'High',
        priorityMedium: 'Medium',
        priorityLow: 'Low',
        
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
        noAssignedComplaints: 'मलाई तोकिएको गुनासो छैन',
        noPendingComplaints: 'कुनै बाँकी गुनासो छैन',
        noCompletedComplaints: 'अहिलेसम्म कुनै पूरा भएका गुनासो छैन',
        completedTasksHint: 'पूरा भएका कार्यहरू यहाँ देखिनेछन्',
        review: 'समीक्षा',
        approve: 'स्वीकृत',
        reject: 'अस्वीकृत',
        assignedToMe: 'मलाई तोकिएको',
        rejectReasonPrompt: 'अस्वीकृत गर्ने कारण लेख्नुहोस्:',
        rejectReasonRequired: 'अस्वीकृत गर्ने कारण आवश्यक छ।',
        rejectReasonTitle: 'अस्वीकृत कारण',
        rejectReasonPlaceholder: 'अस्वीकृत गर्नुको कारण लेख्नुहोस्...',
        submitReject: 'गुनासो अस्वीकार गर्नुहोस्',
        cancelReject: 'रद्द गर्नुहोस्',

        // Status labels
        statusPending: 'बाँकी',
        statusInProgress: 'प्रगतिमा',
        statusResolved: 'समाधान भयो',
        statusCompleted: 'पूरा भयो',
        statusRejected: 'अस्वीकृत',

        // Priority labels
        priorityHigh: 'उच्च',
        priorityMedium: 'मध्यम',
        priorityLow: 'कम',
        
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
    const storedLang = localStorage.getItem('currentLanguage');
    if (storedLang) currentLanguage = storedLang;
    const lang = officerTranslations[currentLanguage] || officerTranslations.en;
    
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
    const mainTableHeaders = document.querySelectorAll('.MainBox .ComplaintHeader1 th');
    if (mainTableHeaders.length >= 5) {
        mainTableHeaders[0].textContent = lang.complaint;
        mainTableHeaders[1].textContent = lang.status;
        mainTableHeaders[2].textContent = lang.priority;
        mainTableHeaders[3].textContent = lang.date;
        mainTableHeaders[4].textContent = lang.actions;
    }

    const completedTableHeaders = document.querySelectorAll('.completed-officer-section .ComplaintHeader1 th');
    if (completedTableHeaders.length >= 2) {
        completedTableHeaders[0].textContent = lang.complaint;
        completedTableHeaders[1].textContent = lang.actions;
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
    if (typeof loadAllComplaints === 'function') loadAllComplaints();
    if (typeof loadAssignedComplaints === 'function') loadAssignedComplaints();
    if (typeof loadPendingComplaints === 'function') loadPendingComplaints();
    if (typeof loadOfficerCompletedComplaints === 'function') loadOfficerCompletedComplaints();
}

// Initialize on page load
function applyOfficerLanguage() {
    updateOfficerContent();
    if (typeof loadAllComplaints === 'function') loadAllComplaints();
    if (typeof loadAssignedComplaints === 'function') loadAssignedComplaints();
    if (typeof loadPendingComplaints === 'function') loadPendingComplaints();
    if (typeof loadOfficerCompletedComplaints === 'function') loadOfficerCompletedComplaints();
    if (typeof applyOfficerStaticLabels === 'function') applyOfficerStaticLabels();
}

document.addEventListener('DOMContentLoaded', function() {
    applyOfficerLanguage();
    
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

if (document.readyState !== 'loading') {
    applyOfficerLanguage();
}

let currentLanguage = localStorage.getItem('currentLanguage') || 'en';
const adminTranslations = {
    'en': {
        languageToggle: 'नेपाली',
        title: 'Nikaas',
        username: 'Admin',
        role: 'Administrator',
        
        // Navigation
        adminPanel: 'ADMIN PANEL',
        officerApprovals: 'Officer Approvals',
        manageUsers: 'Manage Users',
        viewComplaints: 'View Complaints',
        logout: 'Logout',
        
        // Officer Approvals Section
        pendingOfficerRegistrations: 'Pending Officer Registrations',
        reviewApproveText: 'Review and approve new officer accounts',
        refreshBtn: 'Refresh',
        newOfficerRequests: 'New Officer Requests',
        officerDetails: 'OFFICER DETAILS',
        department: 'DEPARTMENT',
        phone: 'PHONE',
        email: 'EMAIL',
        document: 'DOCUMENT',
        actions: 'ACTIONS',
        noPendingOfficers: 'No pending officer registrations',
        approve: 'Approve',
        reject: 'Reject',
        
        // Manage Users Section
        manageAllUsers: 'Manage All Users',
        viewAllUsersText: 'View all citizens and officers in the system',
        allUsers: 'All Users',
        filterAll: 'All Users',
        filterCitizens: 'Citizens',
        filterOfficers: 'Officers',
        userDetails: 'USER DETAILS',
        userType: 'USER TYPE',
        status: 'STATUS',
        manage: 'MANAGE',
        noUsersFound: 'No users found',
        viewDocument: 'View Document',
        deleteUser: 'Delete',

        // View Complaints Section
        allComplaints: 'All Complaints',
        viewComplaintsText: 'View all complaints submitted by citizens',
        complaintsList: 'Complaints List',
        complaint: 'COMPLAINT',
        priority: 'PRIORITY',
        date: 'DATE',
        viewDetails: 'View Details',
        noComplaintsFound: 'No complaints found',
        statusPending: 'Pending',
        statusInProgress: 'In Progress',
        statusResolved: 'Resolved',
        statusCompleted: 'Completed',
        statusRejected: 'Rejected',
        priorityHigh: 'High',
        priorityMedium: 'Medium',
        priorityLow: 'Low',

        deleteDepartment: 'Delete',
        deleteDepartmentConfirm: 'Are you sure you want to delete this department?',
        deleteDepartmentSuccess: 'Department deleted successfully',
        deleteDepartmentFailed: 'Failed to delete department'
    },
    'ne': {
        languageToggle: 'English',
        title: 'निकास',
        username: 'एडमिन',
        role: 'प्रशासक',
        
        // Navigation
        adminPanel: 'एडमिन प्यानल',
        officerApprovals: 'अधिकृत स्वीकृति',
        manageUsers: 'प्रयोगकर्ता व्यवस्थापन',
        viewComplaints: 'गुनासो हेर्नुहोस्',
        logout: 'लगआउट',
        
        // Officer Approvals Section
        pendingOfficerRegistrations: 'बाँकी अधिकृत दर्ताहरू',
        reviewApproveText: 'नयाँ अधिकृत खाताहरू समीक्षा र स्वीकृत गर्नुहोस्',
        refreshBtn: 'पुन: लोड',
        newOfficerRequests: 'नयाँ अधिकृत अनुरोधहरू',
        officerDetails: 'अधिकृत विवरण',
        department: 'विभाग',
        phone: 'फोन',
        email: 'इमेल',
        document: 'कागजात',
        actions: 'कार्यहरू',
        noPendingOfficers: 'कुनै बाँकी अधिकृत दर्ता छैन',
        approve: 'स्वीकृत',
        reject: 'अस्वीकार',
        
        // Manage Users Section
        manageAllUsers: 'सबै प्रयोगकर्ता व्यवस्थापन',
        viewAllUsersText: 'प्रणालीमा सबै नागरिक र अधिकृतहरू हेर्नुहोस्',
        allUsers: 'सबै प्रयोगकर्ताहरू',
        filterAll: 'सबै प्रयोगकर्ताहरू',
        filterCitizens: 'नागरिकहरू',
        filterOfficers: 'अधिकृतहरू',
        userDetails: 'प्रयोगकर्ता विवरण',
        userType: 'प्रयोगकर्ता प्रकार',
        status: 'स्थिति',
        manage: 'व्यवस्थापन',
        noUsersFound: 'कुनै प्रयोगकर्ता फेला परेन',
        viewDocument: 'कागजात हेर्नुहोस्',
        deleteUser: 'मेटाउनुहोस्',

        // View Complaints Section
        allComplaints: 'सबै गुनासोहरू',
        viewComplaintsText: 'नागरिकहरूले पेश गरेका सबै गुनासो हेर्नुहोस्',
        complaintsList: 'गुनासो सूची',
        complaint: 'गुनासो',
        priority: 'प्राथमिकता',
        date: 'मिति',
        viewDetails: 'विवरण हेर्नुहोस्',
        noComplaintsFound: 'कुनै गुनासो फेला परेन',
        statusPending: 'बाँकी',
        statusInProgress: 'प्रगतिमा',
        statusResolved: 'समाधान भयो',
        statusCompleted: 'सम्पन्न',
        statusRejected: 'अस्वीकृत',
        priorityHigh: 'उच्च',
        priorityMedium: 'मध्यम',
        priorityLow: 'न्यून',

        deleteDepartment: 'मेटाउनुहोस्',
        deleteDepartmentConfirm: 'के तपाईं यो विभाग मेटाउन चाहनुहुन्छ?',
        deleteDepartmentSuccess: 'विभाग सफलतापूर्वक मेटियो',
        deleteDepartmentFailed: 'विभाग मेटाउन असफल भयो'
    }
};

// Function to update page content
function updateAdminContent() {
    const lang = adminTranslations[currentLanguage];
    
    // Update language toggle button
    const langBtn = document.getElementById('language-toggle');
    if (langBtn) {
        langBtn.innerHTML = `<i class="material-icons">language</i> ${lang.languageToggle}`;
    }
    
    // Update header
    const title = document.querySelector('.Heading1');
    if (title) title.textContent = lang.title;
    
    const username = document.querySelector('.username');
    if (username) username.textContent = lang.username;
    
    const role = document.querySelector('.role');
    if (role) role.textContent = lang.role;
    
    // Update navigation
    const navTitle = document.querySelector('.navigation');
    if (navTitle) navTitle.textContent = lang.adminPanel;
    
    const officerTab = document.querySelector('#officerApprovalsTab .nav-btn p');
    if (officerTab) officerTab.textContent = lang.officerApprovals;

    const manageUsersTab = document.querySelector('#manageUsersTab .nav-btn p');
    if (manageUsersTab) manageUsersTab.textContent = lang.manageUsers;

    const viewComplaintsTab = document.querySelector('#viewComplaintsTab .nav-btn p');
    if (viewComplaintsTab) viewComplaintsTab.textContent = lang.viewComplaints;

    
    const logoutLink = document.querySelector('.logout a');
    if (logoutLink) {
        const logoutText = logoutLink.textContent;
        if (logoutText.includes('Logout') || logoutText.includes('लगआउट')) {
            logoutLink.textContent = lang.logout;
        }
    }
    
    // Update Officer Approvals Section
    const officerHeadings = document.querySelectorAll('.myComplaintsText');
    if (officerHeadings[0]) officerHeadings[0].textContent = lang.pendingOfficerRegistrations;
    
    const reviewText = document.querySelectorAll('.myComplaintsHeading p');
    if (reviewText[0]) reviewText[0].textContent = lang.reviewApproveText;
    
    const refreshBtns = document.querySelectorAll('button');
    refreshBtns.forEach(btn => {
        if (btn.innerHTML.includes('Refresh') || btn.innerHTML.includes('पुन: लोड')) {
            btn.innerHTML = `<i class="material-icons" style="vertical-align: middle;">refresh</i> ${lang.refreshBtn}`;
        }
    });
    
    const newOfficerText = document.querySelectorAll('.myComplaintsText1');
    if (newOfficerText[0]) newOfficerText[0].textContent = lang.newOfficerRequests;
    
    // Update table headers for Officer Approvals
    const officerTableHeaders = document.querySelectorAll('#officerTable th');
    if (officerTableHeaders.length > 0) {
        officerTableHeaders[0].textContent = lang.officerDetails;
        officerTableHeaders[1].textContent = lang.department;
        officerTableHeaders[2].textContent = lang.phone;
        officerTableHeaders[3].textContent = lang.email;
        officerTableHeaders[4].textContent = lang.document;
        officerTableHeaders[5].textContent = lang.actions;
    }
    
    const noOfficersMsg = document.querySelector('#noOfficersMsg p');
    if (noOfficersMsg) noOfficersMsg.textContent = lang.noPendingOfficers;
    
    // Update Manage Users Section
    if (officerHeadings[1]) officerHeadings[1].textContent = lang.manageAllUsers;
    if (reviewText[1]) reviewText[1].textContent = lang.viewAllUsersText;
    if (newOfficerText[1]) newOfficerText[1].textContent = lang.allUsers;
    
    // Update filter buttons
    const filterAllBtn = document.getElementById('filterAllBtn');
    if (filterAllBtn) {
        const btnText = filterAllBtn.textContent.trim();
        if (btnText === 'All Users' || btnText === 'सबै प्रयोगकर्ताहरू') {
            filterAllBtn.textContent = lang.filterAll;
        }
    }
    
    const filterCitizenBtn = document.getElementById('filterCitizenBtn');
    if (filterCitizenBtn) {
        filterCitizenBtn.innerHTML = `<i class="material-icons" style="vertical-align: middle; font-size: 18px;">person</i> ${lang.filterCitizens}`;
    }
    
    const filterOfficerBtn = document.getElementById('filterOfficerBtn');
    if (filterOfficerBtn) {
        filterOfficerBtn.innerHTML = `<i class="material-icons" style="vertical-align: middle; font-size: 18px;">verified_user</i> ${lang.filterOfficers}`;
    }
    
    // Update table headers for Users table
    const usersTableHeaders = document.querySelectorAll('#usersTable th');
    if (usersTableHeaders.length > 0) {
        usersTableHeaders[0].textContent = lang.userDetails;
        usersTableHeaders[1].textContent = lang.userType;
        usersTableHeaders[2].textContent = lang.department;
        usersTableHeaders[3].textContent = lang.phone;
        usersTableHeaders[4].textContent = lang.email;
        usersTableHeaders[5].textContent = lang.status;
        usersTableHeaders[6].textContent = lang.document;
        usersTableHeaders[7].textContent = lang.manage;
    }
    
    const noUsersMsg = document.querySelector('#noUsersMsg p');
    if (noUsersMsg) noUsersMsg.textContent = lang.noUsersFound;

    // Update View Complaints Section
    const viewComplaintsHeading = document.getElementById('viewComplaintsHeading');
    if (viewComplaintsHeading) viewComplaintsHeading.textContent = lang.allComplaints;

    const viewComplaintsDesc = document.getElementById('viewComplaintsDesc');
    if (viewComplaintsDesc) viewComplaintsDesc.textContent = lang.viewComplaintsText;

    const viewComplaintsListHeading = document.getElementById('viewComplaintsListHeading');
    if (viewComplaintsListHeading) viewComplaintsListHeading.textContent = lang.complaintsList;

    const complaintsTableHeaders = document.querySelectorAll('#complaintsTable th');
    if (complaintsTableHeaders.length > 0) {
        complaintsTableHeaders[0].textContent = lang.complaint;
        complaintsTableHeaders[1].textContent = lang.status;
        complaintsTableHeaders[2].textContent = lang.priority;
        complaintsTableHeaders[3].textContent = lang.date;
        complaintsTableHeaders[4].textContent = lang.actions;
    }

    const noComplaintsMsg = document.querySelector('#noComplaintsMsg p');
    if (noComplaintsMsg) noComplaintsMsg.textContent = lang.noComplaintsFound;

}

// Function to toggle language
function toggleAdminLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ne' : 'en';
    localStorage.setItem('currentLanguage', currentLanguage);
    updateAdminContent();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateAdminContent();
    
    // Add click event to language toggle button
    const langBtn = document.getElementById('language-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', toggleAdminLanguage);
    }
});

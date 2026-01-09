let currentLanguage = localStorage.getItem('adminLanguage') || 'en';
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
        deleteUser: 'Delete'
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
        deleteUser: 'मेटाउनुहोस्'
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
    
    const navButtons = document.querySelectorAll('.nav-btn p');
    if (navButtons[0]) navButtons[0].textContent = lang.officerApprovals;
    if (navButtons[1]) navButtons[1].textContent = lang.manageUsers;
    
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
    
    

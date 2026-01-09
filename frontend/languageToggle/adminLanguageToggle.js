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


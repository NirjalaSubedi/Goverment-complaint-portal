let currentLanguage = localStorage.getItem('officerLanguage') || localStorage.getItem('citizenLanguage') || 'en';
const settingsTranslations = {
    'en': {
        languageToggle: 'नेपाली',
        title: 'Nikaas',
        backToDashboard: 'Back to Dashboard',
        backToOfficerDashboard: 'Back to Officer Dashboard',
        
        // Security Settings
        securitySettings: 'Security Settings',
        changePassword: 'Change Password',
        changePasswordDesc: 'Update your account password',
        changeBtn: 'Change',
        deleteAccount: 'Delete Account',
        deleteAccountDesc: 'This action cannot be undone',
        deleteBtn: 'Delete',
        deleteConfirm: 'Are you sure you want to delete your account? This action cannot be undone.',
        deleteSuccess: 'Account deleted successfully!',
        deleteError: 'An error occurred while deleting account.',
        
        // Notification Settings
        notificationSettings: 'Notification Settings',
        emailNotifications: 'Email Notifications',
        emailNotificationsDesc: 'Receive notifications via email',
        complaintUpdates: 'Complaint Updates',
        complaintUpdatesDesc: 'Updates on complaint status'
    },
    'ne': {
        languageToggle: 'English',
        title: 'निकास',
        backToDashboard: 'ड्यासबोर्डमा फर्कनुहोस्',
        backToOfficerDashboard: 'अधिकृत ड्यासबोर्डमा फर्कनुहोस्',
        
        // Security Settings
        securitySettings: 'सुरक्षा सेटिङ्हरू',
        changePassword: 'पासवर्ड परिवर्तन गर्नुहोस्',
        changePasswordDesc: 'आफ्नो खाताको पासवर्ड अपडेट गर्नुहोस्',
        changeBtn: 'परिवर्तन गर्नुहोस्',
        deleteAccount: 'खाता मेटाउनुहोस्',
        deleteAccountDesc: 'यो कार्य पूर्ववत गर्न सकिँदैन',
        deleteBtn: 'मेटाउनुहोस्',
        deleteConfirm: 'के तपाईं निश्चित हुनुहुन्छ कि तपाईं आफ्नो खाता मेटाउन चाहनुहुन्छ? यो कार्य पूर्ववत गर्न सकिँदैन।',
        deleteSuccess: 'खाता सफलतापूर्वक मेटाइयो!',
        deleteError: 'खाता मेटाउँदा त्रुटि भयो।',
        
        // Notification Settings
        notificationSettings: 'सूचना सेटिङ्हरू',
        emailNotifications: 'इमेल सूचनाहरू',
        emailNotificationsDesc: 'इमेल मार्फत सूचनाहरू प्राप्त गर्नुहोस्',
        complaintUpdates: 'गुनासो अपडेटहरू',
        complaintUpdatesDesc: 'गुनासो स्थितिमा अपडेटहरू'
    }
};

// Function to update page content
function updateSettingsContent() {
    const lang = settingsTranslations[currentLanguage];
    
    // Update language toggle button
    const langBtn = document.getElementById('language-toggle');
    if (langBtn) {
        langBtn.innerHTML = `<i class="material-icons">language</i> ${lang.languageToggle}`;
    }
    
    // Update header
    const title = document.querySelector('.Heading1');
    if (title) title.textContent = lang.title;
    
    // Update back button
    const backButtonSpan = document.querySelector('.backButton span');
    if (backButtonSpan) {
        const role = document.querySelector('.role');
        if (role && role.textContent === 'Officer' || role && role.textContent === 'अधिकृत') {
            backButtonSpan.textContent = lang.backToOfficerDashboard;
        } else {
            backButtonSpan.textContent = lang.backToDashboard;
        }
    }
    
    // Update Security Settings
    const securitySettingsTitle = document.querySelectorAll('.profileDesc')[0];
    if (securitySettingsTitle) securitySettingsTitle.textContent = lang.securitySettings;
    
    const settingTitles = document.querySelectorAll('.settingTitle');
    if (settingTitles[0]) settingTitles[0].textContent = lang.changePassword;
    if (settingTitles[1]) settingTitles[1].textContent = lang.deleteAccount;
    
    const settingDescs = document.querySelectorAll('.settingDesc');
    if (settingDescs[0]) settingDescs[0].textContent = lang.changePasswordDesc;
    if (settingDescs[1]) settingDescs[1].textContent = lang.deleteAccountDesc;
    
    const settingBtns = document.querySelectorAll('.settingBtn');
    if (settingBtns[0]) settingBtns[0].textContent = lang.changeBtn;
    if (settingBtns[1]) settingBtns[1].textContent = lang.deleteBtn;
    
    // Update Notification Settings
    const notificationSettingsTitle = document.querySelectorAll('.profileDesc')[1];
    if (notificationSettingsTitle) notificationSettingsTitle.textContent = lang.notificationSettings;
    
    const notificationTitles = document.querySelectorAll('.notificationTitle');
    if (notificationTitles[0]) notificationTitles[0].textContent = lang.emailNotifications;
    if (notificationTitles[1]) notificationTitles[1].textContent = lang.complaintUpdates;
    
    const notificationDescs = document.querySelectorAll('.notificationDesc');
    if (notificationDescs[0]) notificationDescs[0].textContent = lang.emailNotificationsDesc;
    if (notificationDescs[1]) notificationDescs[1].textContent = lang.complaintUpdatesDesc;
}

// Function to toggle language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ne' : 'en';
    
    // Save to both storage keys to maintain consistency
    const userType = document.querySelector('.role');
    if (userType && (userType.textContent === 'Officer' || userType.textContent === 'अधिकृत')) {
        localStorage.setItem('officerLanguage', currentLanguage);
    } else {
        localStorage.setItem('citizenLanguage', currentLanguage);
    }
    
    updateSettingsContent();
}



document.addEventListener('DOMContentLoaded', function() {
    updateSettingsContent();
});

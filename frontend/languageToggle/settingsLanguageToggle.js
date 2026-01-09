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

document.addEventListener('DOMContentLoaded', function() {
    updateSettingsContent();
});

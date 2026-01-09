let currentLanguage = localStorage.getItem('officerLanguage') || localStorage.getItem('citizenLanguage') || 'en';
console.log('Initial language loaded:', currentLanguage);
console.log('officerLanguage:', localStorage.getItem('officerLanguage'));
console.log('citizenLanguage:', localStorage.getItem('citizenLanguage'));
const passwordTranslations = {
    'en': {
        languageToggle: 'नेपाली',
        
        // Change Password
        changePasswordTitle: 'Change Password',
        oldPassword: 'Old Password',
        oldPasswordPlaceholder: 'Enter old password',
        newPassword: 'New Password',
        newPasswordPlaceholder: 'Enter new password',
        confirmPassword: 'Confirm Password',
        confirmPasswordPlaceholder: 'Re-enter new password',
        changePasswordBtn: 'Change Password',
        changePasswordSuccess: 'Password changed successfully!',
        changePasswordError: 'Failed to change password. Please try again.',
        
        // Forget Password
        forgotPasswordTitle: 'Forgot Password',
        email: 'Email Address',
        emailPlaceholder: 'Enter your email address',
        sendResetBtn: 'Send Reset Link',
        backToLogin: 'Back to Login',
        sendResetSuccess: 'Reset link sent to your email',
        sendResetError: 'Failed to send reset link. Please try again.',
        
        // Reset Password
        resetPasswordTitle: 'Reset Password',
        verificationCode: 'Verification Code',
        verificationCodePlaceholder: 'Enter 6-digit code',
        newPasswordReset: 'New Password',
        newPasswordPlaceholderReset: 'Enter new password',
        confirmPasswordReset: 'Confirm New Password',
        confirmPasswordPlaceholderReset: 'Confirm your password',
        updatePasswordBtn: 'Update Password',
        resetPasswordSuccess: 'Password reset successfully!',
        resetPasswordError: 'Failed to reset password. Please try again.'
    },
    'ne': {
        languageToggle: 'English',
        
        // Change Password
        changePasswordTitle: 'पासवर्ड परिवर्तन गर्नुहोस्',
        oldPassword: 'पुरानो पासवर्ड',
        oldPasswordPlaceholder: 'पुरानो पासवर्ड प्रविष्ट गर्नुहोस्',
        newPassword: 'नयाँ पासवर्ड',
        newPasswordPlaceholder: 'नयाँ पासवर्ड प्रविष्ट गर्नुहोस्',
        confirmPassword: 'पासवर्ड पुष्टि गर्नुहोस्',
        confirmPasswordPlaceholder: 'नयाँ पासवर्ड पुनः प्रविष्ट गर्नुहोस्',
        changePasswordBtn: 'पासवर्ड परिवर्तन गर्नुहोस्',
        changePasswordSuccess: 'पासवर्ड सफलतापूर्वक परिवर्तन भयो!',
        changePasswordError: 'पासवर्ड परिवर्तन गर्न असफल भयो। कृपया पुनः प्रयास गर्नुहोस्।',
        
        // Forget Password
        forgotPasswordTitle: 'पासवर्ड विर्सनुभयो',
        email: 'इमेल ठेगाना',
        emailPlaceholder: 'आफ्नो इमेल ठेगाना प्रविष्ट गर्नुहोस्',
        sendResetBtn: 'रिसेट लिङ्क पठाउनुहोस्',
        backToLogin: 'लगइनमा फर्कनुहोस्',
        sendResetSuccess: 'रिसेट लिङ्क आपको इमेलमा पठाइयो',
        sendResetError: 'रिसेट लिङ्क पठाउन असफल भयो। कृपया पुनः प्रयास गर्नुहोस्।',
        
        // Reset Password
        resetPasswordTitle: 'पासवर्ड रिसेट गर्नुहोस्',
        verificationCode: 'प्रमाणीकरण कोड',
        verificationCodePlaceholder: '6-अंकको कोड प्रविष्ट गर्नुहोस्',
        newPasswordReset: 'नयाँ पासवर्ड',
        newPasswordPlaceholderReset: 'नयाँ पासवर्ड प्रविष्ट गर्नुहोस्',
        confirmPasswordReset: 'नयाँ पासवर्ड पुष्टि गर्नुहोस्',
        confirmPasswordPlaceholderReset: 'आफ्नो पासवर्ड पुष्टि गर्नुहोस्',
        updatePasswordBtn: 'पासवर्ड अपडेट गर्नुहोस्',
        resetPasswordSuccess: 'पासवर्ड सफलतापूर्वक रिसेट भयो!',
        resetPasswordError: 'पासवर्ड रिसेट गर्न असफल भयो। कृपया पुनः प्रयास गर्नुहोस्।'
    }
};

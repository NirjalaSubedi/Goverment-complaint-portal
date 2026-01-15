let currentLanguage = localStorage.getItem('currentLanguage') || 'en';
const authTranslations = {
    'en': {
        languageToggle: 'नेपाली',
        
        // Forgot Password Page
        forgotPasswordTitle: 'Forgot Password',
        emailLabel: 'Email Address',
        emailPlaceholder: 'Enter your email',
        sendResetCodeBtn: 'Send Reset Code',
        backToLogin: 'Back to Login',
        
        // Reset Password Page
        resetPasswordTitle: 'Reset Password',
        verificationCodeLabel: 'Verification Code',
        verificationCodePlaceholder: 'Enter 6-digit code',
        newPasswordLabel: 'New Password',
        newPasswordPlaceholder: 'Enter new password',
        confirmPasswordLabel: 'Confirm Password',
        confirmPasswordPlaceholder: 'Re-enter new password',
        updatePasswordBtn: 'Update Password',
        verificationCodeSentTo: 'Verification code sent to:',
        
        // Email Verification Page (Auth)
        emailVerificationTitle: 'Email Verification',
        verificationCodeMessage: 'Enter the 6-digit code sent to your Email Address',
        verificationCodeInputLabel: 'Verification Code',
        verifyCodeBtn: 'Verify Code',
        didntReceiveCode: "Didn't receive the code?",
        resendCodeBtn: 'Resend Code',
        emailNotFound: 'Email not found. Please register again.',
        verificationSuccess: 'Email verified successfully!',
        verificationError: 'Verification failed. Please try again.',
        resendSuccess: 'Verification code resent!',
        resendError: 'Failed to resend code. Please try again.',
        timerWait: 'Wait',
        seconds: 'seconds before resending'
    },
    'ne': {
        languageToggle: 'English',
        
        // Forgot Password Page
        forgotPasswordTitle: 'पासवर्ड विर्सनुभयो',
        emailLabel: 'इमेल ठेगाना',
        emailPlaceholder: 'आफ्नो इमेल प्रविष्ट गर्नुहोस्',
        sendResetCodeBtn: 'रिसेट कोड पठाउनुहोस्',
        backToLogin: 'लगइनमा फर्कनुहोस्',
        
        // Reset Password Page
        resetPasswordTitle: 'पासवर्ड रिसेट गर्नुहोस्',
        verificationCodeLabel: 'प्रमाणीकरण कोड',
        verificationCodePlaceholder: '6-अंकको कोड प्रविष्ट गर्नुहोस्',
        newPasswordLabel: 'नयाँ पासवर्ड',
        newPasswordPlaceholder: 'नयाँ पासवर्ड प्रविष्ट गर्नुहोस्',
        confirmPasswordLabel: 'पासवर्ड पुष्टि गर्नुहोस्',
        confirmPasswordPlaceholder: 'नयाँ पासवर्ड पुनः प्रविष्ट गर्नुहोस्',
        updatePasswordBtn: 'पासवर्ड अपडेट गर्नुहोस्',
        verificationCodeSentTo: 'प्रमाणीकरण कोड पठाइयो:',
        
        // Email Verification Page (Auth)
        emailVerificationTitle: 'इमेल प्रमाणीकरण',
        verificationCodeMessage: 'आपको इमेलमा पठाइएको 6-अंकको कोड प्रविष्ट गर्नुहोस्',
        verificationCodeInputLabel: 'प्रमाणीकरण कोड',
        verifyCodeBtn: 'कोड प्रमाणित गर्नुहोस्',
        didntReceiveCode: 'कोड प्राप्त भएन?',
        resendCodeBtn: 'कोड पुनः पठाउनुहोस्',
        emailNotFound: 'इमेल फेला परेन। कृपया फेरि दर्ता गर्नुहोस्।',
        verificationSuccess: 'इमेल सफलतापूर्वक प्रमाणित भयो!',
        verificationError: 'प्रमाणीकरण असफल भयो। कृपया पुनः प्रयास गर्नुहोस्।',
        resendSuccess: 'प्रमाणीकरण कोड पुनः पठाइयो!',
        resendError: 'कोड पुनः पठाउन असफल भयो। कृपया पुनः प्रयास गर्नुहोस्।',
        timerWait: 'प्रतीक्षा गर्नुहोस्',
        seconds: 'सेकेन्ड पछि पुनः पठाउनुहोस्'
    }
};

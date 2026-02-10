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

// Function to update page content
function updateAuthPageContent() {
    const lang = authTranslations[currentLanguage];    

    // Update language toggle button text if present
    const langBtn = document.getElementById('language-toggle');
    if (langBtn) {
        langBtn.innerHTML = `<i class="material-icons">language</i> ${lang.languageToggle}`;
    }
    const emailLabel = document.querySelector('label[for="email"]');
    if (emailLabel) {
        emailLabel.textContent = lang.emailLabel;
    }
    
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.placeholder = lang.emailPlaceholder;
    }
    
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.textContent = lang.sendResetCodeBtn;
    }
    
    const fpBackLink = document.querySelector('.back-to-login');
    if (fpBackLink) {
        fpBackLink.textContent = lang.backToLogin;
    }
    
    const sentToLabel = document.getElementById('sentToLabel');
    if (sentToLabel) {
        sentToLabel.textContent = lang.verificationCodeSentTo;
    }
    
    const verCodeLabel = document.querySelector('label[for="verificationCode"]');
    if (verCodeLabel) {
        verCodeLabel.textContent = lang.verificationCodeLabel;
    }
    
    const verCodeInput = document.getElementById('verificationCode');
    if (verCodeInput) {
        verCodeInput.placeholder = lang.verificationCodePlaceholder;
    }
    
    const newPwdLabel = document.querySelector('label[for="newPassword"]');
    if (newPwdLabel) {
        newPwdLabel.textContent = lang.newPasswordLabel;
    }
    
    const newPwdInput = document.getElementById('newPassword');
    if (newPwdInput) {
        newPwdInput.placeholder = lang.newPasswordPlaceholder;
    }
    
    const confirmPwdLabel = document.querySelector('label[for="confirmPassword"]');
    if (confirmPwdLabel) {
        confirmPwdLabel.textContent = lang.confirmPasswordLabel;
    }
    
    const confirmPwdInput = document.getElementById('confirmPassword');
    if (confirmPwdInput) {
        confirmPwdInput.placeholder = lang.confirmPasswordPlaceholder;
    }
    
    const resetBtn = document.getElementById('updatePasswordBtn');
    if (resetBtn) {
        resetBtn.textContent = lang.updatePasswordBtn;
    }
    
    const authTitle = document.querySelector('.auth h3');
    if (authTitle) {
        authTitle.textContent = lang.emailVerificationTitle;
    }
    
    const emailDisplay = document.getElementById('email-display');
    if (emailDisplay && !emailDisplay.textContent.includes('@')) {
        // Only update if it's the generic message, not the custom email display
        emailDisplay.textContent = lang.verificationCodeMessage;
    }
    
    // Update verification code label in auth form
    const authVerLabel = document.querySelector('.auth-form label');
    if (authVerLabel) {
        authVerLabel.textContent = lang.verificationCodeInputLabel;
    }
    
    const authVerInput = document.getElementById('verification-code');
    if (authVerInput) {
        authVerInput.placeholder = lang.verificationCodeInputLabel;
    }
    
    const verifyBtn = document.querySelector('.auth-form .verify-btn');
    if (verifyBtn) {
        verifyBtn.textContent = lang.verifyCodeBtn;
    }
    
    const noCodeP = Array.from(document.querySelectorAll('.auth-form p')).find(p => 
        p.textContent.includes("Didn't receive") || p.textContent.includes("कोड प्राप्त")
    );
    if (noCodeP) {
        noCodeP.textContent = lang.didntReceiveCode;
    }
    
    // Update "Resend Code" link
    const resendBtn = document.getElementById('resendBtn');
    if (resendBtn) {
        resendBtn.textContent = lang.resendCodeBtn;
    }
}

// Toggle language and persist choice
function toggleAuthLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ne' : 'en';
    localStorage.setItem('currentLanguage', currentLanguage);
    updateAuthPageContent();
    if (typeof updateAuthDepartmentOptions === 'function') {
        updateAuthDepartmentOptions();
    }
    if (typeof updateLoginRegisterContent === 'function') {
        updateLoginRegisterContent();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateAuthPageContent();
    console.log('Auth page initialized with language: ' + currentLanguage);
});

if (document.readyState === 'loading') {
} else {
    setTimeout(function() {
        updateAuthPageContent();
        console.log('Auth page language applied immediately: ' + currentLanguage);
    }, 50);
}

let currentLanguage='en';
const Translate={
    'en':{
        languageToggle:'नेपाली',
        title:'Goverment Complaint Portal',
        Features:'Features',
        HowItWorks:'How It Works',
        Contact:'Contact',
        login:'Login',
        topic:'Make Your Voice',
        heard:'Heard',
        desc:' Report corruption,road damage,water supply issues and other problems.we listen to your voice and take action.',
        submitComplaint:'Submit Complaint',
        registerbtn:'Register',

    },
    'ne':{
        languageToggle:'English',
        title:'सरकारी उजुरी पोर्टल',
        Features:'विशेषताहरु',
        HowItWorks:'यो कसरी काम गर्छ',
        Contact:'सम्पर्क',
        login:'लगइन',
        topic:'आफ्नो आवाज बनाउनुहोस्',
        heard:'सुनियो',
        desc:'भ्रष्टाचार, सडक क्षति, पानी आपूर्ति समस्या र अन्य समस्याहरू रिपोर्ट गर्नुहोस्। हामी तपाईंको आवाज सुन्छौं र कारबाही गर्छौं।',
        submitComplaint:'उजुरी पेश गर्नुहोस्',
        registerbtn:'दर्ता गर्नुहोस्',
    }
}
function LanguageTranslate(){
    currentLanguage=currentLanguage==='en'?'ne':'en';
    document.getElementById('language-toggle').innerText=Translate[currentLanguage].languageToggle;
    document.getElementsByClassName('Heading1')[0].innerText=Translate[currentLanguage].title;
    document.getElementById('Features').innerText=Translate[currentLanguage].Features;
    document.getElementById('HowItWorks').innerText=Translate[currentLanguage].HowItWorks;
    document.getElementById('Contact').innerText=Translate[currentLanguage].Contact;
    document.getElementById('login-btn').innerText=Translate[currentLanguage].login;
    document.getElementsByClassName('Heading1')[1].innerText=Translate[currentLanguage].topic;
    document.getElementById('Heard').innerText=Translate[currentLanguage].heard;
    document.getElementsByClassName('desc')[0].innerText=Translate[currentLanguage].desc;
    document.getElementsByClassName('submit-complaint')[0].innerText=Translate[currentLanguage].submitComplaint;
    document.getElementsByClassName('register-btn')[0].innerText=Translate[currentLanguage].registerbtn;

}
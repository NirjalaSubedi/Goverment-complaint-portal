let currentLanguage='en';
const Translate={
    'en':{
        languageToggle:'नेपाली',
        title:'Goverment Complaint Portal',
        Features:'Features',
        HowItWorks:'How It Works',
        Contact:'Contact'


    },
    'ne':{
        languageToggle:'English',
        title:'सरकारी उजुरी पोर्टल',
        Features:'विशेषताहरु',
        HowItWorks:'यो कसरी काम गर्छ',
        Contact:'सम्पर्क'
    }
}
function LanguageTranslate(){
    currentLanguage=currentLanguage==='en'?'ne':'en';
    document.getElementById('language-toggle').innerText=Translate[currentLanguage].languageToggle;
    document.getElementById('title').innerText=Translate[currentLanguage].title;
    document.getElementById('Features').innerText=Translate[currentLanguage].Features;
    document.getElementById('HowItWorks').innerText=Translate[currentLanguage].HowItWorks;
    document.getElementById('Contact').innerText=Translate[currentLanguage].Contact;


}
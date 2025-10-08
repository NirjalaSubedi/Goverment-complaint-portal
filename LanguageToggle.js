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
        Features:'Features',
        FeaturesDesc:'secure and effective complaint management system for citizens and government officers',
        EasyComplaints:'Easy Complaints',
        EasyComplaintsDesc:'Easy submit complaints about corruption,road damage,water issues and other concerns',
        TransparentTracking:'Transparent Tracking',
        TransparentTrackingDesc:' Track the status and progress of your complaints in real-time',
        SecureSystem:'Secure System',
        SecureSystemDesc:' Your Personal information and complaints are kept completely secure',


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
        Features:'विशेषताहरु',
        FeaturesDesc:'नागरिक र सरकारी अधिकारीहरूको लागि सुरक्षित र प्रभावकारी उजुरी व्यवस्थापन प्रणाली',
        EasyComplaints:'सजिलो उजुरी',
        EasyComplaintsDesc:'भ्रष्टाचार, सडक क्षति, पानीका समस्या र अन्य चासोहरू बारे सजिलै उजुरी पेश गर्नुहोस्',
        TransparentTracking:'पारदर्शी ट्र्याकिङ',
        TransparentTrackingDesc:'तपाईंको उजुरीहरूको स्थिति र प्रगतिको वास्तविक-समय ट्र्याक गर्नुहोस्',
        SecureSystem:'सुरक्षित प्रणाली',
        SecureSystemDesc:'तपाईंको व्यक्तिगत जानकारी र उजुरीहरू पूर्ण रूपमा सुरक्षित राखिन्छ',

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
    document.getElementsByClassName('heading2')[0].innerText=Translate[currentLanguage].Features;
    document.getElementsByClassName('desc')[1].innerText=Translate[currentLanguage].FeaturesDesc;
    document.getElementsByClassName('heading2')[1].innerText=Translate[currentLanguage].EasyComplaints;
    document.getElementsByClassName('desc')[2].innerText=Translate[currentLanguage].EasyComplaintsDesc;
    document.getElementsByClassName('heading2')[2].innerText=Translate[currentLanguage].TransparentTracking;
    document.getElementsByClassName('desc')[3].innerText=Translate[currentLanguage].TransparentTrackingDesc;
    document.getElementsByClassName('heading2')[3].innerText=Translate[currentLanguage].SecureSystem;
    document.getElementsByClassName('desc')[4].innerText=Translate[currentLanguage].SecureSystemDesc;
}
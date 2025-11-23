let currentLanguage = 'en';
const Translate = {
    'en': {
        'languageToggle': 'नेपाली',
        'title': 'Goverment Complaint Portal',
        'citizen': 'Citizen',
        'Nav': 'NAVIGATION',
        'myComplaints': 'myComplaints',
        'Drafts': 'Drafts',
        'Profile': 'Profile',
        'Quick Actions': 'Quick Actions',
        'New Complaint': 'New Complaint',
        'myComplaintsText': 'myComplaints',
        'Track and manage your submitted complaints': 'Track and manage your submitted complaints',
        'add': 'Add',
        'Total Complaints': 'Total Complaints',
        'Submitted': 'Submitted',
        'pending': 'pending',
        'Awaiting response': 'Awaiting response',
        'inProgress': 'inProgress',
        'Being Processed': 'Being Processed',
        'completed': 'completed',
        'Success resolved ': 'Success resolved ',
        'Sort': 'Sort',
        'COMPLAINT': 'COMPLAINT',
        'STATUS': 'STATUS',
        'PRIORITY': 'PRIORITY',
        'DATE': 'DATE',
        'ACTIONS': 'ACTIONS',
        'View Details': 'View Details',
        'update': 'Update',
        'delete': 'Delete',
        
        // Profile Details
        'managePersonalDetails': 'Manage your Personal Details',
        'fullName': 'FullName',
        'phoneNumber': 'PhoneNumber',
        'email': 'Email',
        'address': 'Address',
        'editProfile': 'Edit Profile',

        // Complaint Submission Page
        'title22': 'Complaint Submission',
        'titledesc': 'Provide detailed information about your issue',
        'complainttype': 'Complaint Type*',
        'selectType': 'Select Complaint Type',
        'corruption': 'Corruption',
        'roaddamage': 'roadDamage',
        'waterSupply': 'Water Supply',
        'electricity': 'Electricity',
        'HealthCare': 'HealthCare',
        'other': 'Other',
        'subject': 'Subject*',
        'subjectPlaceholder': 'Brief Subject of your Complaint',
        'location': 'Location*',
        'locationPlaceholder': 'Enter the Location of the Issue',
        'priorityLevel': 'Priority Level',
        'High': 'High',
        'medium': 'Medium',
        'low': 'Low',
        'description': 'Description*',
        'descriptionPlaceholder': 'Provide a detailed description of your issue',
        'Attachment': 'Attachment',
        'cancel': 'Cancel',
        'submit': 'Submit',
        'Settings': 'Settings',
        'Logout': 'Logout'
    },
    'ne': {
        'languageToggle': 'English',
        'title': 'सरकारी उजुरी पोर्टल',
        'citizen': 'नागरिक',
        'Nav': 'नेभिगेसन',
        'myComplaints': 'मेरो उजुरीहरू',
        'Drafts': 'मसौदाहरू',
        'Profile': 'प्रोफाइल',
        'Quick Actions': 'छिटो कार्यहरू',
        'New Complaint': 'नयाँ उजुरी',
        'myComplaintsText': 'मेरो उजुरीहरू',
        'Track and manage your submitted complaints': 'आफ्ना पेश गरिएका उजुरीहरू ट्र्याक र व्यवस्थापन गर्नुहोस्',
        'add': 'थप्नुहोस्',
        'Total Complaints': 'कुल उजुरीहरू',
        'Submitted': 'पेश गरियो',
        'pending': 'प्रतीक्षारत',
        'Awaiting response': 'उत्तरको प्रतीक्षा गर्दै',
        'inProgress': 'प्रगतिको क्रममा',
        'Being Processed': 'प्रक्रियामा छ',
        'completed': 'सम्पन्न भयो',
        'Success resolved ': 'सफलतापूर्वक समाधान भयो ',
        'Sort': 'क्रमबद्ध गर्नुहोस्',
        'COMPLAINT': 'उजुरी',
        'STATUS': 'स्थिति',
        'PRIORITY': 'प्राथमिकता',
        'DATE': 'मिति',
        'ACTIONS': 'कार्यहरू',
        'View Details': 'विवरण हेर्नुहोस्',
        'update': 'अद्यावधिक',
        'delete': 'मेटाउनुहोस्',

        // Profile Details
        'managePersonalDetails': 'आफ्नो व्यक्तिगत विवरणहरू प्रबन्ध गर्नुहोस्',
        'fullName': 'पूरा नाम',
        'phoneNumber': 'फोन नम्बर',
        'email': 'इमेल',
        'address': 'ठेगाना',
        'editProfile': 'प्रोफाइल सम्पादन गर्नुहोस्',

        // Complaint Submission Page
        'title22': 'गुनासो पेश गर्नुहोस्',
        'titledesc': 'आफ्नो समस्याको बारेमा विस्तृत जानकारी प्रदान गर्नुहोस्',
        'complainttype': 'उजुरी प्रकार*',
        'selectType': 'उजुरी प्रकार चयन गर्नुहोस्',
        'corruption': 'भ्रष्टाचार',
        'roaddamage': 'सडक क्षति',
        'waterSupply': 'पानी आपूर्ति',
        'electricity': 'बिजुली',
        'HealthCare': 'स्वास्थ्य सेवा',
        'other': 'अन्य',
        'subject': 'विषय*',
        'subjectPlaceholder': 'तपाईंको उजुरीको संक्षिप्त विषय',
        'location': 'स्थान*',
        'locationPlaceholder': 'समस्याको स्थान प्रविष्ट गर्नुहोस्',
        'priorityLevel': 'प्राथमिकता स्तर',
        'High': 'उच्च',
        'medium': 'मध्यम',
        'low': 'तल्लो',
        'description': 'विवरण*',
        'descriptionPlaceholder': 'आफ्नो समस्याको विस्तृत विवरण प्रदान गर्नुहोस्',
        'Attachment': 'संलग्नक',
        'cancel': 'रद्द गर्नुहोस्',
        'submit': 'पेश गर्नुहोस्',
        'Settings': 'सेटिङ्स',
        'Logout': 'लगआउट'
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const subjectInput = document.getElementById('subject');
    if (subjectInput) subjectInput.setAttribute('data-placeholder-key', 'subjectPlaceholder');
    
    const locationInput = document.getElementById('location');
    if (locationInput) locationInput.setAttribute('data-placeholder-key', 'locationPlaceholder');

    const descriptionTextarea = document.getElementById('description');
    if (descriptionTextarea) descriptionTextarea.setAttribute('data-placeholder-key', 'descriptionPlaceholder');
    const labels = [
        { selector: 'label[for="complaint-type"]', key: 'complainttype' },
        { selector: 'label[for="subject"]', key: 'subject' },
        { selector: 'label[for="location"]', key: 'location' },
        { selector: 'label[for="priorityLevel"]', key: 'priorityLevel' },
        { selector: 'label[for="description"]', key: 'description' },
        { selector: 'label[for="attachment"]', key: 'Attachment' }
    ];
    labels.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el) el.setAttribute('data-translate-key', item.key);
    });
    const profileLabels = [
        { selector: '.fullname11', key: 'fullName' },
        { selector: '.phonenumber11', key: 'phoneNumber' },
        { selector: '.email11', key: 'email' },
        { selector: '.address11', key: 'address' }
    ];
     profileLabels.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el) el.setAttribute('data-translate-key', item.key);
    });
    const complaintTypeSelect = document.getElementById('complaint-type');
    if (complaintTypeSelect && complaintTypeSelect.options.length > 1) {
        complaintTypeSelect.options[0].id = 'selectType';
        complaintTypeSelect.options[1].id = 'complaintCorruption';
        complaintTypeSelect.options[2].id = 'complaintRoaddamage';
        complaintTypeSelect.options[3].id = 'complaintWaterSupply';
        complaintTypeSelect.options[4].id = 'complaintElectricity';
        complaintTypeSelect.options[5].id = 'complaintHealthCare';
        complaintTypeSelect.options[6].id = 'complaintOthers';
    }
    const buttons = document.querySelectorAll('.double-btn button');
    if (buttons.length === 2) {
        if (buttons[0].classList.contains('cancle-btn')) buttons[0].id = 'cancelBtn';
        if (buttons[1].classList.contains('submit-btn1')) buttons[1].id = 'submitbtn1';
    }
    
    const profileDesc = document.querySelector('.profileDesc');
    if (profileDesc) profileDesc.setAttribute('data-translate-key', 'managePersonalDetails');
    
    const editProfileBtn = document.querySelector('.editProfileBtn');
    if (editProfileBtn) editProfileBtn.id = 'editProfileBtn';
});
function initializeLanguage() {
    const savedLang = localStorage.getItem('currentLanguage');
    if (savedLang) {
        currentLanguage = savedLang;
    } else if (document.title.toLowerCase().includes('dashboard')) {
        currentLanguage = 'en';
        localStorage.setItem('currentLanguage', currentLanguage); 
    }
    applyTranslations();
}
function LanguageTranslate() {
   
    currentLanguage = currentLanguage === 'en' ? 'ne' : 'en';
    
    localStorage.setItem('currentLanguage', currentLanguage);

    applyTranslations();
}

function applyTranslations() {
    const lang = currentLanguage;

    const langToggleBtn = document.getElementById('language-toggle');
    if (langToggleBtn) langToggleBtn.innerHTML = `<i class="material-icons">language</i> ${Translate[lang].languageToggle}`;
    
    const heading1 = document.getElementById('Heading1');
    if (heading1) heading1.innerText = Translate[lang].title;
    
    const roleEl = document.querySelector('.role');
    if (roleEl) roleEl.innerText = Translate[lang].citizen;

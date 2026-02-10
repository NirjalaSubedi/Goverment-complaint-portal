let currentLanguage = localStorage.getItem('languagePreference') || localStorage.getItem('currentLanguage') || 'en';
if (!localStorage.getItem('currentLanguage') && !localStorage.getItem('languagePreference')) {
    localStorage.setItem('languagePreference', 'en');
    localStorage.setItem('currentLanguage', 'en');
}

const Translate = {
    'en': {
            'CompletedDesc': 'View all successfully resolved complaints',
            'noCompletedComplaints': 'No completed complaints yet',
            'completedComplaintsHint': 'Completed complaints will appear here',
            'UntitledDraft': 'Untitled draft',
            'NoLocationSet': 'No location set',
        'languageToggle': 'नेपाली',
        'title': 'Nikaas',
        'citizen': 'Citizen',
        'Nav': 'NAVIGATION',
        'myComplaints': 'myComplaints',
        'CompletedNav': 'Completed',
        'Drafts': 'Drafts',
        'DraftsTitle': 'Drafts',
        'SavedDraftsDesc': 'Your saved complaint drafts',
        'DraftComplaints': 'Draft Complaints',
        'Profile': 'Profile',
        'Quick Actions': 'Quick Actions',
        'New Complaint': 'New Complaint',
        'myComplaintsText': 'myComplaints',
        'CompletedTasks': 'Completed Tasks',
        'CompletedComplaints': 'Completed Complaints',
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
        'rejected': 'Rejected',
        'Sort': 'Sort',
        'COMPLAINT': 'COMPLAINT',
        'STATUS': 'STATUS',
        'PRIORITY': 'PRIORITY',
        'DATE': 'DATE',
        'COMPLETED_DATE': 'COMPLETED DATE',
        'CATEGORY': 'CATEGORY',
        'SAVED_DATE': 'SAVED DATE',
        'ACTIONS': 'ACTIONS',
        'Open': 'Open',
        'DeleteDraft': 'Delete',
        'View Details': 'View Details',
        'update': 'Update',
        'delete': 'Delete',
        
        'managePersonalDetails': 'Manage your Personal Details',
        'fullName': 'FullName',
        'phoneNumber': 'PhoneNumber',
        'email': 'Email',
        'address': 'Address',
        'editProfile': 'Edit',
        'profileSettingsTitle': 'Profile Settings',
        'profileSettingsDesc': 'Manage your personal information',

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
        'Logout': 'Logout',
        'Notifications': 'Notifications',
        'MarkAllAsRead': 'Mark all as read',
        'NoNotificationsYet': 'No notifications yet'
    },
    'ne': {
            'CompletedDesc': 'सबै सफलतापूर्वक समाधान भएका उजुरीहरू हेर्नुहोस्',
            'noCompletedComplaints': 'अहिलेसम्म कुनै सम्पन्न उजुरी छैन',
            'completedComplaintsHint': 'सम्पन्न उजुरीहरू यहाँ देखिनेछन्',
            'UntitledDraft': 'शीर्षक छैन',
            'NoLocationSet': 'स्थान सेट गरिएको छैन',
        'languageToggle': 'English',
        'title': 'निकास',
        'citizen': 'नागरिक',
        'Nav': 'नेभिगेसन',
        'myComplaints': 'मेरो उजुरीहरू',
        'CompletedNav': 'सम्पन्न',
        'Drafts': 'मसौदाहरू',
        'DraftsTitle': 'मसौदाहरू',
        'SavedDraftsDesc': 'तपाईंका बचत गरिएका उजुरी मसौदा',
        'DraftComplaints': 'मसौदा उजुरीहरू',
        'Profile': 'प्रोफाइल',
        'Quick Actions': 'छिटो कार्यहरू',
        'New Complaint': 'नयाँ उजुरी',
        'myComplaintsText': 'मेरो उजुरीहरू',
        'CompletedTasks': 'सम्पन्न कार्यहरू',
        'CompletedComplaints': 'सम्पन्न उजुरीहरू',
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
        'rejected': 'अस्वीकृत',
        'Sort': 'क्रमबद्ध गर्नुहोस्',
        'COMPLAINT': 'उजुरी',
        'STATUS': 'स्थिति',
        'PRIORITY': 'प्राथमिकता',
        'DATE': 'मिति',
        'COMPLETED_DATE': 'सम्पन्न मिति',
        'CATEGORY': 'कोटि',
        'SAVED_DATE': 'बचत मिति',
        'ACTIONS': 'कार्यहरू',
        'Open': 'खोल्नुहोस्',
        'DeleteDraft': 'मेटाउनुहोस्',
        'View Details': 'विवरण हेर्नुहोस्',
        'update': 'अद्यावधिक',
        'delete': 'मेटाउनुहोस्',

        'managePersonalDetails': 'आफ्नो व्यक्तिगत विवरणहरू प्रबन्ध गर्नुहोस्',
        'fullName': 'पूरा नाम',
        'phoneNumber': 'फोन नम्बर',
        'email': 'इमेल',
        'address': 'ठेगाना',
        'editProfile': 'प्सम्पादन गर्नुहोस्',
        'profileSettingsTitle': 'प्रोफाइल सेटिङ्स',
        'profileSettingsDesc': 'आफ्नो व्यक्तिगत जानकारी व्यवस्थापन गर्नुहोस्',

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
        'Logout': 'लगआउट',
        'Notifications': 'सूचनाहरू',
        'MarkAllAsRead': 'सबै पढिएको रूपमा चिह्नित गर्नुहोस्',
        'NoNotificationsYet': 'अहिले कुनै सूचना छैन'
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
    // Prefer citizenLanguage for persistence across citizen pages and settings
    const savedLang = localStorage.getItem('languagePreference') || localStorage.getItem('citizenLanguage') || localStorage.getItem('currentLanguage');

    if (savedLang) {
        currentLanguage = savedLang;
        localStorage.setItem('languagePreference', savedLang);
        localStorage.setItem('currentLanguage', savedLang);
        localStorage.setItem('citizenLanguage', savedLang);
    } else {
        currentLanguage = 'en';
        localStorage.setItem('languagePreference', currentLanguage);
        localStorage.setItem('citizenLanguage', currentLanguage);
        localStorage.setItem('currentLanguage', currentLanguage);
    }

    applyTranslations();
}

function LanguageTranslate() {
    currentLanguage = currentLanguage === 'en' ? 'ne' : 'en';
    localStorage.setItem('languagePreference', currentLanguage);
    localStorage.setItem('currentLanguage', currentLanguage);
    localStorage.setItem('citizenLanguage', currentLanguage);

    applyTranslations();
}

function applyTranslations() {
    const lang = currentLanguage;
    const previousLang = window.__lastAppliedLanguage;

    const langToggleBtn = document.getElementById('language-toggle');
    if (langToggleBtn) langToggleBtn.innerHTML = `<i class="material-icons">language</i> ${Translate[lang].languageToggle}`;
    
    const heading1 = document.getElementById('Heading1');
    if (heading1) heading1.innerText = Translate[lang].title;
    
    const roleEl = document.querySelector('.role');
    if (roleEl) roleEl.innerText = Translate[lang].citizen;

    if(document.querySelector('.profile-dropdown .profileicon a')) document.querySelector('.profile-dropdown .profileicon a').innerText = Translate[lang].Profile;
    if(document.querySelector('.settings a')) document.querySelector('.settings a').innerText = Translate[lang].Settings;
    if(document.querySelector('.logout a')) document.querySelector('.logout a').innerText = Translate[lang].Logout;


    if(document.getElementById('nav00')) document.getElementById('nav00').innerText = Translate[lang].Nav;
    if(document.getElementById('myComplaints-btn')) document.getElementById('myComplaints-btn').innerText = Translate[lang].myComplaints;
    if(document.getElementById('myCompleted')) document.getElementById('myCompleted').innerText = Translate[lang].CompletedNav;
    if(document.getElementById('myDrafts')) document.getElementById('myDrafts').innerText = Translate[lang].Drafts;
    if(document.getElementById('see-profile')) document.getElementById('see-profile').innerText = Translate[lang].Profile;
    if(document.querySelector('.quickActionsHeading')) document.querySelector('.quickActionsHeading').innerText = Translate[lang]['Quick Actions'];
    if(document.querySelector('.newComplaintText')) document.querySelector('.newComplaintText').innerText = Translate[lang]['New Complaint'];
    
    document.querySelectorAll('.myComplaintsText').forEach(el => {
        const inCompleted = el.closest('.completed-section');
        const inDrafts = el.closest('.drafts-section');
        if (inCompleted) el.innerText = Translate[lang]['CompletedTasks'];
        else if (inDrafts) el.innerText = Translate[lang]['DraftsTitle'];
        else el.innerText = Translate[lang]['myComplaintsText'];
    });
    document.querySelectorAll('.myComplaintsText1').forEach(el => {
        const inDrafts = el.closest('.drafts-section');
        el.innerText = inDrafts ? Translate[lang]['DraftComplaints'] : Translate[lang]['CompletedComplaints'];
    });

    document.querySelectorAll('#complainttopdesc').forEach(el => {
        if (el.closest('.drafts-section')) {
            el.innerText = Translate[lang]['SavedDraftsDesc'];
        } else if (el.closest('.completed-section')) {
            el.innerText = Translate[lang]['CompletedDesc'];
        } else {
            el.innerText = Translate[lang]['Track and manage your submitted complaints'];
        }
    });

    const stats = [
        ['Total Complaints', 'Submitted'], 
        ['pending', 'Awaiting response'], 
        ['inProgress', 'Being Processed'], 
        ['completed', 'Success resolved ']
    ];

    document.querySelectorAll('.complaintsStatement').forEach((card, index) => {
        const boldText = card.querySelector('.boldColor');
        const lightText = card.querySelector('.lightColor');
        if (boldText && lightText && stats[index]) {
            boldText.innerText = Translate[lang][stats[index][0]];
            lightText.innerText = Translate[lang][stats[index][1]];
        }
    });

    // Headers for main complaints table
    const headers = ['COMPLAINT', 'STATUS', 'PRIORITY', 'DATE', 'ACTIONS'];
    document.querySelectorAll('.ComplaintHeader1 th').forEach((th, index) => {
        if(headers[index]) th.innerText = Translate[lang][headers[index]];
    });
    // Headers for completed complaints table
    const completedHeaders = ['COMPLAINT', 'STATUS', 'PRIORITY', 'COMPLETED_DATE', 'ACTIONS'];
    const completedThs = document.querySelectorAll('.completedComplaintsTable thead th');
    completedThs.forEach((th, index) => {
        if (completedHeaders[index]) th.innerText = Translate[lang][completedHeaders[index]];
    });
    // Headers for drafts table
    const draftsHeaders = ['COMPLAINT', 'CATEGORY', 'PRIORITY', 'SAVED_DATE', 'ACTIONS'];
    const draftsThs = document.querySelectorAll('.draftsTable tr.ComplaintHeader1 th');
    draftsThs.forEach((th, index) => {
        if (draftsHeaders[index]) th.innerText = Translate[lang][draftsHeaders[index]];
    });

    document.querySelectorAll('.sortText').forEach(el => {
        el.innerText = Translate[lang].Sort;
    });
    const sortBtn = document.querySelector('.completed-section .sortBtn');
    if (sortBtn) sortBtn.innerText = Translate[lang].Sort;
    // Update detail buttons in non-drafts sections
    document.querySelectorAll(':not(.drafts-section) .viewDetailsBtn').forEach(btn => {
        btn.innerText = Translate[lang]['View Details'];
    });
    // Update draft action buttons
    document.querySelectorAll('.drafts-section .viewDetailsBtn').forEach(btn => {
        const onclickText = String(btn.getAttribute('onclick') || '');
        if (onclickText.includes('openDraft')) btn.innerText = Translate[lang]['Open'];
        else if (onclickText.includes('deleteDraft')) btn.innerText = Translate[lang]['DeleteDraft'];
    });

    // Update status tag inside completed table rows
    document.querySelectorAll('.completedComplaintsTable td span').forEach(span => {
        if (span.textContent && /Completed/i.test(span.textContent.trim())) {
            span.innerHTML = span.innerHTML.replace(/Completed/i, Translate[lang]['completed']);
        }
    });
    
    document.querySelectorAll('#update').forEach(btn => {
        btn.innerText = Translate[lang].update;
    });

    document.querySelectorAll('#delete').forEach(btn => {
        btn.innerText = Translate[lang].delete;
    });
    
    const profileDesc = document.querySelector('.profileDesc');
    if (profileDesc) profileDesc.innerText = Translate[lang]['managePersonalDetails'];
    
    document.querySelectorAll('.details00 label').forEach(label => {
        const key = label.getAttribute('data-translate-key');
        if (key && Translate[lang][key]) {
            label.innerText = Translate[lang][key];
        }
    });

    document.querySelectorAll('[data-translate-key]').forEach(el => {
        const key = el.getAttribute('data-translate-key');
        if (key && Translate[lang][key]) {
            el.innerText = Translate[lang][key];
        }
    });

    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) editProfileBtn.innerText = Translate[lang]['editProfile'];

    const title22 = document.getElementById('title22');
    if (title22) title22.innerText = Translate[lang].title22;
    
    const titledesc = document.getElementById('titledesc');
    if (titledesc) titledesc.innerText = Translate[lang].titledesc;
    
    document.querySelectorAll('.complaint-form label[data-translate-key]').forEach(label => {
        const key = label.getAttribute('data-translate-key');
        if (key && Translate[lang][key]) {
            label.innerText = Translate[lang][key];
        }
    });

    document.querySelectorAll('[data-placeholder-key]').forEach(input => {
        const key = input.getAttribute('data-placeholder-key');
        if (key && Translate[lang][key]) {
            input.placeholder = Translate[lang][key];
        }
    });
    
    const complaintTypeSelect = document.getElementById('complaint-type');
    if (complaintTypeSelect) {
        if (complaintTypeSelect.options[0]) complaintTypeSelect.options[0].text = Translate[lang].selectType;
        if (complaintTypeSelect.options[1]) complaintTypeSelect.options[1].text = Translate[lang].corruption;
        if (complaintTypeSelect.options[2]) complaintTypeSelect.options[2].text = Translate[lang].roaddamage;
        if (complaintTypeSelect.options[3]) complaintTypeSelect.options[3].text = Translate[lang].waterSupply;
        if (complaintTypeSelect.options[4]) complaintTypeSelect.options[4].text = Translate[lang].electricity;
        if (complaintTypeSelect.options[5]) complaintTypeSelect.options[5].text = Translate[lang].HealthCare;
        if (complaintTypeSelect.options[6]) complaintTypeSelect.options[6].text = Translate[lang].other;
    }
    
    if(document.querySelector('label[for="high"]')) document.querySelector('label[for="high"]').innerText = Translate[lang].High;
    if(document.querySelector('label[for="medium"]')) document.querySelector('label[for="medium"]').innerText = Translate[lang].medium;
    if(document.querySelector('label[for="low"]')) document.querySelector('label[for="low"]').innerText = Translate[lang].low;

    const cancelBtn = document.getElementById('cancelBtn') || document.querySelector('.cancle-btn');
    if (cancelBtn) cancelBtn.innerText = Translate[lang].cancel;
    
    const submitBtn = document.getElementById('submitbtn1') || document.querySelector('.submit-btn1');
    if (submitBtn) submitBtn.innerText = Translate[lang].submit;

    // Update Add button on myComplaints
    const addTitleBtn = document.getElementById('addtitle');
    if (addTitleBtn) addTitleBtn.innerHTML = `<i class="material-icons" id="add">add</i> ${Translate[lang].add}`;
    
    // Update notification header and button text
    const notificationHeaderText = document.getElementById('notification-header-text');
    if (notificationHeaderText) notificationHeaderText.innerText = Translate[lang].Notifications;
    
    const markAllReadBtn = document.getElementById('mark-all-read-btn');
    if (markAllReadBtn) markAllReadBtn.innerText = Translate[lang].MarkAllAsRead;

    if (previousLang !== lang) {
        if (typeof refreshCitizenTablesForLanguage === 'function') {
            refreshCitizenTablesForLanguage();
        }
    }

    window.__lastAppliedLanguage = lang;
}

document.addEventListener('DOMContentLoaded', function(){
    initializeLanguage();
    setTimeout(applyTranslations, 0);
    ['myComplaints-btn','myDrafts','myCompleted','see-profile'].forEach(id=>{
        const el = document.getElementById(id);
        if (el && el.parentElement && el.parentElement.parentElement){
            el.parentElement.parentElement.addEventListener('click', () => setTimeout(applyTranslations, 0));
        } else if (el) {
            el.addEventListener('click', () => setTimeout(applyTranslations, 0));
        }
    });
});

function getActiveCitizenLanguage() {
    return localStorage.getItem('languagePreference') || localStorage.getItem('citizenLanguage') || localStorage.getItem('currentLanguage') || currentLanguage || 'en';
}

function getLocalizedStatus(statusValue) {
    const lang = getActiveCitizenLanguage();
    const value = (statusValue || '').toString().trim().toLowerCase();

    if (value === 'in progress' || value === 'inprogress') return Translate[lang].inProgress;
    if (value === 'completed' || value === 'resolved') return Translate[lang].completed;
    if (value === 'rejected') return Translate[lang].rejected;
    if (value === 'pending' || value === '') return Translate[lang].pending;

    return statusValue || Translate[lang].pending;
}

function getLocalizedPriority(priorityValue) {
    const lang = getActiveCitizenLanguage();
    const value = (priorityValue || '').toString().trim().toLowerCase();

    if (value === 'high') return Translate[lang].High;
    if (value === 'medium') return Translate[lang].medium;
    if (value === 'low') return Translate[lang].low;

    return priorityValue || '--';
}

function getLocalizedCategory(categoryValue) {
    const lang = getActiveCitizenLanguage();
    const value = (categoryValue || '').toString().trim().toLowerCase();

    if (value.includes('corruption')) return Translate[lang].corruption;
    if (value.includes('anti-corruption')) return Translate[lang].corruption;
    if (value.includes('road')) return Translate[lang].roaddamage;
    if (value.includes('water')) return Translate[lang].waterSupply;
    if (value.includes('electric')) return Translate[lang].electricity;
    if (value.includes('health')) return Translate[lang].HealthCare;

    return categoryValue || '--';
}

function refreshCitizenTablesForLanguage() {
    const lang = getActiveCitizenLanguage();

    document.querySelectorAll('[data-status]').forEach(el => {
        const statusValue = el.getAttribute('data-status');
        const label = getLocalizedStatus(statusValue);
        const statusText = el.querySelector('.status-text');
        if (statusText) statusText.textContent = label;
        else el.textContent = label;
    });

    document.querySelectorAll('[data-priority]').forEach(el => {
        const priorityValue = el.getAttribute('data-priority');
        const label = getLocalizedPriority(priorityValue);
        el.textContent = priorityValue === '--' ? label : `● ${label}`;
    });

    document.querySelectorAll('[data-category]').forEach(el => {
        const categoryValue = el.getAttribute('data-category');
        el.textContent = getLocalizedCategory(categoryValue);
    });

    document.querySelectorAll('[data-untitled="true"]').forEach(el => {
        el.textContent = Translate[lang].UntitledDraft;
    });

    document.querySelectorAll('[data-location-empty="true"]').forEach(el => {
        el.textContent = Translate[lang].NoLocationSet;
    });
}
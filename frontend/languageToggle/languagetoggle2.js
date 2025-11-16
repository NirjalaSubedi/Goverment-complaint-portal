let currentLanguage ='en';
    const Translate={
        'en':{
            'title':'Goverment Complaint Portal',
            'languageToggle': 'नेपाली',
            'citizen':'Citizen',
            'officer':'Officer',
            'Nav':'NAVIGATION',
            'myComplaints':'myComplaints',
            'Drafts':'Drafts',
            'Profile':'Profile',
            'Quick Actions':'Quick Actions',
            'New Complaint':'New Complaint',
            'Upload File':'Upload File',
            'Track and manage yoursubmitted complaints':'Track and manage your submitted complaints',
            'Total Complaints':'Total Complaints',
            'Submitted':'Submitted',
            'pending':'pending',
            'Awaiting response':'Awaiting response',
            'inProgress':'inProgress',
            'Being Processed':'Being Processed',
            'completed':'completed',
            'Success resolved ':'Success resolved ',
            'Sort':'Sort',
            'COMPLAINT':'COMPLAINT',
            'STATUS':'STATUS',
            'PRIORITY':'PRIORITY',
            'DATE':'DATE',
            'ACTIONS':'ACTIONS',
            'View Details':'View Details',

        },
        'ne':{
            'title':'सरकारी उजुरी पोर्टल',
            'languageToggle': 'English',
            'citizen':'नागरिक',
            'officer':'अधिकारी',
            'Nav':'नेभिगेसन',
            'myComplaints':'मेरो उजुरीहरू',
            'Drafts':'मसौदाहरू',
            'Profile':'प्रोफाइल',
            'Quick Actions':'छिटो कार्यहरू',
            'New Complaint':'नयाँ उजुरी',
            'Upload File':'फाइल अपलोड गर्नुहोस्',
            'Track and manage yoursubmitted complaints':'आफ्ना पेश गरिएका उजुरीहरू ट्र्याक र व्यवस्थापन गर्नुहोस्',
            'Total Complaints':'कुल उजुरीहरू',
            'Submitted':'पेश गरियो',
            'pending':'प्रतीक्षारत',
            'Awaiting response':'उत्तरको प्रतीक्षा गर्दै',
            'inProgress':'प्रगतिको क्रममा',
            'Being Processed':'प्रक्रियामा छ',
            'completed':'सम्पन्न भयो',
            'Success resolved ':'सफलतापूर्वक समाधान भयो ',
            'Sort':'क्रमबद्ध गर्नुहोस्',
            'COMPLAINT':'उजुरी',
            'STATUS':'स्थिति',
            'PRIORITY':'प्राथमिकता',
            'DATE':'मिति',
            'ACTIONS':'कार्यहरू',
            'View Details':'विवरण हेर्नुहोस्',
        }

    }
    function LanguageTranslate(){
    currentLanguage=currentLanguage==='en'?'ne':'en';
    document.getElementById('language-toggle').innerHTML = `<i class="material-icons">language</i> ${Translate[currentLanguage].languageToggle}`;
    document.getElementsByClassName('Heading1')[0].innerText=Translate[currentLanguage].title;
    document.getElementsByClassName('role')[0].innerText=Translate[currentLanguage].citizen;
    document.getElementById('nav00').innerText=Translate[currentLanguage].Nav;
    document.getElementsByClassName('myComplaints')[0].innerText=Translate[currentLanguage].myComplaints;
    document.getElementsByClassName('myDrafts')[0].innerText=Translate[currentLanguage].Drafts;
    document.getElementsByClassName('myProfile')[0].innerText=Translate[currentLanguage].Profile;
    document.getElementsByClassName('quickActionsHeading')[0].innerText=Translate[currentLanguage]['Quick Actions'];
    document.getElementsByClassName('newComplaintText')[0].innerText=Translate[currentLanguage]['New Complaint'];
    document.getElementsByClassName('uploadFileText')[0].innerText=Translate[currentLanguage]['Upload File'];
    document.getElementsByClassName('myComplaintsText')[0].innerText=Translate[currentLanguage]['Track and manage yoursubmitted complaints'];
    document.getElementsByClassName('boldColor')[0].innerText=Translate[currentLanguage]['Total Complaints'];
    document.getElementsByClassName('lightColor')[0].innerText=Translate[currentLanguage]['Submitted'];
    document.getElementsByClassName('boldColor')[1].innerText=Translate[currentLanguage]['pending'];
    document.getElementsByClassName('lightColor')[1].innerText=Translate[currentLanguage]['Awaiting response'];
    document.getElementsByClassName('boldColor')[2].innerText=Translate[currentLanguage]['inProgress'];
    document.getElementsByClassName('lightColor')[2].innerText=Translate[currentLanguage]['Being Processed'];
    document.getElementsByClassName('boldColor')[3].innerText=Translate[currentLanguage]['completed'];
    document.getElementsByClassName('lightColor')[3].innerText=Translate[currentLanguage]['Success resolved '];
    document.getElementsByClassName('sortText')[0].innerText=Translate[currentLanguage]['Sort'];
    document.getElementsByClassName('ComplaintHeader1')[0].children[0].innerText=Translate[currentLanguage]['COMPLAINT'];
    document.getElementsByClassName('ComplaintHeader1')[0].children[1].innerText=Translate[currentLanguage]['STATUS'];
    document.getElementsByClassName('ComplaintHeader1')[0].children[2].innerText=Translate[currentLanguage]['PRIORITY'];
    document.getElementsByClassName('ComplaintHeader1')[0].children[3].innerText=Translate[currentLanguage]['DATE'];
    document.getElementsByClassName('ComplaintHeader1')[0].children[4].innerText=Translate[currentLanguage]['ACTIONS'];
   document.querySelectorAll('.viewDetailsBtn').forEach(btn=>{
    btn.innerText=Translate[currentLanguage]['View Details'];
   });
}
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
            'myComplaintsText':'myComplaints',
            'Track and manage yoursubmitted complaints':'Track and manage your submitted complaints',
            'add':'Add',
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
            'update':'Update',
            'delete':'Delete',
            'title22':'title',
            'titledesc':'Provide detailed information about your issue here.',
            'complainttype':'ComplaintType*',
            'selectType':'Select Complaint Type',
            'corruption':'Corruption',
            'roaddamage':'roadDamage',
            'waterSupply':'waterSupply',
            'electricity':'Electricity',
            'HealthCare':'HealthCare',
            'other':'Other',
            'subject':'Subject*',
            'subjectPlaceholder':'Brief Subject of your Complaint',
            'location':'location*',
            'locationPlaceholder':'Enter the Location of the Issue',
            'priorityLevel':'Priority Level',
            'High':'High',
            'medium':'medium',
            'low':'low',
            'description':'Description*',
            'descriptionPlaceholder':'Provide detailed information about your issue here.',
            'Attachment':'Attachment',
            'cancel':'cancel',
            'submit':'submit',



            

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
            'myComplaintsText':'मेरो उजुरीहरू',
            'Track and manage yoursubmitted complaints':'आफ्ना पेश गरिएका उजुरीहरू ट्र्याक र व्यवस्थापन गर्नुहोस्',
            'add':'थप्नुहोस्',
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
            
            'title22':'शीर्षक',
            'titledesc':'यहाँ आफ्नो समस्याको बारेमा विस्तृत जानकारी प्रदान गर्नुहोस्।',
            'complainttype':'उजुरी प्रकार*',
            'selectType':'उजुरी प्रकार चयन गर्नुहोस्',
            'corruption':'भ्रष्टाचार',
            'roaddamage':'सडक क्षति',
            'waterSupply':'पानी आपूर्ति',
            'electricity':'बिजुली',
            'HealthCare':'स्वास्थ्य सेवा',
            'other':'अन्य',
            'subject':'विषय*',
            'subjectPlaceholder':'तपाईंको उजुरीको संक्षिप्त विषय',
            'location':'स्थान*',
            'locationPlaceholder':'समस्याको स्थान प्रविष्ट गर्नुहोस्',
            'priorityLevel':'प्राथमिकता स्तर',
            'High':'उच्च',
            'medium':'मध्यम',
            'low':'तल्लो',
            'description':'विवरण*',
            'descriptionPlaceholder':'यहाँ आफ्नो समस्याको बारेमा विस्तृत जानकारी प्रदान गर्नुहोस्।',
            'Attachment':'संलग्नक',
            'cancel':'रद्द गर्नुहोस्',
            'submit':'पेश गर्नुहोस्',
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

    document.getElementsByClassName('myComplaintsText')[0].innerText=Translate[currentLanguage]['myComplaintsText'];
    document.getElementById('complainttopdesc').innerText=Translate[currentLanguage]['Track and manage yoursubmitted complaints'];

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
    document.getElementById('title22').innerText=Translate[currentLanguage]['title22'];
    document.getElementById('titledesc').innerText=Translate[currentLanguage]['titledesc'];
    document.getElementById('complaint-type').innerText=Translate[currentLanguage]['complainttype'];
    document.getElementById('selectType').innerText=Translate[currentLanguage]['selectType'];
    document.getElementById('complaintCorruption').innerText=Translate[currentLanguage]['corruption'];
    document.getElementById('complaintRoaddamage').innerText=Translate[currentLanguage]['roaddamage'];
    document.getElementById('complaintWaterSupply').innerText=Translate[currentLanguage]['waterSupply'];
    document.getElementById('complaintElectricity').innerText=Translate[currentLanguage]['electricity'];
    document.getElementById('complaintHealthCare').innerText=Translate[currentLanguage]['HealthCare'];
    document.getElementById('complaintOthers').innerText=Translate[currentLanguage]['other'];
    document.getElementById('subject').innerText=Translate[currentLanguage]['subject'];
    document.getElementById('subjectPlaceholder').placeholder=Translate[currentLanguage]['subjectPlaceholder'];
    document.getElementById('location').innerText=Translate[currentLanguage]['location'];
    document.getElementById('locationplaceholder').placeholder=Translate[currentLanguage]['locationPlaceholder'];
    document.getElementById('priorityLevel').innerText=Translate[currentLanguage]['priorityLevel'];
    document.querySelector('label[for="high"]').innerText=Translate[currentLanguage]['High'];
    document.querySelector('label[for="medium"]').innerText=Translate[currentLanguage]['medium'];
    document.querySelector('label[for="low"]').innerText=Translate[currentLanguage]['low'];
    document.getElementById('descriptionlabel').innerText=Translate[currentLanguage]['description'];
    document.getElementById('description').placeholder=Translate[currentLanguage]['descriptionPlaceholder'];
    document.getElementById('attachmentlabel').innerText=Translate[currentLanguage]['Attachment'];
    document.getElementById('cancelBtn').innerText=Translate[currentLanguage]['cancel'];
    document.getElementById('submitbtn1').innerText=Translate[currentLanguage]['submit'];
}
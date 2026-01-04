document.addEventListener('DOMContentLoaded',function(){
   function hideElement(selector) {
        const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (element) {
            element.style.display = 'none';
        }
    }

    function showElement(selector, displayType = 'block') {
        const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (element) {
            element.style.display = displayType;
        }
    }
    function highlightNavButton(selector, shouldHighlight) {
        const element = document.querySelector(selector);
        if (element) {
            element.style.backgroundColor = shouldHighlight ? '#d5defb' : 'transparent';
            element.style.borderRadius = '8px';
            
            const navText = element.querySelector('.myProfile, .myComplaints, .myDrafts, .myCompleted'); 
            const navIcon = element.querySelector('.material-icons'); 

            if (navText) {
                navText.style.color = shouldHighlight ? '#1558df' : 'inherit';
            }
            if (navIcon) {
                navIcon.style.color = shouldHighlight ? '#1558df' : 'inherit';
            }
            
        }
    }

    function showMyComplaintsView() {
        highlightNavButton('.Complaints.Navbtn', true);
        highlightNavButton('.drafts.Navbtn', false);
        highlightNavButton('.completed.Navbtn', false);
        highlightNavButton('.profile.nav-btn', false); 

        showElement('.MainHeading', 'flex'); 
        const headingText = document.getElementById('myComplaintsText');
        const description = document.getElementById('complainttopdesc');
        if (headingText) headingText.textContent = 'myComplaints';
        if (description) description.textContent = 'Track and manage your submitted complaints';

       
        showElement('.complaintCards1', 'flex'); 
        showElement('.MainBox', 'block'); 
        showElement('.heading003', 'flex'); 
        
      
        showElement('.allcomplaintsTable', 'table'); 
        hideElement(document.querySelectorAll('.testTable')[1]); 

        hideElement('.registrationDetails');
        hideElement('.completed-section');
        hideElement('.drafts-section');
    }
    function showDraftsView() {
        highlightNavButton('.Complaints.Navbtn', false);
        highlightNavButton('.drafts.Navbtn', true);
        highlightNavButton('.completed.Navbtn', false);
        highlightNavButton('.profile.nav-btn', false); 
       
        hideElement('.MainHeading'); 
        hideElement('.complaintCards1'); 
        hideElement('.MainBox'); 
        hideElement('.allcomplaintsTable'); 
        hideElement('.registrationDetails');
        hideElement('.completed-section');
        
        showElement('.drafts-section', 'block');
    }
    function showCompletedView() {
        highlightNavButton('.Complaints.Navbtn', false);
        highlightNavButton('.drafts.Navbtn', false);
        highlightNavButton('.completed.Navbtn', true);
        highlightNavButton('.profile.nav-btn', false);

        hideElement('.MainHeading');
        hideElement('.complaintCards1');
        hideElement('.MainBox');
        hideElement('.allcomplaintsTable');
        hideElement(document.querySelectorAll('.testTable')[1]);
        hideElement('.registrationDetails');
        hideElement('.drafts-section');
        
        showElement('.completed-section', 'block');
        
        // Load completed complaints when view is shown
        if (typeof loadCompletedComplaints === 'function') {
            loadCompletedComplaints();
        }
    }
    function showProfileView() {
        highlightNavButton('.Complaints.Navbtn', false);
        highlightNavButton('.drafts.Navbtn', false);
        highlightNavButton('.completed.Navbtn', false);
        highlightNavButton('.profile.nav-btn', true); 

        hideElement('.MainHeading'); 

        hideElement('.complaintCards1'); 
        hideElement('.MainBox'); 
        
        hideElement('.allcomplaintsTable'); 
        hideElement(document.querySelectorAll('.testTable')[1]);

        showElement('.registrationDetails', 'block');
        hideElement('.completed-section');
        hideElement('.drafts-section');
    }

    const allTestTables = document.querySelectorAll('.testTable');
    allTestTables.forEach(table => table.style.display = 'none');
    hideElement('.registrationDetails');
    hideElement('.MainBox'); 
    hideElement('.MainHeading');

    showMyComplaintsView(); 
    const myComplaintsBtn = document.getElementById('myComplaints-btn');
    if (myComplaintsBtn) {
       
        myComplaintsBtn.parentElement.parentElement.addEventListener('click', showMyComplaintsView);
    }
    
    const draftsBtn = document.getElementById('myDrafts');
    if (draftsBtn) {
       
        draftsBtn.parentElement.parentElement.addEventListener('click', showDraftsView);
    }

    const completedBtn = document.getElementById('myCompleted');
    if (completedBtn) {
        completedBtn.parentElement.parentElement.addEventListener('click', showCompletedView);
    }

   
    const profileNavElement = document.querySelector('.profile.nav-btn');
    if (profileNavElement) {
        profileNavElement.addEventListener('click', showProfileView);
    }

    // Dropdown profile link
    const dropdownProfileLink = document.getElementById('dropdown-profile-link');
    if (dropdownProfileLink) {
        dropdownProfileLink.addEventListener('click', function(e) {
            e.preventDefault();
            showProfileView();
            // Close dropdown
            const dropdown = document.querySelector('.profile-dropdown');
            if (dropdown) {
                dropdown.style.display = 'none';
            }
        });
    }


});

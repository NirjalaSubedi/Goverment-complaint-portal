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
            
            const navText = element.querySelector('.myProfile, .myComplaints, .myDrafts'); 
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
    }
    function showDraftsView() {
        highlightNavButton('.Complaints.Navbtn', false);
        highlightNavButton('.drafts.Navbtn', true);
        highlightNavButton('.profile.nav-btn', false); 
       
        hideElement('.MainHeading'); 

        
        hideElement('.complaintCards1'); 
        hideElement('.MainBox'); 
        
        hideElement('.allcomplaintsTable'); 
        const draftsTable = document.querySelectorAll('.testTable')[1];
        if (draftsTable) {
            showElement(draftsTable, 'table'); 
            draftsTable.style.width = '100%'; 
            draftsTable.style.margin = '20px 0';
        }

        hideElement('.registrationDetails');
    }

});

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

    

});

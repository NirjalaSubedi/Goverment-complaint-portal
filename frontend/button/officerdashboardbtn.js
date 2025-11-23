document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.innerHTML = `
        .pending-task-buttons {
            display: flex;
            gap: 10px; 
            margin-top: 5px;
            align-items: center;
        }
        .pending-task-buttons button {
            width: auto !important;
            padding: 5px 10px; 
        }
        .Complaints.Navbtn.active-nav-btn .notification-badge {
            background-color: transparent !important; 
            color: black !important;
        }`;
    document.head.appendChild(style);
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
            element.style.borderRadius = shouldHighlight ? '8px' : '0px'; 
            const navText = element.querySelector('p'); 
            const navIcon = element.querySelector('i'); 
            if (navText) {
                navText.style.color = shouldHighlight ? 'rgb(37, 99, 235)' : 'inherit';
            }
            if (navIcon) {
                navIcon.style.color = shouldHighlight ? 'rgb(37, 99, 235)' : 'inherit';
            }
            const badge = element.querySelector('.notification-badge');
            if (badge) {
                if (element.classList.contains('Complaints') && shouldHighlight) {
                    badge.style.color = 'black'; 
                } else if (!shouldHighlight) {
                    badge.style.backgroundColor = '#e0e0e0';
                    badge.style.color = 'black'; 
                } else {
                    badge.style.backgroundColor = 'transparent';
                    badge.style.color = 'black'; 
                }
            }
        }
    }
});
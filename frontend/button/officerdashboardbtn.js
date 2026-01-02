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
    const allComplaintsBtn = document.querySelector('.Complaints.Navbtn');
    const assignedMeBtn = document.querySelector('.favorites.Navbtn'); 
    const pendingBtn = document.querySelector('.drafts.Navbtn:nth-child(3)'); 
    const completedBtn = document.querySelector('.drafts.Navbtn:nth-child(4)'); 

    const mainBox = document.querySelector('.MainBox'); 
    const pendingTaskTable = document.getElementById('pendingtask'); 
    const completedTable = document.getElementById('completed'); 
    const assignedMeTable = document.querySelector('.dashboard-container > .testTable:last-child');
    
    const allContentContainers = [mainBox, pendingTaskTable, completedTable, assignedMeTable];

    function resetNavButtons() {
        highlightNavButton('.Complaints.Navbtn', false);
        highlightNavButton('.favorites.Navbtn', false);
        highlightNavButton('.drafts.Navbtn:nth-child(3)', false);
        highlightNavButton('.drafts.Navbtn:nth-child(4)', false); 
    }

    function hideAllContent() {
        allContentContainers.forEach(container => {
            if (container) {
                hideElement(container);
            }
        });
    }
    function showAllComplaintsView() {
        resetNavButtons();
        highlightNavButton('.Complaints.Navbtn', true);
        hideAllContent();
        showElement(mainBox, 'block'); 
        hideElement('.MainHeading'); 
    }
    function showOfficerAssignedView() {
        resetNavButtons();
        highlightNavButton('.favorites.Navbtn', true);
        hideAllContent();
        showElement(assignedMeTable, 'block'); 
        hideElement('.MainHeading');
        loadAssignedComplaints(); // Load assigned complaints
        const assignedTaskButtons = assignedMeTable.querySelector('.pending-task-buttons');
        if(assignedTaskButtons) { assignedTaskButtons.remove(); }
        const reviewBtn = assignedMeTable.querySelector('#review');
        if(reviewBtn) { showElement(reviewBtn, 'block'); } 
    }
    
    function showPendingView() {
        resetNavButtons();
        highlightNavButton('.drafts.Navbtn:nth-child(3)', true);
        hideAllContent();
        showElement(pendingTaskTable, 'block'); 
        hideElement('.MainHeading');
        loadPendingComplaints(); // Load pending complaints
    }
    function showCompletedView() {
        resetNavButtons();
        highlightNavButton('.drafts.Navbtn:nth-child(4)', true);
        hideAllContent();
        showElement(completedTable, 'block'); 
        hideElement('.MainHeading'); 
    }
    hideAllContent();
    hideElement('.MainHeading');
    
    showAllComplaintsView(); 
    
    if (allComplaintsBtn) {
        allComplaintsBtn.addEventListener('click', showAllComplaintsView);
    }
    
    if (assignedMeBtn) {
        assignedMeBtn.addEventListener('click', showOfficerAssignedView);
    }

    if (pendingBtn) {
        pendingBtn.addEventListener('click', showPendingView);
    }

    if (completedBtn) {
        completedBtn.addEventListener('click', showCompletedView);
    }
});
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
});
function showOfficerApprovalsSection() {
    // Hide manage users section
    document.getElementById('manageUsersSection').style.display = 'none';
    // Hide view complaints section
    document.getElementById('viewComplaintsSection').style.display = 'none';
    // Show officer approvals section
    document.getElementById('officerApprovalsSection').style.display = 'block';
    
    document.getElementById('officerApprovalsTab').classList.add('active');
    document.getElementById('manageUsersTab').classList.remove('active');
    document.getElementById('viewComplaintsTab').classList.remove('active');
    
    loadPendingOfficers();
}

function showManageUsersSection() {
    // Hide officer approvals section
    document.getElementById('officerApprovalsSection').style.display = 'none';
    // Hide view complaints section
    document.getElementById('viewComplaintsSection').style.display = 'none';
    // Show manage users section
    document.getElementById('manageUsersSection').style.display = 'block';
    
    document.getElementById('manageUsersTab').classList.add('active');
    document.getElementById('officerApprovalsTab').classList.remove('active');
    document.getElementById('viewComplaintsTab').classList.remove('active');
    
    loadAllUsers();
}

function showViewComplaintsSection() {
    // Hide officer approvals section
    document.getElementById('officerApprovalsSection').style.display = 'none';
    // Hide manage users section
    document.getElementById('manageUsersSection').style.display = 'none';
    // Show view complaints section
    document.getElementById('viewComplaintsSection').style.display = 'block';

    document.getElementById('viewComplaintsTab').classList.add('active');
    document.getElementById('officerApprovalsTab').classList.remove('active');
    document.getElementById('manageUsersTab').classList.remove('active');

    loadAdminComplaints();
}


function showOfficerApprovalsSection() {
    // Hide manage users section
    document.getElementById('manageUsersSection').style.display = 'none';
    // Show officer approvals section
    document.getElementById('officerApprovalsSection').style.display = 'block';
    
    document.getElementById('officerApprovalsTab').classList.add('active');
    document.getElementById('manageUsersTab').classList.remove('active');
    
    loadPendingOfficers();
}

function showManageUsersSection() {
    // Hide officer approvals section
    document.getElementById('officerApprovalsSection').style.display = 'none';
    // Show manage users section
    document.getElementById('manageUsersSection').style.display = 'block';
    
    document.getElementById('manageUsersTab').classList.add('active');
    document.getElementById('officerApprovalsTab').classList.remove('active');
    
    loadAllUsers();
}

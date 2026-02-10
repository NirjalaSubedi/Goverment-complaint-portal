function showOfficerApprovalsSection() {
    // Hide manage users section
    document.getElementById('manageUsersSection').style.display = 'none';
    // Hide view complaints section
    document.getElementById('viewComplaintsSection').style.display = 'none';
    // Hide add department section
    document.getElementById('addDepartmentSection').style.display = 'none';
    // Hide view departments section
    document.getElementById('viewDepartmentsSection').style.display = 'none';
    // Show officer approvals section
    document.getElementById('officerApprovalsSection').style.display = 'block';
    
    document.getElementById('officerApprovalsTab').classList.add('active');
    document.getElementById('manageUsersTab').classList.remove('active');
    document.getElementById('viewComplaintsTab').classList.remove('active');
    document.getElementById('addDepartmentTab').classList.remove('active');
    document.getElementById('viewDepartmentsTab').classList.remove('active');
    
    loadPendingOfficers();
}

function showManageUsersSection() {
    // Hide officer approvals section
    document.getElementById('officerApprovalsSection').style.display = 'none';
    // Hide view complaints section
    document.getElementById('viewComplaintsSection').style.display = 'none';
    // Hide add department section
    document.getElementById('addDepartmentSection').style.display = 'none';
    // Hide view departments section
    document.getElementById('viewDepartmentsSection').style.display = 'none';
    // Show manage users section
    document.getElementById('manageUsersSection').style.display = 'block';
    
    document.getElementById('manageUsersTab').classList.add('active');
    document.getElementById('officerApprovalsTab').classList.remove('active');
    document.getElementById('viewComplaintsTab').classList.remove('active');
    document.getElementById('addDepartmentTab').classList.remove('active');
    document.getElementById('viewDepartmentsTab').classList.remove('active');
    
    loadAllUsers();
}

function showViewComplaintsSection() {
    // Hide officer approvals section
    document.getElementById('officerApprovalsSection').style.display = 'none';
    // Hide manage users section
    document.getElementById('manageUsersSection').style.display = 'none';
    // Hide add department section
    document.getElementById('addDepartmentSection').style.display = 'none';
    // Hide view departments section
    document.getElementById('viewDepartmentsSection').style.display = 'none';
    // Show view complaints section
    document.getElementById('viewComplaintsSection').style.display = 'block';

    document.getElementById('viewComplaintsTab').classList.add('active');
    document.getElementById('officerApprovalsTab').classList.remove('active');
    document.getElementById('manageUsersTab').classList.remove('active');
    document.getElementById('addDepartmentTab').classList.remove('active');
    document.getElementById('viewDepartmentsTab').classList.remove('active');

    loadAdminComplaints();
}

function showAddDepartmentSection() {
    // Hide officer approvals section
    document.getElementById('officerApprovalsSection').style.display = 'none';
    // Hide manage users section
    document.getElementById('manageUsersSection').style.display = 'none';
    // Hide view complaints section
    document.getElementById('viewComplaintsSection').style.display = 'none';
    // Hide view departments section
    document.getElementById('viewDepartmentsSection').style.display = 'none';
    // Show add department section
    document.getElementById('addDepartmentSection').style.display = 'block';

    document.getElementById('addDepartmentTab').classList.add('active');
    document.getElementById('officerApprovalsTab').classList.remove('active');
    document.getElementById('manageUsersTab').classList.remove('active');
    document.getElementById('viewComplaintsTab').classList.remove('active');
    document.getElementById('viewDepartmentsTab').classList.remove('active');
}

function showViewDepartmentsSection() {
    // Hide officer approvals section
    document.getElementById('officerApprovalsSection').style.display = 'none';
    // Hide manage users section
    document.getElementById('manageUsersSection').style.display = 'none';
    // Hide view complaints section
    document.getElementById('viewComplaintsSection').style.display = 'none';
    // Hide add department section
    document.getElementById('addDepartmentSection').style.display = 'none';
    // Show view departments section
    document.getElementById('viewDepartmentsSection').style.display = 'block';

    document.getElementById('viewDepartmentsTab').classList.add('active');
    document.getElementById('officerApprovalsTab').classList.remove('active');
    document.getElementById('manageUsersTab').classList.remove('active');
    document.getElementById('viewComplaintsTab').classList.remove('active');
    document.getElementById('addDepartmentTab').classList.remove('active');

    loadDepartments();
}

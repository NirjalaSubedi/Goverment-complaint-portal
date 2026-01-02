// Global variable to store all users
let allUsersData = [];
let currentFilter = 'all';

// Manage Users functionality
function loadAllUsers() {
    console.log('Loading all users...');
    fetch('../backend/adminverify.php?action=getAllUsers')
        .then(response => response.text())
        .then(text => {
            console.log('Raw response:', text);
            try {
                const data = JSON.parse(text);
                console.log('Parsed data:', data);
                if (data.success && data.users.length > 0) {
                    displayAllUsers(data.users);
                    document.getElementById('noUsersMsg').style.display = 'none';
                    document.getElementById('usersTable').style.display = 'table';
                } else {
                    document.getElementById('usersTable').style.display = 'none';
                    document.getElementById('noUsersMsg').style.display = 'block';
                }
            } catch (e) {
                console.error('JSON parse error:', e);
                document.getElementById('noUsersMsg').innerHTML = 
                    '<p style="color: #dc3545;">Error loading users. Check console for details.</p>';
                document.getElementById('noUsersMsg').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error loading users:', error);
            document.getElementById('noUsersMsg').innerHTML = 
                '<p style="color: #dc3545;">Network error. Please check your connection.</p>';
            document.getElementById('noUsersMsg').style.display = 'block';
        });
}

function displayAllUsers(users) {
    // Store all users for filtering
    allUsersData = users;
    currentFilter = 'all';
    
    // Reset filter buttons
    document.getElementById('filterAllBtn').style.backgroundColor = '#007bff';
    document.getElementById('filterCitizenBtn').style.backgroundColor = '#28a745';
    document.getElementById('filterOfficerBtn').style.backgroundColor = '#dc3545';
    document.getElementById('filterAllBtn').style.backgroundColor = '#007bff';
    
    renderUsers(users);
}

function filterUsers(userType) {
    currentFilter = userType;
    
    // Update filter button styles
    document.getElementById('filterAllBtn').style.backgroundColor = userType === 'all' ? '#0056b3' : '#007bff';
    document.getElementById('filterCitizenBtn').style.backgroundColor = userType === 'Citizen' ? '#218838' : '#28a745';
    document.getElementById('filterOfficerBtn').style.backgroundColor = userType === 'Officer' ? '#c82333' : '#dc3545';
    
    // Filter the users
    let filteredUsers = allUsersData;
    if (userType !== 'all') {
        filteredUsers = allUsersData.filter(user => user.user_type === userType);
    }
    
    renderUsers(filteredUsers);
}

function renderUsers(users) {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';

    if (users.length === 0) {
        document.getElementById('usersTable').style.display = 'none';
        document.getElementById('noUsersMsg').style.display = 'block';
        document.getElementById('noUsersMsg').innerHTML = '<p>No ' + (currentFilter === 'all' ? 'users' : currentFilter.toLowerCase() + 's') + ' found</p>';
        return;
    }

    users.forEach(user => {
        const initials = user.full_name.split(' ').map(n => n[0]).join('').toUpperCase();
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
        const bgColor = colors[Math.floor(Math.random() * colors.length)];

        const documentLink = user.file_path && user.user_type === 'Officer'
            ? `<a href="javascript:void(0)" onclick="openDocumentModal('${user.file_path}')" style="text-decoration: none; color: #007bff;"><i class="material-icons" style="vertical-align: middle;">description</i> View Doc</a>`
            : '<span style="color: #999;">No document</span>';

        // Status badge styling
        let statusBadge = '';
        if (user.is_approved === 'Approved') {
            statusBadge = '<span style="background-color: #28a745; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">Approved</span>';
        } else if (user.is_approved === 'Pending') {
            statusBadge = '<span style="background-color: #ffc107; color: #000; padding: 4px 12px; border-radius: 12px; font-size: 12px;">Pending</span>';
        } else if (user.is_approved === 'Rejected') {
            statusBadge = '<span style="background-color: #dc3545; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">Rejected</span>';
        } else {
            statusBadge = '<span style="background-color: #6c757d; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">N/A</span>';
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="combine-logo-title">
                    <div class="officer-initials" style="background-color: ${bgColor};">${initials}</div>
                    <div class="complaintTitleDetails">
                        <p class="complaintTitleText" style="font-weight: bold;">${user.full_name}</p>
                        <p id="complaintID">ID: ${user.user_id}</p>
                    </div>
                </div>
            </td>
            <td><span style="background-color: ${user.user_type === 'Officer' ? '#dc3545' : '#28a745'}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">${user.user_type}</span></td>
            <td>${user.department_name || (user.user_type === 'Citizen' ? 'N/A' : 'Not specified')}</td>
            <td>${user.phone_number || 'N/A'}</td>
            <td>${user.email}</td>
            <td>${statusBadge}</td>
            <td>${documentLink}</td>
            <td>
                <button class="delete-btn" onclick="confirmDeleteUser(${user.user_id}, '${user.full_name}')" style="padding: 6px 12px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                    <i class="material-icons" style="vertical-align: middle; font-size: 16px;">delete</i> Delete
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Show table and hide no users message
    document.getElementById('usersTable').style.display = 'table';
    document.getElementById('noUsersMsg').style.display = 'none';
}

// Delete user functions
function confirmDeleteUser(userId, userName) {
    if (confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
        deleteUser(userId);
    }
}

function deleteUser(userId) {
    const formData = new FormData();
    formData.append('action', 'deleteUser');
    formData.append('user_id', userId);

    fetch('../backend/adminverify.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('User deleted successfully.');
            loadAllUsers();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while deleting the user.');
    });
}

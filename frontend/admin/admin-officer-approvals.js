// Officer Approvals functionality
function loadPendingOfficers() {
    console.log('Loading pending officers...');
    fetch('../backend/adminverify.php?action=getPendingOfficers')
        .then(response => {
            console.log('Response status:', response.status);
            return response.text();
        })
        .then(text => {
            console.log('Raw response:', text);
            try {
                const data = JSON.parse(text);
                console.log('Parsed data:', data);
                if (data.success && data.officers.length > 0) {
                    displayOfficers(data.officers);
                    document.getElementById('noOfficersMsg').style.display = 'none';
                    document.getElementById('officerTable').style.display = 'table';
                } else {
                    document.getElementById('officerTable').style.display = 'none';
                    document.getElementById('noOfficersMsg').style.display = 'block';
                    if (data.message) {
                        document.getElementById('noOfficersMsg').innerHTML = 
                            `<p style="color: #dc3545;">${data.message}</p>`;
                    }
                }
            } catch (e) {
                console.error('JSON parse error:', e);
                document.getElementById('noOfficersMsg').innerHTML = 
                    '<p style="color: #dc3545;">Error loading officers. Check console for details.</p>';
                document.getElementById('noOfficersMsg').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error loading officers:', error);
            document.getElementById('noOfficersMsg').innerHTML = 
                '<p style="color: #dc3545;">Network error. Please check your connection.</p>';
            document.getElementById('noOfficersMsg').style.display = 'block';
        });
}

function displayOfficers(officers) {
    const tbody = document.getElementById('officerTableBody');
    tbody.innerHTML = '';

    officers.forEach(officer => {
        const initials = officer.full_name.split(' ').map(n => n[0]).join('').toUpperCase();
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
        const bgColor = colors[Math.floor(Math.random() * colors.length)];

        const documentLink = officer.file_path 
            ? `<a href="javascript:void(0)" onclick="openDocumentModal('${officer.file_path}')" style="text-decoration: none; color: #007bff;"><i class="material-icons" style="vertical-align: middle;">description</i> View Doc</a>`
            : '<span style="color: #999;">No document</span>';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="combine-logo-title">
                    <div class="officer-initials" style="background-color: ${bgColor};">${initials}</div>
                    <div class="complaintTitleDetails">
                        <p class="complaintTitleText" style="font-weight: bold;">${officer.full_name}</p>
                        <p id="complaintID">ID: ${officer.user_id}</p>
                    </div>
                </div>
            </td>
            <td>${officer.department_name || 'Not specified'}</td>
            <td>${officer.phone_number || 'N/A'}</td>
            <td>${officer.email}</td>
            <td>${documentLink}</td>
            <td style="white-space: nowrap;">
                <button class="approve-btn" onclick="confirmApprove(${officer.user_id})">Approve</button>
                <button class="reject-btn" onclick="confirmReject(${officer.user_id})">Reject</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function confirmApprove(userId) {
    if (confirm('Are you sure you want to approve this officer?')) {
        approveOfficer(userId);
    }
}

function confirmReject(userId) {
    if (confirm('Are you sure you want to reject this officer?')) {
        rejectOfficer(userId);
    }
}

function approveOfficer(userId) {
    const formData = new FormData();
    formData.append('action', 'approveOfficer');
    formData.append('user_id', userId);

    fetch('../backend/adminverify.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Officer approved successfully! They can now log in.');
            loadPendingOfficers();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while approving the officer.');
    });
}

function rejectOfficer(userId) {
    const formData = new FormData();
    formData.append('action', 'rejectOfficer');
    formData.append('user_id', userId);

    fetch('../backend/adminverify.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Officer rejected.');
            loadPendingOfficers();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while rejecting the officer.');
    });
}

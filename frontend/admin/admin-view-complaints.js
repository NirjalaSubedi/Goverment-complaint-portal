function getAdminLang() {
    const langKey = localStorage.getItem('currentLanguage') || 'en';
    if (typeof adminTranslations !== 'undefined' && adminTranslations[langKey]) {
        return adminTranslations[langKey];
    }
    return {
        viewDetails: 'View Details',
        noComplaintsFound: 'No complaints found'
    };
}

function loadAdminComplaints() {
    console.log('Loading admin complaints...');
    fetch('../backend/getallcomplaints.php')
        .then(response => response.text())
        .then(text => {
            console.log('Raw response:', text);
            try {
                const data = JSON.parse(text);
                if (data.error) {
                    showComplaintsError(data.error);
                    return;
                }
                if (data.success && data.complaints && data.complaints.length > 0) {
                    renderAdminComplaints(data.complaints);
                    document.getElementById('noComplaintsMsg').style.display = 'none';
                    document.getElementById('complaintsTable').style.display = 'table';
                } else {
                    document.getElementById('complaintsTable').style.display = 'none';
                    document.getElementById('noComplaintsMsg').style.display = 'block';
                    const lang = getAdminLang();
                    const msg = document.querySelector('#noComplaintsMsg p');
                    if (msg) msg.textContent = lang.noComplaintsFound;
                }
            } catch (e) {
                console.error('JSON parse error:', e);
                showComplaintsError('Error loading complaints. Check console for details.');
            }
        })
        .catch(error => {
            console.error('Error loading complaints:', error);
            showComplaintsError('Network error. Please check your connection.');
        });
}

function showComplaintsError(message) {
    const msg = document.getElementById('noComplaintsMsg');
    msg.innerHTML = `<p style="color: #dc3545;">${message}</p>`;
    msg.style.display = 'block';
    const table = document.getElementById('complaintsTable');
    if (table) table.style.display = 'none';
}

function formatAdminStatus(status) {
    const value = (status || '').toString().trim().toLowerCase();
    if (value === 'inprogress' || value === 'in progress') return 'in_progress';
    if (value === 'resolved') return 'resolved';
    if (value === 'completed') return 'completed';
    if (value === 'rejected') return 'rejected';
    if (value === 'pending' || value === '') return 'pending';
    return 'pending';
}

function getStatusLabel(statusKey, lang) {
    switch (statusKey) {
        case 'in_progress':
            return lang.statusInProgress;
        case 'resolved':
            return lang.statusResolved;
        case 'completed':
            return lang.statusCompleted;
        case 'rejected':
            return lang.statusRejected;
        default:
            return lang.statusPending;
    }
}

function buildStatusBadge(statusKey) {
    const lang = getAdminLang();
    if (statusKey === 'in_progress') {
        return '<span style="background-color: #E3F2FD; color: #1976D2; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 500; display: inline-block;">' + lang.statusInProgress + '</span>';
    }
    if (statusKey === 'resolved' || statusKey === 'completed') {
        const label = statusKey === 'resolved' ? lang.statusResolved : lang.statusCompleted;
        return '<span style="background-color: #E8F5E9; color: #2E7D32; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 500; display: inline-block;">' + label + '</span>';
    }
    if (statusKey === 'rejected') {
        return '<span style="background-color: #FFEBEE; color: #C62828; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 500; display: inline-block;">' + lang.statusRejected + '</span>';
    }
    return '<span style="background-color: #FFF3E0; color: #E65100; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 500; display: inline-block;">' + lang.statusPending + '</span>';
}

function buildPriorityBadge(priorityLevel) {
    const lang = getAdminLang();
    const value = (priorityLevel || '').toString().trim().toLowerCase();
    if (value === 'high') {
        return '<span style="display: inline-flex; align-items: center; gap: 6px;"><span style="width: 8px; height: 8px; background-color: #DC2626; border-radius: 50%; display: inline-block;"></span><span style="color: #DC2626; font-weight: 500;">' + lang.priorityHigh + '</span></span>';
    }
    if (value === 'low') {
        return '<span style="display: inline-flex; align-items: center; gap: 6px;"><span style="width: 8px; height: 8px; background-color: #10B981; border-radius: 50%; display: inline-block;"></span><span style="color: #10B981; font-weight: 500;">' + lang.priorityLow + '</span></span>';
    }
    return '<span style="display: inline-flex; align-items: center; gap: 6px;"><span style="width: 8px; height: 8px; background-color: #F59E0B; border-radius: 50%; display: inline-block;"></span><span style="color: #F59E0B; font-weight: 500;">' + lang.priorityMedium + '</span></span>';
}

function renderAdminComplaints(complaints) {
    const lang = getAdminLang();
    const tbody = document.getElementById('complaintsTableBody');
    tbody.innerHTML = '';

    complaints.forEach(complaint => {
        const row = document.createElement('tr');
        const statusKey = formatAdminStatus(complaint.status);
        const statusBadge = buildStatusBadge(statusKey);
        const priorityBadge = buildPriorityBadge(complaint.priority_level || 'Medium');
        const submittedDate = complaint.submission_date ? new Date(complaint.submission_date).toLocaleDateString() : 'N/A';
        const citizenName = complaint.citizen_name || 'Citizen';
        const category = complaint.category_name || 'N/A';

        row.innerHTML = `
            <td>
                <div class="combine-logo-title">
                    <div class="complaintTitleDetails">
                        <p class="complaintTitleText" style="font-weight: bold;">${complaint.subject || 'Untitled Complaint'}</p>
                        <p id="complaintID">ID: C${String(complaint.complaint_id).padStart(3, '0')} | ${citizenName} | ${category}</p>
                    </div>
                </div>
            </td>
            <td>${statusBadge}</td>
            <td>${priorityBadge}</td>
            <td>${submittedDate}</td>
            <td>
                <button class="view-btn" onclick="openComplaintDetails(${complaint.complaint_id})" style="padding: 6px 12px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                    <i class="material-icons" style="vertical-align: middle; font-size: 16px;">visibility</i> ${lang.viewDetails}
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('complaintsTable').style.display = 'table';
    document.getElementById('noComplaintsMsg').style.display = 'none';
}

function openComplaintDetails(complaintId) {
    window.location.href = `Viewdetails.html?complaint_id=${complaintId}`;
}

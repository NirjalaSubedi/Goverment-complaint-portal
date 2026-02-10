function getAdminLang() {
    const langKey = localStorage.getItem('currentLanguage') || 'en';
    if (typeof adminTranslations !== 'undefined' && adminTranslations[langKey]) {
        return adminTranslations[langKey];
    }
    return {
        deleteDepartment: 'Delete',
        deleteDepartmentConfirm: 'Are you sure you want to delete this department?',
        deleteDepartmentSuccess: 'Department deleted successfully',
        deleteDepartmentFailed: 'Failed to delete department'
    };
}

function submitDepartment(event) {
    if (event) event.preventDefault();

    const input = document.getElementById('departmentName');
    const message = document.getElementById('departmentMessage');
    const name = (input.value || '').trim();

    message.textContent = '';
    message.style.color = '#dc3545';

    if (!name) {
        message.textContent = 'Department name is required';
        return;
    }

    const formData = new FormData();
    formData.append('department_name', name);

    fetch('../backend/adddepartment.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            message.style.color = '#28a745';
            message.textContent = data.message || 'Department added successfully';
            input.value = '';
            if (typeof loadDepartments === 'function') {
                loadDepartments();
            }
        } else {
            message.style.color = '#dc3545';
            message.textContent = data.message || 'Failed to add department';
        }
    })
    .catch(() => {
        message.style.color = '#dc3545';
        message.textContent = 'Network error. Please try again.';
    });
}

function loadDepartments() {
    fetch('../backend/getdepartments.php')
        .then(response => response.json())
        .then(data => {
            if (data.success && data.departments && data.departments.length > 0) {
                renderDepartments(data.departments);
                document.getElementById('noDepartmentsMsg').style.display = 'none';
                document.getElementById('departmentsTable').style.display = 'table';
            } else {
                document.getElementById('departmentsTable').style.display = 'none';
                document.getElementById('noDepartmentsMsg').style.display = 'block';
            }
        })
        .catch(() => {
            const msg = document.getElementById('noDepartmentsMsg');
            msg.style.display = 'block';
            msg.innerHTML = '<p style="color: #dc3545;">Failed to load departments</p>';
            const table = document.getElementById('departmentsTable');
            if (table) table.style.display = 'none';
        });
}

function renderDepartments(departments) {
    const lang = getAdminLang();
    const tbody = document.getElementById('departmentsTableBody');
    tbody.innerHTML = '';

    departments.forEach(department => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="text-align: center;">${department.department_id ?? 'N/A'}</td>
            <td>${department.department_name || 'N/A'}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn delete-btn" onclick="deleteDepartment(${department.department_id})">
                        <i class="material-icons">delete</i> ${lang.deleteDepartment}
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('departmentsTable').style.display = 'table';
    document.getElementById('noDepartmentsMsg').style.display = 'none';
}

function deleteDepartment(departmentId) {
    const lang = getAdminLang();
    if (!departmentId) return;
    if (!confirm(lang.deleteDepartmentConfirm)) return;

    const formData = new FormData();
    formData.append('department_id', departmentId);

    fetch('../backend/deletedepartment.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message || lang.deleteDepartmentSuccess);
            loadDepartments();
        } else {
            alert(data.message || lang.deleteDepartmentFailed);
        }
    })
    .catch(() => {
        alert(lang.deleteDepartmentFailed);
    });
}

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
    const tbody = document.getElementById('departmentsTableBody');
    tbody.innerHTML = '';

    departments.forEach(department => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="text-align: center;">${department.department_id ?? 'N/A'}</td>
            <td>${department.department_name || 'N/A'}</td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('departmentsTable').style.display = 'table';
    document.getElementById('noDepartmentsMsg').style.display = 'none';
}

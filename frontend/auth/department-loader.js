const departmentTranslations = {
    'Roads Department': { ne: 'सडक विभाग' },
    'Water Supply Department': { ne: 'पानी आपूर्ति विभाग' },
    'Electricity Authority': { ne: 'विद्युत प्राधिकरण' },
    'Anti-Corruption Commission': { ne: 'भ्रष्टाचार विरोधी विभाग' },
    'Other': { ne: 'अन्य' }
};

let cachedDepartments = [];

function getDepartmentLabel(departmentName) {
    if (currentLanguage === 'ne' && departmentTranslations[departmentName]) {
        return departmentTranslations[departmentName].ne;
    }
    return departmentName;
}

function setDepartmentPlaceholder() {
    const select = document.getElementById('department');
    if (!select) return;

    let placeholder = select.querySelector('option[data-placeholder="true"]');
    if (!placeholder) {
        placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.disabled = true;
        placeholder.selected = true;
        placeholder.dataset.placeholder = 'true';
        select.insertBefore(placeholder, select.firstChild);
    }

    placeholder.textContent = currentLanguage === 'ne'
        ? 'आफ्नो विभाग चयन गर्नुहोस्'
        : 'Select your department';
}

function renderDepartments() {
    const select = document.getElementById('department');
    if (!select) return;

    setDepartmentPlaceholder();

    const existingOptions = Array.from(select.querySelectorAll('option'))
        .filter(option => option.dataset.placeholder !== 'true');
    existingOptions.forEach(option => option.remove());

    const fragment = document.createDocumentFragment();
    cachedDepartments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept.department_name;
        option.textContent = getDepartmentLabel(dept.department_name);
        fragment.appendChild(option);
    });
    select.appendChild(fragment);
}

function loadDepartmentsForAuth() {
    fetch('../backend/getdepartments_public.php')
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.departments)) {
                cachedDepartments = data.departments;
                renderDepartments();
            }
        })
        .catch(() => {
            setDepartmentPlaceholder();
        });
}

function updateAuthDepartmentOptions() {
    if (cachedDepartments.length > 0) {
        renderDepartments();
    } else {
        loadDepartmentsForAuth();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadDepartmentsForAuth();
});

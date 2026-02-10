let departmentTranslations = {};
let translationsLoaded = false;
let isTranslating = false;
const translateEndpoint = '../backend/translate.php';

const fallbackDepartments = [
    { department_name: 'Roads Department' },
    { department_name: 'Water Supply Department' },
    { department_name: 'Electricity Authority' },
    { department_name: 'Anti-Corruption Commission' },
    { department_name: 'Other' }
];

let cachedDepartments = [];

function normalizeDepartmentName(departmentName) {
    return (departmentName || '').trim().toLowerCase();
}

function getDepartmentLabel(departmentName) {
    const normalized = normalizeDepartmentName(departmentName);
    if (currentLanguage === 'ne' && departmentTranslations[normalized]) {
        return departmentTranslations[normalized];
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
    const missingTranslations = [];

    cachedDepartments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept.department_name;
        const normalized = normalizeDepartmentName(dept.department_name);
        option.textContent = getDepartmentLabel(dept.department_name);
        if (currentLanguage === 'ne' && !departmentTranslations[normalized]) {
            missingTranslations.push(dept.department_name);
        }
        fragment.appendChild(option);
    });

    select.appendChild(fragment);

    if (currentLanguage === 'ne' && missingTranslations.length > 0) {
        translateMissingDepartments(missingTranslations);
    }
}

function loadDepartmentTranslations() {
    if (translationsLoaded) return Promise.resolve();

    return fetch('auth/department-translations.json')
        .then(response => response.json())
        .then(data => {
            if (data && typeof data === 'object') {
                const normalizedMap = {};
                Object.keys(data).forEach(key => {
                    normalizedMap[normalizeDepartmentName(key)] = data[key];
                });
                departmentTranslations = normalizedMap;
            }
            translationsLoaded = true;
        })
        .catch(() => {
            translationsLoaded = true;
        });
}

function loadDepartmentsForAuth() {
    Promise.all([loadDepartmentTranslations(), fetch('../backend/getdepartments_public.php')])
        .then(results => results[1].json())
        .then(data => {
            if (data.success && Array.isArray(data.departments) && data.departments.length > 0) {
                cachedDepartments = data.departments;
            } else {
                cachedDepartments = fallbackDepartments;
            }
            renderDepartments();
        })
        .catch(() => {
            cachedDepartments = fallbackDepartments;
            renderDepartments();
        });
}

function translateMissingDepartments(departmentNames) {
    if (isTranslating) return;
    isTranslating = true;

    const uniqueNames = Array.from(new Set(departmentNames));
    const promises = uniqueNames.map(name => translateText(name));

    Promise.all(promises)
        .then(() => {
            if (currentLanguage === 'ne') {
                renderDepartments();
            }
        })
        .finally(() => {
            isTranslating = false;
        });
}

function translateText(text) {
    const normalized = normalizeDepartmentName(text);
    if (!normalized || departmentTranslations[normalized]) {
        return Promise.resolve();
    }

    return fetch(translateEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            q: text
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data && data.success && data.translatedText) {
                departmentTranslations[normalized] = data.translatedText;
            }
        })
        .catch(() => {
        });
}

function updateAuthDepartmentOptions() {
    const ensureTranslations = translationsLoaded ? Promise.resolve() : loadDepartmentTranslations();
    ensureTranslations.then(() => {
        if (cachedDepartments.length > 0) {
            renderDepartments();
        } else {
            loadDepartmentsForAuth();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadDepartmentsForAuth();
});

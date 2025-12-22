document.addEventListener('DOMContentLoaded', () => {
    const citizenBtn = document.getElementById('citizen-btn');
    const officerBtn = document.getElementById('officer-btn');
    const userTypeInput = document.getElementById('selected-user-type');
    const departmentLabel = document.querySelector('.department');
    const departmentSelect = document.getElementById('department');
    const documentsLabel = document.querySelector('.documents');
    const documentsInput = document.getElementById('documents');

    if (!citizenBtn || !officerBtn || !userTypeInput) return;

    const hideOfficer = () => {
        userTypeInput.value = 'Citizen';
        citizenBtn.classList.add('active');
        officerBtn.classList.remove('active');
        if (departmentLabel) departmentLabel.style.display = 'none';
        if (departmentSelect) {
            departmentSelect.style.display = 'none';
            departmentSelect.removeAttribute('required');
        }
        if (documentsLabel) documentsLabel.style.display = 'none';
        if (documentsInput) {
            documentsInput.style.display = 'none';
            documentsInput.removeAttribute('required');
        }
    };

    const showOfficer = () => {
        userTypeInput.value = 'Officer';
        officerBtn.classList.add('active');
        citizenBtn.classList.remove('active');
        if (departmentLabel) departmentLabel.style.display = 'block';
        if (departmentSelect) {
            departmentSelect.style.display = 'block';
            departmentSelect.setAttribute('required', 'required');
        }
        if (documentsLabel) documentsLabel.style.display = 'block';
        if (documentsInput) {
            documentsInput.style.display = 'block';
            documentsInput.setAttribute('required', 'required');
        }
    };

    // default
    hideOfficer();

    citizenBtn.addEventListener('click', (e) => {
        e.preventDefault();
        hideOfficer();
    });

    officerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showOfficer();
    });
});
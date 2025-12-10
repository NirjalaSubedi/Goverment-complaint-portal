const citizenBtn = document.getElementById('citizen-btn');
const officerBtn = document.getElementById('officer-btn');
const userTypeInput = document.getElementById('selected-user-type');
const officerFields = document.getElementById('officer-fields');
const departmentSelect = document.getElementById('department');
const positionInput = document.getElementById('position');
const officerIdInput = document.getElementById('documents');
function selectUserType(type) {
    userTypeInput.value = type;
    if (type === 'Citizen') {
        citizenBtn.classList.add('active');
        officerBtn.classList.remove('active');
        officerFields.style.display = 'none';
        departmentSelect.removeAttribute('required');
        positionInput.removeAttribute('required');
        officerIdInput.removeAttribute('required');
    } else {
        citizenBtn.classList.remove('active');
        officerBtn.classList.add('active');
        officerFields.style.display = 'block';
        departmentSelect.setAttribute('required', 'required');
        positionInput.setAttribute('required', 'required');
        officerIdInput.setAttribute('required', 'required');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    selectUserType('Citizen'); 
});
citizenBtn.addEventListener('click', () => {
    selectUserType('Citizen');
});

officerBtn.addEventListener('click', () => {
    selectUserType('Officer');
});
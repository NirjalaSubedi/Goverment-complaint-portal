function loadUserProfile() {
    fetch('../backend/fetchprofile.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                return;
            }
            
            document.getElementById('fullName11').value = data.fullName || '';
            document.getElementById('phonenumber11').value = data.phone || '';
            document.getElementById('email111').value = data.email || '';
            document.getElementById('address11').value = data.address || '';
            
            document.querySelector('.registrationDetails').scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => console.error('Error loading profile:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    const profileDiv = document.querySelector('.profile');
    if (profileDiv) {
        profileDiv.addEventListener('click', loadUserProfile);
    }
});


document.getElementById('login-btn').addEventListener('click', function () {
    window.location.href = 'login.html';
});

// Route register actions to the login page
document.querySelectorAll('.register-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        window.location.href = 'login.html';
    });
});

// Inform unauthenticated users when they try to submit
document.querySelectorAll('.submit-complaint, .complaint-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        alert('You are not logged in. Please login first.');
    });
});


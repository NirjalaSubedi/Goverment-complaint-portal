document.getElementById('login-btn').addEventListener('click',function(){
    window.location.href='login.html';
})
document.addEventListener('DOMContentLoaded', function () {
	
	const registerBtn = document.getElementsByClassName('register')[0];
	if (registerBtn) {
		registerBtn.addEventListener('click', function (e) {
			if (e && e.preventDefault) e.preventDefault();
			registerBtn.style.backgroundColor = 'blue';
		});
	}
});


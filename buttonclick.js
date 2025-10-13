document.addEventListener('DOMContentLoaded',function(){
const loginbtn=document.getElementById('Login-btn');
const registerbtn=document.getElementById('Register-btn');

const loginfields=[
	document.getElementById('email'),
	document.getElementsByClassName('email')[0],
	document.getElementById('password'),
	document.getElementsByClassName('password')[0],
	document.getElementById('remember-me'),
	document.getElementsByClassName('rememberme')[0],
	document.getElementsByClassName('signin')[0],
	document.getElementsByClassName('forgotpassword')[0]
];
const registerfields=[
	document.getElementById('user-type'),
	document.getElementById('citizen-btn'),
	document.getElementById('officer-btn'),
	document.getElementById('fullName'),
	document.getElementById('phonenumber'),
	document.getElementById('address'),
	document.getElementById('department'),
	document.getElementById('position'),
	document.getElementById('citizenshipnumber'),
	document.getElementById('confirmPassword'),
	document.getElementsByClassName('createAccount')[0]
]


function disableloginbtn(){
	document.getElementsByClassName('email')[0].disabled=true;
	document.getElementById('email').disabled=true;
	document.getElementById('password').disabled=true;
}
if(registerbtn){
	registerbtn.addEventListener('click',function(e){
		e.preventDefault();
		registerbtn.style.backgroundColor='#0d55e7';
		registerbtn.style.color='white';
		disableloginbtn();
	})
}
})

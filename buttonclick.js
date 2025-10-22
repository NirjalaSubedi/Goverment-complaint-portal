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
	document.getElementsByClassName('fullname')[0],
	document.getElementById('fullName'),
	document.getElementsByClassName('phonenumber')[0],
	document.getElementById('phonenumber'),
	document.getElementsByClassName('email1')[0],
	document.getElementById('email1'),
	document.getElementsByClassName('address')[0],
	document.getElementById('address'),
	document.getElementsByClassName('department')[0],
	document.getElementById('department'),
	document.getElementsByClassName('position')[0],
	document.getElementById('position'),
	document.getElementsByClassName('citizenship')[0],
	document.getElementById('citizenshipNumber'),
	document.getElementsByClassName('password1')[0],
	document.getElementById('password1'),
	document.getElementsByClassName('confirmpassword')[0],
	document.getElementById('confirmPassword'),
	document.getElementsByClassName('createAccount')[0]

];

const citizenlog=[
	document.getElementsByClassName('department')[0],
	document.getElementsByClassName('position')[0],
	document.getElementById('department'),
	document.getElementById('position')
]
const citizenbtn=document.getElementById('citizen-btn');
const officerbtn=document.getElementById('officer-btn');

togglefields(true);

citizenbtn.addEventListener('click',function(e){
	e.preventDefault();
	citizenbtn.style.backgroundColor="rgb(18, 177, 18)";
	officerbtn.style.backgroundColor="#aeaeae";
	citizenlog.forEach(field=>{
		if(field)
		field.style.display='none';	
	})

})

officerbtn.addEventListener('click',function(e){
	e.preventDefault();
	officerbtn.style.backgroundColor="red";
	citizenbtn.style.backgroundColor="#aeaeae";
	citizenlog.forEach(field=>{
		if(field)
		field.style.display='block';
	})

})
function togglefields(showLogin){

	loginfields.forEach(field=>{
		if(field)
		field.style.display=showLogin?'block':'none';
	})

	registerfields.forEach(field=>{
	if(field)
	field.style.display=showLogin?'none':'block';
	})
}
	registerbtn.addEventListener('click',function(e){
		e.preventDefault();
		togglefields(false);
		registerbtn.style.backgroundColor='#0d55e7';
		registerbtn.style.color='white';
		loginbtn.style.backgroundColor='#aeaeae';
		loginbtn.style.color='white';
		loginbtn.style.border='none';

		citizenlog.forEach(field=>{
			if(field)
			field.style.display='none';
		})
	});
	document.getElementsByClassName('checkbox-container')[0].style.display='flex';
	document.getElementsByClassName('forgotpassword')[0].style.textAlign='center';
	loginbtn.addEventListener('click',function(e){
		e.preventDefault();
		togglefields(true);
		loginbtn.style.backgroundColor='#0d55e7';
		loginbtn.style.color='white';
		registerbtn.style.backgroundColor='#aeaeae';
		registerbtn.style.color='white';
	});

	document.getElementById('CA').addEventListener('click',function(){
    window.location.href='auth.html';
}
)


})

document.addEventListener('DOMContentLoaded',function(){
const registerbtn=document.getElementById('register-btn')||document.getElementById('Register-btn');
if(registerbtn){
	registerbtn.addEventListener('click',function(e){
		e.preventDefault();
		registerbtn.style.backgroundColor='#0d55e7';
		registerbtn.style.color='white';
	})
}
})

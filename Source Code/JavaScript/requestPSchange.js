/*****************************************************************************
* File Name:    requestPSchange.js
* Purpose:	    This script allows users to request a password change by
				submitting their email.
*******************************************************************************/

//Select the message and success_message
const message = document.querySelector('.message');
const success_message = document.querySelector('.success_message');

//Wait for the webpage ot load
document.addEventListener('DOMContentLoaded', () => {
    //Add event lisener here for the "PS_change_btn" 
	PS_change_btn.addEventListener('click', resetPasswordFunction);
});

//Reset the user's password
function resetPasswordFunction(e){
    e.preventDefault(); //Needed for buttons
	//Grab the email from the form
	const email = PS_email.value;
	//Send password reset email
	firebase.auth().sendPasswordResetEmail(email).then(function(){
		//Success
		success();
	}).catch(function(error){
		// Handle Errors here.
		message.classList.add('red');
		//mail was not given
		if (email === ''){
			message.innerHTML = 'Please enter all fields';
		}
		else {
			message.innerHTML = error.code + error.message;
		}
		console.log(error);
    });
}

//Upon successful login
function success(){
	//Display success message
	message.style.display = "none";
	success_message.classList.add('green');
	success_message.innerHTML = 'An email has been sent, returning you to login...';
	//Redirect the user to login	
	setTimeout("redirect()", 2000);
}

//Redirect users to the homepage
function redirect(){
	window.location = "login.html";
}	
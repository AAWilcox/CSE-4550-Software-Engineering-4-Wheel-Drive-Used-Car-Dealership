/*****************************************************************************
* File Name:    login.js
* Purpose:	    This script allows users to login to their accounts with an
				email and password
*******************************************************************************/

//Select the message and success_message
const message = document.querySelector('.message');
const success_message = document.querySelector('.success_message');

//Waits for the webpage to load
document.addEventListener('DOMContentLoaded', () => {
	//Add event listener onto the login button
	login_btn.addEventListener('click', login);
});

//Logs in the user
function login(e){
    e.preventDefault(); //For buttons
	//Grab the email and password from the form
	const email = l_email.value;
	const password = l_password.value;
	//Sign in with email and password
	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(function(){
		//Successful login
		success();
	})
	.catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		message.classList.add('red');
		//Password or email was not given
		if (email === '' || password === '' ){
			message.innerHTML = 'Please enter all fields';
		}
		//Incorrect password
		else if (errorCode === 'auth/wrong-password') {  
			message.innerHTML = 'Wrong password.';
		}
		//Any other error
		else {
			message.innerHTML = errorMessage;
		}
		//Log the error to console
		console.log(error);
	});
}

//Upon successful login
function success(){
	//Display success message
	message.style.display = "none";
	success_message.classList.add('green');
	success_message.innerHTML = 'Login successful. Jumping to main webpage...';	
	setTimeout("redirect()", 2000);
}

//Redirect users to the homepage
function redirect(){
	window.location = "index.html";
}	



	
	




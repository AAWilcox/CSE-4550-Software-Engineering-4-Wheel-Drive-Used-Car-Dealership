/*****************************************************************************
* File Name:    createAccount.js
* Purpose:	    This script allows users to create their own Firebase 
                user accounts through Firebase authentication.
*******************************************************************************/

//Reference to the database
const db = firebase.firestore(); 
//Grab the message div
const msg = document.querySelector('.msg');
//Grab the success message div
const success_msg = document.querySelector('.success_msg');

//Wait for the webpage to load
document.addEventListener('DOMContentLoaded', () => {
    //Add event lisener here for the "Create Account" button
	create_account.addEventListener('click', createAccount);
});

//Create a user account
function createAccount(e){
    e.preventDefault(); //Needed for buttons
    //Grab email and password from form
	const email = c_email.value;
    const password = c_password.value;
    //Create the account
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(cred => {
		db.collection('users').doc(cred.user.uid).set({
			email: email
        });
        //Successfully created account
        success();
	})
    //Handle errors here
	.catch(function(error) {
        //Grab the error code
        var errorCode = error.code;
        //Grab the error message
        var errorMessage = error.message;
        msg.classList.add('error');
        //No email or password was given
        if (email === '' || password === '' ){
            msg.innerHTML = 'Please enter all fields';
        }
        //Password is too weak
        else if(errorCode == 'auth/weak-password') {
            msg.innerHTML = 'The password is too weak.';   
        }
        //Any other error
        else {
            msg.innerHTML = errorMessage;
        }
        //Log the error to the console
        console.log(error);
    });
}

//Successful login
function success(){
    msg.style.display = "none";
    success_msg.classList.add('success');
    success_msg.innerHTML = 'Your account has been created successfully. Jumping to homepage...';	
    setTimeout("redirect()", 2000);
}

//Redirect to the homepage
function redirect(){
	window.location = "index.html";
}	
		
		

		
		
		
		
		
		
		
		
		
		
		
		
		
		
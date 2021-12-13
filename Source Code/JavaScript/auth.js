/*****************************************************************************
* File Name:    auth.js
* Purpose:	    This script handles displaying different elements on screen
                based on the authentication status of the user.
*******************************************************************************/

//Reference to the firebase database
const db = firebase.firestore(); 

//Call the function
authStateChanged();

//Grab the navbar
const navBar = document.getElementById("navBar").getElementsByTagName("ul")[0];
//Grab the clear div, used after floats
const clr = document.getElementsByClassName("clr")[0];

//Function used to display/hide items in the nav bar and button areas
function authStateChanged(user) {
	firebase.auth().onAuthStateChanged(function(user) {
		//If a user is signed in
		if(user){
			//Reference to the users document
			var docRef = db.collection('users').doc(user.uid);
			//Get data from the document
			docRef.get().then(function(doc) {
				var data = doc.data();
                var user_level = data.user_level; 
			//Signed in user is an employee user
			if(user_level === "employee")	{
                showLogout();
                showAddVehicle();
                //If we are in the vehicle details page
                if(window.location.pathname == "/vehicleDetails.html") {
                    showModifyBtn();
                    showDeleteBtn();
                    showSpecialDealBtn();
                }
			//Signed in user not an employee
			}else{
                showLogout();
                showMyFavorites();
                if(window.location.pathname == "/vehicleDetails.html") {
                    showAddFavBtn(user);
                }
			}	
			});
		}
		//No user is signed in
		else{
            showLogin();
		}
    });  
}

//Show login for non-signed in users
function showLogin() {
    //Create list item login
    const login = document.createElement("li");
    //Create link for login
    const a = document.createElement("a");
    //Set the link
    a.href = "login.html";
    //Set the text for the link
    a.innerText = "Login";
    //Add the link to list item login
    login.appendChild(a);
    //Insert login li in the navbar before clr
    navBar.insertBefore(login, clr);
}

//Show logout button for signed in users
function showLogout() {
    //Create list item logout
    const logout = document.createElement("li");
    //Set id for logout
    logout.id = "LogOut";
    //Create link for logout
    const a = document.createElement("a");
    //Set the link
    a.href = "index.html";
    //Set the text for the link
    a.innerText = "Logout";
    //Add the link to list item logout
    logout.appendChild(a);
    //Insert logout li in the navbar before clr
    navBar.insertBefore(logout, clr);
    //Add event listener on logout button
    LogOut.addEventListener('click', Logout);
}

//Show add vehicle option for employees
function showAddVehicle() {
    //Do not display when on addVehicle page
    if(window.location.pathname != "/addVehicle.html") {
        //Create list item addVehicle
        const addVehicle = document.createElement("li");
        //Create link for addVehicle
        const a = document.createElement("a");
        //Set the link
        a.href = "addVehicle.html";
        //Set the text for the link
        a.innerText = "Add Vehicle";
        //Add the link to list item addVehicle
        addVehicle.appendChild(a);
        //Insert addVehicle li in the navbar before clr
        navBar.insertBefore(addVehicle, clr);
    } 
}

//Show my favorites option for signed in regular users
function showMyFavorites() {
    //Do not display when on myFavorites page
    if(window.location.pathname != "/myFavorites.html"){
        //Create list item showMyFav
        const showMyFav = document.createElement("li");
        //Create link for showMyFav
        const a = document.createElement("a");
        //Set the link
        a.href = "myFavorites.html";
        //Set the text for the link
        a.innerText = "My Favorites";
        //Add the link to list item showMyFav
        showMyFav.appendChild(a);
        //Insert showMyFav li to the navbar before clr
        navBar.insertBefore(showMyFav, clr);
    }   
}

//In vehicle details, show modify vehicle button for employees
function showModifyBtn() {
    //Grab the vehicle options div
    const vehicleOptions = document.getElementsByClassName("vehicleOptions")[0];
    //Create button
    const btn = document.createElement("button");
    btn.id = "modifyVehicle";
    btn.innerText = "Modify Vehicle";
    //Create link to modify vehicle page
    const link = document.createElement("a");
    link.href = "modifyVehicle.html";
    //Append link to button
    link.appendChild(btn);
    //Append link and button to vehicle options div
    vehicleOptions.appendChild(link);
}

//In vehicle details, show delete vehicle button for employees
function showDeleteBtn() {
    //Grab the vehicle options div
    const vehicleOptions = document.getElementsByClassName("vehicleOptions")[0];
    //Create button
    const btn = document.createElement("button");
    btn.id = "deleteVehicle";
    btn.innerText = "Delete Vehicle";
    //Append button to vehicle options div
    vehicleOptions.appendChild(btn);
}

//In vehicle details, show special deals button for employees
function showSpecialDealBtn() {
    //Make a reference to special deals collection
    const SDref = db.collection("specialDeals");
    //Get the vehicle id from local storage
    const vid = localStorage.getItem("vLocalStorage");
    //Get the ids of the special deal cars
    SDref.get().then(querySnapshot => {
        var specialDeal = "false";
        querySnapshot.forEach(doc => {
            //Find if the vehicle is a special deal
            if (vid == doc.id) {
                specialDeal = "true";
            }
        });
        //Grab the vehicle options div
        const vehicleOptions = document.getElementsByClassName("vehicleOptions")[0];
        //Create button
        const btn = document.createElement("button");
        //Vehicle is already a special deal
        if(specialDeal == "true") {
            btn.id = "removeSD";
            btn.innerText = "Remove from Special Deals";
            //Save to local storage that it is a special deal
            localStorage.setItem("specialDeal", specialDeal);
        }
        //Vehicle is not a special deal
        else{
            btn.id = "specialDeal";
            btn.innerText = "Add to Special Deals";
            //Save to local storage that it is not a special deal
            localStorage.setItem("specialDeal", specialDeal);
        }
        //Append button to vehicle options div
        vehicleOptions.appendChild(btn);
        //Used to tell when buttons are completely loaded
        const complete = document.createElement('div');
        complete.id = "complete";
        vehicleOptions.appendChild(complete);
    }).catch(function(error) {
        console.log("Error getting document: ", error);
    });
    
}

//In vehicle details, show add to favorites button for signed in users
function showAddFavBtn(user) {
    //Make a reference to the user's favorites collection
    const favRef = db.collection("users").doc(user.uid).collection("favorites");
    //Get the vehicle id from local storage
    const vid = localStorage.getItem("vLocalStorage");
    //Get the ids of the user's favorites
    favRef.get().then(querySnapshot => {
        var favorite = "false";
        querySnapshot.forEach(doc => {
            //Find if the vehicle is a favorite
            if (vid == doc.id) {
                favorite = "true";
            }
        });
    //Grab the vehicle options div
    const vehicleOptions = document.getElementsByClassName("vehicleOptions")[0];
    //Create button
    const btn = document.createElement("button");
    //Vehicle is already a favorite
    if(favorite == "true") {
        btn.id = "removeFav";
        btn.innerText = "Remove from My Favorites";
        //Save to local storage that this is a favorite
        localStorage.setItem("favVehicle", favorite);
    }
    //Vehicle is not a favorite
    else {
        btn.id = "addFav";
        btn.innerText = "Add to My Favorites";
        //Save to local storage that it is not a favorite
        localStorage.setItem("favVehicle", favorite);
    }
    //Append button to vehicle options div
    vehicleOptions.appendChild(btn);
    //Used to tell when the button is done loading
    const complete = document.createElement('div');
    complete.id = "complete";
    vehicleOptions.appendChild(complete);
    }).catch(function(error) {
        console.log("Error getting document: ", error);
    });
}

//Logout function
function Logout(){
	firebase.auth().signOut();
}
/*****************************************************************************
* File Name:	addToFavorites.js
* Purpose:	    This script adds vehicles to a user's favorites list through
                the vehicle details page. If a vehicle is already a favorite,
                the user has the option to remove it from their favorites.
*******************************************************************************/

//Wait for the document to load
document.addEventListener('DOMContentLoaded', () => {
    //Only wait for the add to fav button if user is not an employee
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
                if(user_level != "employee") {
                    //Must wait for button to exist first
                    function when_external_loaded (callback) {
                        if (typeof complete === 'undefined') {
                            setTimeout (function () {
                                when_external_loaded (callback);
                            }, 100); // wait 100 ms
                        } else { callback (); }
                    }
                    //Button exists
                    when_external_loaded (function () {
                        //Check if the vehicle is a favorite or not
                        const fav = localStorage.getItem("favVehicle");
                        //Vehicle is a favorite
                        if (fav == "true") {
                            //Add event listener to removeFav button
                            removeFav.addEventListener('click', removeFromFav);
                        }
                        //Vehicle is not a favorite
                        else if (fav == "false") {
                            //Add event listener on addFav button
                            addFav.addEventListener('click', addToFav);
                        }
                    });
                }
            });
        }
    });
});

//Adds vehicle to a user's favorites
function addToFav(e) {
    e.preventDefault(); //Needed for buttons
    //Get the vehicle id from local storage
    const vid = localStorage.getItem("vLocalStorage");
    //Add this vehicle id under the user's data
    var user = firebase.auth().currentUser;
    var docData = {
        exists: "true"
    }
    //Add data to a user's favorites collection
    db.collection('users').doc(user.uid).collection('favorites').doc(vid).set(docData).then(function() {
        //Delete the add to favorites button
        const addBtn = document.getElementById("addFav");
        addBtn.remove();
        //Create the remove from favorites button
        const rmvBtn = document.createElement("button");
        rmvBtn.id = "removeFav";
        rmvBtn.innerText = "Remove from My Favorites";
        rmvBtn.addEventListener('click', removeFromFav);
        //Append the remove button to the vehicleOptions
        const vehicleOptions = document.getElementsByClassName("vehicleOptions")[0];
        vehicleOptions.appendChild(rmvBtn);
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

//Remove from favorites within the vehicle details page
function removeFromFav(e) {
    e.preventDefault(); //For buttons
    //Get the user's id
    const user = firebase.auth().currentUser;
    //Get the vehicle id from local storage
    const vid = localStorage.getItem("vLocalStorage");
    //Delete the document from a user's favorites
    db.collection("users").doc(user.uid).collection("favorites").doc(vid).delete().then(function() {
        //Delete the remove from fav button  
        const rmvBtn = document.getElementById("removeFav");
        rmvBtn.remove();
        //Create the add to favorites button
        const addBtn = document.createElement("button");
        addBtn.id = "addFav";
        addBtn.innerText = "Add to My Favorites";
        addBtn.addEventListener('click', addToFav);
        //Append the add button to the vehicleOptions
        const vehicleOptions = document.getElementsByClassName("vehicleOptions")[0];
        vehicleOptions.appendChild(addBtn);
    }).catch(function(error) {
        console.log("Error getting document: ", error);
    });
}
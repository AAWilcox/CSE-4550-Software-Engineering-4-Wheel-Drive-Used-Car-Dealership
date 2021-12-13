/*****************************************************************************
* File Name:    specialDeals.js
* Purpose:	    This script allows employee users to add and remove vehicles
                from the special deals list.
*******************************************************************************/

//Wait for webpage to load
document.addEventListener('DOMContentLoaded', () => {
    //Only display the remove from/add to special deal button
    //if the signed in user is an employee
    //Get the user's id
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
                    //Must wait for buttons to load to exist first
                    function when_external_loaded (callback) {
                        if (typeof complete === 'undefined') {
                        setTimeout (function () {
                            when_external_loaded (callback);
                        }, 100); // wait 100 ms
                        } else { callback (); }
                    }
                    //Buttons are loaded
                    when_external_loaded (function () {
                        const SD = localStorage.getItem("specialDeal");
                        //vehicle is a special deal
                        if (SD == "true") {
                            removeSD.addEventListener('click', removeFromSD);
                        }
                        //vehicle is not a special deal
                        else if (SD == "false") {
                            specialDeal.addEventListener('click', addToSD);
                        }
                    });
                }   
            });
        }
    });
});

//Add vehicle to special deals collection
function addToSD(e) {
    e.preventDefault();
    //Get the vehicle id from local storage
    const vid = localStorage.getItem("vLocalStorage");
    //Add vehicle to special deals collection
    db.collection("specialDeals").doc(vid).set({
        exists: "true"
    }).then(function() {
        //Delete the add to special deals button
        const addBtn = document.getElementById("specialDeal");
        addBtn.remove();
        //Grab the delete vehicle button
        const deleteBtn = document.getElementById('deleteVehicle');
        //Create the remove from special deals button
        const rmvBtn = document.createElement('button');
        rmvBtn.id = "removeSD";
        rmvBtn.innerText = "Remove from Special Deals";
        rmvBtn.addEventListener('click', removeFromSD);
        //Insert the rmvBtn after the delete vehicle button
        deleteBtn.insertAdjacentElement("afterend", rmvBtn);
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

//Remove a vehicle from special deals list
function removeFromSD(e) {
    e.preventDefault();
    //Get the vehicle id from local storage
    const vid = localStorage.getItem("vLocalStorage");
    db.collection("specialDeals").doc(vid).delete().then(function() {
        //Delete the remove button
        const rmvBtn = document.getElementById("removeSD");
        rmvBtn.remove();
        //Grab the delete vehicle button
        const deleteBtn = document.getElementById('deleteVehicle');
        //Create the add to special deals button
        const addBtn = document.createElement('button');
        addBtn.id = "specialDeal";
        addBtn.innerText = "Add to Special Deals";
        addBtn.addEventListener('click', addToSD);
        //Insert the rmvBtn after the delete vehicle button
        deleteBtn.insertAdjacentElement("afterend", addBtn);
    }).catch(function(error) {
        console.log("Error getting document: ", error);
    });
}
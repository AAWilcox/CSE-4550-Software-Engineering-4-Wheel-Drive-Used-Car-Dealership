/*****************************************************************************
* File Name:    deleteVehicle.js
* Purpose:	    This script allows employee users to delete vehicles from the
                database through the vehicle details page.
*******************************************************************************/

//Wait for the webpage to load
document.addEventListener('DOMContentLoaded', () => {
    //Must wait for deleteVehicle button to exist first
    function when_external_loaded (callback) {
        if (typeof deleteVehicle === 'undefined') {
          setTimeout (function () {
             when_external_loaded (callback);
          }, 100); // wait 100 ms
        } else { callback (); }
      }
      //deleteVehicle button is loaded
      when_external_loaded (function () {
          //Add event listener on deleteVehicle button
          deleteVehicle.addEventListener('click', deleteV);
      });  
});

//Delete the vehicle
function deleteV(e) {
    e.preventDefault(); //Needed for buttons
    //Get the vehicle id from local storage
    const vid = localStorage.getItem("vLocalStorage");
    //Use this vid to delete the document in the vehicles collection
    db.collection("vehicles").doc(vid).delete().then(function() {
        //After deleting the document in Firestore, delete the picture in storage
        const picRef = storageRef.child(vid);
        picRef.delete();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    //Delete vehicle in special deals
    db.collection("specialDeals").doc(vid).delete().then(function(){
        //After deletion, redirect the user
        redirect(); 
    }).catch(function(error) {
        console.log(error);
    });
}

//Redirect the user to the inventory page
function redirect() {
    window.location = "inventory.html";
}
/*****************************************************************************
* File Name:    vehicleDetails.js
* Purpose:	    This script displays a vehicle's details in the vehicle
                details page.
*******************************************************************************/

//Reference to storage service
const storage = firebase.storage();
//Storage reference
const storageRef = storage.ref();

//Wait for webpage to load
document.addEventListener('DOMContentLoaded', () => {
    //Get the vehicle id from local storage
    const vid = localStorage.getItem("vLocalStorage");
    //Reference to the vehicles collection
    vehicleRef = db.collection("vehicles").doc(vid);
    //Read and display the vehicle's information
    readAndDisplayData(vid);
});

//Read a vehicle's document and display it
function readAndDisplayData(vid){
    //Get the url of the vehicle
    storageRef.child(vid).getDownloadURL().then(function(url) {
        //Set the vehicle's image source as this url
        img.src = url;
    }).catch(function(error) {
        //Vehicle does not have an image
        if(error.code == "storage/object-not-found") {
            //Use the default image
            storageRef.child("default.png").getDownloadURL().then(function(url) {
                img.src = url;
            });
        }
    });

    //Display data from the database
    vehicleRef.get().then(function(doc) {
        //set the innerText of all the html elements
        title.innerText = doc.data().year + " " + doc.data().make + " " +
        doc.data().model;
        year.innerText = doc.data().year;
        engine.innerText = doc.data().engine;
        make.innerText = doc.data().make;
        drive.innerText =doc.data().drive;
        model.innerText = doc.data().model;
        trans.innerText = doc.data().trans;
        mileage.innerText = doc.data().mileage;
        color.innerText = doc.data().color;
        price.innerText = "$"+ numberWithCommas(doc.data().price);
    }).catch(function(error) {
        console.log("Error getting document: ", error);
    });
}

//Add commas to numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
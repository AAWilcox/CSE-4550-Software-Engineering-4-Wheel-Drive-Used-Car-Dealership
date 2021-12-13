/*****************************************************************************
* File Name:    modifyVehicle.js
* Purpose:	    This script allows employee users to modify the data of a
                vehicle.
*******************************************************************************/

//Reference to the add vehicle form
const addVehicleForm = document.querySelector("#modifyVehicle");
//Create a root reference to storage
const storageRef = firebase.storage().ref();
//Get the vehicle id from local storage
const vid = localStorage.getItem("vLocalStorage");
//Reference to the vehicle's collection, vid document
vehicleRef = db.collection("vehicles").doc(vid);

//Waits for the webpage to load
document.addEventListener('DOMContentLoaded', () => {
    //Display the vehicle's data onto the form
    displayInformation();
    //Add event listener onto the form submission button
    v_modify.addEventListener("click", modifyVehicle);
});

//Display the vehicle's data onto the form
function displayInformation() {
    //Get the vehicle's information and display it on the form
    vehicleRef.get().then(function(doc) {
        //Populate the form's elements with the vehicle's data
        v_year.value = doc.data().year;
        //Continue this for each form input
        v_make.value = doc.data().make;
        v_model.value = doc.data().model;
        v_mileage.value = doc.data().mileage;
        v_engine.value = doc.data().engine;
        v_drive.value = doc.data().drive;
        v_trans.value = doc.data().trans;
        v_color.value = doc.data().color;
        v_price.value = doc.data().price;
        //Display current image
        storageRef.child(doc.id).getDownloadURL().then(function(url) {
            //Set the vehicle's image source as this url
            img.src = url;
        }).catch(function(error){
            //Vehicle does not have an image
            if(error.code == "storage/object-not-found") {
                //Use the default image
                storageRef.child("default.png").getDownloadURL().then(function(url) {
                    img.src = url;
                });
            }
        });
    }).catch(function(error) {
        displayError(error);
    });
}

//Function that handles vehicle modification
function modifyVehicle(e) {
    e.preventDefault();
    //Reference the image's name
    const file = document.querySelector("#v_img").files[0];
    //Get the price
    const vPrice = parseInt(v_price.value, 10);
    //Only add vehicle if certain information is filled out
    if (v_year.value != "" && v_make.value != "" && v_model.value != "" && 
    v_mileage.value != "" && v_color.value != "" && v_price.value != "" &&
    !isNaN(vPrice)) {
        //Update the database with the new data
        vehicleRef.set({
            year: v_year.value,
            make: v_make.value,
            model: v_model.value,
            mileage: v_mileage.value,
            engine: v_engine.value,
            drive: v_drive.value,
            trans: v_trans.value,
            color: v_color.value,
            price: vPrice
        }).then(function() {
            //Image was given
            if (file != undefined){
                //Set file metadata
                const metadata = {
                    contentType: file.type
                };
                //Upload image to Storage with document id
                storageRef.child(vid).put(file, metadata);
            }
            //Successfully added vehicle
            success();
        }).catch(function(error) {
            displayError(error);
        });  
    }
    //Required data fields not filled
    else {
        //Get msg div
        const failure = document.getElementsByClassName("msg")[0];
        //Create error message element
        const failureMsg = document.createElement('p');
        failureMsg.id = "fmsg";
        failureMsg.className = "msg_text";
        failureMsg.innerText = "Invalid data was input";
        //Add error message to message div
        failure.appendChild(failureMsg);
        setTimeout("deleteMsg()", 3000);
    }  
}

//Display an error message
function displayError(error) {
    //Get msg div
    const failure = document.getElementsByClassName("msg")[0];
    //Create error message element
    const failureMsg = document.createElement('p');
    failureMsg.id = "fmsg";
    failureMsg.className = "msg_text";
    failureMsg.innerText = error.msg;
    //Add error message to message div
    failure.appendChild(failureMsg);
    setTimeout("deleteMsg()", 3000);
}

//Vehicle successfully added
function success(){
    //Get msg div
    const success = document.getElementsByClassName("msg")[0];
    //Create success message element
    const successMsg = document.createElement('p');
    successMsg.id = "smsg";
    successMsg.className = "msg_text";
    successMsg.innerText = "Vehicle Successfully Added! Redirecting...";
    //Add success message to message div
    success.appendChild(successMsg);
    //Redirect employee to vehicle details page
    setTimeout("redirect()", 3000);
}

//After the timeout, delete successMsg or failureMsg
function deleteMsg() {
    document.getElementsByClassName("msg_text")[0].remove();
}

//Redirect users to the vehicle details page
function redirect(){
    window.location = "vehicleDetails.html";
}
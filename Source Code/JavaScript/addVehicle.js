/*****************************************************************************
* File Name:    addVehicle.js
* Purpose:	    This script adds vehicles to the Cloud Firestore database.
*******************************************************************************/

//Reference to the add vehicle form
const addVehicleForm = document.querySelector("#addVehicle");
//Create a root reference to storage
const storageRef = firebase.storage().ref();

//Waits for document to load
document.addEventListener('DOMContentLoaded', () => {
    //Add even listener onto form submit button
    v_add.addEventListener("click", addVehicle);
});

//Add vehicle function
function addVehicle(e){
    e.preventDefault(); //Needed for buttons
    //Reference the image's name
    const file = document.querySelector("#v_img").files[0];
    //Get the price
    const vPrice = parseInt(v_price.value, 10);
    //Only add vehicle if certain information is filled out
    if (v_year.value != "" && v_make.value != "" && v_model.value != "" && 
    v_mileage.value != "" && v_color.value != "" && v_price.value != "" &&
    !isNaN(vPrice)) {
            //Add values from the form to the database
            db.collection("vehicles").add({
                year: v_year.value,
                make: v_make.value,
                model: v_model.value,
                mileage: v_mileage.value,
                engine: v_engine.value,
                drive: v_drive.value,
                trans: v_trans.value,
                color: v_color.value,
                price: vPrice
            }).then(function(docRef) {
                //Image was given
                if (file != undefined){
                    //Set file metadata
                    const metadata = {
                        contentType: file.type
                    };
                    //Upload image to storage with document id
                    storageRef.child(docRef.id).put(file, metadata);
                }    
                //Reset the form
                addVehicleForm.reset();
                //Successfully added vehicle
                success();
            }).catch(function(error) {
                //Get msg div
                const failure = document.getElementsByClassName("msg")[0];
                //Create error message element
                const failureMsg = document.createElement('p');
                failureMsg.id = "fmsg";
                failureMsg.className = "msg_text";
                failureMsg.innerText = "Error adding document: " + error;
                //Add error message to message div
                failure.appendChild(failureMsg);
                setTimeout("deleteMsg()", 3000);
            });
        }
    //Invalid data
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

//Vehicle successfully added
function success(){
    //Get msg div
    const success = document.getElementsByClassName("msg")[0];
    //Create success message element
    const successMsg = document.createElement('p');
    successMsg.id = "smsg";
    successMsg.className = "msg_text";
    successMsg.innerText = "Vehicle Successfully Added!";
    //Add success message to message div
    success.appendChild(successMsg);
    setTimeout("deleteMsg()", 3000);
}

//After the timeout, delete successMsg or failureMsg
function deleteMsg() {
    document.getElementsByClassName("msg_text")[0].remove();
}
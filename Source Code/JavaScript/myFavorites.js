/*****************************************************************************
* File Name:    myFavorites.js
* Purpose:	    This script allows display's a users favorites on the 
                My Favorites page.
*******************************************************************************/

//Reference to storage service
const storage = firebase.storage();
//Storage reference
const storageRef = storage.ref();
//Reference to the vehicles collection
vehicleRef = db.collection("vehicles");

//Once the page has been loaded
document.addEventListener('DOMContentLoaded', () => {
    firebase.auth().onAuthStateChanged(function(user) { 
        //Reference to a user's favorites collection
        const favRef = db.collection("users").doc(user.uid).collection("favorites");
        //Get ids of favorite vehicles stored in this collection
        getIds(favRef);
    });
});

//Gets ids from users favorite's
function getIds(favRef) {
    //Grab the collection
    favRef.get().then(querySnapshot => {
        //Array to hold vehicle ids
        const idArray = [];
        //For each document in the favorites collection
        querySnapshot.forEach(doc => {
            idArray.push(doc.id);
        });
        //Display the data of these vehicles
        generateTextDisplay(idArray);
    }).catch(function(error) {
        console.log("Error getting document:", error);
    }); 
}

//Generate text display for each car
function generateTextDisplay(idArray) {
    //Display each car in the favorite's list
    idArray.forEach(function(item) {
        //Grab the vehicle's information
        vehicleRef.doc(item).get().then(function(doc) {
            //Generate carDetailBackground div
            const carDetailBackground = document.createElement('div');
            carDetailBackground.className = "carDetailBackground";
            carDetailBackground.id = doc.id;
            //Generate carDetailGrid div
            const carDetailGrid = document.createElement('div');
            carDetailGrid.className = "carDetailGrid";
            //Generate carTitle div
            const carTitle = document.createElement('div');
            carTitle.className = "carTitle";
            carTitle.id = "title";
            //Set title: year + make + model
            carTitle.innerText = doc.data().year + " " + doc.data().make + " " + doc.data().model;
            //Generate year category div
            const year_cat = document.createElement('div');
            year_cat.className = "category";
            year_cat.innerText = "Year:";
            //Generate year data div
            const year_data = document.createElement('div');
            year_data.className = "data";
            year_data.innerText = doc.data().year;
            //Generate engine category div
            const engine_cat = document.createElement('div');
            engine_cat.className = "category";
            engine_cat.innerText = "Engine:";
            //Generate engine data div
            const engine_data = document.createElement('div');
            engine_data.className = "data";
            engine_data.innerText = doc.data().engine;
            //Generate make category div
            const make_cat = document.createElement('div');
            make_cat.className = "category";
            make_cat.innerText = "Make:";
            //Generate make data div
            const make_data = document.createElement('div');
            make_data.className = "data";
            make_data.innerText = doc.data().make;
            //Generate drive category div
            const drive_cat = document.createElement('div');
            drive_cat.className = "category";
            drive_cat.innerText = "Drive:";
            //Generate drive data div
            const drive_data = document.createElement('div');
            drive_data.className = "data";
            drive_data.innerText = doc.data().drive;
            //Generate model category div
            const model_cat = document.createElement('div');
            model_cat.className = "category";
            model_cat.innerText = "Model: ";
            //Generate model data div
            const model_data = document.createElement('div');
            model_data.className = "data";
            model_data.innerText = doc.data().model;
            //Generate trans category div
            const trans_cat = document.createElement('div');
            trans_cat.className = "category";
            trans_cat.innerText = "Trans:";
            //Generate trans data div
            const trans_data = document.createElement('div');
            trans_data.className = "data";
            trans_data.innerText = doc.data().trans;
            //Generate mileage category div
            const mile_cat = document.createElement('div');
            mile_cat.className = "category";
            mile_cat.innerText = "Mileage:";
            //Generate mileage data div
            const mile_data = document.createElement('div');
            mile_data.className = "data";
            mile_data.innerText = doc.data().mileage;
            //Generate color category div
            const color_cat = document.createElement('div');
            color_cat.className = "category";
            color_cat.innerText = "Color:";
            //Generate color data div
            const color_data = document.createElement('div');
            color_data.className = "data";
            color_data.innerText = doc.data().color;
            //Generate price div
            const price_div = document.createElement('div');
            price_div.className = "price";
            price_div.innerText = "$" + numberWithCommas(doc.data().price);
            //Append category, carTitle, and data divs to
            //carDetailGrid div - order matters!
            carDetailGrid.appendChild(carTitle);
            carDetailGrid.appendChild(year_cat);
            carDetailGrid.appendChild(year_data);
            carDetailGrid.appendChild(engine_cat);
            carDetailGrid.appendChild(engine_data);
            carDetailGrid.appendChild(make_cat);
            carDetailGrid.appendChild(make_data);
            carDetailGrid.appendChild(drive_cat);
            carDetailGrid.appendChild(drive_data);
            carDetailGrid.appendChild(model_cat);
            carDetailGrid.appendChild(model_data);
            carDetailGrid.appendChild(trans_cat);
            carDetailGrid.appendChild(trans_data);
            carDetailGrid.appendChild(mile_cat);
            carDetailGrid.appendChild(mile_data);
            carDetailGrid.appendChild(color_cat);
            carDetailGrid.appendChild(color_data);
            carDetailGrid.appendChild(price_div);
            //Append carDetialGrid to carDetailBackground
            carDetailBackground.appendChild(carDetailGrid);
            //Append carDetailBackground to myFavorites div
            myFavorites.appendChild(carDetailBackground);
            //Insert div after the carDetailBackground
            const lineBreak = document.createElement('br');
            carDetailBackground.insertAdjacentElement("afterend", lineBreak);
            //Create a delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = "Remove";
            deleteBtn.addEventListener('click', deleteFromFav);
            //Insert button below carDetailGrid
            carDetailGrid.insertAdjacentElement("afterend", deleteBtn);
            //Get and set the car's image
            getImage(doc.id);
        });
    });
}

//Add commas to numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Get and display the car's image
function getImage(id) {
    //Get url of car from storage
    storageRef.child(id).getDownloadURL().then(function(url) {
        //Create image
        const image = document.createElement('img');
        //Set image source
        image.src = url;
        //Grab the car's title
        var title = document.getElementById(id).getElementsByClassName("carTitle")[0];
        //Insert the image after the title div
        title.insertAdjacentElement("afterend", image);
    }).catch(function(error) {
        //Car does not have an image
        if(error.code == "storage/object-not-found") {
            //Use the default image
            storageRef.child("default.png").getDownloadURL().then(function(url) {
                //Create image
                const image = document.createElement('img');
                //Set image source
                image.src = url;
                //Grab the car's title
                var title = document.getElementById(id).getElementsByClassName("carTitle")[0];
                //Insert the image after the title div
                title.insertAdjacentElement("afterend", image);
            });
        }
    });
}

//Remove a vehicle from a user's favorites
function deleteFromFav(e) {
    e.preventDefault(); //For buttons
    //Get the corresponding vehicle's id
    const vid = e.path[1].id;
    //Get the user's id
    const user = firebase.auth().currentUser;
    //Delete the document from a user's favorites
    db.collection("users").doc(user.uid).collection("favorites").doc(vid).delete().then(function() {
        //Grab the vehicle display
        const vehicle = document.getElementById(vid);
        //Delete the vehicle display
        vehicle.remove();
        //Grab all the br elements
        const br = document.querySelectorAll("br");
        //Remove the first br element
        br[0].remove();
    });
}
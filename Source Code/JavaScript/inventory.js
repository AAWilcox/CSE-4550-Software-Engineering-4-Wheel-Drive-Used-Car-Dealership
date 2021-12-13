/*****************************************************************************
* File Name:    inventory.js
* Purpose:	    This script displays the full inventory for users on the
                inventory page.
*******************************************************************************/

//Reference to storage service
const storage = firebase.storage();
//Storage reference
const storageRef = storage.ref();
//Reference to the vehicles collection
vehicleRef = db.collection("vehicles");
//Grab the car grid
const CarGrid = document.querySelector(".carGrid");

//Waits for the webpage to load
document.addEventListener('DOMContentLoaded', () => {
    //Check that the go to inventory btn was pressed
    const btncheck = localStorage.getItem("BtnCheck");
    if (btncheck == "inventory") {
        readDataforInv();
    }
});

//Handles reading text data and displaying it
function readDataforInv(){
    vehicleRef.get().then(querySnapshot => {
        const ids = [];
        querySnapshot.forEach(async doc => {
            //Create car title
            const carTitle = document.createElement('p');
            carTitle.innerText = doc.data().year + " " +  doc.data().make 
            + " " + doc.data().model;
            //Create car title div
            const carTitleDiv = document.createElement('div');
            carTitleDiv.className = "CarTitle";
            //Append <p> car title to car title <div>
            carTitleDiv.appendChild(carTitle);
            //Create car price
            const carPrice = document.createElement('p');
            carPrice.className = "price";
            carPrice.innerText = "$" + numberWithCommas(doc.data().price);
            //Create car grid item
            const carGridItem = document.createElement('div');
            carGridItem.className = "gridItem";
            carGridItem.id = doc.id
            //Append everything to car grid item
            carGridItem.appendChild(carTitleDiv);
            carGridItem.appendChild(carPrice);
            //Add event listener to each grid item
            carGridItem.addEventListener('click', displayVehicleDetails);
            //Append car grid item to the car grid
            CarGrid.appendChild(carGridItem);
            ids.push(doc.id);
        });
        //Get car images
        getImagesforInv(ids);
    });
}

//Add commas to numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Handles images
function getImagesforInv(ids) {
    ids.forEach(function(ids) {
        //Get url of each image from storage
        storageRef.child(ids).getDownloadURL().then(function(url) {
            //Create image
            const image = document.createElement('img');
            //Set image source
            image.src = url;
            //Grab the grid item
            var item = document.getElementById(ids);
            //Grab the grid item's price
            var price = document.getElementById(ids).getElementsByClassName("price")[0];
            //Within the grid item, insert the image before the price
            item.insertBefore(image, price);
        }).catch(function(error) {
            //Car does not have an image
            if(error.code == "storage/object-not-found") {
                //Use the default image
                storageRef.child("default.png").getDownloadURL().then(function(url) {
                    //Create image
                    const image = document.createElement('img');
                    //Set image source
                    image.src = url;
                    //Grab the grid item
                    var item = document.getElementById(ids);
                    //Grab the grid item's price
                    var price = document.getElementById(ids).getElementsByClassName("price")[0];
                    //Within the grid item, insert the image before the price
                    item.insertBefore(image, price);
                });
            }
        });
    });
}

//Handles clicking on a grid item
function displayVehicleDetails(carGridItem) {
    //Vehicle id that was pressed on
    var vid = 0;
    //If border was clicked on
    if (carGridItem.path[1].className == "carGrid") {
        console.log("Border was clicked on");
        vid = carGridItem.path[0].id;
        console.log(vid);
    }
    //If title was clicked on
    else if (carGridItem.path[1].className == "CarTitle") {
        console.log("Title was clicked on");
        vid = carGridItem.path[2].id;
        console.log(vid);
    }
    //Anywhere else  of vehicle preview was clicked on
    else if (carGridItem.path[1].className == "gridItem") {
        console.log("Anything else was clicked on");
        vid = carGridItem.path[1].id
        console.log(vid);
    }
    //Save id to local storage
    localStorage.setItem("vLocalStorage", vid);
    //Redirect user to vehicle details page
    window.location.href = "vehicleDetails.html";
}

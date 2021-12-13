/*****************************************************************************
* File Name:    filterFullInventory.js
* Purpose:	    This script allows users to filter the full inventory based
                on a vehicle's year or price.
*******************************************************************************/

//Reference to special deals
const SDref = db.collection("specialDeals");
//Reference to the vehicles collection
vehicleRef = db.collection("vehicles");

//Wait for the document to load
document.addEventListener('DOMContentLoaded', () => {
    //Check if full inventory or search
    const btncheck = localStorage.getItem("BtnCheck");
    //If user wants to view full inventory
    if (btncheck == "inventory") {
        //Set new event listeners
        filter_yearA.addEventListener('click', filterByYearAscending);
        filter_yearD.addEventListener('click', filterByYearDescending);
        filter_priceA.addEventListener('click', filterByPriceAscending);
        filter_priceD.addEventListener('click', filterByPriceDescending);
    }
});

//Reset vehicle grid display in inventory
function resetFullInventoryDisplay() {
    //Grab car grid
    const carDisplayGrid = document.getElementsByClassName("carGrid")[0];
    //Delete elements in car grid
    while(carDisplayGrid.firstChild) {
        carDisplayGrid.removeChild(carDisplayGrid.firstChild);
    }
}

//Add commas to numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//Filter full inventory by year - ascending
function filterByYearAscending() {
    //Reset display
    resetFullInventoryDisplay();
    //Get vehicles by ascending year
    vehicleRef.orderBy("year", "asc").get().then(querySnapshot => {
        displayDataFullInv(querySnapshot);
    }).catch(function(error) {
        console.log(error);
    });
}

//Filter full inventory by year - descending
function filterByYearDescending() {
    //Reset display
    resetFullInventoryDisplay();
    //Get vehicles by descending year
    vehicleRef.orderBy("year", "desc").get().then(querySnapshot => {
        displayDataFullInv(querySnapshot);
    });
}

//Filter full inventory by price - ascending
function filterByPriceAscending() {
    //Reset display
    resetFullInventoryDisplay();
    //Get vehicles by ascending price
    vehicleRef.orderBy("price", "asc").get().then(querySnapshot => {
        displayDataFullInv(querySnapshot);
    });
}

//Filter full inventory by price - descending
function filterByPriceDescending() {
     //Reset display
     resetFullInventoryDisplay();
     //Get vehicles by descending price
     vehicleRef.orderBy("price", "desc").get().then(querySnapshot => {
         displayDataFullInv(querySnapshot);
     });
}

//Display vehicle data
function displayDataFullInv(querySnapshot) {
    //Array to hold vehicle ids
    const ids = [];
    querySnapshot.forEach(doc => {
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
    getImagesFullInv(ids);
}

//Handles images
function getImagesFullInv(ids) {
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
/*****************************************************************************
* File Name:    search.js
* Purpose:	    This script allows users to search the full inventory for
                vehicles based on a keyword search.
*******************************************************************************/

//Reference to the vehicles collection
vehicleRef = db.collection("vehicles");

//Waits for the webpage to load
document.addEventListener('DOMContentLoaded', () => {
    //Add event listener onto search button in inventory page
    search_submit.addEventListener('click', searchInInventory);
    //Check which button on the homepage has been pressed
    const btncheck = localStorage.getItem("BtnCheck");
    //Search button on homepage was pressed
    if (btncheck == "search") {
        //Generate the reset search button
        displayResetSearchBtn();
        //Get info that was input into the search bar
        const searchItems = localStorage.getItem("searchItems");
        //Format info for searching
        formatInfo(searchItems);
        //Place keywords in inventory search bar
        const searchBar = document.getElementById("searchBar").elements[0];
        searchBar.value = searchItems;
    }
});

//Set up the search for search in inventory
function searchInInventory(e) {
    //Generate the reset search button
    displayResetSearchBtn();
    //Set up event listeners on filters
    setUpNewListeners();
    e.preventDefault(); //For buttons
    //Grab car grid
    const carDisplayGrid = document.getElementsByClassName("carGrid")[0];
    //Delete elements in car grid
    while(carDisplayGrid.firstChild) {
        carDisplayGrid.removeChild(carDisplayGrid.firstChild);
    }
	//Grab what was input and save it to local storage
	localStorage.setItem("searchItems", search_input.value);
	//To keep track that the search button was pressed
    localStorage.setItem("BtnCheck", "search");
    //Display the results
    formatInfo(search_input.value);
}

//Set up event listeners on filters
function setUpNewListeners() {
    //Remove event listeners from full inventory
    filter_yearA.removeEventListener("click", filterByYearAscending);
    filter_yearD.removeEventListener("click", filterByYearDescending);
    filter_priceA.removeEventListener("click", filterByPriceAscending);
    filter_priceD.removeEventListener("click", filterByPriceDescending);
    //Add event listeners on filters
    filter_yearA.addEventListener('click', filterTypeYA);
    filter_yearD.addEventListener('click', filterTypeYD);
    filter_priceA.addEventListener('click', filterTypePA);
    filter_priceD.addEventListener('click', filterTypePD);
}

//Format the keywords and info received from Firebase
function formatInfo(searchItems) {
    //Split words that were searched
    const searchArray = searchItems.toUpperCase().split(" ");
    //Get vehicle data from database
    vehicleRef.onSnapshot(snapshot => {
        //Array to hold all our vehicles
        var vehicleDataArray = [];
        snapshot.docs.forEach(doc => {
            //An array to hold a vehicle
            var vehicle = [];
            //Add all the vehicle's info to the array
            vehicle.push(doc.id);
            vehicle.push(doc.data().color.toUpperCase());
            vehicle.push(doc.data().drive.toUpperCase());
            vehicle.push(doc.data().engine.toUpperCase());
            vehicle.push(doc.data().make.toUpperCase());
            vehicle.push(doc.data().mileage.toUpperCase());
            vehicle.push(doc.data().model.toUpperCase());
            vehicle.push(doc.data().price);
            vehicle.push(doc.data().trans.toUpperCase());
            vehicle.push(doc.data().year.toUpperCase());
            vehicleDataArray.push(vehicle);
        }, error => console.log(error.message));       
        recursiveSearch(searchArray, vehicleDataArray);
    }); 
}

//Recursively search using keywords
function recursiveSearch(searchArray, vehicleDataArray) {
    //Stopping condition
    if (searchArray.length == 0) {
        //Get ids of found vehicles
        vehicleID(vehicleDataArray);
        return vehicleDataArray;
    }
    //Get the index of the keyword at the back of the searchAarray
    const index = searchArray.length - 1 ;
    //To keep track of a vehicle we want to keep
    var keepVehicle = "false";
    //Search through vehicle information with the keyword
    //Outer loop - array that holds vehicles
    for (var i = 0; i < vehicleDataArray.length; i++)
    {
        //Inner loop - each array is a vehicle
        for (var j = 0; j < vehicleDataArray[i].length; j++)
        {
            //A vehicle's data matches our keyword
            if (searchArray[index] == vehicleDataArray[i][j]) {
                //We want to keep this vehicle
                keepVehicle = "true";
            }
        }
        //If a vehicle's data does not match the keyword
        if (keepVehicle != "true") {
            //Remove that vehicle from vehicleDataArray
            vehicleDataArray.splice(i, 1);
            //We removed an element from the array, reset index
            i--;
        }
        //A vehicle's data does match the keyword
        else if (keepVehicle == "true") {
            //Set keepVehicle to false
            keepVehicle = "false";
        }
    }
    //We are done searching with the keyword at the end of searchArray
    searchArray.pop();
    //Recursively call the function again
    return recursiveSearch(searchArray, vehicleDataArray);
}

//Get ids of found vehicles
function vehicleID(vehicleDataArray) {
    //Array to hold vehicle ids
    var IDarray = [];
    //Get ids
    vehicleDataArray.forEach(ID =>
        IDarray.push(ID[0])   
    );
    //Display results
    readSearchData(IDarray);
}

//Handles reading text data and displaying it
function readSearchData(idArray){
    idArray.forEach(function(item) {
        vehicleRef.doc(item).get().then(function(doc) {
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
            carGridItem.addEventListener('click', displaySearchVehicleDetails);
            //Append car grid item to the car grid
            CarGrid.appendChild(carGridItem);
            //Get car's image
            getSearchImages(doc.id);
        });   
    }); 
}

//Handles images
function getSearchImages(ids) {
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
}

//Handles clicking on a grid item
function displaySearchVehicleDetails(carGridItem) {
    //Get vehicle's id
    const vid = carGridItem.path[1].id;
    //Store id in local storage
    localStorage.setItem("vLocalStorage", vid);
    //Redirect user to vehicle details page
    window.location.href = "vehicleDetails.html";
}
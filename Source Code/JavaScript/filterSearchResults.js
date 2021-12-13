/*****************************************************************************
* File Name:    filterSearchResults.js
* Purpose:	    This script allows users to filter the search results based
                on a vehicle's year or price.
*******************************************************************************/

//Reference to the vehicles collection
vehicleRef = db.collection("vehicles");

//Wait for the document to load
document.addEventListener('DOMContentLoaded', () => {
    //Check if full inventory or search
    const btncheck = localStorage.getItem("BtnCheck");
    //If user submitted a search through the homepage
    if (btncheck == "search") {
        //Add event listeners on filters, passing in filter type
        filter_yearA.addEventListener('click', filterTypeYA);
        filter_yearD.addEventListener('click', filterTypeYD);
        filter_priceA.addEventListener('click', filterTypePA);
        filter_priceD.addEventListener('click', filterTypePD);
    }
});

//Set filter type year ascending
function filterTypeYA() {
    const filterType = "year_A";
    //Set up the filter for search results
    setUpFilterSearch(filterType);
}

//Set filter type year descending
function filterTypeYD() {
    const filterType = "year_D";
    //Set up the filter for search results
    setUpFilterSearch(filterType);
}

//Set filter type price ascending
function filterTypePA() {
    const filterType = "price_A";
    //Set up the filter for search results
    setUpFilterSearch(filterType);
}

//Set filter type price descending
function filterTypePD() {
    const filterType = "price_D";
    //Set up the filter for search results
    setUpFilterSearch(filterType);
}

//Reset vehicle grid display in inventory
function resetSearchDisplay() {
    //Grab car grid
    const carDisplayGrid = document.getElementsByClassName("carGrid")[0];
    //Delete elements in car grid
    while(carDisplayGrid.firstChild) {
        carDisplayGrid.removeChild(carDisplayGrid.firstChild);
    }
}

//Get ids of search results
function getIdsofSearchResult() {
    //Grab all grid items
    const gridItem = document.querySelectorAll(".gridItem");
    //Array to hold ids
    var IDarray = [];
    //Get ids of each grid item
    gridItem.forEach(item => {
        IDarray.push(item.id);
    });
   return IDarray;
}

//Set up the filter for search results
function setUpFilterSearch(filterType) {
    //Get ids of vehicles displayed
    const IDarray = getIdsofSearchResult();
    //Array to hold vehicles
    var vehicleArray = [];
    //Get the vehicle data
    IDarray.forEach(item => {
        vehicleRef.doc(item).get().then(doc => {
            //Get search results data in an array
            getSearchResultsArray(IDarray.length, vehicleArray, doc, filterType);
        });
    }); 
}

//Get the data of the search results to filter
function getSearchResultsArray(length, vehicleArray, doc, filterType) {
    //An array to hold a vehicle
    var vehicle = [];
    //Add all the vehicle's info to the array
    vehicle.push(doc.id);
    vehicle.push(doc.data().color);
    vehicle.push(doc.data().drive);
    vehicle.push(doc.data().engine);
    vehicle.push(doc.data().make);
    vehicle.push(doc.data().mileage);
    vehicle.push(doc.data().model);
    vehicle.push(doc.data().price);
    vehicle.push(doc.data().trans);
    vehicle.push(doc.data().year);
    vehicleArray.push(vehicle);
    //If we have every vehicle's data
    if (vehicleArray.length == length) {
        //Filter type is by year ascending
        if (filterType == "year_A") {
            //Go to filter
            filterSearchByYearAscending(vehicleArray);
        }
        //Filter type is by year descending
        else if (filterType == "year_D") {
            //Go to filter
            filterSearchByYearDescending(vehicleArray);
        }
        //Filter type is by price ascending
        else if (filterType == "price_A") {
            //Go to filter
            filterSearchByPriceAscending(vehicleArray);
        }
        //Filter type is by price descending
        else if (filterType == "price_D") {
            //Go to filter
            filterSearchByPriceDescending(vehicleArray);
        }
    }
}

//Filter search results by year - ascending
function filterSearchByYearAscending(vehicleArray) {
    //Reset display
    resetSearchDisplay();
    //Sort by the year column (index 9)
    var sortedVehicleArray = sortByColumnAsc(vehicleArray, 9);
    //Array to hold vehicle ids
    var ids = [];
    //Get ids in of sorted vehicleArray
    sortedVehicleArray.forEach(vehicle => {
        ids.push(vehicle[0]);
    });
    //Display filter results
    displayFilterResults(ids);
}

//Filter search results by year - descending
function filterSearchByYearDescending(vehicleArray) {
    //Reset display
    resetSearchDisplay();
    //Sort by the year column (index 9)
    var sortedVehicleArray = sortByColumnDes(vehicleArray, 9);
    //Array to hold vehicle ids
    var ids = [];
    //Get ids in of sorted vehicleArray
    sortedVehicleArray.forEach(vehicle => {
        ids.push(vehicle[0]);
    });
    //Display filter results
    displayFilterResults(ids);
}

//Filter search results by price - ascending
function filterSearchByPriceAscending(vehicleArray) {
    //Reset display
    resetSearchDisplay();
    //Sort by the price column (index 7)
    var sortedVehicleArray = sortByColumnAsc(vehicleArray, 7);
    //Array to hold vehicle ids
    var ids = [];
    //Get ids in of sorted vehicleArray
    sortedVehicleArray.forEach(vehicle => {
        ids.push(vehicle[0]);
    });
    //Display filter results
    displayFilterResults(ids);
}

//Filter search results by price - descending
function filterSearchByPriceDescending(vehicleArray) {
    //Reset display
    resetSearchDisplay();
    //Sort by the price column (index 7)
    var sortedVehicleArray = sortByColumnDes(vehicleArray, 7);
    //Array to hold vehicle ids
    var ids = [];
    //Get ids in of sorted vehicleArray
    sortedVehicleArray.forEach(vehicle => {
        ids.push(vehicle[0]);
    });
    //Display filter results
    displayFilterResults(ids);
}

//Sort by column - ascending
function sortByColumnAsc(a, colIndex) {
    //Sort based on a particular column
    a.sort(sortFunction);
    //Actual sort function
    function sortFunction(a, b) {
        if (a[colIndex] === b[colIndex]) {
            return 0;
        }
        else {
            return (a[colIndex] < b[colIndex]) ? -1 : 1;
        }
    }
    return a;
}

//Sort by column - descending
function sortByColumnDes(a, colIndex) {
    //Sort based on a particular column
    a.sort(sortFunction);
    //Actual sort function
    function sortFunction(a, b) {
        if (a[colIndex] === b[colIndex]) {
            return 0;
        }
        else {
            return (a[colIndex] > b[colIndex]) ? -1 : 1;
        }
    }
    return a;
}

//Handles reading text data and displaying it
function displayFilterResults(idArray){
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
            carGridItem.addEventListener('click', displayVehicleDetails);
            //Append car grid item to the car grid
            CarGrid.appendChild(carGridItem);
            //Get vehicle's image
            getImages(doc.id);
        });  
    });  
}

//Handles images
function getImages(ids) {
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

//Add commas to numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
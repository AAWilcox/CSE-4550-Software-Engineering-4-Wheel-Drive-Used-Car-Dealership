/*****************************************************************************
* File Name:    index.js
* Purpose:	    This script handles the functionality of the homepage,
				specifically the go to full inventory and search buttons.
*******************************************************************************/

//Reference to storage service
const storage = firebase.storage();
//Storage reference
const storageRef = storage.ref();
//Grab the special deals section
const deals = document.getElementsByClassName("carGrid")[0];

//Once the page has been loaded
document.addEventListener('DOMContentLoaded', () => {
	//Add event listener on full inventory button
	gotoInv.addEventListener('click', goToInventory);
	//Add event listener on search submit button
	search_submit.addEventListener('click', goToSearch);
});

//Redirect user to view full inventory page
function goToInventory(e) {
	e.preventDefault(); //for buttons
	//To keep track of the inventory btn being pressed
	localStorage.setItem("BtnCheck", "inventory");
	//Redirect the user
	window.location.href = "inventory.html";
}

//Redirect the user to view the full inventory page with search results
function goToSearch(e) {
	e.preventDefault(); //For buttons
	//Grab what was input and save it to local storage
	localStorage.setItem("searchItems", search_input.value);
	//To keep track that the search button was pressed
	localStorage.setItem("BtnCheck", "search");
	//Redirect user
	window.location.href = "inventory.html";
}

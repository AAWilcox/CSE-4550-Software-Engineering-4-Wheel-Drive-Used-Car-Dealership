/*****************************************************************************
* File Name:    resetSearch.js
* Purpose:	    This script allows users to reset their search results by
                displaying the full inventory.
*******************************************************************************/

//Display reset search button
function displayResetSearchBtn() {
    //Attempt to get the reset button element
    const element = document.getElementById("reset_search");
    //If it isn't "undefined" and it isn't "null, then it exists"
    if(element == null) {
        //Create new button
        const resetBtn = document.createElement('button');
        //Set button's type
        resetBtn.type = "submit";
        //Set button's id
        resetBtn.id = "reset_search";
        //Set button's inner text
        resetBtn.innerText = "Reset Search";
        //Add event listener onto button
        resetBtn.addEventListener('click', resetSearch);
        //Add button after dropdown area
        const filterBy = document.getElementsByClassName('dropdown')[0];
        filterBy.insertAdjacentElement("afterend", resetBtn);
    } 
}

//Reset the search results
function resetSearch(e) {
    e.preventDefault(); //For buttons
    //Set button check in local storage to inventory
    localStorage.setItem("BtnCheck", "inventory");
    //Delete search items from local storage
    localStorage.removeItem("searchItems");
    //Reset search display
    resetSearchDisplay();
    //Display full inventory
    readDataforInv();
    //Remove reset search button
    reset_search.remove();
    //Reset search bar input
    search_input.value="";
}
<h1 align="center">Source Code</h1>

<h2>About</h2>
Contains all of the relevant source code and images that create the 4-Wheel Drive Used Car Dealership web application.

<h2>CSS - Cascading Style Sheets:</h2>
A style sheet language used for describing the presentation of a document written in a markup language such as HTML.

<h2>HTML - Hypertext Markup Language:</h2>
The standard markup langauge for documents designed to be displayed in a web browser.

<h2>JavaScript:</h2>
A programming langauge that is one of the core technologies of the World Wide Web, alongside HTML and CSS. Allows for the implementation of web application functionalities.

<h2>Important JavaScript Files:</h2>

- index.js: 
  - Actively serves as the Homepage for all users. It contains functions that direct users to other parts of the web application when users press buttons on the Homepage. Additionally, it contains a function that handles reading and displaying of the information of vehicles marked as Special Deals.
- auth.js: 
  - Actively checks the user's credentials and has functions that display different links in the navigation bar depending on the credentials of the user. Additionally, this file contains the function that logs users out of their accounts.
- login.js: 
  - Actively serves as the Login page for all users. It contains a login function that signs in a user with their email and password. Error handling is incorporated into this function to inform the user of a failed login due to bad input or a server error. Upon completion of this function, a success function is called that displays a success message below the login field. A redirect function is then called to redirect the user to the homepage after logging in. The Login page also includes links to the Request Password Change page and Create Account page.
- createAccount.js: 
  - Actively serves as the Create Account page for all users. It contains a create account function that creates a new users account based on the input email and password. Error handling is incorporated into this function to inform the user of a failed create account attempt due to bad input or a server error. Upon successful creation of a user account, a success function is called to display a success message below the create account field, and the user is signed into their new account. A redirect function is then called to redirect the user to the homepage. The Create Account page also includes links to the Request Password Change page and the Login page.
- requestPSchange.js: 
  - Actively serves as the Request Password Change page for all users. It contains a function that sends a password reset email to the email input by the user. Error handling is incorporated into this function to inform the user of a failed submission attempt due to bad input or a server error. Upon a successful submission, an email is sent to the input email and a success function is called. This function displays a success message below the input field. A redirect function is then called that redirects the user to the Login page. This file also includes links to the Create Account page and Login page.
- inventory.js: 
  - Actively displays the full inventory on the Inventory page if a user has pressed the “See Our Full Inventory” button on the homepage. It contains a function that reads the data for each vehicle stored in Cloud Firestore, and it then dynamically creates HTML elements to display the vehicle’s data on the Inventory page. After the data has been successfully read and displayed, a get images function is called to retrieve each car’s image from Firebase Storage. Upon retrieval, the image is displayed on the Inventory page along with the relevant car data. This function handles a failed attempt to retrieve a car’s image, meaning that an image was not uploaded for that car. Additionally, this file contains a function that redirects a user once they have clicked on a car and want to see more information.
- vehicleDetails.js:
  - Actively serves as the Vehicle Details page for all users. It contains a function that retrieves both the picture and data for the vehicle that was clicked on in the Inventory page, and then displays the picture and data on the page.
- myFavorites.js:
  - Actively serves as the My Favorites page for all logged in regular users. As of prototype one, it contains no functions. By prototype two, it will contain a function that retrieves the picture and data for vehicles logged in users have saved to the My Favorites page, and then displays them on the page. A function will also handle a logged in user deleting a vehicle from their My Favorites page.
- addVehicle.js:
  - Actively serves as the Add Vehicle page for all logged in employee users. It contains a function that retrieves all data and an image input by the employee user and then uploads that data and image to Cloud Firestore and Firebase Storage respectively. Error handling is incorporated into this function to inform the user of a failed submission due to bad input or a server error. Upon a successful submission, a success function is called that displays a success message on screen for the employee user. After three seconds, a delete message function is called that deletes this success message, removing it from the screen. Additionally, upon a successful submission, the input form is cleared, allowing the employee user to add another vehicle to the database.

<h2>Credits</h2>

- CSS Definition: https://en.wikipedia.org/wiki/CSS
- HTML Definition: https://en.wikipedia.org/wiki/HTML
- JavaScript Definition: https://en.wikipedia.org/wiki/JavaScript

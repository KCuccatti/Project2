// Import packages and their necessary functionalities
const express = require('express');
const path = require('path');
const db = require("./models");
const bodyParser = require('body-parser');

// Give app access to express package
const myApp = express();


// Defines a PORT for the server to listen for requests
const PORT = process.env.PORT || 8080;


// Sets up server to parse request body for usage
myApp.use(express.urlencoded({ extended: true }));
myApp.use(express.json());


myApp.use(bodyParser.json()); // support json encoded bodies
myApp.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



// Sets server to use the public directory for static assets
myApp.use(express.static(path.join(__dirname, 'public')));


// Routes
require('./routes/dealer-routes.js')(myApp);
require('./routes/api-routes.js')(myApp);
require('./routes/html-routes.js')(myApp);

/*
// Starts server on the predefined PORT
db.sequelize.sync().then(function () {
  console.log("Db is synced");
  myApp.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
  });
})
*/
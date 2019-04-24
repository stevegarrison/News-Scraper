// Dependencies
var express = require("express");
var handlebars = require('express-handlebars');
var logger = require("morgan");
var mongoose = require("mongoose");

// Initialize Express
var app = express();

var port = process.env.PORT || 3000;

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

//require routes
require("./routes/api-routes.js")(app);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);


// Listen on port 3000
app.listen(port, function () {
    console.log("App running on port " + port);
});
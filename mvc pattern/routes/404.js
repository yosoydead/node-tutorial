//import express
const express  = require("express");
//import the paths module
const path = require("path");

//import the routes module from express
const router = express.Router();

//render the 404 page with the not found message
//set the status code of the page to 404
router.use((req,res,next) => {
    //the response sends the content
    //set the path of the page to be rendered to the views folder
    //set the title of the page through the object with a property for the title which will be used
    //in the ejs page
    //this pages path value is set to "" because it doesn't have any path and the nav checks for a path attribute
    res.status(404).render("404", {docTitle: "Not Found", path: ""});
});

module.exports = router;
//import express
const express = require("express");

//import the router module
const router = express.Router();

//import the admin object that has the products array
//const adminData = require("./admin");

//need to import my products controller
const productsController = require("../controllers/products");

//set up a get method for the landing page
router.get("/", productsController.getProducts);

//export the route
module.exports = router;
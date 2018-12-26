//import express
const express = require("express");

//import the router module
const router = express.Router();

//import my controller
const productsController = require("../controllers/products");

//create an array that stores what elements you added
//this products array now lives in the controller for products
//const products = [];

//set the GET route for /admin/add-product
//added the controller with the part that renders the view
//NOTE: the function does not need to be called with ()
router.get("/add-product", productsController.getAddProduct);

//set the POST method for the form
router.post("/add-product", productsController.postAddProduct);

//export both the route and the products array
//because i moved the products array to the controller, now i just need to export the ROUTER
module.exports = router;
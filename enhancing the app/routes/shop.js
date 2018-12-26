//import express
const express = require("express");

//import the router module
const router = express.Router();

//import the admin object that has the products array
//const adminData = require("./admin");

//need to import my products controller
const shopController = require("../controllers/shop");

//set up a get method for the landing page
router.get("/", shopController.getIndex);

//add a GET method for /products for the shop folder
router.get("/products",shopController.getProducts);

//add a GET method for /cart
router.get("/cart", shopController.getCart);

//GET method for checkout
router.get("/checkout", shopController.getCheckout);

//GET method for orders
router.get("/orders", shopController.getOrders);

//export the route
module.exports = router;
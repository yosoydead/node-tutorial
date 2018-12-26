//import express
const express = require("express");

//import the router module
const router = express.Router();

//import the admin object that has the products array
const adminData = require("./admin");

//set up a get method for the landing page
router.get("/", (req,res, next) => {
    //use the products array
    const products = adminData.products;

    //render the shop page
    res.render("shop", {
        prods: products,
        docTitle: "Shop",
        path: "/"
    });

    //see what products are in the list
    console.log("shop.js",adminData.products);
});

//export the route
module.exports = router;
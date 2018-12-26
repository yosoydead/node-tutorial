//import express
const express = require("express");

//import the router module
const router = express.Router();

//create an array that stores what elements you added
const products = [];

//set the GET route for /admin/add-product
router.get("/add-product", (req, res, next) => {
    res.render("add-product", {
        docTitle: "Add Product",
        path: "/admin/add-product"
    });
});

//set the POST method for the form
router.post("/add-product", (req,res,next) => {
    products.push({
        title: req.body.title
    });
    
    //redirect to the home page
    res.redirect("/");
});

//export both the route and the products array
module.exports = {router, products};
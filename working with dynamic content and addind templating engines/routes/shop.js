const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

//import the data from the admin
const adminData = require("./admin")
const router = express.Router();

router.get('/', (req, res, next) => {
  //now, lets store the products array so we can make the templating
  //engine use it to output things
  const products = adminData.products;

  /* pug stuff
  //injecting the products in the templating file
  //it lets us add data that should be added to our view
  //it has to be added as an js objects
  //in the template im gonna be able to use this array by calling prods
  // res.render("shop", {
  //   prods: products, 
  //   docTitle: "Shop", path: "/"
  // });*/

  /*handlebars stuff
  //handlebars cant use if statements inside the html file
  //so i have to pass into the object a value that can be checked
  res.render("shop", {
    prods: products,
    docTitle:"Shop",
    path: "/",
    //sends to the handlebars view a value that can be checked if it is true/false
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  }); */

  //ejs stuff
  res.render("shop", {
    prods: products,
    docTitle: "Shop",
    path: "/"
  });



  //res.sendFile(path.join(rootDir, 'views', 'shop.html'));

  //here we want to render the pug version of the shop.html
  //no need to write shop.pug because the default templating engine is defined as pug
  
  //logging whatever values the admin products holds
  console.log("shop.js",adminData.products);
});

module.exports = router;

const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

//import the data from the admin
const adminData = require("./admin")
const router = express.Router();

router.get('/', (req, res, next) => {
  
  //res.sendFile(path.join(rootDir, 'views', 'shop.html'));

  //here we want to render the pug version of the shop.html
  //no need to write shop.pug because the default templating engine is defined as pug
  res.render("shop");
  
  //logging whatever values the admin products holds
  console.log("shop.js",adminData.products);
});

module.exports = router;

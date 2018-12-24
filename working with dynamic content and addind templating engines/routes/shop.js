const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

//import the data from the admin
const adminData = require("./admin")
const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  
  //logging whatever values the admin products holds
  console.log("shop.js",adminData.products);
});

module.exports = router;

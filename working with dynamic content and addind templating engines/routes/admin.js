const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

//the array can receive new items because it is the same object
const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

  //rendering the add product page with pug
  //set the title of the page
  res.render("add-product", {docTitle: "Add Product Page"});
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  //console.log(req.body);

  //push a new element(object) in the products array containing the value sent by
  //the form
  products.push(
    {title: req.body.title}
    );
  res.redirect('/');
});

exports.routes = router;
exports.products = products;

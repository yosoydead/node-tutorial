const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

//method for POST for the cart route
exports.postCart = (req,res,next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

//this function will have the job of getting that id from the path
exports.getProduct = (req,res,next) => {
  //the req has a field which stores parameters
  //because in the routes i specified that after /products/ will be a productId
  //it means that i can use it here to extract it
  //the param from the path will be :productId
  const prodId = req.params.productId;

  //console log the id to see if it works
  //console.log(prodId);

  //when i click the details button, this function will find the product in the JSON file
  //and then, redirect me to a page which holds all the data about that product
  Product.findById(prodId, product => {
    //i pass that product as an object to the view because i need to render its data
    res.render("shop/product-detail", {
      product: product, 
      pageTitle: product.title,
      path: "/products"
    });
  });

  
};
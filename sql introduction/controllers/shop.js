const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('shop/product-list', {
  //     prods: products,
  //     pageTitle: 'All Products',
  //     path: '/products'
  //   });
  // });

  Product.fetchAll()
  .then( ([rows, fieldData]) => {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch( error => {
    console.log(error);
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  });
};

//in the products model i export a promise from the db query
//here i will use it
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  //as i said, the promised result returns an array with 2 arrays: the data and the metadata about the table
  //here i can use this syntax to destructure that result
  .then( ([rows, fieldData]) => {
    //once i get my data, the prods for the view is actually the rows returned by the query
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch( error => {
    console.log(error);
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
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

const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('shop/product-list', {
  //     prods: products,
  //     pageTitle: 'All Products',
  //     path: '/products'
  //   });
  // });

  // Product.fetchAll()
  // .then( ([rows, fieldData]) => {
  //   res.render('shop/product-list', {
  //     prods: rows,
  //     pageTitle: 'All Products',
  //     path: '/products'
  //   });
  // })
  // .catch( error => {
  //   console.log(error);
  // });

  Product.findAll()
  .then(products => {
    res.render('shop/product-list', {
          prods: products,
          pageTitle: 'All Products',
          path: '/products'
        });
  })
  .catch(error => console.log(error));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findById(prodId)
  // .then( ([product]) => {
  //   //the product is the array that contains all the rows with data from the db
  //   res.render('shop/product-detail', {
  //     product: product[0],
  //     pageTitle: product.title,
  //     path: '/products'
  //   });
  // })
  // .catch(error => console.log(error));

  //this does not return an array of products
  Product.findById(prodId)
  .then(product => {
    res.render('shop/product-detail', {
          product: product,
          pageTitle: product.title,
          path: '/products'
        });
  })
  .catch(error => console.log(error));

  //or i could use the Product.findAll({ where: {id: prodId} }) but this returns an array
  //even if it contains only one element
};

//in the products model i export a promise from the db query
//here i will use it
exports.getIndex = (req, res, next) => {
  // Product.fetchAll()
  // //as i said, the promised result returns an array with 2 arrays: the data and the metadata about the table
  // //here i can use this syntax to destructure that result
  // .then( ([rows, fieldData]) => {
  //   //once i get my data, the prods for the view is actually the rows returned by the query
  //   res.render('shop/index', {
  //     prods: rows,
  //     pageTitle: 'Shop',
  //     path: '/'
  //   });
  // })
  // .catch( error => {
  //   console.log(error);
  // });

  //using sequelize
  //findAll can take an object containing configuration
  Product.findAll()
  .then(products => {
    res.render('shop/index', {
          prods: products,
          pageTitle: 'Shop',
          path: '/'
        });
  })
  .catch(error => console.log(error));
};

exports.getCart = (req, res, next) => {
  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         prod => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   });
  // });

  //get the cart which belongs to a certain user
  req.user.getCart()
    .then(cart => {
      //loads the cart from the db and can use it to fetch products from it
      return cart
        .getProducts()
        .then(products => {
          //once i retrieve the items from the cart, render them to the view
          res.render('shop/cart', {
                  path: '/cart',
                  pageTitle: 'Your Cart',
                  products: products
          });
        })
        .catch(error => console.log(error));
      //console.log(cart);
    })
    .catch(error => console.log(error));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.findById(prodId, product => {
  //   Cart.addProduct(prodId, product.price);
  // });
  // res.redirect('/cart');

  //get access to the cart
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart()
    .then(cart => {
      //if the product is already in the cart, i just need to update the quantity
      fetchedCart = cart;
      return cart.getProducts( {where: {id: prodId}});
      //if it is not in the cart, add a new entry with that product in the cart
    })
    .then(products => {
      //if i find the product in the cart
      let product;

      if(products.length >0){
        product = products[0];
      }
      //if the product is not undefined it means that i already have that product in my cart
      if(product){
        //increase that products quantity
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity +1;
        return product;
      }

      //if that product is not part of the cart
      return Product.findById(prodId);
    })
    .then(product =>{
      return fetchedCart.addProduct(product, { through: {quantity: newQuantity} });
    })
    .then( () => {
      res.redirect("/cart")
    })
    .catch(error => console.log(error));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.findById(prodId, product => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect('/cart');
  // });

  req.user.getCart()
    .then(cart =>{
      return cart.getProducts( {where: {id: prodId} });
    })
    .then(products => {
      //after i retrieve the cart, i store the products from it
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(error => console.log(error));
};

//post order method
exports.postOrder = (req,res, next) => {
  //get all the cart items

  let fetchedCart;
  req.user.getCart()
    .then( cart => {
      //here i have access to the cart itself
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      return req.user.createOrder()
        .then(order => {
          return order.addProducts(products.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity};
            return product;
            })
          );
        })
        .catch(error => console.log(error));
      //console.log(products);
    })
    .then(result => {
      //clear the cart after placing an order
      return fetchedCart.setProducts(null);
    })
    .then(result => {
      res.redirect("/orders");
    })
    .catch(error => console.log(error));
};

exports.getOrders = (req, res, next) => {
  //i tell sequelize to fetch all the products that belong to these orders
  //this will return an array that includes all the products per order
  req.user.getOrders( {include: ['products']})
    .then(orders => {
      //here ill get all my orders and i have to pass some data to the view
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(error => console.log(error));
};

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout'
//   });
// };

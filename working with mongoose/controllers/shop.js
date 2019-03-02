const Product = require("../models/product");

exports.getProducts = (req,res,next) => {
    //Product.fetchAll()
    //this find method comes from mongoose and gives me all the products from the db
    Product.find()
        .then( products => {
            console.log(products);
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "All Products",
                path: "/products"
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getIndex = (req,res,next) => {
    //Product.fetchAll()
     //this find method comes from mongoose and gives me all the products from the db
     //the items are stored in an array
     Product.find()
        .then( products => {
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "All Products",
                path: "/products"
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getProduct = (req,res,next)=>{
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then( product => {
            res.render("shop/product-detail", {
                product: product,
                pageTitle: product.title,
                path: "/products"
            });
        })
        .catch( err => {
            console.log(err);
        });
}

exports.postCart = (req, res, next) =>{
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            //console.log(result);
            res.redirect("/cart");
        });
}

exports.getCart = (req,res,next) => {
    req.user
        .getCart()
        .then(products => {
            res.render("shop/cart", {
                path: "/cart",
                pageTitle: "Your cart",
                products: products
            });
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postCartDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    req.user.deteleItemFromCart(prodId)
        .then(result => {
            res.redirect("/cart");
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getOrders = (req,res,next) => {
    req.user.getOrders()
        .then(orders => {
            res.render("shop/orders",{
                path: "/orders",
                pageTitle: "Your orders",
                orders: orders
            });
        })
        .catch(err => {
            console.log(err)
        });
}

exports.postOrder = (req,res,next) => {
    req.user
        .addOrder()
        .then(result => {
            res.redirect("/orders");
        })
        .catch(err => {
            console.log(err)
        });
}

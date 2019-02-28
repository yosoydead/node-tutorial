const Product = require("../models/product");

exports.getProducts = (req,res,next) => {
    Product.fetchAll()
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

exports.getIndex = (req,res,next) => {
    Product.fetchAll()
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
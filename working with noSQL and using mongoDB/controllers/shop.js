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
//this controller specifically works with products related actions
//IE: add a product, display all the products, etc
//what we want to do is to link to these functions
//that link goes into the route function

//create the products array
//i moved this list to the PRODUCTS model class
//const products = [];

//import my model class
const Product = require("../models/product");



//render the page with the GET method for all products
function getProducts(req,res,next) {
    //because i have a model that stores all the products
    //i create a var that has all the elements and pass it to the view
    //now, this function takes in a callback function that is executed once
    //everything inside fetchAll is done
    //once it is done, i know ill have a list of products
    const products = Product.fetchAll( products => {
        res.render("shop/product-list", {
            prods: products,
            docTitle: "All Products",
            path: "/products"
        });
    });
};

function getIndex(req,res,next) {
    const products = Product.fetchAll( products => {
        res.render("shop/index", {
            prods: products,
            docTitle: "Home",
            path: "/"
        });
    });
}

function getCart(req,res,next) {
    res.render("shop/cart", {
        docTitle: " Your Cart",
        path: "/cart"
    });
}

function getOrders(req,res,next) {
    res.render("shop/orders", {
        docTitle: " Your Orders",
        path: "/orders"
    });
}

function getCheckout(req,res,next){
    res.render("shop/checkout", {
        docTitle: "Checkout",
        path: "/checkout"
    });
}

module.exports ={
    getProducts,
    getIndex,
    getCart,
    getCheckout,
    getOrders
};


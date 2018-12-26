//this controller specifically works with products related actions
//IE: add a product, display all the products, etc
//what we want to do is to link to these functions
//that link goes into the route function

//create the products array
//i moved this list to the PRODUCTS model class
//const products = [];

//import my model class
const Product = require("../models/product");

//render the GET(method) add product page
function getAddProduct(req,res,next) {
    res.render("add-product", {
        docTitle: "Add Product",
        path: "/admin/add-product"
    });
};


//the POST method for adding a product
function postAddProduct(req,res,next) {
    // products.push({
    //     title: req.body.title
    // });
    //create a new product object
    const product = new Product(req.body.title);

    //save that object
    product.save();
    res.redirect("/");
};

//render the page with the GET method for all products
function getProducts(req,res,next) {
    //because i have a model that stores all the products
    //i create a var that has all the elements and pass it to the view
    const products = Product.fetchAll();
    res.render("shop", {
        prods: products,
        docTitle: "Shop",
        path: "/"
    });
};

module.exports ={
    getAddProduct,
    postAddProduct,
    getProducts
};


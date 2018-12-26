const Product = require("../models/product");

//render the GET(method) add product page
function getAddProduct(req,res,next) {
    res.render("admin/add-product", {
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
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;

    const product = new Product(title,imageUrl,description,price);

    //save that object
    product.save();
    res.redirect("/");
};

function getProducts(req,res,next){
    const products = Product.fetchAll( products => {
        res.render("admin/products", {
            prods: products,
            docTitle: "Admin Products",
            path: "/admin/products"
        });
    });
}

module.exports= {
    getAddProduct,
    postAddProduct,
    getProducts
}
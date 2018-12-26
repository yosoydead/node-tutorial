//this controller specifically works with products related actions
//IE: add a product, display all the products, etc
//what we want to do is to link to these functions
//that link goes into the route function

//create the products array
const products = [];

//render the GET(method) add product page
function getAddProduct(req,res,next) {
    res.render("add-product", {
        docTitle: "Add Product",
        path: "/admin/add-product"
    });
};


//the POST method for adding a product
function postAddProduct(req,res,next) {
    products.push({
        title: req.body.title
    });

    res.redirect("/");
};

//render the page with the GET method for all products
function getProducts(req,res,next) {
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


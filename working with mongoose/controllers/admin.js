const Product = require("../models/product");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user._id
    });
    
    product
    //because i use mongoose, the save method is provided by it
        .save()
        .then(result => {
            console.log("created a product");
            res.redirect('/admin/products');
        })
        .catch(error => console.log(error));


};

exports.getProducts = (req, res, next) => {

    //Product.fetchAll()
    //mongoose returns an array with all the products from the db
    //it does not return a cursor
    Product.find()
        // //fetch some specific data about a product excluding the id
        // .select("title price -_id")
        // //populate the specific tag with some data from that object
        // .populate("userId", "name")
        .then(products => {
            res.render("admin/products", {
                prods: products,
                pageTitle: "Admin Products",
                path: "/admin/products"
            });
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }

    const prodId = req.params.productId;

    //findById is provided by mongoose
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect("/");
            }

            res.render("admin/edit-product", {
                pageTitle: "Edit Product",
                path: "/admin/edit-product",
                editing: editMode,
                product: product
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    
    //findById is provided by mongoose
    Product.findById(prodId).then(product => {
        product.title = updatedTitle;
        product.description = updatedDesc;
        product.imageUrl = updatedImageUrl;
        product.price = updatedPrice;

        //save is provided by mongoose
        //return so i can use then after this
        return product.save();
    })
        .then(result => {
            console.log("product updated!!");
            res.redirect("/admin/products");
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    //Product.deleteById(prodId)

    //this method is provided by mongoose
    Product.findByIdAndDelete(prodId)
        .then( ()=> {
            console.log("item deleted from view");
            res.redirect("/admin/products");
        })
        .catch(err =>{
            console.log("couldn't delete item using view");
        })
};

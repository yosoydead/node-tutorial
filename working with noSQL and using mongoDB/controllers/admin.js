const Product = require("../models/product");

exports.getAddProduct = (req,res,next)=> {
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
    const product = new Product(title, price, description, imageUrl);
    //because i use sequelize now, i just can use its methods to work with the database based on the defined model
    //having created a user, i have to specify to which user the product belongs to
    //because i specified to sequelize that a user has a many relationship, it will create a method that allows me
    //to add a product to the db with the id of the user creating it
    product
    .save()
      .then(result => {
        console.log("created a product");
        res.redirect('/admin/products');
      })
      .catch(error => console.log(error));
  
    
  };
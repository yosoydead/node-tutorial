const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const product = new Product(null, title, imageUrl, description, price);
  // product.save()
  // .then( () => {
  //   //redirect to the index page once the insert has completed
  //   res.redirect('/');
  // })
  // .catch( error => console.log(error));

  //because i use sequelize now, i just can use its methods to work with the database based on the defined model
  //having created a user, i have to specify to which user the product belongs to
  //because i specified to sequelize that a user has a many relationship, it will create a method that allows me
  //to add a product to the db with the id of the user creating it
  req.user.createProduct( {
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
    //userId: req.user.id
  })
    .then(result => {
      console.log("created a product");
      res.redirect('/admin/products');
    })
    .catch(error => console.log(error));

  // Product.create({
  //   title: title,
  //   price: price,
  //   imageUrl: imageUrl,
  //   description: description,
  //   //userId: req.user.id
  // }).then(result => {
  //   console.log("created a product");
  //   res.redirect('/admin/products');
  // })
  // .catch( error => console.log(error));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  // Product.findById(prodId, product => {
  //   if (!product) {
  //     return res.redirect('/');
  //   }
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     editing: editMode,
  //     product: product
  //   });
  // });
  Product.findById(prodId)
  .then(product => {
    if(!product){
      return res.redirect("/");
    }
    res.render('admin/edit-product', {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product
    });
  })
  .catch(error => console.log(error));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDesc,
  //   updatedPrice
  // );
  // updatedProduct.save();

  //first i need to find the product with the specific id that i want to edit
  Product.findById(prodId)
    .then(product => {
    //after i find it, set the new fields to their corresponding new value
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDesc;

    //now save the state of the new product
    return product.save();
    })
    .then(result => {
      console.log("updated product!!!!!!!!!!!!!!!!!")
      res.redirect('/admin/products');
    })
    .catch( error => console.log(error));
};

exports.getProducts = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // });

  //render products using sequelize
  Product.findAll()
  .then( products => {
    res.render('admin/products', {
          prods: products,
          pageTitle: 'Admin Products',
          path: '/admin/products'
        });
  })
  .catch(error => console.log(error));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  //Product.deleteById(prodId);


  Product.findById(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log("deleted the product!!!!!!!!!");
      res.redirect('/admin/products');
    })
    .catch( error => console.log(error));
};

const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
    //Product.fetchAll()
    //this find method comes from mongoose and gives me all the products from the db
    Product.find()
        .then(products => {
            console.log(products);
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "All Products",
                path: "/products",
                isAuthenticated : req.isLoggedIn
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getIndex = (req, res, next) => {
    //Product.fetchAll()
    //this find method comes from mongoose and gives me all the products from the db
    //the items are stored in an array
    Product.find()
        .then(products => {
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "All Products",
                path: "/products",
                isAuthenticated : req.isLoggedIn
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    //mongoose has a findById method
    Product.findById(prodId)
        .then(product => {
            res.render("shop/product-detail", {
                product: product,
                pageTitle: product.title,
                path: "/products",
                isAuthenticated : req.isLoggedIn
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postCart = (req, res, next) => {
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

exports.getCart = (req, res, next) => {
    req.user
        //.getCart()
        .populate("cart.items.productId")
        .execPopulate()
        .then(user => {
            const products = user.cart.items;
            res.render("shop/cart", {
                path: "/cart",
                pageTitle: "Your cart",
                products: products,
                isAuthenticated : req.isLoggedIn
            });
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.removeFromCart(prodId)
        .then(result => {
            res.redirect("/cart");
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getOrders = (req, res, next) => {
    //give me all the orders that belong to the logged in user
    Order.find({"user.userId": req.user._id})
        .then(orders => {
            res.render("shop/orders", {
                path: "/orders",
                pageTitle: "Your orders",
                orders: orders,
                isAuthenticated : req.isLoggedIn
            });
        })
        .catch(err => {
            console.log(err);
        })
}

exports.postOrder = (req, res, next) => {
    req.user
        .populate("cart.items.productId")
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return {quantity: i.quantity, product: { ...i.productId._doc} };
            });
            //initialize the order object
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            });
            //save the order to the db
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(re => {
            res.redirect("/orders");
        })
        .catch(err => {
            console.log(err)
        });
}

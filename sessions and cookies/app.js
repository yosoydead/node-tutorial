const path = require('path');

//import mongoose
const mongoose = require("mongoose");

//import the session manager
const session = require("express-session");

//import the mongodb session store which is called as a function
//i need to pass my session instance 
const MongoDBStore = require("connect-mongodb-session")(session);

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

//import the mongodb connection
//const mongoConnect = require("./util/db").mongoConnect;

//import the mongo user model
const User = require("./models/user");

//import my db
//const sequelize = require("./util/db");

//import my product model
// const Product = require("./models/product");
// //import my user model
// const User = require("./models/user");
// //import the cart model
// const Cart = require("./models/cart");
// //import the cartItem model
// const CartItem = require("./models/cart-item");
// //import order and orderItem models
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");

const app = express();

//initialize a new store
//in the constructor i need to pass an object to configure it
//uri -> connection string
//NEEDS a collection to store sessions
const store = new MongoDBStore({
    uri: "mongodb+srv://yosoydead:yosoydead1@cluster0-z30gt.mongodb.net/shop",
    collection: "sessions"
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//login route
const authRoutes = require("./routes/auth");

//an example of a db command
//because i export a promise, i have to use then and catch
//then executes if everything works as expected
//catch executes if there is an error IE cannot connect to db
// db.execute('SELECT * FROM products')
//     .then( (result) => {
//         //this object returns an array with some nested arrays
//         //the first one contains an object with the data from the db
//         //the second array contains some metadata about the table which holds the products data
//         //console.log(result);
//         console.log(result[0], result[1]);
//     })
//     .catch( (error) => {
//         console.log(error);
//     });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//setup the session
//it needs an object inside the function call to configure it
//secret is the salt that is used to hash stuff
//resave -> the session will not be saved on every request, but only if something is changed
//saveUninitialized -> no session is saved for a request where it doesnt need to be changed
//can also configure the cookie, like max-age and other stuff
//store -> the place where sessions will be saved IE databases
app.use(session( {
    secret:"my secret",
    resave: false,
    saveUninitialized: false,
    store: store
} ));

//having a dummy user created, i will use it to register any products created from now on
app.use( (req,res,next) => {
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            //load the real mongoose user model after setting up cookies and stuff
            req.user = user;
            next();
        })
        .catch(error => console.log(error));
    //next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

//connect with mongoose
mongoose.connect("mongodb+srv://yosoydead:yosoydead1@cluster0-z30gt.mongodb.net/shop?retryWrites=true", {useNewUrlParser: true})
    .then(result => {
        console.log("we have connection");

        User.findOne().then(user => {
            if(!user){
                //create a user when accessing the site
                const user = new User({
                    name: "Bogdan",
                    email: "bla@test.com",
                    cart: {
                        items: []
                    }
                });
            }
            user.save();
        })

        //at this point im connected
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })

// //execute the mongo connect method
// mongoConnect( () => {
//     //once i know im listening to the db, start the server
//     app.listen(3000);


// })

//defining that a product belongs to a user
//if a user is deleted, delete all of his products
// Product.belongsTo(User, {constraints: "CASCADE"});

// //define that a user can have many products
// User.hasMany(Product);

// //a user has only one cart
// User.hasOne(Cart);

// //a cart belongs to a user
// Cart.belongsTo(User);

// //a cart belongs to many products
// //one cart can hold multiple products
// Cart.belongsToMany(Product, {through: CartItem});

// //a product belongs to many carts
// //a product can be part of multiple carts
// Product.belongsToMany(Cart, {through: CartItem});

// //an order belongs to a user
// Order.belongsTo(User);

// //a user can have many orders
// User.hasMany(Order);

// //an order can have many products
// Order.belongsToMany(Product, {through: OrderItem});

// //make sequelize create or update the tables using a model
// sequelize
//     //.sync({force: true})
//     .sync()
//     .then(result => {
//         //if the table already exists, nothing will happen

//         //creating a dummy user
//         //if it doesn;t exist, it will be created
//         return User.findById(1);
//     })
//     .then( user => {
//         //if i dont have a user, create
//         if(!user){
//            return User.create( {name:"Bogdan", email: "bla@bla.com"})
//         }
//         //if i have the user, return a promise with it
//         return Promise.resolve(user);
//     })
//     //if i have the user, log it and start the app
//     .then( user => {
//         //console.log(user);

//         //create the cart for the user
//         return user.createCart();
//     })
//     .then(cart => {
//         app.listen(3000);
//     })
//     .catch( error => {
//     console.log(error);
// });

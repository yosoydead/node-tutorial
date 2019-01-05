const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

//import my db
const sequelize = require("./util/db");

//import my product model
const Product = require("./models/product");
//import my user model
const User = require("./models/user");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

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

//having a dummy user created, i will use it to register any products created from now on
app.use( (req,res,next) => {
    User.findById(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(error => console.log(error));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//defining that a product belongs to a user
//if a user is deleted, delete all of his products
Product.belongsTo(User, {constraints: "CASCADE"});

//define that a user can have many products
User.hasMany(Product);

//make sequelize create or update the tables using a model
sequelize
    //.sync({force: true})
    .sync()
    .then(result => {
        //if the table already exists, nothing will happen

        //creating a dummy user
        //if it doesn;t exist, it will be created
        return User.findById(1);
    })
    .then( user => {
        //if i dont have a user, create
        if(!user){
           return User.create( {name:"Bogdan", email: "bla@bla.com"})
        }
        //if i have the user, return a promise with it
        return Promise.resolve(user);
    })
    //if i have the user, log it and start the app
    .then( user => {
        console.log(user);
        app.listen(3000);
    })
    .catch( error => {
    console.log(error);
});

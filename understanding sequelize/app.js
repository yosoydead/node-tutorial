const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

//import my db
const sequelize = require("./util/db");

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

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//make sequelize create or update the tables using a model
sequelize.sync()
    .then(result => {
        //if the table already exists, nothing will happen
        app.listen(3000);
    })
    .catch( error => {
    console.log(error);
});

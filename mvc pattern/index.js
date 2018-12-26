//import express
const express = require("express");
//import body parser
const bodyParser = require("body-parser");
//import the path module
const path = require("path");

//initialize the express app
const app = express();

//set the rendering engine to be ejs
app.set("view engine", "ejs");
//let the app know that my pages are located in the views folder of the project
app.set("views", "views");

//let the app use the body parser
app.use(bodyParser.urlencoded({extended:false}));

//serve the static files aka css, etc
app.use(express.static(path.join(__dirname, 'public')));


//import the add-product route
const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);

//import the home route
const shop = require("./routes/shop");
app.use(shop);

//render a 404 not found page
const notFound = require("./routes/404");
app.use(notFound);



//start the server on a port
app.listen(3000);
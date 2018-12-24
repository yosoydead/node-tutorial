const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

//import handlebars
const handleBars = require("express-handlebars");
const app = express();

//use handlebars and initialize the engine
//by defining "handlebars" as the engine, i have to create files with the .handlebars
//if it were .hbs, then files would be .hbs
//if i want to use layouts, i have to say it to the handleBars constructor
//specify the directory where the layouts live
//can specify a default layout to use
app.engine("handlebars", handleBars( {layoutsDir:"views/layouts/", defaultLayout: "main-layout"} ));
app.set("view engine", "handlebars");
app.set("views", "views");

//setting a global config value -> register the templating engine
//app.set("view engine", "pug");
//set the views folder to be accessed
//app.set("views", "views");

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    
    //rendered the 404 page with pug
    res.status(404).render(path.join(__dirname, 'views', "404"), {docTitle: "Not Found"});
});

app.listen(3000);

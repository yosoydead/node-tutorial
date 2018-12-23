//first off, make the app require express
const express = require("express");

//add a body parser so i can return a js object with the contents of the form/page/whatever
const bodyParser = require("body-parser");

//import the routes for the add product page
const adminRoutes = require("./routes/admin");
const shopPage = require("./routes/shop");

//it is good to store the result of express() in a variable so that would
//be the "server"; the express thing exports an actual function, that's why
//you call it
const app = express();

//make the app use the body parser
app.use(bodyParser.urlencoded({extended:false}));

//make the app use the newly made routes
//by using the admin there, only routes with /admin/..... paths will match
app.use("/admin",adminRoutes);
app.use(shopPage);

//this is a dummy way of returning page not found
//this is positioned at the bottom of the script because it will trigger
//only if the specified path is not found in any of my routes
app.use( (req,res,next) => {
    res.status(404).send("<h1>Page not found</h1>");
});

//this starts the server
app.listen(3000);




//example of a response with express
// app.use( (request,response, next) => {
//     //you can still set headers manually
//     //or use all the standard node functions
//     console.log("you are in some middleware");
//     //by doing this you actually send some html back to the page
//     response.send("<h1>Hello from middleware</h1>");
// });
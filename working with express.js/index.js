//first off, make the app require express
const express = require("express");

//it is good to store the result of express() in a variable so that would
//be the "server"; the express thing exports an actual function, that's why
//you call it
const app = express();

//example of a response with express
app.use( (request,response, next) => {
    //you can still set headers manually
    //or use all the standard node functions
    console.log("you are in some middleware");
    //by doing this you actually send some html back to the page
    response.send("<h1>Hello from middleware</h1>");
});

app.listen(3000);
/* 
    1. create a project
    2. handle requests to "/" and "/users" such that each request
    only has one handler/middleware that does something with it(ex: send dummy response)
*/

const express = require("express");

const app = express();

app.use("/users", (req, res,next) => {
    res.send("<h1>This is the users page</h1>");
});

app.use("/", (req, res,next) =>{
    res.send("<h1>This is the home page</h1>");
})

app.listen(4000);
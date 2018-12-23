//first off, make the app require express
const express = require("express");

//it is good to store the result of express() in a variable so that would
//be the "server"; the express thing exports an actual function, that's why
//you call it
const app = express();
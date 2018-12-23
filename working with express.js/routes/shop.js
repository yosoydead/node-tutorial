//this will show on the home/shop page a list of products added by people
const express = require("express");

const router = express.Router();

router.get("/", (req,res,next) => {
    res.send("<h1>This is the shopping page</h1>");
});

module.exports = router;
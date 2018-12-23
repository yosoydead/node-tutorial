//this page will be available for users so they can add products
//also, this will be some basic routing
const express = require("express");

const router = express.Router();

router.get("/add-product", (req,res,next) => {
    res.send("<form action='/product' method='post'> <input type='text' name='title'><button type='submit'>Submit</button> </form>")
});

router.post("/product", (req,res,next) => {
    res.redirect("/")
});

module.exports = router;
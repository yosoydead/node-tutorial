//this page will be available for users so they can add products
//also, this will be some basic routing
const express = require("express");

const router = express.Router();

// /admin/add-product -> GET
router.get("/add-product", (req,res,next) => {
    res.send("<form action='/admin/add-product' method='post'> <input type='text' name='title'><button type='submit'>Submit</button> </form>")
});

// /admin/add-product -> POST
router.post("/add-product", (req,res,next) => {
    res.redirect("/")
});

module.exports = router;
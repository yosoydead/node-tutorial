//this page will be available for users so they can add products
//also, this will be some basic routing
const express = require("express");

const path = require("path");

const router = express.Router();

// /admin/add-product -> GET
router.get("/add-product", (req,res,next) => {
    res.sendFile(path.join(__dirname, "../views", "add-Product.html"));
});

// /admin/add-product -> POST
router.post("/add-product", (req,res,next) => {
    res.redirect("/")
});

module.exports = router;
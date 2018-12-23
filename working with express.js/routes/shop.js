//this will show on the home/shop page a list of products added by people
const express = require("express");

const path = require("path");

const router = express.Router();

router.get("/", (req,res,next) => {
    res.sendFile(path.join(__dirname, "../views", "shop.html"));
});

module.exports = router;
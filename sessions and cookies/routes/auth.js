const express = require("express");

const authController = require("../controllers/auth");
const router = express.Router();

//load the login form
router.get("/login", authController.getLogin);

module.exports = router;

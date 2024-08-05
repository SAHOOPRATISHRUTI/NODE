const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");

const router = express.Router();

// Handle user signup
router.post("/", handleUserSignup);

// Handle user login
router.post("/login", handleUserLogin);

module.exports = router;

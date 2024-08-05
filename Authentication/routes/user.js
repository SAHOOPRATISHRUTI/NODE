const express = require('express');
const router = express.Router();
const { userSignup } = require('../controller/user'); // Adjust the path based on your project structure

router.post('/signup', userSignup);

module.exports = router;

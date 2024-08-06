const express = require('express');
const User = require('../models/user'); // Correct import
const router = express.Router();

router.get('/signin', (req, res) => {
    return res.render('signin');
});

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.post('/signup', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        await User.create({
            fullName,
            email,
            password
        });
        return res.redirect("/");
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

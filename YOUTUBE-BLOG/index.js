const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');

const app = express();
const PORT = 8000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogify')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});

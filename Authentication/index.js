const express = require('express');
const app = express();
const connectDB = require('./connection/connection'); // Adjust the path based on your project structure
const router = require('./routes/user'); // Adjust the path based on your project structure

require('dotenv').config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', router); // Prefix routes with '/api/users'

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

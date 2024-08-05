const express = require('express');
const router = express.Router();
const Details = require('../models/user');
const { handleGetAllUsers,handleGetUserById,handleupdatedById,handleDeleteUserById,handleCreatenewUser} = require('../controllers/user'); // Correct import path

// Create user
router.post("/", handleCreatenewUser);

// GET all users
router.get("/", handleGetAllUsers);

// GET user by ID
router.get("/:id",handleGetUserById);

// PATCH user by ID
router.patch("/:id", handleupdatedById);

// DELETE user by ID
router.delete("/:id",handleDeleteUserById);

module.exports = router;

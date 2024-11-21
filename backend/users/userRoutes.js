// user routes
const express = require('express');
const userRoutes = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  login,
} = require('../users/userController');

// Login user (explicit route must come before any parameterized routes)
userRoutes.post('/login', login);
// Create a new user
userRoutes.post('/', createUser);

// Get all users
userRoutes.get('/', getAllUsers);

// Get a single user by ID
userRoutes.get('/:id', getUserById);

// Update an existing user by ID
userRoutes.put('/:id', updateUserById);

// Delete an existing user by ID
userRoutes.delete('/:id', deleteUserById);

module.exports = userRoutes;

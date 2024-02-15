// user route crud operations
const express = require('express');
const userRoutes = express.Router();
const {
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const User = require('../models/user');

// GET user profile page (protected route)
userRoutes.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    console.log('User ID:', userId);
    const userData = await User.findById(userId);
  } catch (error) {
    console.error('Error fetching user profile by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT (update) user profile (protected route)

userRoutes.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { fullName, email, newPassword } = req.body;

    await updateUser(userId, fullName, email, newPassword);

    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE user profile (protected route)

userRoutes.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    await deleteUser(userId);

    res.status(200).json({ message: 'User profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = userRoutes;

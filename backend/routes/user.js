// profile routes
const express = require('express');
const userRoutes = express.Router();
const jwt = require('jsonwebtoken');
const {
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const User = require('../models/user');

// Define the verifyToken middleware function

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Authentication token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token has expired' });
      }
      console.error('Token verification error:', err);
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.userId = decoded.id;
    next();
  });
}
// GET user profile page (protected route)
userRoutes.get('/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.user;
    const userData = await getUserById(userId);
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET user profile page (protected route)
userRoutes.get('/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    console.log('User ID:', userId); // Check the value of userId
    const userData = await User.findById(userId);
    // ... rest of the code
  } catch (error) {
    console.error('Error fetching user profile by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT (update) user profile (protected route)
userRoutes.put('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user;
    const { fullName, email, newPassword } = req.body;
    await updateUser(userId, fullName, email, newPassword);
    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE user profile (protected route)
userRoutes.delete('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user;
    await deleteUser(userId);
    res.status(200).json({ message: 'User profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = userRoutes;

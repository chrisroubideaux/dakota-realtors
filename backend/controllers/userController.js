// userController from controllers folder
const User = require('../models/user');
const jwt = require('jsonwebtoken');

require('dotenv').config();
//

const getUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Customize the user profile data you want to send to the client
    const userUserData = {
      fullName: user.fullName,
      email: user.email,
    };

    res.status(200).json({ message: 'User profile data', user: userUserData });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Function to get user profile (protected route)

const getUserById = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userData = {
      fullName: user.fullName,
      email: user.email,
    };

    res.status(200).json({ message: 'User profile data', user: userData });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to update user profile

const updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    const { fullName, email, newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (fullName) {
      user.fullName = fullName;
    }
    if (email) {
      user.email = email;
    }

    if (newPassword) {
      // const hashedPassword = hashPasswordFunction(newPassword);
      // user.password = hashedPassword;
    }

    // Save the updated user data
    await user.save();

    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to delete user profile
const deleteUser = async (req, res) => {
  try {
    const userId = req.userId;

    await User.findByIdAndRemove(userId);

    res.status(200).json({ message: 'User profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUser,
  getUserById,
  updateUser,
  deleteUser,
};

// userController from controllers folder
const User = require('../models/user');
const jwt = require('jsonwebtoken');

require('dotenv').config();
//

const getUser = async (req, res) => {
  try {
    // Assuming you have userId available from middleware
    const userId = req.userId;

    // Fetch user data from the database using userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Customize the user profile data you want to send to the client
    const userUserData = {
      fullName: user.fullName,
      email: user.email,
      // Add other user fields here as needed
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
    const userId = req.userId; // Assuming userId is available from middleware

    // Fetch user data from the database using userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Customize the user profile data you want to send to the client
    const userData = {
      fullName: user.fullName,
      email: user.email,
      // Add other user fields here as needed
    };

    res.status(200).json({ message: 'User profile data', user: userData });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to update user profile
// Function to update user profile
const updateUser = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is available from middleware
    const { fullName, email, newPassword } = req.body;

    // Fetch user data from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user profile fields
    if (fullName) {
      user.fullName = fullName;
    }
    if (email) {
      user.email = email;
    }
    // Update password if newPassword is provided
    if (newPassword) {
      // Update password logic here based on your application requirements
      // For example, you can hash the new password and save it to the user object
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
    const userId = req.userId; // Assuming userId is available from middleware

    // Delete user data from the database
    // Implement your database-specific logic to delete the user
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

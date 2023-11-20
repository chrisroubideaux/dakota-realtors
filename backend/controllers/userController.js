// userController from controllers folder
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
      // Hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      user.password = hashedPassword;
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

{
  /*
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const profile = async (req, res) => {
  try {
    // Assuming you have userId available from middleware
    const userId = req.userId;

    // Fetch user data from the database using userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Customize the user profile data you want to send to the client
    const userProfileData = {
      fullName: user.fullName,
      email: user.email,
      // Add other user fields here as needed
    };

    res
      .status(200)
      .json({ message: 'User profile data', user: userProfileData });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  profile,
  // Other controller functions for different profile actions
};
*/
}

// admin authentication
const express = require('express');
const Admin = require('./adminModel');
const adminRoutes = express.Router();
const { registerAdmin, loginAdmin } = require('./adminController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');

require('dotenv').config();

// Function to check if a string contains at least one digit and one special character
function isPasswordValid(password) {
  const digitRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*]/;

  return (
    password.length >= 10 &&
    digitRegex.test(password) &&
    specialCharRegex.test(password)
  );
}

// Register an agent
adminRoutes.post('/register', async (req, res) => {
  const { email, password, confirmPassword, fullName } = req.body;

  try {
    // Check if the email already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Validate email format'
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Check if the password meets the length and complexity requirements
    if (!isPasswordValid(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 10 characters long and contain at least one number and one special character.',
      });
    }

    // Check if the password and its confirmation match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: 'Password and password confirmation do not match.',
      });
    }

    // Hash the password before saving it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new agent with the hashed password
    const newAdmin = new Admin({ email, password: hashedPassword, fullName });
    await newAdmin.save();

    // Generate a JWT token for the new agent
    const token = jwt.sign({ _id: newAdmin._id }, process.env.JWT_SECRET);

    // Agent registration successful, return a success response with the token
    res.status(201).json({
      message: 'New admin user registered successfully',
      admin: newAdmin,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Agent login

adminRoutes.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the agent by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Agent authentication successful, generate a JWT token
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);

    // Return a success response with the token
    res.status(200).json({ message: 'Login successful', admin, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = adminRoutes;

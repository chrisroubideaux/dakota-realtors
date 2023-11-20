// admin controller
const adminModel = require('./adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Function to check if a string contains at least one digit and one special character
function isPasswordValid(password) {
  const digitRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*]/; // Add more special characters as needed

  return (
    password.length >= 10 &&
    digitRegex.test(password) &&
    specialCharRegex.test(password)
  );
}

// Register admin user
const register = async (req, res) => {
  const { email, password, confirmPassword, fullName } = req.body;

  try {
    // Check if the email already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      // Email already exists, return an error response
      return res.status(409).json({ message: 'Email already exists' });
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

    // Return a success response with the token and redirect URL
    res.status(201).json({
      message: 'Admin user registered successfully',
      admin: newAdmin,
      token,
    });
  } catch (err) {
    // Handle any errors that occur during the registration process
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login an existing agent
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the agent by email
    const admin = await admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Agent authentication successful, generate a JWT token
    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);

    // Return a success response with the token
    res.status(200).json({ token, admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
};

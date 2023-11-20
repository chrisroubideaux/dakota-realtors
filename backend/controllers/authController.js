// auth controller
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//const passport = require('passport');

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

// Register a new user

const register = async (req, res) => {
  const { email, password, confirmPassword, fullName } = req.body; // Extract fullName

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
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

    // Create a new user with the hashed password and fullName
    const newUser = new User({ email, password: hashedPassword, fullName });
    await newUser.save();

    // Generate a JWT token for the new user
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);

    // User registration successful, return a success response with the token and redirect URL
    res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
      token,
      redirectTo: `/profile/${newUser._id}`, // Provide the URL to redirect to after successful registration
    });
  } catch (err) {
    // Handle any errors that occur during the registration process
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login an existing user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // User authentication successful, generate a JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // Construct the redirect URL with the user's ID

    // Construct the redirect URL with the user's ID
    const redirectTo = `/profile/${user._id}`;

    // Debugging: Log the generated token
    console.log('Generated Token:', token);

    // Return a success response with the token
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,

  // Other controller functions
};

{
  /*
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    {
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    }

    // User authentication successful, generate a JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Return a success response with the token
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
*/
}

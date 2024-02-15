// admin controller
const adminModel = require('./adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

// Register admin user
const register = async (req, res) => {
  const { email, password, confirmPassword, fullName } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    if (!isPasswordValid(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 10 characters long and contain at least one number and one special character.',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: 'Password and password confirmation do not match.',
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newAdmin = new Admin({ email, password: hashedPassword, fullName });
    await newAdmin.save();

    // Generate a JWT token for the new agent
    const token = jwt.sign({ _id: newAdmin._id }, process.env.JWT_SECRET);

    res.status(201).json({
      message: 'Admin user registered successfully',
      admin: newAdmin,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Login an existing agent
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);

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

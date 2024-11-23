// controllers/userController.js
const User = require('../users/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Password validation function
const isPasswordValid = (password) => {
  const regex = /^(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~]).{10,}$/;
  return regex.test(password);
};
{
  /*

// Create a new user
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json({
      message: 'User created successfully',
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
*/
}

const createUser = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    googleId,
    facebookId,
    facebookDisplayName,
    facebookEmail,
    photo,
    phone,
    address,
    city,
    state,
  } = req.body;

  try {
    // Check for required fields
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required.' });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    // Handle OAuth registration (Google or Facebook)
    if (googleId || facebookId) {
      const newUser = new User({
        googleId,
        facebookId,
        facebookDisplayName,
        facebookEmail,
        name,
        email,
        photo,
        phone,
        address,
        city,
        state,
      });

      await newUser.save();

      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      return res.status(201).json({
        message: 'User created successfully via OAuth.',
        user: newUser,
        token,
        redirectTo: `http://localhost:3000/profile/${newUser._id}`,
      });
    }

    // Validate password strength if registering with credentials
    if (!password || !confirmPassword) {
      return res.status(400).json({ message: 'Password is required.' });
    }

    if (!isPasswordValid(password)) {
      return res.status(400).json({
        message:
          'Password must be at least 10 characters long and contain at least one number and one special character.',
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with credentials
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      photo,
      phone,
      address,
      city,
      state,
    });

    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'User created successfully.',
      user: newUser,
      token,
      redirectTo: `http://localhost:3000/user/${newUser._id}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing user by ID
const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an existing user by ID
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login an existing user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    const redirectTo = `http://localhost:3000/user/${user._id}`;

    console.log('Generated Token:', token);

    res
      .status(200)
      .json({ message: 'Login successful', user, token, redirectTo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Logout a user

const logout = async (req, res) => {
  try {
    if (req.user?.oauthProvider) {
      const redirectUrl = getOAuthLogoutUrl(req.user.oauthProvider);

      res.clearCookie('token');

      return res.status(200).json({
        message: 'Logged out successfully via OAuth.',
        redirectTo: redirectUrl,
      });
    }

    res.clearCookie('token'); // Clear the JWT cookie
    return res.status(200).json({
      message: 'Logged out successfully.',
      redirectTo: 'http://localhost:3000/login',
    });
  } catch (error) {
    console.error('Error during logout:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error during logout.' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  login,
  logout,
};

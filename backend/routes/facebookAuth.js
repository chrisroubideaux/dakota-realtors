// facebook authentication routes
const express = require('express');
const passport = require('passport');
const facebookRoutes = express.Router();
const jwt = require('jsonwebtoken');

// Facebook OAuth registration route
facebookRoutes.get(
  '/facebook/register',
  passport.authenticate('facebook', { scope: ['email', 'user_photos'] })
);

// Facebook OAuth login route
facebookRoutes.get(
  '/facebook/login',
  passport.authenticate('facebook', { scope: ['email', 'user_photos'] })
);

// Facebook OAuth callback route for registration
facebookRoutes.get(
  '/facebook/callback/register',
  passport.authenticate('facebook', {
    failureRedirect: '/login', // Redirect to login page on failure
  }),
  async (req, res) => {
    try {
      // Successful authentication, extract user data from req.user (provided by passport)
      const { _id } = req.user;

      // Capture the registration timestamp
      const registrationTimestamp = new Date();

      // Generate a JWT token for the user
      const token = jwt.sign({ _id }, process.env.JWT_SECRET);

      // Create a new user record with user ID and registration timestamp
      const newUser = new User({
        _id,
        name: fullName,
        registrationTimestamp,
      });

      // Save the new user
      await newUser.save();

      // Redirect to a page or send a JSON response with the token
      res.json({ token });
    } catch (err) {
      // Handle any errors that occur during the registration process
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);
// Facebook OAuth callback route for login
facebookRoutes.get(
  '/facebook/callback/login',
  passport.authenticate('facebook', {
    failureRedirect: '/login', // Redirect to login page on failure
  }),
  (req, res) => {
    // Successful authentication, generate and send a JWT token
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET);

    // Redirect to a page or send a JSON response with the token
    res.json({ token });
  }
);

module.exports = facebookRoutes;

{
  /*
const express = require('express');
const passport = require('passport');
const facebookRoutes = express.Router();

// Facebook OAuth registration route
facebookRoutes.get(
  '/facebook/register',
  passport.authenticate('facebook', { scope: ['email', 'user_photos'] })
);

// Facebook OAuth login route
facebookRoutes.get(
  '/facebook/login',
  passport.authenticate('facebook', { scope: ['email', 'user_photos'] })
);

// Facebook OAuth callback route for registration
facebookRoutes.get(
  '/facebook/callback/register',
  passport.authenticate('facebook', {
    failureRedirect: '/login', // Redirect to login page on failure
  }),
  (req, res) => {
    // Successful authentication, redirect to a page or send a response as needed
    res.redirect('http://localhost:3000/user'); // Replace with the appropriate redirect URL
  }
);

// Facebook OAuth callback route for login
facebookRoutes.get(
  '/facebook/callback/login',
  passport.authenticate('facebook', {
    failureRedirect: '/login', // Redirect to login page on failure
  }),
  (req, res) => {
    // Successful authentication, redirect to a page or send a response as needed
    res.redirect('/user'); // Replace with the appropriate redirect URL
  }
);

module.exports = facebookRoutes;
*/
}

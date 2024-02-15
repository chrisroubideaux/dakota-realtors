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
    failureRedirect: '/login',
  }),
  async (req, res) => {
    try {
      const { _id } = req.user;

      const registrationTimestamp = new Date();

      const token = jwt.sign({ _id }, process.env.JWT_SECRET);

      const newUser = new User({
        _id,
        name: fullName,
        registrationTimestamp,
      });

      await newUser.save();

      // Redirect to a page or send a JSON response with the token
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);
// Facebook OAuth callback route for login
facebookRoutes.get(
  '/facebook/callback/login',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET);

    res.json({ token });
  }
);

module.exports = facebookRoutes;

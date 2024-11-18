// auth routes
const express = require('express');
const passport = require('./googlePassport');
const authRoutes = express.Router();
const cors = require('cors');
{
  /*
authRoutes.get(
  '/google/login',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
*/
}
authRoutes.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log('req.user:', req.user);
    if (req.user) {
      const id = req.user.id;
      res.redirect(`http://localhost:3000/admins/${id}`);
    } else {
      res.redirect('/');
    }
  }
);

// Logout Route
authRoutes.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.clearCookie('token');

    res.status(200).json({ message: 'Logged out successfully' });

    res.redirect('http://localhost:3000/login');
  });
});

{
  /*
authRoutes.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/http://localhost:3000/login');
  });
});
*/
}
// Google OAuth login route
authRoutes.get(
  '/google/login',
  passport.authenticate('google', { scope: ['email', 'openid', 'profile'] })
);

module.exports = authRoutes;

// facebook controller
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Facebook OAuth registration route
function authenticateWithFacebookRegister(req, res, next) {
  passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
}

// Facebook OAuth login route
function authenticateWithFacebookLogin(req, res, next) {
  passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
}

// Facebook OAuth callback route for registration
function handleFacebookRegisterCallback(req, res, next) {
  passport.authenticate('facebook', {
    failureRedirect: '/login',
  })(req, res, (err) => {
    if (err) {
      return next(err);
    }

    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET);

    res.json({ token });
  });
}

// Facebook OAuth callback route for login
function handleFacebookLoginCallback(req, res, next) {
  passport.authenticate('facebook', {
    failureRedirect: '/login',
  })(req, res, (err) => {
    if (err) {
      return next(err);
    }

    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET);

    res.json({ token });
  });
}

module.exports = {
  authenticateWithFacebookRegister,
  handleFacebookRegisterCallback,
  authenticateWithFacebookLogin,
  handleFacebookLoginCallback,
};

{
  /*
const passport = require('passport');

// Facebook OAuth registration route
function authenticateWithFacebookRegister(req, res, next) {
  passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
}

// Facebook OAuth login route
function authenticateWithFacebookLogin(req, res, next) {
  passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
}

// Facebook OAuth callback route for registration
function handleFacebookRegisterCallback(req, res, next) {
  passport.authenticate('facebook', {
    failureRedirect: '/login', // Redirect to login page on failure
  })(req, res, (err) => {
    if (err) {
      // Handle any authentication errors here
      return next(err);
    }
    // Successful authentication, redirect to a page or send a response as needed
    res.redirect('/user'); // Replace with the appropriate redirect URL
  });
}

// Facebook OAuth callback route for login
function handleFacebookLoginCallback(req, res, next) {
  passport.authenticate('facebook', {
    failureRedirect: '/login', // Redirect to login page on failure
  })(req, res, (err) => {
    if (err) {
      // Handle any authentication errors here
      return next(err);
    }
    // Successful authentication, redirect to a page or send a response as needed
    res.redirect('/profile'); // Replace with the appropriate redirect URL
  });
}

module.exports = {
  authenticateWithFacebookRegister,
  handleFacebookRegisterCallback,
  authenticateWithFacebookLogin,
  handleFacebookLoginCallback,
};
*/
}

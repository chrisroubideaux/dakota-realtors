// googleAuthController.js
const passport = require('passport');
//
function authenticateWithGoogle(req, res, next) {
  passport.authenticate('google', { scope: ['email'] })(req, res, next);
}
function handleGoogleCallback(req, res, next) {
  passport.authenticate('google', {
    failureRedirect: '/login',
  })(req, res, (err) => {
    if (err) {
      return next(err);
    }

    res.redirect('/user');
  });
}

module.exports = {
  authenticateWithGoogle,
  handleGoogleCallback,
};

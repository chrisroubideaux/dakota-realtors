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
      // Handle any authentication errors here
      return next(err);
    }
    // Successful authentication, redirect to a page or send a response as needed
    res.redirect('/user'); // Replace with the appropriate redirect URL
  });
}

{
  /*
function handleGoogleCallback(req, res, next) {
  passport.authenticate('google', {
    failureRedirect: '/login',
  })(req, res, () => {
    // Successful authentication, redirect to a page or send a response as needed
    res.redirect('/apartments'); // Replace with the appropriate redirect URL
  });
}
*/
}
module.exports = {
  authenticateWithGoogle,
  handleGoogleCallback,
};

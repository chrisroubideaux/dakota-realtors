// facebook passport configuration
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');

require('dotenv').config();

passport.use(
  new FacebookStrategy(async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ 'facebook.id': profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = new User({
        facebook: {
          id: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
        },
      });

      await newUser.save();

      return done(null, newUser);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;

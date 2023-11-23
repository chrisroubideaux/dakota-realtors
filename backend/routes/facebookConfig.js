// facebook passport configuration
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user'); // Update with your User model import

// Load environment variables from .env file
require('dotenv').config();
// passport facebook config
passport.use(
  new FacebookStrategy(
    // ... other options ...
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the Facebook user is already registered in your database
        const existingUser = await User.findOne({ 'facebook.id': profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        // Create a new user with Facebook account details
        const newUser = new User({
          facebook: {
            id: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
          },
          // Add other user properties as needed
        });

        // Save the new user to the database
        await newUser.save();

        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); // Store the user's ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); // Attach the user object to the request (req.user)
  } catch (err) {
    done(err);
  }
});

module.exports = passport;

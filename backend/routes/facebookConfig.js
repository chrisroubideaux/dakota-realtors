// facebookPassport.js
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../users/userModel');

require('dotenv').config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'displayName', 'photos', 'emails'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ 'facebook.id': profile.id });
        if (!user) {
          user = new User({
            facebook: {
              id: profile.id,
              displayName: profile.displayName,
              email: profile.emails?.[0]?.value,
            },
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

{
  /*
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../users/userModal');
const dotenv = require('dotenv');

dotenv.config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'displayName', 'photos', 'emails'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ 'facebook.id': profile.id });
        if (!user) {
          user = new User({
            facebook: {
              id: profile.id,
              displayName: profile.displayName,
              email: profile.emails?.[0]?.value,
            },
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
*/
}

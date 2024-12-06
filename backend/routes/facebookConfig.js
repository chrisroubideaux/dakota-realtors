const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../users/userModel');
const Agent = require('../agents/agent');
const Admin = require('../admin/adminModel');
require('dotenv').config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name', 'displayName', 'photos'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0]?.value;
        console.log('Facebook profile email:', email);

        let user = await Admin.findOne({ email });
        if (user) {
          user.role = 'admin';
          console.log('Admin user found:', user);
          return done(null, user);
        }

        user = await User.findOne({ email });
        if (user) {
          user.role = 'user';
          console.log('User found:', user);
          return done(null, user);
        }

        user = await Agent.findOne({ email });
        if (user) {
          user.role = 'agent';
          console.log('Agent found:', user);
          return done(null, user);
        }

        console.log('User not found');
        return done(null, false, { message: 'User not found in any role' });
      } catch (err) {
        console.error('Error in Facebook Strategy:', err);
        return done(err, null);
      }
    }
  )
);

{
  /*
// facebookPassport.js
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../users/userModel');
const Agent = require('../agents/agent');
const Admin = require('../admin/adminModel');
require('dotenv').config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name', 'displayName', 'photos'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0]?.value;

        // Check Admins first
        let user = await Admin.findOne({ email });
        if (user) {
          user.role = 'admin';
          return done(null, user);
        }

        // Check Users/Clients
        user = await User.findOne({ email });
        if (user) {
          user.role = 'user';
          return done(null, user);
        }

        // Check Agents
        user = await Agent.findOne({ email });
        if (user) {
          user.role = 'agent';
          return done(null, user);
        }

        // If no user found, handle as needed (e.g., create a new user or reject)
        return done(null, false, { message: 'User not found in any role' });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);


*/
}

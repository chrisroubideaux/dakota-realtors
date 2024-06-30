// main app
const express = require('express');
const session = require('express-session');
const { json, urlencoded } = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
// auth routes
const authRoutes = require('./routes/auth');
const User = require('./models/user');
const apartmentRoutes = require('./apartments/apartments');
const appointmentRoutes = require('./appointments/appointments');
const commercialRoutes = require('./commercials/commercials');
const homeRoutes = require('./homes/homes');
const userRoutes = require('./routes/user');
const agentRoutes = require('./agents/agents');
//const adminRoutes = require('./admin/admin');

// google auth
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const FacebookStrategy = require('passport-facebook').Strategy;

require('dotenv').config();

const app = express();
//const port = 3001;
const port = process.env.PORT || 3001;

const mongoURI = process.env.MONGO_URI;

// mongoose
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// cors middleware
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(json());
app.use(express.json());
app.use(urlencoded({ extended: true }));

// Define the verifyToken middleware function

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  console.log('Token for Verification:', token);
  if (!token) {
    return res.status(401).json({ error: 'Authentication token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token has expired' });
      }
      console.error('Token verification error:', err);
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.userId = decoded.id;
    next();
  });
}

// Configure session middleware (optional if you're using JWT)
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
});
{
  /*
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
    },
  })
);
*/
}
app.use(sessionMiddleware);

// google passport oAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        'https://midwest-realtors-95d2cdb37007.herokuapp.com/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          email: profile.emails[0].value,
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        // Create a new user with Google account details
        const newUser = new User({
          email: profile.emails[0].value,
          fullName: profile.displayName,
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

// Serialize user data to store in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user data when retrieving from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
// facebook strategy

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL:
        process.env.FACEBOOK_CALLBACK_URL ||
        'https://midwest-realtors-95d2cdb37007.herokuapp.com/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'emails'],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('Facebook Profile Data:', profile);

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
        });

        await newUser.save();

        return done(null, newUser);
      } catch (err) {
        return done(err);
      }
    }
  )
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
app.get('/properties', (req, res) => {
  res.send('properties page.');
});

app.get('/', (req, res) => {
  res.send('cover page');
});

// apartments route
app.use('/apartments', apartmentRoutes);

// homes route
app.use('/homes', homeRoutes);

// commercial route
app.use('/commercials', commercialRoutes);

// appointments route
app.use('/appointments', appointmentRoutes);

//route for fetching a single appointment by ID
//app.use('/appointments/:id', appointmentRoutes);

// admin routes
//app.use('/admin', adminRoutes);

// agents routes
app.use('/agents', agentRoutes);

// auth routes and profile routes
app.use('/auth', authRoutes);

app.post('/auth', authRoutes);

app.use('/user', userRoutes);

// contact page
app.get('/contact', (req, res) => {
  res.send('Contact page');
});
// about page
app.get('/about', (req, res) => {
  res.send('About page');
});

// Google OAuth registration route
app.get(
  '/auth/google/register',
  passport.authenticate('google', {
    scope: ['openid', 'profile', 'email'],
  })
);

// Google OAuth register route
app.get(
  '/auth/google/register',
  passport.authenticate('google', { scope: ['openid', 'profile', 'email'] })
);

// Google OAuth login route
app.get(
  '/auth/google/login',
  passport.authenticate('google', {
    scope: ['openid', 'profile', 'email'],
  })
);
// Google OAuth callback route
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('https://dakota-realtors.vercel.app/user');
  }
);

// Facebook OAuth registration route
app.get(
  '/auth/facebook/register',
  passport.authenticate('facebook', { scope: ['email'] })
);

// Facebook OAuth registration route
app.get(
  '/auth/facebook/register',
  passport.authenticate('facebook', { scope: ['email'] })
);

// Facebook OAuth callback route for registration
app.get(
  '/auth/facebook/callback/register',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('https://dakota-realtors.vercel.app/user');
  }
);

// Callback routes for both registration and login
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect('https://dakota-realtors.vercel.app/user');
  }
);

// port

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

{
  /*
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

*/
}

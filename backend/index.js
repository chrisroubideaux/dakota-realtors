// main app
const express = require('express');
const session = require('express-session');
const { json, urlencoded } = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
// auth routes
const authRoutes = require('./routes/auth');
//const User = require('./models/user');
const apartmentRoutes = require('./apartments/apartments');
const appointmentRoutes = require('./appointments/appointments');
const commercialRoutes = require('./commercials/commercials');
const homeRoutes = require('./homes/homes');
const userRoutes = require('./users/userRoutes');
const agentRoutes = require('./agents/agents');
const adminRoutes = require('./admin/admins');
const messageRoutes = require('./messages/messages');
const meetingRoutes = require('./meetings/meetings');
// google auth
const passport = require('passport');
require('dotenv').config();
const app = express();

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
  credentials: true,
};

app.use(cors(corsOptions));
app.use(json());
app.use(express.json());
app.use(urlencoded({ extended: true }));

// Verify Token  for middleware function

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

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

app.use(sessionMiddleware);

// api routes
app.get('/properties', (req, res) => {
  res.send('properties page.');
});

app.get('/', (req, res) => {
  res.send('cover page');
});

app.use('/apartments', apartmentRoutes);
app.use('/homes', homeRoutes);
app.use('/commercials', commercialRoutes);
app.use('/appointments', appointmentRoutes);
//app.use('/appointments/:id', appointmentRoutes);
app.use('/admin', adminRoutes);
app.use('/agents', agentRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/admins', adminRoutes);
app.use('/messages', messageRoutes);
app.use('/meetings', meetingRoutes);
app.get('/contact', (req, res) => {
  res.send('Contact page');
});

app.get('/about', (req, res) => {
  res.send('About page');
});

app.get('/edit', (req, res) => {
  res.send('edit page');
});
// Oauth
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

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`http://localhost:3000/admins/${userId}`);
  }
);

// Facebook OAuth registration route
app.get(
  '/auth/facebook/register',
  passport.authenticate('facebook', { scope: ['email'] })
);

app.get(
  '/auth/facebook/register',
  passport.authenticate('facebook', { scope: ['email'] })
);

app.get(
  '/auth/facebook/callback/register',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect(`http://localhost:3000/admins/${User}`);
  }
);

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    res.redirect(`http://localhost:3000/admins/${User}`);
  }
);

// port

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

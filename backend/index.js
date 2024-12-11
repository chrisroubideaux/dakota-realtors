// main app
const express = require('express');
const session = require('express-session');
const { json, urlencoded } = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
// auth routes
const authRoutes = require('./routes/auth');
//const User = require('./users/userModel');
const apartmentRoutes = require('./apartments/apartments');
const appointmentRoutes = require('./appointments/appointments');
const commercialRoutes = require('./commercials/commercials');
const homeRoutes = require('./homes/homes');
const userRoutes = require('./users/userRoutes');
const agentRoutes = require('./agents/agents');
const adminRoutes = require('./admin/admins');
const messageRoutes = require('./messages/messages');
const meetingRoutes = require('./meetings/meetings');

// Oauth
const passport = require('passport');
require('./routes/facebookConfig');

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
  // origin: 'http://localhost:3000',
  origin: process.env.CLIENT_BASE_URL || 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Authorization', 'Content-Type'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));
app.use(json());
app.use(express.json());
app.use(urlencoded({ extended: true }));

// Verify Token  for middleware function
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: 'Authentication token is missing' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Extracted Token:', token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.userId = decoded._id;
    console.log('Token Verified, User ID:', req.userId);
    next();
  });
}

{
  /*
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};
*/
  /// Session middleware
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
app.use('/appointments', verifyToken, appointmentRoutes);
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

// Facebook OAuth callback route (Updated to handle dynamic redirect)
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    console.log('Authenticated user:', req.user);
    if (req.user) {
      const { role, id } = req.user;

      if (role === 'admin') {
        res.redirect(`http://localhost:3000/admins/${id}`);
      } else if (role === 'agent') {
        res.redirect(`http://localhost:3000/agents/${id}`);
      } else if (role === 'user') {
        res.redirect(`http://localhost:3000/users/${id}`);
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/login');
    }
  }
);
app.get(
  '/auth/facebook/login',
  passport.authenticate('facebook', { scope: ['email'] })
);

// port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);

  // Log memory usage at startup
  const memoryUsage = process.memoryUsage();
  console.log('Memory Usage at startup:', {
    rss: (memoryUsage.rss / 1024 / 1024).toFixed(2) + ' MB',
    heapTotal: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
    heapUsed: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
    external: (memoryUsage.external / 1024 / 1024).toFixed(2) + ' MB',
  });

  // Periodic memory usage logging every 10 seconds
  setInterval(() => {
    const periodicMemoryUsage = process.memoryUsage();
    console.log('Periodic Memory Usage:', {
      rss: (periodicMemoryUsage.rss / 1024 / 1024).toFixed(2) + ' MB',
      heapTotal:
        (periodicMemoryUsage.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
      heapUsed: (periodicMemoryUsage.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
      external: (periodicMemoryUsage.external / 1024 / 1024).toFixed(2) + ' MB',
    });
  }, 10000); // Logs memory usage every 10 seconds
});

{
  /*
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
*/
}

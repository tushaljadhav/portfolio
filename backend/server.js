const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const connectDB = require('./config/db');
const trackVisitor = require('./config/trackVisitor');

const contactRoutes = require('./routes/contactRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cmsRoutes = require('./routes/cmsRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5500';

const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('CORS blocked for this origin.'));
    },
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change-this-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 6, // 6 hours
      httpOnly: true,
      secure: false, // Set to true if deploying with HTTPS
      sameSite: 'lax',
    },
  })
);

// Tracks incoming requests with IP, URL, and location.
app.use(trackVisitor);

app.use((req, res, next) => {
  if (req.path === '/') {
    res.status(200).send(`Backend is running. Open portfolio frontend.`);
    return;
  }
  next();
});

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, status: 'ok', version: '1.0.2-updated-resume' });
});

app.use('/api', contactRoutes);
app.use('/api', resumeRoutes);
app.use('/api', analyticsRoutes);
app.use('/api', cmsRoutes);
app.use(adminRoutes);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// Trigger seeding only when Mongoose connection is ready.
mongoose.connection.once('open', () => {
  console.log('Mongoose connection established. Running database seeder...');
  const seedDatabase = require('./config/seeder');
  seedDatabase();
});

connectDB();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const admissionRoutes = require('./routes/admissionRoutes');
const timeSlotRoutes = require('./routes/timeslotRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const uploadRoute = require('./routes/upload');

const app = express();

// ✅ Global error handlers to capture crashes
process.on('uncaughtException', (err) => {
  console.error("🔥 Uncaught Exception:", err);
});
process.on('unhandledRejection', (reason) => {
  console.error("🔥 Unhandled Rejection:", reason);
});

// ✅ CORS Setup for frontend + dev
const allowedOrigins = [
  'https://al-manar-school-frontend.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`❌ CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// ✅ Log incoming requests
app.use((req, res, next) => {
  console.log(`🔗 ${req.method} ${req.path} from ${req.headers.origin || 'unknown'}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose runtime error:', err);
});
mongoose.connection.on('connected', () => {
  console.log('🟢 Mongoose connected successfully');
});

// ✅ Routes
app.use('/api/admission', admissionRoutes);
app.use('/api/timeslots', timeSlotRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api', uploadRoute); // POST /api/upload

// ✅ Health check
app.get('/', (req, res) => {
  res.send('✅ AL Manar School API is running...');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

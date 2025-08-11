// server.js
'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dbConnect = require('./lib/db'); // cached connector

// Routes
const admissionRoutes = require('./routes/admissionRoutes');
const timeSlotRoutes = require('./routes/timeslotRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const uploadRoute = require('./routes/upload');

const app = express();

/* =========================
   Global error handlers
========================= */
process.on('uncaughtException', (err) => {
  console.error('🔥 Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('🔥 Unhandled Rejection:', reason);
});

/* =========================
   CORS
========================= */
const allowedOrigins = [
  'https://elmanar.co',
  'https://www.elmanar.co',
  'https://al-manar-school.vercel.app', // backend host
  'http://localhost:3000',
];

app.use(
  cors({
    origin(origin, cb) {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      console.warn('❌ CORS blocked:', origin);
      return cb(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);

/* =========================
   Body parsers & logging
========================= */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use((req, _res, next) => {
  console.log(`🔗 ${req.method} ${req.path} — from: ${req.headers.origin || 'unknown'}`);
  next();
});

/* =========================
   Ensure Mongo is connected
   (await cached connection per request)
========================= */
app.use(async (req, res, next) => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error('❌ MONGO_URI missing');
      return res.status(500).json({ error: 'Database configuration missing' });
    }
    await dbConnect(uri); // cached; fast after first call
    next();
  } catch (e) {
    console.error('❌ DB connect in middleware failed:', e?.message || e);
    res.status(503).json({ error: 'Database not available' });
  }
});

// (Optional) connection event logs for visibility
mongoose.connection.on('connected', () => console.log('🟢 Mongoose connected'));
mongoose.connection.on('error', (err) => console.error('❌ Mongoose error:', err));
mongoose.connection.on('disconnected', () => console.warn('🟡 Mongoose disconnected'));

/* =========================
   Routes
========================= */
app.use('/api/admission', admissionRoutes);
app.use('/api/timeslots', timeSlotRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api', uploadRoute); // POST /api/upload

// Health checks
app.get('/', (_req, res) => res.send('✅ AL Manar School API is running...'));
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    mongoUriSet: !!process.env.MONGO_URI,
    readyState: mongoose.connection.readyState, // 1 means connected
    nodeEnv: process.env.NODE_ENV || 'development',
  });
});

/* =========================
   Error middleware
========================= */
app.use((err, _req, res, _next) => {
  console.error('💥 Unhandled error middleware:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

/* =========================
   Start server
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

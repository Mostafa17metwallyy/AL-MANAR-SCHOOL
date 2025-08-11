// server.js
'use strict';

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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
  'https://al-manar-school.vercel.app', // keep if you still use this
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
   Stable Mongo connection
   (cached to avoid re-connect thrash)
========================= */
let cached = global.__mongoose;
if (!cached) cached = global.__mongoose = { conn: null, promise: null };

async function dbConnect(uri) {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, {
        maxPoolSize: 5,
        serverSelectionTimeoutMS: 10000,
      })
      .then((m) => m)
      .catch((e) => {
        console.error('❌ Initial Mongo connect failed:', e);
        throw e;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Connect once at boot (non-blocking for route mounting)
(async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ MONGO_URI is missing from environment variables.');
    return;
  }

  // 🚨 IMPORTANT: make sure your URI ends with a fixed DB name (e.g., /almanar), not /test
  if (/\/test(\?|$)/.test(uri)) {
    console.warn('⚠️ You are using the default "test" database in MONGO_URI. Consider switching to a fixed DB name like /almanar.');
  }

  try {
    await dbConnect(uri);
    console.log('🟢 Mongo connected');
  } catch (e) {
    console.error('❌ Mongo connection error at startup:', e?.message || e);
  }
})();

// Optional: extra mongoose listeners (for visibility)
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
  const hasDbName = /\/[^/?]+(\?|$)/.test(process.env.MONGO_URI || '');
  res.json({
    ok: true,
    mongoUriSet: !!process.env.MONGO_URI,
    mongoUriHasDbName: hasDbName, // should be true (e.g., /almanar)
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

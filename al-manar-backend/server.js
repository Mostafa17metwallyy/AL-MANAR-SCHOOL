const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const admissionRoutes = require('./routes/admissionRoutes');
const timeSlotRoutes = require('./routes/timeslotRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const uploadRoute = require('./routes/upload');

const app = express();

// ✅ Allow requests from frontend
const allowedOrigins = [
  'https://al-manar-school.vercel.app',  // your frontend
  'http://localhost:3000'                // dev (optional)
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ API Routes
app.use('/api/admission', admissionRoutes);
app.use('/api/timeslots', timeSlotRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api', uploadRoute); // handles POST /api/upload

// ✅ Root route (health check)
app.get('/', (req, res) => {
  res.send('✅ AL Manar School API is running...');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

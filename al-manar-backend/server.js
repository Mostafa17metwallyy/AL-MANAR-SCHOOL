const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // ✅ added to resolve full path
require('dotenv').config();

const admissionRoutes = require('./routes/admissionRoutes');
const timeSlotRoutes = require('./routes/timeslotRoutes');
const announcementRoutes = require('./routes/announcementRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded files statically (fixed using full path)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ DB connection error:', err));

// Routes
app.use('/api/admission', admissionRoutes);
app.use('/api/timeslots', timeSlotRoutes);
app.use('/api/announcements', announcementRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

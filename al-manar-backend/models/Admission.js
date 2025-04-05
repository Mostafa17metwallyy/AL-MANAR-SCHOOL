const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  birthDate: String,
  year: String,
  division: String,
  timeSlot: String,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admission', admissionSchema);
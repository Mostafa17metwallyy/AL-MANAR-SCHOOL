const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  slot: String,
  reservedBy: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TimeSlot', timeSlotSchema);
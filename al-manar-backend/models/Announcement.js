const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: String,
  description: String,
  mediaUrl: String,
  mediaType: String,
  publicId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Announcement || mongoose.model('Announcement', announcementSchema);

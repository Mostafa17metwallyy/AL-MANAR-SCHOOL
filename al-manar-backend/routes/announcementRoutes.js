const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

router.post('/', async (req, res) => {
  try {
    const newAnnouncement = new Announcement(req.body);
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create announcement', details: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch announcements', details: err });
  }
});

module.exports = router;

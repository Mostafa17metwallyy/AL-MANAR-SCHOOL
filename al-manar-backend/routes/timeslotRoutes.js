const express = require('express');
const router = express.Router();
const TimeSlot = require('../models/TimeSlot');

router.post('/', async (req, res) => {
  try {
    const slot = new TimeSlot(req.body);
    await slot.save();
    res.status(201).json(slot);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create slot', details: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const slots = await TimeSlot.find();
    res.status(200).json(slots);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch slots', details: err });
  }
});

router.patch('/:id/reserve', async (req, res) => {
  try {
    const slot = await TimeSlot.findById(req.params.id);
    if (!slot || slot.reservedBy) {
      return res.status(400).json({ error: 'Slot already reserved' });
    }
    slot.reservedBy = req.body.userId;
    await slot.save();
    res.json({ message: 'Slot reserved' });
  } catch (err) {
    res.status(500).json({ error: 'Error reserving slot', details: err });
  }
});

module.exports = router;
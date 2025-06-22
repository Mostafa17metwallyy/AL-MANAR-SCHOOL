const express = require('express');
const router = express.Router();
const TimeSlot = require('../models/TimeSlot');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

// Generate 30-minute sub-slots from a range
function generateSubSlots(range) {
  const [startStr, endStr] = range.split(' - ');
  const start = dayjs(startStr, 'h:mm A');
  const end = dayjs(endStr, 'h:mm A');

  const slots = [];
  let current = start;

  while (current.isBefore(end)) {
    const next = current.add(30, 'minute');
    if (next.isAfter(end)) break;
    slots.push(`${current.format('h:mm A')} - ${next.format('h:mm A')}`);
    current = next;
  }

  return slots;
}

// POST /api/timeslots — Accept full range and split into 30-min intervals
router.post('/', async (req, res) => {
  try {
    const { slot } = req.body;
    const subSlots = generateSubSlots(slot);

    const createdSlots = await Promise.all(
      subSlots.map((s) => new TimeSlot({ slot: s }).save())
    );

    res.status(201).json(createdSlots);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create slots', details: err });
  }
});

// GET all slots
router.get('/', async (req, res) => {
  try {
    const slots = await TimeSlot.find();
    res.status(200).json(slots);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch slots', details: err });
  }
});

// Reserve one slot
router.patch('/:id/reserve', async (req, res) => {
  try {
    const slot = await TimeSlot.findById(req.params.id);
    if (!slot || slot.reservedBy) {
      return res.status(400).json({ error: 'Slot already reserved' });
    }

    slot.reservedBy = req.body.userEmail;
    await slot.save();

    res.json({ message: 'Slot reserved', slot });
  } catch (err) {
    res.status(500).json({ error: 'Error reserving slot', details: err });
  }
});

module.exports = router;

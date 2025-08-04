const express = require('express');
const router = express.Router();
const TimeSlot = require('../models/TimeSlot');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

// ✅ Updated to generate 15-minute intervals
function generateFifteenMinuteSlots(startStr, endStr) {
  const start = dayjs(startStr, 'HH:mm');
  const end = dayjs(endStr, 'HH:mm');

  if (!start.isValid() || !end.isValid() || !start.isBefore(end)) {
    return [];
  }

  const slots = [];
  let current = start;

  while (current.isBefore(end)) {
    const next = current.add(15, 'minute');
    if (next.isAfter(end)) break;
    slots.push(`${current.format('h:mm A')} - ${next.format('h:mm A')}`);
    current = next;
  }

  return slots;
}

router.post('/', async (req, res) => {
  try {
    const { start, end } = req.body;
    if (!start || !end) return res.status(400).json({ error: 'Start and end time required' });

    const slots = generateFifteenMinuteSlots(start, end);
    if (slots.length === 0) return res.status(400).json({ error: 'Invalid time range' });

    const created = await Promise.all(slots.map(s => new TimeSlot({ slot: s }).save()));
    res.status(201).json(created);
  } catch (err) {
    console.error('❌ Error creating slots:', err);
    res.status(500).json({ error: 'Failed to create slots' });
  }
});

router.get('/', async (req, res) => {
  try {
    const allSlots = await TimeSlot.find();
    const available = allSlots.filter(slot => !slot.reservedBy);
    res.json(available);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch slots' });
  }
});

router.patch('/:id/reserve', async (req, res) => {
  try {
    const slot = await TimeSlot.findById(req.params.id);
    if (!slot || slot.reservedBy) return res.status(400).json({ error: 'Slot already reserved' });

    slot.reservedBy = req.body.userEmail;
    await slot.save();

    res.json({ message: 'Slot reserved', slot });
  } catch (err) {
    res.status(500).json({ error: 'Error reserving slot' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await TimeSlot.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Admission = require('../models/Admission');
const TimeSlot = require('../models/TimeSlot');

router.post('/', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      birthDate,
      year,
      division,
      selectedSlot
    } = req.body;

    if (!firstName || !lastName || !email || !birthDate || !year || !division || !selectedSlot) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const slot = await TimeSlot.findById(selectedSlot);
    if (!slot || slot.reservedBy) {
      return res.status(400).json({ error: 'Slot already reserved or not found.' });
    }

    const admission = new Admission({
      firstName,
      lastName,
      email,
      birthDate,
      year,
      division,
      timeSlot: slot.slot,
    });

    await admission.save();

    slot.reservedBy = email;
    await slot.save();

    res.status(201).json({ message: 'Admission saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Admission submission failed' });
  }
});

router.get('/', async (req, res) => {
  try {
    const all = await Admission.find();
    res.json(all);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch admissions' });
  }
});

// DELETE /api/admission/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Admission.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Admission not found' });
    res.status(200).json({ message: 'Admission deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error deleting admission' });
  }
});

module.exports = router;

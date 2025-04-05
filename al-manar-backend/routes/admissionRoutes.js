const express = require('express');
const router = express.Router();
const Admission = require('../models/Admission');

router.post('/', async (req, res) => {
  try {
    const admission = new Admission(req.body);
    await admission.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Submission failed', details: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const admissions = await Admission.find();
    res.json(admissions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admissions', details: err });
  }
});

module.exports = router;
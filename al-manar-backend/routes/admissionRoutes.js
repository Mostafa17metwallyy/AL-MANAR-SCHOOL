const express = require("express");
const router = express.Router();
const Admission = require("../models/Admission");
const sendConfirmationEmail = require("../utils/sendEmail");
const TimeSlot = require("../models/TimeSlot"); // for slot details

// POST form submission
router.post("/", async (req, res) => {
  try {
    const { selectedSlot, firstName, lastName, email } = req.body;

    const admission = new Admission(req.body);
    await admission.save();

    // Mark slot as reserved
    const slot = await TimeSlot.findById(selectedSlot);
    if (!slot || slot.reservedBy) {
      return res.status(400).json({ error: "Slot already taken." });
    }

    slot.reservedBy = email;
    await slot.save();

    // Send confirmation email
    await sendConfirmationEmail(email, `${firstName} ${lastName}`, slot.slot);

    res.status(201).json({ message: "Form submitted & email sent" });
  } catch (err) {
    res.status(500).json({ error: "Submission failed", details: err.message });
  }
});

// GET all submissions
router.get("/", async (req, res) => {
  try {
    const admissions = await Admission.find();
    res.json(admissions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch admissions", details: err });
  }
});

module.exports = router;

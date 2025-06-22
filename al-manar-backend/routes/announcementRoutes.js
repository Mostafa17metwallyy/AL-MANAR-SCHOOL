const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Announcement = require("../models/Announcement");

// Setup storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

// POST /api/announcements
router.post("/", upload.single("media"), async (req, res) => {
  try {
    const { title, description, mediaType } = req.body;
    const mediaUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newAnnouncement = new Announcement({
      title,
      description,
      mediaUrl,
      mediaType,
    });
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create announcement", details: err });
  }
});

// GET /api/announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch announcements", details: err });
  }
});

// PUT /api/announcements/:id
router.put("/:id", upload.single("media"), async (req, res) => {
  try {
    const { title, description, mediaType } = req.body;
    let updateData = { title, description, mediaType };

    if (req.file) {
      updateData.mediaUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update announcement", details: err });
  }
});

// DELETE /api/announcements/:id
router.delete("/:id", async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete announcement", details: err });
  }
});

module.exports = router;

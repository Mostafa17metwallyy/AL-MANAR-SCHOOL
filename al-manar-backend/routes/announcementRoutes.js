const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Announcement = require("../models/Announcement");
const cloudinary = require("../utils/cloudinary");

// Use temporary storage (no custom filename needed)
const upload = multer({ dest: "uploads/" });

// ✅ Create announcement
router.post("/", upload.single("media"), async (req, res) => {
  try {
    const { title, description, mediaType } = req.body;

    let mediaUrl = "";
    let publicId = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "announcements",
        resource_type: "auto",
      });

      mediaUrl = result.secure_url;
      publicId = result.public_id;

      fs.unlinkSync(req.file.path); // clean up temp file
    }

    const newAnnouncement = new Announcement({
      title,
      description,
      mediaUrl,
      mediaType,
      publicId, // ✅ Save publicId for future deletion
    });

    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create announcement", details: err });
  }
});

// ✅ Get all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch announcements", details: err });
  }
});

// ✅ Update announcement
router.put("/:id", upload.single("media"), async (req, res) => {
  try {
    const { title, description, mediaType } = req.body;
    const updateData = { title, description, mediaType };

    const announcement = await Announcement.findById(req.params.id);

    if (req.file) {
      // Optional: delete previous media from Cloudinary
      if (announcement?.publicId) {
        await cloudinary.uploader.destroy(announcement.publicId, {
          resource_type: "auto",
        });
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "announcements",
        resource_type: "auto",
      });

      updateData.mediaUrl = result.secure_url;
      updateData.publicId = result.public_id;

      fs.unlinkSync(req.file.path);
    }

    const updated = await Announcement.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update announcement", details: err });
  }
});

// ✅ Delete announcement
router.delete("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    // ✅ Delete from Cloudinary
    if (announcement.publicId) {
      await cloudinary.uploader.destroy(announcement.publicId, {
        resource_type: "auto",
      });
    }

    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete announcement", details: err });
  }
});

module.exports = router;

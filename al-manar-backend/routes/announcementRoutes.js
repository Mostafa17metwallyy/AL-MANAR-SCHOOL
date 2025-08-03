const express = require("express");
const router = express.Router();
const multer = require("multer");
const streamifier = require("streamifier");
const Announcement = require("../models/Announcement");
const { v2: cloudinary } = require("../utils/cloudinary");

// ✅ Use memory storage (no disk write)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Helper to stream upload to Cloudinary
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// ✅ Create announcement
router.post("/", upload.single("media"), async (req, res) => {
  try {
    const { title, description, mediaType } = req.body;

    console.log("📨 Incoming POST /api/announcements:", {
      title,
      description,
      mediaType,
      file: req.file ? "✅ Received" : "❌ MISSING",
    });

    let mediaUrl = "";
    let publicId = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "announcements");
      mediaUrl = result.secure_url;
      publicId = result.public_id;
    }

    const newAnnouncement = new Announcement({
      title,
      description,
      mediaUrl,
      mediaType,
      publicId,
    });

    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (err) {
    console.error("❌ Error creating announcement:", err);
    res
      .status(500)
      .json({ error: "Failed to create announcement", details: err.message });
  }
});

// ✅ Get all announcements

router.get("/", async (req, res) => {
  try {
    res.set("Cache-Control", "no-store"); // prevent Vercel from caching
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch announcements", details: err.message });
  }
});

// ✅ Update announcement
router.put("/:id", upload.single("media"), async (req, res) => {
  try {
    const { title, description, mediaType } = req.body;
    const updateData = { title, description, mediaType };

    const announcement = await Announcement.findById(req.params.id);

    if (req.file) {
      if (announcement?.publicId) {
        await cloudinary.uploader.destroy(announcement.publicId, {
          resource_type: "auto",
        });
      }

      const result = await uploadToCloudinary(req.file.buffer, "announcements");
      updateData.mediaUrl = result.secure_url;
      updateData.publicId = result.public_id;
    }

    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to update announcement", details: err });
  }
});

// ✅ Delete announcement
router.delete("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    // ✅ Check for a valid publicId before trying to delete from Cloudinary
    if (announcement.publicId && typeof announcement.publicId === "string") {
      try {
        await cloudinary.uploader.destroy(announcement.publicId, {
          resource_type: "auto",
        });
      } catch (cloudErr) {
        console.error("❌ Cloudinary deletion failed:", cloudErr.message);
        // Optionally continue deletion even if cloud delete fails
      }
    }

    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    console.error("❌ Server error on announcement delete:", err.message);
    res
      .status(500)
      .json({ error: "Failed to delete announcement", details: err.message });
  }
});

module.exports = router;

const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('../utils/cloudinary');
const streamifier = require('streamifier');

const router = express.Router();

// Use memory storage to avoid writing to disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'uploads',           // Optional Cloudinary folder
        resource_type: 'auto',       // Automatically detect image/video
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary Error:', error);
          return res.status(500).json({ error: 'Upload failed' });
        }
        res.json({ url: result.secure_url });
      }
    );

    // Pipe file buffer to Cloudinary stream
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;

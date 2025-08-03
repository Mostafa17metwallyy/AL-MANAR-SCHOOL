const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cloudinary = require('../utils/cloudinary');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'uploads',
      resource_type: 'auto',
    });

    fs.unlinkSync(req.file.path); // remove temp file

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;

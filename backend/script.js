// index.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, fileName + '-' + file.originalname); // Use the original filename here if needed
  },
});
const upload = multer({ storage: storage });

// Route to handle file uploads
app.post('/uploads', upload.single('file'), (req, res) => {
  const file = req.file;
  console.log(file);
  // Check if file exists
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Upload file to Cloudinary
  cloudinary.uploader.upload(file.path, { resource_type: 'auto' }, (error, result) => {
    if (error) {
      return res.status(500).json({ message: 'Error uploading to Cloudinary', error: error });
    }

    // Return Cloudinary URL
    res.status(200).json({ url: result.secure_url });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

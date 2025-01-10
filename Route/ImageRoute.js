const multer = require("multer");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

// Set the uploads directory
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

// Multer configuration
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

// POST route for file upload
router.post("/create", upload.single("image"), (req, res) => {
  if (req.file) {
    res.json({
      message: "File uploaded successfully",
      path: `/uploads/${req.file.filename}`,
    });
  } else {
    res.status(400).json({ message: "File upload failed" });
  }
});

// GET route to retrieve uploaded images
router.get("/find", (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error("Error reading uploads directory:", err);
      return res.status(500).json({ message: "Error reading uploads directory" });
    }

    const imagePaths = files.map((file) => `/uploads/${file}`);
    res.json({
      message: "Images retrieved successfully",
      images: imagePaths,
    });
  });
});

module.exports = router;

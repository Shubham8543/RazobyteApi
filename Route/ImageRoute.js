const multer = require("multer");
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

const uploads = path.join(__dirname, "uploads");
if (!fs.existsSync(uploads)) {
  fs.mkdirSync(uploads);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploads),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error("Invalid file type"));
  },
});

router.post("/create", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (req.file) {
      res.json({ message: "File uploaded successfully", path: `/uploads/${req.file.filename}` });
    } else {
      res.status(400).json({ message: "File upload failed" });
    }
  });
});

router.get("/find", (req, res) => {
  fs.readdir(uploads, (err, files) => {
    if (err) {
      console.error("Error reading uploads directory:", err);
      return res.status(500).json({ message: "Error reading uploads directory" });
    }

    const imagePaths = files.map((file) => `/uploads/${file}`);
    res.json({ message: "Images retrieved successfully", images: imagePaths });
  });
});

module.exports = router;

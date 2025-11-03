const express = require("express");
const multer = require("multer");
const router = express.Router();

// Config Multer – Save f public/uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Route upload

router.post("/upload", upload.single("file"), (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ path: fullUrl });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const imageGalleryController = require("../services/controllers/uploadImageController");

// Set up multer for handling multipart form-data
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route to upload before and after images
router.post(
  "/upload-transformation",
  upload.fields([
    { name: "before", maxCount: 1 },
    { name: "after", maxCount: 1 },
  ]),
  imageGalleryController.uploadTransformation
);

// Route to fetch transformation images
router.get("/transformations", imageGalleryController.getTransformations);

module.exports = router;

const express = require("express");
const multer = require("multer");
const path = require("path");
const testimonialController = require("../services/controllers/testimonialController");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Upload testimonial
router.post(
  "/upload",
  upload.single("image"),
  testimonialController.uploadTestimonial
);

// Get all testimonials
router.get("/", testimonialController.getTestimonials);

module.exports = router;

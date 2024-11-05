const path = require("path");
const fs = require("fs");
const Testimonial = require("../models/feedback");

// Function to save testimonials
exports.uploadTestimonial = async (req, res) => {
  try {
    const { testimonial } = req.body;
    const imagePath = `/uploads/${req.file.filename}`;

    const newTestimonial = await Testimonial.create({
      testimonial,
      imagePath,
    });

    res
      .status(201)
      .json({ message: "Testimonial uploaded successfully", newTestimonial });
  } catch (error) {
    console.error("Error uploading testimonial:", error);
    res.status(500).json({ error: "Error uploading testimonial" });
  }
};

// Function to fetch all testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({ error: "Error fetching testimonials" });
  }
};

const path = require("path");
const fs = require("fs");
const ImageGallery = require("../../authentication/models/ImageGallery");

exports.uploadTransformation = async (req, res) => {
  try {
    const { profileId } = req.body;

    if (!req.files || !req.files.before || !req.files.after) {
      return res.status(400).json({ error: "Please upload both images." });
    }

    // Save paths for the uploaded images
    const beforeImagePath = `/uploads/${req.files.before[0].filename}`;
    const afterImagePath = `/uploads/${req.files.after[0].filename}`;

    // Create a new ImageGallery entry
    const newGalleryEntry = await ImageGallery.create({
      profileId: profileId || null, // Allow profileId to be null if not provided
      beforeImagePath,
      afterImagePath,
    });

    res.status(201).json({
      message: "Images uploaded successfully.",
      newGalleryEntry,
    });
  } catch (error) {
    console.error("Error uploading transformation images:", error);
    res.status(500).json({ error: "Error uploading transformation images." });
  }
};

// Function to fetch all transformations from the database
exports.getTransformations = async (req, res) => {
  try {
    const transformations = await ImageGallery.findAll({
      order: [["createdAt", "DESC"]],
    });

    // Return transformations with full image paths
    const transformationsWithPaths = transformations.map((transformation) => ({
      id: transformation.imageId,
      before: transformation.beforeImagePath,
      after: transformation.afterImagePath,
    }));

    res.json(transformationsWithPaths);
  } catch (error) {
    console.error("Error fetching transformation images:", error);
    res.status(500).json({ error: "Error fetching transformation images." });
  }
};

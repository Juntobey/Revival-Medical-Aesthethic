// routes/treatmentRoutes.js
const express = require("express");
const router = express.Router();
const { getTreatments } = require("../services/controllers/treatmentController");

router.get("/", getTreatments);

module.exports = router;

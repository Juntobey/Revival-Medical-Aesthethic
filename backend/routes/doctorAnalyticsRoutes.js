const express = require("express");
const router = express.Router();
const doctorAnalyticsController = require("../services/controllers/doctorAnalyticsController");

// Get doctor analytics
router.get("/doctor-analytics", doctorAnalyticsController.getDoctorAnalytics);

module.exports = router;

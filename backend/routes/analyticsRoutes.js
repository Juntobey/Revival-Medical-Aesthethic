const express = require('express');
const router = express.Router();
const analyticsController = require('../services/controllers/analyticsController');

router.get('/overview', analyticsController.getAnalyticsOverview);

module.exports = router;

// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../services/controllers/notificationController');

// Route to create and send notifications
router.post('/send-notification', notificationController.sendNotification);

// Route for searching users
router.get('/users', notificationController.searchUsers);

module.exports = router;

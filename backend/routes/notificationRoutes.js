// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const notificationController = require('../services/controllers/notificationController');

router.get('/users', notificationController.searchUsers);
router.post("/", notificationController.createNotification);
router.get("/", notificationController.getUserNotifications);
router.patch("/:id/read", notificationController.markAsRead);


module.exports = router;

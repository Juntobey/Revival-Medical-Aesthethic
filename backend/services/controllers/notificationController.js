const Notification = require("../models/notification");
const User = require("../../authentication/models/user");
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');


// Create Notification
exports.createNotification = async (req, res) => {
  const { message, userIds, created_by } = req.body;
  
  try {
    const notification = await Notification.create({
      message,
      created_by,
      targeted_user_ids: userIds.length > 0 ? userIds : null, // If empty, mark as global
    });
    res.status(200).json(notification);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to create notification." });
  }
};


// Get Notifications for User
exports.getUserNotifications = async (req, res) => {
  const userId = req.user?.id || req.headers['user-id']; // Fallback to header if not in req.user

  try {
    // Fetch all notifications
    const notifications = await Notification.findAll();

    // Manually filter the notifications
    const filteredNotifications = notifications.filter(notification => {
      const targetedUserIds = notification.targeted_user_ids || [];

      // Check if notification is targeted to the user or is a global notification
      return targetedUserIds.length === 0 || targetedUserIds.includes(userId);
    });

    res.status(200).json(filteredNotifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Mark Notification as Read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.update(
      { status: "read" },
      { where: { id: req.params.id } }
    );
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Search for users by name or email
exports.searchUsers = async (req, res) => {
    const { search } = req.query;
    try {
      // Use LIKE for case-insensitive search in SQLite
      const users = await User.findAll({
        where: {
          [Op.or]: [
            { email: { [Op.like]: `%${search}%` } },
          ]
        }
      });
      return res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching users.' });
    }
  };
  

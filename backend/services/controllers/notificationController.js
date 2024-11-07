const Notification = require("../models/notification");
const User = require("../../authentication/models/user");
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');

// Create or send notifications
exports.sendNotification = async (req, res) => {
  const { message, schedule, userIds } = req.body;
  const sendToAll = userIds.length === 0; // If no specific users, send to all

  try {
    // Save notification in the database
    const notification = await Notification.create({
      message,
      schedule,
      created_by: req.query.created_by, // Assuming user is authenticated
      created_at: new Date(),
    });

    // Fetch users to send the notification
    let usersToNotify = [];
    if (sendToAll) {
      usersToNotify = await User.findAll(); // Get all users
    } else {
      usersToNotify = await User.findAll({
        where: {
          user_id: {
            [Op.in]: userIds
          }
        }
      });
    }

    // Send email to each user
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Can be replaced with another service
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    usersToNotify.forEach(async (user) => {
      const mailOptions = {
        from: 'your-email@gmail.com',
        to: user.email,
        subject: 'New Notification',
        text: message,
      };

      await transporter.sendMail(mailOptions);
    });

    return res.status(200).json({ message: 'Notification(s) sent successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to send notification.' });
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
  

const Booking = require('../models/bookings');
const Billing = require('../models/billing');
const Appointment = require('../models/appointments');
const User = require('../../authentication/models/user');

exports.getAnalyticsOverview = async (req, res) => {
  try {
    // Fetch the total number of bookings
    const totalBookings = await Booking.count();

    // Fetch the total number of payments
    const totalPayments = await Billing.count({
      where: { payment_status: 'paid' },
    });

    // Fetch the count of active users
    const activeUsers = await User.count({
        where: { active: true },
    });

    // Fetch the number of canceled appointments
    const cancelledAppointments = await Appointment.count({
      where: { status: 'canceled' },
    });

    res.status(200).json({
      totalBookings,
      totalPayments,
      activeUsers,
      cancelledAppointments,
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    res.status(500).json({ error: 'An error occurred while fetching analytics data.' });
  }
};

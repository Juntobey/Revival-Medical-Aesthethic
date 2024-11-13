const Booking = require("../models/bookings");
const Appointment = require("../models/appointments");
const Billing = require("../models/billing");
const Invoice = require("../models/invoice");

// Create Booking
const createBooking = async (req, res) => {
  const { userId, bookingFor, bookingDate, contactNo, name, email } = req.body;
  const formattedDate = new Date(bookingDate);
  try {
    const booking = await Booking.create({
      userId,
      bookingFor,
      formattedDate,
      contactNo,
      name,
      email,
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Booking
const updateBooking = async (req, res) => {
  const { bookingId } = req.params;
  const updates = req.body;

  try {
    await Booking.update(updates, { where: { id: bookingId } });
    res.json({ message: "Booking updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Booking by ID
const getBookingById = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Booking
const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const deleted = await Booking.destroy({ where: { id: bookingId } });
    if (!deleted) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Fetch all bookings with their details
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: Appointment },
        { 
          model: Billing,
          include: [{ model: Invoice }]
        }
      ],
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update payment status
const updatePaymentStatus = async (req, res) => {
  const { billingId } = req.params;
  const { amount_paid, payment_status } = req.body;

  try {
    const billing = await Billing.findByPk(billingId);
    if (!billing) return res.status(404).json({ message: "Billing record not found" });

    billing.amount_paid = amount_paid;
    billing.payment_status = payment_status;
    await billing.save();

    res.status(200).json({ message: "Payment status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createBooking,
  updateBooking,
  getBookingById,
  getAllBookings,
  deleteBooking,
  updatePaymentStatus
};

const Booking = require("../models/bookings");

// Create Booking
const createBooking = async (req, res) => {
  const { userId, bookingFor, bookingDate, contactNo, name, email } = req.body;

  try {
    const booking = await Booking.create({
      userId,
      bookingFor,
      bookingDate,
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

// List Bookings
const listBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
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

module.exports = {
  createBooking,
  updateBooking,
  getBookingById,
  listBookings,
  deleteBooking,
};

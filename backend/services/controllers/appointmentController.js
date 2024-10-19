const Appointment = require("../models/appointments");
const AppointmentType = require("../models/appointmentType");
const Booking = require("../models/bookings");

// Create Appointment
const createAppointment = async (req, res) => {
  const { userId, doctorId, appointmentDateTime, status, notes, appointmentTypeId, bookingId } = req.body;

  try {
    const appointment = await Appointment.create({
      userId,
      doctorId,
      appointmentDateTime,
      status,
      notes,
      appointmentTypeId,
      bookingId,
    });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Appointment
const updateAppointment = async (req, res) => {
  const { appointment_id } = req.params;
  const updates = req.body;

  try {
    await Appointment.update(updates, { where: { appointment_id } });
    res.json({ message: "Appointment updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Appointment
const deleteAppointment = async (req, res) => {
  const { appointment_id } = req.params;

  try {
    await Appointment.destroy({ where: { appointment_id } });
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// List Appointments
const listAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createAppointmentType = async (req, res) => {
  const { appointmentType, description } = req.body;

  try {
    const newAppointmentType = await AppointmentType.create({
      appointmentType,
      description,
    });
    res.status(201).json(newAppointmentType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  listAppointments,
  createAppointmentType
};

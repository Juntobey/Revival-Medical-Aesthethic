const Appointment = require("../models/appointments");
const AppointmentType = require("../models/appointmentType");
const Booking = require("../models/bookings");
const User = require("../../authentication/models/user");
const { Sequelize } = require("sequelize");

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

// Fetch appointment by userId
const getAppointmentByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const appointment = await Appointment.findOne({
      where: { userId },
      include: [
        {
          model: User,
          as: 'Doctor',
          attributes: ['username', 'email'],
        },
      ],
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    return res.json(appointment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getAppointmentsForDoctor = async (req, res) => {
  try {
    const doctorId = req.query.id;

    // Fetch all appointments for the doctor that are not canceled
    const appointments = await Appointment.findAll({
      where: {
        doctorId,
        status: { [Sequelize.Op.notIn]: ['canceled', 'completed'] },
      },
    });

    const response = await Promise.all(
      appointments.map(async (appointment) => {
        const user = await User.findOne({
          where: { id: appointment.userId },
          attributes: ['email'],
        });

        return {
          appointment_id: appointment.appointment_id,
          patientEmail: user ? user.email : null,
          appointmentDateTime: appointment.appointmentDateTime,
          status: appointment.status,
          notes: appointment.notes,
          appointmentTypeId: appointment.appointmentTypeId,
          bookingId: appointment.bookingId,
          createdAt: appointment.createdAt,
          updatedAt: appointment.updatedAt,
        };
      })
    );

    // Respond with the mapped data
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch appointments." });
  }
};


// Controller to mark an appointment as completed
const completeAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await Appointment.findByPk(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    
    if (appointment.status === 'completed') {
      return res.status(400).json({ message: "Appointment already completed" });
    }

    appointment.status = "completed";
    await appointment.save();

    res.status(200).json({ message: "Appointment marked as completed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to complete the appointment." });
  }
};




module.exports = {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  listAppointments,
  createAppointmentType,
  getAppointmentByUserId,
  getAppointmentsForDoctor,
  completeAppointment
};

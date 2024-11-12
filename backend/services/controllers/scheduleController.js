const Schedule = require('../models/schedule');

const Appointment = require("../models/appointments");
const TimeSlot = require("../models/timeslot");
const sequelize = require("../../config/sequelize");
const { Op } = require('sequelize');

const getDoctorsAppointments = async (req, res) => {
  const { doctorId } = req.params;
  const { date } = req.query; // expect date as a query parameter in YYYY-MM-DD format

  try {
    const appointments = await Appointment.findAll({
      where: {
        doctorId,
        appointmentDateTime: sequelize.where(
          sequelize.fn('DATE', sequelize.col('appointmentDateTime')),
          '=',
          date
        ),
        status: 'scheduled',
      },
    });
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Could not retrieve appointments" });
  }
};

const createScheduleAndTimeSlot = async (req, res) => {
  const { doctorId } = req.params;
  const { date, start_time, end_time, is_available, note } = req.body;

  try {
    // Check if schedule exists, create if not
    let schedule = await Schedule.findOne({ where: { doctor_id: doctorId, date } });
    if (!schedule) {
      schedule = await Schedule.create({
        doctor_id: doctorId,
        date,
        is_available: true,
        note,
      });
    }

    // Create the timeslot linked to the schedule
    const timeSlot = await TimeSlot.create({
      schedule_id: schedule.id,
      start_time,
      end_time,
      is_available,
    });

    res.status(201).json({
      message: "Schedule and time slot created successfully",
      schedule,
      timeSlot,
    });
  } catch (error) {
    console.error("Error creating schedule and time slot:", error);
    res.status(500).json({ error: "Failed to create schedule and time slot." });
  }
};

const addNewTimeSlot = async (req, res) => {
  const { doctorId } = req.params;
  const { date, start_time, end_time, is_available } = req.body;

  try {
    let schedule = await Schedule.findOne({ where: { doctor_id: doctorId, date } });
    if (!schedule) {
      schedule = await Schedule.create({ doctor_id: doctorId, date });
    }

    const newSlot = await TimeSlot.create({
      schedule_id: schedule.id,
      start_time,
      end_time,
      is_available,
    });

    res.status(201).json({ message: "Time slot added successfully", newSlot });
  } catch (error) {
    console.error("Error adding time slot:", error);
    res.status(500).json({ message: "Failed to add time slot." });
  }
};



const createAvailability = async (req, res) => {
  const { doctorId } = req.params;
  const { date, isAvailable, note } = req.body;

  try {
    const schedule = await Schedule.create({
      doctor_id: doctorId,
      date,
      is_available: isAvailable,
      note,
    });

    res.status(201).json({ message: "Availability added successfully", schedule });
  } catch (error) {
    console.error("Error creating availability:", error);
    res.status(500).json({ message: "Failed to add availability." });
  }
};

const toggleTimeSlotAvailability = async (req, res) => {
  const { id } = req.params;  // Time slot ID from URL
  try {
    // Find the time slot by its ID
    const timeSlot = await TimeSlot.findByPk(id);

    if (!timeSlot) {
      return res.status(404).json({ message: "Time slot not found" });
    }

    // Toggle the availability
    timeSlot.is_available = !timeSlot.is_available;

    // Save the updated time slot
    await timeSlot.save();

    res.status(200).json({
      message: `Time slot availability updated to ${timeSlot.is_available ? 'available' : 'unavailable'}`,
      timeSlot,
    });
  } catch (error) {
    console.error("Error toggling time slot availability:", error);
    res.status(500).json({ message: "Failed to toggle time slot availability" });
  }
};


const getAvailability = async (req, res) => {
  const { doctorId } = req.params;
  const { date } = req.query; // Expecting date as a query parameter (optional)

  try {
    // Build the where condition to fetch either a specific date or all schedules
    const whereCondition = date ? { doctor_id: doctorId, date } : { doctor_id: doctorId };

    const schedules = await Schedule.findAll({
      where: whereCondition,  // This will fetch all schedules if no date is provided
      include: [{ model: TimeSlot, attributes: ["id", "start_time", "end_time", "is_available"] }],
    });

    if (!schedules || schedules.length === 0) {
      return res.status(404).json({ message: "No availability found." });
    }

    res.json({ schedules }); // Return an array of schedules
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ error: "Could not retrieve schedule." });
  }
};

const getAvailableDates = async (req, res) => {
  const doctorId = req.params.doctorId;
  const today = new Date();

  try {
    const schedules = await Schedule.findAll({
      where: {
        doctor_id: doctorId,
        date: {
          [Op.gte]: today,
        },
        is_available: true,
      },
      include: {
        model: TimeSlot,
        where: {
          is_available: true,
        },
      },
    });

    const availableDates = schedules.map(schedule => ({
      date: schedule.date,
      timeslots: schedule.TimeSlots,
    }));

    res.json(availableDates);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to fetch available dates and slots", error });
  }
};



const updateAvailability = async (req, res) => {
  const { doctorId, scheduleId } = req.params;
  const { isAvailable, note } = req.body;

  try {
    const schedule = await Schedule.findOne({
      where: { doctor_id: doctorId, id: scheduleId },
    });

    if (!schedule) {
      return res.status(404).json({ message: "Availability not found." });
    }

    schedule.is_available = isAvailable;
    schedule.note = note;

    await schedule.save();

    res.status(200).json({ message: "Availability updated successfully", schedule });
  } catch (error) {
    console.error("Error updating availability:", error);
    res.status(500).json({ message: "Failed to update availability." });
  }
};

const deleteAvailability = async (req, res) => {
  const { doctorId, scheduleId } = req.params;

  try {
    const schedule = await Schedule.findOne({
      where: { doctor_id: doctorId, id: scheduleId },
    });

    if (!schedule) {
      return res.status(404).json({ message: "Availability not found." });
    }

    await schedule.destroy();

    res.status(200).json({ message: "Availability deleted successfully" });
  } catch (error) {
    console.error("Error deleting availability:", error);
    res.status(500).json({ message: "Failed to delete availability." });
  }
};

module.exports = {
  createAvailability,
  getAvailability,
  updateAvailability,
  deleteAvailability,
  getDoctorsAppointments,
  addNewTimeSlot,
  createScheduleAndTimeSlot,
  toggleTimeSlotAvailability,
  getAvailableDates
};

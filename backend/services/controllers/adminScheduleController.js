const Schedule = require("../models/schedule");
const TimeSlot = require("../models/timeslot");
const User = require("../../authentication/models/user");

const { Op } = require("sequelize");

const getSchedules = async (req, res) => {
  const doctorId = req.params.doctorId;
  try {
    // Fetch all schedules for the doctor (doctor_id = doctorId) and include time slots
    const schedules = await Schedule.findAll({
      where: { doctor_id: doctorId },
      include: { model: TimeSlot },
      order: [['date', 'ASC']],
    });
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: "Error fetching schedules" });
  }
};

const createSchedule = async (req, res) => {
  const { doctorId, date, note } = req.body;

  if (new Date(date) < new Date()) {
    return res.status(400).json({ error: "Cannot create schedule for past dates" });
  }

  try {
    const schedule = await Schedule.create({
      doctor_id: doctorId,
      date,
      note,
      is_available: true,
    });
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ error: "Error creating schedule" });
  }
};

const updateScheduleAvailability = async (req, res) => {
  const { scheduleId } = req.params;
  const { isAvailable, note } = req.body;

  try {
    const schedule = await Schedule.findByPk(scheduleId);
    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    // Update availability and notes
    schedule.is_available = isAvailable;
    schedule.note = note;
    await schedule.save();

    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: "Error updating schedule" });
  }
};

const addTimeSlot = async (req, res) => {
  const { doctor_id, date, is_available, TimeSlots } = req.body;

  if (!TimeSlots || TimeSlots.length === 0) {
    return res.status(400).json({ error: "At least one time slot is required." });
  }

  try {
    // Check if a schedule already exists for this doctor and date
    let schedule = await Schedule.findOne({
      where: {
        doctor_id,
        date,
      },
    });

    // If the schedule doesn’t exist, create a new one
    if (!schedule) {
      const note = "available";
      schedule = await Schedule.create({
        doctor_id,
        date,
        is_available,
        note
      });
    }

    // Iterate through the TimeSlots array and create each slot
    const createdTimeSlots = await Promise.all(
      TimeSlots.map(async (slot) => {
        return await TimeSlot.create({
          schedule_id: schedule.id,
          start_time: slot.start_time,
          end_time: slot.end_time,
          is_available: true,
        });
      })
    );

    res.status(201).json({
      message: "Schedule and time slots created successfully",
      schedule,
      createdTimeSlots,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating schedule and time slots" });
  }
};


const cancelTimeSlot = async (req, res) => {
  const { timeSlotId } = req.params;

  try {
    const timeSlot = await TimeSlot.findByPk(timeSlotId);
    if (!timeSlot) {
      return res.status(404).json({ error: "Time slot not found" });
    }

    timeSlot.is_available = false;
    await timeSlot.save();

    res.status(200).json(timeSlot);
  } catch (error) {
    res.status(500).json({ error: "Error canceling time slot" });
  }
};


const getDoctors = async (req, res) => {
  try {
    const doctors = await User.findAll({
      where: { roleId: 3 },  // Doctors
      include: {
        model: Schedule,    // Include doctor schedules
        required: false,    // Optional: Include doctors even if they have no schedule
      },
      attributes: ['id', 'username', 'email'],
    });

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ error: "No doctors found" });
    }

    res.status(200).json(doctors);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error fetching doctors" });
  }
};

const deleteTimeSlot = async (req, res) => {
  const { timeSlotId } = req.params;

  try {
    const timeSlot = await TimeSlot.findByPk(timeSlotId);
    if (!timeSlot) {
      return res.status(404).json({ error: "Time slot not found" });
    }

    // Permanently delete the time slot
    await timeSlot.destroy();

    res.status(200).json({ message: "Time slot deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting time slot" });
  }
};


module.exports = {
  getSchedules,
  createSchedule,
  updateScheduleAvailability,
  addTimeSlot,
  cancelTimeSlot,
  getDoctors,
  deleteTimeSlot
};

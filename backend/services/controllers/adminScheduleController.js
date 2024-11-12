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
  const { scheduleId, startTime, endTime } = req.body;

  try {
    const schedule = await Schedule.findByPk(scheduleId);
    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    const timeSlot = await TimeSlot.create({
      schedule_id: scheduleId,
      start_time: startTime,
      end_time: endTime,
      is_available: true,
    });

    res.status(201).json(timeSlot);
  } catch (error) {
    res.status(500).json({ error: "Error creating time slot" });
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


module.exports = {
  getSchedules,
  createSchedule,
  updateScheduleAvailability,
  addTimeSlot,
  cancelTimeSlot,
  getDoctors
};

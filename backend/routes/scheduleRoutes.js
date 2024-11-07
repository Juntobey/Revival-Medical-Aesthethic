// routes/scheduleRoutes.js
const express = require('express');
const router = express.Router();
const {
  createAvailability,
  getAvailability,
  updateAvailability,
  deleteAvailability,
  getDoctorsAppointments,
  addNewTimeSlot,
  createScheduleAndTimeSlot,
  toggleTimeSlotAvailability
} = require('../services/controllers/scheduleController');

// toggle timeslot availability
router.patch("/timeslots/:id/toggle", toggleTimeSlotAvailability);

//  get doctors appointments by date
router.get("/:doctorId/appointments", getDoctorsAppointments);

// Route for creating a new schedule with a timeslot if it doesn’t exist
router.post("/:doctorId/schedule/new", createScheduleAndTimeSlot);

// add timeslot for doctor
router.post('/:doctorId/schedule/:scheduleId/timeslots', addNewTimeSlot);

// Create availability for a doctor
router.post('/:doctorId/schedule', createAvailability);

// Get availability for a doctor
router.get('/:doctorId/schedule', getAvailability);

// Update availability for a specific doctor and date
router.put('/:doctorId/schedule/:scheduleId', updateAvailability);

// Delete availability for a specific doctor and date
router.delete('/:doctorId/schedule/:scheduleId', deleteAvailability);

module.exports = router;

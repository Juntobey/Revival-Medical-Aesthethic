const express = require("express");
const router = express.Router();
const scheduleController = require("../services/controllers/adminScheduleController");

// Routes for managing doctor schedules
router.get("/doctor/:doctorId/schedules", scheduleController.getSchedules);
router.post("/doctor/schedule", scheduleController.createSchedule);
router.put("/schedule/:scheduleId", scheduleController.updateScheduleAvailability);
router.post("/schedule/:doctorId/time-slot", scheduleController.addTimeSlot);
router.put("/timeslot/:timeSlotId/cancel", scheduleController.cancelTimeSlot);
router.delete("/time-slot/:timeSlotId", scheduleController.deleteTimeSlot);
router.get("/doctors", scheduleController.getDoctors);

module.exports = router;

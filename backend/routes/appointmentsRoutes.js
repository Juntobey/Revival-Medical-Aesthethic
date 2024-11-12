const express = require("express");

const appointmentController = require("../services/controllers/appointmentController");

const router = express.Router();


router.get("/", appointmentController.listAppointments);
router.post("/create-appointment", appointmentController.createAppointment);
router.post("/appointment-types", appointmentController.createAppointmentType);
router.put("/:appointment_id", appointmentController.updateAppointment);
router.delete("/:appointment_id", appointmentController.deleteAppointment);
router.get("/appointments", appointmentController.listAppointments);
router.get('/user/:userId', appointmentController.getAppointmentByUserId);
router.get("/doctor-appointments", appointmentController.getAppointmentsForDoctor);
router.patch("/:appointmentId/complete", appointmentController.completeAppointment);

module.exports = router;

const express = require("express");
const bodyParser = require("body-parser");
const appointmentController = require("./services/controllers/appointmentController");
const authController = require("./authentication/controllers/authController")
const bookingController = require("./services/controllers/bookingController");

const cors = require('cors');

const app = express();

// allowed origins adjust according to frontend port
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST']
})); 

app.use(bodyParser.json());

// Bookings
app.post("/", bookingController.createBooking);
app.put("/:bookingId", bookingController.updateBooking);
app.get("/:bookingId", bookingController.getBookingById);
app.get("/", bookingController.listBookings);
app.delete("/:bookingId", bookingController.deleteBooking);


// Appointments
app.post("/", appointmentController.createAppointment);
app.post("/appointment-types", appointmentController.createAppointmentType);
app.put("/:appointment_id", appointmentController.updateAppointment);
app.delete("/:appointment_id", appointmentController.deleteAppointment);
app.get("/", appointmentController.listAppointments);


// authentication
app.post("/login", authController.login);
app.post("/register", authController.register);
app.put("/profile/:userId", authController.updateUserProfile);
app.put("/role/:userId", authController.updateUserRole);
app.post("/reset-password", authController.resetPassword); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Services APIs on: ${PORT}`);
});

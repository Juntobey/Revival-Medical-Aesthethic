const express = require("express");
const bodyParser = require("body-parser");
const appointmentController = require("./services/controllers/appointmentController");
const authController = require("./authentication/controllers/authController");
const bookingController = require("./services/controllers/bookingController");
const testimonialRoutes = require("./routes/testimonialRoutes");

const cors = require("cors");

const app = express();

// allowed origins adjust according to frontend port
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "PATCH"],
  })
);

app.use(bodyParser.json());

app.use(express.static("public"));

// Bookings
app.post("/book", bookingController.createBooking);
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
app.get("/api/users", authController.getUsers);

// testimonials or feedback
app.use("/api/testimonials", testimonialRoutes);
app.use("/uploads", express.static("public/uploads"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Services APIs on: ${PORT}`);
});

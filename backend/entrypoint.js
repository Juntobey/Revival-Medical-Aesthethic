const express = require("express");
const bodyParser = require("body-parser");
const authController = require("./authentication/controllers/authController");
const bookingController = require("./services/controllers/bookingController");
const testimonialRoutes = require("./routes/testimonialRoutes");
const appointmentRoutes = require("./routes/appointmentsRoutes");
const patientRoutes = require("./routes/patientRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const doctorAnalyticsRoutes = require("./routes/doctorAnalyticsRoutes");

const cors = require("cors");

const app = express();

// allowed origins adjust according to frontend port
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(bodyParser.json());

app.use(express.static("public"));

// Bookings
app.post("/book", bookingController.createBooking);
app.put("/:bookingId", bookingController.updateBooking);
app.get("/:bookingId", bookingController.getBookingById);
app.get("/bookings", bookingController.listBookings);
app.delete("/:bookingId", bookingController.deleteBooking);

// Appointments
app.use("/api/appointments", appointmentRoutes);

// patients
app.use('/api/patients', patientRoutes);

// schedule
app.use('/api/doctors',scheduleRoutes);

// notification
app.use('/api/notifications',notificationRoutes);

// doctor analytics
app.use('/api/analytics', doctorAnalyticsRoutes);

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

const express = require("express");
const bodyParser = require("body-parser");
const testimonialRoutes = require("./routes/testimonialRoutes");
const appointmentRoutes = require("./routes/appointmentsRoutes");
const patientRoutes = require("./routes/patientRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const doctorAnalyticsRoutes = require("./routes/doctorAnalyticsRoutes");
const imageUploadsGalleryRoutes = require("./routes/imageUploadsRoutes");
const authenticationRoutes = require("./routes/authenticationRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const adminScheduleRoutes = require("./routes/adminScheduleRoutes");
const treatmentRoutes = require("./routes/treatmentRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");

const cors = require("cors");

const app = express();

// allowed origins adjust according to frontend port
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "http://31.187.72.135",
      "https://31.187.72.135",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(bodyParser.json());

app.use(express.static("public"));

// maintenance routes
app.use("/api/maintenance", maintenanceRoutes);

// invoices
app.use("/api/invoices", invoiceRoutes);

// treatements
app.use("/api/treatments", treatmentRoutes);

// Bookings
app.use("/api/bookings", bookingRoutes);

// admin analytics
app.use("/api/analytics", analyticsRoutes);

// admin scheduling for doctors
app.use("/api/admin", adminScheduleRoutes);

// payments
app.use("/api/payments", paymentRoutes);

// Appointments
app.use("/api/appointments", appointmentRoutes);

// patients
app.use("/api/patients", patientRoutes);

// schedule
app.use("/api/doctors", scheduleRoutes);

// notification
app.use("/api/notifications", notificationRoutes);

// doctor analytics
app.use("/api/analytics", doctorAnalyticsRoutes);

// image analytics
app.use("/api/image-uploads", imageUploadsGalleryRoutes);

// authentication
app.use("/api/authentication", authenticationRoutes);

// testimonials or feedback
app.use("/api/testimonials", testimonialRoutes);
app.use("/uploads", express.static("public/uploads"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Services APIs on: ${PORT}`);
});

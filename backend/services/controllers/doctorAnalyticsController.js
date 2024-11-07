const Appointment = require("../models/appointments");
const User = require("../../authentication/models/user");
const { Op } = require("sequelize");

exports.getDoctorAnalytics = async (req, res) => {
    try {
      // Get doctorId from query parameters
      const doctorId = req.query.doctorId;
      if (!doctorId) {
        return res.status(400).json({ error: "Doctor ID is required" });
      }
  
      // Total patients (roleId = 2 represents patients)
      const totalPatients = await User.count({ where: { roleId: 2 } });
  
      // Total appointments for the doctor
      const totalAppointments = await Appointment.count({
        where: { doctorId },
      });
  
      // Upcoming appointments
      const upcomingAppointments = await Appointment.count({
        where: {
          doctorId,
          appointmentDateTime: { [Op.gte]: new Date() },
          status: "scheduled",
        },
      });
  
      // Completed appointments
      const completedAppointments = await Appointment.count({
        where: {
          doctorId,
          status: "completed",
        },
      });
  
      // Return the data
      res.json({
        totalPatients,
        totalAppointments,
        upcomingAppointments,
        completedAppointments,
      });
    } catch (error) {
      console.error("Error fetching doctor analytics:", error);
      res.status(500).json({ error: "Failed to fetch doctor analytics" });
    }
  };

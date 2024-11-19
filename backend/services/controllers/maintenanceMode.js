const MaintenanceMode = require("../models/maintenanceMode");

exports.getMaintenanceMode = async (req, res) => {
  try {
    const mode = await MaintenanceMode.findOne();
    res.json({ is_active: mode?.is_active || false });
  } catch (error) {
    console.error("Error fetching maintenance mode:", error);
    res.status(500).json({ error: "Failed to fetch maintenance mode." });
  }
};

exports.toggleMaintenanceMode = async (req, res) => {
  try {
    const { is_active } = req.body;

    // Either update existing or create a new entry
    const mode = await MaintenanceMode.findOne();
    if (mode) {
      await mode.update({ is_active });
    } else {
      await MaintenanceMode.create({ is_active });
    }

    res.json({ success: true, is_active });
  } catch (error) {
    console.error("Error toggling maintenance mode:", error);
    res.status(500).json({ error: "Failed to toggle maintenance mode." });
  }
};

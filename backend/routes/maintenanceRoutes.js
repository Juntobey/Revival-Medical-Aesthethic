const express = require("express");
const router = express.Router();
const maintenanceController = require("../services/controllers/maintenanceMode");

router.get("/", maintenanceController.getMaintenanceMode);
router.post("/toggle", maintenanceController.toggleMaintenanceMode);

module.exports = router;

// src/routes/patientRoutes.js

const express = require('express');
const { getPatientInfo, updatePatientInfo } = require('../services/controllers/patientController');

const router = express.Router();

// Route to fetch patient information based on search term
router.get('/patients', getPatientInfo);

// Route to update patient information
router.put('/patients/:patientId/records/:recordId', updatePatientInfo);

module.exports = router;

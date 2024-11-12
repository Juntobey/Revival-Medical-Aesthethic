const express = require('express');
const router = express.Router();
const billingController = require('../services/controllers/billingController');
const invoiceController = require('../services/controllers/invoiceController');

// Create Billing record
router.post('/billing', billingController.createBilling);

// Count payments for a given appointment
router.get('/billing/payments/:appointment_id', billingController.countPayments);

// Create Invoice
router.post('/invoice', invoiceController.createInvoice);

module.exports = router;
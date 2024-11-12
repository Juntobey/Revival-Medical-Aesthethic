// routes/invoiceRoutes.js
const express = require("express");
const router = express.Router();
const { createInvoice } = require("../services/controllers/invoiceController");

router.post("/invoice", createInvoice);

module.exports = router;

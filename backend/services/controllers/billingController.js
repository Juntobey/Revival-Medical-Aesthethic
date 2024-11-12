const Billing = require('../models/billing');

exports.createBilling = async (req, res) => {
  try {
    const { appointment_id, amount_paid, invoice_date, payment_status, payment_method } = req.body;
    const billing = await Billing.create({
      appointment_id,
      amount_paid,
      invoice_date,
      payment_status,
      payment_method
    });
    res.status(201).json(billing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Payment count controller
exports.countPayments = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const payments = await Billing.count({
      where: { appointment_id }
    });
    res.status(200).json({ payment_count: payments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
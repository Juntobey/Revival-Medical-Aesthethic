const Invoice = require('../models/invoice');

exports.createInvoice = async (req, res) => {
  try {
    const { billing_id, invoice_date, amount_due } = req.body;
    const invoice = await Invoice.create({
      billing_id,
      invoice_date,
      amount_due
    });
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
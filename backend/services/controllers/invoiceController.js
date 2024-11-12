const Invoice = require('../models/invoice');
const Billing = require('../models/billing');
const Appointment = require('../models/appointments');

exports.createInvoice = async (req, res) => {
  const { treatmentId, doctorId, userId, date, time, amount } = req.body;
  const appointment = await Appointment.create({
    doctorId: doctorId,
    userId: userId,
    appointmentDateTime: `${date} ${time}`,
    status: 'scheduled',
    appointmentTypeId: 1
  });

  const billing = await Billing.create({
    appointment_id: appointment.appointment_id,
    amount_paid: amount,
    payment_status: 'pending',
    payment_method: 'pay_later',
    invoice_date: new Date(),
  });

  const invoice = await Invoice.create({
    billing_id: billing.billing_id,
    invoice_date: new Date(),
    amount_due: amount,
  });

  res.json({ invoice, message: "Your booking is confirmed, please proceed to payment." });
};

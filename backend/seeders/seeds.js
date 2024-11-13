"use strict";
const Appointment = require("../services/models/appointments");
const AppointmentType = require('../services/models/appointmentType');
const Billing = require('../services/models/billing');
const Booking = require('../services/models/bookings');
const Invoice = require('../services/models/invoice');
const Medical_Record = require('../services/models/medical_record');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Seed AppointmentTypes
      await AppointmentType.bulkCreate([
        { appointmentType: 'hair', description: 'Hair treatment appointment' },
        { appointmentType: 'transplant', description: 'Hair transplant appointment' },
        { appointmentType: 'consultation', description: 'General consultation' },
        { appointmentType: 'follow up', description: 'Follow-up appointment' },
      ]);

      // Seed Booking
      const booking = await Booking.create({
        userId: 3,
        bookingFor: 'hair',
        bookingDate: new Date(),
        bookingStatus: 'confirmed',
        contactNo: '123-456-7890',
        name: 'John Doe',
        email: 'johndoe@example.com',
      });

      // Seed Appointment
      const appointment = await Appointment.create({
        userId: 3,
        doctorId: 2,
        appointmentDateTime: new Date(),
        status: 'scheduled',
        notes: 'Initial consultation for hair treatment',
        appointmentTypeId: 1,
        bookingId: booking.id,  // Ensure the bookingId is set here
      });

      // Seed Billing (Include the new bookingId field)
      const billing = await Billing.create({
        appointment_id: appointment.appointment_id,
        bookingId: booking.id,  // Linking Billing to Booking via bookingId
        amount_paid: 150.0,
        invoice_date: new Date(),
        payment_status: 'paid',
        payment_method: 'credit card',
      });

      // Seed Invoice
      await Invoice.create({
        billing_id: billing.billing_id,
        invoice_date: new Date(),
        amount_due: 0.0,
      });

      // Seed Medical Record
      await Medical_Record.create({
        patient_id: 3,
        created_by: 2,
        record_date: new Date(),
        diagnosis: 'Hair loss',
        treatment: 'Scalp massage and topical treatment',
        prescription: 'Minoxidil 5%',
      });

      console.log("Seeding successful.");
    } catch (error) {
      console.error("Seeding error:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Rollback data seeding
      await queryInterface.bulkDelete("Medical_Records", {}, {});
      await queryInterface.bulkDelete("Invoices", {}, {});
      await queryInterface.bulkDelete("Billings", {}, {});
      await queryInterface.bulkDelete("Appointments", {}, {});
      await queryInterface.bulkDelete("Bookings", {}, {});
      await queryInterface.bulkDelete("AppointmentTypes", {}, {});

      console.log("Rollback successful.");
    } catch (error) {
      console.error("Error rolling back seeding:", error);
    }
  },
};

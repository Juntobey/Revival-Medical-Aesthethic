const express = require("express");

const bookingController = require("../services/controllers/bookingController");

const router = express.Router();

router.post("/book", bookingController.createBooking);
router.put("/:bookingId", bookingController.updateBooking);
router.get("/:bookingId", bookingController.getBookingById);
router.delete("/:bookingId", bookingController.deleteBooking);
router.get("/", bookingController.getAllBookings);
router.put("/billings/:billingId", bookingController.updatePaymentStatus);



module.exports = router;

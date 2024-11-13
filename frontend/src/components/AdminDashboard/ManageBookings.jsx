import React, { useState, useEffect } from "react";
import BASE_URL from "../../config";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/bookings`);
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleSelectBooking = (booking) => {
    setSelectedBooking(booking);
    setAmountPaid("");
    setPaymentStatus("");
  };

  const handleUpdatePayment = async (billingId) => {
    try {
      await fetch(`${BASE_URL}/bookings/billings/${billingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount_paid: parseFloat(amountPaid),
          payment_status: paymentStatus,
        }),
      });
      alert("Payment status updated successfully");
      setSelectedBooking(null); // Close booking details after update
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  return (
    <div className="bg-luxwhite p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-headers font-bold text-darkgreen mb-4">
        Manage Bookings
      </h2>

      {selectedBooking ? (
        <div>
          <button
            onClick={() => setSelectedBooking(null)}
            className="text-indigo-600 underline mb-2"
          >
            Back to all bookings
          </button>
          <h3 className="font-bold mb-2">Booking Details</h3>
          <p>
            <strong>Booking For:</strong> {selectedBooking.bookingFor}
          </p>
          <p>
            <strong>Contact No:</strong> {selectedBooking.contactNo}
          </p>
          <p>
            <strong>Email:</strong> {selectedBooking.email}
          </p>
          <p>
            <strong>Booking Date:</strong>{" "}
            {new Date(selectedBooking.bookingDate).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> {selectedBooking.bookingStatus}
          </p>

          {selectedBooking.Billings &&
            selectedBooking.Billings.map((billing) => (
              <div key={billing.billing_id} className="mt-4 border-t pt-2">
                <p>
                  <strong>Amount Due:</strong> ${billing.amount_due.toFixed(2)}
                </p>
                <p>
                  <strong>Payment Status:</strong> {billing.payment_status}
                </p>
                <p>
                  <strong>Invoice Date:</strong>{" "}
                  {new Date(billing.invoice_date).toLocaleString()}
                </p>

                <h4 className="font-bold mt-2">Update Payment</h4>
                <input
                  type="number"
                  placeholder="Amount Paid"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  className="p-2 border rounded mb-2 w-full"
                />
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="p-2 border rounded mb-2 w-full"
                >
                  <option value="">Select Status</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
                <button
                  onClick={() => handleUpdatePayment(billing.billing_id)}
                  className="bg-blue-500 text-luxwhite p-2 rounded"
                >
                  Update Payment
                </button>
              </div>
            ))}
        </div>
      ) : (
        <div className="overflow-y-auto max-h-96">
          <ul>
            {bookings.map((booking) => (
              <li key={booking.id} className="border-b py-2">
                <p>
                  <strong>Booking For:</strong> {booking.bookingFor}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(booking.bookingDate).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {booking.bookingStatus}
                </p>
                <button
                  onClick={() => handleSelectBooking(booking)}
                  className="text-blue-500 font-cta underline"
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;

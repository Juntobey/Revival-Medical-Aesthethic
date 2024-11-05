// src/components/Dashboard/Notifications.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Notifications = () => {
  // Sample notifications with `status` and `details` fields for the full view
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Your appointment on March 20 is confirmed.",
      details:
        "You have an appointment with Dr. Smith at 10:00 AM on March 20.",
      status: "new",
    },
    {
      id: 2,
      message: "New health tips available in your inbox.",
      details: "Check out our latest health tips to improve your well-being!",
      status: "new",
    },
    {
      id: 3,
      message: "Your profile was updated successfully.",
      details: "Your recent profile changes have been saved successfully.",
      status: "read",
    },
  ]);

  // Function to handle viewing the full notification
  const handleViewNotification = (id) => {
    const notification = notifications.find((n) => n.id === id);
    if (notification) {
      MySwal.fire({
        title: "Notification Details",
        text: notification.details,
        icon: "info",
        confirmButtonText: "Close",
        customClass: {
          popup: "bg-white text-gray-800",
          title: "font-bold text-darkgreen",
          confirmButton: "bg-darkgreen text-white",
        },
      }).then(() => {
        // Mark notification as read after viewing
        setNotifications((prevNotifications) =>
          prevNotifications.map((n) =>
            n.id === id ? { ...n, status: "read" } : n
          )
        );
      });
    }
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-headers font-semibold text-darkgreen">
        Notifications
      </h2>
      <ul className="mt-2 divide-y divide-gray-300">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            onClick={() => handleViewNotification(notification.id)}
            className={`py-2 text-p cursor-pointer ${
              notification.status === "new"
                ? "text-darkgreen font-semibold"
                : "text-gray-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{notification.message}</span>
              {notification.status === "new" && (
                <span className="ml-2 text-xs font-semibold text-lightbrown">
                  NEW
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;

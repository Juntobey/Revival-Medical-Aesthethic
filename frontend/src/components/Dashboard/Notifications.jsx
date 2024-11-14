import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BASE_URL from "../../config";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  // Get the current user's ID from local storage
  const currentUserId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/notifications`, {
          headers: {
            "User-ID": currentUserId, // Send the user ID in the request headers
          },
        });

        // Filter notifications client-side based on targeted_user_ids
        const userNotifications = response.data.filter((notification) => {
          const targetedUserIds = notification.targeted_user_ids || [];
          return (
            targetedUserIds.length === 0 ||
            targetedUserIds.includes(currentUserId)
          );
        });

        setNotifications(userNotifications); // Set the filtered notifications
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [currentUserId]); // Re-run when the currentUserId changes

  const handleViewNotification = async (id) => {
    const notification = notifications.find((n) => n.id === id);
    await Swal.fire({
      title: "Notification Details",
      text: notification.details,
      icon: "info",
    });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "read" } : n))
    );
    await axios.patch(`${BASE_URL}/notifications/${id}/read`);
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold font-headers text-darkgreen">
        Notifications
      </h2>
      <div className="mt-4 space-y-2"></div>
      <div>
        {notifications.length === 0 ? (
          <p>No notifications</p> // Show this message when there are no notifications
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleViewNotification(notification.id)}
              style={{ cursor: "pointer", marginBottom: "10px" }}
            >
              <p>{notification.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;

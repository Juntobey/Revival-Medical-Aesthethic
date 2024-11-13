import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import BASE_URL from "../../config";

const Notifications = () => {
  const [message, setMessage] = useState("");
  const [sendDate, setSendDate] = useState(null);
  const [userSearch, setUserSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sendToAll, setSendToAll] = useState(false);

  // Get the current user's ID from local storage
  const currentUserId = JSON.parse(localStorage.getItem("user"))?.id;

  // Function to handle sending notifications immediately
  const handleSendNow = async () => {
    if (!message || (!sendToAll && selectedUsers.length === 0)) {
      Swal.fire("Error", "Please write a message and select users.", "error");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/notifications/send-notification`,
        {
          message,
          schedule: null,
          userIds: sendToAll ? [] : selectedUsers, // If sending to all, leave userIds empty
          created_by: currentUserId, // Pass the current user's ID
        }
      );
      if (response.status === 200) {
        Swal.fire(
          "Notification Sent",
          "Your message has been sent.",
          "success"
        );
        setMessage("");
        setSelectedUsers([]);
        setSendToAll(false);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to send notification.", "error");
    }
  };

  // Function to handle scheduling notifications
  const handleScheduleSend = async () => {
    if (!message || !sendDate || (!sendToAll && selectedUsers.length === 0)) {
      Swal.fire(
        "Error",
        "Please write a message, select a date, and choose users.",
        "error"
      );
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/notifications/send-notification`,
        {
          message,
          schedule: sendDate,
          userIds: sendToAll ? [] : selectedUsers, // If sending to all, leave userIds empty
          created_by: currentUserId, // Pass the current user's ID
        }
      );
      if (response.status === 200) {
        Swal.fire(
          "Notification Scheduled",
          "Your message has been scheduled.",
          "success"
        );
        setMessage("");
        setSendDate(null);
        setSelectedUsers([]);
        setSendToAll(false);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to schedule notification.", "error");
    }
  };

  // Function to search for users
  const handleUserSearch = async () => {
    if (userSearch) {
      try {
        const response = await axios.get(
          `${BASE_URL}/notifications/users?search=${userSearch}`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error searching for users:", error);
      }
    }
  };

  return (
    <div className="bg-luxwhite p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold font-headers text-darkgreen mb-4">
        Notifications
      </h2>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message..."
        className="w-full p-2 mb-2 border rounded-lg"
        rows="4"
      ></textarea>

      {/* Option to send to all users */}
      <div className="mb-4">
        <label className="mr-2 font-paragraph">Send to All Users</label>
        <input
          type="checkbox"
          checked={sendToAll}
          onChange={(e) => {
            setSendToAll(e.target.checked);
            setSelectedUsers([]);
          }}
        />
      </div>

      {/* User Search and Selection */}
      {!sendToAll && (
        <div className="mb-4">
          <input
            type="text"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            placeholder="Search for users"
            className="w-full p-2 mb-2 border rounded-lg"
          />
          <button
            onClick={handleUserSearch}
            className="bg-lightbrown font-cta text-luxwhite py-2 px-4 rounded-lg"
          >
            Search
          </button>
          <div>
            {users.map((user) => (
              <div key={user.id}>
                <input
                  type="checkbox"
                  value={user.id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers((prev) => [...prev, user.id]);
                    } else {
                      setSelectedUsers((prev) =>
                        prev.filter((id) => id !== user.id)
                      );
                    }
                  }}
                />
                {user.email}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule Notification */}
      <DatePicker
        selected={sendDate}
        onChange={(date) => setSendDate(date)}
        showTimeSelect
        dateFormat="Pp"
        className="p-2 border rounded-lg mr-2"
        placeholderText="Select Date & Time"
      />
      <button
        onClick={handleScheduleSend}
        className="bg-lightbrown text-luxwhite font-cta py-2 px-4 rounded-lg mr-[5px]"
      >
        Schedule
      </button>

      {/* Send Now Button (After Schedule) */}
      <button
        onClick={handleSendNow}
        className="bg-green-500 text-luxwhite font-cta py-2 px-4 rounded-lg mt-4"
      >
        Send Now
      </button>
    </div>
  );
};

export default Notifications;

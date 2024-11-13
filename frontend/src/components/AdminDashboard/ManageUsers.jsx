// src/components/AdminDashboard/ManageUsers.jsx
import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import BASE_URL from "../../config";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/authentication/users`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openUserProfile = (user) => {
    setSelectedUser(user); // Set the selected user to show in the UserProfile view
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-headers font-bold text-darkgreen mb-4">
        Manage Users
      </h2>
      <input
        type="text"
        placeholder="Search by name or email"
        className="w-full p-2 mb-4 border rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {selectedUser ? (
        <UserProfile
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      ) : (
        <div className="overflow-y-auto max-h-96">
          <ul>
            {filteredUsers.map((user) => (
              <li key={user.id} className="border-b py-2">
                <p>
                  <strong>Name:</strong> {user.username}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <button
                  onClick={() => openUserProfile(user)}
                  className="text-blue-500 font-cta underline"
                >
                  View Profile
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;

"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("12345", 10);

    // Insert Users
    await queryInterface.bulkInsert("Users", [
      {
        username: "admin",
        email: "admin@example.com",
        password: hashedPassword,
        roleId: 1, // Admin
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "doctor",
        email: "doctor@example.com",
        password: hashedPassword,
        roleId: 3, // Doctor
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "patient",
        email: "patient@example.com",
        password: hashedPassword,
        roleId: 2, // Patient
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Retrieve all the users to associate profiles
    const users = await queryInterface.sequelize.query(
      'SELECT * FROM "Users"',
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    // Insert User Profiles for each user
    await queryInterface.bulkInsert("UserProfiles", [
      {
        firstName: "Admin",
        lastName: "User",
        nationality: "USA",
        birthday: new Date("1990-01-01"),
        gender: "Other",
        emergencyContactName: "Admin Contact",
        emergencyContactNumber: "1234567890",
        userId: users.find((user) => user.username === "admin").id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Dr.",
        lastName: "Doctor",
        nationality: "USA",
        birthday: new Date("1980-05-15"),
        gender: "Male",
        emergencyContactName: "Dr. Contact",
        emergencyContactNumber: "0987654321",
        userId: users.find((user) => user.username === "doctor").id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Patient",
        lastName: "One",
        nationality: "USA",
        birthday: new Date("1995-08-10"),
        gender: "Female",
        emergencyContactName: "Patient Contact",
        emergencyContactNumber: "1122334455",
        userId: users.find((user) => user.username === "patient").id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Delete profiles first
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "Users" WHERE username IN ("admin", "doctor", "patient")',
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    const userIds = users.map((user) => user.id);

    // Delete profiles based on userIds
    await queryInterface.bulkDelete("UserProfiles", {
      userId: {
        [Sequelize.Op.in]: userIds,
      },
    });

    // Delete users
    return queryInterface.bulkDelete("Users", {
      email: {
        [Sequelize.Op.in]: [
          "admin@example.com",
          "doctor@example.com",
          "patient@example.com",
        ],
      },
    });
  },
};

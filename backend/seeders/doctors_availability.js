"use strict";
const moment = require("moment");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Seed Schedules for the doctor with userId 2
      await queryInterface.bulkInsert(
        "Schedules",
        [
          {
            doctor_id: 2,
            date: moment().format("YYYY-MM-DD"), // Current date
            is_available: true,
            note: "Available for consultation",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            doctor_id: 2,
            date: moment().add(1, "days").format("YYYY-MM-DD"), // Next day
            is_available: true,
            note: "Available for follow-up",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]
      );

      // Retrieve the schedules that were just inserted
      const schedules = await queryInterface.sequelize.query(
        'SELECT * FROM "Schedules" WHERE doctor_id = 2 ORDER BY date ASC',
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      // Seed TimeSlots for each schedule
      for (const schedule of schedules) {
        await queryInterface.bulkInsert(
          "TimeSlots",
          [
            {
              start_time: "09:00:00",
              end_time: "09:30:00",
              is_available: true,
              schedule_id: schedule.id,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              start_time: "10:00:00",
              end_time: "10:30:00",
              is_available: true,
              schedule_id: schedule.id,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              start_time: "11:00:00",
              end_time: "11:30:00",
              is_available: true,
              schedule_id: schedule.id,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ]
        );
      }

      console.log("Seeding successful.");
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Delete TimeSlots first, then Schedules
      await queryInterface.bulkDelete("TimeSlots", {}, {});
      await queryInterface.bulkDelete("Schedules", {}, {});
      console.log("Rollback successful.");
    } catch (error) {
      console.error("Error rolling back data:", error);
    }
  },
};

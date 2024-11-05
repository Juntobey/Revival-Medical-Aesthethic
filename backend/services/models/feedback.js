const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const Testimonial = sequelize.define("Testimonial", {
  testimonial: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Testimonial;

const { DataTypes } = require("sequelize");
const UserProfile = require("./userProfile");
const sequelize = require("../../config/sequelize");

const ImageGallery = sequelize.define("ImageGallery", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userProfileId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: UserProfile,
      key: "id",
    },
  },
  beforeImagePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  afterImagePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = ImageGallery;

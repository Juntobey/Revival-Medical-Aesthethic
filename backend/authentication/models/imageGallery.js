const { DataTypes } = require("sequelize");
const UserProfile = require("./userProfile");
const sequelize = require("../config/sequelize")
// const sequelize = new Sequelize('sqlite::memory:');

const ImageGallery = sequelize.define("ImageGallery", {
  imageId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  profileId: {
    type: DataTypes.INTEGER,
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

// Establish relationship
ImageGallery.belongsTo(UserProfile, { foreignKey: "profileId" });
UserProfile.hasMany(ImageGallery, { foreignKey: "profileId" });

module.exports = ImageGallery;

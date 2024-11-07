const { DataTypes } = require("sequelize");
const Role = require("./role");
const Medical_Record = require("../../services/models/medical_record");
const sequelize = require("../../config/sequelize");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: "id",
    },
    defaultValue: 2,
  },
});

User.belongsTo(Role, { foreignKey: "roleId" });
User.hasMany(Medical_Record, { foreignKey: 'patient_id', as: 'MedicalRecords' }); // A user can have many medical records
User.hasMany(Medical_Record, { foreignKey: 'created_by', as: 'CreatedRecords' });

module.exports = User;

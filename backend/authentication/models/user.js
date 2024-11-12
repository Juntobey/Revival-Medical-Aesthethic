const { DataTypes } = require("sequelize");
const Role = require("./role");
const Medical_Record = require("../../services/models/medical_record");
const Schedule = require("../../services/models/schedule");
const sequelize = require("../../config/sequelize");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: true,
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
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

User.belongsTo(Role, { foreignKey: "roleId" });
User.hasMany(Medical_Record, { foreignKey: 'patient_id', as: 'MedicalRecords' });
User.hasMany(Medical_Record, { foreignKey: 'created_by', as: 'CreatedRecords' });
User.hasMany(Schedule, { foreignKey: 'doctor_id' });

module.exports = User;

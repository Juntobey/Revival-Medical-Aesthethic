// models/treatment.js
module.exports = (sequelize, DataTypes) => {
    const Treatment = sequelize.define('Treatment', {
      treatment_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    Treatment.associate = (models) => {
      // Define any relationships if necessary
    };
  
    return Treatment;
  };
  
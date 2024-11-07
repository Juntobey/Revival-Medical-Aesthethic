module.exports = (sequelize, DataTypes) => {
    const Shift_Type = sequelize.define('Shift_Type', {
      shift_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      shift_type: DataTypes.STRING
    }, {});
  
    Shift_Type.associate = function(models) {
      Shift_Type.hasMany(models.Shift, { foreignKey: 'shift_type_id' });
    };
  
    return Shift_Type;
  };
  
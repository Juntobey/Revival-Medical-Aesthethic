module.exports = (sequelize, DataTypes) => {
    const Shift = sequelize.define('Shift', {
      shift_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      shift_type_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Shift_Types',
          key: 'shift_type_id'
        }
      },
      shift_description: DataTypes.STRING,
      supervisor: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      nurse: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      }
    }, {});
  
    Shift.associate = function(models) {
      Shift.belongsTo(models.Shift_Type, { foreignKey: 'shift_type_id' });
      Shift.belongsTo(models.User, { foreignKey: 'supervisor', as: 'Supervisor' });
      Shift.belongsTo(models.User, { foreignKey: 'nurse', as: 'Nurse' });
    };
  
    return Shift;
  };
  
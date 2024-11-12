module.exports = (sequelize, DataTypes) => {
    const Support = sequelize.define('Support', {
      support_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      subject: DataTypes.DATE,
      message: DataTypes.STRING,
      status: DataTypes.STRING,
      handled_by: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      user: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    }, {});
    
    Support.associate = function(models) {
      Support.belongsTo(models.User, { foreignKey: 'handled_by', as: 'handler' });
      Support.belongsTo(models.User, { foreignKey: 'user', as: 'creator' });
    };
  
    return Support;
  };
  
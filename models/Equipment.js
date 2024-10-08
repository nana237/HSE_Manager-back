const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Equipment extends Model {}

Equipment.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateInstallation: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      dateVerification: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Equipment',
      tableName: 'equipment',
      timestamps: false,
    }
);

module.exports = Equipment;

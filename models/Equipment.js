const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Assuming sequelize is exported from a `sequelize.js` file

const Equipment = sequelize.define('Equipment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
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
});

module.exports = Equipment;

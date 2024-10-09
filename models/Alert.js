const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Company = require("./Company");

class Alert extends Model {}

Alert.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
    },
    {
        sequelize,
        modelName: 'Alert',
        tableName: 'alert',
        timestamps: false,
    }
);

Alert.belongsTo(Company, {foreignKey: 'company_id'});

module.exports = Alert;

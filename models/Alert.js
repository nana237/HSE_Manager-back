const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

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

module.exports = Alert;

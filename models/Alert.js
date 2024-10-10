const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize');
const Company = require("./Company");

class Alert extends Model {
}

Alert.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        company_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 0
        }
    },
    {
        sequelize,
        modelName: 'Alert',
        tableName: 'alert',
        timestamps: false,
    }
);

Alert.belongsTo(Company, {foreignKey: 'company_id'});
Company.hasMany(Alert, {foreignKey: 'company_id'});

module.exports = Alert;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Company extends Model {}

Company.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nb_employees: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'Company',
        tableName: 'company',
        timestamps: false,
    }
);

module.exports = Company;

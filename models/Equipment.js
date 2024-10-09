const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize');
const Company = require('../models/Company');

class Equipment extends Model {
}

Equipment.init(
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

Equipment.belongsTo(Company, {foreignKey: 'company_id'});

module.exports = Equipment;

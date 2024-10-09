const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Company = require('../models/Company');

class Certificat extends Model {}

Certificat.init(
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        employee_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        certification_data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        organism: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Certificat',
        tableName: 'certificat',
        timestamps: false,
    }
);

Certificat.belongsTo(Company, { foreignKey: 'company_id' });

module.exports = Certificat;

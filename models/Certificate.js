const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize');
const Company = require('../models/Company');

class Certificate extends Model {
}

Certificate.init(
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
        certification_date: {
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
        modelName: 'Certificate',
        tableName: 'certificate',
        timestamps: false,
    }
);

Certificate.belongsTo(Company, {foreignKey: 'company_id'});
Company.hasMany(Certificate, {foreignKey: 'company_id'});

module.exports = Certificate;

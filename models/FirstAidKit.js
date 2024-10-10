const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Company = require("./Company");

class FirstAidKit extends Model {}

FirstAidKit.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        company_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'FirstAidKit',
        tableName: 'firstAidKit',
        timestamps: false,
    }
);

FirstAidKit.belongsTo(Company, { foreignKey: 'company_id' });
Company.hasMany(FirstAidKit, {foreignKey: 'company_id'});

module.exports = FirstAidKit;

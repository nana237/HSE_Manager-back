const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class FirstAidKit extends Model {}

FirstAidKit.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
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

module.exports = FirstAidKit;

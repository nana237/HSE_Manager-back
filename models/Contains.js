const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize');
const FirstAidKit = require('./FirstAidKit');
const FirstAidKitItem = require('./FirstAidKitItem');

class Contains extends Model {
}

Contains.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        sequelize,
        modelName: 'Contains',
        tableName: 'contains',
        timestamps: false,
    }
);

FirstAidKitItem.belongsToMany(FirstAidKit, {through: Contains});
FirstAidKit.belongsToMany(FirstAidKitItem, {through: Contains});

module.exports = Contains;

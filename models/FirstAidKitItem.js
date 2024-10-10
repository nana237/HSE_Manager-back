const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/sequelize');
const FirstAidKit = require('./FirstAidKit');

class FirstAidKitItem extends Model {
}

FirstAidKitItem.init(
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
        link: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'FirstAidKitItem',
        tableName: 'firstAidKitItem',
        timestamps: false,
    }
);

FirstAidKitItem.belongsToMany(FirstAidKit, {through: 'Contains'});
FirstAidKit.hasMany(FirstAidKitItem, {foreignKey: 'kitId', onDelete: 'CASCADE'});

module.exports = FirstAidKitItem;

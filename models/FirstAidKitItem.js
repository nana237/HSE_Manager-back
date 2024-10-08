const { DataTypes, Model} = require('sequelize');
const sequelize = require('../sequelize');
const FirstAidKit = require('./FirstAidKit');

class FirstAidKitItem extends Model {}

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
    },
    {
        sequelize,
        modelName: 'FirstAidKitItem',
        tableName: 'firstAidKitItem',
        timestamps: false,
    }
);

FirstAidKit.hasMany(FirstAidKitItem, { foreignKey: 'kitId', onDelete: 'CASCADE' });
FirstAidKitItem.belongsTo(FirstAidKit, { foreignKey: 'kitId' });

module.exports = FirstAidKitItem;

const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const FirstAidKit = require('./FirstAidKit');

const FirstAidKitItem = sequelize.define('FirstAidKitItem', {
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
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

FirstAidKit.hasMany(FirstAidKitItem, { foreignKey: 'kitId', onDelete: 'CASCADE' });
FirstAidKitItem.belongsTo(FirstAidKit, { foreignKey: 'kitId' });

module.exports = FirstAidKitItem;

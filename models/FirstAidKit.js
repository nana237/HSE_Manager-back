const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const FirstAidKit = sequelize.define('FirstAidKit', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = FirstAidKit;

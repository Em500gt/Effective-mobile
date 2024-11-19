const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Stock = sequelize.define('Stock', {
  shopId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shelfQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  orderQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
});

module.exports = Stock;
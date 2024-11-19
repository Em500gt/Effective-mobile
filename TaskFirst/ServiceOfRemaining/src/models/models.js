const sequelize = require('../config/db');
const Stock = require('./stock');
const Product = require('./product');

// (async () => {
//     try {
//         await sequelize.sync()
//         console.log('Tables synced');
//     } catch(error) {
//         console.error('Error syncing tables: ', error);
//     }
// })();

Product.hasMany(Stock, { foreignKey: 'productId', as: 'stocks' });
Stock.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = { Product, Stock };
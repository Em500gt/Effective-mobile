const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        dialect: process.env.DIALECT,
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
            max: 10, 
            min: 0, 
            acquire: 30000, 
            idle: 10000,   
        },
    }
);

module.exports = sequelize;
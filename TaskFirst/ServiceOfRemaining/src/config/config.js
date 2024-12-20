require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        dialect: process.env.DIALECT,
        migrationStorageTableName: "migrations",
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_PROD,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        dialect: process.env.DIALECT,
        migrationStorageTableName: "migrations", 
        logging: false,
    },
};
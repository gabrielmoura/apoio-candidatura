const Sequelize = require("sequelize");
require('dotenv').config();


const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: 5432,
    timezone: "-03:00",
    dialectOptions: {
        ssl: {
            require: true, // This will help you. But you will see nwe error
            rejectUnauthorized: false // This line will fix new error
        }
    }
});
if (!process.env.DB_PREFIX) {
    process.env.DB_PREFIX = "G";
}
module.exports = {connection, env: process.env};
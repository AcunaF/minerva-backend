const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const db = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DIALECT,
};

const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: db.dialect,
    dialectOptions: {
        multipleStatements: true,
    },
});

async function connection() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        throw error;
    }
}

module.exports = { connection, sequelize };

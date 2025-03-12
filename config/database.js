/**
 * Import Sequelize.
 */
const Sequelize = require("sequelize");

/**
 * Create a Sequelize instance. This can be done by passing
 * the connection parameters separately to the Sequelize constructor.
 */
/*const sequelize = new Sequelize("books", "root", "", {
   //host: "localhost",
   //dialect: "sqlite::memory:",
});*/

const sequelize = new Sequelize({
   dialect: 'sqlite',
   storage: './db/database.sqlite'
 });

/**
 * Export the Sequelize instance. This instance can now be
 * used in the index.js file to authenticate and establish a database connection.
 */
module.exports = sequelize;
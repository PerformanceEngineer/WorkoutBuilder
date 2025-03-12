const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/database.js");

const Book = sequelize.define(
   "Book",
   {
      // Each attribute will pair with a column
      // Here we define our model attributes

      // Our primaryKey, book id, our unique identifier
      id: {
         type: DataTypes.UUID,
         defaultValue: Sequelize.UUIDV4,
         primaryKey: true,
      },

      // This will create a title for a column of the book
      title: {
         type: DataTypes.STRING,
         allowNull: false,
      },

      // This will create a column for the author's name
      authorName: {
         type: DataTypes.STRING,
         // remember allowNull defaults to true
      },

      release:{
         type: DataTypes.DATE,
         allowNull: true,
      }
   },
   {
      // For the sake of clarity we specify our indexes
      indexes: [{ unique: true, fields: ["id"] }],
   }
);

// `sequelize.define` also returns the model
console.log(Book === sequelize.models.Book); // true

module.exports = {
   Book,
   sequelize,
};
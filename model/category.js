const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/database.js");

const Category = sequelize.define(
   "Category",
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
   },
   {
      // For the sake of clarity we specify our indexes
      indexes: [{ unique: true, fields: ["id"] }],
   }
);

//const Exercise = require("./exercise.js");
//Category.belongsToMany(Exercise.Exercise, { through: "ExerciseCategory" });

// `sequelize.define` also returns the model
console.log(Category === sequelize.models.Category); // true

module.exports = {
   Category,
   sequelize,
};
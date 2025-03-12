const Category = require("./category.js").Category;
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/database.js");

const Exercise = sequelize.define(
   "Exercise",
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
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },

      // This will create a column for the author's name
      description: {
         type: DataTypes.STRING,
         // remember allowNull defaults to true
      },

      videoUrl:{
         type: DataTypes.STRING,
         allowNull: true,
      },

   },
   {
      // For the sake of clarity we specify our indexes
      indexes: [{ unique: true, fields: ["id"] }],
   }
);

//Exercise.belongsToMany(Category, { through: "ExerciseCategory" });

// `sequelize.define` also returns the model
console.log(Exercise === sequelize.models.Exercise); // true

module.exports = {
   Exercise,
   sequelize,
};
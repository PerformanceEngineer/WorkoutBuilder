require("dotenv").config();
console.log(process.env) 
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Import the database connection file.
const sequelize = require("./config/database");

// Import the Book model.
const BookModel = require("./model/book");
const { createBook, getAllBooks, getBook, editBook, deleteBook } = require("./controller");

const ExerciseModel = require("./model/exercise");
const { createExercise, getExercise } = require("./exerciseController");

const CategoryModel = require("./model/category");

// Define Many-to-Many Relationship
ExerciseModel.Exercise.belongsToMany(CategoryModel.Category, { through: "ExerciseCategory" });
CategoryModel.Category.belongsToMany(ExerciseModel.Exercise, { through: "ExerciseCategory" });


const bookRouter = require("./routes");
const exerciseRouter = require("./exerciseRoutes");
const categoryRouter = require("./categoryRoutes");
const userRouter = require("./userRoutes");


const initApp = async () => {
    console.log("Testing the database connection..");
 
    // Test the connection.
    try {
       await sequelize.authenticate();
       console.log("Connection has been established successfully.");
       
       /*BookModel.Book.sync({ alter: true });
       CategoryModel.Category.sync({ alter: true });
       ExerciseModel.Exercise.sync({ alter: true });*/

       await sequelize.sync({alter:false});

       app.use(express.json());
       app.use("/book", bookRouter);
       app.use("/exercise", exerciseRouter);
       app.use("/category", categoryRouter);
       app.use("/user", userRouter);
       /**
        * Start the web server on the specified port.
        */
 
       app.listen(port, () => {
          console.log(`Server is running at: http://localhost:${port}`);
       });
    } catch (error) {
       console.error("Unable to connect to the database:", error.original);
    }
 };
 
 /**
  * Initialize the application.
  */
 initApp();

app.get("/", (req, res) => {
   res.send("Hello World!");
});
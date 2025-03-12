const {login, authenticateToken} = require("./userController");

const ExerciseModel = require("./model/exercise");
const { createExercise, getExercise, getExercisesByCategory } = require("./exerciseController");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello Exercise!");
});

router.post("/create", createExercise);
router.get("/get", getExercise);
router.get("/getByCategory", authenticateToken, getExercisesByCategory);

module.exports = router;
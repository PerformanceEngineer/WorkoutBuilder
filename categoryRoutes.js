const {login, authenticateToken} = require("./userController");

const CategoryModel = require("./model/category");
const { createCategory, getCategory } = require("./categoryController");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello Category!");
});

router.post("/create", createCategory);
router.get("/get", getCategory);

module.exports = router;
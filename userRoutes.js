const { login, authenticateToken } = require("./userController");

const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    login(req, res);
});

module.exports = router;
const BookModel = require("./model/book");
const { createBook, createBookGet, getAllBooks, getBook, editBook, deleteBook } = require("./controller");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello Book!");
});

router.post("/create-book", createBook);
router.get("/get-book", getBook);

router.get("/create-a-book", createBookGet);
router.get("/get-all-books", getAllBooks);
router.put("/", editBook);
router.delete("/", deleteBook);

module.exports = router;
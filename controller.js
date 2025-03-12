const bm = require("./model/book");
const BookModel = bm.Book;
const sequelize = bm.sequelize;


const createBook = (req, res) =>{
    // Call the create function on the Book model, and pass the data that you receive.
 
    const {title, author} = req.body;
    BookModel.create({
        title: title,
        authorName: author,
    })
    .then((result) => {
        return res.json({
              message: "Record created successfully!",
        });
    })
    .catch((error) => {
        console.log(error);
        return res.json({
              message: "Unable to create a record!",
        });
    });
 };

const createBookGet = async (req, res) =>{
    // Call the create function on the Book model, and pass the data that you receive.
 

    const existingBook = await BookModel.findAll({where: 
        {
            authorName: req.query.author,
            title: req.query.title,
        },
    });
    if (existingBook.length > 0) {
        return res.json({
            message: "Book already exists!",
      });
    }

    // const newBook = await BookModel.create({
    //     title: req.query.title,
    //     authorName: req.query.author,
    // });
    /*await newBook.save();*/


    //const {title, author} = req.query;
    BookModel.create({
        title: req.query.title,
        authorName: req.query.author,
    })
    .then((result) => {
        return res.json({
              message: "Record created successfully!",
        });
    })
    .catch((error) => {
        console.log(error);
        return res.json({
              message: "Unable to create a record!",
        });
    });
 };

const getBook = async (req, res) => {
    const id = req.query.id;
    console.log(id);
    await BookModel.findByPk( id )
    .then((result) => {
        return res.json(result);
    })
    .catch((error) => {
        console.log(error);
        return res.json({
            message: 'Unable to fetch the record!'
        });
    });
};

const getAllBooks = (req, res) => {
    BookModel.findAll({
       attributes: ["id", "title", "authorName", "release"],
    })
       .then((result) => {
          return res.json(result);
       })
       .catch((error) => {
          console.log(error);
          return res.json({
             message: "Unable to fetch records!",
          });
       });
 };

const editBook = (req, res) => {};
const deleteBook = (req, res) => {};

module.exports = { createBook, createBookGet, getAllBooks, getBook, editBook, deleteBook };
const Author = require("../model/authorModel");

authorController = {};

authorController.displayAll = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json({
      message: "this is a list of all the registered authors",
      Authors: authors,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = authorController;

authorController.addNewAuthor = async (req, res) => {
  const { author, nationality, books } = req.body;
  console.log("books=>", books);
  const authorCheck = await Author.findOne({ author: author });
  if (authorCheck)
    res.status(400).json({
      message:
        "The was already exists in our records, please add a new author!",
    });
  try {
    // new Author
    const newAuthor = new Author({
      author: author,
      nationality: nationality,
      books: books,
    });
    await newAuthor.save();
    res
      .status(200)
      .json({ message: "new author was added", author: newAuthor });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

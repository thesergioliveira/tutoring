const mongoose = require("mongoose");

// Schema for the books submodel
const BookSchema = new mongoose.Schema({
  _id: false,
  name: String,
  publicationDate: Number,
  category: String,
});

// Schema for the author model
const authorSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  nationality: String,
  books: [BookSchema],
});

module.exports = mongoose.model("author", authorSchema);

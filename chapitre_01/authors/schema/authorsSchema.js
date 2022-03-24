const mongoose = require("mongoose");

const authorsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: 255,
  },
  nationality: {
    type: String,
    required: true,
    unique: false,
    maxlength: 3,
  },
  books: {
    type: Array,
    required: true,
    unique: true,
    maxlength: 200,
  },
});

const Author = mongoose.model("Author", authorsSchema);

module.exports = Author;

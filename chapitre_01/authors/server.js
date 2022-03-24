const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "../../config.env",
});

app.use(express.json());

// ----------- MONGODB ----------- \\

const mongoose = require("mongoose");
const Authors = require("./schema/authorsSchema");

mongoose
  .connect(
    "mongodb+srv://Konexio-root-kevinganem:root@cluster0.18asb.mongodb.net/kevinganem?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.get("/", (_req, res) => {
  res.send("Authors API");
});

// ----------- AUTHORS MONGODB ----------- \\

app.get("/authors", async (_req, res) => {
  const authors = await Authors.find().select("-__v");

  try {
    authors;
  } catch (err) {
    console.log(err);
    res.json({
      message: "Error",
    });
  }

  res.json(authors);
});

app.get("/authors/:id", async (req, res) => {
  const author = await Authors.findById(req.params.id);

  try {
    author;
  } catch (err) {
    console.log(err);
    res.json({
      message: "Error",
    });
  }
  res.json(author);
});

app.get("/authors/:id/books", async (req, res) => {
  const book = await Authors.findById(req.params.id).select("books");

  try {
    book;
  } catch (err) {
    console.log(err);
    res.json({
      message: "Error",
    });
  }
  res.json(book);
});

app.post("/authors/new", async (req, res) => {
  try {
    await Authors.create(req.body);
  } catch (err) {
    console.log(err);
    res.json({
      message: "Error",
    });
  }

  res.status(201).json({
    message: "User added",
  });
});

// ----------- * ----------- \\

app.get("*", (_req, res) => {
  res.status(404).send("Page not found");
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});

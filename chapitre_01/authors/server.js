const express = require("express");
const dotenv = require("dotenv");
dotenv.config({
  path: "../../config.env",
});
const { Pool } = require("pg");
const app = express();
app.use(express.json());

const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

app.get("/", (_req, res) => {
  res.send("Authors API");
});

// ----------- AUTHORS ----------- \\

app.get("/authors/:id", async (req, res) => {
  const author = await Postgres.query(
    "SELECT name, nationality FROM authors WHERE authors.author_id=$1",
    [req.params.id]
  );

  res.send(author.rows);
});

app.get("/authors/:id/books", async (req, res) => {
  const author = await Postgres.query(
    "SELECT books FROM authors WHERE authors.author_id=$1",
    [req.params.id]
  );

  res.send(author.rows);
});

// ----------- JSON ----------- \\

app.get("/json/authors/:id", async (req, res) => {
  const author = await Postgres.query(
    "SELECT name, nationality FROM authors WHERE authors.author_id=$1",
    [req.params.id]
  );

  res.json(author.rows);
});

app.get("/json/authors/:id/books", async (req, res, _next) => {
  const author = await Postgres.query(
    "SELECT books FROM authors WHERE authors.author_id=$1",
    [req.params.id]
  );

  res.json(author.rows);
});

// ----------- * ----------- \\

app.get("*", (_req, res) => {
  res.status(404).send("Page not found");
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});

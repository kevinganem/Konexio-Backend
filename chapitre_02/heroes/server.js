const express = require("express");
const dotenv = require("dotenv");
dotenv.config({
  path: "../../config.env",
});
const { Pool } = require("pg");
const app = express();
app.use(express.json());

const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

// ------ MIDDLEWARE ------- \\

app.use((_req, _res, next) => {
  console.log("Request received");
  next();
});

// ------ HEROES ------- \\

app.get("/heroes", async (_req, res) => {
  const heroes = await Postgres.query("SELECT * FROM heroes");

  res.json(heroes.rows);
});

app.post("/heroes", async (req, res) => {
  try {
    await Postgres.query(
      "INSERT INTO heroes(name, power, color, isAlive, age, image) VALUES($1, $2, $3, $4, $5, $6)",
      [
        req.body.name,
        req.body.power,
        req.body.color,
        req.body.isAlive,
        req.body.age,
        req.body.image,
      ]
    );
  } catch (err) {
    return res.status(400).json({
      message: "An error happened. Bad data received.",
    });
  }

  if (req.body.name) {
    req.body.name === req.body.name.toLocaleLowerCase();
  }

  res.json({
    message: `Hero ${req.body.name} added to the database`,
  });
});

app.use("/heroes", async (_req, res, _next) => {
  const heroes = await Postgres.query("SELECT * FROM heroes");

  res.json(heroes.rows);
});

// ------ HEROES NAME ------- \\

app.get("/heroes/:name", async (req, res) => {
  const heroes = await Postgres.query(
    "SELECT * FROM heroes WHERE heroes.name=$1",
    [req.params.name]
  );

  if (req.params.name) {
    req.params.name.toLocaleLowerCase().replace(" ", "-") ===
      heroes.name.toLocaleLowerCase().replace(" ", "-");
  }

  if (!heroes) {
    return res.json({
      message: "This hero does not exist",
    });
  }

  res.json(heroes.rows);
});

// ------ HEROES POWER ------- \\

app.get("/heroes/:name/powers", async (req, res) => {
  const heroes = await Postgres.query(
    "SELECT power FROM heroes WHERE heroes.name=$1",
    [req.params.name]
  );

  if (req.params.name) {
    req.params.name.toLocaleLowerCase().replace(" ", "-") ===
      heroes.name.toLocaleLowerCase().replace(" ", "-");
  }

  if (!heroes) {
    return res.json({
      message: "This hero does not exist",
    });
  }

  res.json(heroes.rows);
});

app.patch("/heroes/:name/powers", async (req, res) => {
  const heroes = await Postgres.query(
    "UPDATE heroes SET power=$2 WHERE heroes.name=$1",
    [req.params.name],
    [req.body.power]
  );

  if (req.params.name) {
    req.params.name.toLocaleLowerCase().replace(" ", "-") ===
      heroes.name.toLocaleLowerCase().replace(" ", "-");
  }

  if (!heroes) {
    return res.json({
      message: "This hero does not exist",
    });
  }

  res.send("Power added");
  res.json(heroes.rows);
});

// ------ * ------- \\

app.get("*", (_req, res) => {
  res.status(404).send("Page not found");
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});

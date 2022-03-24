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
  res.send("Heroes API");
});

// ------ MIDDLEWARE ------- \\

app.use((_req, _res, next) => {
  console.log("Request received");
  next();
});

// ------ HEROES ------- \\

app.get("/heroes", async (_req, res) => {
  let heroes;

  try {
    heroes = await Hero.find();
  } catch (err) {
    console.log(err);
    return res.status(400).send("error 400");
  }

  res.json(heroes);
});

app.post("/heroes", async (req, res) => {
  try {
    await Hero.create(req.body);
  } catch (err) {
    console.log(err);

    return res.status(400).send("error 400");
  }
  res.status(201).json({
    message: "hero added ! ",
    description: req.body,
  });
});

// ------ HEROES NAME ------- \\

app.get("/heroes/:name", async (req, res) => {
  let heroes;

  try {
    heroes = await Hero.find(req.params);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error 400");
  }

  res.json(heroes);
});

app.delete("/heroes/:name", async (req, res) => {
  try {
    await Hero.findOneAndDelete(req.params.name);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error 400");
  }

  res.send("Hero deleted");
});

// ------ HEROES POWER ------- \\

app.get("/heroes/:name/powers", async (req, res) => {
  let powers;

  try {
    powers = await Hero.find(req.params).select("power");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error 400");
  }
  powers = powers[0].power;

  res.json(powers);
});

app.patch("/heroes/:name/powers", async (req, res) => {
  let powers;

  try {
    powers = await Hero.find(req.params).select("power");
    powers = powers[0].power;
    powers.push(req.body.power);
    console.log(powers);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error 400");
  }

  try {
    await Hero.updateOne(
      { name: req.params.name },
      {
        power: powers,
      }
    ).select("power");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error 400");
  }

  res.json(powers);
});

// ------ * ------- \\

app.get("*", (_req, res) => {
  res.status(404).send("Page not found");
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});

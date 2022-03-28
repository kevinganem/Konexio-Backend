// EXPRESS - MONGOOSE - CORS
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
// AUTH
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// MODELS
const User = require("./models/userModel.js");

const secret = "5aJif0OZjepB63NRwyNSkk0czzttHKjXNQbEImrW";

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// MOMNGODB
mongoose
  .connect(
    "mongodb+srv://Konexio-root-kevinganem:root@cluster0.18asb.mongodb.net/Konexio?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

// ROUTES
app.post("/signup", async (req, res) => {
  if (req.body.password.length < 8) {
    return res.status(400).json({
      message: "Invalid data",
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  try {
    await User.create({
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      surname: req.body.surname,
      dateOfBirth: req.body.dateOfBirth,
    });
  } catch (err) {
    return res.status(400).json({
      message: "This account already exists",
    });
  }

  res.status(201).json({
    message: `User ${req.body.email} created`,
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign({ id: user._id }, secret);

  res.cookie("jwt", token, { httpOnly: true, secure: false });

  res.json({
    message: "Here is your cookie",
  });
});

app.get("/admin", (req, res) => {
  let data;
  try {
    data = jwt.verify(req.cookies.jwt, secret);
  } catch (err) {
    return res.status(401).json({
      message: "Your token is not valid",
    });
  }

  console.log(data);

  res.json({
    message: "request accepted",
    data,
  });
});

// START SERVER
app.listen(8000, () => {
  console.log("Listening");
});

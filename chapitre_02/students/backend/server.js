const express = require("express");
const app = express();
app.use(express.json());

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use((req, res, next) => {
  console.log("Request received");
  next();
});

const students = [];

app.get("/students", (req, res) => {
  res.send(students);
});

app.post("/students", (req, res) => {
  students.push({
    name: req.body.name,
  });
  res.send(students);
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});

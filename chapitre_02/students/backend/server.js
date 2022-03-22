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

app.get("/students", async (_req, res) => {
  let students;

  try {
    students = await Postgres.query("SELECT * FROM students");
  } catch (err) {
    console.log(err);
    return res.send("Error");
  }

  res.json(students.rows);
});

app.post("/students", (req, res) => {
  try {
    await Postgres.query("INSERT INTO students(name) VALUES($1)", [
      req.body.name,
    ]);
  } catch (err) {
    console.log(err);
    return res.send("Error");
  }
  console.log(req.body.name);
  res.json({
    message: `Student ${req.body.name} added !`,
    studentsList: students,
  });
});

app.get("*", (_req, res) => {
  res.status(404).send("Page not found");
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});

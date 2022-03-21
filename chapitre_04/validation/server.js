const express = require("express");
const app = express();

// ------ MIDDLEWARE ------- \\
app.use((req, res, next) => {
  console.log("Request received");
  next();
});

// ----- ROUTER ----- \\
const usersRouter = require("./routers/usersRouter");

app.use(express.json());
app.use(usersRouter);

// ------ * ------ \\

app.use("*", (err, req, res, next) => {
  res.send("❌ error ❌");
});

app.listen(8000, () => console.log("Listening..."));

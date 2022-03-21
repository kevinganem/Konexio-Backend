const express = require("express");
const router = express.Router();
const Joi = require("Joi");

const schema = Joi.object({
  username: Joi.string().min(4).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "fr"] },
    })
    .required(),
  age: Joi.number().min(10).required(),
  city: Joi.string().required(),
});

const users = [
  {
    username: "Kevin",
    email: "ganemkevin@gmail.com",
    age: 30,
    city: "Paris",
  },
];

// ----- ROUTES ----- \\
router.get("/", (req, res) => {
  res.json(users);
});

router.get("/users/:username", (req, res) => {
  const username = users.find((user) => {
    return (
      req.params.username.toLocaleLowerCase() ===
      user.username.toLocaleLowerCase()
    );
  });

  if (!username) {
    return res.json({
      message: "This user does not exist",
    });
  }
  res.json(username);
});

router.get("/users/email/:email", (req, res) => {
  const email = users.find((user) => {
    return (
      req.params.email.toLocaleLowerCase() === user.email.toLocaleLowerCase()
    );
  });

  if (!email) {
    return res.json({
      message: "This email address does not exist",
    });
  }
  res.json(email);
});

router.get("/users/id/:id", (req, res) => {
  const id = users[req.params.id - 1];

  if (!id) {
    return res.json({
      message: "This ID does not exist",
    });
  }
  res.json(id);
});

router.post("/users", (req, res) => {
  const user = req.body;

  const validationResult = schema.validate(user);

  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details[0].message,
    });
  }

  users.push(user);

  res.json({
    message: "User added",
    users,
  });
});

module.exports = router;

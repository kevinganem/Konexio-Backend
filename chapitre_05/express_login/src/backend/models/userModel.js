const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  firstName: String,
  surname: String,
  dateOfBirth: Date,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

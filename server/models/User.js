const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userLogin = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
});

const Login = mongoose.model("Login", userLogin);

module.exports = Login;

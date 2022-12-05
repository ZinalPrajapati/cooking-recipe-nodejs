const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "This field is required",
  },
  email: {
    type: String,
    required: "This field is required",
  },
  password: {
    type: String,
    required: "This field is required",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);

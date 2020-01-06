const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    match: /\S+@\S+\.\S+/
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", schema);

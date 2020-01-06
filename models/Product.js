const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 1
  },
  quantity: {
    type: Number,
    required: true,
    min: 2
  },
  imgUrl: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Product", schema);

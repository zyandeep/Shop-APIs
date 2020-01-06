const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: "{PATH} can't be empty: {VALUE}"
    }
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("Order", schema);

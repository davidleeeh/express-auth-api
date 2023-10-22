const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  inventory: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Product", productSchema);

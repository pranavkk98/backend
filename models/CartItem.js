const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productStyle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductStyles",
    required: true,
  },
  productSize: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductSize",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("CartItem", cartItemSchema);

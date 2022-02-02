const mongoose = require("mongoose");

const productSizeSchema = new mongoose.Schema({
  size: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  productStyle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductStyles",
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  lastUpdated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("ProductSize", productSizeSchema);

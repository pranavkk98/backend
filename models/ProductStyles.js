const mongoose = require("mongoose");

const productStylesSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  images: [
    {
      imageUrl: {
        type: String,
        required: true,
        default:
          "https://cdn0.iconfinder.com/data/icons/cosmo-layout/40/box-512.png",
      },
      publicId: {
        type: String,
        required: true,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },

  designerName: {
    type: String,
  },
  limitedEdition: {
    type: Boolean,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  sizes: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductSize" }],
  created: {
    type: Date,
    default: Date.now(),
  },
  lastUpdated: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("ProductStyles", productStylesSchema);

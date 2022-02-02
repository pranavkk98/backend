const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default:
      "https://www.sitepronews.com/wp-content/uploads/2014/02/logo-icon.png",
  },
  imagePublicId: {
    type: String,
    default: "default-img",
  },
  description: {
    type: String,
    required: true,
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
module.exports = mongoose.model("Brand", brandSchema);

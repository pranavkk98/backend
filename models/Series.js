const mongoose = require("mongoose");
const seriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://www.sitepronews.com/wp-content/uploads/2014/02/logo-icon.png",
  },
  imagePublicId: {
    type: String,
  },
  description: {
    type: String,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
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

module.exports = mongoose.model("Series", seriesSchema);

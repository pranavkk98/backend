const mongoose = require("mongoose");

const deliverySpeedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  speed: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  partner: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  lastUpdate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model(
  "Delivery",
  deliverySpeedSchema,
  "deliverySpeeds"
);

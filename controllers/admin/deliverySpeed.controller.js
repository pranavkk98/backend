const DeliverySpeed = require("../../models/DeliverySpeed");
const { validationResult } = require("express-validator");

const addDeliverySpeed = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, speed, price, partner } = req.body;
    await DeliverySpeed.create({ name, speed, price, partner });
    res.status(200).json({ info: "Delivery Speed Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

module.exports = {
  addDeliverySpeed,
};

const { validationResult } = require("express-validator");
const Product = require("../../models/Product");
const ProductSize = require("../../models/ProductSize");
const ProductStyle = require("../../models/ProductStyles");

const addProductSize = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { size, quantity, productId, productStyleId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ errors: [{ msg: "Invalid Product Id" }] });
    }
    const productStyle = await ProductStyle.findById(productStyleId);
    if (!productStyle) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid ProductStyle Id" }] });
    }

    let productSize = {
      size,
      quantity,
      product: productId,
      productStyle: productStyleId,
    };
    let productSizeToAdd = new ProductSize(productSize);
    await productSizeToAdd.save();
    res.status(200).json({ info: "Product Size Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

module.exports = {
  addProductSize,
};

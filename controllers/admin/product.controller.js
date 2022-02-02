const Product = require("../../models/Product");
const { validationResult } = require("express-validator");
const Brand = require("../../models/Brand");
const Series = require("../../models/Series");

const addProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, description, brandId, seriesId } = req.body;
    const brand = await Brand.findById(brandId);
    if (!brand) {
      return res.status(404).json({ errors: [{ msg: "Invalid Brand ID" }] });
    }
    const series = await Series.findById(seriesId);
    if (!series) {
      return res.status(404).json({ errors: [{ msg: "Invalid series ID" }] });
    }
    const product = {
      name,
      description,
      brand: brandId,
      series: seriesId,
      productStyles: [],
    };

    const productToSave = new Product(product);
    await productToSave.save();
    res.status(200).json({ info: "Product Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

const updateProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Complete the rest
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Complete the rest
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

module.exports = { addProduct, updateProduct, deleteProduct };

const { validationResult } = require("express-validator");
const { streamUpload, fileDelete } = require("../../utils/cloudFiles");
const Brand = require("../../models/Brand");
const addBrand = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, description } = req.body;
    let brand = { name, description };
    if (req.file) {
      let upload = await streamUpload(req.file.buffer, "sneakerFreaker");

      brand.image = upload.secure_url;
      brand.imagePublicId = upload.public_id;
    }
    let brandtoAdd = new Brand(brand);
    await brandtoAdd.save();
    res.status(200).json({ info: "Brand Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

const updateBrand = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const brandId = req.params.id;
    const { name, description } = req.body;
    const brand = await Brand.findById(brandId);
    if (!brand) {
      return res.status(404).json({ errors: [{ msg: "Invalid Brand ID" }] });
    }
    brand.name = name;
    brand.description = description;
    if (req.file) {
      let upload = await streamUpload(req.file.buffer, "sneakerFreaker");
      brand.image = upload.secure_url;
      if (brand.imagePublicId !== "default-img") {
        await fileDelete(brand.imagePublicId);
      }
      brand.imagePublicId = upload.public_id;
    }
    await brand.save();
    res.status(200).json({ info: "Brand Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const brandId = req.params.id;
    const brand = await Brand.findByIdAndDelete(brandId);
    if (!brand) {
      return res.status(404).json({ errors: [{ msg: "Invalid Brand ID" }] });
    }
    await fileDelete(brand.imagePublicId);
    res.status(200).json({ info: "Brand Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

module.exports = {
  addBrand,
  updateBrand,
  deleteBrand,
};

const Product = require("../../models/Product");
const { validationResult } = require("express-validator");
const { streamUpload } = require("../../utils/cloudFiles");
const ProductStyles = require("../../models/ProductStyles");

const addProductStyle = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      color,
      price,
      discountPrice,
      limitedEdition,
      designerName,
      productId,
    } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ errors: [{ msg: "Invalid Product Id" }] });
    }
    let productStyle = {
      color,
      price,
      discountPrice,
      limitedEdition,
      designerName,
      product: productId,
    };
    if (req.files.length > 0) {
      let uploadImg = await Promise.all(
        req.files.map((img) => streamUpload(img.buffer, "sneakerFreaker"))
        // [streamUpload(b1,"sneakerFreaker"),streamUpload(b2,"sneakerFreaker"),streamUpload(b1,"sneakerFreaker")]
      );
      productStyle.images = uploadImg.map((res) => ({
        imageUrl: res.secure_url,
        publicId: res.public_id,
      }));
    }
    let productStyleToSave = new ProductStyles(productStyle);
    await productStyleToSave.save();
    product.productStyles.push(productStyleToSave._id);
    await product.save();
    res.status(200).json({ info: "Product Style Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

module.exports = { addProductStyle };

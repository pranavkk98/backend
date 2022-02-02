const { validationResult } = require("express-validator");
const ProductSize = require("../models/ProductSize");
const CartItem = require("../models/CartItem");
const Cart = require("../models/Cart");
const addItemToCart = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { item, quantity } = req.body;
    const pSize = await ProductSize.findById(item).populate("productStyle");
    if (!pSize || !pSize.productStyle) {
      return res.status(400).json({ errors: [{ msg: "Invalid Product" }] });
    }
    if (quantity > pSize.quantity) {
      return res.status(400).json({
        errors: [
          {
            msg: `Number of Items Exceeding Stock , Stock Left : ${pSize.quantity} `,
          },
        ],
      });
    }
    let cartItem = {
      productSize: pSize._id,
      product: pSize.product,
      productStyle: pSize.productStyle,
      quantity,
    };
    let cartItemToSave = new CartItem(cartItem);
    await cartItemToSave.save();
    let userCart = await Cart.findOne({ user: req.user._id });
    if (!userCart) {
      return res.status(400).json({
        errors: [
          {
            msg: "Please contact the admin . Some Issue with cart",
          },
        ],
      });
    }
    userCart.cartItems.push(cartItemToSave._id);
    await userCart.save();
    res.status(200).json({ info: "Item Added to Cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

module.exports = { addItemToCart };

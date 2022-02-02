const { validationResult } = require("express-validator");
const DeliverySpeed = require("../models/DeliverySpeed");
const Razorpay = require("razorpay");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { rzpKeyId, rzpKeySecret } = require("../config/keys");
const generateOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const myCart = await Cart.findOne({ user: req.user._id }).populate({
      path: "cartItems",
      populate: { path: "productStyle" },
    });
    // .populate("productStyle");

    const { addressId, deliverySpeedId } = req.body;
    let orderTotal = myCart.cartItems.reduce((acc, cur) => {
      return acc + cur.productStyle.discountPrice * cur.quantity;
    }, 0);
    const delivery = await DeliverySpeed.findById(deliverySpeedId);
    if (!delivery) {
      return res.status(400).json({
        errors: [
          {
            msg: "Delivery Speed Doesnt Exist",
          },
        ],
      });
    }
    orderTotal += delivery.price;
    const items = myCart.cartItems.map((ele) => {
      return {
        product: ele.product,
        productStyle: ele.productStyle._id,
        productSize: ele.productSize,
        quantity: ele.quantity,
        amount: ele.quantity * ele.productStyle.discountPrice,
      };
    });
    const generatedOrder = new Order({
      user: req.user._id,
      items,
      address: addressId,
      deliverySpeed: deliverySpeedId,
      orderTotal,
    });
    await generatedOrder.save();

    res.status(200).json({ info: "Order Generated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

const paymentOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        errors: [
          {
            msg: "Order Doesnt Exists",
          },
        ],
      });
    }
    /*
    Check the last updated Property , and the current time , If difference is more that 5 mins , Delete the order from the DB and Show the user an error message : "Time Exceeded to fulfill Order , Please Checkout again"
    */
    const rzp = new Razorpay({
      key_id: rzpKeyId,
      key_secret: rzpKeySecret,
    });

    let options = {
      amount: order.orderTotal * 100,
      currency: "INR",
      receipt: id,
    };
    const rzpOrder = await rzp.orders.create(options);
    order.rzpOrderId = rzpOrder.id;
    await order.save();
    return res.status(200).json({
      info: {
        key_id: rzpKeyId,
        id: rzpOrder.id,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

const captureOrder = async (req, res) => {
  try {
    const { order_id } = req.body.payload.payment.entity;
    let order = await Order.findOne({ rzpOrderId: order_id });
    if (!order) {
      //
      // Alert Admin About this
      // console.log("Admin Please check this")
      // return res.status(200).json({ status: "Ok" });
    }
    if (req.body.event === "payment.captured") {
      order.paymentStatus = "PAYMENT_SUCCESS";
    } else if (req.body.event === "payment.failed") {
      order.paymentStatus = "PAYMENT_FAILED";
    }
    order.paymentData = req.body;
    await order.save();
    return res.status(200).json({ status: "Ok" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

module.exports = { generateOrder, paymentOrder, captureOrder };

const express = require("express");
const router = express.Router();
const brandRouter = require("./brand.route");
const seriesRouter = require("./seriers.route");
const productRouter = require("./product.route");
const productStyleRouter = require("./productStyle.route");
const productSizeRouter = require("./productSize.route");
const deliverySpeedRouter = require("./deliverySpeed.route");

router.use("/brand", brandRouter);
router.use("/series", seriesRouter);
router.use("/products", productRouter);
router.use("/productsStyle", productStyleRouter);
router.use("/productsSize", productSizeRouter);
router.use("/deliverySpeed", deliverySpeedRouter);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getAllBrands,
  getAllSeries,
} = require("../controllers/public.controller");

router.get("/brands", getAllBrands);

router.get("/series", getAllSeries);

module.exports = router;

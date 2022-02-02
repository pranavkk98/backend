const Brand = require("../models/Brand");
const Series = require("../models/Series");

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({});
    res.status(200).json({ info: brands });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

const getAllSeries = async (req, res) => {
  try {
    const series = await Series.find({});
    res.status(200).json({ info: series });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

module.exports = { getAllBrands, getAllSeries };

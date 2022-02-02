const { validationResult } = require("express-validator");
const { streamUpload, fileDelete } = require("../../utils/cloudFiles");
const Brand = require("../../models/Brand");
const Series = require("../../models/Series");

const addSeries = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, description, brandId } = req.body;
    const brand = await Brand.findById(brandId);
    if (!brand) {
      return res.status(400).json({ errors: [{ msg: "Brand Doest Exists" }] });
    }
    let series = { name, description, brand: brandId };
    if (req.file) {
      let upload = await streamUpload(req.file.buffer, "sneakerFreaker");

      series.image = upload.secure_url;
      series.imagePublicId = upload.public_id;
    }
    let seriestoAdd = new Series(series);
    await seriestoAdd.save();
    res.status(200).json({ info: "Series Added" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

const updateSeries = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const seriesId = req.params.id;
    const { name, description, brandId } = req.body;
    const brand = await Brand.findById(brandId);
    if (!brand) {
      return res.status(404).json({ errors: [{ msg: "Invalid Brand ID" }] });
    }
    const series = await Series.findById(seriesId);
    if (!series) {
      return res.status(404).json({ errors: [{ msg: "Invalid series ID" }] });
    }
    series.name = name;
    series.description = description;
    if (req.file) {
      let upload = await streamUpload(req.file.buffer, "sneakerFreaker");
      series.image = upload.secure_url;
      if (series.imagePublicId !== "default-img") {
        await fileDelete(series.imagePublicId);
      }
      series.imagePublicId = upload.public_id;
    }
    await series.save();
    res.status(200).json({ info: "Brand Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

const deleteSeries = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const seriesId = req.params.id;
    const series = await Series.findByIdAndDelete(seriesId);
    if (!series) {
      return res.status(404).json({ errors: [{ msg: "Invalid Series ID" }] });
    }
    await fileDelete(series.imagePublicId);
    res.status(200).json({ info: "Series Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

module.exports = {
  addSeries,
  updateSeries,
  deleteSeries,
};

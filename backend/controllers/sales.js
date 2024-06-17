const Sales = require("../models/sales");
const asyncHandler = require("../middleware/asyncHandler");

exports.getSales = asyncHandler(async (req, res, next) => {
  const data = await Sales.find();
  res.status(200).send({ data });
});

exports.createRecord = asyncHandler(async (req, res, next) => {
  const data = await Sales.create({ ...req.body, seller: req.user._id });
  res.status(201).send({ data });
});

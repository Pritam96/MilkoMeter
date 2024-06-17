const Milk = require("../models/milk");
const asyncHandler = require("../middleware/asyncHandler");

exports.getAll = asyncHandler(async (req, res, next) => {
  const data = await Milk.find();
  res.status(200).send({ data });
});

exports.createRecord = asyncHandler(async (req, res, next) => {
  const data = await Milk.create({ ...req.body, seller: req.user._id });
  res.status(201).send({ data });
});

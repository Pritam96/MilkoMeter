const Customer = require("../models/customer");
const asyncHandler = require("express-async-handler");

exports.getCustomers = asyncHandler(async (req, res, next) => {
  const customers = await Customer.find();
  res.status(200).send({ customers });
});

exports.createCustomer = asyncHandler(async (req, res, next) => {
  const data = req.body;

  const customer = await Customer.create({ ...data, seller: req.user._id });
  res.status(201).send({ customer });
});

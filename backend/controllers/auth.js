const User = require("../models/user");
const asyncHandler = require("express-async-handler");

exports.register = asyncHandler(async (req, res, next) => {
  const data = req.body;

  const user = await User.create(data);
  sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const data = req.body;

  const user = await User.findOne({ email: data.email }).select("+password");
  if (!user) {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
  const isMatch = await user.matchPassword(data.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
  sendTokenResponse(user, 200, res);
});

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
  res.status(200).json({ user });
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    data: {},
  });
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    isSeller: user.isSeller,
    token: token,
  });
};

const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    trim: true,
    minlength: [
      5,
      "Username must be at least 5 characters with a max of 32 characters",
    ],
    maxlength: [
      32,
      "Username must be at least 5 characters with a max of 32 characters",
    ],
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  phone: {
    type: String,
    maxlength: [20, "Phone number can not be longer than 20 characters"],
  },
  defaultQuantity: {
    type: Number,
    required: true,
  },
  defaultRate: {
    type: Number,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //   password: {
  //     type: String,
  //     required: [true, "Please provide a password"],
  //     trim: true,
  //     minlength: [
  //       6,
  //       "Password must be at least 6 characters with a max of 32 characters",
  //     ],
  //     maxlength: [
  //       32,
  //       "Password must be at least 6 characters with a max of 32 characters",
  //     ],
  //     select: false,
  //   },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);

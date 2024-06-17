const mongoose = require("mongoose");

const MilkSchema = mongoose.Schema({
  milkType: {
    type: String,
    enum: ["Cow", "Buffalo"],
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Milk", MilkSchema);

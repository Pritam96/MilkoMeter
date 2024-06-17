const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
      required: true,
    },
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    milk: {
      type: mongoose.Schema.ObjectId,
      ref: "Milk",
      required: true,
    },
    rate: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

SalesSchema.pre("save", async function (next) {
  try {
    // Fetch customer details if rate or quantity is not provided
    let customer;
    if (!this.rate || !this.quantity) {
      customer = await this.model("Customer").findById(this.customer);
    }

    // If rate is not provided, determine the rate
    if (!this.rate) {
      if (customer && customer.defaultRate) {
        this.rate = customer.defaultRate;
      } else {
        const milk = await this.model("Milk")
          .findById(this.milk)
          .select("rate");
        if (milk) {
          this.rate = milk.rate;
        }
      }
    }

    // If quantity is not provided, set default quantity if available
    if (!this.quantity && customer && customer.defaultQuantity) {
      this.quantity = customer.defaultQuantity;
    }

    // Ensure quantity has a default value if still not set
    if (!this.quantity) {
      this.quantity = 1;
    }

    // Update totalPrice based on rate and quantity
    this.totalPrice = this.rate * this.quantity;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Sales", SalesSchema);

const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
    unique: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  discount: {
    type: Number, // Store the discount as a percentage (e.g., 10 for 10%)
    required: true,
    min: 1,
    max: 100,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Coupons", couponSchema);

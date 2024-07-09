const mongoose = require('mongoose');

const orderSchame = new mongoose.Schema({
  userId: String,
  cardId: String,
  userInfo: {
    fullName: String,
    phone: String,
    address: String
  },
  products: [
    {
      productId: String,
      price: Number,
      discountPercentage: Number,
      quantity: Number
    }
  ],
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, { timestamps: true});

const Order = mongoose.model("Order", orderSchame, "orders");

module.exports = Order;

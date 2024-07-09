const mongoose = require('mongoose');

const cartSchame = new mongoose.Schema({
  userId: String,
  product: [
    {
      productId: String,
      quantity: Number
    }
  ]
}, { timestamps: true});

const Cart = mongoose.model("Cart", cartSchame, "carts");

module.exports = Cart;

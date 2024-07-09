const Cart = require('../../models/cart.model');

module.exports.cart = async (req, res, next) => {  
  if(!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();
    const expires = 365 * 24 * 60 * 60 * 1000;
    res.cookie("cartId", cart.id, { expires: new Date(Date.now() + expires)});
  } else {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({ _id: cartId});

    cart.totalQuantity = cart.product.reduce((sum, item) => sum + item.quantity, 0);

    res.locals.miniCart = cart;
  }
  next();
};
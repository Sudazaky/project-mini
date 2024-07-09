const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');
const productHelpers = require('../../helpers/product');

// [GET] /cart
module.exports.index = async (req, res) => {
  const cart = await Cart.findOne({ _id: req.cookies.cartId });

  if (cart.product.length > 0) {
    for (const item of cart.product) {
      const product = await Product.findOne({ _id: item.productId }).select("thumbnail title price discountPercentage stock slug");

      product.priceNew = productHelpers.priceNewProduct(product);

      item.productInfo = product;

      item.totalPrice = product.priceNew * item.quantity;
    }

    cart.totalPrice = cart.product.reduce((sum, item) => sum + item.totalPrice, 0);

  }
  res.render('client/pages/cart/index', {
    pageTitle: "Giỏ hàng",
    cartDetail: cart
  });
};


// [POST] /cart/add/:productId
module.exports.cartPost = async (req, res) => {
  // console.log(req.params.productId);
  // console.log(req.cookies.cartId);
  // console.log(req.body.quantity);

  const cart = await Cart.findOne({ _id: req.cookies.cartId });
  const existProductInCart = cart.product.find(item => item.productId == req.params.productId);

  if (existProductInCart) {
    const newQuantity = parseInt(req.body.quantity) + existProductInCart.quantity;
    // Mongoose, update values in array of objects
    await Cart.updateOne({
      _id: req.cookies.cartId,
      'product.productId': req.params.productId
    }, {
      $set: {
        'product.$.quantity': newQuantity
      }
    })
  } else {
    const objectCart = {
      productId: req.params.productId,
      quantity: parseInt(req.body.quantity)
    }
    await Cart.updateOne(
      {
        _id: req.cookies.cartId
      },
      {
        $push: { product: objectCart }
      });
  }
  res.redirect('back');
};

// [GET] /cart/delete/:productId
module.exports.delete = async (req, res) => {
  await Cart.updateOne(
    { _id: req.cookies.cartId },
    {
      $pull: { product: { productId: req.params.productId } }
    }
  );
  res.redirect('back');
};

// [GET] /cart/update/:productId/:quantity
module.exports.update = async (req, res) => {
  // console.log(req.params.productId);
  // console.log(req.params.quantity);

  await Cart.updateOne({
    _id: req.cookies.cartId,
    'product.productId': req.params.productId
  }, {
    $set: {
      'product.$.quantity': req.params.quantity
    }
  })

  res.redirect('back');
};
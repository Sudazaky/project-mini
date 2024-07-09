const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');
const Order = require('../../models/order.model');
const productHelpers = require('../../helpers/product');

// [GET] /checkout
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
  res.render("client/pages/checkout/index", {
    pageTitle: "Thanh toán",
    cartDetail: cart
  });
};

// [POST] /checkout/order
module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfo = req.body;

  const products = [];

  const cart = await Cart.findOne({ _id: cartId });

  for(const productInfo of cart.product) {
    const objectProduct = {
      productId: productInfo.productId,
      price: 0,
      discountPercentage: 0,
      quantity: productInfo.quantity
    };
    const product = await Product.findOne({ _id: objectProduct.productId }).select("price discountPercentage");
    objectProduct.price = product.price;
    objectProduct.discountPercentage = product.discountPercentage;
    products.push(objectProduct);
  }
  
  const orderInfo = {
    cartId: cartId,
    userInfo: userInfo,
    products: products
  }

  const order = new Order(orderInfo);
  order.save();

  await Cart.updateOne({ _id: cartId}, {product: []});

  res.redirect(`/checkout/success/${order.id}`);;
};

// [GET] /checkout/success/:orderId
module.exports.success = async (req, res) => {
  try {
    const order =  await Order.findOne({ _id: req.params.orderId });

    for(const product of order.products) {
      const productInfo = await Product.findOne({ _id: product.productId}).select("thumbnail title");
      product.productInfo = productInfo;

      product.priceNew = productHelpers.priceNewProduct(product);

      product.totalPrice = product.priceNew * product.quantity;

    }

    order.totalPrice = order.products.reduce((sum, item) =>  sum + item.totalPrice, 0);
    // console.log(order);

    res.render("client/pages/checkout/success", {
      pageTitle: "Đặt hàng thành công",
      orderDetail: order
    })
  } catch (error) {
    res.redirect('back')
  } 
};
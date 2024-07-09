const productRoutes = require('./product.route');
const homeRoutes = require('./home.route');
const searchRoute = require('./search.route');
const cartRoute = require('./cart.route');
const checkoutRoute = require('./checkout.route');
const userRoute = require('./user.route');

const categoryMiddleware = require('../../middleware/client/category.middleware');
const cartMiddleware = require('../../middleware/client/cart.middleware');
const userMiddleware = require('../../middleware/client/user.middleware');

module.exports = (app) => {
  app.use(categoryMiddleware.categoy);
  app.use(cartMiddleware.cart);
  app.use(userMiddleware.requireUser);

  app.use('/', homeRoutes);
  
  app.use("/products", productRoutes);

  app.use("/search", searchRoute);

  app.use("/cart", cartRoute);

  app.use("/checkout", checkoutRoute);

  app.use("/user", userRoute);
}
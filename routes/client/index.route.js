const productRoutes = require('./product.route');
const homeRoutes = require('./home.route');
const searchRoute = require('./search.route');
const cartRoute = require('./cart.route');
const checkoutRoute = require('./checkout.route');
const userRoute = require('./user.route');
const chatRoute = require('./chat.route');

const categoryMiddleware = require('../../middleware/client/category.middleware');
const cartMiddleware = require('../../middleware/client/cart.middleware');
const userMiddleware = require('../../middleware/client/user.middleware');
const settingGeneralMiddleware = require ('../../middleware/admin/setting.middleware');
const authMiddelware = require('../../middleware/client/auth.middleware');

module.exports = (app) => {
  app.use(categoryMiddleware.categoy);
  app.use(cartMiddleware.cart);
  app.use(userMiddleware.requireUser);
  app.use(settingGeneralMiddleware.settingGeneral);

  app.use('/', homeRoutes);
  
  app.use("/products", productRoutes);

  app.use("/search", searchRoute);

  app.use("/cart", cartRoute);

  app.use("/checkout", checkoutRoute);

  app.use("/user", userRoute);

  app.use("/chat", authMiddelware.requireAuth, chatRoute);
}
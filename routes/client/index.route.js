const productRoutes = require('./product.route');
const homeRoutes = require('./home.route');
const categoryMiddleware = require('../../middleware/client/category.middleware');

module.exports = (app) => {
  app.use(categoryMiddleware.categoy);

  app.use('/', homeRoutes);
  
  app.use("/products", productRoutes);
}
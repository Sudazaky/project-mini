const dashboardRoute = require('./dashboard.route');
const productRoute = require('./product.route');
const productCategory = require('./product-category.route');
const rolesRoute = require('./role.route');
const accountRoute = require('./account.route');
const authRoute = require('./auth.route');
const myAccountRoute = require('./my-account.route');


const authMiddleware = require('../../middleware/admin/auth.middleware');

const systemConfig = require('../../config/system');

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(`/${PATH_ADMIN}/dashboard`, authMiddleware.requireAuth, dashboardRoute);

  app.use(`/${PATH_ADMIN}/products`, authMiddleware.requireAuth, productRoute);

  app.use(`/${PATH_ADMIN}/products-category`, authMiddleware.requireAuth, productCategory);

  app.use(`/${PATH_ADMIN}/roles`, authMiddleware.requireAuth, rolesRoute);

  app.use(`/${PATH_ADMIN}/accounts`, authMiddleware.requireAuth, accountRoute);

  app.use(`/${PATH_ADMIN}/auth`, authRoute);

  app.use(`/${PATH_ADMIN}/my-account`, authMiddleware.requireAuth, myAccountRoute);
  
}
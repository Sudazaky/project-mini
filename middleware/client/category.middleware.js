const ProductCategory = require('../../models/product-category.model');
const createTreeHelper = require('../../helpers/createTree');

module.exports.categoy = async (req, res, next) => {
  const productCategory = await ProductCategory.find({ deleted: false });
  const newProductCategory = createTreeHelper.tree(productCategory);
  res.locals.layoutProductsCategory = newProductCategory
  next();
};
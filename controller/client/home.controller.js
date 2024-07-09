const Product = require('../../models/product.model');
const productHelpers = require('../../helpers/product');

// [GET] /
module.exports.index =  async (req, res) => {
  const productsFeatured = await Product.find({
    featured: "1",
    status: "active",
    deleted: false
  });

  const newProductsFeatured = productHelpers.priceNewProducts(productsFeatured);

  const ProductsNew = await Product.find({
    status: "active",
    deleted: false
  }).sort({position: "desc"}).limit(6);

  const newProductsNew = productHelpers.priceNewProducts(ProductsNew);

  // console.log(newProductsNew);

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productsFeatured: newProductsFeatured,
    productsNew: newProductsNew
  });
}
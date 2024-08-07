const Product = require('../../models/product.model');
const ProductCategory = require('../../models/product-category.model');
const productHelpers = require('../../helpers/product');
const getSubCategoryHelpers = require('../../helpers/getSubCategory');

// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false
  }).sort({position:"desc"});
  // console.log(products);

  const newProducts = productHelpers.priceNewProducts(products);
  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: newProducts
  });
};

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  // console.log(req.params.slugCategory);
  const category = await ProductCategory.findOne({
    slug: req.params.slugCategory,
    deleted: false
  });
  
  // const getSubCategory = async (parentId) => {
  //   const subs = await ProductCategory.find({
  //     deleted: false,
  //     status: "active",
  //     parent_id: parentId
  //   });

  //   let allSub = [...subs];

  //   for(const sub of subs) {
  //     const childs = await getSubCategory(sub.id);
  //     allSub = allSub.concat(childs);
  //   }

  //   return allSub
  // };

  // const listSubCategory = await getSubCategory(category.id);

  const listSubCategory = await getSubCategoryHelpers.getSubCategory(category.id);

  const listSubCategoryId = listSubCategory.map(item => item.id)

  const products = await Product.find({
    product_category_id: { $in : [category.id, ...listSubCategoryId]},
    deleted: false
  }).sort({ position: "desc" });

  const newProducts = productHelpers.priceNewProducts(products);

  res.render('client/pages/products/index', {
    pageTitle: category.title,
    products: newProducts
  })

};

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
  const find = {
    deleted: false,
    slug: req.params.slugProduct,
    status: "active"
  }
  try {
    const product = await Product.findOne(find);
    
    if(product.product_category_id) {
      const category = await ProductCategory.findOne( { 
        _id : product.product_category_id,
        deleted: false,
        status: "active"
      });
      product.category = category;
    }

    product.newPrice = productHelpers.priceNewProduct(product);

    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product
    });
  } catch (error) {
    res.redirect("/products");
  }
};
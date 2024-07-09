const Product = require('../../models/product.model');
const searchHelpers = require('../../helpers/search');

module.exports.index = async (req, res) => {
  if(req.query.keyword) {
    let find = {
      deleted: false,
      status: "active",
    }
    const ObjeactSearch = searchHelpers(req.query);
    find.title = ObjeactSearch.regex;
    const products = await Product.find(find);
    res.render('client/pages/search/index', {
      pageTitle: "Kết quả tìm kiếm",
      products: products
    });
  } else {
    res.redirect('back');
  }
};
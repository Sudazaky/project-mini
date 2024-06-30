const ProductCategory = require('../../models/product-category.model');
const systemConfig = require('../../config/system');
const createTreeHelpers = require('../../helpers/createTree');
const filterStatusHelpers = require('../../helpers/filterStatus');
const searchHelpers = require('../../helpers/search');

// [GET] admin/products-category
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  };

  const filterStatus = filterStatusHelpers(req.query);

  // Change Status
  if(req.query.status) {
    find.status = req.query.status;
  }
  // End Change Status
  const ObjeactSearch = searchHelpers(req.query);
  if(req.query.keyword) {
    find.title = ObjeactSearch.regex;
  }
  const records = await ProductCategory.find(find).sort({position: "desc"});
  const newRecords = createTreeHelpers.tree(records, "", req.query.status);
  res.render('./admin/pages/products-category/index', {
    pageTitle: "Danh mục sản phẩm", 
    records: req.query.keyword ? records : newRecords,
    filterStatus: filterStatus,
    keyword: ObjeactSearch.keyword
  });
};

// [GET] admin/products-category/create
module.exports.create = async (req, res) => {
  const find = {
    deleted: false
  }

  const records = await ProductCategory.find(find);
  const newRecords = createTreeHelpers.tree(records);
  // console.log(newRecords);
  res.render('./admin/pages/products-category/create', {
    pageTitle: "Tạo danh mục",
    records: newRecords
  });
};

// [POST] admin/products-category/create
module.exports.createPost = async (req, res) => {
  if(req.body.position == "") {
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const record = new ProductCategory(req.body);
  await record.save();
  // console.log(req.body);
  res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
};

// [GET] admin/products-category/edit:id
module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const data = await ProductCategory.findOne({_id : id, deleted: false});

  const records = await ProductCategory.find({deleted: false});
  const newRecords = createTreeHelpers.tree(records);

  res.render('./admin/pages/products-category/edit', {
    pageTitle: "Chỉnh sửa danh mục",
    data: data,
    records: newRecords
  });
};

// [PATCH] admin/products-category/edit:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position);
  
  await ProductCategory.updateOne({_id : id}, req.body);

  res.redirect('back');
};

// [DELETE] admin/products-category/delete:id
module.exports.delete = async (req, res) => {
  const id = req.params.id;

  await ProductCategory.updateOne({_id: id}, {deleted: true});

  res.redirect('back');
};

// [PATCH] admin/products-category/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  let status = req.params.status;
  const id = req.params.id;
  if(status === "active") {
    status = "inactive"
  } else {
    status = "active"
  }
  await ProductCategory.updateOne({_id: id}, {status: status});
  res.redirect('back');
};
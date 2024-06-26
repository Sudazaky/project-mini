const Product = require('../../models/product.model');
const ProductCategory = require('../../models/product-category.model');
const Account = require('../../models/account.model');
const filterStatusHelpers = require('../../helpers/filterStatus');
const searchHelpers = require('../../helpers/search');
const paginationHelpers = require('../../helpers/pagination');
const systemConfig = require('../../config/system');
const conveftDate = require('../../helpers/conveftDate');

const createTreeHelpers = require('../../helpers/createTree');

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // console.log(req.query.status);
  // console.log(req.query.keyword);

  const filterStatus = filterStatusHelpers(req.query);

  let find = {
    deleted: false
  }

  if (req.query.status) {
    find.status = req.query.status;
  }

  const ObjeactSearch = searchHelpers(req.query);

  if (req.query.keyword) {
    find.title = ObjeactSearch.regex;
  }
  // Pagination
  const countProducts = await Product.countDocuments(find);

  let objeactPagination = paginationHelpers({
    currentPage: 1,
    limitItems: 4
  }, req.query, countProducts);
  // End Pagination

  // Sort
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue
  } else {
    sort.position = "desc"
  }
  // End Sort
  // console.log(objeactPagination);
  const product = await Product.find(find).sort(sort).limit(objeactPagination.limitItems).skip(objeactPagination.skip);
  const productDeleted = await Product.find({ deleted: true }).sort({deletedAt: "desc"});

  for(const item of product) {
    const user = await Account.findOne({ _id: item.createdBy.account_id });
    if(user) {
      item.accountFullName = user.fullName
    }
  }

  for(const item of productDeleted) {
    const user = await Account.findOne({ _id: item.deletedBy.account_id });
    if(user) {
      item.accountFullName = user.fullName
    }
  }

  res.render('./admin/pages/products/index', {
    pageTitle: "Danh sách sản phẩm",
    products: product,
    filterStatus: filterStatus,
    keyword: ObjeactSearch.keyword,
    pagination: objeactPagination,
    productDeleted: productDeleted
  }
  );
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  // console.log(req.params);
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });
  req.flash('success', 'Cập nhập trạng thái thành công');
  res.redirect('back');
}

// [PATCH] /admin/products/change-mult
module.exports.changeMulti = async (req, res) => {
  // console.log(req.body);
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash('success', 'Cập nhập trạng thái thành công');
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash('success', 'Cập nhập trạng thái thành công');
      break;
    case "delete-all":
      await Product.updateMany({ _id: { $in: ids } }, {
        deleted: true,
        deletedAt: new Date()
      });
      req.flash('success', `Đã xoá ${ids.length} sản phẩm`);
      break;
    case "change-position":
      console.log(ids);
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);

        await Product.updateOne({ _id: id }, { position: position });
        req.flash('success', 'Cập nhập vị trí thành công');
      }
      break;
    default:
      break;
  }
  res.redirect('back');
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne({ _id: id }, {
    deleted: true,
    deletedBy: {
      account_id: res.locals.user.id,
      deletedAt: new Date()
    }
  });
  req.flash('success', 'Đã xoá thành công');
  res.redirect('back');
}

// [PATCH] /admin/products/restore/:id
module.exports.restoreItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne({ _id: id }, {
    deleted: false
  });
  req.flash('success', 'Khôi phục thành công');
  res.redirect('back');
}

// [GET] /admin/products/create
module.exports.createItem = async (req, res) => {
  const find = {
    deleted: false
  };
  const records = await ProductCategory.find(find);
  const newRecords = createTreeHelpers.tree(records, "", req.query.status);

  res.render('./admin/pages/products/create', {
    pageTitle: "Thêm mới sản phẩm",
    records: newRecords
  });
}

// [POST] /admin/products/create
module.exports.createItemPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  req.body.createdBy = {
    account_id: res.locals.user.id
  }
  // console.log(req.file);
  // if(req.file) {
  //   req.body.thumbnail = `http://localhost:3000/uploads/${req.file.filename}`; 
  // }
  const product = new Product(req.body);
  await product.save();
  req.flash('success', 'Tạo sản phẩm thành công');
  res.redirect(`/${systemConfig.prefixAdmin}/products`);
}

// [GET] /admin/edit/:id
module.exports.editItem = async (req, res) => {
  try {
    const records = await ProductCategory.find({ deleted: false });
    const newRecords = createTreeHelpers.tree(records, "", req.query.status);

    const id = req.params.id;
    const find = {
      deleted: false,
      _id: id
    }
    const product = await Product.findOne(find);
    res.render('./admin/pages/products/edit', {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
      records: newRecords
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
}

// [PATCH] /admin/edit/:id
module.exports.editItemPatch = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  // console.log({...req.body});

  // console.log(req.body);
  // if(req.file) {
  //   req.body.thumbnail = `http://localhost:3000/uploads/${req.file.filename}`; 
  // }
  updatedBy =  {
    account_id: res.locals.user.id,
    updatedAt: new Date()
  }

  try {
    await Product.updateOne({ _id: id }, {
      ...req.body,
      $push: {updatedBy: updatedBy}
    });
  } catch (error) {

  }
  res.redirect("back");
}

// [GET] /admin/detail/:id
module.exports.detailItem = async (req, res) => {
  const find = {
    deleted: false,
    _id: req.params.id
  }
  const product = await Product.findOne(find);
  if(product.updatedBy.length > 0) {
    const fullNameId = product.updatedBy.slice(-1)[0].account_id;
    if(fullNameId) {
      const account = await Account.findOne({_id: fullNameId});
      console.log(account);
      product.fullName = account.fullName
    }
  }
  console.log(product);
  // const objeactDate = {};
  // if (product.createdAt) {
  //   const date = conveftDate(product.createdAt);
  //   const updateDate = conveftDate(product.updatedAt);

  //   objeactDate.date = date.date;
  //   objeactDate.time = date.time;
  //   objeactDate.updateDate = updateDate.date;
  //   objeactDate.updateTime = updateDate.time;
  // }
  product.priceNew = (product.price * (100 - product.discountPercentage) / 100).toFixed(0);
  // console.log(objeactDate.time);
  res.render('./admin/pages/products/detail', {
    pageTitle: product.title,
    product: product,
    // objeactDate: objeactDate
  });
}
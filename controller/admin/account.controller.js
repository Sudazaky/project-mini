const Account = require('../../models/account.model');
const Role = require('../../models/role.model');
const md5 = require('md5');

const systemConfig = require('../../config/system');

// [GET] admin/accounts
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  }

  const roles = await Role.find({ deleted: false });
  const records = await Account.find(find).select("-password -token");
  res.render('./admin/pages/account/index', {
    pageTitle: "Danh sách tài khoản",
    records: records,
    roles: roles
  });
};

// [GET] admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({deleted: false});
  res.render('./admin/pages/account/create', {
    pageTitle: "Thêm tài khoản",
    roles: roles
  });
};

// [POST] admin/accounts/create
module.exports.createPost = async (req, res) => {
  const emailExist = await Account.findOne({ email: req.body.email, deleted: false });
  if(emailExist) {
    req.flash('error', 'Email đã tồn tại!');
    res.redirect('back');
  } else {
    req.body.password = md5(req.body.password);
    const records = new Account(req.body);
    records.save();
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
  }
};

// [GET] admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  const roles = await Role.find({deleted: false});
  const data = await Account.findOne({deleted: false, _id: req.params.id});
  data.password = "";
  res.render('./admin/pages/account/edit', {
    pageTitle: "Chỉnh sửa tài khoản",
    roles: roles,
    data: data
  });
};

// [PATCH] admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  const emailExist = await Account.findOne({ _id: {$ne: id}, email: req.body.email, deleted: false });
  if(emailExist) {
    req.flash('error', 'Email đã tồn tại!');
  } else {
    if(req.body.password !== "") {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
    await Account.updateOne({ _id: id }, req.body); 
  }
  res.redirect('back'); 
};
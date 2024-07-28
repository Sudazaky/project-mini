const Role = require('../../models/role.model');
const systemConfig = require('../../config/system');

// [GET] admin/roles
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  };

  const record = await Role.find(find);
  res.render("./admin/pages/roles/index", {
    pageTitle: "Nhóm quyền",
    record: record
  });
};

// [GET] admin/roles/create
module.exports.create = (req, res) => {
  res.render("./admin/pages/roles/create");
};

// [POST] admin/roles/create
module.exports.createPost = async (req, res) => {
  const role = new Role(req.body);
  await role.save();
  res.redirect(`/${systemConfig.prefixAdmin}/roles`);
};

// [GET] admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Role.findOne({_id: id, deleted: false});
    res.render("./admin/pages/roles/edit", {
      pageTitle: "Chỉnh sửa nhóm quyền",
      data: data
    });
  } catch(error) {
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
  }
};

// [PATCH] admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    await Roles.updateOne({_id : id}, req.body);
    res.redirect('back');
  } catch(error) {
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
  }
};

// [GET] admin/roles/permissions
module.exports.permissions =  async (req, res) => {
  const check = res.locals.role.permissions.includes("roles-permissions_view");
  if(check) {
    let find = {
    deleted: false
    };

    const records = await Role.find(find);
    res.render("./admin/pages/roles/permissions", {
      pageTitle: "Phân quyền",
      records: records
    });
  }
  else {
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
  }
};

// [PATCH] admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  const permissions = JSON.parse(req.body.permissions);
  for(const item of permissions) {
    await Role.updateOne({ _id: item.id }, {permissions: item.permissions});
  }
  res.redirect('back');
};
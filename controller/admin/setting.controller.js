const SettingGeneral = require('../../models/settings-general.model');
const systemConfig = require('../../config/system');
// [GET] /admin/settings/general
module.exports.general = async (req, res) => {
  const check = res.locals.role.permissions.includes("settings-general_view");
  if(check) {
    const settingGeneral = await SettingGeneral.findOne({});
    res.render('admin/pages/settings/general', {
      pageTitle: "Cài đặt chung",
      settingGeneral: settingGeneral
    });
  } else {
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
  }
  
}

// [PATCH] /admin/settings/general
module.exports.generalPatch = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne({});

  if(settingGeneral) {
    await SettingGeneral.updateOne({ _id: settingGeneral.id}, req.body);
  } 
  else {
    const record = new SettingGeneral(req.body);
    await record.save();
  }
  res.redirect('back');
}
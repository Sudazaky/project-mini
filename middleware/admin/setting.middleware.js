const SettingGeneral = require('../../models/settings-general.model');

const systemConfig = require('../../config/system');

module.exports.settingGeneral = async (req, res, next) => {
  const record = await SettingGeneral.findOne({});
  if(record) {
    res.locals.settingGeneral = record;
  }
  next();
};
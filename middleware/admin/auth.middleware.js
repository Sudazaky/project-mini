const Account = require('../../models/account.model');
const Roles = require('../../models/role.model');

const systemConfig = require('../../config/system');

module.exports.requireAuth = async (req, res, next) => {
  if(!req.cookies.token) {
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
  } else {
    const user = await Account.findOne({ token: req.cookies.token}).select("-password -token");
    if(!user) {
      res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
    } else {
      const role = await Roles.findOne({ _id: user.role_id}).select("title permissions");

      res.locals.user = user;
      res.locals.role = role;

      next();
    }
  }
};
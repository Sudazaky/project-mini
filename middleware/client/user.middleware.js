const User = require('../../models/user.model');

module.exports.requireUser = async (req, res, next) => {
  if(req.cookies.tokenUser) {
    const user = await User.findOne({ token: req.cookies.token}).select("-password -tokenUser");
    res.locals.user = user;
  } 
  next();
};
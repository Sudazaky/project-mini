const User = require('../../models/user.model');
const ForgotPassword = require('../../models/forgot-password.model');
const md5 = require('md5');
const generateHelpers = require('../../helpers/generateToken');

const sendMailHelpers = require('../../helpers/sendMail');

// [GET] /user/register
module.exports.register = (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký"
  });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  const existEmail = await User.findOne({ email: req.body.email});
  if(existEmail) {
    req.flash("existEmail", "Email đã tồn tại");
    res.redirect('back');
  } else {
    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    user.save();
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
  }
};

// [GET] /user/login
module.exports.login = (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập"
  });
};

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  const user = await User.findOne({ email: req.body.email});
  if(user) {
    if(user.password === md5(req.body.password)) {
      res.cookie("tokenUser", user.tokenUser);
      res.redirect('/');
      return;
    } else {
      req.flash("wrongPassword", "Sai mật khẩu");
      res.redirect('back');
      return;
    }
    
  } else {
    req.flash("wrongEmail", "Email không tồn tại");
    res.redirect('back');
  }
};

// [GET] /user/logout
module.exports.logout = (req, res) => {
  res.clearCookie("tokenUser");
  res.redirect("/user/login");
};

// [GET] /user/password/forgot
module.exports.forgotPassword = (req, res) => {
  res.render("client/pages/user/forgot-password");
};

// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if(!user) {
    req.flash("wrongEmail", "Email không tồn tại");
    res.redirect('back');
    return;
  }

  const otp = generateHelpers.generateNumber(8);

  const objectForgotPassword = {
    email: req.body.email,
    otp: otp,
    expireAt: Date.now()
  }

  const forgotPassword = new ForgotPassword(objectForgotPassword);
  forgotPassword.save();

  // Gửi email
  const subject = "Mã OTP xác minh lấy lại mật khẩu";
  const html = `
    Mã OTP để lấy lại mật khẩu là <b>${otp}</b>. Thời gian sử dụng là 3 phút.
  `;
  sendMailHelpers.sendMail(req.body.email, subject, html);
  res.redirect(`/user/password/otp?email=${req.body.email}`);
};

// [GET] /user/password/otp
module.exports.otp = (req, res) => {
  const email = req.query.email;
  res.render("client/pages/user/otp", {
    pageTitle: "Xác nhận otp",
    email: email
  });
};

// [POST] /user/password/otp
module.exports.otpPost = async (req, res) => {
  const forgotPassword = await ForgotPassword.findOne({ 
    email: req.body.email,
    otp: req.body.otp
  })

  if(!forgotPassword) {
    req.flash("wrongEmail", "Sai otp vui lòng thử lại");
    res.redirect('back');
    return;
  }

  const user = await User.findOne({ email: req.body.email });

  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/user/password/reset");
};

// [GET] /user/password/reset
module.exports.reset = (req, res) => {
  res.render("client/pages/user/reset", {
    pageTitle: "Đổi mật khẩu"
  });
};

// [POST] /user/password/reset
module.exports.resetPost = async (req, res) => {
  await User.updateOne({ tokenUser: req.cookies.tokenUser}, {password: md5(req.body.password)});
  res.clearCookie("tokenUser");
  res.redirect('/user/login');
};
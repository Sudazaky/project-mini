module.exports.user = (req, res, next) => {
  if(!req.body.email) {
    req.flash('error', 'Lỗi');
    res.redirect('back');
    return;
  }

  if(!req.body.password) {
    req.flash('error', 'Lỗi');
    res.redirect('back');
    return;
  }
  next();
}

module.exports.userConfirmPassword = (req, res, next) => {
  if(!req.body.password) {
    res.redirect('back');
    return;
  }

  if(!req.body.confirmPassword) {
    res.redirect('back');
    return;
  }

  if(req.body.password !== req.body.confirmPassword) {
    req.flash('wrongPassword', 'Mật khẩu không chính xác');
    res.redirect('back');
    return;
  }

  next();
}
module.exports.loginPost = (req, res, next) => {
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
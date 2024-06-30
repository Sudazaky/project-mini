module.exports.createPost = (req, res, next) => {
  if(!req.body.fullName) {
    req.flash('error', 'Lỗi');
    res.redirect('back');
    return;
  }

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

  if(!req.body.role_id) {
    req.flash('error', 'Chọn phân quyền');
    res.redirect('back');
    return;
  }

  next();
}

module.exports.editPatch = (req, res, next) => {
  if(!req.body.fullName) {
    req.flash('error', 'Lỗi');
    res.redirect('back');
    return;
  }

  if(!req.body.email) {
    req.flash('error', 'Lỗi');
    res.redirect('back');
    return;
  }

  if(!req.body.role_id) {
    req.flash('error', 'Chọn phân quyền');
    res.redirect('back');
    return;
  }

  next();
}
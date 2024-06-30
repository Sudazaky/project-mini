module.exports.createPost = (req, res, next) => {
  if(!req.body.title) {
    req.flash('error', 'Lỗi');
    res.redirect('back');
    return;
  }
  next();
}
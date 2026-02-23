function isAuth (req, res, next) {
  if (req.isAuthenticated()) {
    res.render("index", {
      user: req.user
    })
  } else {
    res.render("index")
  }
}

module.exports = {
  isAuth
}

function isAuth (req, res, next) {
  if (req.isAuthenticated()) {
    res.render("messages", {
      user: req.user
    })
  } else {
    res.render("messages", {
      popup: true
    })
  }
}

function logOut(req, res, next) {
  req.logout((error) => {
    if (error) {
      throw(error)
    }
    res.redirect("/");
  })
}

module.exports = {
  isAuth,
  logOut
}

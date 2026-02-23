const {Router} = require('express')
const index = Router()
const controller = require('../controllers/indexController')
const passport = require("passport")
const auth = require('../config/auth')

index.get("/", auth.isAuth, controller.renderIndex)
index.get("/register", (req, res) => {
  res.render("register")
})

index.post("/register", controller.handleRegister)
index.post("/login", passport.authenticate('local', {
  failureRedirect: "/",
  successRedirect: "/"
}));

module.exports = index;

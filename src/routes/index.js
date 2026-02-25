const {Router} = require('express')
const index = Router()
const controller = require('../controllers/indexController')
const passport = require("passport")
const auth = require('../config/auth')

index.get("/", auth.isAuth)
index.get("/join", (req, res) => res.render("join"));
index.get("/register", (req, res) => {
  res.render("register")
})

index.post("/register", controller.handleRegister)
index.post("/login", passport.authenticate('local', {
  failureRedirect: "/",
  successRedirect: "/"
}));
index.post("/join", controller.registerMember)

module.exports = index;

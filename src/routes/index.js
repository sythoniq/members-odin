const {Router} = require('express')
const index = Router()
const controller = require('../controllers/indexController')
const passport = require("passport")
const auth = require('../config/auth')

index.get("/", (req, res) => res.render("index"))
index.get("/join", (req, res) => res.render("join"));
index.get("/register", (req, res) => res.render("register"))
index.get("/login", (req, res) => res.render("login"))
index.get("/logout", auth.logOut);

index.post("/register", controller.handleRegister)
index.post("/login", passport.authenticate('local', {
  failureRedirect: "/login",
  successRedirect: "/messages"
}));
index.post("/join", controller.registerMember)


module.exports = index;

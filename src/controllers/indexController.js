const bcrypt = require('bcryptjs')
const db = require("../db/query")
const { body, validationResult, matchedData } = require('express-validator')

const validateUser = [
  body("firstname").trim().notEmpty()
    .isLength({min: 3}).withMessage("First name is too short"),
  body("lastname").trim().notEmpty()
    .isLength({min:3}).withMessage("Last name is too short"),
  body("username").trim().notEmpty()
    .isLength({min: 3}).withMessage("Username is too short"),
  body("password").trim().notEmpty()
    .isLength({min: 8}).withMessage("Password is too short"),
  body("email").trim().notEmpty()
    .isEmail().withMessage("Enter an actual email address"),
  body("confirmpassword").trim().notEmpty()
    .custom((value, {req}) => {
    if (value !== req.body.password) {
      throw new Error('Passwords must be same')
    } else {
      return value === req.body.password
    }
  }).isLength({min: 8}).withMessage("Confirm password too short")
]

function renderIndex(req, res) {
  if (req.user) {
    return res.render("index", {
      user: req.user,
    })
  } else {
    return res.render("index");
  }
}

const handleRegister = [
  validateUser,
  async (req, res) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).render("register", {
          errors: result.array()
        })
      }
      const {firstname, lastname, email, username, password} = matchedData(req);
      if (await db.getUserByEmail(email)) {
        return res.status(400).render("register", {
          errors: [{ msg: "User email already in use"}]
        })
      }
      const hash = await bcrypt.hash(password, 10);
      await db.registerUser(firstname, lastname, email, username, hash);
      res.redirect("/");
    } catch(error) {
      throw (error)
    }
  }
]


module.exports = {
  renderIndex,
  handleRegister
}

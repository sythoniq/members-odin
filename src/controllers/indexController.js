const bcrypt = require('bcryptjs')
const db = require("../db/query")

function renderIndex(req, res) {
  if (req.user) {
    return res.render("index", {
      user: req.user,
    })
  } else {
    return res.render("index");
  }
}

async function handleRegister(req, res) {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    await db.registerUser(req.body.username, hash);
  } catch(error) {
    throw(error);
  }
}

module.exports = {
  renderIndex,
  handleRegister
}

const db = require("../db/query")
const { body, validationResult, matchedData } = require('express-validator')

const validateMessage = [
  body("messagetitle").notEmpty().trim()
    .isLength({min: 1}).withMessage("Message title too short"),
  body("message").notEmpty().trim()
]

async function renderMessages(req, res) {
  const rows = await db.getMessages();
  res.render("messages", {
    messages: rows,
    user: req.user
  })
}

const addMessage = [
  validateMessage,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).render("addMessage", {
        errors: result.array()
      })
    }
    const {messagetitle, message} = matchedData(req);
    try {
      await db.addMessage(messagetitle, message, req.user);
      res.redirect("/messages")
    } catch (error) {
      throw(error)
    }
  }
]

module.exports = {
  renderMessages,
  addMessage
}

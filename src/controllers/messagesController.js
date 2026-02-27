const db = require("../db/query")
const { body, validationResult, matchedData } = require('express-validator')

const validateMessage = [
  body("messagetitle").notEmpty().trim()
    .isLength({min: 1}).withMessage("Message title too short"),
  body("message").notEmpty().trim()
]

function format(dates) {
  const string = dates.toString();
  const [_, month, date, year, time] = string.split(" ");
  const [hour, minutes] = time.split(":");
  return `${date} ${month}`
}

async function renderMessages(req, res) {
  const messages = await db.getMessages();
  res.render("messages", {messages, format})
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

async function deleteMessage(req, res) {
  try {
    await db.deleteMessage(req.params.id)
    res.redirect("/messages");
  } catch(error) {
    throw(error)
  }
}

module.exports = {
  renderMessages,
  addMessage,
  deleteMessage
}

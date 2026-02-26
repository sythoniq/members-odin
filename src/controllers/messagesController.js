const db = require("../db/query")
const { body, validationResult, matchedData } = require('express-validator')

const validateMessage = [
  body("messagetitle").notEmpty().trim()
    .isLength({min: 1}).withMessage("Message title too short"),
  body("message").notEmpty().trim()
]

function formatDate(dates) {
  const string = dates.toString();
  const [_, month, date, year, time] = string.split(" ");
  const [hour, minutes] = time.split(":");
  return `${hour}:${minutes} · ${date} ${month}`
}

async function renderMessages(req, res) {
  const messages = await db.getMessages();
  const user = req.user;
  res.render("messages", {messages, user, formatDate})
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
    console.log(req.body.id)
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

const {Router} = require("express")
const route = Router();
const controller = require("../controllers/messagesController")

route.get("/", controller.renderMessages)
route.get("/new", (req, res) => res.render("addMessage"));
route.get("/delete/:id", controller.deleteMessage);

route.post("/new", controller.addMessage);

module.exports = route;

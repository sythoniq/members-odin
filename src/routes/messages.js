const {Router} = require("express")
const route = Router();
const controller = require("../controllers/messagesController")

route.get("/", controller.renderMessages)
route.get("/delete/:id", controller.deleteMessage);

route.post("/new", controller.addMessage);

module.exports = route;

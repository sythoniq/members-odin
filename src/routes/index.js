const { Router } = require('express');
const index = Router();
const controller = require("../controllers/indexController")

index.get("/", controller.renderIndex);

module.exports = index;

const loginRouter = require("express").Router();
const authController = require("../controllers/auth");

loginRouter.post("/", authController.login);

module.exports = loginRouter;

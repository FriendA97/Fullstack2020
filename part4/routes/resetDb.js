const resetRouter = require("express").Router();
const resetController = require("../controllers/resetDb");

resetRouter.post("/", resetController);

module.exports = resetRouter;

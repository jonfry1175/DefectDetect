const bugRouter = require("express").Router();
const BugController = require("../controllers/BugController");

bugRouter.get("/", BugController.getAll);
module.exports = bugRouter
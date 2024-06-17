const bugRouter = require("express").Router();
const BugController = require("../controllers/BugController");

bugRouter.get("/", BugController.getAll);
bugRouter.post("/create", BugController.create);
bugRouter.put("/status/:id", BugController.changeIsSolved);
module.exports = bugRouter
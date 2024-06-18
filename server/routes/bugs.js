const bugRouter = require("express").Router();
const BugController = require("../controllers/BugController");
const authMiddleware = require("../middlewares/auth");
const {checkRoleQA, checkRoleDev} = require("../middlewares/checkRole");

bugRouter.get(
    "/",
    authMiddleware,
    BugController.getAll    
);
bugRouter.post(
    "/create",
    authMiddleware,
    checkRoleQA,
    BugController.create
);

bugRouter.put(
    "/status/:id",
    authMiddleware,
    checkRoleDev,
    BugController.changeIsSolved
);
module.exports = bugRouter
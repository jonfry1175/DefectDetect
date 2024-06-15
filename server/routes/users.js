const userRouter = require("express").Router();
const UserController = require("../controllers/UserController");

userRouter.get("/", UserController.getAll);
module.exports = userRouter;
const userRouter = require("express").Router();
const UserController = require("../controllers/UserController");

userRouter.get("/", UserController.getAll);
userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);   
module.exports = userRouter;
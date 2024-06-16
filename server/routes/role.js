const roleRouter = require("express").Router();
const roleController = require("../controllers/RoleController");

roleRouter.get("/", roleController.getAll);
module.exports = roleRouter
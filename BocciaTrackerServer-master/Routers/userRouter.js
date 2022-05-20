const { Router } = require("express");

const { authController } = require("../Controllers/authController");

const UserRouter = new Router();
module.exports = { UserRouter };

UserRouter.post("/register", authController.createUser);
UserRouter.post("/login", authController.loginUser);
// AuthRouter.post("/signup", authController.createUser);
const { Router } = require("express");
const {
  registerController,
  loginController,
  getMeController,
  logoutController,
} = require("../controllers/Auth.controller");
const { authMiddleware } = require("../middleware/auth.middlewalre");
const AuthRouter = Router();

AuthRouter.post("/register", registerController);
AuthRouter.post("/login", loginController);
AuthRouter.get("/get-me", authMiddleware, getMeController);
AuthRouter.get("/logout", authMiddleware, logoutController);

module.exports = AuthRouter;

import { Router } from "express";
import { registerController } from "../controllers/auth.controller.js";
import { registerValidator } from "../validation/Auth.validator.js";

const AuthRouter = Router();

AuthRouter.post("/register", registerValidator, registerController)

export default AuthRouter;

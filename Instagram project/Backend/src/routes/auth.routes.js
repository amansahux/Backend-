const express = require("express");
const authRouter = express.Router();
const {registerController,loginController} = require("../controllers/auth.controllers");



/**
 * POST /api/auth/register
 */
authRouter.post("/register", registerController);

/**
 * POST /api/auth/login
 */
authRouter.post("/login", loginController);

/**
 * @route GET /api/auth/get-me
 * @desc Get the currently logged in user's information
 * @access Private
 */

module.exports = authRouter;

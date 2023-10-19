const express = require("express");
const { body } = require("express-validator");

const registerUser = require("../controllers/registerController");
const loginUser = require("../controllers/loginController");
const refreshAccesstoken = require("../controllers/refreshController");
const logoutUser = require("../controllers/logoutController");
const {
  validateUserName,
  validatePassword
} = require("../middlewares/validateRegisterReq");
const { cookie } = require("express-validator");

const authRouter = express.Router();
authRouter
  .route("/login")
  .post(
    body(["username", "pwd"])
      .notEmpty()
      .withMessage("Username or password is empty"),
    loginUser
  );

authRouter
  .route("/register")
  .post(validateUserName, validatePassword, registerUser);

authRouter.route("/refresh").get(cookie("jwt").isJWT(), refreshAccesstoken);
authRouter.route("/logout").post(logoutUser);

module.exports = authRouter;

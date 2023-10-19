const express = require("express");
const { registerUser } = require("../controllers/registerController");
const {
  validateUserName,
  validatePassword
} = require("../middlewares/validateRegisterReq");

const router = express.Router();
router.route("/").post(validateUserName, validatePassword, registerUser);

module.exports = router;

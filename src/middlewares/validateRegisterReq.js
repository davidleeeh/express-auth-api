const { body } = require("express-validator");

const validateUserName = body("username")
  .notEmpty()
  .withMessage("Username must not be empty")
  .escape();

const validatePassword = body("pwd")
  .notEmpty()
  .withMessage("Password must not be empty")
  .trim()
  .isLength({ min: 4 })
  .withMessage("Password must be at least 4 characters long");

module.exports = { validateUserName, validatePassword };

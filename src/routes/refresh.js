const express = require("express");
const { refreshAccesstoken } = require("../controllers/loginController");
const { cookie } = require("express-validator");

const router = express.Router();

router.route("/").get(cookie("jwt").isJWT(), refreshAccesstoken);

module.exports = router;

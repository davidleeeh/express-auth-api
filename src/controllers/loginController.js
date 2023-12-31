const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const {
  createAccessToken,
  createRefreshToken,
  jwtCookieOptions
} = require("../lib/userToken");

const loginUser = async (req, res, next) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    return res.status(400).json({ error: `${errors[0].msg}` });
  }

  const { username, pwd } = req.body;

  const targetUser = await User.findOne({ username });
  if (!targetUser) {
    return res.sendStatus(404);
  }

  const isMatched = await bcrypt.compare(pwd, targetUser.pwd);
  if (isMatched) {
    const accessToken = createAccessToken(targetUser);
    const refreshToken = createRefreshToken(targetUser);

    await User.updateOne(
      { username },
      {
        refreshToken
      }
    );

    res
      .cookie("jwt", refreshToken, jwtCookieOptions)
      .status(200)
      .json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = loginUser;

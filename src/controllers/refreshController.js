const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const mockUserRepo = require("../mocks/mockUserRepo");
const { createAccessToken } = require("../lib/userToken");

const refreshAccesstoken = (req, res, next) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    return res.sendStatus(401);
  }

  const {
    cookies: { jwt: refreshToken }
  } = req;

  console.log(refreshToken);

  const userRepo = mockUserRepo();
  const targetUser = userRepo
    .getUsers()
    .find((it) => it.refreshToken === refreshToken);

  if (!targetUser) {
    console.log("Could not find user");
    res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || decoded.username !== targetUser.username) {
      console.log("Cannot verify refresh token", err);
      return res.sendStatus(403);
    }

    const accessToken = createAccessToken(targetUser.username);

    res.status(200).json({ accessToken });
  });
};

module.exports = refreshAccesstoken;

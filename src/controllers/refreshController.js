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
    res.sendStatus(401);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    const { userInfo } = decoded;
    if (err || userInfo?.username !== targetUser.username) {
      return res.sendStatus(401);
    }

    const accessToken = createAccessToken(targetUser);

    res.status(200).json({ accessToken });
  });
};

module.exports = refreshAccesstoken;

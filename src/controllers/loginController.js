const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const mockUserRepo = require("../mocks/mockUserRepo");
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

  const userRepo = mockUserRepo();
  const { username, pwd } = req.body;

  const targetUser = userRepo.findUser(username);
  if (!targetUser) {
    return res.sendStatus(404);
  }

  const isMatched = await bcrypt.compare(pwd, targetUser.pwd);
  if (isMatched) {
    const accessToken = createAccessToken(targetUser.username);
    const refreshToken = createRefreshToken(targetUser.username);

    await userRepo.updateUser(targetUser.username, { refreshToken });

    res
      .cookie("jwt", refreshToken, jwtCookieOptions)
      .status(200)
      .json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = loginUser;

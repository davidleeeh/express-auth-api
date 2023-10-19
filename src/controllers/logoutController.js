const { jwtCookieOptions } = require("../lib/userToken");
const mockUserRepo = require("../mocks/mockUserRepo");

const logoutUser = (req, res, next) => {
  const refreshToken = req.cookies?.jwt;
  if (!refreshToken) {
    res.sendStatus(204);
  }
  res.clearCookie("jwt", jwtCookieOptions);

  const userRepo = mockUserRepo();
  const targetUser = userRepo
    .getUsers()
    .find((it) => it.refreshToken === refreshToken);

  if (targetUser) {
    userRepo.updateUser(targetUser.username, { refreshToken: "" });
  }

  return res.sendStatus(204);
};

module.exports = logoutUser;

const { jwtCookieOptions } = require("../lib/userToken");
const User = require("../models/userModel");

const logoutUser = async (req, res, next) => {
  const refreshToken = req.cookies?.jwt;
  if (!refreshToken) {
    return res.sendStatus(204);
  }
  res.clearCookie("jwt", jwtCookieOptions);

  const targetUser = await User.findOne({ refreshToken }).exec();

  if (targetUser) {
    const result = await User.updateOne(
      { username: targetUser.username },
      { refreshToken: "" }
    );
    console.log("Update result: ", result);
  }

  return res.sendStatus(204);
};

module.exports = logoutUser;

const jwt = require("jsonwebtoken");

const createAccessToken = (user) => {
  const { username, roles } = user;
  return jwt.sign(
    {
      userInfo: {
        username,
        roles: Object.values(roles)
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2m" }
  );
};
const createRefreshToken = (user) => {
  const { username, roles } = user;
  return jwt.sign(
    {
      userInfo: {
        username,
        roles: Object.values(roles)
      }
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
};

const jwtCookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
  maxAge: 24 * 60 * 60 * 1000
};

module.exports = { createAccessToken, createRefreshToken, jwtCookieOptions };

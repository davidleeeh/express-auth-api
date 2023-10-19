const jwt = require("jsonwebtoken");

const createAccessToken = (username) => {
  return jwt.sign(
    {
      username
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30s" }
  );
};
const createRefreshToken = (username) => {
  return jwt.sign(
    {
      username
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

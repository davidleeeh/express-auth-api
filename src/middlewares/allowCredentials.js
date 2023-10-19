const { allowedOrigins } = require("../config/corsOptions");

const allowCredentials = (req, res, next) => {
  const { origin } = req.headers;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = allowCredentials;

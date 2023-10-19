const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    return res.status(400).json({ error: `${errors[0].msg}` });
  }

  const authHeader = req.headers["authorization"];
  console.log(authHeader);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }

    req.user = decoded.userInfo;
    next();
  });
};

module.exports = verifyJWT;

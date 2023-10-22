const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/userModel");

const registerUser = async (req, res) => {
  const { errors } = validationResult(req);
  console.log(errors);
  if (errors.length > 0) {
    return res.status(400).json({ error: `${errors[0].msg}` });
  }

  const { username, pwd } = req.body;

  const duplicate = await User.findOne({ username: username });
  if (duplicate) {
    console.log("Duplicate found: ", duplicate);
    return res.sendStatus(409);
  }

  const hashedPwd = await bcrypt.hash(pwd, 10);

  await User.create({
    username,
    pwd: hashedPwd
  });

  return res.sendStatus(201);
};

module.exports = registerUser;

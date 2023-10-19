const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const mockUserRepo = require("../mocks/mockUserRepo");

const registerUser = async (req, res) => {
  const { errors } = validationResult(req);
  console.log(errors);
  if (errors.length > 0) {
    return res.status(400).json({ error: `${errors[0].msg}` });
  }

  const { username, pwd } = req.body;

  const userRepo = mockUserRepo();
  const users = userRepo.getUsers();
  if (users.find((it) => it.username === username)) {
    return res.sendStatus(409);
  }

  const hashedPwd = await bcrypt.hash(pwd, 10);
  userRepo.addUser(username, hashedPwd);
  console.log(userRepo.getUsers());
  return res.sendStatus(201);
};

module.exports = registerUser;

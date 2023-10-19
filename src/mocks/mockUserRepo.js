const path = require("path");
const fsPromise = require("fs/promises");
const userRoles = require("../config/userRoles");

const mockUserRepo = () => {
  let users = require("./data/users.json");

  const save = async (users) => {
    await fsPromise.writeFile(
      path.join(__dirname, "data", "users.json"),
      JSON.stringify(users.sort((a, b) => a.username.localeCompare(b.username)))
    );
  };

  return {
    getUsers: function () {
      return users;
    },
    findUser: function (username) {
      return users.find((it) => it.username === username);
    },
    addUser: async function (
      username,
      pwd,
      refreshToken = "",
      roles = { user: userRoles.user }
    ) {
      users = [...users, { username, pwd, refreshToken, roles }];
      save(users);
    },
    updateUser: async function (username, updates) {
      const otherUsers = users.filter((it) => it.username !== username);
      let targetUser = this.findUser(username);
      users = [
        ...otherUsers,
        {
          ...targetUser,
          ...updates
        }
      ];
      save(users);
    }
  };
};

module.exports = mockUserRepo;

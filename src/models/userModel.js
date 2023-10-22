const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  refreshToken: String,
  roles: {
    user: {
      type: Number,
      default: 2001
    },
    editor: Number,

    admin: Number
  }
});

module.exports = mongoose.model("User", userSchema);

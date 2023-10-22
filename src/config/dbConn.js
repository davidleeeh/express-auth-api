const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_CONN_STRING);
};

module.exports = connectDB;

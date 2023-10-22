require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { useLogger } = require("./middlewares/useLogger");
const cors = require("cors");
const { corsOptions } = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const allowCredentials = require("./middlewares/allowCredentials");
const handleError = require("./middlewares/handleError");
const handleAccess = require("./middlewares/handleAccess");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3500;
const app = express();

connectDB();

app.use([
  useLogger(),
  handleAccess,
  cors(corsOptions),
  allowCredentials,
  express.urlencoded({ extended: false }),
  express.json(),
  cookieParser(),
  express.static(path.join(__dirname, "/public"))
]);

app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/products"));

app.all("*", (req, res) => {
  const msg = "404 Not Found";

  if (req.accepts("html")) {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.status(404).json({ error: msg });
  } else {
    res.type("txt").status(404).send(msg);
  }
});

app.use(handleError);

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

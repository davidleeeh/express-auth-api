const allowedOrigins = [
  // dev environments
  "http://localhost:3500",
  "http://localhost:3000"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin is not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200
};

module.exports = { corsOptions, allowedOrigins };

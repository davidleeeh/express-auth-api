// Express expects all 4 parameters to be here, so do not remove next even it's not
// being used.
const handleError = (err, req, res, next) => {
  req.logger.error(`${err.stack}`);
  const errMessage = err.message || "Server error";

  res.status(500).json({
    success: false,
    errMessage: errMessage
  });
};

module.exports = handleError;

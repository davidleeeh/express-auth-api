const handleAccess = (req, res, next) => {
  req.logger.log(
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    "access.log"
  );

  next();
};

module.exports = handleAccess;

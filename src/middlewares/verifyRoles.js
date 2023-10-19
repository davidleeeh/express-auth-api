const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const {
      user: { roles }
    } = req;

    console.log("Allowed: ", allowedRoles);
    console.log("User roles: ", roles);
    const matched = roles.reduce((prev, currentRole) => {
      if (allowedRoles.includes(currentRole)) {
        prev = [...prev, currentRole];
      }
      return prev;
    }, []);

    console.log("Matched: ", matched);

    if (matched.length === 0) {
      return res.sendStatus(403);
    }
    next();
  };
};

module.exports = verifyRoles;

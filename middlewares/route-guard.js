const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login");
    return;
  }

  next();
};

const requireToBeLoggedOut = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/profile");
    return;
  }

  next();
};

const objectWeWantToExport = {
  requireLogin,
  requireToBeLoggedOut,
};

module.exports = objectWeWantToExport;

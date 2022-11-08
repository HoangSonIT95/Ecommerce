module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.status(500).json('Not logged in yet');
  }
  next();
};

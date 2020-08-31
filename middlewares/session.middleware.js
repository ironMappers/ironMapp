const User = require('../models/user.model');


module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.render('users/login', {message: 'You need to log in'});
  }
};

module.exports.isNotAuthenticated = (req, res, next) => {
  User.findById(req.session.userId)
    .then((user) => {
      if (user) {
        res.redirect("/");
      } else {
        next();
      }
    })
    .catch(next);
};


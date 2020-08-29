const passport = require("passport");
const User = require("../models/user.model");



module.exports.renderLogin = (req, res, next) => {
    res.render('users/login');
};
module.exports.doLogin = (req, res, next) => {
    res.send('you logged in');
};
module.exports.renderSignup = (req, res, next) => {
    res.render('users/signup');
};
module.exports.createUser = (req, res, next) => {
    const newUser = new User(req.body);
    newUser.save()
        .then(() => res.redirect('/login'))
        .catch(next);
};
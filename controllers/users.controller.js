module.exports.renderLogin = (req, res, next) => {
    res.render('users/login');
};

module.exports.renderSignup = (req, res, next) => {
    res.render('users/signup');
};
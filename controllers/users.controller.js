module.exports.login = (req, res, next) => {
    res.render('users/login');
};

module.exports.signup = (req, res, next) => {
    res.render('users/signup');
};
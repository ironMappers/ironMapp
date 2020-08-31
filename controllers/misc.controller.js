module.exports.renderHome = (req, res, next) => {
    console.log(req.session)
    console.log(req.user)
    res.render('home');
};


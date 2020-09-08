const Review = require('../models/review.model');

module.exports.renderHome = (req, res, next) => {
    res.render('home');
};

module.exports.deleteReview = (req, res, next) => {
    Review.findByIdAndDelete(req.params.id)
        .then(r => res.redirect(`/station/${r.station.IDEESS}/${r.station.district}`))
        .catch(next);
};

module.exports.editReview = (req, res, next) => {
    //edit the review
}


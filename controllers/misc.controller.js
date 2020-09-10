const Review = require('../models/review.model');

module.exports.renderHome = (req, res, next) => {
    res.render('home');
};

module.exports.createReview = (req, res, next) => {
    const {
        stationId,
        stationDistrict
    } = req.params;
    const newReview = new Review({
        user: req.currentUser._id,
        station: {
            IDEESS: stationId,
            district: stationDistrict
        },
        body: req.body.reviewBody
    });

    newReview.save()
        .then(review => res.json(review))
        .catch(next);
};

module.exports.deleteReview = (req, res, next) => {
    Review.findByIdAndDelete(req.params.id)
        .then(r => res.json(r))
        .catch(next);
};

module.exports.editReview = (req, res, next) => {
    Review.findByIdAndUpdate(req.params.id, {
            body: req.body.reviewBodyEdit
        })
        .then(r => res.json(r))
        .catch(next);
};
const Review = require('../models/review.model');
const Rating = require('../models/rating.model');
const Favorite = require('../models/favorite.model');

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

module.exports.doRating = (req, res, next) => {
    Rating.findOne({
            user: req.currentUser._id,
            station: req.body.station,
        })
        .then(rating => {
            if (rating) {
                rating.score = req.body.score;
                return rating.save();
            } else {
                const newRating = new Rating({
                    user: req.currentUser.id,
                    station: req.body.station,
                    score: req.body.score
                });

                return newRating.save();
            }
        })
        .catch(next);
};

module.exports.doFavorite = (req, res, next) => {
    Favorite.findOne({
            user: req.currentUser._id,
            station: req.body.station,
            address: req.body.address,
            owner: req.body.owner
        })
        .then(favorite => {
            if (favorite) {
                return favorite.remove();
            } else {
                const newFavorite = new Favorite({
                    user: req.currentUser.id,
                    station: req.body.station,
                });

                return newFavorite.save();
            }
        })
        .catch(next);
};

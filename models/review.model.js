const mongoose = require('mongoose');
require('./user.model');
require('./station.model');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    station: {
        IDEESS: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        }
    },
    body: {
        type: String,
        required: true
    }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
const mongoose = require('mongoose');
require('./user.model');
require('./station.model');

const favoriteSchema = new mongoose.Schema({
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
    }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;